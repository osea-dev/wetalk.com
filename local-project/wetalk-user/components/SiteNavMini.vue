<template>
    <PublicSmartScrollBox
        ref="siteNavMini"
        :class="$style['site-nav--mini']"
        class="justify-end hidden"
    >
        <div
            ref="mask"
            :class="$style['mask']"
            @click.self="changeNavState(false)"
        ></div>
        <div ref="navWrapper" :class="$style['wrapper--site-nav']">
            <div
                :class="$style['panel-head']"
                class="flex justify-between items-center"
            >
                <UserAvatar :class="$style['user-avatar']" />
                <div
                    :class="$style['btn--close']"
                    @click="changeNavState(false)"
                >
                    <i class="ic iconfont icon-close"></i>
                </div>
            </div>
            <div :class="$style['inner']" class="scroll-container">
                <div :class="$style['nav-list']">
                    <Link
                        v-for="(item, index) in siteNavList"
                        :key="index"
                        :class="$style['nav-item']"
                        class="block"
                        :data-is-home="
                            localePath(item.link) ===
                            localePath(linkManage.index)
                        "
                        :to="localePath(item.link)"
                    >
                        <span class="text">{{ $t(item.title) }}</span>
                    </Link>
                    <Link
                        :class="$style['nav-item']"
                        class="block"
                        :to="linkManage.order"
                    >
                        <span class="text">{{ $t("KEY_NAV.MY_ORDER") }}</span>
                    </Link>
                    <Link
                        :class="$style['nav-item']"
                        class="block"
                        :to="linkManage.notice"
                        :data-has-msg="siteStore.noticeState"
                    >
                        <span class="text">{{ $t("KEY_NAV.MY_MSG") }}</span>
                    </Link>
                    <Link
                        :class="$style['nav-item']"
                        class="block"
                        :to="linkManage.setting"
                    >
                        <span class="text">{{ $t("KEY_NAV.MY_SETTING") }}</span>
                    </Link>
                    <a
                        href="/"
                        target="_blank"
                        :class="$style['nav-item']"
                        class="block"
                    >
                        <span class="text">{{
                            $t("KEY_BASE.BACK_WETALK_PAGE")
                        }}</span>
                    </a>
                </div>
            </div>

            <div :class="$style['mini-nav-footer']">
                <div
                    :class="$style['switch-bar']"
                    :data-has-lang="langLength > 1"
                >
                    <div :class="$style['currency-switch']">
                        <select v-model="selectCurrency">
                            <option
                                v-for="(op, index) in currencyList"
                                :key="index"
                                :value="op.currencyCode"
                            >
                                {{ op.currency }}
                            </option>
                        </select>
                    </div>
                    <div v-if="langLength > 1" :class="$style['lang-switch']">
                        <select v-model="selectLang">
                            <option
                                v-for="(op, index) in langList"
                                :key="index"
                                :value="op.lang"
                            >
                                {{ op.title }}
                            </option>
                        </select>
                    </div>
                </div>
                <button :class="$style['btn--logout']" @click="logout">
                    <span class="text">{{ $t("KEY_BASE.EXIT") }}</span>
                    <i class="ic iconfont icon-exit"></i>
                </button>
            </div>
        </div>
    </PublicSmartScrollBox>
</template>
<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useSiteStore } from "@/store/site";
import SmartScrollBox from "@/components/public/SmartScrollBox.vue";
import { siteNavList } from "@/assets/script/local-data/site-nav-list";
import linkManage from "~/assets/script/local-data/link-manage";
import { useContext, useRoute } from "@nuxtjs/composition-api";
import { postLogout } from "@/assets/script/api/api";

const siteStore = useSiteStore();
const siteNavMini = ref<InstanceType<typeof SmartScrollBox>>();
const mask = ref<HTMLElement>();
const navWrapper = ref<HTMLElement>();
const route = useRoute();

watch(
    () => siteStore.minNavIsOpen,
    (isOpen) => {
        isOpen ? open() : close();
    }
);

watch(
    () => route.value.fullPath,
    () => {
        siteStore.changeMinNavIsOpen(false);
    }
);

function open() {
    if (!siteNavMini.value?.container) return;
    const containerDom = siteNavMini.value.container;
    gsap.timeline({
        onStart() {
            gsap.set(containerDom, { display: "flex" });
            gsap.set(navWrapper.value!, { x: "100%" });
        },
    })
        .to(mask.value!, { opacity: 1, duration: 0.6 })
        .to(
            navWrapper.value!,
            { x: 0, ease: "better-elastic", duration: 0.6 },
            0
        );
}

