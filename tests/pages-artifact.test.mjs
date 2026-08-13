import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function artifact(path) {
  return readFile(new URL(`../pages-dist/${path}`, import.meta.url), "utf8");
}

test("Pages is built from the consolidated source", async () => {
  const index = await artifact("index.html");
  const scripts = [...index.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  const modulePath = scripts.find((path) => path.includes("/assets/index-"));

  assert.ok(modulePath, "expected the Vite application bundle");
  const bundle = await artifact(modulePath.replace("/Zurich/", ""));

  for (const feature of [
    "LIVE ZÜRICH",
    "SHOW FIVE MORE TRAILS",
    "MATCH THE PLAN TO YOUR TIME.",
    "material-symbol",
    "MIT&OHNE",
  ]) {
    assert.match(bundle, new RegExp(feature.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("Pages includes the dictionary enhancement", async () => {
  const index = await artifact("index.html");
  const modulePath = [...index.matchAll(/<script[^>]+src="([^"]+)"/g)]
    .map((match) => match[1])
    .find((path) => path.includes("/assets/index-"));
  assert.ok(modulePath);
  const bundle = await artifact(modulePath.replace("/Zurich/", ""));

  assert.match(bundle, /A ZÜRICH DICTIONARY/);
  assert.match(bundle, /Birchermüesli/);
  assert.match(bundle, /Half Fare/);
  assert.match(bundle, /Zunfthaus/);
});
