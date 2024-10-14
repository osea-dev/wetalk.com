import { defineNuxtPlugin } from "@nuxtjs/composition-api";

export default defineNuxtPlugin(() => {
    /* 告诉增加一个PV */
    try {
        // eslint-disable-next-line
        // @ts-ignore
        window._hmt = window._hmt || [];
        // eslint-disable-next-line
        // @ts-ignore
        window._hmt.push([
            "_requirePlugin",
            "UrlChangeTracker",
            {
                shouldTrackUrlChange: function (
                    newPath: string,
                    oldPath: string
                ) {
                    console.log("newPath", newPath);
                    console.log("oldPath", oldPath);
                    return newPath && oldPath;
                },
            },
        ]);
    } catch (e) {
        //
    }
    // app.mixins.push({
    //     mounted() {
    //         if (!process.browser) return;
    //         requestAnimationFrame(() => {
    //             // eslint-disable-next-line
    //             // @ts-ignore
    //             const _hmt: any = _hmt || [];
    //             (function () {
    //                 const hm = document.createElement("script");
    //                 hm.src =
    //                     "https://hm.baidu.com/hm.js?7941964856aa675b296554f01609a06d";
    //                 const s = document.getElementsByTagName("script")[0];
    //                 s.parentNode?.insertBefore(hm, s);
    //             })();
    //         });
    //     },
    // });
    // router.afterEach((to, from) => {
    //     /* 告诉增加一个PV */
    //     try {
    //       window._hmt = window._hmt || []
    //       window._hmt.push(['_trackPageview', to.fullPath])
    //     } catch (e) {
    //     }
    //   })
});
