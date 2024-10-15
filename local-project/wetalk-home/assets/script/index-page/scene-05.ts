/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-26 17:44:51
 */
import CreateSceneAnime from "./scene";

import Parallax from "parallax-js";
export default class Scene05 extends CreateSceneAnime {
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
            xiaoniao1: $(this.sceneBox).find(".layer-xiaoniao1"),
            xiaoniao2: $(this.sceneBox).find(".layer-xiaoniao2"),
            shu: $(this.sceneBox).find(".layer-shu"),
            dian: $(this.sceneBox).find(".layer-dian"),
            niao1: $(this.sceneBox).find(".layer-niao1"),
            niao2: $(this.sceneBox).find(".layer-niao2"),
        };
    }

    initPlay(): void {
        this.playTl.add(this.firstStep());
        this.playTl.add(this.secStep(), 0);
    }

    firstStep() {
        const { beijing } = this.getDom();
        const tl = gsap.timeline();
        tl.add(() => {
            gsap.set(this.sceneBox, { opacity: 1 });
        });
        tl.fromTo(beijing, { opacity: 0 }, { opacity: 1, duration: 2 });
        return tl;
    }

    secStep() {
        const { xiaoniao1, xiaoniao2, dian } = this.getDom();
        const tl = gsap.timeline();

        tl.fromTo(
            xiaoniao1.find(".img-xiaoniao1"),
            { z: 0 },
            { duration: 60, ease: "linear", z: -1000 },
            0
        );
        tl.fromTo(xiaoniao1, { opacity: 0 }, { opacity: 1 }, "<");
        tl.to(xiaoniao1, { opacity: 0 }, "-=10");

        tl.fromTo(
            xiaoniao2.find(".img-xiaoniao2"),
            { z: 0 },
            { duration: 120, ease: "linear", z: -2000 },
            0
        );
        tl.fromTo(xiaoniao2, { opacity: 0 }, { opacity: 1 }, "<");
        tl.to(xiaoniao2, { opacity: 0 }, "-=10");

        tl.fromTo(
            dian.find(".img-dian"),
            { z: -1000 },
            { z: 1000, duration: 80, ease: "linear" },
            0
        );
        tl.fromTo(dian, { opacity: 0 }, { opacity: 1, duration: 5 }, "<");

        tl.add(this.shuStep(), 0);

        return tl;
    }

    shuStep() {
        const { shu, niao1, niao2 } = this.getDom();

        const tl = gsap.timeline();

        tl.add("niaoEnter", 0);

        const stagger = 0.1;
        const dur = 0.2;

        // tl.fromTo(
        //     shu.find("img"),
        //     { opacity: 0 },
        //     { opacity: 1, duration: dur, stagger },
        //     "niaoEnter"
        // );
        const shuImgs = shu.find("img");
        tl.fromTo(
            shuImgs[0],
            { opacity: 0 },
            { opacity: 1, duration: dur, stagger },
            "niaoEnter"
        );
        shuImgs.not(shuImgs[0]).each((i, dom) => {
            tl.fromTo(
                dom,
                { opacity: 0 },
                { opacity: 1, duration: dur },
                i === 0 ? "<+=" + stagger : "<"
            );
            if (i != shuImgs.length - 2) {
                tl.to(dom, { opacity: 0, duration: dur }, "+=" + stagger);
            }
        });
        tl.fromTo(
            niao1.find(".img-niao1"),
            { opacity: 0, x: -100, z: 2000 },
            { opacity: 1, x: 0, z: 0, duration: 1 },
            "niaoEnter+=" + 1
        );

        tl.fromTo(
            niao2.find(".img-niao2"),
            { opacity: 0, x: 100, z: 2000 },
            { opacity: 1, x: 0, z: 0, duration: 1 },
            "niaoEnter+=" + 1.3
        );
        tl.add(this.wenziEnterStep(), "-=1");
        tl.add(this.infoEnterStep(), "<");

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
