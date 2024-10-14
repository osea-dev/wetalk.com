/*
 * @Description: 数字转换
 * @Author: F-Stone
 * @LastEditTime: 2022-08-30 14:39:35
 */

const unitTran = ["", "十", "百", "千", "万"];
const numTran = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

function _NumberToChinese(num: number, suffix: string, unit: number): string {
    if (isNaN(Number(num)) || num <= 0) {
        const result = suffix.replace(/零+$/, "");
        return result;
    }

    if (num > 10000) {
        const [firstNum, lastNum] = String((num / 10000).toFixed(4)).split(".");
        const link = lastNum[0] == "0" ? "万零" : "万";
        return (
            NumberToChinese(Number(firstNum)) +
            link +
            NumberToChinese(Number(lastNum))
        );
    }
    const collect: string[] = String(num).split("");
    const lastNum = Number(collect.pop());
    if (lastNum === 0) {
        suffix = numTran[lastNum] + suffix;
    } else {
        suffix = numTran[lastNum] + unitTran[unit] + suffix;
    }

    return NumberToChinese(Number(collect.join("")), suffix, unit + 1);
}

export function NumberToChinese(num: number, suffix = "", unit = 0) {
    return _NumberToChinese(num, suffix, unit).replace(/^一十/, "十");
}
