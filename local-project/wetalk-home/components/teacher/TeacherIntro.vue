<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-02-01 16:41:14
-->
<template>
    <div :class="$style['teacher-intro']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div
                    class="flex justify-between items-center lg:block"
                    :class="$style['intro-block']"
                >
                    <div ref="introDetail" class="state-pos--left">
                        <div :class="$style['module-header']">
                            <h3 :class="$style['module-title']">
                                {{ $t("KEY_PAGE_TEACHER.INTRO.TITLE") }}
                            </h3>
                            <h4 :class="$style['module-subtitle']">
                                {{ $t("KEY_PAGE_TEACHER.INTRO.SUBTITLE") }}
                            </h4>
                        </div>
                        <div :class="$style['module-desc']">
                            <p class="text">
                                {{ $t("KEY_PAGE_TEACHER.INTRO.DESC") }}
                            </p>
                        </div>
                    </div>
                    <div class="state-pos--right">
                        <div ref="introThumb" :class="$style['intro-thumb']">
                            <div :class="$style['img-box']">
                                <div :class="$style['shadow-card']"></div>
                                <div :class="$style['shadow-card']"></div>
                                <div :class="$style['shadow-card']"></div>
                                <div :class="$style['shadow-card']"></div>
                                <div :class="$style['main-card']">
                                    <nuxt-img :src="introTeacherThumb" alt="" />
                                </div>
                                <div :class="$style['intro-btn']">
                                    <nuxt-img
                                        src="@/assets/images/teacher/btn.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        :class="$style['intro-msg-list']"
                        class="grid grid-cols-2 grid-rows-2 md:grid-cols-1 md:grid-rows-1 wow-group-4"
                    >
                        <div
                            v-for="(item, index) in introList"
                            :key="index"
                            :class="$style['intro-msg-item']"
                            class="wow animate__fadeInUp-50"
                        >
                            <div
                                :class="$style['bg']"
                                :style="'background-image:url(' + item.bg + ')'"
                            ></div>
                            <div
                                :class="$style['content']"
                                class="relative z-10"
                            >
                                <div
                                    :class="$style['item-head']"
                                    class="flex xl:block"
                                >
                                    <div
                                        :class="$style['icon']"
                                        class="flex-shrink-0"
                                    >
                                        <nuxt-img :src="item.icon" alt="" />
                                    </div>
                                    <div
                                        :class="$style['info']"
                                        class="min-h-full flex items-center"
                                    >
                                        <div :class="$style['inner']">
                                            <div :class="$style['item-title']">
                                                {{ item.title }}
                                            </div>
                                            <div
                                                :class="$style['item-subtitle']"
                                            >
                                                {{ item.subtitle }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div :class="$style['item-desc']">
                                    {{ item.desc }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
import { onMounted, ref, useCssModule } from "vue";
import { getSingleAD } from "@/assets/script/api/api";

const { i18n } = useContext();

const introList = [
    {
        icon: require("@/assets/images/teacher/1.png"),
        bg: require("@/assets/images/teacher/1-1.png"),
        title: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[0].TITLE"),
        subtitle: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[0].SUBTITLE"),
        desc: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[0].DESC"),
    },
    {
        icon: require("@/assets/images/teacher/2.png"),
        bg: require("@/assets/images/teacher/2-2.png"),
        title: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[1].TITLE"),
        subtitle: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[1].SUBTITLE"),
        desc: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[1].DESC"),
    },
    {
        icon: require("@/assets/images/teacher/3.png"),
        bg: require("@/assets/images/teacher/3-3.png"),
        title: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[2].TITLE"),
        subtitle: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[2].SUBTITLE"),
        desc: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[2].DESC"),
    },
    {
        icon: require("@/assets/images/teacher/4.png"),
        bg: require("@/assets/images/teacher/4-4.png"),
        title: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[3].TITLE"),
        subtitle: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[3].SUBTITLE"),
        desc: i18n.t("KEY_PAGE_TEACHER.INTRO.LIST[3].DESC"),
    },
];
const introThumb = ref<HTMLElement | null>(null);
const introDetail = ref<HTMLElement | null>(null);
const $sn = useCssModule();

function getDom(dom: HTMLElement, className: string) {
    return $(dom).find("." + $sn[className]);
}

const introTeacherThumb = ref<string>("");

onMounted(() => {
    const introThumbDom = introThumb.value!;
    const introDetailDom = introDetail.value!;
    gsap.timeline({
        defaults: { duration: 0.36 },
        scrollTrigger: {
            trigger: introThumbDom,
            start: "top center",
        },
    })
        .from(introDetailDom, {
            x: "-50px",
            opacity: 0,
            duration: 0.66,
        })
        .from(
            introThumbDom,
            {
                x: "50px",
                opacity: 0,
                duration: 0.66,
            },
            "<"
        )
        .from(getDom(introThumbDom, "main-card"), {
            background: "rgba(239, 252, 245, 0)",
        })
        .from(getDom(introThumbDom, "shadow-card"), {
            opacity: 0,
            rotateZ: 0,
        })
        .from(
            getDom(introThumbDom, "intro-btn"),
            {
                y: "30px",
                opacity: 0,
            },
            "<+=0.2"
        );
    getSingleAD({ type: "teachers_img" }).then((res) => {
        introTeacherThumb.value = res.data.img;
    });
});
</script>
<style lang="scss" module>
.teacher-intro {
    overflow: hidden;
    .module-header {
        font-size: 36px;

        position: relative;

        margin-bottom: em(66px, 36px);
        padding-top: em(42px, 36px);
        &::after {
            position: absolute;
            bottom: em(-24px, 36px);
            left: 0;

            width: em(320px, 36px);
            height: em(21px, 36px);

            content: "";

            background-image: url("@/assets/images/teacher/vector.png");
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
    .module-title {
        font-weight: 700;
        line-height: em(44px, 36px);

        position: relative;

        display: inline-block;

        margin-bottom: em(13px, 36px);

        color: #2d2b32;
    }
    .module-subtitle {
        font-size: em(20px, 36px);

        color: #2d2b32;
    }
    .module-desc {
        font-size: 14px;
        line-height: em(32px, 14px);

        width: 575px;

        color: #777;
    }
    .intro-list {
        font-size: 13px;
        line-height: 20px;

        margin-top: 30px;

        color: #777;
        :global(.ic) {
            font-size: 20px;
            line-height: 1;

            margin-right: 12px;

            color: #8b75ff;
        }
        .intro-item {
            @include space-between(20px, "y");
        }
    }
    .intro-thumb {
        position: relative;

        padding-right: 111px;
        .intro-btn {
            @include image-placeholder(174px, 133px);
            position: absolute;
            z-index: 20;
            top: percent(332px, 512px);
            left: percent(416px, 448px);

            width: percent(174px, 448px);
        }
        .img-box {
            @include image-placeholder(448px, 512px);
            overflow: visible;

            perspective: 3000px;
            transform-style: preserve-3d;
        }
        .main-card {
            @include ab-cover;
            z-index: 10;

            border-radius: 16px;
            background-color: #effcf5;
        }
        .shadow-card {
            @include ab-cover;

            border-radius: 16px;
            &:nth-child(1) {
                z-index: 4;
                top: 50px;

                transform: rotateZ(-5deg);
                transform-origin: left bottom;

                background-color: #fceecc;
            }
            &:nth-child(2) {
                z-index: 4;
                top: 50px;

                transform: rotateZ(5deg);
                transform-origin: right bottom;

                background-color: #e2e6fa;
            }
            &:nth-child(3) {
                top: 70px;

                transform: rotateZ(-10deg);
                transform-origin: left bottom;

                background-color: #e4f0ff;
            }
            &:nth-child(4) {
                top: 70px;

                transform: rotateZ(10deg);
                transform-origin: right bottom;

                background-color: #e4f0ff;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-header {
            font-size: 34px;
        }
        .module-desc {
            width: 440px;
        }
        .intro-thumb {
            padding-top: 20px;
            padding-right: 80px;
            .img-box {
                width: 380px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .module-header {
            font-size: 30px;

            margin-bottom: em(56px, 36px);
        }
        .module-desc {
            width: 400px;
        }
        .intro-thumb {
            padding-top: 45px;
            padding-right: 60px;
            // padding-right: 80px;
            .img-box {
                width: 320px;
            }
        }
        .intro-list {
            margin-top: 20px;
        }
    }
    @include media-breakpoint-down(lg) {
        .module-desc {
            width: 100%;
        }
        .intro-thumb {
            padding: 50px 60px 0;
            padding-top: 100px;
            .img-box {
                width: 320px;
                margin: 0 auto;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .intro-thumb {
            padding-top: 80px;
            .img-box {
                width: 280px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        overflow: hidden;
        .module-title {
            font-size: 24px;
        }
        .intro-thumb {
            padding-top: 50px;
            .img-box {
                width: 240px;
            }
        }
    }
}
.intro-msg-list {
    margin-top: 120px;

    gap: 40px;
    .intro-msg-item {
        position: relative;

        overflow: hidden;

        padding: 75px 80px;

        border-radius: 12px;
        .bg {
            @include ab-cover;
            background-repeat: no-repeat;
            background-position: right bottom;
            background-size: cover;
        }
        .item-head {
            margin-bottom: 45px;
        }
        .icon {
            @include image-placeholder(80px, 80px);
            margin-right: 25px;
        }
        .item-title {
            font-size: 24px;
            font-weight: 700;
            line-height: 200%;

            margin-bottom: -1px;

            color: #2d2b32;
        }
        .item-subtitle {
            font-size: 16px;
            font-weight: 500;
            line-height: em(30px, 16px);

            padding-bottom: 8px;

            color: #2d2b32;
        }
        .item-desc {
            font-size: 14px;
            font-weight: 500;
            line-height: em(30px, 14px);

            color: #777;
        }
        &:nth-child(1) {
            background-color: #eefcf4;
        }
        &:nth-child(2) {
            background-color: rgb(190 178 255 / 0.2);
        }
        &:nth-child(3) {
            background-color: rgb(228 240 255 / 0.5);
        }
        &:nth-child(4) {
            background-color: #fef6e1;
        }
    }
    @include media-breakpoint-down(xxxl) {
        margin-top: 100px;
        .intro-msg-item {
            padding: 55px 60px;
            .item-head {
                margin-bottom: 35px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .intro-msg-item {
            padding: 50px 60px;
            .bg {
                background-position: bottom right;
                background-size: 600px auto;
            }
            .icon {
                @include image-placeholder(65px, 65px);
                margin-right: 20px;
            }
            .item-head {
                margin-bottom: 30px;
            }
            .item-title {
                font-size: 20px;
            }
            .item-subtitle {
                font-size: 14px;
            }
            .item-desc {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        gap: 30px;
        .intro-msg-item {
            padding: 50px 60px;
            .bg {
                transform: translateX(10px);

                background-position: bottom right;
                background-size: 600px auto;
            }
            .icon {
                margin-bottom: 20px;
            }
            .item-head {
                margin-bottom: 10px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        gap: 20px;
        .intro-msg-item {
            padding: 40px 40px 45px;
            .bg {
                transform: translateX(10%);

                background-position: bottom right;
                background-size: 150% auto;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .intro-msg-item {
            padding: 50px 60px 60px;
            .bg {
                transform: translateX(-6%) translateY(-20px);

                background-position: top right;
                background-size: 400px auto;
            }
            .icon {
                margin-bottom: 20px;
            }
            .item-head {
                margin-bottom: 10px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .intro-msg-item {
            padding: 40px 30px 50px;
            .bg {
                transform: translateX(0%) translateY(-20px);

                background-position: top right;
                background-size: 400px auto;
            }
        }
    }
}
:global(.lang-en) {
    .teacher-intro {
        .module-title {
            //
        }
        @include media-breakpoint-down(xxxl) {
            .module-header {
                font-size: 33px;
            }
            .intro-thumb {
                padding-right: 100px;
                .img-box {
                    width: 400px;
                }
            }
        }
        @include media-breakpoint-down(xxl) {
            .module-header {
                font-size: 28px;
            }
            .intro-thumb {
                padding-right: 80px;
                .img-box {
                    width: 380px;
                }
            }
            .module-desc {
                font-size: 14px;

                width: 470px;
            }
        }
        @include media-breakpoint-down(xl) {
            .intro-block {
                display: block;
            }
            .module-desc {
                width: 100%;
            }
            .intro-thumb {
                padding: 0;
                padding-top: 50px;
                .img-box {
                    margin: 0 auto;
                }
            }
        }
        @include media-breakpoint-down(lg) {
            .intro-thumb {
                padding-top: 60px;
                .img-box {
                    width: 300px;
                }
            }
        }
        @include media-breakpoint-down(md) {
            .intro-thumb {
                .img-box {
                    width: 280px;
                }
            }
        }
        @include media-breakpoint-down(sm) {
            .module-header {
                font-size: 26px;

                padding-top: 60px;
            }
            .module-desc {
                font-size: 13px;
            }
            .intro-thumb {
                padding-top: 40px;
                .img-box {
                    width: 240px;
                }
            }
        }
    }
    .intro-msg-list {
        .intro-msg-item {
            .item-title {
                font-size: 23px;
            }
            .item-subtitle {
                font-size: 15px;
            }
        }
        @include media-breakpoint-down(xxl) {
            .intro-msg-item {
                padding: 40px;
                .item-title {
                    font-size: 22px;
                }
                .item-subtitle {
                    font-size: 13px;
                    line-height: 1.6;
                }
                .item-desc {
                    font-size: 13px;
                    line-height: 1.6;
                }
            }
        }
        @include media-breakpoint-down(xl) {
            .intro-msg-item {
                .item-desc {
                    padding-top: 13px;

                    border-top: 1px solid rgb(0 0 0 / 6%);
                }
            }
        }
        @include media-breakpoint-down(lg) {
            .intro-msg-item {
                padding: 40px 40px 60px;
                .item-title {
                    font-size: 20px;
                }
            }
        }
        @include media-breakpoint-down(sm) {
            .intro-msg-item {
                padding: 40px 30px 50px;
                .item-subtitle {
                    line-height: 2;
                }
                .item-desc {
                    line-height: 2;
                }
            }
        }
    }
}
</style>
