<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-13 16:51:58
-->
<template>
    <main :class="$style['science-container']">
        <section
            ref="bannerModule"
            class="p-module"
            :class="$style['module-banner']"
        >
            <div class="relative">
                <div :class="$style['module-body']" class="relative">
                    <div :class="$style['module-bg']"></div>
                    <div class="wrapper--limit-width h-full relative z-10">
                        <div :class="$style['module-info']">
                            <div
                                :class="$style['module-header']"
                                class="flex flex-col items-center h-full justify-center"
                            >
                                <div :class="$style['module-title']">
                                    <img
                                        src="@/assets/images/science/banner-title.png"
                                        alt=""
                                    />
                                </div>
                                <div :class="$style['module-subtitle']">
                                    <img
                                        src="@/assets/images/science/banner-subtitle.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div :class="$style['module-box']" class="relative">
                            <div
                                :class="[
                                    $style['box-0'],
                                    $style['box-wrapper'],
                                ]"
                            >
                                <img
                                    class="parallax-layer"
                                    data-depth="0.1"
                                    src="@/assets/images/science/banner-box-4.png"
                                    alt=""
                                />
                            </div>
                            <div
                                :class="[
                                    $style['box-1'],
                                    $style['box-wrapper'],
                                ]"
                            >
                                <img
                                    class="parallax-layer"
                                    data-depth="0.1"
                                    src="@/assets/images/science/banner-box-1.png"
                                    alt=""
                                />
                            </div>
                            <div
                                :class="[
                                    $style['box-2'],
                                    $style['box-wrapper'],
                                ]"
                            >
                                <div :class="$style['box-d']">
                                    <div
                                        :class="$style['px-box']"
                                        class="parallax-layer"
                                        data-depth="0.18"
                                    >
                                        <img
                                            src="@/assets/images/science/banner-d-2.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <img
                                    class="parallax-layer"
                                    data-depth="0.2"
                                    src="@/assets/images/science/banner-box-2.png"
                                    alt=""
                                />
                            </div>
                            <div
                                :class="[
                                    $style['box-3'],
                                    $style['box-wrapper'],
                                ]"
                            >
                                <div :class="$style['box-d']">
                                    <div
                                        :class="$style['img-box']"
                                        class="parallax-layer"
                                        data-depth="0.16"
                                    >
                                        <img
                                            src="@/assets/images/science/banner-d-1.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <img
                                    class="parallax-layer"
                                    data-depth="0.18"
                                    src="@/assets/images/science/banner-box-3.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wrapper--limit-width">
                    <div :class="$style['img-box']" class="relative z-20">
                        <div :class="$style['banner-1']">
                            <div :class="$style['banner-d-box']">
                                <img
                                    src="@/assets/images/science/banner-1.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <ScienceCourseIntro class="p-module" />
        <ScienceEducation class="p-module" />
        <ScienceCourseFeatures class="p-module" />
        <IntroCard2
            class="p-module"
            :class="$style['intro-card-2']"
            v-bind="advantageModule"
        />
        <ScienceTeacher class="p-module" />
        <IntroCard v-bind="cardData" class="p-module" />
        <LevelIntroModule :level-intro-list="levelIntroList" class="p-module" />
        <MessageBoard class="p-module" />
    </main>
</template>
<script lang="ts">
import IntroCard from "@/components/IntroCard.vue";
import IntroCard2 from "@/components/IntroCard2.vue";
import LevelIntroModule from "@/components/LevelIntroModule.vue";
import MessageBoard from "@/components/MessageBoard.vue";

