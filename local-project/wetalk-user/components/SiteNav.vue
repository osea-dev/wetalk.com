<template>
    <section :class="$style['w-nav']">
        <div class="wrapper--limit-width">
            <div :class="$style['module-body']" class="relative">
                <div class="state-pos--left" :class="$style['left-area']">
                    <Link
                        :to="linkManage.index"
                        :class="$style['w-logo']"
                        class="flex items-center justify-center"
                    >
                        <h1 class="hide">wetalk</h1>
                        <img
                            class="hide"
                            src="@/assets/images/logo.png"
                            alt=""
                        />
                        <i class="ic color-iconfont color-icon-logo"></i>
                    </Link>
                </div>
                <div class="state-pos--center" :class="$style['center-area']">
                    <div
                        class="wrapper--limit-width-mini"
                        :class="$style['wrapper--site-nav']"
                    >
                        <div
                            :class="$style['nav-list']"
                            class="flex items-center"
                        >
                            <Link
                                v-for="(item, index) in siteNav"
                                :key="index"
                                :class="$style['nav-item']"
                                :data-is-home="
                                    localePath(item.link) ===
                                    localePath(linkManage.index)
                                "
                                :to="localePath(item.link)"
                            >
                                {{ $t(item.title) }}
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    class="state-pos--right flex justify-center"
                    :class="$style['right-area']"
                >
                    <div :class="$style['oper-btns']" class="flex items-center">
                        <a href="/" target="_blank" :class="$style['btn']">
                            <span class="text">{{
                                $t("KEY_BASE.BACK_WETALK_PAGE")
                            }}</span>
                        </a>
                        <div
                            :class="$style['lang-box']"
                            @click="openLangSwitch"
                        >
                            <div :class="$style['lang-btn']">
                                <i class="ic iconfont icon-earth-bold"></i>
                            </div>
                        </div>
                    </div>
                    <Link
                        :class="$style['msg']"
                        class="flex items-center justify-center"
                        :data-has-msg="siteStore.noticeState"
                        :to="linkManage.notice"
                    >
                        <i class="ic iconfont icon-bell"></i>
                    </Link>
                    <div v-if="userInfo" :class="$style['user']">
                        <UserAvatar :class="$style['user-avatar']" />
                        <div :class="$style['setting-group']">
                            <Link
                                :class="$style['group-btn']"
                                :to="linkManage.setting"
                            >
                                <i class="ic iconfont icon-pencil"></i>
                                <span class="text">{{
                                    $t("KEY_BASE.SETTING")
                                }}</span>
                            </Link>
                            <Link
                                :class="$style['group-btn']"
                                :to="linkManage.order"
                            >
                                <i class="ic iconfont icon-word"></i>
                                <span class="text">{{
                                    $t("KEY_BASE.ORDER")
                                }}</span>
                            </Link>
                            <button
                                :class="$style['group-btn']"
                                @click="logout"
                            >
                                <i class="ic iconfont icon-exit"></i>
                                <span class="text">{{
                                    $t("KEY_BASE.EXIT")
                                }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    :class="$style['btn--mini-nav']"
                    class="items-center justify-center hidden lg:flex"
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
    </section>
</template>
<script lang="ts">
import linkManage from "@/assets/script/local-data/link-manage";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useSiteStore } from "@/store/site";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import {
    postLogout,
    getMessageList,
    getCurrencyList,
} from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";
import { siteNavList } from "@/assets/script/local-data/site-nav-list";

