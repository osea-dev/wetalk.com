/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-28 18:52:19
 */
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollTrigger from "gsap/ScrollTrigger";
// import { os } from "@/assets/script/util/os";

export default class InitScroll {
    public vsScroll: any = null;
    constructor(public scrollEl: Element) {}
    init() {
        if (!$("body").hasClass("mo-ui")) {
            const locoScroll = new LocomotiveScroll({
                el: this.scrollEl,
                smooth: true,
                speed: true,
                lerp: 1,
                getDirection: true,
                tablet: { smooth: true },
                smartphone: { smooth: true },
            });

            locoScroll.on("scroll", () => {
                ScrollTrigger.update();
            });
            ScrollTrigger.defaults({
                scroller: this.scrollEl,
            });
            ScrollTrigger.scrollerProxy(this.scrollEl, {
                scrollTop(value) {
                    return value
                        ? locoScroll.scrollTo(value, 0, 0)
                        : locoScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },
                pinType: "transform",
            });

            ScrollTrigger.addEventListener("refreshInit", () => {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        locoScroll.update();
                    });
                }, 200);
            });
            ScrollTrigger.addEventListener("refresh", () => {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        locoScroll.update();
                    });
                }, 200);
            });
            this.vsScroll = locoScroll;
        }
        return this;
    }
    destroy() {
        console.log("destroy", "destroy");
        this.vsScroll?.destroy();
        ScrollTrigger.killAll();
        this.vsScroll = null;
    }
}
