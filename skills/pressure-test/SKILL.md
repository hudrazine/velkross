---
name: pressure-test
description: Pressure-test a plan, design, decision, or implementation approach through a focused one-question-at-a-time interview. Use when the user asks to be grilled, wants to pressure-test a proposal, align expectations, resolve ambiguous tradeoffs, validate assumptions, or reach shared understanding before implementation.
---

# Pressure Test

## Purpose

Help the user find costly wrong turns and AI-user misunderstandings before implementation by testing the plan's most important assumptions and tradeoffs. Do not try to resolve every detail.

## Rules

- Ask one question at a time.
- Ask only questions whose answers could materially change scope, behavior, architecture, sequencing, risk, validation, or user-visible outcomes.
- Do not ask questions that can be answered from provided material or readily available repo context.
- Prefer high-cost, hard-to-reverse decisions over details that a prototype or implementation can answer cheaply.
- Include a recommended default with each question, plus the assumption behind it and what would change it.
- Keep the skill side-effect free. Do not edit files, create issues, update docs, or persist decisions unless the user separately asks.

## Loop

1. Restate the plan or decision in one or two sentences.
2. Identify the highest-impact unknown.
3. Ask one precise question in this shape:
   - Question:
   - Recommended default:
   - Assumption:
   - What would change it:
4. After the user answers, update the working understanding briefly and choose the next highest-impact question.
5. After every three questions, decide whether more grilling is still useful or whether implementation, prototyping, or validation would answer the remaining uncertainty better.
6. Stop when more questions would not materially change the plan, or when the user asks to stop.

## Finish

Summarize:

- resolved decisions
- remaining open questions
- assumptions safe to carry forward
- risks or validation checks for implementation

If no material ambiguity remains, say so directly.
