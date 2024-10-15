/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-26 16:18:40
 */
import CreateSceneAnime from "./scene";

import Parallax from "parallax-js";
export default class Scene02 extends CreateSceneAnime {
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
            taiyang: $(this.sceneBox).find(".layer-taiyang"),
            ren1: $(this.sceneBox).find(".layer-ren1"),
            ren2: $(this.sceneBox).find(".layer-ren2"),
            chengqiang: $(this.sceneBox).find(".layer-chengqiang"),
            you: $(this.sceneBox).find(".layer-you"),
            zuo: $(this.sceneBox).find(".layer-zuo"),
            beijing01: $(this.sceneBox).find(".layer-beijing01"),
            beijing02: $(this.sceneBox).find(".layer-beijing02"),
        };
    }
    initPlay() {
        this.playTl.add(this.firstStep());
        this.playTl.add(this.secStep(), 0);
        this.playTl.add(this.thirdStep(), "-=3");
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
        const {
            you,
            zuo,
            taiyang,
            chengqiang,
            beijing01,
            beijing02,
            ren1,
            ren2,
        } = this.getDom();
        const tl = gsap.timeline();

        tl.addLabel("zuoYouEnter", 0);

        tl.fromTo(
            zuo,
            {
                x: -20,
                rotate: 10,
                opacity: 0,
                transformOrigin: "left top",
            },
            {
                opacity: 1,
                x: 0,
                duration: 4,
                rotate: 0,
                ease: "elastic.out(1, 0.3)",
            },
            "zuoYouEnter"
        );
        tl.fromTo(
            zuo.find(".img-zuo"),
            { opacity: 0 },
            { opacity: 1 },
            "zuoYouEnter"
        );
        tl.fromTo(
            you,
            { opacity: 0, x: -20, rotate: -20, transformOrigin: "right top" },
            {
                opacity: 1,
                x: 0,
                rotate: 0,
                ease: "elastic.out(1, 0.3)",
                duration: 4,
            },
            "zuoYouEnter"
        );
        tl.fromTo(
            you.find(".img-you"),
            { opacity: 0 },
            { opacity: 1 },
            "zuoYouEnter"
        );
        tl.fromTo(
            taiyang.find(".img-taiyang"),
            { opacity: 0, y: "+=130" },
            { opacity: 1, y: "-=130", duration: 1 },
            "zuoYouEnter"
        );

        tl.add("chengqiangEnter", 0);
        tl.fromTo(
            taiyang.find(".img-taiyang"),
            { rotate: 30 },
            { rotate: 0, ease: "Power3.easeOut", duration: 5 },
            "chengqiangEnter"
        );

        tl.fromTo(
            chengqiang.find(".img-chengqiang img"),
            { opacity: 0, z: 500 },
            { opacity: 1, z: 0, ease: "better-elastic", duration: 1 },
            "chengqiangEnter"
        );
        tl.fromTo(
            ren1.find(".img-ren1 img"),
            { opacity: 0, z: 500 },
            { opacity: 1, z: 0, ease: "better-elastic", duration: 1.5 },
            "chengqiangEnter+=0.2"
        );
        tl.fromTo(
            ren2.find(".img-ren2 img"),
            { opacity: 0, z: 500 },
            { opacity: 1, z: 0, ease: "better-elastic", duration: 1.5 },
            "chengqiangEnter+=0.2"
        );

        tl.fromTo(
            beijing01.find(".img-beijing01"),
            { opacity: 0, y: 100 },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: "elastic.out(1, 0.5)",
            },
            0.2
        );
        tl.fromTo(
            beijing02.find(".img-beijing02"),
            { opacity: 0, y: 100 },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: "elastic.out(1, 0.5)",
            },
            0.4
        );

        tl.add(this.wenziEnterStep(), 1);

        return tl;
    }
    thirdStep() {
        const tl = gsap.timeline();
        tl.add(this.infoEnterStep());
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
