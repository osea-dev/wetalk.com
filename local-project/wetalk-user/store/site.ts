/*
 * @Description: 站点状态管理
 * @Author: F-Stone
 * @LastEditTime: 2022-12-30 14:10:36
 */

import { defineStore } from "pinia";

import type {
    TYPE_LANG_LIST,
    TYPE_CURRENCY_LIST,
} from "@/assets/script/api/api";

type TYPE_SITE_STORE = {
    minNavIsOpen: boolean;
    lang: "en" | "zh-cn";
    noticeState: boolean;
    device: "pc" | "mo";
    openLangSwitch: boolean;
    currency: string;
    mediaMatch: { [name: string]: boolean };
    langList: TYPE_LANG_LIST;
    currencyList: TYPE_CURRENCY_LIST;
};
export const useSiteStore = defineStore("site", {
    state: (): TYPE_SITE_STORE => ({
        minNavIsOpen: false,
        openLangSwitch: false,
        noticeState: false,
        device: "pc",
        lang: "zh-cn",
        currency: "",
        mediaMatch: {},
        langList: [],
        currencyList: [],
    }),

    // optional actions
    actions: {
        updateLangList(state: TYPE_LANG_LIST) {
            this.langList = state;
        },
        updateCurrencyList(state: TYPE_CURRENCY_LIST) {
            this.currencyList = state;
        },
        updateCurrency(state: string) {
            this.currency = state;
        },
        updateDevice(state: TYPE_SITE_STORE["device"]) {
            this.device = state;
        },
        updateLang(state: TYPE_SITE_STORE["lang"]) {
            this.lang = state;
        },
        tabLangSwitch(state: boolean) {
            this.openLangSwitch = state;
        },
        updateNoticeState(state: boolean) {
            this.noticeState = state;
        },
        updateWindowMediaMatch(state: TYPE_SITE_STORE["mediaMatch"]) {
            this.mediaMatch = state;
        },
        changeMinNavIsOpen(state?: boolean) {
            if (typeof state === "undefined") {
                this.minNavIsOpen = !this.minNavIsOpen;
            } else {
                this.minNavIsOpen = state;
            }
        },
    },
});
