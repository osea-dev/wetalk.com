import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import throttle from "lodash.throttle";
import MobileDetect from "mobile-detect";
import { useSiteStore } from "@/store/site";

export default defineNuxtPlugin(({ app, req, $pinia }) => {
    if (!app.mixins) {
        app.mixins = [];
    }

    app.mixins.push({
        mounted() {
            if (!process.browser) return;
            const userAgent = req
                ? req.headers["user-agent"] || ""
                : navigator.userAgent || "";

            const md = new MobileDetect(userAgent);
            const is_iPad =
                navigator.platform === "MacIntel" &&
                navigator.maxTouchPoints > 1;

            if (is_iPad || md.mobile()) {
                const siteStore = useSiteStore($pinia);
                siteStore.updateDevice("mo");
                document.body.style.setProperty(
                    "--screen-h",
                    window.innerHeight / 100 + "px"
                );
                $(window).off("resize.dvh");
                $(window).on(
                    "resize.dvh",
                    throttle(
                        () => {
                            requestAnimationFrame(() => {
                                document.body.style.setProperty(
                                    "--screen-h",
                                    window.innerHeight / 100 + "px"
                                );
                            });
                        },
                        1000,
                        { leading: false }
                    )
                );
            }
        },
    });
});
