/*
 * @Description: 全局注册 swiper 组件
 * @Author: F-Stone
 * @LastEditTime: 2023-02-01 16:26:21
 */
import { defineNuxtPlugin } from "@nuxtjs/composition-api";

import Swiper, {
    EffectFade,
    EffectCreative,
    Navigation,
    Pagination,
    Controller,
    Mousewheel,
    Autoplay,
} from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/effect-creative/effect-creative.min.css";
import "swiper/modules/pagination/pagination.min.css";
Swiper.use([
    EffectCreative,
    Navigation,
    Mousewheel,
    Pagination,
    Controller,
    EffectFade,
    Autoplay,
]);

export default defineNuxtPlugin((_ctx, inject) => {
    inject("Swiper", Swiper);
});
