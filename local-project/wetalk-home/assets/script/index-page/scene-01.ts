/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-27 12:18:27
 */

import CreateSceneAnime from "./scene";

import Parallax from "parallax-js";

export default class Scene01 extends CreateSceneAnime {
    constructor(public sceneBox: HTMLElement) {
        super(sceneBox);

        new Parallax(this.sceneBox, {
            selector: ".parallax-layer",
            scalarX: 8,
            scalarY: 2,
        });
    }
    getDom() {
        return {
            beijing: $(this.sceneBox).find(".layer-beijing"),
            taiyang: $(this.sceneBox).find(".layer-taiyang"),
            shan: $(this.sceneBox).find(".layer-shan"),
            shu: $(this.sceneBox).find(".layer-shu"),
            ren: $(this.sceneBox).find(".layer-ren"),
            hailang: $(this.sceneBox).find(".layer-hailang"),
            yu1: $(this.sceneBox).find(".layer-yu-1"),
            yu2: $(this.sceneBox).find(".layer-yu-2"),
            niao: $(this.sceneBox).find(".layer-niao"),
        };
    }

    initPlay() {
        this.playTl.add(this.firstStep());
        this.playTl.add(this.secStep(), 0);
        this.playTl.add(this.thirdStep(), 0.3);
        this.playTl.add(this.infoEnterStep(), "-=2.5");
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

    // 天空过渡
    secStep() {
        const { taiyang, yu1, yu2, niao } = this.getDom();
        const tl = gsap.timeline();
        tl.fromTo(
            taiyang.find(".img-taiyang"),
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );
        tl.fromTo(
            taiyang.find(".img-taiyang"),
            { rotate: 30 },
            { rotate: 0, ease: "Power3.easeOut", duration: 5 },
            0
        );
        tl.fromTo(
            niao.find(".box-sky"),
            { rotate: 25, z: 1000 },
            {
                rotate: 0,
                z: 0,
                ease: "Power3.easeOut",
                duration: 2,
            },
            0
        );
        tl.fromTo(
            niao.find(".img-niao"),
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            "<"
        );
        tl.fromTo(
            yu2.find(".box-sky"),
            { rotate: 25, z: 1000 },
            { rotate: 0, z: 0, ease: "Power3.easeOut", duration: 2 },
            0.2
        );
        tl.fromTo(
            yu2.find(".img-yu-2"),
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            "<"
        );
        tl.fromTo(
            yu1.find(".box-sky"),
            { y: 60, z: -200 },
            { y: 0, z: 0, duration: 1 },
            0.2
        );
        tl.fromTo(
            yu1.find(".img-yu-1"),
            { opacity: 0 },
            { opacity: 1, duration: 0.2 },
            "<"
        );

        tl.add(this.wenziEnterStep(), 1);

        return tl;
    }

    // 人 / 物 入场
    thirdStep() {
        const { shan, shu, ren, hailang } = this.getDom();
        const tl = gsap.timeline();

        tl.fromTo(
            shu.find(".img-shu"),
            {
                y: 0,
                opacity: 0,
                rotate: 10,
                x: 20,
                transformOrigin: "right bottom",
            },
            {
                duration: 4,
                rotate: 0,
                ease: "elastic.out(1, 0.3)",
                opacity: 1,
            }
        );
        tl.fromTo(
            hailang.find(".img-hailang")[1],
            { opacity: 0, y: "100", x: "20%" },
            {
                y: "0",
                opacity: 1,
                duration: 4,
                ease: "elastic.out(1, 0.5)",
            },
            0.2
        );
        tl.fromTo(
            hailang.find(".img-hailang")[0],
            { opacity: 0, y: "120", x: "-40%" },
            {
                y: "20",
                opacity: 1,
                duration: 4,
                ease: "elastic.out(1, 0.5)",
            },
            0.4
        );

        tl.fromTo(
            shan.find(".img-shan"),
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: "back.out(1.7)",
                duration: 1,
            },
            0.7
        );
        tl.fromTo(
            ren.find(".img-ren"),
            { opacity: 0, y: 50 },
            { y: 0, opacity: 1, duration: 0.6 },
            "<"
        );
        return tl;
    }

    // initLeave() {
    //     this.levelTl.add(this.leaveFirstStep());
    //     this.levelTl.add(this.leaveSecStep(), 0);
    //     this.levelTl.add(this.infoLeaveStep(), 0);
    // }

    // leaveFirstStep() {
    //     const { yu1, yu2, niao } = this.getDom();
    //     const tl = gsap.timeline();

    //     tl.to(
    //         niao.find(".box-sky"),
    //         {
    //             rotate: "-=20",
    //             z: "+=500",
    //             ease: "Power3.easeOut",
    //             duration: 1,
    //         },
    //         0
    //     );
    //     tl.to(niao.find(".img-niao"), { opacity: 0, duration: 0.4 }, "<");

    //     tl.to(
    //         yu2.find(".box-sky"),
    //         { rotate: "-=20", z: "+=500", ease: "Power3.easeOut", duration: 2 },
    //         0
    //     );
    //     tl.to(yu2.find(".img-yu-2"), { opacity: 0, duration: 0.4 }, "<");

    //     tl.to(yu1.find(".box-sky"), { y: "-=100", z: "-=200", duration: 1 }, 0);
    //     tl.to(yu1.find(".img-yu-1"), { opacity: 0, duration: 0.2 }, "<");

    //     tl.add(this.wenziLeaveStep(), "<");

    //     return tl;
    // }

    // leaveSecStep() {
    //     const { beijing, shan, shu, ren, hailang, taiyang } = this.getDom();
    //     const tl = gsap.timeline({
    //         defaults: {
    //             duration: 0.6,
    //         },
    //     });

    //     tl.to(ren.find(".img-ren"), { y: "+=50", opacity: 0 });
    //     tl.to(shan.find(".img-shan"), { y: "+=50", opacity: 0 }, "<");
    //     tl.to(
    //         hailang.find(".img-hailang"),
    //         {
    //             opacity: 0,
    //             y: "+=50",
    //         },
    //         "<"
    //     );
    //     tl.to(
    //         shu.find(".img-shu"),
    //         {
    //             x: "+=50",
    //             opacity: 0,
    //         },
    //         "<"
    //     );
    //     tl.to(
    //         taiyang.find(".img-taiyang").add(beijing),
    //         {
    //             opacity: 0,
    //             duration: 1,
    //         },
    //         0
    //     );

    //     return tl;
    // }

    initLeave(): void {
        this.levelTl.add(this.firstLeaveStep());
    }

    firstLeaveStep() {
        return gsap.to(this.sceneBox, {
            opacity: 0,
        });
    }
}
