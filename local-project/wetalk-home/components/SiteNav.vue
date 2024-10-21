<template>
    <div
        :class="$style['w-nav']"
        :data-theme="activeNav === 'index' ? 'white' : 'dark'"
    >
        <div class="wrapper--limit-width">
            <div
                :class="$style['module-body']"
                class="flex items-center justify-between lg:relative"
            >
                <div class="state-pos--left">
                    <Link
                        :to="linkManage.index"
                        :class="$style['w-logo']"
                        class="flex items-center justify-center"
                    >
                        <h1 class="hide">wetalk</h1>
                        <nuxt-img
                            class="hide"
                            src="@/assets/images/logo.png"
                            alt=""
                        />
                        <i
                            v-if="['index', 'effect'].includes(activeNav)"
                            class="ic iconfont icon-logo"
                        ></i>
                        <i v-else class="ic color-iconfont color-icon-logo"></i>
                    </Link>
                </div>
                <div class="state-pos--right flex items-center lg:hidden">
                    <SiteNavList
                        :active-nav="activeNav"
                        :theme="activeNav === 'index' ? 'white' : 'dark'"
                    />
                    <div
                        class="flex items-center"
                        :class="$style['site-tools-bar']"
                    >
                        <Link
                            :class="$style['search-box']"
                            :to="linkManage.search"
                        >
                            <div :class="$style['search-btn']">
                                <i class="ic iconfont icon-sosuo"></i>
                            </div>
                        </Link>
                        <i :class="$style['divide-line']"></i>
                        <div
                            :class="$style['lang-box']"
                            @click="openLangSwitch"
                        >
                            <div :class="$style['lang-btn']">
                                <i class="ic iconfont icon-diqiu"></i>
                            </div>
                        </div>
                    </div>
                    <template v-if="!userAvatar">
                        <Link
                            :class="$style['login-btn']"
                            class="flex items-center justify-center"
                            target="_blank"
                            :to="linkManage.login"
                        >
                            <span class="text">{{
                                $t("KEY_OTHER.LOGIN")
                            }}</span>
                        </Link>
                        <Link
                            :class="$style['register-btn']"
                            class="flex items-center justify-center"
                            target="_blank"
                            :to="linkManage.register"
                        >
                            <span class="text">{{
                                $t("KEY_OTHER.REGISTER")
                            }}</span>
                        </Link>
                    </template>
                    <div v-else :class="$style['user-avatar']">
                        <div :class="$style['user-avatar-image']">
                            <nuxt-img :src="userAvatar" alt="" />
                        </div>
                        <div :class="$style['user-oper-panel']">
                            <Link
                                :class="$style['oper-item']"
                                :to="linkManage.userIndex"
                                target="_blank"
                            >
                                <span class="text">{{
                                    $t("KEY_NAV.CENTER")
                                }}</span>
                            </Link>
                            <button
                                :class="$style['oper-item']"
                                @click="logout"
                            >
                                <span class="text">{{
                                    $t("KEY_NAV.EXIT")
                                }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div :class="$style['min-oper-bar']" class="hidden lg:flex">
                    <Link
                        :class="$style['min-search-box']"
                        class="flex justify-center items-center"
                        :to="linkManage.search"
                    >
                        <div :class="$style['min-search-btn']">
                            <i class="ic iconfont icon-sosuo"></i>
                        </div>
                    </Link>
                    <div
                        :class="$style['btn--mini-nav']"
                        class="items-center justify-center"
                        @click="openMiniNav"
                    >
                        <div :class="$style['btn-inner']">
                            <div :class="$style['line']"></div>
                            <div :class="$style['line']"></div>
                            <div :class="$style['line']"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext, useRoute } from "@nuxtjs/composition-api";
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useSiteStore } from "@/store/site";
import { useUserStore } from "@/store/user";
import {
    postLogout,
    getStudentInfo,
    getCurrencyList,
} from "@/assets/script/api/api";
import linkManage from "@/assets/script/local-data/link-manage";
import SiteNavList from "./SiteNavList.vue";

const route = useRoute();

