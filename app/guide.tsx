"use client";

import { useEffect, useMemo, useState } from "react";
import LiveWeather from "./live-weather";
import MaterialSymbol, { type MaterialSymbolName } from "./material-symbol";
import { getOpeningStatus, type OpeningStatus, type WeeklyHours } from "./opening-hours";

type Pick = {
  name: string;
  priority: "Must" | "Strong pick" | "Good nearby";
  section: "eat" | "coffee" | "design" | "outside";
  area: string;
  get: string;
  why: string;
  time: string;
  cost: string;
  tags: string[];
  maps: string;
  caveat?: string;
  opens?: string;
  hours?: WeeklyHours;
  level?: string;
  coffeeFocus?: string;
  beans?: string;
  format?: string;
  reservation?: string;
  menuItems?: string[];
  menuUrl?: string;
};

const picks: Pick[] = [
  { name: "STERNEN GRILL", priority: "Must", section: "eat", area: "Bellevue", get: "St. Galler Bratwurst with Gold Bürli and the sharp Sternen mustard.", why: "The best match for a walk-and-eat stop: order at the street-level counter and keep moving.", time: "30m", cost: "CHF", tags: ["hungry", "1h", "tired", "street"], format: "Street counter · takeaway", reservation: "No reservation", menuItems: ["TOP — St. Galler Bratwurst · Gold Bürli · Sternen mustard", "Also confirmed — potato salad"], menuUrl: "https://www.sternengrill.ch/take-away-bellevue-zuerich-city", maps: "https://www.google.com/maps/search/?api=1&query=Sternen%20Grill%20Z%C3%BCrich" },
  { name: "METZGEREI KELLER", priority: "Must", section: "eat", area: "Wiedikon", get: "Buy the Original Wiedikerli only if you can cook it later.", why: "This is the source of Zürich’s hyperlocal sausage, but the verified offer is a butcher-shop product—not a ready-to-eat walking snack.", time: "30m", cost: "CHF", tags: ["1h", "wander"], format: "Butcher shop · take home", reservation: "No reservation", menuItems: ["TOP — Wiedikerli Classic", "Also confirmed — Wiedikerli Piccante", "Also confirmed — Wiedikerli Fenchel", "Also confirmed — Wiedikerli Kalb"], menuUrl: "https://www.metzgerei-keller.ch/de/stadtzuercher-wurstspezialitaeten/wiediker-rostbratwurst-wiedikerli", caveat: "Do not count this as lunch unless you have confirmed a cooked serving; the listed Wiedikerli are sold to prepare yourself.", maps: "https://www.google.com/maps/search/?api=1&query=Metzgerei%20Keller%20Z%C3%BCrich" },
  { name: "GERTRUDHOF", priority: "Strong pick", section: "eat", area: "Kreis 3", get: "Start with the Original Cordon bleu—pork or veal, mini or normal—and add rösti separately.", why: "A small neighborhood Swiss Beizli with a huge, unusually specific Cordon bleu menu.", time: "2–3h", cost: "CHF CHF", tags: ["hungry"], format: "Casual sit-down · takeaway available", reservation: "Reserve for dinner", menuItems: ["TOP — Original: ham · Gruyère · raclette", "Glarner: ham · Maggi · Schabziger · raclette", "Berner: ham · bacon · fried onions · raclette", "Side — rösti (ordered separately)"], menuUrl: "https://www.gertrudhof.ch/essen_trinken/", caveat: "Cordon bleus take about 25–35 minutes and do not include a side. Takeaway can be ordered by phone.", maps: "https://www.google.com/maps/search/?api=1&query=Gertrudhof%20Z%C3%BCrich" },
  { name: "ZUNFTHAUS ZUR WAAG", priority: "Strong pick", section: "eat", area: "Münsterhof", get: "Kalbsgeschnetzeltes ‘Zürcher Art’ with butter rösti; choose with or without veal kidneys.", why: "The proper sit-down version of Zürich’s defining main dish in a historic guild house.", time: "2–3h", cost: "CHF CHF", tags: ["hungry", "2–3h"], format: "Traditional sit-down · table service", reservation: "Reserve ahead", menuItems: ["TOP — Kalbsgeschnetzeltes ‘Zürcher Art’ · butter rösti · with/without veal kidneys", "Also confirmed — veal Wiener schnitzel · potato-cucumber salad · lingonberries", "Dessert — chocolate mousse by Marcel Chardon"], menuUrl: "https://www.zunfthaus-zur-waag.ch/menu", maps: "https://www.google.com/maps/search/?api=1&query=Zunfthaus%20zur%20Waag%20Z%C3%BCrich" },
  { name: "MIT&OHNE", priority: "Strong pick", section: "eat", area: "Zürich HB / Lochergut", get: "Yaprak Steak Döner; choose the toppings and sauce you actually want at the counter.", why: "A high-quality non-Swiss quick eat that fits the walk-around-and-sample style better than another long meal.", time: "30m", cost: "CHF CHF", tags: ["hungry", "1h", "tired", "work", "sunday", "street"], format: "Fast casual · takeaway", reservation: "No reservations taken", menuItems: ["TOP — Yaprak Steak Döner (Swiss beef)", "Also confirmed — Chicken Döner", "Meatless — Planted Chicken Kebab"], menuUrl: "https://www.mitundohne.com/", caveat: "HB is the convenient branch; Lochergut is the original. The official menu confirms the dishes, but toppings are customizable—order rather than rely on a made-up fixed build.", maps: "https://www.google.com/maps/search/?api=1&query=mit%26ohne%20Kebab%20Z%C3%BCrich%20HB" },
  { name: "SPRÜNGLI", priority: "Strong pick", section: "eat", area: "Paradeplatz", get: "Build a small mixed box of Luxemburgerli and eat them fresh.", why: "A quick, low-commitment Zürich sweet stop that fits naturally into a walk through the center.", time: "30m", cost: "CHF", tags: ["1h", "tired", "rain", "street"], format: "Counter shop · takeaway", reservation: "No reservation", menuItems: ["TOP MIX — pistachio · lemon · caramel fleur de sel", "Also confirmed — raspberry deluxe · hazelnut · bourbon vanilla · chocolate", "Contains alcohol — Champagne Rosé"], menuUrl: "https://www.spruengli.ch/de/luxemburgerli-sorten.html", maps: "https://www.google.com/maps/search/?api=1&query=Confiserie%20Spr%C3%BCngli%20Paradeplatz%20Z%C3%BCrich" },
  { name: "MAME JOSEF", priority: "Must", section: "coffee", area: "Kreis 5", get: "Name a flavor direction—floral, fruity, or chocolatey—then let the barista choose. Go filter or straight espresso before adding milk.", why: "The clearest Coffee Movement / acid-caliber stop in Zürich: competition pedigree, unusual lots, distinct espresso and filter roasts, and genuinely guided service.", time: "30m", cost: "CHF CHF", tags: ["coffee", "early", "1h", "work", "wander"], opens: "07:30 weekdays · 08:30 weekends", hours: { 0: [["08:30", "17:00"]], 1: [["07:30", "17:00"]], 2: [["07:30", "17:00"]], 3: [["07:30", "17:00"]], 4: [["07:30", "17:00"]], 5: [["07:30", "17:00"]], 6: [["08:30", "17:00"]] }, level: "Benchmark tier", coffeeFocus: "Pour-over ★ · espresso ★ · milk ✓ · experimental ★", beans: "Excellent. Daily and competition coffees; filter- and espresso-specific roasts.", caveat: "Josef is compact and coffee-first. The roastery itself is not open to the public.", maps: "https://www.google.com/maps/search/?api=1&query=MAME%20Josefstrasse%20160%20Z%C3%BCrich" },
  { name: "COFFEE ADDICT", priority: "Must", section: "coffee", area: "Kreis 4", get: "Ask what guest roaster is open and start with espresso; ask about the day’s filter or experimental option rather than assuming.", why: "A tiny, owner-led coffee counter with a rotating international-roaster program—the best conversation-and-bean-shelf complement to MAME.", time: "30m", cost: "CHF", tags: ["coffee", "early", "1h", "wander"], opens: "07:30 weekdays · 09:00 Sat · closed Sun", hours: { 1: [["07:30", "11:30"], ["12:00", "16:30"]], 2: [["07:30", "11:30"], ["12:00", "16:30"]], 3: [["07:30", "11:30"], ["12:00", "16:30"]], 4: [["07:30", "11:30"], ["12:00", "16:30"]], 5: [["07:30", "11:30"], ["12:00", "16:30"]], 6: [["09:00", "16:30"]] }, level: "Benchmark-adjacent curator", coffeeFocus: "Espresso ★ · rotating specials · takeaway", beans: "Excellent for variety. Rotating specialty roasters from different countries.", caveat: "Weekdays pause 11:30–12:00; this is a small to-go shop, not a linger-all-morning café.", maps: "https://www.google.com/maps/search/?api=1&query=Coffee%20Addict%20B%C3%A4ckerstrasse%2025%20Z%C3%BCrich" },
  { name: "BEAN BANK", priority: "Strong pick", section: "coffee", area: "Europaallee", get: "Choose a hand brew or an expressive espresso; compare the house roasting with the current guest-roaster shelf.", why: "The strongest near-HB coffee-nerd stop for light-roast range, serious equipment, and a broad take-home selection.", time: "30m", cost: "CHF CHF", tags: ["coffee", "early", "1h", "work", "wander"], opens: "07:30 weekdays · 09:30 Sat · closed Sun", hours: { 1: [["07:30", "18:00"]], 2: [["07:30", "18:00"]], 3: [["07:30", "18:00"]], 4: [["07:30", "18:00"]], 5: [["07:30", "18:00"]], 6: [["09:30", "17:30"]] }, level: "Specialty destination", coffeeFocus: "Pour-over ★ · espresso ★ · milk ✓", beans: "Excellent. Zürich-roasted lots plus rotating Swiss and international roasters.", caveat: "Use Lagerstrasse for the full selection; weekend hours start later and published listings vary, so check Maps.", maps: "https://www.google.com/maps/search/?api=1&query=Bean%20Bank%20Coffee%20Lagerstrasse%2018c%20Z%C3%BCrich" },
  { name: "MIRÓ CENTRAL", priority: "Strong pick", section: "coffee", area: "Zürich HB", get: "Use it for a very early espresso or flat white; save a slower roastery visit for the Brauerstrasse café.", why: "The practical early-bird winner: locally roasted specialty coffee inside HB from 06:00 weekdays and 07:00 weekends, without settling for a generic station cup.", time: "30m", cost: "CHF", tags: ["coffee", "early", "1h", "tired", "rain", "sunday"], opens: "06:00 weekdays · 07:00 weekends", hours: { 0: [["07:00", "20:00"]], 1: [["06:00", "21:00"]], 2: [["06:00", "21:00"]], 3: [["06:00", "21:00"]], 4: [["06:00", "21:00"]], 5: [["06:00", "21:00"]], 6: [["07:00", "20:00"]] }, level: "Serious specialty", coffeeFocus: "Espresso ★ · milk ★ · fast takeaway", beans: "Very good. Fresh Zürich roasts plus home-brewing gear at Central.", caveat: "Central optimizes speed and hours. For more space and the roastery context, use Brauerstrasse after 08:00 weekdays / 09:00 weekends.", maps: "https://www.google.com/maps/search/?api=1&query=Mir%C3%B3%20Central%20Z%C3%BCrich%20HB" },
  { name: "COLLECTIVE BAKERY", priority: "Strong pick", section: "coffee", area: "Wiedikon / Zürich West", get: "At the Freyastrasse window, pair the best pastry with a hand brew, batch brew, or espresso drink.", why: "A legitimate specialty program with house-roasted coffee, but the reason to choose it over MAME is the exceptional baking—not greater coffee experimentation.", time: "1h", cost: "CHF", tags: ["coffee", "early", "hungry", "1h", "rain", "sunday"], opens: "Freyastrasse 07:00 weekdays · 08:00 weekends", hours: { 0: [["08:00", "14:00"]], 1: [["07:00", "14:00"]], 2: [["07:00", "14:00"]], 3: [["07:00", "14:00"]], 4: [["07:00", "14:00"]], 5: [["07:00", "14:00"]], 6: [["08:00", "14:00"]] }, level: "Specialty + bakery", coffeeFocus: "Hand brew ✓ · batch ✓ · espresso ✓ · milk ✓ · cold brew", beans: "Good house-roasted option; ask which retail bags are freshest that day.", caveat: "Branch matters: the Zürich West pavilion opens 07:30 weekdays / 09:00 weekends; Freyastrasse is the early move.", maps: "https://www.google.com/maps/search/?api=1&query=Collective%20Bakery%20Freyastrasse%203%20Z%C3%BCrich" },
  { name: "MUSEUM FÜR GESTALTUNG", priority: "Must", section: "design", area: "Ausstellungsstrasse / Toni-Areal", get: "Pick the location by its current exhibitions.", why: "The city’s clearest design priority: visual communication, objects, and Swiss graphic culture.", time: "2–3h", cost: "CHF CHF", tags: ["design", "rain", "2–3h"], caveat: "Check exhibitions and Monday closures before leaving.", maps: "https://www.google.com/maps/search/?api=1&query=Museum%20f%C3%BCr%20Gestaltung%20Z%C3%BCrich" },
  { name: "PAVILLON LE CORBUSIER", priority: "Strong pick", section: "design", area: "Seefeld", get: "See the pavilion, then continue along the lakefront.", why: "A compact architecture destination that turns naturally into a sunny neighborhood walk.", time: "2–3h", cost: "CHF CHF", tags: ["design", "sunny", "2–3h", "wander"], caveat: "Seasonal; verify that it is open.", maps: "https://www.google.com/maps/search/?api=1&query=Pavillon%20Le%20Corbusier%20Z%C3%BCrich" },
  { name: "UETLIBERG → FELSENEGG", priority: "Strong pick", section: "outside", area: "Zürich ridge", get: "Walk the ridge when you want exercise without committing to an Alpine day.", why: "The dependable close-to-town scenic reset; save a clear full day for bigger mountains.", time: "Half-day", cost: "CHF", tags: ["outside", "sunny", "sunday"], maps: "https://www.google.com/maps/search/?api=1&query=Uetliberg%20Z%C3%BCrich" },
];

