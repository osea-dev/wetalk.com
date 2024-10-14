import { format } from "date-fns";
import { zhCN, enUS } from "date-fns/locale";
import endOfMonth from "date-fns/endOfMonth";
import startOfMonth from "date-fns/startOfMonth";
import differenceInYears from "date-fns/differenceInYears";
import differenceInDays from "date-fns/differenceInDays";

export function formateDate(time: number, t = "yyyy.MM.dd") {
    return format(new Date(time * 1000), t);
}

export function getWeekTime(time: number, lang: string) {
    return format(new Date(time * 1000), "EEEE MM.dd.yyyy", {
        locale: lang === "en" ? enUS : zhCN,
    });
}
export function getClock(time: number) {
    return format(new Date(time * 1000), "HH:mm");
}

export function getWeekTimeReverse(time: number, lang: string) {
    return format(new Date(time * 1000), "MM.dd.yyyy EEEE", {
        locale: lang === "en" ? enUS : zhCN,
    });
}

export function distanceToToday(time: number): number {
    return differenceInDays(new Date().getTime(), time * 1000);
}

export function getDifferenceInYears(time1: Date, time2: Date) {
    return differenceInYears(time1, time2);
}

export function getStartOfMonth(time: Date): number {
    return startOfMonth(time).getTime() / 1000;
}

export function getEndOfMonth(time: Date): number {
    return Math.ceil(endOfMonth(time).getTime() / 1000);
}
