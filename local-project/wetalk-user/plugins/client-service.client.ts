import { defineNuxtPlugin } from "@nuxtjs/composition-api";

export default defineNuxtPlugin(({ app }) => {
    if (!app.mixins) {
        app.mixins = [];
    }

    app.mixins.push({
        mounted() {
            if (!process.browser) return;
            requestAnimationFrame(() => {
                $(`
                <div class="zhiCustomBtn">
                    <img style="width: 100%; height: 100%; object-fit: cover;" src="${require("@/assets/images/zc-service.png")}" alt="" />
                </div>
                `).appendTo("body");

                (function (w: any, d: any, e: any) {
                    w[e] = function () {
                        w.cbk = w.cbk || [];
                        // eslint-disable-next-line prefer-rest-params
                        w.cbk.push(arguments);
                    };
                    const x = d.createElement("script");
                    x.async = true;
                    x.id = "zhichiScript";
                    x.className = "zhiCustomBtn";
                    x.src =
                        "https://global.sobot.com/chat/frame/v2/entrance.js?sysnum=41ba1dff3f6a472692ab6f1a565390ab";
                    d.body.appendChild(x);
                })(window, document, "zc");
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                zc("config", {
                    invite: 0,
                    custom: true,
                    invite_flag: false, //true关闭,默认开启
                });
            });
        },
    });
});
