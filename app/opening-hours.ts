export type TimeRange = readonly [open: string, close: string];

export type WeeklyHours = Partial<Record<number, readonly TimeRange[]>>;

export type OpeningStatus = {
  state: "open" | "opening-soon" | "closed";
  label: string;
};

const ZURICH_TIME_ZONE = "Europe/Zurich";
const WEEKDAYS: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function durationLabel(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

function zurichClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ZURICH_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;

  return {
    day: WEEKDAYS[part("weekday") ?? "Sun"],
    minute: Number(part("hour")) * 60 + Number(part("minute")),
  };
}

export function getOpeningStatus(hours: WeeklyHours, now = new Date()): OpeningStatus {
  const current = zurichClock(now);
  const today = hours[current.day] ?? [];

  for (const [open, close] of today) {
    const openMinute = toMinutes(open);
    const closeMinute = toMinutes(close);
    if (current.minute >= openMinute && current.minute < closeMinute) {
      return { state: "open", label: `Open now · closes in ${durationLabel(closeMinute - current.minute)}` };
    }
  }

  for (let offset = 0; offset < 8; offset += 1) {
    const day = (current.day + offset) % 7;
    for (const [open] of hours[day] ?? []) {
      const wait = offset * 24 * 60 + toMinutes(open) - current.minute;
      if (wait <= 0) continue;
      if (offset === 0 || wait < 12 * 60) {
        return {
          state: wait <= 60 ? "opening-soon" : "closed",
          label: `Opens in ${durationLabel(wait)}`,
        };
      }
      const dayLabel = offset === 1 ? "tomorrow" : new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" })
        .format(new Date(Date.UTC(2023, 0, 1 + day)));
      return { state: "closed", label: `Closed · opens ${dayLabel} at ${open}` };
    }
  }

  return { state: "closed", label: "Closed" };
}
