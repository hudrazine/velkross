import { expect, test } from "vite-plus/test";

import { readStdinText } from "../hooks/hook-stdio.js";

function createReader(chunks) {
  const buffers = chunks.map((chunk) => Buffer.from(chunk));
  let index = 0;

  return (_fd, targetBuffer) => {
    const chunk = buffers[index];
    index += 1;

    if (!chunk) {
      return 0;
    }

    chunk.copy(targetBuffer);
    return chunk.length;
  };
}

test("reads stdin text from multiple chunks", () => {
  expect(readStdinText(createReader(["hello ", "world"]))).toBe("hello world");
});

test("throws when stdin exceeds the size limit", () => {
  const chunks = Array.from({ length: 9 }, () => "x".repeat(8 * 1024));

  expect(() => readStdinText(createReader(chunks))).toThrow("Hook input exceeds 65536 bytes");
});

test("returns empty text when stdin cannot be read", () => {
  expect(
    readStdinText(() => {
      throw new Error("not readable");
    }),
  ).toBe("");
});