const intents: Array<[string, string, MaterialSymbolName]> = [
  ["hungry", "I’m hungry", "restaurant"], ["street", "Street eats / takeaway", "takeout_dining"], ["coffee", "I need coffee", "local_cafe"], ["early", "Coffee before 8", "schedule"], ["1h", "I have 1 hour", "timer"],
  ["2–3h", "I have 2–3 hours", "schedule"], ["rain", "It’s raining", "rainy"], ["sunny", "It’s sunny", "sunny"],
  ["tired", "I’m tired", "hotel"], ["work", "Near work / Europaallee", "work"], ["wander", "I want to wander", "explore"],
  ["design", "I want design", "design_services"], ["outside", "I want outdoors", "forest"], ["sunday", "It’s Sunday", "calendar_today"],
];

const hikes = [
  {
    rank: "01", score: "9.8", name: "STOOS RIDGE", place: "Klingenstock → Fronalpstock", slot: "Best clear weekend day",
    verdict: "Best view-to-effort payoff", stats: "5 km · 2h 30m · moderate / exposed",
    travel: "≈1h 20m to Schwyz–Stoos valley station; allow ≈2h to the trail after funicular, village walk, and chairlift.",
    logistics: "Train to Schwyz → bus to Schwyz, Stoosbahn → 7m funicular → 15m walk → Klingenstock chairlift. Hike the ridge, then descend by Fronalpstock chairlifts.",
    fare: "Peak Experience ticket CHF 60 adult + SBB rail/bus. Book lifts online and check the final descent.",
    why: "Continuous Lake Lucerne and Alpine views, with the funicular adding to the day. Choose this over Rigi when the sky is genuinely clear.",
    href: "https://www.stoos.ch/en/stories/stoos-ridge-hike",
  },
  {
    rank: "02", score: "9.7", name: "OESCHINENSEE PANORAMA", place: "Heuberg → Oberbärgli lake loop", slot: "Saturday / Sunday only",
    verdict: "Most cinematic single landscape", stats: "8.3 km · 2h 54m · +496 m · mountain trail",
    travel: "≈2h 15m to Kandersteg; allow ≈2h 40m to the upper gondola station and trail.",
    logistics: "Train via Bern and Spiez → short bus or 15m walk to the gondola → loop via Heuberg and Oberbärgli. Narrow sections require a head for heights.",
    fare: "SBB rail varies; gondola CHF 40 adult return / CHF 22.50 Half Fare in high season. Reserve an uphill time slot.",
    why: "The lake color, waterfalls, and enclosing peaks are the visual winner. From Zürich, however, it is a long day and makes more sense if not repeated later from the Bernese Oberland.",
    href: "https://www.oeschinensee.ch/en/wandern/",
  },
  {
    rank: "03", score: "9.4", name: "PIZOL 5-LAKE TRAIL", place: "Pizolhütte → Gaffia", slot: "Saturday / Sunday only",
    verdict: "Best pure hiking day", stats: "11.4 km · 4h 30m · +553 / −911 m · moderate",
    travel: "≈1h 25m to Wangs valley station; allow ≈2h 15m to reach Pizolhütte after the gondola and two chairlifts.",
    logistics: "Train to Sargans → bus to Wangs, Pizolbahn → gondola and chairlifts to Pizolhütte. Hike to Gaffia and ride down; three lifts each way make timing important.",
    fare: "5-Lakes lift package CHF 64 adult / CHF 32 Half Fare or GA + SBB rail/bus. Be at Gaffia by 16:30 for the last descent.",
    why: "More varied and hike-forward than Stoos: five lakes, rocky passes, and a satisfying full route. It asks more of your legs and has less margin for a late start.",
    href: "https://pizol.com/en/summer/hike/",
  },
  {
    rank: "04", score: "8.7", name: "RIGI PANORAMA", place: "Rigi Kaltbad → Rigi Scheidegg", slot: "Flexible weekend backup",
    verdict: "Easiest big-mountain panorama", stats: "7.1 km · 1h 50m · easy",
    travel: "≈1h to Arth-Goldau; allow roughly 1h 45m to reach the mountain route by train and mountain railway.",
    logistics: "Train to Arth-Goldau → cogwheel railway / Kräbel connection. The historic rail-bed trail is broad and forgiving; confirm the return route from Scheidegg.",
    fare: "Rigi day pass CHF 84 adult / CHF 42 Half Fare; Swiss Travel Pass and GA included. SBB rail to the mountain is additional for others.",
    why: "The calmest logistics-to-scenery ratio and a good choice for uncertain energy. Stoos is more dramatic; Rigi is easier and more flexible.",
    href: "https://www.rigi.ch/en/experience/hiking",
  },
  {
    rank: "05", score: "7.2", name: "PLANET TRAIL", place: "Uetliberg → Felsenegg", slot: "After work or half-day",
    verdict: "Best convenience payoff", stats: "7.17 km · 2h · +220 m · easy",
    travel: "31m from Zürich HB to Uetliberg; roughly 35–45m home from Felsenegg via cable car and Adliswil.",
    logistics: "S10 toward Uetliberg → ridge walk → Felsenegg cable car → bus / train from Adliswil. In 2026, check S10 disruption and route via Selnau.",
    fare: "Albis 24-hour ticket about CHF 17 adult; Zürich Card also covers Uetliberg and the Felsenegg return.",
    why: "The only option that fits a long summer evening after work. It is a Zürich ridge with lake and city views—not a substitute for one of the Alpine days above.",
    href: "https://www.zuerich.com/en/visit/nature/planet-trail-hike-from-uetliberg-to-felsenegg",
  },
  {
    rank: "06", score: "9.1", name: "EBENALP & WILDKIRCHLI", place: "Ebenalp → Äscher → Seealpsee → Wasserauen", slot: "Clear weekend day",
    verdict: "Best cliffs-and-culture mix", stats: "≈6 km · 2h 30m–3h · steep descent",
    travel: "≈2h to Wasserauen; allow ≈2h 15m to reach Ebenalp after the cable car.",
    logistics: "Train via Gossau and Appenzell → cable car from Wasserauen → Wildkirchli caves and Äscher → descend via Seealpsee. The trail is steep and can be slippery; skip it in wet weather.",
    fare: "Ebenalp cable car CHF 24 adult one-way / CHF 12 Half Fare or GA + SBB rail. No return lift is needed when hiking down.",
    why: "A huge visual return from a compact route: limestone walls, the cliff-hugging Äscher inn, and Seealpsee. It sits below the first five because the steep descent is less forgiving than its distance suggests.",
    href: "https://www.appenzell.ch/en/summer/hiking/hiking-tours/ebenalp-wildkirchli-aescher-seealpsee-wasserauen.html",
  },
  {
    rank: "07", score: "8.9", name: "FLUMSERBERG 7-PEAK", place: "Maschgenkamm → Tannenboden", slot: "Strong legs / full day",
    verdict: "Best athletic ridge chain", stats: "15.1 km · 6h · +676 / −1,309 m · demanding",
    travel: "≈1h 15m to Unterterzen; allow ≈1h 55m to reach Maschgenkamm via the SeeJet gondola and BergJet lift.",
    logistics: "Train to Unterterzen → SeeJet to Tannenboden → BergJet to Maschgenkamm → traverse seven summits and descend to Tannenboden. This is a long, sporty route—not a beginner day.",
    fare: "SeeJet + BergJet ascent about CHF 34.60 adult / CHF 17.30 Half Fare or GA + SBB rail. Confirm the correct one-way combination before buying.",
    why: "Big continuous views and far less transit than the Bernese Oberland. The long descent and six-hour moving time make it a specialist alternative rather than a default first pick.",
    href: "https://www.flumserberg.ch/en/Experience-summer/7-Peak-Tour-Flumserberg_trip_362876",
  },
  {
    rank: "08", score: "8.3", name: "WEESEN → QUINTEN", place: "Walensee north shore", slot: "Warm, dry weekend day",
    verdict: "Best lake-and-waterfall walk", stats: "10.8 km · 3h 25m · +446 / −449 m · moderate",
    travel: "≈55m to Ziegelbrücke; allow ≈1h 15m to reach the lakeside start in Weesen by bus.",
    logistics: "Train to Ziegelbrücke → bus to Weesen → hike the car-free north shore to Quinten → seasonal boat to Murg or Weesen → train home. Check the final boat before setting out.",
    fare: "SBB rail/bus plus a Walensee boat ticket; expect roughly CHF 35–60 total with Half Fare depending on the boat and return route. Price the exact connection in SBB Mobile.",
    why: "A distinctive lower-altitude option with turquoise water, vineyards, and waterfalls. The payoff is excellent, but the seasonal boat creates more timetable risk than the headline five.",
    href: "https://www.amden-weesen.ch/en/poi/detail/weesen-quinten-3e49e86625",
  },
  {
    rank: "09", score: "8.5", name: "PILATUS TOMLISHORN", place: "Pilatus Kulm → Tomlishorn return", slot: "Half-day-plus / clear weather",
    verdict: "Best short summit panorama", stats: "≈3 km · 1h 30m return · exposed but secured",
    travel: "≈1h to Luzern; allow ≈2h 15m to Pilatus Kulm via Kriens, the panorama gondola, and aerial cableway.",
    logistics: "Train to Luzern → bus to Kriens → gondola to Fräkmüntegg → Dragon Ride cableway to Pilatus Kulm → out-and-back flower trail. The route is usually open mid-June to October.",
    fare: "2026 Kriens–Pilatus Kulm return CHF 84 adult / CHF 42 Half Fare or GA + SBB rail/bus. A RailAway offer may reduce the total June–September.",
    why: "Enormous views for only 90 minutes on foot. It ranks lower because the mountain transport is expensive and the summit can feel more like an excursion than a full hiking day.",
    href: "https://pilatus.ch/en/activities/flower-trail",
  },
  {
    rank: "10", score: "7.9", name: "SEEALPSEE LOOP", place: "Wasserauen → Seealpsee → Wasserauen", slot: "Easy Appenzell backup",
    verdict: "Best lift-free lake option", stats: "7.3 km · 2h 30m · +377 / −377 m · easy T2",
    travel: "≈2h from Zürich HB to Wasserauen; the signed route starts beside the station.",
    logistics: "Train via Gossau and Appenzell → walk the loop from Wasserauen. No gondola is required; choose the gentler forest route and treat the steep paved access road with care.",
    fare: "SBB return to Wasserauen only; roughly CHF 55–65 full fare / CHF 28–33 with Half Fare before saver-ticket discounts.",
    why: "Simple logistics, a beautiful Alpine lake, and no dependence on lift hours. The long rail journey for a short, lower-drama walk keeps it in the expanded list.",
    href: "https://www.appenzell.ch/en/summer/hiking/hiking-tours/wasserauen-seealpsee-wasserauen.html",
  },
];

