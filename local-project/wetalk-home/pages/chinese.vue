<!--
 * @Description: 众语集详情页 VUE 容器
 * @Author: F-Stone
 * @LastEditTime: 2023-03-24 18:02:31
-->
<template>
    <main class="w-body w-module" :class="$style['chinese-body']">
        <div class="p-module" :class="$style['banner-module']">
            <div :class="$style['module-bg']"></div>
            <div class="wrapper--limit-width relative z-10">
                <div
                    :class="$style['module-header']"
                    class="text-center wow-group-2"
                >
                    <h1
                        :class="$style['module-title']"
                        class="wow animate__fadeInUp-50"
                    >
                        {{ $t("KEY_PAGE_CHINESE.BANNER.TITLE") }}
                    </h1>
                    <p
                        :class="$style['module-desc']"
                        class="wow animate__fadeInUp-50"
                    >
                        {{ $t("KEY_PAGE_CHINESE.BANNER.DESC") }}
                    </p>
                </div>
                <div :class="$style['module-body']">
                    <div :class="$style['main-box']">
                        <div
                            :class="$style['img-box']"
                            class="wow animate__fadeInUp-50 animation-delay-3"
                        >
                            <nuxt-img
                                src="@/assets/images/chinese/banner.png"
                                alt=""
                            />
                        </div>
                        <div :class="$style['people-box']">
                            <div
                                :class="$style['people-item']"
                                class="wow animate__fadeInUp-30_percent animation-delay-2"
                            >
                                <nuxt-img
                                    src="@/assets/images/chinese/banner-p-1.png"
                                    alt=""
                                />
                            </div>
                            <div
                                :class="$style['people-item']"
                                class="wow animate__fadeInUp-30_percent animation-delay-3"
                            >
                                <nuxt-img
                                    src="@/assets/images/chinese/banner-p-2.png"
                                    alt=""
                                />
                            </div>
                            <div
                                :class="$style['people-item']"
                                class="wow animate__fadeInUp-30_percent animation-delay-4"
                            >
                                <nuxt-img
                                    src="@/assets/images/chinese/banner-p-3.png"
                                    alt=""
                                />
                            </div>
                            <div
                                :class="$style['people-item']"
                                class="wow animate__fadeInUp-30_percent animation-delay-5"
                            >
                                <nuxt-img
                                    src="@/assets/images/chinese/banner-p-4.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-module" :class="$style['intro-module']">
            <div class="wrapper--limit-width">
                <div class="wrapper--limit-width-mini">
                    <div :class="$style['module-header']">
                        <h2 :class="$style['module-title']">
                            {{ $t("KEY_PAGE_CHINESE.INTRO.TITLE") }}
                        </h2>
                    </div>
                    <div
                        :class="$style['module-body']"
                        class="grid grid-cols-2 wow wow-group-2"
                    >
                        <div
                            :class="$style['group-box']"
                            class="flex flex-col justify-between wow animate__fadeInUp-50"
                        >
                            <p :class="$style['desc']">
                                {{ $t("KEY_PAGE_CHINESE.INTRO.DESC[0]") }}
                            </p>
                            <div :class="$style['msg-list']">
                                <div
                                    :class="$style['msg-item']"
                                    class="flex items-center sm:items-start"
                                >
                                    <i
                                        class="ic iconfont icon-circle-right-strock-2"
                                    ></i>
                                    <span class="text">
                                        {{
                                            $t("KEY_PAGE_CHINESE.INTRO.DESC[1]")
                                        }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            :class="$style['group-box']"
                            class="flex flex-col justify-between wow animate__fadeInUp-50"
                        >
                            <p :class="$style['desc']">
                                {{ $t("KEY_PAGE_CHINESE.INTRO.DESC[2]") }}
                            </p>
                            <div :class="$style['msg-list']">
                                <div
                                    :class="$style['msg-item']"
                                    class="flex items-center"
                                >
                                    <i
                                        class="ic iconfont icon-circle-right-strock"
                                    ></i>
                                    <span class="text">
                                        {{
                                            $t("KEY_PAGE_CHINESE.INTRO.DESC[3]")
                                        }}</span
                                    >
                                </div>
                                <div
                                    :class="$style['msg-item']"
                                    class="flex items-center"
                                >
                                    <i
                                        class="ic iconfont icon-circle-right-strock"
                                    ></i>
                                    <span class="text">
                                        {{
                                            $t("KEY_PAGE_CHINESE.INTRO.DESC[4]")
                                        }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-module" :class="$style['features-module']">
            <div class="wrapper--limit-width">
                <div :class="$style['wrapper-inner']" class="relative">
                    <div :class="$style['module-bg']">
                        <div :class="$style['module-bg--inner']">
                            <nuxt-img
                                src="@/assets/images/chinese/features-bg-3.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        :class="$style['module-header']"
                        class="wow animate__fadeInUp-50"
                    >
                        <h2 :class="$style['module-title']">
                            {{ $t("KEY_PAGE_CHINESE.FEATURES.TITLE") }}
                        </h2>
                        <p :class="$style['module-desc']">
                            {{ $t("KEY_PAGE_CHINESE.FEATURES.DESC") }}
                        </p>
                    </div>
                    <div :class="$style['module-body']">
                        <div
                            :class="$style['features-list']"
                            class="grid grid-cols-2 grid-rows-2 wow wow-group-4"
                        >
                            <div
                                v-for="(item, index) in featuresList"
                                :key="index"
                                :class="$style['features-item']"
                                class="flex items-center wow animate__fadeIn"
                            >
                                <div class="state-pos--left">
                                    <div :class="$style['icon-box']">
                                        <nuxt-img :src="item.icon" alt="" />
                                    </div>
                                </div>
                                <div class="state-pos--right">
                                    <div :class="$style['item-info']">
                                        <h4
                                            class="text"
                                            :class="$style['item-title']"
                                        >
                                            {{ $t(item.title) }}
                                        </h4>
                                        <p
                                            class="text"
                                            :class="$style['item-subtitle']"
                                        >
                                            {{ $t(item.subtitle) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <IntroCard v-bind="cardData" class="p-module" />
        <div class="p-module" :class="$style['teacher-module']">
            <div class="wrapper--limit-width">
                <div class="wrapper--limit-width-mini">
                    <div :class="$style['module-header']" class="wow-group-2">
                        <h2
                            :class="$style['module-title']"
                            class="wow animate__fadeInUp-50"
                        >
                            {{ $t("KEY_PAGE_CHINESE.TEACHER.TITLE") }}
                        </h2>
                        <p
                            :class="$style['module-desc']"
                            class="wow animate__fadeInUp-50"
                        >
                            {{ $t("KEY_PAGE_CHINESE.TEACHER.DESC") }}
                        </p>
                    </div>
                    <div :class="$style['module-body']">
                        <div :class="$style['module-bg']">
                            <nuxt-img
                                src="@/assets/images/chinese/teacher-map.png"
                                alt=""
                            />
                        </div>
                        <div
                            ref="teacherThumb"
                            :class="$style['wrapper-inner']"
                            class="wow wow-group-2"
                        >
                            <div
                                :class="$style['msg-box']"
                                class="flex justify-center items-center wow animate__fadeInLeft-50"
                            >
                                <div :class="$style['thumb-box']"></div>
                                <div :class="$style['msg']">
                                    <p class="text">Meet Our Teachers</p>
                                    <div :class="$style['row']">
                                        <i class="ic iconfont icon-map-tag"></i>
                                        <span class="text">Global</span>
                                    </div>
                                </div>
                                <div :class="$style['thumb-dot']"></div>
                            </div>
                            <div
                                :class="$style['info-box']"
                                class="wow animate__fadeInRight-50"
                            >
                                <div :class="$style['info-item']">
                                    <i
                                        class="ic iconfont icon-circle-right-strock"
                                    ></i>
                                    <span class="text">{{
                                        $t("KEY_PAGE_CHINESE.TEACHER.LIST[0]")
                                    }}</span>
                                </div>
                                <div :class="$style['info-item']">
                                    <i
                                        class="ic iconfont icon-circle-right-strock"
                                    ></i>
                                    <span class="text">{{
                                        $t("KEY_PAGE_CHINESE.TEACHER.LIST[1]")
                                    }}</span>
                                </div>
                                <div :class="$style['info-item']">
                                    <i
                                        class="ic iconfont icon-circle-right-strock"
                                    ></i>
                                    <span class="text">{{
                                        $t("KEY_PAGE_CHINESE.TEACHER.LIST[2]")
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-module" :class="$style['method-module']">
            <div class="wrapper--limit-width">
                <div class="wrapper--limit-width-mini">
                    <div :class="$style['module-header']">
                        <h2
                            :class="$style['module-title']"
                            class="wow animate__fadeInUp-50"
                        >
                            {{ $t("KEY_PAGE_CHINESE.METHOD.TITLE") }}
                        </h2>
                    </div>
                    <div :class="$style['module-body']">
                        <div
                            :class="$style['method-list']"
                            class="grid grid-cols-3 gap-10 xxl:gap-6 wow-group-3 lg:gap-3 md:grid-cols-1 md:gap-5"
                        >
                            <div
                                v-for="(item, index) in methodList"
                                :key="index"
                                :class="$style['method-item']"
                                class="wow animate__fadeInUp-100"
                            >
                                <div :class="$style['item-thumb']">
                                    <i
                                        class="ic iconfont icon-fill-circle-right"
                                    ></i>
                                    <nuxt-img :src="item.icon" alt="" />
                                </div>
                                <div :class="$style['item-info']">
                                    <div :class="$style['item-title']">
                                        <span class="text">{{
                                            $t(item.title)
                                        }}</span>
                                    </div>
                                    <div :class="$style['item-desc']">
                                        <span class="text">{{
                                            item.desc
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LevelIntroModule :level-intro-list="levelIntroList" class="p-module" />
        <MessageBoard />
    </main>
</template>
<script lang="ts">
import IntroCard from "@/components/IntroCard.vue";
import LevelIntroModule from "@/components/LevelIntroModule.vue";
import MessageBoard from "@/components/MessageBoard.vue";
import { defineComponent } from "@nuxtjs/composition-api";

import { onMounted, ref } from "vue";
export default defineComponent({
    name: "ChinesePage",
    components: {
        IntroCard,
        LevelIntroModule,
        MessageBoard,
    },
    setup() {
        const featuresList = [
            {
                icon: require("@/assets/images/chinese/icon-1.png"),
                title: "KEY_PAGE_CHINESE.FEATURES.LIST[0].TITLE",
                subtitle: "KEY_PAGE_CHINESE.FEATURES.LIST[0].SUBTITLE",
            },
            {
                icon: require("@/assets/images/chinese/icon-2.png"),
                title: "KEY_PAGE_CHINESE.FEATURES.LIST[1].TITLE",
                subtitle: "KEY_PAGE_CHINESE.FEATURES.LIST[1].SUBTITLE",
            },
            {
                icon: require("@/assets/images/chinese/icon-3.png"),
                title: "KEY_PAGE_CHINESE.FEATURES.LIST[2].TITLE",
                subtitle: "KEY_PAGE_CHINESE.FEATURES.LIST[3].SUBTITLE",
            },
            {
                icon: require("@/assets/images/chinese/icon-4.png"),
                title: "KEY_PAGE_CHINESE.FEATURES.LIST[3].TITLE",
                subtitle: "KEY_PAGE_CHINESE.FEATURES.LIST[3].SUBTITLE",
            },
        ];
        const levelIntroList = [
            {
                theme: "#906DFF",
                title: "KEY_PAGE_CHINESE.LEVEL.TITLE",
                subtitle: "KEY_PAGE_CHINESE.LEVEL.SUBTITLE",
                desc: "KEY_PAGE_CHINESE.LEVEL.DESC",
                thumb: require("@/assets/images/chinese/level-1.png"),
            },
        ];
        const cardData = {
            title: "KEY_PAGE_CHINESE.ADVANTAGES.TITLE",
            subtitle: "KEY_PAGE_CHINESE.ADVANTAGES.SUBTITLE",
            list: [
                {
                    title: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[0].TITLE",
                    subtitle: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[0].SUBTITLE",
                    tag: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[0].TAG",
                    icon: require("@/assets/images/chinese/advantage-icon-1.png"),
                },
                {
                    title: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[1].TITLE",
                    subtitle: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[1].SUBTITLE",
                    tag: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[1].TAG",
                    icon: require("@/assets/images/chinese/advantage-icon-2.png"),
                },
                {
                    title: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[2].TITLE",
                    subtitle: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[2].SUBTITLE",
                    tag: "KEY_PAGE_CHINESE.ADVANTAGES.LIST[2].TAG",
                    icon: require("@/assets/images/chinese/advantage-icon-3.png"),
                },
            ],
        };
        const methodList = [
            {
                icon: require("@/assets/images/chinese/method-1.png"),
                title: "KEY_PAGE_CHINESE.METHOD.LIST[0]",
                desc: "Provide a safe, reliable and simple online learning platform",
            },
            {
                icon: require("@/assets/images/chinese/method-2.png"),
                title: "KEY_PAGE_CHINESE.METHOD.LIST[1]",
                desc: "Equipped with interactive experience practice offline learning center",
            },
            {
                icon: require("@/assets/images/chinese/method-3.png"),
                title: "KEY_PAGE_CHINESE.METHOD.LIST[2]",
                desc: "Establishing language and culture communication network teaching community",
            },
        ];

        const teacherThumb = ref<HTMLElement | null>(null);
        onMounted(() => {
            const teacherThumbDom = teacherThumb.value!;
            gsap.timeline({
                scrollTrigger: { scrub: true, trigger: teacherThumbDom },
            }).to(teacherThumbDom, {
                backgroundPositionY: "0%",
            });
        });
        return {
            featuresList,
            levelIntroList,
            cardData,
            methodList,
            teacherThumb,
        };
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.CHINESE.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.CHINESE.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.CHINESE.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
.chinese-body {
    // init
}
.banner-module {
    overflow: hidden;

    padding-top: 233px;
    padding-bottom: 132px;
    .module-bg {
        // @include space-placeholder(1920px, 560px);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        width: 100%;
        height: 550px;
        // max-width: 1920px;
        margin: 0 auto;

        border-radius: 0 0 15.625vw;
        background-color: #effcf5;
    }
    .module-header {
        font-size: 15px;

        max-width: min(782px, 60%);
        margin: 0 auto;
        margin-bottom: em(75px, 15px);
    }
    .module-title {
        font-size: 48px;
        font-weight: 700;

        margin-bottom: em(16px, 48px);

        color: #333;
    }
    .module-desc {
        line-height: em(30px, 15px);

        color: #65666a;
    }
    .module-body {
        position: relative;
    }
    .main-box {
        position: relative;

        width: min(818px, 62.76vw);
        margin: 0 auto;
        .img-box {
            @include image-placeholder(1600px, 920px);
            z-index: 10;

            overflow: hidden;

            width: 100%;

            border: 9px solid #343434;
            border-radius: 40px;
            box-shadow: 20px 20px 60px rgb(28 85 68 / 0.2);
        }
        .people-box {
            @include ab-cover;
        }
        .people-item {
            position: absolute;
            &:nth-child(1) {
                @include image-placeholder(429px, 284px, $position: absolute);
                top: percent(-185px, 478px);
                left: percent(-299px, 818px);

                width: percent(math.div(429px, 2), 818px);
            }
            &:nth-child(2) {
                @include image-placeholder(354px, 381px, $position: absolute);
                top: percent(-185px, 478px);
                left: calc(100% + percent(222px, 818px));

                width: percent(math.div(354px, 2), 818px);
            }
            &:nth-child(3) {
                @include image-placeholder(668px, 349px, $position: absolute);
                top: percent(40px, 478px);
                left: percent(-218px, 818px);

                width: percent(math.div(668px, 2), 818px);
            }
            &:nth-child(4) {
                @include image-placeholder(333px, 398px, $position: absolute);
                top: percent(22px, 478px);
                left: calc(100% + 66px);

                width: percent(math.div(333px, 2), 818px);
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        padding-top: 200px;
        .module-header {
            font-size: 14px;
        }
        .module-title {
            font-size: 40px;
        }
        .module-bg {
            height: 500px;
        }
    }
    @include media-breakpoint-down(xxl) {
        padding-top: 160px;
        .module-header {
            font-size: 13px;

            margin-bottom: em(50px, 13px);
        }
        .module-title {
            font-size: 38px;
        }
        .module-bg {
            height: 450px;
        }
    }
    @include media-breakpoint-down(xl) {
        padding-bottom: 120px;
        .module-header {
            font-size: 12px;

            max-width: min(782px, 55%);
        }
        .module-title {
            font-size: 30px;
        }
        .module-bg {
            height: 400px;
        }
        .main-box {
            width: min(818px, 56.76vw);
        }
    }
    @include media-breakpoint-down(lg) {
        padding-bottom: 100px;
        .module-header {
            font-size: 12px;

            max-width: min(782px, 55%);
        }
        .module-title {
            font-size: 28px;
        }
        .main-box {
            width: min(718px, 49.76vw);
        }
    }
    @include media-breakpoint-down(md) {
        padding-bottom: 100px;
        .module-header {
            font-size: 12px;

            max-width: 80%;
        }
        .module-title {
            font-size: 28px;
        }
        .main-box {
            width: 380px;
            .img-box {
                border: 5px solid #343434;
                border-radius: 19px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 120px;
        padding-bottom: 80px;
        .module-bg {
            height: 370px;
        }
        .module-header {
            font-size: 12px;

            max-width: 96%;
        }
        .module-title {
            font-size: 23px;
        }
        .main-box {
            width: 300px;
        }
    }
}
.intro-module {
    padding-bottom: 205px;
    .module-title {
        font-size: var(--module-title-size);
        font-weight: 700;

        color: #333;
    }
    .module-header {
        margin-bottom: 55px;
    }
    .module-body {
        gap: 50px 107px;
    }
    .group-box {
        font-size: 14px;
        .desc {
            font-weight: 500;
            line-height: em(30px, 14px);

            margin-bottom: 25px;

            color: #65666a;
        }
        .msg-item {
            @include space-between(em(10px, 22px), "y");
            @include ellipse;
            font-size: 14px;
            line-height: em(56px, 14px);

            padding: 0 em(23px, 14px) 0 em(29px, 14px);

            vertical-align: middle;

            color: #333;
            border-radius: em(28px, 14px);
            background: #effcf5;
            :global {
                /* stylelint-disable-next-line selector-max-compound-selectors */
                .text {
                    @include ellipse;
                    display: block;
                    flex: 1;

                    min-width: 1px;
                }
                /* stylelint-disable-next-line selector-max-compound-selectors */
                .ic {
                    font-size: em(22px, 14px);

                    margin-right: em(10px, 22px);

                    vertical-align: middle;

                    color: #0aca91;
                }
            }
        }
        &:nth-child(2) {
            .msg-item {
                padding-left: 0;

                background: transparent;
                :global(.ic) {
                    @include circle(em(36px, 20px));
                    @include flex(c, c, $type: "inline");
                    font-size: em(20px, 14px);

                    margin-right: em(12px, 14px);

                    vertical-align: middle;

                    color: #fff;
                    background-color: #0aca91;
                }
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-header {
            margin-bottom: 40px;
        }
        .module-body {
            gap: 50px 50px;
        }
        .group-box {
            font-size: 13px;
            .desc {
                margin-bottom: 36px;
            }
            .msg-item {
                font-size: 13px;
                line-height: em(46px, 13px);

                padding: 0 em(18px, 13px) 0 em(20px, 13px);
            }
        }
    }
    @include media-breakpoint-down(xl) {
        padding-bottom: 180px;
        .module-header {
            margin-bottom: 35px;
        }
        .module-body {
            gap: 50px 40px;
        }
        .group-box {
            font-size: 13px;
            .desc {
                margin-bottom: 36px;
            }
            .msg-item {
                font-size: 12px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        padding-bottom: 120px;
        .module-body {
            gap: 40px 30px;
        }
    }
    @include media-breakpoint-down(md) {
        .module-body {
            gap: 30px;
            grid-template-columns: 1fr;
        }
        .group-box {
            .msg-item {
                padding: 1em 2em;
                :global(.ic) {
                    font-size: 22px;
                }
                :global(.text) {
                    line-height: 1.6em;

                    height: auto;

                    white-space: initial;
                    text-overflow: initial;
                }
            }
        }
    }
    @include media-breakpoint-down(sm) {
        padding-bottom: 70px;
        .module-header {
            margin-bottom: 20px;
        }
        .group-box {
            min-width: 0;
        }
    }
}
.features-module {
    .wrapper-inner {
        padding: 126px 136px;

        border-radius: 30px;
        background: url("@/assets/images/chinese/features-bg-1.png"),
            url("@/assets/images/chinese/features-bg-2.png"),
            linear-gradient(0deg, #fff 0%, rgb(255 255 255 / 0) 100%), #fff4d4;
        background-repeat: no-repeat;
        background-position: bottom center, top right, top center;
        background-size: 100%;
    }
    .module-bg {
        @include ab-cover;
    }
    .module-bg--inner {
        @include image-placeholder(720px, 720px);
        position: absolute;
        right: 11.2630208333333%;

        width: 23.4375%;

        transform: translateY(-20.8333333333333%);
    }
    .module-header {
        margin-bottom: 92px;
    }
    .module-title {
        font-size: var(--module-title-size);
        font-weight: 700;

        margin-bottom: em(22px, 40px);

        color: #23242a;
    }
    .module-desc {
        font-size: 16px;
        line-height: em(32px, 16px);

        width: min(737px, 60%);

        color: #65666a;
    }
    @include media-breakpoint-down(xxxl) {
        .wrapper-inner {
            padding: 126px 100px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .wrapper-inner {
            padding: 126px 70px;

            border-radius: 20px;
        }
        .module-desc {
            font-size: 14px;
        }
        .module-header {
            margin-bottom: 72px;
        }
    }
    @include media-breakpoint-down(xl) {
        .wrapper-inner {
            padding: 116px 50px;

            border-radius: 20px;
        }
        .module-desc {
            font-size: 13px;
        }
        .module-header {
            margin-bottom: 62px;
        }
    }
    @include media-breakpoint-down(md) {
        .module-bg--inner {
            width: 160px;
        }
        .module-desc {
            width: 100%;
        }
        .wrapper-inner {
            padding: 110px 30px;
        }
    }
    @include media-breakpoint-down(sm) {
        .module-header {
            margin-bottom: 40px;
        }
        .wrapper-inner {
            padding-bottom: 80px;
        }
    }
}
.features-list {
    font-size: 22px;

    padding-bottom: 323px;

    row-gap: 98px;
    .icon-box {
        @include image-placeholder(em(70px, 22px), em(71px, 22px));
        margin-right: em(20px, 22px);
    }
    .item-title {
        margin-bottom: em(8px, 22px);

        color: #23242a;
    }
    .item-subtitle {
        font-size: em(15px, 22px);
    }
    @include media-breakpoint-down(xxxl) {
        padding-bottom: 260px;

        row-gap: 78px;
    }
    @include media-breakpoint-down(xxl) {
        font-size: 18px;

        padding-bottom: 190px;

        row-gap: 68px;
    }
    @include media-breakpoint-down(xl) {
        padding-bottom: 140px;

        gap: 60px 40px;
    }
    @include media-breakpoint-down(lg) {
        padding-bottom: 100px;

        gap: 50px 30px;
        .item-title {
            font-size: 16px;
        }
    }
    @include media-breakpoint-down(md) {
        padding-bottom: 60px;

        grid-template-columns: 1fr;
    }
    @include media-breakpoint-down(sm) {
        gap: 30px;
    }
}
.teacher-module {
    overflow: hidden;

    padding-top: 131px;
    padding-bottom: 22px;
    .module-header {
        width: min(606px, 46%);
        margin-bottom: 68px;
    }
    .module-title {
        font-size: var(--module-title-size);
        font-weight: 700;

        margin-bottom: em(30px, 50px);
    }
    .module-desc {
        font-size: 15px;
        line-height: em(30px, 15px);

        color: #65666a;
    }
    .module-body {
        position: relative;
        z-index: 10;
        .module-bg {
            position: absolute;
            top: -200px;
            right: -26px;

            width: percent(912px, 1360px);
        }
    }
    .wrapper-inner {
        @include space-placeholder(1360px, 540px);
        overflow: hidden;

        width: 100%;

        border-radius: 30px;
        background-image: url("@/assets/images/chinese/teacher-thumb.png");
        background-repeat: no-repeat;
        background-position-y: 150%;
        background-size: cover;
    }
    .msg-box {
        position: absolute;
        bottom: percent(51px, 544px);
        left: percent(71px, 1368px);

        width: 320px;
        padding: 28px;

        border-radius: 16px;
        background-color: #fff;
        box-shadow: 0 8px 16px rgb(0 0 0 / 0.05);
        .thumb-dot {
            @include image-placeholder(81px, 69px);
            position: absolute;
            top: percent(-36px, 120px);
            right: percent(29px, 320px);

            width: 25.3125%;

            content: "";

            background-image: url("@/assets/images/chinese/teacher-icon-2.png");
            background-size: 100%;
        }
        .msg {
            font-family: "Inter";
            font-size: 16px;
            font-weight: 700;
            line-height: em(19px, 16px);

            color: #27333f;
        }
        .thumb-box {
            display: block;

            width: 64px;
            height: 64px;
            margin-right: 15px;

            background-image: url("@/assets/images/chinese/teacher-icon.png");
            background-repeat: no-repeat;
            background-size: 100%;
        }
        .row {
            font-family: "Inter";
            font-size: 12px;
            font-weight: 400;
            line-height: em(20px, 12px);

            color: #7d7e85;
            :global(.ic) {
                margin-right: 6px;
            }
        }
    }
    .info-box {
        position: absolute;
        top: percent(140px, 544px);
        right: percent(80px, 1368px);

        width: 360px;
        padding: 49px 55px;

        border-radius: 16px;
        background-color: #fff;
    }
    .info-item {
        @include space-between(27px, "y");
        display: flex;

        color: #333;

        align-items: center;
        :global(.ic) {
            @include circle(em(36px, 21px));
            font-size: 21px;

            display: flex;
            flex: 0 0 auto;

            margin-right: em(12px, 21px);

            color: #fff;
            background-color: #0aca91;

            align-items: center;
            justify-content: center;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .info-box {
            top: percent(60px, 544px);
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-header {
            margin-bottom: 58px;
        }
        .module-desc {
            font-size: 14px;
        }
        .wrapper-inner {
            border-radius: 20px;
        }
        .msg-box {
            width: 260px;
            padding: 20px;
            .thumb-box {
                width: 50px;
                height: 50px;
                margin-right: 12px;
            }
        }
        .info-box {
            width: 320px;
            padding: 39.2px 44px;
        }
        .info-item {
            @include space-between(20px, "y");
            :global(.ic) {
                font-size: 19px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .module-desc {
            font-size: 13px;
        }
        .msg-box {
            width: 250px;
            padding: 18px;
            .thumb-box {
                width: 44px;
                height: 44px;
            }
            .msg {
                font-size: 15px;

                padding-top: 3px;
            }
            .row {
                :global(.ic) {
                    margin-right: 0;
                }
            }
        }
        .info-box {
            font-size: 13px;

            width: 300px;
            padding: 30.2px 34px;
        }
        .info-item {
            :global(.ic) {
                font-size: 18px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: 100px;
        .wrapper-inner {
            &::after {
                padding-top: 400px;
            }
        }
        .info-box {
            width: 240px;
            padding: 30px;
        }
        .info-item {
            :global(.ic) {
                flex: 0 0 auto;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .info-box {
            font-size: 12px;

            width: 190px;
            padding: 20px;
        }
        .info-item {
            @include space-between(10px, y);
            :global(.ic) {
                font-size: 16px;
            }
        }
        .msg-box {
            width: 200px;
            padding: 14px 10px;
            .thumb-box {
                @include circle(34px);
            }
            .msg {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 80px;
        .module-header {
            width: 100%;
            margin-bottom: 40px;
        }
        .info-box {
            display: none;
        }
    }
}
:global(.lang-en) {
    .banner-module {
        padding-top: 200px;
        .module-header {
            margin-bottom: 3em;
        }
        .module-title {
            line-height: 1.2;
        }
    }
    .intro-module {
        .group-box {
            .msg-item {
                line-height: 1.6;

                width: 100%;
                min-height: 4em;

                border-radius: 10em;

                /* stylelint-disable-next-line selector-max-compound-selectors */
                :global(.text) {
                    display: inline-block;

                    transform: translateY(-1px);
                    white-space: initial;
                }
            }
            &:nth-child(1) {
                .msg-item {
                    padding: em(15px, 14px) em(23px, 14px) em(15px, 14px)
                        em(29px, 14px);

                    align-items: flex-start;
                }
            }
        }
    }
    .features-list {
        gap: 98px 50px;
    }
    @include media-breakpoint-down(xxl) {
        .banner-module {
            padding-top: 160px;
        }
        .features-list {
            gap: 98px 30px;
        }
    }
    @include media-breakpoint-down(xl) {
        .banner-module {
            .module-title {
                margin-bottom: em(24px, 48px);
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .banner-module {
            .module-header {
                max-width: min(502px, 69%);
            }
        }
        .teacher-module {
            .module-header {
                width: min(606px, 100%);
            }
            .info-item {
                align-items: flex-start;
            }
        }
        .features-list {
            gap: 38px 30px;
        }
    }
    @include media-breakpoint-down(md) {
        .banner-module {
            padding-top: 120px;
            .module-header {
                max-width: min(600px, 96%);
            }
            .module-bg {
                height: 400px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .features-module {
            .module-bg--inner {
                right: 3.263021%;

                transform: translateY(-37.833333%);
            }
        }
        .intro-module {
            .group-box {
                &:nth-child(1) {
                    .msg-item {
                        padding: em(25px, 14px) em(23px, 14px) em(25px, 14px)
                            em(29px, 14px);
                    }
                }
            }
        }
        .features-item {
            display: block;
            :global(.state-pos--left) {
                margin-bottom: 20px;
            }
        }
    }
}
.method-module {
    margin-bottom: -80px;
    padding-bottom: 252px;

    background: linear-gradient(
        180deg,
        rgb(248 254 255 / 0) -6.18%,
        #edfcfe 43.59%,
        rgb(237 252 254 / 0) 100%
    );
    .module-header {
        padding-top: 117px;
        padding-bottom: 117px;
    }
    .module-title {
        font-size: var(--module-title-size);
        font-weight: 700;

        color: #333;
    }
    .method-item {
        position: relative;

        padding: 74px 72px 81px;

        border: 1px solid #ebf5f9;
        border-radius: 10px;
        background: #fff;
        &:nth-child(2) {
            top: -105px;

            border-width: 0;
        }
        .item-thumb {
            @include image-placeholder(220px, 200px);
            font-size: 45px;

            position: relative;

            overflow: visible;

            width: em(110px, 45px);
            margin: 0 auto;
            margin-bottom: em(45px, 45px);
            :global(.ic) {
                font-size: em(45px, 45px);

                position: absolute;
                z-index: 10;
                top: 0;
                left: 50%;

                transform: translate3d(9px, -20px, 0);

                color: #00e5cc;
                border-radius: 50%;
                box-shadow: 0 10.6667px 26.6667px rgb(52 198 53 / 0.25);
            }
        }
        .item-title {
            font-size: 20px;
            line-height: em(32px, 20px);

            margin-bottom: em(21px, 20px);

            text-align: center;

            color: #333;
        }
        .item-desc {
            font-family: "Inter";
            font-size: 15px;
            line-height: em(29px, 15px);

            text-align: center;

            opacity: 0.8;
            color: #56646c;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .method-item {
            .item-thumb {
                font-size: 42px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        margin-bottom: -70px;
        padding-bottom: 202px;
        .method-item {
            padding: 51.8px 50.4px 56.7px;
            .item-title {
                font-size: 18px;
            }
            .item-desc {
                font-size: 14px;
            }
            .item-thumb {
                font-size: 40px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        margin-bottom: -70px;
        padding-bottom: 202px;
        .module-header {
            padding-top: 100px;
        }
        .method-item {
            padding: 41.8px 40.4px 46.7px;
            .item-title {
                font-size: 16px;
            }
            .item-desc {
                font-size: 13px;
            }
            .item-thumb {
                font-size: 30px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        padding-bottom: 140px;
        .method-item {
            padding: 40px 10px;
        }
    }
    @include media-breakpoint-down(md) {
        .module-header {
            padding: 50px 0;
        }
        .method-item {
            &:nth-child(2) {
                top: 0;
            }
        }
    }
}
</style>
