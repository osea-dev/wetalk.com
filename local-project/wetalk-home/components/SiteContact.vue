<template>
    <div ref="contactModule" class="w-contact w-module">
        <div class="wrapper--limit-width">
            <div class="module-body flex justify-between lg:block">
                <div
                    class="state-pos--left w-1/2 lg:w-full lg:flex lg:justify-between lg:items-center md:block"
                >
                    <Link :to="linkManage.index" class="w-logo">
                        <h1 class="hide">wetalk</h1>
                        <i class="ic color-iconfont color-icon-logo"></i>
                    </Link>
                    <div class="social-list flex">
                        <template v-for="(item, index) in contactSocial">
                            <div
                                v-if="item.image"
                                :key="'link-' + index"
                                class="social-item flex items-center justify-center"
                                @click="openImg(item.image)"
                            >
                                <i class="ic" :class="item.icon"></i>
                                <div class="img-box">
                                    <img :src="item.image" alt="" />
                                </div>
                            </div>
                            <a
                                v-else
                                :key="'no-link-' + index"
                                class="social-item flex items-center justify-center"
                                :href="item.link"
                                target="_blank"
                            >
                                <i class="ic" :class="item.icon"></i>
                            </a>
                        </template>
                    </div>
                </div>
                <div class="state-pos--right w-1/2 lg:w-full">
                    <div class="info-group">
                        <div class="swiper">
                            <div class="swiper-wrapper">
                                <div
                                    v-for="(item, index) in contactInfo"
                                    :key="index"
                                    class="swiper-slide"
                                >
                                    <div class="info-title">
                                        <span class="text">
                                            {{ $t(item.title) }}</span
                                        >
                                    </div>
                                    <div class="info-detail">
                                        <div class="info-detail-item">
                                            <span class="text name"
                                                >{{
                                                    $t("KEY_OTHER.ADDRESS")
                                                }}：</span
                                            >
                                            <span class="text detail">{{
                                                $t(item.address)
                                            }}</span>
                                        </div>
                                        <div class="info-detail-item">
                                            <span class="text name"
                                                >{{
                                                    $t("KEY_OTHER.TEL")
                                                }}：</span
                                            >
                                            <span class="text value">{{
                                                item.tel
                                            }}</span>
                                        </div>
                                        <div class="info-detail-item">
                                            <span class="text name"
                                                >{{
                                                    $t("KEY_OTHER.EMail")
                                                }}：</span
                                            >
                                            <span class="text value">{{
                                                $t(item.email)
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ref="swiperTab" class="swiper-tab flex">
                            <div class="tab-btn state-active"></div>
                            <div class="tab-btn"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";
import { useSiteStore } from "@/store/site";

import { onMounted, ref, onBeforeUnmount } from "vue";

const siteStore = useSiteStore();
const contactSocial = [
    {
        type: "facebook",
        icon: "iconfont icon-facebook",
        link: "https://www.facebook.com/wetalkglobalofficial",
    },
    {
        type: "douyin",
        icon: "iconfont icon-douyin",
        link: "https://www.douyin.com/user/MS4wLjABAAAAAKrzvDAqspsO8Pu1vmW-yrTw9E-QZxn0wKpQ6ozxchH9xeGWS2QImla6z_CfBhLQ",
    },
    {
        type: "whatsapp",
        icon: "iconfont icon-whatsapp",
        image: require("@/assets/images/whatsapp.png"),
    },
    {
        type: "weixin",
        icon: "iconfont icon-weixin",
        image: require("@/assets/images/weixin-code.png"),
    },
    {
        type: "xiaohongshu",
        icon: "iconfont icon-xiaohongshu",
        link: "https://www.xiaohongshu.com/user/profile/6371db16000000001f017676?xhsshare=WeixinSession&appuid=5ecb6f4600000000010058c4&apptime=1676002366",
    },
];
const contactInfo = [
    {
        title: "KEY_ADDRESS[0].TITLE",
        key: "KEY_ADDRESS[0].KEY",
        address: "KEY_ADDRESS[0].ADDRESS",
        tel: "+65 9758 2288",
        email: "service@wetalk.com",
    },
    {
        title: "KEY_ADDRESS[1].TITLE",
        key: "KEY_ADDRESS[1].KEY",
        address: "KEY_ADDRESS[1].ADDRESS",
        tel: "+86 18165370116",
        email: "service@wetalk.com",
    },
    {
        title: "KEY_ADDRESS[2].TITLE",
        key: "KEY_ADDRESS[2].KEY",
        address: "KEY_ADDRESS[2].ADDRESS",
        tel: "+63 9171681680",
        email: "service@wetalk.com",
    },
    {
        title: "KEY_ADDRESS[3].TITLE",
        key: "KEY_ADDRESS[3].KEY",
        address: "KEY_ADDRESS[3].ADDRESS",
        tel: "+886 227518111",
        email: "service@wetalk.com",
    },
];

const contactModule = ref<HTMLElement | null>();
const { $Swiper, i18n } = useContext();
const swiperTab = ref<HTMLElement | null>(null);

const { $dialog } = useContext();
function openImg(img: string) {
    if (siteStore.device === "mo") {
        $dialog({
            type: "image",
            src: img,
        });
    }
}

onMounted(() => {
    const swiper = new $Swiper($(contactModule.value!).find(".swiper")[0], {
        slidesPerView: 1,
        effect: "creative",
        grabCursor: true,
        loop: true,
        watchSlidesProgress: true,
        updateOnWindowResize: true,
        creativeEffect: {
            perspective: true,
            limitProgress: 1,
            shadowPerProgress: true,
            prev: {
                translate: ["0%", 0, -200],
                opacity: 0,
            },
            next: {
                translate: ["100%", 0, 0],
                opacity: 1,
            },
        },
        speed: 500,
        observer: true,
        observeParents: true,
        pagination: {
            el: swiperTab.value!,
            type: "bullets",
            renderBullet(index, className) {
                return `<div data-index="${index}" class="${className}">
                            <span class="text">${i18n.t(
                                contactInfo[index].key
                            )}</span>
                        </div>`;
            },
            bulletActiveClass: "state-active",
            bulletClass: "tab-btn",
            bulletElement: "div",
            clickable: true,
        },
        autoHeight: true,
        breakpoints: {
            576: {
                autoHeight: false,
            },
        },
    });
    onBeforeUnmount(() => {
        swiper.destroy();
    });
});
</script>
<style lang="scss">
/* ---------------------------------- */
/*                联系我们                */
/* ---------------------------------- */
.w-contact {
    padding-top: 86px;

    background-color: #fff;
    .module-body {
        padding-bottom: 102px;

        border-bottom: 1px solid #e9e8ed;
    }
    .state-pos--left {
        padding-top: 14px;
    }
    .w-logo {
        font-size: 42px;

        margin-bottom: 47px;

        vertical-align: top;

        color: #393939;
    }
    /* 社交分享 */
    .social-item {
        @include circle(48px);
        @include space-between(16px);
        font-size: 14px;

        position: relative;

        transition: 0.26s ease;

        color: #5a585b;
        background-color: #f5f9fc;
        &:hover {
            z-index: 1000;

            color: #fff;
            background-color: #d81316;
            .img-box {
                top: calc(100% + 12px);

                visibility: visible;

                margin-bottom: 0;

                opacity: 1;
            }
        }
        .img-box {
            @include square(120px);
            position: absolute;
            top: calc(100% + 22px);
            left: 50%;

            visibility: hidden;

            transition: 0.26s ease;
            transform: translateX(-50%);

            opacity: 0;

            filter: drop-shadow(0 20px 40px rgb(56 49 71 / 0.12));
            img {
                overflow: hidden;

                border-radius: 10px;
            }
            &::before {
                @include move-center;
                display: block;

                width: 200px;
                height: 100%;

                content: "";
            }
            &::after {
                @include triangle("t", 20px, 9px, #fff);
                position: absolute;
                bottom: 100%;
                left: 50%;

                margin-left: -10px;

                content: "";
            }
        }
    }

    /* 公司信息 */
    .swiper {
        font-size: var(--t-s-default);

        width: 100%;
    }
    .swiper-tab {
        margin-top: 26px;
        .tab-btn {
            @include space-between(em(24px, $t-s-default));
            position: relative;

            cursor: pointer;
            transition: 0.26s ease;

            color: var(--t-c-lighter);
            &:hover {
                color: var(--t-c-default);
            }
            &.state-active {
                color: var(--t-c-default);
                &::after {
                    width: em(16px, $t-s-default);

                    opacity: 1;
                }
            }
            span {
                display: inline-block;

                vertical-align: middle;
            }
            &::after {
                position: absolute;
                top: calc(100% + 2px);
                left: 50%;

                width: 10px;
                height: 3px;

                content: "";
                transition: 0.36s ease;
                transform: translateX(-50%);

                opacity: 0;
                border-radius: 4px;
                background-color: #000;
            }
        }
    }
    .info-group {
        padding-left: em(17px, $t-s-default);
    }
    .info-title {
        font-size: em(18px, $t-s-default);
        font-weight: 700;

        margin-bottom: em(31px, 18px);

        color: var(--t-c-default);
    }
    .info-detail {
        font-size: em(14px, $t-s-default);
        line-height: em(40px, 14px);

        color: var(--t-c-default);
        .name {
            color: var(--t-c-lighter);
        }
    }
    @include media-breakpoint-down(xl) {
        .w-logo {
            font-size: 38px;

            margin-top: 0;
            margin-bottom: 38px;
        }
        .state-pos--left {
            padding-top: 0;
        }
        .social-item {
            @include circle(42px);
            @include space-between(13px);
            font-size: 13px;
        }
        .info-title {
            margin-bottom: 22px;
        }
        .info-detail {
            font-size: 12px;
            line-height: em(30px, 14px);
            .info-detail-item {
                display: flex;

                margin-bottom: 10px;
                .name {
                    flex: 0 0 auto;

                    min-width: 3em;
                }
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        .info-group {
            padding: 0;
        }
        .swiper-tab {
            font-size: 13px;

            margin-top: 22px;
        }
        .state-pos--right {
            padding-top: 14px;
        }
    }
    @include media-breakpoint-down(lg) {
        .w-logo {
            margin-bottom: 0;
        }
        .module-body {
            padding-bottom: 60px;
        }
        .state-pos--right {
            padding-top: 50px;
        }
        .social-item:last-child .img-box {
            right: 0;
            left: auto;

            transform: translateX(0);
        }
    }
    @include media-breakpoint-down(md) {
        .w-logo {
            margin-bottom: 30px;
        }
        .social-item:last-child .img-box {
            right: auto;
            left: 50%;

            transform: translateX(-50%);
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 40px;
        .info-detail {
            font-size: 14px;
        }
        .state-pos--right {
            padding-top: 40px;
        }
        .swiper-tab {
            margin-top: 40px;
        }
        .social-item {
            font-size: 16px;
        }
    }
}
body[data-is-mobile="1"] .w-contact {
    .img-box {
        display: none !important;
    }
}
.lang-en {
    @include media-breakpoint-down(xl) {
        /* stylelint-disable-next-line selector-max-compound-selectors */
        .w-contact .info-detail .info-detail-item .name {
            min-width: 5em;
        }
    }
}
</style>
