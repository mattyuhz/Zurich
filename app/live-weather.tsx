"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  celsiusToFahrenheit,
  fetchWeatherForecast,
  kilometersToMiles,
  rankLiveSuggestions,
  readWeatherCache,
  scoreHikeWeather,
  weatherIconKind,
  weatherLabel,
  writeWeatherCache,
  zurichClock,
} from "./weather.mjs";
import type { OpeningStatus } from "./opening-hours";

type LivePick = {
  name: string;
  priority: "Must" | "Strong pick" | "Good nearby";
  section: "eat" | "coffee" | "design" | "outside";
  area: string;
  get: string;
  tags: string[];
  maps: string;
  opens?: string;
};

type Snapshot = {
  fetchedAt: number;
  city: {
    current: Record<string, number | string> | null;
    hourly: Record<string, Array<number | string | null>> & { time: string[] };
    daily: Record<string, Array<number | string | null>> & { time: string[] };
  };
  mountains: Record<string, unknown>;
};

function round(value: unknown) {
  return Math.round(typeof value === "number" ? value : 0);
}

function dayLabel(date: string, index: number) {
  if (index === 0) return "Today";
  return new Intl.DateTimeFormat("en", { timeZone: "Europe/Zurich", weekday: "short" }).format(new Date(`${date}T12:00:00Z`));
}

function WeatherIcon({ code, className = "" }: { code: number; className?: string }) {
  const kind = weatherIconKind(code);
  return <span className={`weather-icon weather-icon--${kind} ${className}`.trim()} role="img" aria-label={weatherLabel(code)}>
    <i className="weather-icon__sun" aria-hidden="true" />
    <i className="weather-icon__cloud" aria-hidden="true" />
    <i className="weather-icon__detail" aria-hidden="true" />
  </span>;
}

