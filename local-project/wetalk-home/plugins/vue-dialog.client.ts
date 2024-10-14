/*
 * @Description: 注册弹窗插件
 * @Author: F-Stone
 * @LastEditTime: 2022-05-19 15:59:20
 */

import Vue from "vue";
import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import dialog from "./dialog/main";

Vue.prototype.$dialog = dialog;

export default defineNuxtPlugin((_ctx, inject) => {
    inject("dialog", Vue.prototype.$dialog);
});
