import assert from "node:assert/strict";
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
  assert.doesNotMatch(html, /codex-preview|Building your site/);
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
