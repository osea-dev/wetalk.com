import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export function formateDate(time: number, t = "yyyy.MM.dd") {
    return format(new Date(time * 1000), t);
}

export function getWeekTime(time: number) {
    return format(new Date(time * 1000), "EEEE MM.dd.yyyy", {
        locale: zhCN,
    });
}
export function getClock(time: number) {
    return format(new Date(time * 1000), "HH:mm");
}