import ScienceTeacher from "@/components/science/ScienceTeacher.vue";
import ScienceEducation from "@/components/science/ScienceEducation.vue";
import ScienceCourseFeatures from "@/components/science/ScienceCourseFeatures.vue";
import ScienceCourseIntro from "@/components/science/ScienceCourseIntro.vue";
import { onBeforeUnmount, onMounted, ref, useCssModule } from "vue";
import Parallax from "parallax-js";
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    components: {
        IntroCard,
        IntroCard2,
        LevelIntroModule,
        MessageBoard,
        ScienceTeacher,
        ScienceEducation,
        ScienceCourseFeatures,
        ScienceCourseIntro,
    },
    setup() {
        const advantageModule = {
            title: "KEY_PAGE_SCIENCE.ADVANTAGE.TITLE",
            subtitle: "KEY_PAGE_SCIENCE.ADVANTAGE.SUBTITLE",
            list: [
                {
                    title: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[0].TITLE",
                    desc: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[0].DESC",
                    btn: {
                        title: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[0].BTN",
                        link: "",
                    },
                },
                {
                    title: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[1].TITLE",
                    desc: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[1].DESC",
                    btn: {
                        title: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[1].BTN",
                        link: "",
                    },
                },
                {
                    title: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[2].TITLE",
                    desc: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[2].DESC",
                    btn: {
                        title: "KEY_PAGE_SCIENCE.ADVANTAGE.LIST[2].BTN",
                        link: "",
                    },
                },
            ],
        };
        const cardData = {
            title: "KEY_PAGE_SCIENCE.CARD.TITLE",
            list: [
                {
                    title: "KEY_PAGE_SCIENCE.CARD.LIST[0].TITLE",
                    subtitle: "KEY_PAGE_SCIENCE.CARD.LIST[0].SUBTITLE",
                    tag: "KEY_PAGE_SCIENCE.CARD.LIST[0].TAG",
                    icon: require("@/assets/images/sinology/sinology-icon-1.png"),
                },
                {
                    title: "KEY_PAGE_SCIENCE.CARD.LIST[1].TITLE",
                    subtitle: "KEY_PAGE_SCIENCE.CARD.LIST[1].SUBTITLE",
                    tag: "KEY_PAGE_SCIENCE.CARD.LIST[1].TAG",
                    icon: require("@/assets/images/sinology/sinology-icon-2.png"),
                },
                {
                    title: "KEY_PAGE_SCIENCE.CARD.LIST[2].TITLE",
                    subtitle: "KEY_PAGE_SCIENCE.CARD.LIST[2].SUBTITLE",
                    tag: "KEY_PAGE_SCIENCE.CARD.LIST[2].TAG",
                    icon: require("@/assets/images/sinology/sinology-icon-3.png"),
                },
            ],
        };
        const levelIntroList = [
            {
                theme: "#0ACA91",
                title: "KEY_PAGE_SCIENCE.LEVEL.TITLE",
                subtitle: "KEY_PAGE_SCIENCE.LEVEL.SUBTITLE",
                desc: "KEY_PAGE_SCIENCE.LEVEL.DESC",
                thumb: require("@/assets/images/chinese/level-2.png"),
            },
        ];

        const bannerModule = ref<null | HTMLElement>(null);

        const $sn = useCssModule();
        onMounted(() => {
            const bannerDom = bannerModule.value!;
            const bg = $(bannerDom).find("." + $sn["module-bg"]);
            const box = $(bannerDom).find("." + $sn["box-wrapper"]);
            const info = $(bannerDom).find("." + $sn["module-header"]);
            const bannerCard = $(bannerDom).find("." + $sn["banner-d-box"]);
            gsap.timeline()
                .fromTo(
                    [box[1], box[2], box[3], box[4], box[0]],
                    { opacity: 0, y: 500 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: { each: 0.1 },
                    }
                )
                .fromTo(
                    bg,
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0 },
                    "-=0.3"
                )
                .fromTo(
                    info,
                    { opacity: 0 },
                    { opacity: 1, duration: 1 },
                    "-=0.3"
                )

                .fromTo(
                    bannerCard,
                    { opacity: 0 },
                    { opacity: 1, duration: 2 },
                    "<"
                )
                .fromTo(
                    bannerCard,
                    { rotateY: 60 },
                    {
                        rotateY: 0,
                        duration: 3,
                        ease: "elastic.out(1.5, 0.75)",
                    },
                    "<"
                );

            const px = new Parallax(bannerDom, {
                selector: ".parallax-layer",
                scalarX: 5,
                hoverOnly: true,
                scalarY: 1,
            });
            onBeforeUnmount(() => {
                px.destroy();
            });
        });
        return {
            advantageModule,
            cardData,
            levelIntroList,
            bannerModule,
        };
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.SCIENCE.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.SCIENCE.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.SCIENCE.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
@keyframes science-banner-wave {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(10px);
    }
    100% {
        transform: translateY(0);
    }
}
.science-container {
    :global(.p-module) {
        margin-bottom: 140px;
        .intro-card-2 {
            margin: 0;
            padding-bottom: 140px;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    @include media-breakpoint-down(xxl) {
        :global(.p-module) {
            margin-bottom: 120px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .intro-card-2 {
            margin: 0;
            padding-bottom: 120px;
        }
    }
    @include media-breakpoint-down(xl) {
        :global(.p-module) {
            margin-bottom: 100px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .intro-card-2 {
            margin: 0;
            padding-bottom: 100px;
        }
    }
    @include media-breakpoint-down(md) {
        :global(.p-module) {
            margin-bottom: 80px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .intro-card-2 {
            margin: 0;
            padding-bottom: 100px;
        }
    }
}
.module-banner {
    font-size: min(16px, vw(16px, 1920px));
    .module-body {
        overflow: hidden;

        height: em(560px, 16px);

        border-radius: 0 0 0 em(300px, 16px);
        background: #e4f0ff;
        .module-bg {
            @include ab-cover;

            background-image: url("@/assets/images/science/banner-bg.png");
            background-repeat: no-repeat;
            background-position: left bottom;
            background-size: contain;
        }
    }
    img {
        width: em(510px, 16px);
    }
    .banner-1 {
        position: absolute;
        right: 11.6%;
        bottom: 0;

        transform: translateY(percent(58px, 240px));

        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .banner-d-box {
        @include image-placeholder(527px, 480px);
        width: em(263.5px, 16px);

        transform-origin: right center;

        border-radius: em(20px, 16px);

        filter: drop-shadow(16px 28px 64px rgb(0 0 0 / 0.08));
    }
    .module-header {
        position: relative;
        z-index: 100;
    }
    .module-title {
        @include image-placeholder(594px, 290px);
        width: em(297px, 16px);
    }
    .module-subtitle {
        @include image-placeholder(720px, 120px);
        width: em(360px, 16px);
        margin-top: -8px;
    }
    .module-info {
        @include ab-cover;
    }
    .module-box {
        width: 100%;
        height: 100%;
    }
    .box-wrapper {
        position: absolute;

        overflow: visible !important;
    }
    .box-1 {
        @include image-placeholder(1034px, 1120px, $position: absolute);
        top: percent(208px, 560px);
        right: 0;
        left: 0;

        width: em(517px, 16px);
        margin: 0 auto;
    }
    .box-2 {
        @include image-placeholder(653px, 910px, $position: absolute);
        top: percent(365px, 560px);
        left: percent(138px, 1536px);

        overflow: visible;

        width: em(326.5px, 16px);
        .px-box {
            @include ab-cover;
        }
        .box-d {
            @include image-placeholder(160px, 175.56px, $position: absolute);
            z-index: 10;
            left: percent(66px, 258.5px);

            overflow: visible !important;

            width: em(160px, 16px);

            transform: translateY(percent(-36px, 175.56px));
            /* stylelint-disable-next-line selector-max-compound-selectors */
            img {
                animation: science-banner-wave 4s 1.2s infinite alternate
                    cubic-bezier(0.455, 0.03, 0.515, 0.955);
                animation-delay: 1s;
            }
        }
    }
    .box-3 {
        @include image-placeholder(449px, 1062px, $position: absolute);
        top: percent(245px, 560px);
        right: 0;

        overflow: visible;

        width: em(224px, 16px);
        .px-box {
            @include ab-cover;
        }
        .box-d {
            @include image-placeholder(320px, 320px, $position: absolute);
            z-index: 10;
            left: percent(6px, 224px);

            overflow: visible !important;

            width: em(160px, 16px);

            transform: translateY(percent(-79px, 160px));
            /* stylelint-disable-next-line selector-max-compound-selectors */
            img {
                animation: science-banner-wave 4s 1.2s infinite alternate
                    cubic-bezier(0.455, 0.03, 0.515, 0.955);
            }
        }
    }
    .box-0 {
        @include image-placeholder(623px, 1085px, $position: absolute);
        top: percent(147px, 560px);
        left: percent(293px, 1536px);

        width: em(311.5px, 16px);
    }
    @include media-breakpoint-down(xxxl) {
        .module-body {
            height: em(660px, 16px);
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-body {
            height: em(700px, 16px);
        }
    }
    @include media-breakpoint-down(lg) {
        font-size: 8px;
    }
    @include media-breakpoint-down(md) {
        font-size: 6px;
    }
    @include media-breakpoint-down(sm) {
        font-size: 6.2px;

        margin-bottom: 60px !important;
        .module-body {
            transform: translate3d(0, 0, 0);
        }
    }
}
</style>