const { app } = useContext();

const activeNav = computed(() => {
    let result = "";

    Object.entries(linkManage).some(([key, val]) => {
        if (app.localePath(val) === route.value.path) {
            result = key;
        }
    });

    return result;
});

// #region 导航尺寸变化
const navSizeState = ref("normal");
function setNavSizeState() {
    const scrollH = window.scrollY;
    if ($(".w-page").attr("data-page-type") === "IndexPage") return;
    if (scrollH > 10) {
        if (navSizeState.value !== "mini") {
            navSizeState.value = "mini";
            $("body").attr("data-nav-size", navSizeState.value);
        }
    } else if (navSizeState.value !== "normal") {
        navSizeState.value = "normal";
        $("body").attr("data-nav-size", navSizeState.value);
    }
}

const siteStore = useSiteStore();
const userStore = useUserStore();
function openLangSwitch() {
    siteStore.tabLangSwitch(true);
}

const userAvatar = computed(() => {
    return userStore.userInfo?.headImg || "";
});

function updateUserInfo() {
    if (!$cookies.get("UserToken")) return;
    getStudentInfo().then((res) => {
        if (res.statusCode === 0) {
            userStore.updateUserInfo(res.data);
            $(document).off("visibilitychange.userInfo");
        }
    });
}

function openMiniNav() {
    siteStore.changeMinNavIsOpen();
}
const { $cookies } = useContext();
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

