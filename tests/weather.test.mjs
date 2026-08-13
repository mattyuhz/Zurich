import assert from "node:assert/strict";
import test from "node:test";
import {
  WEATHER_CACHE_KEY,
  WEATHER_CACHE_TTL,
  WEATHER_LOCATIONS,
  buildWeatherUrl,
  celsiusToFahrenheit,
  normalizeWeatherResponse,
  rankLiveSuggestions,
  readWeatherCache,
  scoreHikeWeather,
  weatherLabel,
  weatherMark,
  writeWeatherCache,
} from "../app/weather.mjs";

function hours(date = "2026-08-13") {
  return Array.from({ length: 24 }, (_, hour) => `${date}T${String(hour).padStart(2, "0")}:00`);
}

function point(overrides = {}) {
  const hourlyTime = hours();
  const dailyTime = Array.from({ length: 5 }, (_, offset) => `2026-08-${String(13 + offset).padStart(2, "0")}`);
  const fill = (value) => hourlyTime.map(() => value);
  return {
    latitude: 47,
    longitude: 8,
    elevation: 500,
    current: { temperature_2m: 20, apparent_temperature: 20, precipitation: 0, weather_code: 1, cloud_cover: 20, wind_speed_10m: 8, wind_gusts_10m: 15 },
    hourly: {
      time: hourlyTime,
      temperature_2m: fill(20),
      apparent_temperature: fill(20),
      precipitation_probability: fill(10),
      precipitation: fill(0),
      weather_code: fill(1),
      cloud_cover: fill(20),
      wind_gusts_10m: fill(15),
      freezing_level_height: fill(3500),
      ...overrides.hourly,
    },
    daily: {
      time: dailyTime,
      weather_code: dailyTime.map(() => 1),
      temperature_2m_max: dailyTime.map(() => 24),
      temperature_2m_min: dailyTime.map(() => 14),
      precipitation_probability_max: dailyTime.map(() => 20),
      wind_gusts_10m_max: dailyTime.map(() => 25),
      sunrise: dailyTime.map((date) => `${date}T06:15`),
      sunset: dailyTime.map((date) => `${date}T20:45`),
      ...overrides.daily,
    },
    ...Object.fromEntries(Object.entries(overrides).filter(([key]) => !["hourly", "daily"].includes(key))),
  };
}

test("requests exactly five days from the MeteoSwiss seamless model", () => {
  const url = new URL(buildWeatherUrl());
  assert.equal(url.searchParams.get("forecast_days"), "5");
  assert.equal(url.searchParams.get("models"), "meteoswiss_icon_seamless");
  assert.equal(url.searchParams.get("timezone"), "Europe/Zurich");
  assert.equal(url.searchParams.get("latitude").split(",").length, WEATHER_LOCATIONS.length);
});

test("renders recognizable weather symbols and converts Fahrenheit", () => {
  assert.equal(weatherMark(0), "☀︎");
  assert.equal(weatherMark(3), "☁︎");
  assert.equal(weatherMark(63), "🌧");
  assert.equal(weatherMark(73), "❄︎");
  assert.equal(weatherMark(95), "⛈");
  assert.equal(celsiusToFahrenheit(0), 32);
  assert.equal(celsiusToFahrenheit(28), 82.4);
});

test("normalizes a five-day city and mountain response", () => {
  const snapshot = normalizeWeatherResponse(WEATHER_LOCATIONS.map(() => point()));
  assert.equal(snapshot.city.daily.time.length, 5);
  assert.deepEqual(Object.keys(snapshot.mountains), ["stoos", "oeschinensee", "pizol", "rigi", "uetliberg"]);
  assert.equal(weatherLabel(95), "Thunderstorms");
});

test("rainy afternoon recommendations prefer the existing indoor listings", () => {
  const city = point({
    current: { temperature_2m: 15, apparent_temperature: 14, precipitation: 0.2, weather_code: 61, cloud_cover: 95, wind_speed_10m: 10, wind_gusts_10m: 20 },
    hourly: { precipitation_probability: hours().map(() => 80), precipitation: hours().map(() => 0.5) },
  });
  const picks = [
    { name: "MUSEUM", priority: "Must", section: "design", area: "City", get: "Go inside", tags: ["design", "rain"], maps: "#" },
    { name: "RIDGE", priority: "Strong pick", section: "outside", area: "Hill", get: "Walk", tags: ["outside", "sunny"], maps: "#" },
    { name: "COFFEE", priority: "Strong pick", section: "coffee", area: "City", get: "Drink", tags: ["coffee", "rain"], maps: "#" },
    { name: "LUNCH", priority: "Strong pick", section: "eat", area: "City", get: "Eat", tags: ["hungry", "rain"], maps: "#" },
  ];
  const result = rankLiveSuggestions(picks, city, { iso: "2026-08-13T15:00", hour: 15, weekday: "Thu" });
  assert.equal(result.suggestions[0].name, "MUSEUM");
  assert.ok(result.suggestions.every((pick) => pick.name !== "RIDGE"));
});

test("mountain ranking rejects localized bad weather and chooses an eligible route", () => {
  const dangerous = point({ hourly: { precipitation_probability: hours().map(() => 90), precipitation: hours().map(() => 1) } });
  const windy = point({ hourly: { wind_gusts_10m: hours().map(() => 60) } });
  const results = scoreHikeWeather({
    stoos: dangerous,
    oeschinensee: windy,
    pizol: point(),
    rigi: windy,
    uetliberg: windy,
  }, { iso: "2026-08-13T06:00", month: 8 });
  assert.equal(results[0].name, "PIZOL 5-LAKE TRAIL");
  assert.equal(results[0].eligible, true);
  assert.equal(results.find((hike) => hike.id === "stoos").eligible, false);
});

test("late departures do not produce an automatic mountain pick", () => {
  const mountains = Object.fromEntries(WEATHER_LOCATIONS.slice(1).map((location) => [location.id, point()]));
  const results = scoreHikeWeather(mountains, { iso: "2026-08-13T18:00", month: 8 });
  assert.equal(results.some((hike) => hike.eligible), false);
});

test("weather cache expires after thirty minutes", () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  writeWeatherCache(storage, { city: true }, 1_000);
  assert.ok(values.has(WEATHER_CACHE_KEY));
  assert.equal(readWeatherCache(storage, 1_000 + WEATHER_CACHE_TTL - 1).fresh, true);
  assert.equal(readWeatherCache(storage, 1_000 + WEATHER_CACHE_TTL).fresh, false);
});
