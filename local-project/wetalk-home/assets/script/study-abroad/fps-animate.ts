/*
 * @Description: 应对高刷屏下 requestAnimationFrame 运动速率加快的现象
 * @Author: F-Stone
 * @Date: 2022-02-10 13:13:01
 * @LastEditTime: 2022-02-14 11:13:36
 * @LastEditors: F-Stone
 */

export function fsAnimationFrame(
    fps: number
): (callback: () => boolean) => void {
    const FRAMES_PER_SECOND = fps; // Valid values are 60,30,20,15,10...
    // set the mim time to render the next frame
    const FRAME_MIN_TIME =
        (1000 / 60) * (60 / FRAMES_PER_SECOND) - (1000 / 60) * 0.5;
    let lastFrameTime = 0; // the last frame time
    let stop = false;
    return (callback: () => boolean) => {
        function update() {
            if (stop) return;
            const time = new Date().getTime();
            if (time - lastFrameTime < FRAME_MIN_TIME) {
                requestAnimationFrame(() => {
                    update();
                });
                return;
            }
            lastFrameTime = time;

            requestAnimationFrame(() => {
                stop = callback();
                update();
            });
        }
        stop = callback();
        update();
    };
}

export function createFpsChecker(fps: number) {
    const FRAMES_PER_SECOND = fps; // Valid values are 60,30,20,15,10...
    // set the mim time to render the next frame
    const FRAME_MIN_TIME =
        (1000 / 60) * (60 / FRAMES_PER_SECOND) - (1000 / 60) * 0.5;
    let lastFrameTime = 0; // the last frame time
    return (callback: () => void) => {
        const time = new Date().getTime();
        const canAnime = time - lastFrameTime >= FRAME_MIN_TIME;
        if (canAnime) {
            callback();
            lastFrameTime = time;
        }
        return canAnime;
    };
}
