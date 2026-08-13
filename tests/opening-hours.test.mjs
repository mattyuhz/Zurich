import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";

const source = await import("node:fs/promises").then(({ readFile }) => readFile(new URL("../app/opening-hours.ts", import.meta.url), "utf8"));
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
const { getOpeningStatus } = await import(moduleUrl);

const hours = {
  4: [["07:30", "11:30"], ["12:00", "16:30"]],
  5: [["07:30", "11:30"]],
};

test("reports an open place and time until closing in Zürich", () => {
  assert.deepEqual(getOpeningStatus(hours, new Date("2026-08-13T05:47:00Z")), {
    state: "open",
    label: "Open now · closes in 3h 43m",
  });
});

test("reports a same-day opening countdown across split hours", () => {
  assert.deepEqual(getOpeningStatus(hours, new Date("2026-08-13T09:43:00Z")), {
    state: "opening-soon",
    label: "Opens in 17 min",
  });
});

test("reports the next opening day after closing", () => {
  assert.deepEqual(getOpeningStatus(hours, new Date("2026-08-13T15:00:00Z")), {
    state: "closed",
    label: "Closed · opens tomorrow at 07:30",
  });
});
