/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-26 16:31:19
 */
import CreateSceneAnime from "./scene";

import Parallax from "parallax-js";

export default class Scene04 extends CreateSceneAnime {
    constructor(public sceneBox: HTMLElement) {
        super(sceneBox);

        new Parallax(this.sceneBox, {
            selector: ".parallax-layer",
            scalarX: 8,
            scalarY: 2,
            hoverOnly: true,
        });
    }
    getDom() {
        return {
            beijing: $(this.sceneBox).find(".layer-beijing"),
            dian: $(this.sceneBox).find(".layer-dian"),
            one: $(this.sceneBox).find(".layer-1"),
        };
    }
    initPlay(): void {
        this.playTl.add(this.firstStep());
        this.playTl.add(this.secStep(), "0");
        this.playTl.add(this.infoEnterStep(), "0");
    }

    firstStep() {
        const { beijing } = this.getDom();
        const tl = gsap.timeline();
        tl.add(() => {
            gsap.set(this.sceneBox, { opacity: 1 });
        });
        tl.fromTo(beijing, { opacity: 0 }, { opacity: 1, duration: 1 });
        return tl;
    }

    secStep() {
        const { dian, one } = this.getDom();

        const tl = gsap.timeline();

        tl.fromTo(dian.add(one), { opacity: 0 }, { opacity: 1, duration: 2 });
        tl.fromTo(
            dian.find(".img-dian"),
            { z: 1000 },
            { duration: 80, ease: "linear", z: 0 },
            0
        );
        tl.fromTo(
            one.find(".img-1"),
            { rotate: 360 },
            { rotate: 0, duration: 200, ease: "linear" },
            0
        );
        tl.add(this.wenziEnterStep(), 0);

        return tl;
    }

    initLeave(): void {
        this.levelTl.add(this.firstLeaveStep());
    }

    firstLeaveStep() {
        return gsap.to(this.sceneBox, {
            opacity: 0,
        });
    }
}
