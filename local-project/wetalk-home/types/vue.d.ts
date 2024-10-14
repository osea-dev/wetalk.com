import type { Swiper } from "swiper";
import type dialog from "@/plugins/dialog/main";
declare module "vue/types/vue" {
    interface Vue {
        readonly $Swiper: typeof Swiper;
    }
}

declare module "@nuxt/types" {
    interface Context {
        readonly $Swiper: typeof Swiper;
        readonly $dialog: typeof dialog;
    }

    interface NuxtAppOptions {
        readonly $Swiper: typeof Swiper;
    }

    interface NuxtOptions {
        readonly $Swiper: typeof Swiper;
    }
}

declare global {
    interface window {
        zc: any;
        _hmt: any;
    }
}

declare module "vue-i18n/types" {
    export default class VueI18n {
        t(key: Path, locale: Locale, values?: Values): string;
        t(key: Path, values?: Values): string;
    }
}
