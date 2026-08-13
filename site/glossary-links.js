(() => {
  const entries = {
    "beizli": {
      term: "Beizli",
      definition: "Swiss-German shorthand for a small, informal neighborhood pub or restaurant—the diminutive of Beiz.",
      group: "Food & dining",
    },
    "birchermüesli": {
      term: "Birchermüesli",
      pronunciation: "BEER-kher-myoos-lee",
      definition: "The Zürich-born breakfast of rolled oats, grated apple, nuts, lemon, and dairy, devised by physician Maximilian Bircher-Benner.",
      source: "https://www.zuerich.com/en/eat-drink/typical-and-traditional",
      group: "Food & dining",
    },
    "bürli": {
      term: "Bürli",
      pronunciation: "BOOR-lee",
      definition: "A small, crusty Swiss bread roll. At Sternen Grill, the sausage is served with a Gold Bürli on the side.",
      group: "Food & dining",
    },
    "gruyère": {
      term: "Gruyère",
      definition: "A firm Swiss cow’s-milk cheese with a nutty, savory character; the name is protected by AOP origin rules.",
      source: "https://www.gruyere.com/en/home",
      group: "Food & dining",
    },
    "luxemburgerli": {
      term: "Luxemburgerli",
      pronunciation: "LOOX-em-boor-ger-lee",
      definition: "Sprüngli’s small, airy filled macaron—a Zürich confection sold in many rotating flavors.",
      source: "https://www.zuerich.com/en/eat-drink/typical-and-traditional",
      group: "Food & dining",
    },
    "raclette": {
      term: "Raclette",
      definition: "A Swiss dish of melted cheese scraped over potatoes and typically served with pickles and onions—not a Zürich-specific specialty.",
      source: "https://www.myswitzerland.com/en-us/planning/about-switzerland/custom-and-tradition/raclette/",
      group: "Food & dining",
    },
    "rösti": {
      term: "Rösti",
      pronunciation: "RUHR-shtee",
      definition: "A crisp Swiss potato cake made from coarsely grated potatoes—golden outside and tender in the middle.",
      source: "https://www.zuerich.com/en/zurcher-geschnetzeltes",
      group: "Food & dining",
    },
    "schabziger": {
      term: "Schabziger",
      pronunciation: "SHAB-tsee-ger",
      definition: "A pungent, crumbly green cheese from Glarus flavored with blue fenugreek; usually grated or used in small amounts.",
      source: "https://www.myswitzerland.com/en-us/experiences/food-wine/food-wine-search/-/glarner-schabziger/",
      group: "Food & dining",
    },
    "st-galler-bratwurst": {
      term: "St. Galler Bratwurst",
      definition: "A pale, finely textured bratwurst associated with St. Gallen. Sternen Grill serves it as its signature walk-and-eat sausage.",
      group: "Food & dining",
    },
    "wiedikerli": {
      term: "Wiedikerli",
      pronunciation: "VEE-dee-ker-lee",
      definition: "A pork bratwurst created in Zürich’s Wiedikon quarter in the 1990s. Keller sells original, fennel, and chili versions to cook.",
      source: "https://www.zuerich.com/en/wiedikerli",
      group: "Food & dining",
    },
    "yaprak-döner": {
      term: "Yaprak döner",
      definition: "Döner made from stacked slices of whole meat rather than a uniform minced-meat cone; yaprak means “leaf” in Turkish.",
      source: "https://www.mitundohne.com/",
      group: "Food & dining",
    },
    "züri-gschnätzlets": {
      term: "Züri Gschnätzlets",
      pronunciation: "TSUE-ree gshnets-lets",
      definition: "Swiss German for Zürcher Geschnetzeltes: thin strips of pan-fried veal in a creamy sauce, traditionally served with rösti.",
      source: "https://www.zuerich.com/en/zurcher-geschnetzeltes",
      group: "Food & dining",
    },
    "ga-travelcard": {
      term: "GA Travelcard",
      definition: "The General Abonnement: a pass providing unlimited travel on SBB trains and most other public transport in Switzerland.",
      source: "https://business.sbb.ch/en/tickets-offers/travelcards/ga.html",
      group: "Getting around",
    },
    "half-fare": {
      term: "Half Fare",
      definition: "A Swiss travelcard that lets its holder buy reduced-price public-transport tickets; the saving can be less than 50% on some short or combined trips.",
      source: "https://www.sbb.ch/en/offers/half-fare-travelcard",
      group: "Getting around",
    },
    "hb": {
      term: "HB",
      definition: "Hauptbahnhof: Zürich’s main railway station and the city’s central long-distance and local transport hub.",
      source: "https://www.sbb.ch/en/travel-information/stations/find-station/zuerich-hb.html",
      group: "Getting around",
    },
    "kreis": {
      term: "Kreis",
      definition: "A numbered city district. Zürich has 12 Kreise, each containing one or more neighborhoods or Quartiere.",
      source: "https://www.stadt-zuerich.ch/de/politik-und-verwaltung/statistik-und-daten/kreise-und-quartiere.html",
      group: "Getting around",
    },
    "sbb": {
      term: "SBB",
      definition: "Swiss Federal Railways—the national rail operator and the main app/site used here for train, bus, boat, and mountain-transport planning.",
      source: "https://www.sbb.ch/en",
      group: "Getting around",
    },
    "zunfthaus": {
      term: "Zunfthaus",
      pronunciation: "TSOONFT-house",
      definition: "A guild house. Zürich’s historic guilds date to the 14th century, and several of their buildings now contain public restaurants.",
      source: "https://www.zuerich.com/en/eat-drink/typical-and-traditional/guild-house-restaurants",
      group: "Local language",
    },
  };

  const occurrenceCount = {};
  const selector = [
    ".shortlist li", ".food-row", ".directive", ".menu-list li", ".why",
    ".caveat", ".hike-detail > div", ".sunday-plan > div", ".trail-note",
    ".coffee-note", ".module-grid > div", ".card-top p",
  ].join(",");

  const aliases = {
    "züri-gschnätzlets": ["Züri Gschnätzlets", "Zürcher Geschnetzeltes", "Kalbsgeschnetzeltes ‘Zürcher Art’"],
    "st-galler-bratwurst": ["St. Galler Bratwurst", "Sternen bratwurst"],
    "yaprak-döner": ["Yaprak Steak Döner", "Yaprak döner"],
    "rösti": ["Rösti", "rösti"],
    "raclette": ["Raclette", "raclette"],
    "half-fare": ["Half Fare"],
    "ga-travelcard": ["GA Travelcard", "GA"],
    "zunfthaus": ["Zunfthaus"],
  };

  const term = (id, label) => {
    const entry = entries[id];
    const instance = `${id}-definition-${occurrenceCount[id] = (occurrenceCount[id] || 0) + 1}`;
    const wrapper = document.createElement("span");
    wrapper.className = "glossary-term";
    wrapper.innerHTML = `<button type="button" aria-expanded="false" aria-controls="${instance}">${label}<span class="sr-only"> — show definition</span></button>`;
    return { wrapper, instance, entry };
  };

  const definition = (id, instance, entry) => {
    const panel = document.createElement("span");
    panel.className = "glossary-definition";
    panel.id = instance;
    panel.innerHTML = `<b>${entry.term}</b>${entry.pronunciation ? `<small>${entry.pronunciation}</small>` : ""}${entry.definition}<a href="#glossary-${id}">Full entry ↓</a>`;
    return panel;
  };

  const wireDisclosure = (container, id, created) => {
    const button = created.wrapper.querySelector("button");
    const panel = definition(id, created.instance, created.entry);
    container.append(panel);
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      container.querySelectorAll(".glossary-definition").forEach((other) => { other.dataset.open = "false"; });
      container.querySelectorAll("[aria-expanded]").forEach((other) => { other.setAttribute("aria-expanded", "false"); });
      button.setAttribute("aria-expanded", String(open));
      panel.dataset.open = String(open);
    });
  };

  const findText = (container, labels) => {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => node.parentElement.closest("a, button, .glossary-definition") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    while (walker.nextNode()) {
      for (const label of labels) {
        const index = walker.currentNode.textContent.indexOf(label);
        if (index >= 0) return { node: walker.currentNode, label, index };
      }
    }
  };

  const enhanceTerm = (container, id) => {
    const marker = `data-glossary-${id}`;
    if (container.hasAttribute(marker)) return false;
    if (document.querySelectorAll(`[${marker}]`).length >= 2) return false;
    if (id === "zunfthaus" && container.textContent.includes("Zunfthaus zur")) return false;
    const labels = aliases[id] || [entries[id].term];
    const found = findText(container, labels);
    if (!found) return false;
    container.setAttribute(marker, "true");
    const created = term(id, found.label);
    const before = document.createTextNode(found.node.textContent.slice(0, found.index));
    const after = document.createTextNode(found.node.textContent.slice(found.index + found.label.length));
    found.node.replaceWith(before, created.wrapper, after);
    wireDisclosure(container, id, created);
    return true;
  };

  const place = (label, href) => {
    const link = document.createElement("a");
    link.className = "place-link";
    link.href = href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = label;
    link.setAttribute("aria-label", `${label} — open in Google Maps`);
    return link;
  };

  const mapTargets = [
    ["Sternen Grill", "https://www.google.com/maps/search/?api=1&query=Sternen%20Grill%20Z%C3%BCrich"],
    ["Keller", "https://www.google.com/maps/search/?api=1&query=Metzgerei%20Keller%20Z%C3%BCrich"],
    ["Zunfthaus zur Waag", "https://www.google.com/maps/search/?api=1&query=Zunfthaus%20zur%20Waag%20Z%C3%BCrich"],
    ["mit&ohne", "https://www.google.com/maps/search/?api=1&query=mit%26ohne%20Kebab%20Z%C3%BCrich%20HB"],
    ["Sprüngli", "https://www.google.com/maps/search/?api=1&query=Confiserie%20Spr%C3%BCngli%20Paradeplatz%20Z%C3%BCrich"],
    ["MAME", "https://www.google.com/maps/search/?api=1&query=MAME%20Josefstrasse%20160%20Z%C3%BCrich"],
    ["Gertrudhof", "https://www.google.com/maps/search/?api=1&query=Gertrudhof%20Z%C3%BCrich"],
  ];

  const enhancePlace = (container, label, href) => {
    if (container.querySelector(`a[aria-label^="${label} —"]`)) return;
    const found = findText(container, [label]);
    if (!found) return;
    const before = document.createTextNode(found.node.textContent.slice(0, found.index));
    const after = document.createTextNode(found.node.textContent.slice(found.index + label.length));
    found.node.replaceWith(before, place(label, href), after);
  };

  const buildAppendix = () => {
    if (document.querySelector("#glossary")) return;
    const nav = document.querySelector("nav");
    if (nav && !nav.querySelector('[href="#glossary"]')) nav.insertAdjacentHTML("beforeend", '<a href="#glossary">Dictionary</a>');
    const groups = ["Food & dining", "Getting around", "Local language"];
    const section = document.createElement("section");
    section.id = "glossary";
    section.className = "food-glossary";
    section.innerHTML = `<div class="food-glossary__intro"><div><p class="kicker">APPENDIX 01 · LOCAL WORDS</p><h2>A ZÜRICH DICTIONARY</h2></div><p>Tap any wavy-underlined word for context where you need it. Place names use a location mark and open directly in Google Maps.</p></div>${groups.map((group) => `<div class="glossary-group"><h3>${group}</h3><dl>${Object.entries(entries).filter(([, entry]) => entry.group === group).map(([id, entry]) => `<div id="glossary-${id}"><dt>${entry.term}${entry.pronunciation ? `<small>${entry.pronunciation}</small>` : ""}</dt><dd>${entry.definition}${entry.source ? `<a href="${entry.source}" target="_blank" rel="noreferrer">Reference ↗</a>` : ""}</dd></div>`).join("")}</dl></div>`).join("")}`;
    document.querySelector("footer")?.before(section);
  };

  const enhance = () => {
    buildAppendix();
    const containers = [...document.querySelectorAll(selector)];
    containers.forEach((container) => Object.keys(entries).forEach((id) => enhanceTerm(container, id)));
    document.querySelectorAll(".shortlist li, .food-row, .module-grid > div").forEach((container) => mapTargets.forEach(([label, href]) => enhancePlace(container, label, href)));
    return containers.length > 0;
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; enhance(); });
  };
  schedule();
  new MutationObserver(schedule).observe(document.getElementById("root"), { childList: true, subtree: true });
})();
