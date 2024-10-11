/*
 * @Description: 入场效果插件
 * @Author: F-Stone
 * @LastEditTime: 2022-12-02 19:31:30
 */
import WOW from "wow.js";
import { defineNuxtPlugin } from "@nuxtjs/composition-api";

export default defineNuxtPlugin(({ app }) => {
    if (!app.mixins) {
        app.mixins = [];
    }

    app.mixins.push({
        mounted() {
            if (process.browser) {
                requestAnimationFrame(() => {
                    new WOW({
                        live: true,
                        offset: 100,
                        resetAnimation: false,
                    }).init();

                    $("body").off("contextmenu.disableDownload");
                    $("body").on(
                        "contextmenu.disableDownload",
                        "video",
                        () => false
                    );
                });
            }
        },
    });
});
