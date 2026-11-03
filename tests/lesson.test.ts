import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("article text is task data and summary structure is independently checked", async () => {
  const { buildTask, checkSummary, inputSchema } = await import("../src/lab.js");
  const input = inputSchema.parse(LESSON.examples[0].input);
  assert(buildTask(input, "Summarize").includes(JSON.stringify({ article: input.article })));
  assert.equal(checkSummary("- First point\n- Second point\n- Third point").exactlyThreeBullets, true);
  assert.equal(checkSummary("Preface\n- First point\n- Second point\n- Third point").exactlyThreeBullets, false);
});
