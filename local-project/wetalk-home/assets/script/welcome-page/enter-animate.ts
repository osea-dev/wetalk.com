export default class EnterAnimate {
    tl = gsap.timeline({ paused: true });
    constructor(public page: string) {
        this.page = page;
        this.firstStep();
        this.secStep();
        this.thirdStep();
        this.fourthStep();
        this.fifthStep();
        this.sixthStep();
        this.seventhStep();
    }
    /**
     * 幕布出场
     */
    firstStep() {
        const curtain = $(this.page).find(".w-state-curtain");
        const cloud = curtain.find(".cloud-0");
        const curtainAnime = gsap
            .timeline()
            .to(cloud, {
                z: 2800,
                opacity: 1,
                duration: 3,
                backgroundPositionY: "-30%",
            })
            .to(cloud, { opacity: 0, duration: 1 }, "-=1");
        this.tl.add(curtainAnime);
        this.tl.addLabel("curtainEnd");
    }
    /**
     * 右侧场景入场
     */
    secStep() {
        const stage = $(this.page).find(".w-stage");
        const logo = stage.find(".layer-1");
        const rightStage = stage.find(".w-stage--right");
        const r_layer1 = rightStage.find(".layer-3");
        const r_layer2 = rightStage.find(".layer-4");
        const r_layer3 = rightStage.find(".layer-5");
        const r_stageAnime = gsap
            .timeline()
            .to(rightStage, {
                opacity: 1,
                duration: 1,
            })
            .fromTo(
                r_layer1,
                { x: "-12%" },
                { x: "0", y: "0", duration: 0.8 },
                "<"
            )
            .fromTo(
                r_layer2,
                { x: "12%" },
                { x: "0", y: "0", duration: 1 },
                "<+=0.1"
            )
            .fromTo(
                r_layer3,
                { x: "10%" },
                { x: "0", y: "0", duration: 1 },
                "<+=0.2"
            );
        r_stageAnime.addLabel("cloudEnterEnd");
        r_stageAnime.to(logo, { opacity: 1, duration: 2 }, "0.5");
        $(r_layer1.add(r_layer2).add(r_layer3)).each((i, dom) => {
            r_stageAnime.to(
                dom,
                {
                    delay: parseFloat($(dom).css("animation-delay")),
                    duration: parseFloat($(dom).css("animation-duration")),
                    yoyoEase: "cloud-wave",
                    x: "3%",
                },
                "cloudEnterEnd"
            );
            r_stageAnime.to(dom, {
                duration: parseFloat($(dom).css("animation-duration")),
                keyframes: {
                    x: ["3%", "-2%"],
                },
                repeat: -1,
                yoyo: true,
                yoyoEase: "cloud-wave",
            });
        });
        this.tl.add(r_stageAnime, "curtainEnd-=1");
    }
    /**
     * 左侧场景入场
     */
    thirdStep() {
        const stage = $(this.page).find(".w-stage");
        const leftStage = stage.find(".w-stage--left");
        const l_layer1 = leftStage.find(".layer-2");
        const l_layer2 = leftStage.find(".layer-6");
        const l_layer3 = leftStage.find(".layer-7");
        const l_layer4 = leftStage.find(".layer-8");
        const l_stageAnime = gsap
            .timeline()
            .to(leftStage, {
                duration: 1,
                opacity: 1,
            })
            .fromTo(
                l_layer1,
                { x: "8%", y: "-3%" },
                { x: "0", y: "0", duration: 1.5 },
                "<"
            )
            .fromTo(
                l_layer2,
                { x: "6%", y: "-5%" },
                { x: "0", y: "0", duration: 1.7 },
                "<"
            )
            .fromTo(
                l_layer3,
                { x: "-7%", y: "-5%" },
                { x: "0", y: "0", duration: 1.7 },
                "<"
            )
            .fromTo(
                l_layer4,
                { x: "-5%", y: "-5%" },
                { x: "0", y: "0", duration: 1.7 },
                "<"
            );

        l_stageAnime.addLabel("cloudEnterEnd");

        $(l_layer2.add(l_layer3).add(l_layer4)).each((i, dom) => {
            l_stageAnime.to(
                dom,
                {
                    delay: parseFloat($(dom).css("animation-delay")),
                    duration: parseFloat($(dom).css("animation-duration")),
                    yoyoEase: "cloud-wave",
                    x: "-3%",
                },
                "cloudEnterEnd"
            );
            l_stageAnime.to(dom, {
                duration: parseFloat($(dom).css("animation-duration")),
                keyframes: {
                    x: ["-3%", "2%"],
                },
                repeat: -1,
                yoyo: true,
                yoyoEase: "cloud-wave",
            });
        });
        this.tl.add(l_stageAnime, "curtainEnd-=0.8");
    }
    /**
     * 前景云层入场
     */
    fourthStep() {
        const stage = $(this.page).find(".w-stage");
        const cloud = stage.find(".layer-0");
        const stepAnime = gsap.timeline().to(cloud, {
            opacity: 0.8,
            duration: 2,
        });
        this.tl.add(stepAnime, "curtainEnd-=0.5");
    }
    /**
     * 圆环入场
     */
    fifthStep() {
        const stage = $(this.page).find(".w-stage-cover");
        const circleBox = stage.find(".circle-box");
        const alterCircle = circleBox.find(".circle--alter");
        const circles: JQuery<SVGCircleElement> = circleBox
            .find("circle")
            .not(".circle--alter");
        circles.each((i, dom) => {
            const len = dom.getTotalLength();
            $(dom).css({
                "stroke-dasharray": len,
                "stroke-dashoffset": len,
            });
        });

        const stepAnime = gsap
            .timeline({ id: "fifthStep" })
            .to(circles, {
                "stroke-dashoffset": 0,
                stagger: 0.15,
                duration: 1.5,
            })
            .to(
                circles,
                {
                    ease: "linear",
                    duration: 1.5,
                    stagger: 0.2,
                    transformOrigin: "center center",
                    rotate: (i: number) => 10 * circles.length - (i + 1),
                },
                "0"
            );

        stepAnime.fromTo(
            alterCircle,
            {
                opacity: 0,
                scale: 0.5,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                // transformOrigin: "center center",
            },
            "-=0.2"
        );

        this.tl.add(stepAnime, "-=2");
        this.tl.addLabel("circleEnter", "-=0.6");
    }
    /**
     * logo 和 跳过按钮的入场
     */
    sixthStep() {
        const log = $(this.page).find(".w-logo");
        const btn = $(this.page).find(".btn--jump-animate");
        const stepAnime = gsap
            .timeline()
            .fromTo(log, { opacity: 0, y: "0%" }, { opacity: 1, y: "0%" })
            .fromTo(
                btn,
                { opacity: 0, y: "40%" },
                { opacity: 1, y: "0%" },
                0.2
            );
        this.tl.add(stepAnime, "-=1");
    }
    seventhStep() {
        const stage = $(this.page).find(".w-stage-cover");
        const circleBox = stage.find(".circle-box");
        const circles: JQuery<SVGCircleElement> = circleBox
            .find("circle")
            .not(".circle--alter");

        const stepAnime = gsap.timeline({
            // yoyo: true,
        });
        circles.each((i, dom) => {
            stepAnime.to(
                dom,
                {
                    ease: "linear",
                    repeat: -1,
                    duration: 4,
                    repeatDelay: 0.4,
                    transformOrigin: "center center",
                    keyframes: [
                        { opacity: 1 },
                        { opacity: 0.2 },
                        { opacity: gsap.getProperty(dom, "opacity") },
                    ],
                },
                i * 1
            );
        });
        stepAnime.timeScale(1.5);
        this.tl.add(stepAnime);
    }

    btnEnter() {
        const btnTl = gsap.timeline({
            paused: true,
        });

        const stage = $(this.page).find(".w-stage-cover");
        const circleBox = stage.find(".circle-box");
        const btn = circleBox.find(".btn--entry");
        const texts = btn.find(".text");
        const ic = btn.find(".ic");
        texts.each((i, text) => {
            const anime = gsap.to(text, {
                z: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                onUpdate: () => {
                    gsap.set(text, {
                        filter: "blur(" + 15 * (1 - anime.progress()) + "px)",
                    });
                },
            });
            btnTl.add(anime, i * 0.1);
        });
        btnTl.fromTo(ic, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.20");
        return btnTl;
    }
    loadingEnter() {
        const stage = $(this.page).find(".w-stage-cover");
        const circleBox = stage.find(".circle-box");
        const loading = circleBox.find(".role-stage-loading");
        const loadingBar = loading.find(".loading-bar");
        const loadingBarInner = loadingBar.find(".loading-bar--inner");

        const loadingEnterTl = gsap.fromTo(
            loading,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.4,
                paused: true,
            }
        );

        loadingEnterTl.eventCallback("onUpdate", () => {
            gsap.set(loading, {
                filter: "blur(" + 15 * (1 - loadingEnterTl.progress()) + "px)",
            });
        });

        return {
            enter: loadingEnterTl,
            barDom: loadingBarInner,
            level: gsap
                .timeline({
                    paused: true,
                    onStart() {
                        gsap.set(loading, { pointerEvents: "none" });
                    },
                })
                .to(loading, {
                    opacity: 0,
                    scale: 0.5,
                }),
        };
    }
}
