<template>
    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
        <div
            :class="$style['lang-switch-module']"
            v-if="openLangSwitch"
            ref="switchModule"
        >
            <div :class="$style['module-container']">
                <div :class="$style['bg']" ref="bg"></div>
                <div
                    class="wrapper--limit-width flex justify-end relative z-10"
                >
                    <div :class="$style['module--inner']" class="relative">
                        <div
                            :class="$style['btn--close']"
                            ref="closeBtn"
                            @click="closeLangSwitch()"
                        >
                            <i class="ic iconfont icon-close"></i>
                        </div>
                        <div class="w-full" ref="selectWrapper">
                            <div :class="$style['module-head']">
                                <h2 :class="$style['module-title']">
                                    {{
                                        langLength > 1
                                            ? $t("KEY_SWITCH.TITLE")
                                            : "选择结算币种"
                                    }}
                                </h2>
                                <div :class="$style['tip']">
                                    <span class="text">{{
                                        $t("KEY_SWITCH.TIP")
                                    }}</span>
                                </div>
                            </div>
                            <div
                                :class="$style['module-body']"
                                class="flex"
                                :data-has-lang="langLength > 1"
                            >
                                <div
                                    :class="$style['select-group']"
                                    :data-active="activeSelect === 'currency'"
                                >
                                    <div
                                        :class="$style['select-value']"
                                        class="flex justify-between items-center"
                                        @click="changeActiveSelect('currency')"
                                    >
                                        <span class="text">{{
                                            selectCurrencyTitle
                                        }}</span>
                                        <i
                                            class="ic iconfont icon-arrow-down"
                                        ></i>
                                    </div>
                                    <div :class="$style['select-options']">
                                        <div
                                            :class="$style['select-option']"
                                            v-for="item in currencyList"
                                            @click="
                                                changeCurrency(
                                                    item.currencyCode
                                                )
                                            "
                                            :key="item.currencyid"
                                        >
                                            <span class="text">
                                                {{ item.currency }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    :class="$style['select-group']"
                                    :data-active="activeSelect === 'lang'"
                                    v-if="langLength > 1"
                                >
                                    <div
                                        :class="$style['select-value']"
                                        class="flex justify-between items-center"
                                        @click="changeActiveSelect('lang')"
                                    >
                                        <span class="text">{{
                                            selectLangTitle
                                        }}</span>
                                        <i
                                            class="ic iconfont icon-arrow-down"
                                        ></i>
                                    </div>
                                    <div :class="$style['select-options']">
                                        <div
                                            :class="$style['select-option']"
                                            v-for="item in langList"
                                            :key="item.languageid"
                                            :data-value="item.lang"
                                            @click="changeLang(item.lang)"
                                        >
                                            <span class="text">{{
                                                item.title
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                :class="$style['module-footer']"
                                class="flex justify-end"
                            >
                                <button
                                    :class="$style['btn--confirm']"
                                    class="flex items-center justify-center"
                                    @click="confirm"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.CONFIRM")
                                    }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useSiteStore } from "@/store/site";
import { storeToRefs } from "pinia";
import { useContext, useRoute } from "@nuxtjs/composition-api";

const selectWrapper = ref<HTMLElement | null>(null);
const switchModule = ref<HTMLElement | null>(null);
const closeBtn = ref<HTMLElement | null>(null);
const bg = ref<HTMLElement | null>(null);

function onBeforeEnter() {
    gsap.set(selectWrapper.value, { opacity: 0 });
    gsap.set(closeBtn.value, { opacity: 0 });
}
function onEnter(el: HTMLElement, done: () => void) {
    const tl = gsap.timeline({
        onComplete() {
            done();
        },
    });
    tl.fromTo(
        switchModule.value,
        { backgroundColor: "rgba(0,0,0,0)" },
        { backgroundColor: "rgba(0,0,0,0.8)" }
    );
    tl.fromTo(closeBtn.value, { opacity: 0 }, { opacity: 1 });
    tl.fromTo(
        bg.value,
        { width: 0 },
        { width: "50%", ease: "better-elastic", duration: 0.8 },
        0
    );
    tl.fromTo(
        selectWrapper.value,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        "-=0.2"
    );
}
function onLeave(el: HTMLElement, done: () => void) {
    const tl = gsap.timeline({
        onComplete() {
            done();
        },
    });
    tl.to(selectWrapper.value, { opacity: 0 });
    tl.to(closeBtn.value, { opacity: 0 }, 0);
    tl.to(bg.value, { width: 0, ease: "better-elastic", duration: 0.8 }, 0.2);
    tl.to(switchModule.value, { backgroundColor: "rgba(0,0,0,0)" }, "-=0.5");
}

const siteStore = useSiteStore();

const currencyList = computed(() => {
    return siteStore.currencyList;
});
const langList = computed(() => {
    return siteStore.langList;
});

const activeSelect = ref<"currency" | "lang" | "">("");

function changeActiveSelect(type: "currency" | "lang") {
    if (activeSelect.value === type) {
        activeSelect.value = "";
    } else {
        activeSelect.value = type;
    }
}
const { openLangSwitch } = storeToRefs(siteStore);
function closeLangSwitch() {
    siteStore.tabLangSwitch(false);
}
const route = useRoute();
function confirm() {
    closeLangSwitch();
}

watch(
    () => route.value.fullPath,
    () => {
        closeLangSwitch();
    }
);
watch(
    () => {
        let result = "";
        Object.entries(siteStore.mediaMatch).some(([k, v]) => {
            if (v === true) {
                result = k;
                return true;
            }
        });
        return result;
    },
    () => {
        closeLangSwitch();
    }
);

const { $cookies, i18n } = useContext();
const selectCurrency = ref<string>(siteStore.currency);
const selectLang = ref<string>(siteStore.lang);

const langLength = computed(() => {
    return i18n.locales.length;
});

watch(
    () => siteStore.currency,
    (newCurrency) => {
        if (selectCurrency.value != newCurrency) {
            selectCurrency.value = newCurrency;
        }
    }
);

const selectCurrencyTitle = computed(() => {
    let result = "";
    currencyList.value.some((item) => {
        if (item.currencyCode === selectCurrency.value) {
            result = `${item.currency}`;
            return true;
        }
    });
    return result;
});
const selectLangTitle = computed(() => {
    let result = "";
    langList.value.some((item) => {
        if (item.lang === selectLang.value) {
            result = item.title;
            return true;
        }
    });
    return result;
});

function changeCurrency(currency: string) {
    siteStore.updateCurrency(currency);
    activeSelect.value = "";
    $cookies.set("CurrencyCode", currency, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    closeLangSwitch();
}
function changeLang(lang: string) {
    selectLang.value = lang;
    activeSelect.value = "";
    i18n.setLocale(lang);
}
</script>
<style lang="scss" module>
.lang-switch-module {
    font-family: var(--SourceHanSans);
    font-weight: 400;

    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;

    width: 100vw;

    background-color: rgba($color: #000, $alpha: 0.8);
    .module--inner {
        display: flex;
        // flex-direction: column;

        width: 50%;
        height: 100vh;
        padding-top: 35px;
        padding-bottom: 95px;
        padding-left: min(118px, 6vw);

        // justify-content: center;
        align-items: center;
    }
    .btn--close {
        font-size: 18px;

        position: absolute;
        top: 35px;
        right: 0;

        display: flex;

        width: 40px;
        height: 40px;

        cursor: pointer;

        align-items: center;
        justify-content: center;
    }
    .module-container {
        position: relative;
        .bg {
            position: absolute;
            top: 0;
            right: 0;

            width: 50%;
            height: 100%;

            background-color: #fff;
        }
    }
    .module-title {
        font-size: 22px;
        font-weight: 700;
        line-height: em(33px, 22px);

        margin-bottom: 9px;
    }
    .module-body {
        position: relative;
        z-index: 10;

        margin-top: 55px;
        &:not([data-has-lang]) {
            .select-group {
                &:first-child {
                    margin-right: 0;
                }
            }
        }
    }
    .module-footer {
        margin-top: 80px;
    }
    .tip {
        font-size: 13px;
        line-height: 20px;

        color: var(--t-c-lighter);
    }
    .select-group {
        font-size: 13px;
        line-height: em(20px, 13px);

        position: relative;

        flex: 1 1 auto;

        width: 50%;
        &:first-child {
            margin-right: 100px;
        }
        :global(.ic) {
            display: inline-block;

            transition: 0.26s ease;
        }
        &[data-active] {
            :global(.ic) {
                transform: rotate(-180deg);
            }
            .select-options {
                top: calc(100% + 26px);

                visibility: visible;

                opacity: 1;
            }
        }
    }
    .select-value {
        padding: 10px 0;

        cursor: pointer;

        border-bottom: 1px solid #000;
    }
    .select-options {
        position: absolute;
        top: calc(100% + 46px);
        left: 0;

        visibility: hidden;

        width: 100%;
        padding-bottom: 20px;

        transition: 0.26s ease;

        opacity: 0;
        background-color: #fff;
    }
    .select-option {
        @include space-between(16px, "y");

        width: 100%;

        cursor: pointer;
        transition: 0.26s ease;

        color: #808389;
        &:hover {
            color: var(--t-c-default);
        }
    }
    .btn--confirm {
        font-weight: 500;

        padding: 10px 32px;

        cursor: pointer;
        transition: 0.26s ease;

        border-radius: 20px;
        background: rgb(217 217 217 / 0.3);
        &:hover {
            color: #fff;
            background-color: $green-4;
        }
    }
}
</style>
