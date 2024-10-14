/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-03-18 19:22:35
 */
export function debounce(
    func: (...param: any[]) => void,
    wait: number,
    immediate?: boolean
) {
    let timeout: NodeJS.Timeout | null,
        args: any,
        context: any,
        timestamp: number,
        result: any;
    if (wait == null) wait = 100;

    function later() {
        const last = Date.now() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }

    const debounced = function (this: any) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        context = this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        timestamp = Date.now();
        const callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };

    debounced.clear = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    debounced.flush = function () {
        if (timeout) {
            result = func.apply(context, args);
            context = args = null;

            clearTimeout(timeout);
            timeout = null;
        }
    };

    return debounced;
}