export default defineComponent({
    setup() {
        const hasMsg = ref<boolean>(true);
        const siteStore = useSiteStore();
        function openLangSwitch() {
            siteStore.tabLangSwitch(true);
        }
        const userStore = useUserStore();
        const { userInfo } = storeToRefs(userStore);
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

        function openMiniNav() {
            siteStore.changeMinNavIsOpen();
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
            getMessageList({
                page: 1,
                pageSize: 12,
            }).then((res) => {
                siteStore.updateNoticeState(res.data.list[0]?.isRead === 0);
            });
        });

        return {
            logout,
            openMiniNav,
            openLangSwitch,
            siteStore,
            hasMsg,
            siteNav: siteNavList,
            linkManage,
            userInfo,
        };
    },
});
</script>
<style lang="scss" module>
.w-nav {
    position: sticky;
    z-index: $zindex-fixed;
    top: 0;
    left: 0;

    width: 100%;

    background-color: #fff;
    box-shadow: 0 0 30px 0 #{rgba(#000, 0.05)};
    .btn {
        display: inline-block;
    }
    .module-body {
        display: flex;

        height: var(--nav-h);

        align-items: center;
        justify-content: space-between;
    }
    .btn--mini-nav {
        position: absolute;
        z-index: 200;
        top: 50%;
        right: 0;

        width: 40px;
        height: 40px;
        margin-top: -20px;

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
            background-color: #777;

            justify-self: right;
            &:nth-child(2) {
                width: 80%;
            }
            &:nth-child(3) {
                width: 50%;
            }
        }
    }
}
.left-area {
    position: relative;
    z-index: 100;
    .w-logo {
        font-size: 32px;
    }
    @include media-breakpoint-down(lg) {
        display: flex;

        width: 100%;

        justify-content: center;
        .w-logo {
            font-size: 28px;
        }
    }
}
.center-area {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;

    display: flex;

    width: 100%;
    height: 100%;

    align-items: center;
    justify-content: center;
    .nav-list {
        color: #777;
    }
    .nav-item {
        @include space-between(50px);
        font-size: 15px;
        line-height: em(22px, 15px);

        position: relative;

        padding: em(10px, 15px) 0;

        transition: 0.26s ease;
        &:hover {
            color: #2d2b32;
        }
        &[data-is-home]:global(.nuxt-link-exact-active),
        &:not([data-is-home]):global(.nuxt-link-active) {
            color: #2d2b32;
            &::after {
                width: em(24px, 15px);

                opacity: 1;
            }
        }
        &::after {
            position: absolute;
            bottom: 0;
            left: 50%;

            width: em(10px, 15px);
            height: em(4px, 15px);

            content: "";
            transition: 0.26s ease;
            transform: translateX(-50%);

            opacity: 0;
            border-radius: 4px;
            background-color: #000;
        }
    }
    .wrapper--site-nav {
        max-width: calc(100% - 500px);
    }
    @include media-breakpoint-down(xl) {
        .nav-item {
            @include space-between(40px);
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(lg) {
        display: none;
    }
}
.right-area {
    font-size: 13px;

    position: relative;
    z-index: 100;
    .oper-btns {
        line-height: em(20px, 13px);

        color: #777;
        .btn {
            @include space-between(em(32px, 13px));
            transition: 0.26s ease;
            &:hover {
                color: #2d2b32;
            }
        }
    }
    .user {
        position: relative;
        &:hover {
            .setting-group {
                visibility: visible;

                opacity: 1;
            }
        }
        .user-avatar {
            width: em(50px, 13px);
        }
        .setting-group {
            position: absolute;
            top: 100%;
            right: 0;

            visibility: hidden;

            width: 280px;
            padding: 16px;

            transition: 0.26s ease;

            opacity: 0;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 40px 64px -12px rgb(0 0 0 / 0.08);
        }
        .group-btn {
            line-height: em(24px, 12px);

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
            :global(.ic) {
                font-size: 16px;

                margin-right: 12px;
            }
        }
    }
    .msg {
        font-size: em(20px, 13px);

        position: relative;

        width: em(42px, 20px);
        margin: 0 em(18px, 20px) 0 em(14px, 20px);

        cursor: pointer;
        transition: 0.26s ease;

        color: #b8c3d9;
        &[data-has-msg]::after {
            @include circle(10px, #ff334b);
            position: absolute;
            bottom: 50%;
            left: 50%;

            content: "";
            transform: translate3d(4px, -4px, 0);
        }
        &:hover {
            color: #2d2b32;
        }
    }
    // 语言
    .lang-btn {
        font-size: em(21px, 13px);

        padding: 0 6px;

        cursor: pointer;
        transition: 0.36s ease;

        color: #b8c3d9;
        &:hover {
            opacity: 1;
            color: #2d2b32;
        }
    }
    @include media-breakpoint-down(xl) {
        .oper-btns {
            font-size: 12px;
            .btn {
                @include space-between(em(22px, 12px));
            }
        }
        .msg {
            font-size: em(16px, 12px);

            margin: 0 em(14px, 26px) 0 em(10px, 26px);
        }
    }
    @include media-breakpoint-down(lg) {
        display: none;
    }
}
</style>