const foodObjectives = [
  ["Züri Gschnätzlets", "The Zürich main dish", "Zunfthaus zur Waag"],
  ["Wiedikerli", "The hyperlocal sausage", "Keller · buy to cook"],
  ["Sternen bratwurst", "The city institution", "Sternen Grill"],
  ["Yaprak döner", "The standout non-Swiss quick eat", "mit&ohne"],
  ["Birchermüesli", "Invented here", "Have it at breakfast"],
  ["Luxemburgerli", "A Zürich creation", "Sprüngli"],
];

const quickPlan = [
  ["30 min", "Sternen Grill or a serious coffee", "Low"],
  ["1 hour", "One neighborhood stop + a short walk", "Low"],
  ["2–3 hours", "HB → Old Town → lake", "Low"],
  ["Half-day", "Uetliberg → Felsenegg", "Medium"],
  ["Clear full day", "Stoos ridge; Pizol for more hiking", "High"],
];

const neighborhoods = [
  {
    number: "01",
    name: "OLD TOWN → LAKE",
    orientation: "First-day orientation",
    time: "2–3 hours",
    summary: "Use this to understand the city before chasing individual pins. The route moves from the station through the old center, crosses the river, and finishes where Zürich opens onto the lake.",
    stops: ["Zürich HB", "Lindenhof", "Niederdorf", "Grossmünster", "Bellevue", "Lake promenade"],
    short: "Lindenhof → Niederdorf → Bellevue",
    route: "https://www.google.com/maps/dir/?api=1&origin=Z%C3%BCrich%20HB&destination=Z%C3%BCrichhorn%2C%20Z%C3%BCrich&waypoints=Lindenhof%2C%20Z%C3%BCrich%7CGrossm%C3%BCnster%2C%20Z%C3%BCrich%7CBellevue%2C%20Z%C3%BCrich&travelmode=walking",
  },
  {
    number: "02",
    name: "HB → ZÜRICH WEST",
    orientation: "Best after work",
    time: "2–4 hours",
    summary: "The most efficient design-and-coffee corridor from the station. Start polished at Europaallee, then follow the railway west as the city shifts into arches, workshops, and industrial reuse.",
    stops: ["Bean Bank", "Europaallee", "Viadukt", "MAME Josef", "FREITAG tower"],
    short: "Viadukt → MAME Josef",
    route: "https://www.google.com/maps/dir/?api=1&origin=Bean%20Bank%20Coffee%2C%20Z%C3%BCrich&destination=FREITAG%20Flagship%20Store%2C%20Z%C3%BCrich&waypoints=Im%20Viadukt%2C%20Z%C3%BCrich%7CMAME%20Josef%2C%20Z%C3%BCrich&travelmode=walking",
  },
  {
    number: "03",
    name: "KREIS 3 / 4",
    orientation: "Best food crawl",
    time: "Half-day",
    summary: "Choose this when neighborhood texture matters more than monuments. It is a loose, local-feeling circuit built around tiny coffee, a Zürich-only sausage stop, serious pastry, and a proper dinner finish.",
    stops: ["Coffee Addict", "Bäckeranlage", "Metzgerei Keller", "Collective Bakery", "Gertrudhof"],
    short: "Collective Bakery → Gertrudhof",
    route: "https://www.google.com/maps/dir/?api=1&origin=Coffee%20Addict%2C%20Z%C3%BCrich&destination=Gertrudhof%2C%20Z%C3%BCrich&waypoints=B%C3%A4ckeranlage%2C%20Z%C3%BCrich%7CMetzgerei%20Keller%2C%20Z%C3%BCrich%7CCollective%20Bakery%20Freyastrasse%2C%20Z%C3%BCrich&travelmode=walking",
  },
  {
    number: "04",
    name: "SEEFELD LAKE EDGE",
    orientation: "Best in sun",
    time: "2–3 hours",
    summary: "A calm architecture walk when the weather is too good for museums. The city thins into lawns and lake views, with Le Corbusier’s pavilion as the graphic focal point rather than the whole reason to go.",
    stops: ["Bellevue", "Bürkliplatz", "Quaibrücke", "Pavillon Le Corbusier", "Chinagarten"],
    short: "Pavillon Le Corbusier → Chinagarten",
    route: "https://www.google.com/maps/dir/?api=1&origin=Bellevue%2C%20Z%C3%BCrich&destination=Chinagarten%20Z%C3%BCrich&waypoints=B%C3%BCrkliplatz%2C%20Z%C3%BCrich%7CPavillon%20Le%20Corbusier%2C%20Z%C3%BCrich&travelmode=walking",
  },
  {
    number: "05",
    name: "CITY DESIGN SPINE",
    orientation: "Best in rain",
    time: "3–5 hours",
    summary: "Make design the organizing principle instead of treating museums as isolated stops. Begin with the current exhibitions, then connect Swiss graphics, retail, and the center without doubling back across town.",
    stops: ["Museum für Gestaltung", "Europaallee", "Bahnhofstrasse", "Museum Haus Konstruktiv"],
    short: "Museum für Gestaltung — one location, chosen by exhibition",
    route: "https://www.google.com/maps/dir/?api=1&origin=Museum%20f%C3%BCr%20Gestaltung%20Ausstellungsstrasse%2C%20Z%C3%BCrich&destination=Museum%20Haus%20Konstruktiv%2C%20Z%C3%BCrich&waypoints=Europaallee%2C%20Z%C3%BCrich%7CBahnhofstrasse%2C%20Z%C3%BCrich&travelmode=walking",
  },
];

