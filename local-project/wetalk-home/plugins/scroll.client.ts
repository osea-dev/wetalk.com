import InitScroll from "@/assets/script/welcome-page/init-scroll";
import { defineNuxtPlugin } from "@nuxtjs/composition-api";

export default defineNuxtPlugin((_ctx, inject) => {
    inject("InitScroll", InitScroll);
});