watch(
    () => siteStore.lang,
    () => {
        getCurrencyList().then((res) => {
            if (res.statusCode === 0) {
                siteStore.updateCurrencyList(res.data);
            }
        });
    }
);
onMounted(() => {
    setNavSizeState();
    $(window)
        .off("scroll.controlNavSize")
        .on("scroll.controlNavSize", setNavSizeState);
    updateUserInfo();
    // TODO 检查并尝试有无更好的方法
    if (!userStore.userInfo) {
        $(document)
            .off("visibilitychange.userInfo")
            .on("visibilitychange.userInfo", () => {
                if (document.visibilityState === "visible") {
                    updateUserInfo();
                }
            });
    }
});
onBeforeUnmount(() => {
    $("body").attr("data-nav-size", "normal");
    $(document).off("visibilitychange.userInfo");
});
</script>
<style lang="scss" module>
.w-nav {
    font-family: var(--SourceHanSerif);
    font-size: var(--t-s-default);
    font-weight: 700;

    position: fixed;
    z-index: $zindex-sticky;
    top: 0;
    left: 0;

    width: 100%;
    // min-width: map-get($map: $grid-breakpoints, $key: xl);

    transition: 0.26s ease;
    transition-property: color, margin-top;

    box-shadow: 0 0 10px 0 #{rgba(#000, 0)};
    .w-logo {
        font-size: em(42px, $t-s-default);
        font-weight: normal;
        line-height: 1;

        // height: em(42px, $t-s-default);

        transition: 0.26s ease;
        vertical-align: top;
    }
    .module-body {
        height: var(--nav-h);

        transition: height 0.26s ease;
    }
    /* #region 导航上工具条  */
    .site-tools-bar {
        font-size: 18px;
        font-weight: normal;
        line-height: 1;

        margin-left: 60px;

        vertical-align: middle;
        .divide-line {
            width: 1px;
            height: 10px;
            margin: 0 em(15px, 14px);

            background-color: var(--l-c-divide);
        }
        .ic {
            display: block;

            color: #a4acb2;
        }
    }
    // 搜索
    .search-btn {
        font-size: 16px;

        padding: 7px 6px 6px;

        cursor: pointer;
        transition: 0.36s ease;

        opacity: 0.5;
        color: var(--t-c-lighter);
        &:hover {
            opacity: 1;
            color: var(--t-c-default);
        }
    }
    // 语言
    .lang-btn {
        padding: 6px;

        cursor: pointer;
        transition: 0.36s ease;

        opacity: 0.5;
        color: var(--t-c-lighter);
        &:hover {
            opacity: 1;
            color: var(--t-c-default);
        }
    }
    /* #endregion */

    // 登录按钮
    .register-btn,
    .login-btn {
        font-family: var(--SourceHanSans);
        font-size: 14px;
        font-weight: 400;
        line-height: em(22px, 14px);

        height: em(36px, 14px);
        margin-left: 20px;
        padding: 0 em(22px, 14px);

        transition: 0.36s ease;

        color: var(--t-c-lighter);
        border: 2px solid #888;
        border-radius: math.div(em(36px, 14px), 2);
        &:hover {
            color: var(--t-c-default);
            border-color: var(--t-c-default);
        }
        .text {
            line-height: 1;

            display: block;

            transform: translateY(-0.1em);
        }
    }
    .login-btn {
        padding: 0 em(14px, 14px);

        border-width: 0 !important;
    }
    .register-btn {
        margin-left: 10px;

        border: 2px solid #888;
    }
    .user-avatar {
        position: relative;

        margin-left: em(15px, 14px);

        cursor: pointer;
        &:hover {
            .user-oper-panel {
                top: calc(100% + 10px);

                visibility: visible;

                opacity: 1;
            }
        }
        .user-oper-panel {
            position: absolute;
            top: calc(100% + 30px);
            right: 0;

            visibility: hidden;

            width: 190px;
            padding: 16px;

            transition: 0.26s ease;

            opacity: 0;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 40px 64px -12px rgb(0 0 0 / 8%);
            &::after {
                position: absolute;
                bottom: 100%;
                left: 0;

                width: 100%;
                height: 10px;

                content: "";
            }
        }
        .oper-item {
            line-height: 1.6em;

            display: block;

            width: 100%;
            padding: 12px;

            transition: 0.26s ease;
            text-align: left;

            color: #777;
            border-radius: 8px;
            &:hover {
                color: #2d2b32;
                background: #f5f6f9;
            }
        }
    }
    .user-avatar-image {
        @include circle(37px);
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;

            object-fit: cover;
        }
    }
    .min-oper-bar {
        position: absolute;
        z-index: 200;
        top: 0;
        right: 0;

        height: 100%;

        color: var(--t-c-lighter);

        align-items: center;
    }
    .min-search-box {
        width: 40px;
        height: 40px;
        margin-right: 20px;
    }
    .btn--mini-nav {
        z-index: 200;

        display: flex;

        width: 40px;
        height: 40px;

        cursor: pointer;
        &:hover {
            .line {
                width: 100% !important;

                background-color: #000;
            }
        }
        .btn-inner {
            display: grid;

            width: 54%;

            gap: 4px;
        }
        .line {
            width: 100%;
            height: 2px;

            transition: 0.26s ease;

            border-radius: 4px;
            background-color: var(--t-c-lighter);

            justify-self: right;
            &:nth-child(2) {
                width: 80%;
            }
            &:nth-child(3) {
                width: 50%;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .w-logo {
            font-size: 39px;
        }
        .site-tools-bar {
            font-size: 17px;

            margin-left: 40px;
            .divide-line {
                margin: 0 em(8px, 14px);
            }
        }
        .register-btn,
        .login-btn {
            font-size: 13px;
        }
        .login-btn {
            margin-left: 8px;
        }
    }
    @include media-breakpoint-down(xl) {
        .site-tools-bar {
            font-size: 14px;

            margin-right: 2px;
            margin-left: 25px;
            .divide-line {
                margin: 0 6px;
            }
        }
        .search-btn {
            font-size: 13px;
        }
        .register-btn,
        .login-btn {
            font-size: 12px;

            margin-left: 0;
        }
        .register-btn {
            margin-right: -1em;
            padding: 0 0.4em;
            padding-right: 0;

            border-width: 0;
        }
        .user-avatar {
            margin-left: em(10px, 14px);
        }
        .user-avatar-image {
            @include circle(32px);
        }
    }
    @include media-breakpoint-down(sm) {
        .w-logo {
            font-size: 34px;
        }
    }
}
.w-nav[data-theme="white"] {
    .w-logo {
        color: #fff;
    }
    .search-btn {
        opacity: 1;
        color: #fff;
        &:hover {
            color: #fff;
        }
    }
    // 语言
    .lang-btn {
        opacity: 1;
        color: #fff;
        &:hover {
            color: #fff;
        }
    }
    // 登录按钮
    .register-btn,
    .login-btn {
        color: #fff;
        border: 2px solid #fff;
        &:hover {
            color: #fff;
            border-color: #fff;
        }
    }
    .min-oper-bar {
        color: #fff;
    }
    .btn--mini-nav {
        .line {
            background-color: #fff !important;
        }
    }
    @include media-breakpoint-down(xl) {
        // 登录按钮
        .register-btn,
        .login-btn {
            border-width: 0;
        }
    }
}
body[data-nav-size="mini"] {
    .w-nav {
        background-color: #fff;
        box-shadow: 0 0 10px 0 #{rgba(#000, 0.1)};
        .w-logo {
            font-size: em(32px, $t-s-default);
        }
        .site-tools-bar {
            // font-size: 16px;
        }
        .search-btn {
            font-size: 14px;
        }
        .register-btn,
        .login-btn {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(xl) {
        .w-nav {
            .w-logo {
                font-size: em(30px, $t-s-default);
            }
            .search-btn {
                font-size: 14px;
            }
            .register-btn,
            .login-btn {
                font-size: 12px;

                margin-left: 0;
                padding: 0 0.5em;
            }
            .register-btn {
                margin-right: -1em;

                border-width: 0;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .w-nav {
            .w-logo {
                font-size: 28px;
            }
        }
    }
}
:global(.lang-en) {
    .w-nav {
        .site-tools-bar {
            margin-left: 40px;
        }
        .login-btn {
            margin-left: 20px;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .w-nav {
            .site-tools-bar {
                font-size: 15px;

                margin-left: 30px;
                .divide-line {
                    margin: 0 em(13px, 14px);
                }
            }
            .search-btn {
                font-size: 14px;
            }
            .login-btn {
                margin-left: 15px;
            }
            .register-btn,
            .login-btn {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .w-nav {
            .w-logo {
                font-size: 34px;
            }
            .site-tools-bar {
                font-size: 14px;

                margin-left: 25px;
                .divide-line {
                    margin: 0 em(10px, 14px);
                }
            }
            .search-btn {
                font-size: 13px;
            }
            .login-btn {
                margin-left: 10px;
            }
            .register-btn,
            .login-btn {
                font-size: 12px;

                padding: 0 em(18px, 14px);
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .w-nav {
            .w-logo {
                font-size: 28px;
            }
            .divide-line {
                height: 8px;
            }
            .site-tools-bar {
                font-size: 13px;
            }
            .search-btn {
                font-size: 10px;
            }
            .login-btn {
                margin-left: 0;
            }
            .register-btn,
            .login-btn {
                padding: 0 em(12px, 14px);
            }
        }
    }
}
/* stylelint-disable-next-line no-duplicate-selectors */
body[data-nav-size="mini"] {
    :global(.lang-en) {
        @include media-breakpoint-down(xxl) {
            .w-nav {
                .w-logo {
                    font-size: 34px;
                }
                .site-tools-bar {
                    font-size: 14px;

                    margin-left: 25px;
                }
                .search-btn {
                    font-size: 13px;
                }
                .login-btn {
                    margin-left: 5px;
                }
                .register-btn,
                .login-btn {
                    font-size: 12px;

                    padding: 0 em(18px, 14px);
                }
            }
        }
        @include media-breakpoint-down(xl) {
            .w-nav {
                .w-logo {
                    font-size: 26px;
                }
                .site-tools-bar {
                    font-size: 13px;

                    margin-left: 20px;
                }
                .search-btn {
                    font-size: 10px;
                }
                .login-btn {
                    margin-left: 0;
                }
                .register-btn,
                .login-btn {
                    font-size: 6px;

                    padding: 0 em(18px, 14px);
                }
                .register-btn {
                    padding-right: 0;
                }
            }
        }
    }
}
</style>