export default function LiveWeather({ picks, openingStatuses }: { picks: LivePick[]; openingStatuses: Record<string, OpeningStatus> }) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "stale" | "error">("loading");
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(() => new Date());

  const load = useCallback(async (force = false) => {
    const cache = readWeatherCache(window.sessionStorage);
    if (!force && cache?.fresh) {
      setSnapshot(cache.snapshot);
      setStatus("ready");
      return;
    }
    if (cache?.snapshot) {
      setSnapshot(cache.snapshot);
      setStatus("stale");
    } else {
      setStatus("loading");
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8_000);
    try {
      const next = await fetchWeatherForecast(controller.signal);
      writeWeatherCache(window.sessionStorage, next);
      setSnapshot(next);
      setStatus("ready");
      setMessage("");
    } catch (error) {
      setStatus(cache?.snapshot ? "stale" : "error");
      setMessage(error instanceof DOMException && error.name === "AbortError" ? "The weather service took too long to respond." : "The live forecast is temporarily unavailable.");
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    const kickoff = window.setTimeout(() => void load(), 0);
    const clockTimer = window.setInterval(() => setNow(new Date()), 60_000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        setNow(new Date());
        const cache = readWeatherCache(window.sessionStorage);
        if (!cache?.fresh) void load(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(kickoff);
      window.clearInterval(clockTimer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [load]);

  const clock = useMemo(() => zurichClock(now), [now]);
  const live = useMemo(() => snapshot ? rankLiveSuggestions(picks, snapshot.city, clock) : null, [clock, picks, snapshot]);
  const hikes = useMemo(() => snapshot ? scoreHikeWeather(snapshot.mountains, clock) : [], [clock, snapshot]);
  const bestHike = hikes.find((hike: { eligible: boolean }) => hike.eligible);

  if (!snapshot && status === "loading") {
    return <section className="live-weather live-state" id="now" aria-live="polite">
      <p className="kicker">LIVE ZÜRICH</p>
      <h2>READING THE NEXT FIVE DAYS…</h2>
      <p>Loading MeteoSwiss forecast data without changing the guide below.</p>
    </section>;
  }

  if (!snapshot) {
    return <section className="live-weather live-state" id="now" aria-live="polite">
      <p className="kicker">LIVE ZÜRICH</p>
      <h2>WEATHER IS OFFLINE. THE GUIDE ISN’T.</h2>
      <p>{message} Use the existing “It’s raining” or “It’s sunny” filters below.</p>
      <button type="button" onClick={() => void load(true)}>Try live weather again</button>
    </section>;
  }

  const city = snapshot.city;
  const current = city.current ?? {};
  const currentCode = Number(current.weather_code ?? 3);
  const updated = new Intl.DateTimeFormat("en", { timeZone: "Europe/Zurich", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(snapshot.fetchedAt));
  const temperature = (value: unknown) => {
    const celsius = typeof value === "number" ? value : 0;
    return <span className="dual-unit"><span>{Math.round(celsiusToFahrenheit(celsius))}°F</span><small>{Math.round(celsius)}°C</small></span>;
  };
  const wind = (value: unknown) => {
    const kilometers = typeof value === "number" ? value : 0;
    return <span className="dual-unit"><span>{Math.round(kilometersToMiles(kilometers))} mph</span><small>{Math.round(kilometers)} km/h</small></span>;
  };

  return <section className="live-weather" id="now" aria-live="polite">
    <div className="live-heading">
      <div>
        <p className="kicker">LIVE ZÜRICH · {clock.weekday.toUpperCase()} {clock.time}</p>
        <h2><WeatherIcon code={currentCode} className="headline-weather-mark" />{weatherLabel(currentCode).toUpperCase()} · {temperature(current.temperature_2m)}</h2>
      </div>
      <div className="live-current" aria-label="Current weather details">
        <p><span>FEELS</span>{temperature(current.apparent_temperature)}</p>
        <p><span>WIND</span>{wind(current.wind_speed_10m)}</p>
        <p><span>GUSTS</span>{wind(current.wind_gusts_10m)}</p>
      </div>
    </div>

    <div className="five-day primary-forecast">
      <div className="live-section-title"><p className="kicker">FIVE-DAY METEOSWISS OUTLOOK</p><span>High / low · rain · gusts</span></div>
      <div className="forecast-days" aria-label="Today and the next four days">
        {city.daily.time.map((date, index) => <div className="forecast-day" key={date as string}>
          <span>{dayLabel(date as string, index)}</span>
          <WeatherIcon code={Number(city.daily.weather_code[index])} />
          <p>{temperature(city.daily.temperature_2m_max[index])} / {temperature(city.daily.temperature_2m_min[index])}</p>
          <small>{round(city.daily.precipitation_probability_max[index])}% rain · {wind(city.daily.wind_gusts_10m_max[index])}</small>
        </div>)}
      </div>
    </div>

    {live && <div className="live-picks">
      <div className="live-section-title">
        <div><p className="kicker">{live.planningTomorrow ? "STRONG STARTS TOMORROW" : "WHAT FITS RIGHT NOW"}</p><h3>{live.reason}</h3></div>
        <span>Weather + Zürich time</span>
      </div>
      <div className="live-pick-grid">
        {live.suggestions.map((pick: LivePick, index: number) => <a href={pick.maps} target="_blank" rel="noreferrer" key={pick.name}>
          <span>{String(index + 1).padStart(2, "0")} · {pick.area}</span>
          <h3>{pick.name}</h3>
          <p>{pick.get}</p>
          {openingStatuses[pick.name]
            ? <small className={`live-status ${openingStatuses[pick.name].state}`}>{openingStatuses[pick.name].label}</small>
            : <small>Open in Maps ↗</small>}
        </a>)}
      </div>
    </div>}

    <div className="hike-weather">
      <div className="live-section-title">
        <div><p className="kicker">MOUNTAIN WEATHER CHECK</p><h3>{bestHike ? `${bestHike.name} IS TODAY’S WEATHER FAVORITE.` : "NO AUTOMATIC MOUNTAIN PICK TODAY."}</h3></div>
        <span>Weather only · operations unconfirmed</span>
      </div>
      <div className="hike-weather-list">
        {hikes.map((hike: { id: string; name: string; eligible: boolean; reason: string; rainRisk?: number; gust?: number }) => <div key={hike.id}>
          <span>{hike.eligible ? "WEATHER FIT" : "HOLD"}</span>
          <b>{hike.name}</b>
          <p>{hike.reason}</p>
          {hike.rainRisk != null && <small>{round(hike.rainRisk)}% rain · gusts {wind(hike.gust)}</small>}
        </div>)}
      </div>
      <p className="weather-caveat">Forecast suitability is not a safety or opening check. Confirm the official trail, lifts, SBB routing, and final descent before leaving.</p>
    </div>

    <div className="weather-source">
      <p>{status === "stale" ? `${message} Showing the last available forecast.` : `Forecast loaded ${updated} Zürich time.`}</p>
      <p><a href="https://www.meteoswiss.admin.ch/" target="_blank" rel="noreferrer">MeteoSwiss ICON data</a> via <a href="https://open-meteo.com/en/docs/meteoswiss-api" target="_blank" rel="noreferrer">Open-Meteo</a> · <button type="button" onClick={() => void load(true)}>Refresh</button></p>
    </div>
  </section>;
}
