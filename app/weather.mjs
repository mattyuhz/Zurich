export const WEATHER_CACHE_KEY = "zurich-live-weather-v1";
export const WEATHER_CACHE_TTL = 30 * 60 * 1000;

export const WEATHER_LOCATIONS = [
  { id: "zurich", name: "Zürich", latitude: 47.3769, longitude: 8.5417 },
  { id: "stoos", name: "Stoos Ridge", latitude: 46.9572, longitude: 8.6747 },
  { id: "oeschinensee", name: "Oeschinensee", latitude: 46.4983, longitude: 7.7267 },
  { id: "pizol", name: "Pizol 5-Lake Trail", latitude: 46.9705, longitude: 9.3949 },
  { id: "rigi", name: "Rigi Panorama", latitude: 47.045, longitude: 8.4671 },
  { id: "uetliberg", name: "Uetliberg → Felsenegg", latitude: 47.3494, longitude: 8.4914 },
];

export const HIKE_WEATHER_META = [
  { id: "stoos", name: "STOOS RIDGE", base: 9.8, travelMinutes: 120, hikeMinutes: 150, altitude: 1935, highAlpine: true },
  { id: "oeschinensee", name: "OESCHINENSEE PANORAMA", base: 9.7, travelMinutes: 160, hikeMinutes: 174, altitude: 2020, highAlpine: true },
  { id: "pizol", name: "PIZOL 5-LAKE TRAIL", base: 9.4, travelMinutes: 135, hikeMinutes: 270, altitude: 2438, highAlpine: true, cutoff: "16:30" },
  { id: "rigi", name: "RIGI PANORAMA", base: 8.7, travelMinutes: 105, hikeMinutes: 110, altitude: 1656, highAlpine: false },
  { id: "uetliberg", name: "PLANET TRAIL", base: 7.2, travelMinutes: 35, hikeMinutes: 120, altitude: 871, highAlpine: false },
];

const HOURLY_FIELDS = [
  "temperature_2m",
  "apparent_temperature",
  "precipitation_probability",
  "precipitation",
  "weather_code",
  "cloud_cover",
  "wind_gusts_10m",
  "freezing_level_height",
];

const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_probability_max",
  "wind_gusts_10m_max",
  "sunrise",
  "sunset",
];

export function buildWeatherUrl() {
  const params = new URLSearchParams({
    latitude: WEATHER_LOCATIONS.map((location) => location.latitude).join(","),
    longitude: WEATHER_LOCATIONS.map((location) => location.longitude).join(","),
    current: "temperature_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,is_day",
    hourly: HOURLY_FIELDS.join(","),
    daily: DAILY_FIELDS.join(","),
    forecast_days: "5",
    timezone: "Europe/Zurich",
    models: "meteoswiss_icon_seamless",
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

function assertNumberArray(value, field) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "number" && item !== null)) {
    throw new Error(`Invalid weather field: ${field}`);
  }
  return value;
}

function normalizePoint(raw, location) {
  if (!raw || typeof raw !== "object" || !raw.hourly || !raw.daily) {
    throw new Error(`Missing forecast for ${location.name}`);
  }

  const hourlyTimes = raw.hourly.time;
  const dailyTimes = raw.daily.time;
  if (!Array.isArray(hourlyTimes) || !Array.isArray(dailyTimes) || dailyTimes.length < 5) {
    throw new Error(`Incomplete forecast for ${location.name}`);
  }

  const hourly = {};
  for (const field of HOURLY_FIELDS) hourly[field] = assertNumberArray(raw.hourly[field], field);
  const daily = {};
  for (const field of DAILY_FIELDS) {
    const value = raw.daily[field];
    if (!Array.isArray(value)) throw new Error(`Invalid weather field: ${field}`);
    daily[field] = value;
  }

  return {
    id: location.id,
    name: location.name,
    latitude: raw.latitude,
    longitude: raw.longitude,
    elevation: raw.elevation,
    current: raw.current ?? null,
    hourly: { time: hourlyTimes, ...hourly },
    daily: { time: dailyTimes.slice(0, 5), ...Object.fromEntries(Object.entries(daily).map(([key, values]) => [key, values.slice(0, 5)])) },
  };
}

export function normalizeWeatherResponse(raw) {
  const points = Array.isArray(raw) ? raw : [raw];
  if (points.length !== WEATHER_LOCATIONS.length) throw new Error("Incomplete multi-location forecast");
  const normalized = points.map((point, index) => normalizePoint(point, WEATHER_LOCATIONS[index]));
  return {
    fetchedAt: Date.now(),
    city: normalized[0],
    mountains: Object.fromEntries(normalized.slice(1).map((point) => [point.id, point])),
  };
}

