/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-12-27 15:28:17
 */

export default class CreateSceneAnime {
    playTl = gsap.timeline({
        paused: true,
    });
    levelTl = gsap.timeline({
        paused: true,
    });

    constructor(public sceneBox: HTMLElement) {
        //
    }

    getDom(): { [key: string]: JQuery<HTMLElement> } {
        return {};
    }
    init() {
        this.levelTl.add(() => {
            gsap.set(this.sceneBox, { zIndex: 0 });
        });
        this.initLeave();
        this.playTl.add(() => {
            gsap.set(this.sceneBox, { zIndex: 9 });
        });
        this.initPlay();
        return this;
    }

    initPlay() {
        const firstStep = gsap.timeline();
        firstStep.to($(this.sceneBox).find(".layer--el"), {
            opacity: 1,
            duration: 1,
        });
        this.playTl.add(firstStep);
    }
    initLeave() {
        const firstStep = gsap.timeline({});
        firstStep.to($(this.sceneBox).find(".layer--el"), {
            opacity: 0,
            duration: 1,
        });
        this.levelTl.add(firstStep);
    }

    // 文字信息过渡
    infoEnterStep() {
        const info = $(this.sceneBox).find(".layer-info");
        const tl = gsap.timeline();
        tl.fromTo(
            info.find(".box-juanzou"),
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.2,
            }
        );
        tl.fromTo(
            info.find(".box-juanzou"),
            { width: 30 },
            {
                ease: "better-elastic",
                width: "100%",
                duration: 0.6,
            },
            "<"
        );
        tl.fromTo(
            info.find(".box-text"),
            { opacity: 0, y: 10 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
            }
        );
        tl.fromTo(
            info.find(".scene-intro, .info-bg"),
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.5,
            },
            "<"
        );
        return tl;
    }

    infoLeaveStep() {
        const info = $(this.sceneBox).find(".layer-info");
        const tl = gsap.timeline({
            defaults: {
                ease: "better-elastic",
                duration: 0.6,
            },
        });
        tl.to(info.find(".box-text"), { opacity: 0, y: "+=10", duration: 0.5 });

        tl.to(
            info.find(".scene-intro, .info-bg"),
            { opacity: 0, duration: 0.5 },
            "<"
        );
        tl.to(
            info.find(".box-juanzou"),
            { width: 30, ease: "better-elastic", duration: 0.6 },
            "<"
        );
        tl.to(
            info.find(".box-juanzou"),
            { opacity: 0, duration: 0.2 },
            "-=0.4"
        );
        return tl;
    }

    wenziEnterStep() {
        const wenzi = $(this.sceneBox).find(".layer-wenzi");
        const wenziDom = wenzi.find(".img-wenzi");
        const tl = gsap.timeline();
        tl.fromTo(
            wenziDom,
            { opacity: 0, y: "100" },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "Power3.easeOut",
                onUpdate() {
                    // gsap.set(wenziDom, {
                    //     filter: "blur(" + 8 * (1 - this.progress()) + "px)",
                    // });
                },
            }
        );
        return tl;
    }

    wenziLeaveStep() {
        const wenzi = $(this.sceneBox).find(".layer-wenzi");
        const wenziDom = wenzi.find(".img-wenzi");
        const tl = gsap.timeline();
        tl.to(wenziDom, { opacity: 0, duration: 0.2 }, "<");
        return tl;
    }
}