function close() {
    if (!siteNavMini.value?.container) return;
    const containerDom = siteNavMini.value.container;
    gsap.timeline({
        onComplete() {
            gsap.set(containerDom, { display: "" });
            gsap.set(navWrapper.value!, { x: "100%" });
        },
    })
        .to(mask.value!, { opacity: 0, duration: 0.6 })
        .to(
            navWrapper.value!,
            { x: "100%", ease: "better-elastic", duration: 0.6 },
            0
        );
}

const { $cookies, i18n } = useContext();
function logout() {
    postLogout()
        .then(() => {
            console.log("console", "removeToken");
            $cookies.remove("UserToken");
        })
        .then(() => {
            window.location.reload();
        });
}

function changeNavState(isOpen: boolean) {
    siteStore.changeMinNavIsOpen(isOpen);
}

onBeforeUnmount(() => {
    changeNavState(false);
});

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

const currencyList = computed(() => {
    return siteStore.currencyList;
});
const langList = computed(() => {
    return siteStore.langList;
});

watch(selectCurrency, (currency) => {
    siteStore.updateCurrency(currency);
    $cookies.set("CurrencyCode", currency, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    siteStore.changeMinNavIsOpen(false);
});

watch(selectLang, (lang) => {
    i18n.setLocale(lang);
});
</script>
<style lang="scss" module>
.site-nav--mini {
    position: fixed;
    z-index: $zindex-fixed;
    top: 0;
    left: 0;

    overflow: hidden;

    width: 100vw;
    height: calc(var(--screen-h) * 100);
    .mask {
        @include ab-cover;
        opacity: 0;
        background-color: rgb(0 0 0 / 0.3);
    }
}
.wrapper--site-nav {
    position: relative;
    z-index: 10;

    width: 390px;
    max-width: 100vw;

    background-color: #fff;
    .user-avatar {
        width: 36px;

        box-shadow: 0 0 40px rgb(0 0 0 / 5%);
    }
    .panel-head {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;

        width: 100%;
        height: 70px;
        padding: 24px 10%;

        background-color: #fff;
    }
    .btn--close {
        @include flex(c, c);
        font-size: 18px;

        width: 40px;
        height: 40px;

        cursor: pointer;
    }
    .inner {
        overflow: auto;

        height: w-h(100);
        padding-top: 70px;
        padding-bottom: calc(170px + 10px);
        padding-bottom: calc(170px + env(safe-area-inset-bottom) + 10px);
        padding-bottom: calc(170px + constant(safe-area-inset-bottom) + 10px);

        overscroll-behavior: none;
    }
    .nav-list {
        font-size: 16px;
        line-height: em(24px, 16px);
    }
    .nav-item {
        width: 100%;
        padding: 18px 10%;

        transition: 0.26s ease;
        text-align: center;

        color: #666;
        &:hover {
            color: #2d2b32;
        }
        &[data-is-home]:global(.nuxt-link-exact-active),
        &:not([data-is-home]):global(.nuxt-link-active) {
            color: #333;
            :global(.text) {
                &::after {
                    width: 30px;

                    opacity: 1;
                }
            }
        }
        &[data-has-msg] :global(.text)::before {
            @include circle(10px, #ff334b);
            position: absolute;
            top: 0%;
            right: 0%;

            content: "";
            transform: translate3d(8px, -2px, 0);
        }
        :global(.text) {
            position: relative;

            display: inline-block;
            &::after {
                position: absolute;
                bottom: -10px;
                left: 50%;

                width: 0;
                height: em(3px, 15px);

                content: "";
                transition: 0.26s ease;
                transform: translateX(-50%);

                opacity: 0;
                border-radius: 4px;
                background-color: #000;
            }
        }
    }
}
.mini-nav-footer {
    font-family: var(--SourceHanSans);

    position: absolute;
    bottom: 10px;
    bottom: calc(constant(safe-area-inset-bottom) + 10px);
    bottom: calc(env(safe-area-inset-bottom) + 10px);

    width: 100%;
    padding: 30px min(40px, 10%);

    background-color: #fff;
}
.switch-bar {
    &[data-has-lang] {
        display: grid;

        gap: 0 18px;
        grid-template-columns: 1fr 1fr;
    }
}
.btn--logout {
    font-size: 16px;
    line-height: em(42px, 16px);

    width: 100%;
    margin-top: 18px;

    text-align: center;

    color: #666;
    border: 2px solid #888;
    border-radius: 23px;
}
</style>