export async function fetchWeatherForecast(signal) {
  const response = await fetch(buildWeatherUrl(), { signal, headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Weather request failed (${response.status})`);
  return normalizeWeatherResponse(await response.json());
}

export function weatherLabel(code) {
  if (code === 0) return "Clear";
  if (code <= 2) return "Mostly clear";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code >= 95) return "Thunderstorms";
  return "Mixed conditions";
}

export function weatherMark(code) {
  if (code === 0) return "☀︎";
  if (code <= 2) return "🌤";
  if (code === 3) return "☁︎";
  if (code === 45 || code === 48) return "🌫";
  if (code >= 51 && code <= 57) return "🌦";
  if (code >= 61 && code <= 67) return "🌧";
  if (code >= 71 && code <= 77) return "❄︎";
  if (code >= 80 && code <= 82) return "🌦";
  if (code >= 85 && code <= 86) return "🌨";
  if (code >= 95) return "⛈";
  return "☁︎";
}

export function celsiusToFahrenheit(value) {
  return value * 9 / 5 + 32;
}

export function kilometersToMiles(value) {
  return value * 0.621371;
}

export function zurichClock(date = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date).map((part) => [part.type, part.value]));

  return {
    iso: `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`,
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
    hour: Number(parts.hour),
    month: Number(parts.month),
    weekday: parts.weekday,
  };
}

function nextHours(city, nowIso, count) {
  const start = Math.max(0, city.hourly.time.findIndex((time) => time >= nowIso.slice(0, 13)));
  return Array.from({ length: count }, (_, offset) => start + offset).filter((index) => index < city.hourly.time.length);
}

export function weatherContext(city, nowIso) {
  const indexes = nextHours(city, nowIso, 3);
  const rainRisk = Math.max(0, ...indexes.map((index) => city.hourly.precipitation_probability[index] ?? 0));
  const rainAmount = indexes.reduce((sum, index) => sum + (city.hourly.precipitation[index] ?? 0), 0);
  const gust = Math.max(city.current?.wind_gusts_10m ?? 0, ...indexes.map((index) => city.hourly.wind_gusts_10m[index] ?? 0));
  const cloud = city.current?.cloud_cover ?? 100;
  const wet = (city.current?.precipitation ?? 0) > 0 || rainRisk >= 50 || rainAmount >= 0.5;
  const bright = !wet && (city.current?.weather_code ?? 3) <= 2 && cloud < 65;
  return { rainRisk, rainAmount, gust, cloud, wet, bright };
}

const PRIORITY_SCORE = { Must: 4, "Strong pick": 2, "Good nearby": 1 };

export function rankLiveSuggestions(picks, city, clock) {
  const context = weatherContext(city, clock.iso);
  const planningTomorrow = clock.hour >= 21 || clock.hour < 5;
  const sunday = clock.weekday === "Sun";
  const scored = picks
    .filter((pick) => !(sunday && pick.opens?.toLowerCase().includes("closed sun")))
    .map((pick) => {
      let score = PRIORITY_SCORE[pick.priority] ?? 0;
      if (planningTomorrow) score += pick.tags.includes("early") ? 12 : 0;
      else if (clock.hour < 11) score += pick.section === "coffee" ? 11 : pick.section === "eat" ? 2 : 0;
      else if (clock.hour < 14) score += pick.section === "eat" ? 11 : pick.section === "coffee" ? 3 : 0;
      else if (clock.hour < 18) score += pick.section === "design" ? 9 : pick.section === "outside" ? 7 : pick.tags.includes("wander") ? 4 : 0;
      else score += pick.section === "eat" ? 10 : pick.tags.includes("wander") ? 3 : 0;

      if (context.wet) score += pick.tags.includes("rain") ? 9 : 0;
      if (context.wet && (pick.section === "outside" || pick.tags.includes("sunny"))) score -= 15;
      if (context.bright) score += pick.tags.includes("sunny") ? 8 : pick.section === "outside" ? 7 : 0;
      if (context.gust >= 35 && pick.section === "outside") score -= 10;
      if (sunday && pick.tags.includes("sunday")) score += 4;
      return { pick, score };
    })
    .sort((a, b) => b.score - a.score || picks.indexOf(a.pick) - picks.indexOf(b.pick));

  const selected = [];
  const usedSections = new Set();
  for (const candidate of scored) {
    if (selected.length === 3) break;
    if (usedSections.has(candidate.pick.section) && scored.some((other) => !usedSections.has(other.pick.section) && !selected.includes(other))) continue;
    selected.push(candidate);
    usedSections.add(candidate.pick.section);
  }
  for (const candidate of scored) if (selected.length < 3 && !selected.includes(candidate)) selected.push(candidate);

  let reason = context.wet
    ? `${context.rainRisk}% rain risk in the next three hours favors indoor or quick-stop plans.`
    : context.bright
      ? "Dry, brighter conditions make this a good window to stay outside."
      : "Mixed conditions favor flexible plans with an easy indoor fallback.";
  if (planningTomorrow) reason = "It is late in Zürich, so these are the strongest starts for tomorrow. Verify hours before leaving.";

  return { planningTomorrow, context, reason, suggestions: selected.map(({ pick }) => pick) };
}

function localDateValue(iso) {
  return new Date(`${iso}:00Z`).getTime();
}

function addLocalMinutes(iso, minutes) {
  return new Date(localDateValue(iso) + minutes * 60_000).toISOString().slice(0, 16);
}

export function scoreHikeWeather(mountains, clock) {
  return HIKE_WEATHER_META.map((meta) => {
    const point = mountains[meta.id];
    if (!point) return { ...meta, eligible: false, score: -Infinity, reason: "Forecast unavailable" };
    if (meta.highAlpine && (clock.month < 6 || clock.month > 10)) {
      return { ...meta, eligible: false, score: -Infinity, reason: "Outside the normal summer hiking window" };
    }

    const arrival = addLocalMinutes(clock.iso, meta.travelMinutes);
    const finish = addLocalMinutes(arrival, meta.hikeMinutes + 60);
    const dayIndex = point.daily.time.indexOf(arrival.slice(0, 10));
    const sunset = dayIndex >= 0 ? point.daily.sunset[dayIndex] : null;
    if (!sunset || finish > sunset || (meta.cutoff && finish.slice(11) > meta.cutoff)) {
      return { ...meta, eligible: false, score: -Infinity, reason: "Not enough time before the final descent or darkness" };
    }

    const indexes = point.hourly.time
      .map((time, index) => ({ time, index }))
      .filter(({ time }) => time >= arrival && time <= finish)
      .map(({ index }) => index);
    if (!indexes.length) return { ...meta, eligible: false, score: -Infinity, reason: "Route-window forecast unavailable" };

    const codes = indexes.map((index) => point.hourly.weather_code[index] ?? 99);
    const rainRisk = Math.max(...indexes.map((index) => point.hourly.precipitation_probability[index] ?? 0));
    const rain = indexes.reduce((sum, index) => sum + (point.hourly.precipitation[index] ?? 0), 0);
    const gust = Math.max(...indexes.map((index) => point.hourly.wind_gusts_10m[index] ?? 0));
    const cloud = indexes.reduce((sum, index) => sum + (point.hourly.cloud_cover[index] ?? 100), 0) / indexes.length;
    const freezingLevel = Math.min(...indexes.map((index) => point.hourly.freezing_level_height[index] ?? 10_000));

    let reason = "Best weather-to-effort balance in the available window";
    if (codes.some((code) => code >= 95)) reason = "Thunderstorm signal during the route window";
    else if (gust >= 50) reason = `Gusts near ${Math.round(gust)} km/h are too strong for an automatic pick`;
    else if (rainRisk >= 60 || rain >= 2) reason = `${Math.round(rainRisk)}% rain risk and ${rain.toFixed(1)} mm forecast`;
    else if (rain > 0.2 && freezingLevel < meta.altitude + 200) reason = "Precipitation may fall near or below trail freezing level";
    const eligible = reason.startsWith("Best");
    const score = eligible ? meta.base + (cloud < 35 ? 2 : cloud < 60 ? 1 : 0) - rainRisk / 20 - Math.max(0, gust - 20) / 10 : -Infinity;
    return { ...meta, eligible, score, reason, rainRisk, rain, gust, cloud, arrival, finish };
  }).sort((a, b) => b.score - a.score || b.base - a.base);
}

export function readWeatherCache(storage, now = Date.now()) {
  try {
    const cached = JSON.parse(storage.getItem(WEATHER_CACHE_KEY) ?? "null");
    if (!cached?.snapshot || typeof cached.savedAt !== "number") return null;
    return { ...cached, fresh: now - cached.savedAt < WEATHER_CACHE_TTL };
  } catch {
    return null;
  }
}

export function writeWeatherCache(storage, snapshot, now = Date.now()) {
  storage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ savedAt: now, snapshot }));
}
