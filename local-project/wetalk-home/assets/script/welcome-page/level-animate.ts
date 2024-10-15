/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-21 13:24:19
 */

export default class LevelAnimate {
    tl = gsap.timeline({ paused: true });
    constructor(public page: HTMLElement) {
        this.page = page;
        this.tl.add(this.firstLevelStep());
        this.tl.add(this.secLevelStep(), 0);
    }
    firstLevelStep() {
        const cloudScene = $(this.page).find("#cloud-scene");
        const coverScene = $(this.page).find(".w-stage-cover");

        const tl = gsap.timeline({
            onStart() {
                gsap.set(cloudScene, {
                    perspective: "3000px",
                    perspectiveOrigin: "bottom",
                });
            },
        });

        const layerCloudMask = cloudScene.find(".layer-0");
        tl.to(layerCloudMask[0], { opacity: 0.6 }).to(
            layerCloudMask,
            { z: 2990, duration: 2 },
            0
        );
        tl.to(layerCloudMask[1], { opacity: 1 }).to(
            layerCloudMask,
            { z: 2990, duration: 2 },
            "1"
        );
        tl.to(layerCloudMask, { opacity: 0 });

        const circleAnime = gsap.to(coverScene, {
            opacity: 0,
            duration: 0.5,
            onUpdate: () => {
                gsap.set(coverScene, {
                    filter: "blur(" + 15 * circleAnime.progress() + "px)",
                });
            },
        });

        return tl.add(circleAnime, "0");
    }
    secLevelStep() {
        const stage = $(this.page).find(".w-stage");
        const logo = stage.find(".layer-1");
        const leftStage = stage.find(".w-stage--left");
        const rightStage = stage.find(".w-stage--right");

        const tl = gsap.timeline({
            onStart() {
                gsap.set(leftStage.add(rightStage), {
                    "transform-style": "preserve-3d",
                    "backface-visibility": "hidden",
                });
            },
        });
        tl.to(
            leftStage.find(".stage-layer"),
            {
                y: 600,
                z: 3000,
                duration: 3,
                stagger: 0.03,
            },
            0
        );

        tl.to(
            rightStage.find(".stage-layer"),
            {
                y: 600,
                z: 3000,
                duration: 3,
                stagger: 0.03,
            },
            0
        );

        const logoAnime = gsap.to(logo, {
            opacity: 0,
            duration: 1.5,
            onUpdate: () => {
                gsap.set(logo, {
                    filter: "blur(" + 15 * logoAnime.progress() + "px)",
                });
            },
        });
        tl.add(logoAnime, "0");

        return tl;
    }
    play() {
        this.tl.play();
    }
}
