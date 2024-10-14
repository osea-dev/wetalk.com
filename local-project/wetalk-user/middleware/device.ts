import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import MobileDetect from "mobile-detect";
import { useSiteStore } from "@/store/site";

export default defineNuxtMiddleware((ctx) => {
    const siteStore = useSiteStore(ctx.$pinia);
    const userAgent = ctx.req
        ? ctx.req.headers["user-agent"] || ""
        : navigator.userAgent || "";

    const md = new MobileDetect(userAgent);
    siteStore.updateDevice(md.mobile() ? "mo" : "pc");
});
