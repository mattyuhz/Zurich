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

test("reports a seasonal venue before and after its published season", () => {
  const seasonal = {
    weekly: { 2: [["12:00", "18:00"]] },
    validFrom: "2026-04-17",
    validThrough: "2026-11-29",
  };

  assert.deepEqual(getOpeningStatus(seasonal, new Date("2026-03-20T12:00:00Z")), {
    state: "closed",
    label: "Season closed · opens 17 Apr",
  });
  assert.deepEqual(getOpeningStatus(seasonal, new Date("2026-12-01T12:00:00Z")), {
    state: "closed",
    label: "Closed for the season",
  });
});

test("honors a published one-day closure", () => {
  assert.deepEqual(getOpeningStatus({
    weekly: { 0: [["12:00", "18:00"]], 6: [["12:00", "18:00"]] },
    closedDates: ["2026-08-01"],
  }, new Date("2026-08-01T11:00:00Z")), {
    state: "closed",
    label: "Closed · opens tomorrow at 12:00",
  });
});
