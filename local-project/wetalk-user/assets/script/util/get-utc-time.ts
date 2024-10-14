import { formatInTimeZone } from "date-fns-tz";

export function getUtcTime(
    time: Date,
    timeZone: string | undefined,
    formate = "HH:mm 'UTC'xxx"
) {
    if (!timeZone) return "";
    return formatInTimeZone(time, timeZone, formate);
}