export default function Guide() {
  const [active, setActive] = useState<string[]>([]);
  const [showAllHikes, setShowAllHikes] = useState(false);
  const [openingStatuses, setOpeningStatuses] = useState<Record<string, OpeningStatus>>({});
  const shown = useMemo(() => active.length ? picks.filter((pick) => active.every((tag) => pick.tags.includes(tag))) : picks, [active]);
  const toggle = (tag: string) => setActive((now) => now.includes(tag) ? now.filter((item) => item !== tag) : [...now, tag]);
  const coffeePicks = picks.filter((pick) => pick.section === "coffee");

  useEffect(() => {
    const update = () => setOpeningStatuses(Object.fromEntries(
      picks.filter((pick) => pick.hours).map((pick) => [pick.name, getOpeningStatus(pick.hours!)]),
    ));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const statusFor = (pick: Pick) => openingStatuses[pick.name];

  return <main>
    <header className="masthead" id="top">
      <div><p className="eyebrow">FIELD GUIDE · 47.3769° N</p><h1>ZÜRICH</h1></div>
      <p className="reviewed">Reviewed<br />13.08.26</p>
    </header>
    <nav aria-label="Guide sections">
      <a href="#now"><MaterialSymbol name="sunny" />Now</a><a href="#essentials"><MaterialSymbol name="tune" />Essentials</a><a href="#hiking"><MaterialSymbol name="hiking" />Hiking</a><a href="#eat"><MaterialSymbol name="restaurant" />Eat</a><a href="#coffee"><MaterialSymbol name="local_cafe" />Coffee</a><a href="#design"><MaterialSymbol name="design_services" />Design</a><a href="#neighborhoods"><MaterialSymbol name="map" />Neighborhoods</a><a href="#outside"><MaterialSymbol name="landscape" />Outside</a>
    </nav>

    <LiveWeather picks={picks} />

    <section className="intro" id="essentials">
      <p className="kicker icon-label"><MaterialSymbol name="filter_alt" />WHAT DO YOU NEED?</p>
      <h2>FIND THE RIGHT MOVE IN SECONDS.</h2>
      <div className="filters">{intents.map(([tag, label, icon]) => <button key={tag} aria-pressed={active.includes(tag)} onClick={() => toggle(tag)}><MaterialSymbol name={icon} />{label}</button>)}</div>
      <div className="result-line"><span>{shown.length} {shown.length === 1 ? "answer" : "answers"}</span>{active.length > 0 && <button className="clear" onClick={() => setActive([])}><MaterialSymbol name="close" />Clear filters</button>}</div>
    </section>

    {active.length === 0 && <section className="quick-plan" aria-labelledby="quick-plan-title">
      <div className="section-heading"><div><p className="kicker">AT A GLANCE</p><h2 id="quick-plan-title">MATCH THE PLAN TO YOUR TIME.</h2></div><p>Start with the smallest commitment that fits. Save mountain days for clear weather.</p></div>
      <div className="quick-table" role="table" aria-label="Zurich plans by available time">
        <div className="quick-head" role="row"><span>TIME</span><span>DEFAULT MOVE</span><span>PLANNING</span></div>
        {quickPlan.map(([time, plan, planning]) => <div className="quick-row" role="row" key={time}><b>{time}</b><span>{plan}</span><small>{planning}</small></div>)}
      </div>
    </section>}

    {(active.length === 0 || active.includes("sunday") || active.includes("outside")) && <section id="hiking" className="sunday">
      <div className="sunday-title"><div><p className="kicker icon-label"><MaterialSymbol name="hiking" />HIKING FROM ZÜRICH</p><h2>FIVE FIRST PICKS. FIVE MORE OPTIONS.</h2></div><p>Start with the ranked shortlist. Expand it when weather, lift hours, energy, or geography make a different trail the smarter day.</p></div>
      <div className="sunday-plan">
        <div><span className="icon-label"><MaterialSymbol name="lightbulb" />MY CALL</span><ul><li><b>Best all-rounder:</b> Stoos</li><li><b>Best pure hike:</b> Pizol</li><li><b>Biggest visual:</b> Oeschinensee</li></ul></div>
        <div><span className="icon-label"><MaterialSymbol name="task_alt" />THE DAY BEFORE</span><ul><li>Buy trail food and download the route.</li><li>Check weather, SBB routing, trail status, and every lift.</li><li>Confirm the final descent; use Zürich HB for Sunday supplies.</li></ul></div>
      </div>
      <div className="hike-ranking" aria-label="Hikes ranked by view payoff">
        <div className="hike-head"><span>Rank</span><span>Trail / best slot</span><span>View payoff</span><span>Commitment</span></div>
        <div id="all-hiking-options">
        {hikes.map((trail, index) => <article className="hike-card" hidden={!showAllHikes && index >= 5} key={trail.name}>
          <div className="hike-rank"><b>{trail.rank}</b><span>{trail.verdict}</span></div>
          <div className="hike-name"><p className="kicker">{trail.slot}</p><h3>{trail.name}</h3><p>{trail.place}</p><small>{trail.stats}</small></div>
          <div className="payoff"><b>{trail.score}</b><span>/ 10</span></div>
          <div className="hike-detail">
            <dl><dt className="icon-label"><MaterialSymbol name="train" />FROM ZÜRICH HB</dt><dd>{trail.travel}</dd></dl>
            <dl><dt className="icon-label"><MaterialSymbol name="route" />LOGISTICS</dt><dd>{trail.logistics}</dd></dl>
            <dl><dt className="icon-label"><MaterialSymbol name="payments" />EXPECTED FARE</dt><dd>{trail.fare}</dd></dl>
            <dl><dt className="icon-label"><MaterialSymbol name="landscape" />WHY IT RANKS HERE</dt><dd>{trail.why}</dd></dl>
            <a className="action-link" href={trail.href} target="_blank" rel="noreferrer"><MaterialSymbol name="open_in_new" />Official trail details</a>
          </div>
        </article>)}
        </div>
        <button className="hike-toggle" type="button" aria-expanded={showAllHikes} aria-controls="all-hiking-options" onClick={() => setShowAllHikes((shownNow) => !shownNow)}>
          <span>{showAllHikes ? "SHOW TOP FIVE ONLY" : "SHOW FIVE MORE TRAILS"}</span><b aria-hidden="true">{showAllHikes ? "↑" : "↓"}</b>
        </button>
      </div>
      <p className="trail-note">View-payoff scores are editorial: scenery weighed against travel and logistical effort from Zürich. Fares are 2026 planning figures for one adult; SBB prices vary by pass and advance-purchase availability. Recheck live routing, weather, trail status, and lift hours on the day.</p>
    </section>}

    {active.length === 0 && <>
      <section className="shortlist"><p className="kicker icon-label"><MaterialSymbol name="check_circle" />DON’T LEAVE WITHOUT</p><ol><li><span>01</span> Eat a bratwurst standing at Sternen Grill</li><li><span>02</span> Order Züri Gschnätzlets with rösti</li><li><span>03</span> Drink excellent coffee at MAME</li><li><span>04</span> Walk Zürich West’s viaduct arches</li><li><span>05</span> Take home fresh Luxemburgerli</li></ol></section>
      <section className="answer"><p className="kicker icon-label"><MaterialSymbol name="directions_walk" />JUST TELL ME WHAT TO DO</p><h2>START AT HB. WALK TO THE LAKE.</h2><p>Take Bahnhofstrasse to Lindenhof, cross the Old Town, and finish at Bellevue. Add Sprüngli and Sternen Grill when they fall naturally on the route.</p><div className="meta"><span className="icon-label"><MaterialSymbol name="explore" />FIRST ORIENTATION</span><span className="icon-label"><MaterialSymbol name="schedule" />2–3 HOURS</span><span className="icon-label"><MaterialSymbol name="task_alt" />LOW PLANNING</span></div></section>
    </>}

    {active.length === 0 && <section id="eat" className="food"><p className="kicker icon-label"><MaterialSymbol name="restaurant" />EAT ZÜRICH, NOT A LIST</p><h2>SIX FOOD OBJECTIVES</h2><div className="food-head"><span className="icon-label"><MaterialSymbol name="restaurant_menu" />EAT THIS</span><span className="icon-label"><MaterialSymbol name="lightbulb" />WHY</span><span className="icon-label"><MaterialSymbol name="location_on" />DEFAULT</span></div>{foodObjectives.map(([food, why, place]) => <div className="food-row" key={food}><span>{food}</span><span>{why}</span><span>{place}</span></div>)}</section>}

    {(active.length === 0 || active.includes("coffee") || active.includes("early")) && <section id="coffee" className="coffee-guide">
      <div className="coffee-title"><div><p className="kicker icon-label"><MaterialSymbol name="local_cafe" />SPECIALTY COFFEE COMPASS</p><h2>GO EARLY. ORDER WITH INTENT.</h2></div><p><strong>Closest to Coffee Movement / acid:</strong> MAME is the decisive benchmark-level stop. Coffee Addict and Bean Bank are the next coffee-nerd moves; Miró Central wins on genuinely early hours.</p></div>
      <div className="early-callout"><span className="icon-label"><MaterialSymbol name="schedule" />EARLIEST SERIOUS CUP</span><p><b>06:00 weekdays · 07:00 weekends</b><br />Miró Central, inside Zürich HB</p></div>
      <div className="coffee-table" role="table" aria-label="Specialty coffee comparison">
        <div className="coffee-head" role="row"><span>PLACE / LEVEL</span><span>FIRST CUP</span><span>BEST FOR</span><span>BEANS HOME</span></div>
        {coffeePicks.map((pick) => <a className="coffee-row" role="row" href={pick.maps} target="_blank" rel="noreferrer" key={pick.name}><span><b><MaterialSymbol name="location_on" />{pick.name}</b><small>{pick.level}</small></span><span>{statusFor(pick) && <b className={`live-status ${statusFor(pick)!.state}`}>{statusFor(pick)!.label}</b>}<small>{pick.opens}</small></span><span>{pick.coffeeFocus}</span><span>{pick.beans}</span></a>)}
      </div>
      <p className="coffee-note">“Early” means open before 08:00. Regular hours checked 13.08.26; holidays and temporary changes still belong to Maps. Stars mark a reason to choose the place, not a numeric score.</p>
    </section>}

    <section className="recommendations" aria-live="polite">
      {shown.length === 0 ? <div className="empty"><MaterialSymbol name="filter_alt" className="empty-icon" /><p>Nothing matches that exact combination.</p><button onClick={() => setActive([])}><MaterialSymbol name="close" />Show the best bets</button></div> : shown.map((pick) => <article data-listing={pick.name} key={pick.name}>
        <div className="card-top"><p className="icon-label"><MaterialSymbol name="location_on" />{pick.priority} · {pick.area}</p><span className="icon-label"><MaterialSymbol name="schedule" />{pick.time} · {pick.cost}</span></div>
        <h2>{pick.name}</h2>{pick.opens && <p className="opens"><span className="icon-label"><MaterialSymbol name="schedule" />HOURS · ZÜRICH TIME</span>{statusFor(pick) && <b className={`live-status ${statusFor(pick)!.state}`}>{statusFor(pick)!.label}</b>}<small>{pick.opens}</small></p>}
        {pick.format && <div className="service-meta"><div><p className="label icon-label"><MaterialSymbol name="storefront" />FORMAT</p><p>{pick.format}</p></div><div><p className="label icon-label"><MaterialSymbol name="event_available" />RESERVATION</p><p>{pick.reservation}</p></div></div>}
        <div className="directive"><p className="label icon-label"><MaterialSymbol name={pick.section === "eat" ? "restaurant" : "task_alt"} />{pick.section === "eat" ? "TOP ORDER" : "GET / DO"}</p><p>{pick.get}</p></div>
        {pick.menuItems && <div className="menu-list"><p className="label icon-label"><MaterialSymbol name="restaurant_menu" />VERIFIED ON THE MENU</p><ul>{pick.menuItems.map((item) => <li key={item}>{item}</li>)}</ul><a className="action-link" href={pick.menuUrl} target="_blank" rel="noreferrer"><MaterialSymbol name="menu_book" />See source menu</a></div>}
        <div className="why"><p className="label icon-label"><MaterialSymbol name="lightbulb" />WHY THIS ONE</p><p>{pick.why}</p></div>{pick.coffeeFocus && <div className="coffee-card-meta"><p><span className="icon-label"><MaterialSymbol name="coffee" />COFFEE</span>{pick.coffeeFocus}</p><p><span className="icon-label"><MaterialSymbol name="shopping_bag" />BEANS HOME</span>{pick.beans}</p></div>}{pick.caveat && <div className="caveat"><span className="icon-label"><MaterialSymbol name="info" />KNOW BEFORE YOU GO</span><p>{pick.caveat}</p></div>}<a className="maps action-link" href={pick.maps} target="_blank" rel="noreferrer"><MaterialSymbol name="location_on" />Open in Google Maps<MaterialSymbol name="open_in_new" /></a>
      </article>)}
    </section>

    {active.length === 0 && <>
      <section id="neighborhoods" className="neighborhoods">
        <div className="neighborhood-intro"><div><p className="kicker icon-label"><MaterialSymbol name="map" />NEIGHBORHOODS AS DAY SHAPES</p><h2>PICK A MOOD. STAY IN THE AREA.</h2></div><p>These are flexible walking sequences, not timed itineraries. Start anywhere, skip freely, and let one part of the city carry the day.</p></div>
        <div className="neighborhood-list">
          {neighborhoods.map((area) => <div className="neighborhood" key={area.number}>
            <div className="neighborhood-index"><b>{area.number}</b><small>{area.orientation}</small></div>
            <div className="neighborhood-body">
              <div className="neighborhood-title"><h3>{area.name}</h3><span><MaterialSymbol name="schedule" />{area.time}</span></div>
              <p className="neighborhood-summary">{area.summary}</p>
              <ol className="neighborhood-stops" aria-label={`${area.name} suggested sequence`}>{area.stops.map((stop, index) => <li key={stop}><span>{String(index + 1).padStart(2, "0")}</span>{stop}</li>)}</ol>
              <div className="neighborhood-actions"><p><span>SHORT ON TIME?</span>{area.short}</p><a className="action-link" href={area.route} target="_blank" rel="noreferrer"><MaterialSymbol name="route" />Open walking route</a></div>
            </div>
          </div>)}
        </div>
      </section>
      <section id="outside" className="practical"><p className="kicker icon-label"><MaterialSymbol name="task_alt" />DON’T THINK ABOUT IT</p><div className="tips"><p><span><MaterialSymbol name="map" /></span>Google Maps owns live hours, routes, and closures.</p><p><span><MaterialSymbol name="restaurant" /></span>Don’t spend scarce meals on generic food.</p><p><span><MaterialSymbol name="sunny" /></span>Check weather before committing to a mountain day.</p><p><span><MaterialSymbol name="restaurant" /></span>Pick one cheese meal for the Switzerland trip.</p></div></section>
    </>}
    <footer><a className="action-link" href="#top"><MaterialSymbol name="arrow_upward" />Back to top</a><p>Built from the Zürich Living Guide · facts change; Maps handles the live layer.</p></footer>
  </main>;
}
