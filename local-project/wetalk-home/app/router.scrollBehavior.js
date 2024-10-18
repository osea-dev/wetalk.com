/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-06-16 17:33:48
 */
export default function (to, _from, savePositions) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (savePositions) {
                resolve(savePositions);
                return;
            }
            if (to.hash) {
                const computedStyle = getComputedStyle(
                    document.documentElement
                );
                const navH = computedStyle.getPropertyValue("--nav-h");
                resolve({
                    selector: to.hash,
                    behavior: "smooth",
                    offset: {
                        y: parseInt(navH) + 80,
                    },
                });
            } else {
                resolve({ x: 0, y: 0 });
            }
        }, 200);
    });
}
