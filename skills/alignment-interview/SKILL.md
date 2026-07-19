---
name: alignment-interview
description: Interview the user adaptively, using one question or a small dependency-safe round at a time, to externalize and organize their context, resolve decision dependencies, show progress, and confirm shared understanding before acting. Use when the user asks to be interviewed, wants to brain-dump or think something through together, needs to align intent or expectations, wants missing context surfaced, or wants to clarify decisions collaboratively in any domain. Do not use for routine clarification, idea generation alone, immediate execution, factual research, or one-shot critique.
---

# Alignment Interview

## Outcome

Build a shared, decision-ready understanding of the subject before acting. Elicit context that exists in the user's head, organize it, resolve meaningful decisions in dependency order, and let the user correct the resulting model.

Shared understanding does not require agreement. Preserve explicit disagreements, assumptions, and unresolved decisions rather than forcing consensus.

## Interview Contract

- Use the language of the user's current request unless they ask for another. Adapt wording, structure, and tone to their context, and preserve the semantic contract without requiring fixed labels or phrases.
- Choose between one precise question and a small round of questions according to their decision dependencies and answer burden. When the user provides a brain dump, first absorb and organize it rather than interrupting with questions.
- Reduce round trips without asking questions that may be invalidated by an earlier answer or creating an excessive combined answer burden.
- Use supplied material and accessible sources to resolve factual questions. Ask the user for their intent, preferences, priorities, constraints, and decisions, not facts that can be discovered reliably.
- Distinguish known facts, assumptions, user-owned decisions, agent recommendations, delegated choices, and unresolved unknowns.
- Recommend an answer when there is a defensible basis. State the relevant reasoning, tradeoff, or uncertainty; do not manufacture a default for missing facts or personal preferences.
- Surface contradictions, ambiguous terms, hidden dependencies, and consequences that could change the shared understanding or expected outcome.
- Keep progress visible in broad or extended interviews without implying a fixed question count.
- Treat the interview as the requested outcome. Do not implement, publish, persist, or otherwise enact its result unless the user separately asks.

## Build The Shared Model

1. Absorb the current conversation, provided artifacts, and any brain dump. Briefly reflect the subject and intended outcome only when confirmation would catch a meaningful misunderstanding.
2. Maintain a working model of the decision-relevant context and dependencies among unresolved items. Depending on the subject, this may include goals, motivation, scope, non-goals, constraints, priorities, terminology, known facts, assumptions, decisions, concerns, and success signals. Do not turn these categories into a mandatory questionnaire.
3. Identify the unresolved items whose prerequisites are sufficiently understood and that most constrain downstream understanding. Prefer prerequisites, user-owned decisions, contradictions, and choices whose alternatives lead to materially different outcomes.
4. Choose the next interaction shape:
   - In a broad or multi-branch interview, once the goal and relevant prerequisites are understood, default to a small coherent round drawn from the unresolved items that are ready to answer.
   - Ask one precise question only when no second question is independently answerable, an answer could change whether or how another question should be asked, a contradiction changes the interview path, the answer alone requires substantial thought, or the user prefers one-at-a-time interaction.
   - Keep a round normally between two and four questions. Include only questions that can be answered independently from the same established context and whose answers do not determine the meaning or necessity of another question in that round. Reduce the round size when the combined answer burden is high. Do not batch questions merely because they share a topic, but do not separate independent questions merely because the subject is important.
   - Number questions in a round and let the user answer in any order, answer partially, or defer an item.
5. Include only the context needed to answer each question and a conditional recommendation when useful.
6. Incorporate the answers into the working model. Drop or revise planned questions that the answers invalidate. Briefly reflect a decision or correction when it materially changes later questions; do not repeat the full model after every turn.
7. After completing a coherent branch or round, or whenever accumulated context may conceal a misunderstanding, summarize the relevant understanding and invite correction.
8. Route unknowns to the mechanism that can resolve them. Investigate discoverable facts, identify decisions that require the user, and recommend research, prototyping, or validation when conversation alone cannot answer the question. Keep any unverified result visible.

## Show Progress And Control Pace

- For a broad, multi-branch, or likely extended interview, state a compact initial outline and a tentative range of remaining rounds. Skip this ceremony for a narrow clarification.
- At each round or coherent branch, show what is resolved, what is current, what likely remains, and a tentative remaining-round estimate. Mark estimates as adaptive and revise them when answers reveal or remove material branches.
- Base progress on decision-relevant topics and readiness for the next action, not a percentage or fixed total question count.
- Before continuing, check whether the next answers could still change the shared model or next action. Stop or recommend action, research, or a prototype when conversation has lower value.
- Let the user skip, defer, stop, or request the current alignment brief at any point without treating that choice as agreement on unresolved items.

## Stop

Stop interviewing when the user asks to stop or when:

- the goal and expected outcome are understood
- material constraints, priorities, and terms are clear enough for the next action
- decision dependencies relevant to that action are resolved or explicitly left open
- remaining assumptions, disagreements, and unknowns are visible
- further questions are unlikely to change the outcome and would be better answered by action or evidence

Seek decision-relevant completeness, not exhaustive detail.

## Confirm And Hand Off

Present a compact alignment brief in the user's language that preserves:

- the shared objective and expected outcome
- scope, non-goals, constraints, and priorities that matter
- decisions and their relevant rationale
- assumptions, unresolved questions, and explicit disagreements
- material risks or evidence still needed
- the recommended next action and whether the subject is ready for it

Ask the user to confirm or correct the brief. Treat corrections as continuation of the interview. Do not treat silence as confirmation.
