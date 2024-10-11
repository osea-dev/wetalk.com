/*
 * @Description: 全局注册 swiper 组件
 * @Author: F-Stone
 * @LastEditTime: 2022-05-19 13:30:50
 */
import { defineNuxtPlugin } from "@nuxtjs/composition-api";

import Swiper, {
    EffectCreative,
    Navigation,
    Pagination,
    Controller,
    Mousewheel,
} from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/effect-creative/effect-creative.min.css";
import "swiper/modules/pagination/pagination.min.css";
Swiper.use([EffectCreative, Navigation, Mousewheel, Pagination, Controller]);

export default defineNuxtPlugin((_ctx, inject) => {
    inject("Swiper", Swiper);
});
