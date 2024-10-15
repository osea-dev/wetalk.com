import RolesScene from "./all-scene";
import KongScene from "./kong-scene";
import LaoScene from "./lao-scene";
import MengScene from "./meng-scene";
import ZhuangScene from "./zhuang-scene";

export default class SceneControl {
    constructor(private container: HTMLElement, private vsScroll: any) {}

    startAnimate: gsap.core.Timeline | null = null;

    init() {
        this.startAnimate = this.kongScene();
        this.mengScene();
        this.laoScene();
        this.zhuangScene();
        this.roleScene();
        $("#roleStage").css({
            opacity: 1,
        });
        return this;
    }

    start() {
        this.startAnimate?.play();
    }

    /**
     * 孔子场景
     */
    kongScene() {
        const startPos = 0;
        const scrollH = 3000;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: $("#scrollStage .scroll-container"),
                start: `${startPos} top`,
                end: `top+=${startPos + scrollH} bottom`,
                scrub: 2,
            },
        });

        this.vsScroll?.stop();
        const kong = new KongScene(this.container, {
            scrollHeight: scrollH - startPos,
            scrollContainer: $("#scrollStage .scroll-container")[0],
        });
        const prevAnimate = kong.sceneEnter(() => {
            this.vsScroll?.start();
        });
        prevAnimate.timeScale(6000);
        tl.add(kong.getScrollScene());

        return prevAnimate;
    }

    /**
     * 孟子场景
     */
    mengScene() {
        const startPos = 200;
        const scrollH = 3000;

        const mengTl = gsap.timeline({
            scrollTrigger: {
                trigger: $("#scrollStage .scroll-container"),
                start: `${startPos} top`,
                end: `top+=${startPos + scrollH} bottom`,
                scrub: 2,
            },
        });
        const meng = new MengScene(this.container, {
            scrollHeight: scrollH + startPos,
            scrollContainer: $("#scrollStage .scroll-container")[0],
        });
        mengTl.add(meng.getScrollScene());
    }

    /**
     * 老子场景
     */
    laoScene() {
        const startPos = 1200;
        const scrollH = 3000;

        const laoTl = gsap.timeline({
            scrollTrigger: {
                trigger: $("#scrollStage .scroll-container"),
                start: `${startPos} top`,
                end: `top+=${startPos + scrollH} bottom`,
                scrub: 2,
            },
        });
        const lao = new LaoScene(this.container, {
            scrollHeight: scrollH + startPos,
            scrollContainer: $("#scrollStage .scroll-container")[0],
        });
        laoTl.add(lao.getScrollScene());
    }

    /**
     * 庄子场景
     */
    zhuangScene() {
        const startPos = 2400;
        const scrollH = 3000;

        const zhuangTl = gsap.timeline({
            scrollTrigger: {
                trigger: $("#scrollStage .scroll-container"),
                start: `${startPos} top`,
                end: `top+=${startPos + scrollH} bottom`,
                scrub: 2,
            },
        });
        const zhuang = new ZhuangScene(this.container, {
            scrollHeight: scrollH + startPos,
            scrollContainer: $("#scrollStage .scroll-container")[0],
        });
        zhuangTl.add(zhuang.getScrollScene());
    }

    roleScene() {
        const startPos = 4000;
        const scrollH = 3000;

        const rolesTl = gsap.timeline({
            scrollTrigger: {
                trigger: $("#scrollStage .scroll-container"),
                start: `${startPos} top`,
                end: `top+=${startPos + scrollH} bottom`,
                scrub: 2,
            },
        });
        const rolesScene = new RolesScene(this.container, {
            scrollHeight: scrollH + startPos,
            scrollContainer: $("#scrollStage .scroll-container")[0],
        });
        rolesTl.add(rolesScene.getScrollScene());
    }
}
