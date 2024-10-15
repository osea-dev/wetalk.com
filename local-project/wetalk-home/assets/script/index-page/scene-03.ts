/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-26 17:14:45
 */
import CreateSceneAnime from "./scene";

import Parallax from "parallax-js";

export default class Scene03 extends CreateSceneAnime {
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
            yuan: $(this.sceneBox).find(".layer-yuan"),
            taiji: $(this.sceneBox).find(".layer-taiji"),
            yu: $(this.sceneBox).find(".layer-yu"),
            niao: $(this.sceneBox).find(".layer-niao"),
            beijing01: $(this.sceneBox).find(".layer-beijing01"),
            guang: $(this.sceneBox).find(".layer-guang"),
            guang2: $(this.sceneBox).find(".layer-guang2"),
        };
    }
    initPlay(): void {
        this.playTl.add(this.firstStep());
        this.playTl.add(this.secStep(), 0);
        this.playTl.add(this.infoEnterStep(), 1.5);
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
        const tl = gsap.timeline();
        const { yuan, taiji, yu, niao, beijing01, guang, guang2 } =
            this.getDom();

        tl.fromTo(
            taiji.find(".img-taiji"),
            { opacity: 0, rotate: 40 },
            { opacity: 1, ease: "Power3.easeOut", duration: 3, rotate: 0 }
        );

        tl.fromTo(
            yuan.find(".img-yuan"),
            { opacity: 0 },
            { opacity: 1, duration: 1 },
            0.2
        );

        tl.addLabel("niaoyuEnter", 0.3);
        tl.fromTo(
            yu,
            { rotate: 25, scale: 0.85 },
            {
                scale: 1,
                rotate: 0,
                ease: "Power3.easeOut",
                duration: 1,
            },
            "niaoyuEnter"
        );
        tl.fromTo(
            yu.find(".img-yu"),
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "<"
        );
        tl.fromTo(
            niao,
            { rotate: -0, z: 500 },
            {
                z: 0,
                rotate: 0,
                ease: "Power3.easeOut",
                duration: 1,
            },
            "niaoyuEnter"
        );
        tl.fromTo(
            niao.find(".img-niao"),
            { opacity: 0, rotate: 0 },
            { opacity: 1, duration: 0.5 },
            "<"
        );

        tl.fromTo(
            beijing01.find(".img-beijing01"),
            { opacity: 0, y: 100 },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)",
            },
            "niaoyuEnter+=0.2"
        );
        tl.fromTo(
            guang.add(guang2),
            { opacity: 0, z: -1000 },
            {
                z: 0,
                stagger: 0.05,
                opacity: 1,
                ease: "better-elastic",
                duration: 1,
            },
            0.2
        );
        tl.add(this.wenziEnterStep(), 0.9);

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
