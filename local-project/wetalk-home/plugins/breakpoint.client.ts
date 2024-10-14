/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-06-07 20:42:35
 */

import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import { debounce } from "~/assets/script/util/debounce";
import { mobileCheck } from "~/assets/script/util/mobile-check";
import { useSiteStore } from "@/store/site";

const breakpoints = {
    xs: 0,
    sm: 576 - 0.02,
    md: 768 - 0.02,
    lg: 992 - 0.02,
    xl: 1200 - 0.02,
    xxl: 1400 - 0.02,
    xxxl: 1760 - 0.02,
};
export default defineNuxtPlugin(({ $pinia }) => {
    const siteStore = useSiteStore($pinia);
    function triggerChange() {
        const matchResult: { [name: string]: boolean } = {};
        let lastAdaptScreen = "";
        Object.entries(breakpoints).forEach(([key, val]) => {
            matchResult[key] = window.matchMedia(
                `(max-width: ${val}px)`
            ).matches;
            if (matchResult[key] && !lastAdaptScreen) {
                lastAdaptScreen = key;
            }
        });
        const isModule = mobileCheck(
            window.navigator.userAgent || window.navigator.vendor
        );
        document.body.setAttribute("data-adapter-screen", lastAdaptScreen);
        if (lastAdaptScreen === "md" || lastAdaptScreen === "sm") {
            document.body.classList.add("agent-mobile");
        }
        document.body.setAttribute(
            "data-has-hover",
            window.matchMedia("(any-hover: none)").matches ? "0" : "1"
        );
        document.body.setAttribute("data-is-mobile", isModule ? "1" : "0");
        siteStore.updateWindowMediaMatch(matchResult);
    }
    triggerChange();
    window.onresize = debounce(triggerChange, 100);
});
