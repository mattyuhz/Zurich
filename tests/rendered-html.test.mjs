import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Zürich field guide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Zürich Field Guide<\/title>/i);
  assert.match(html, /HIKING FROM ZÜRICH/);
  assert.match(html, /FIVE FIRST PICKS\. FIVE MORE OPTIONS\./);
  assert.match(html, /LIVE ZÜRICH/);
  assert.match(html, /READING THE NEXT FIVE DAYS/);
  assert.doesNotMatch(html, /Next six hours/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("adds live weather without removing or reordering the existing listing layer", async () => {
  const html = await (await render()).text();
  const listingOrder = ["STERNEN GRILL", "METZGEREI KELLER", "GERTRUDHOF", "ZUNFTHAUS ZUR WAAG", "MIT&amp;OHNE", "SPRÜNGLI", "MAME JOSEF"];
  const renderedListings = [...html.matchAll(/data-listing="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(renderedListings.length, 14);
  assert.deepEqual(renderedListings.slice(0, listingOrder.length), listingOrder);
  assert.match(html, /href="#now">[\s\S]*?Now<\/a>/);
});

test("publishes the complete ranked hiking decision layer", async () => {
  const html = await (await render()).text();

  for (const hike of [
    "STOOS RIDGE",
    "OESCHINENSEE PANORAMA",
    "PIZOL 5-LAKE TRAIL",
    "RIGI PANORAMA",
    "PLANET TRAIL",
    "EBENALP &amp; WILDKIRCHLI",
    "FLUMSERBERG 7-PEAK",
    "WEESEN → QUINTEN",
    "PILATUS TOMLISHORN",
    "SEEALPSEE LOOP",
  ]) {
    assert.match(html, new RegExp(hike));
  }

  assert.equal((html.match(/class="hike-card"/g) ?? []).length, 10);
  assert.equal((html.match(/hidden=""/g) ?? []).length, 5);
  assert.match(html, /SHOW FIVE MORE TRAILS/);
  assert.match(html, /EXPECTED FARE/);
  assert.match(html, /FROM ZÜRICH HB/);
  assert.match(html, /After work or half-day/);
  assert.match(html, /Official trail details/);
});

test("publishes the standout döner recommendation", async () => {
  const html = await (await render()).text();

  assert.match(html, /MIT&amp;OHNE/);
  assert.match(html, /Yaprak Steak Döner/);
  assert.match(html, /SIX FOOD OBJECTIVES/);
  assert.match(html, /high-quality non-Swiss quick eat/);
  assert.match(html, /Street eats \/ takeaway/);
  assert.match(html, /VERIFIED ON THE MENU/);
  assert.match(html, /No reservations taken/);
});

test("renders the filled symbol layer without replacing text labels", async () => {
  const html = await (await render()).text();

  assert.match(html, /class="material-symbol[^"]*" aria-hidden="true">tune</);
  assert.match(html, /aria-hidden="true">restaurant</);
  assert.match(html, /aria-hidden="true">location_on</);
  assert.match(html, /WHAT DO YOU NEED\?/);
  assert.match(html, /Open in Google Maps/);
  assert.match(html, /Official trail details/);
});

test("renders the glanceable decision hierarchy in the consolidated source", async () => {
  const html = await (await render()).text();

  assert.match(html, /FIND THE RIGHT MOVE IN SECONDS\./);
  assert.match(html, /MATCH THE PLAN TO YOUR TIME\./);
  assert.match(html, /Best all-rounder:/);
  assert.match(html, /WHY THIS ONE/);
  assert.match(html, /KNOW BEFORE YOU GO/);
});

test("keeps the merged dictionary enhancement in the canonical Pages artifact", async () => {
  const index = await readFile(new URL("../site/index.html", import.meta.url), "utf8");
  const glossary = await readFile(new URL("../site/glossary-links.js", import.meta.url), "utf8");

  assert.match(index, /glossary-links\.css/);
  assert.match(index, /glossary-links\.js/);
  assert.match(glossary, /Birchermüesli/);
  assert.match(glossary, /Half Fare/);
  assert.match(glossary, /Zunfthaus/);
});
