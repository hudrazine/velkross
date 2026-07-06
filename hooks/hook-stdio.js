const defaultMaxBytes = 64 * 1024;
const defaultChunkBytes = 8 * 1024;
const defaultFd = 0;

class StdinSizeLimitError extends Error {}

export function readStdinText(readSync) {
  const chunks = [];
  const buffer = Buffer.alloc(defaultChunkBytes);
  let totalBytes = 0;

  try {
    while (true) {
      const bytesRead = readSync(defaultFd, buffer, 0, buffer.length, null);

      if (bytesRead === 0) {
        break;
      }

      totalBytes += bytesRead;

      if (totalBytes > defaultMaxBytes) {
        throw new StdinSizeLimitError(`Hook input exceeds ${defaultMaxBytes} bytes`);
      }

      chunks.push(Buffer.from(buffer.subarray(0, bytesRead)));
    }
  } catch (error) {
    if (error instanceof StdinSizeLimitError) {
      throw error;
    }

    return "";
  }

  return Buffer.concat(chunks, totalBytes).toString("utf8");
}
