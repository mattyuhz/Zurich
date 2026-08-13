(() => {
  const entries = {
    "züri-gschnätzlets": {
      term: "Züri Gschnätzlets",
      pronunciation: "TSUE-ree gshnets-lets",
      definition: "Zürich-style sliced veal in a creamy white-wine and mushroom sauce, traditionally served with rösti.",
    },
    rösti: {
      term: "Rösti",
      pronunciation: "RUHR-shtee",
      definition: "A crisp Swiss potato cake made from coarsely grated potatoes—golden outside and tender in the middle.",
    },
    luxemburgerli: {
      term: "Luxemburgerli",
      pronunciation: "LOOX-em-boor-ger-lee",
      definition: "Sprüngli’s small, airy filled macaron—a Zürich confection sold in many rotating flavors.",
    },
  };

  const term = (id) => {
    const entry = entries[id];
    const wrapper = document.createElement("span");
    wrapper.className = "glossary-term";
    wrapper.innerHTML = `<button type="button" aria-expanded="false" aria-controls="${id}-definition">${entry.term}<span class="sr-only"> — show definition</span></button>`;
    return wrapper;
  };

  const definition = (id) => {
    const entry = entries[id];
    const panel = document.createElement("span");
    panel.className = "glossary-definition";
    panel.id = `${id}-definition`;
    panel.innerHTML = `<b>${entry.term}</b><small>${entry.pronunciation}</small>${entry.definition}<a href="#glossary-${id}">More in the glossary ↓</a>`;
    return panel;
  };

  const wireDisclosure = (item, id) => {
    const button = item.querySelector(`[aria-controls="${id}-definition"]`);
    const panel = definition(id);
    item.append(panel);
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      item.querySelectorAll(".glossary-definition").forEach((other) => { other.dataset.open = "false"; });
      item.querySelectorAll("[aria-expanded]").forEach((other) => { other.setAttribute("aria-expanded", "false"); });
      button.setAttribute("aria-expanded", String(open));
      panel.dataset.open = String(open);
    });
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

  const enhance = () => {
    const items = [...document.querySelectorAll(".shortlist li")];
    const foodItem = items.find((item) => item.textContent.includes("Order Züri Gschnätzlets with rösti"));
    if (!foodItem || foodItem.dataset.enhanced) return false;

    foodItem.dataset.enhanced = "true";
    const number = foodItem.querySelector("span");
    foodItem.replaceChildren(number, " Order ", term("züri-gschnätzlets"), " with ", term("rösti"));
    wireDisclosure(foodItem, "züri-gschnätzlets");
    wireDisclosure(foodItem, "rösti");

    const mapTargets = [
      ["Sternen Grill", "https://www.google.com/maps/search/?api=1&query=Sternen%20Grill%20Z%C3%BCrich"],
      ["MAME", "https://www.google.com/maps/search/?api=1&query=MAME%20Josefstrasse%20160%20Z%C3%BCrich"],
    ];
    items.forEach((item) => mapTargets.forEach(([label, href]) => {
      if (!item.textContent.includes(label)) return;
      [...item.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => {
        const index = node.textContent.indexOf(label);
        if (index < 0) return;
        const before = document.createTextNode(node.textContent.slice(0, index));
        const after = document.createTextNode(node.textContent.slice(index + label.length));
        node.replaceWith(before, place(label, href), after);
      });
    }));

    const sweetItem = items.find((item) => item.textContent.includes("Take home fresh Luxemburgerli"));
    if (sweetItem) {
      const numberNode = sweetItem.querySelector("span");
      sweetItem.replaceChildren(numberNode, " Take home fresh ", term("luxemburgerli"));
      wireDisclosure(sweetItem, "luxemburgerli");
    }

    const section = document.createElement("section");
    section.id = "glossary";
    section.className = "food-glossary";
    section.innerHTML = `<div class="food-glossary__intro"><div><p class="kicker">APPENDIX 01 · FOOD WORDS</p><h2>A SMALL ZÜRICH DICTIONARY</h2></div><p>Tap any wavy-underlined food word for a quick definition. This appendix keeps the fuller context in one place.</p></div><dl>${Object.entries(entries).map(([id, entry]) => `<div id="glossary-${id}"><dt>${entry.term}<small>${entry.pronunciation}</small></dt><dd>${entry.definition}</dd></div>`).join("")}</dl>`;
    document.querySelector("footer")?.before(section);
    return true;
  };

  if (!enhance()) {
    const observer = new MutationObserver(() => enhance() && observer.disconnect());
    observer.observe(document.getElementById("root"), { childList: true, subtree: true });
  }
})();
