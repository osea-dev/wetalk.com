<template>
    <div :class="$style['timeline-module']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['module-body']">
                    <div :class="$style['time-history']" class="flex sm:block">
                        <div :class="$style['time-box']">
                            <div :class="$style['time']">
                                {{ $t("KEY_PAGE_ABOUT.TIMELINE.HISTORY.TIME") }}
                            </div>
                            <div :class="$style['time-title']">
                                {{
                                    $t(
                                        "KEY_PAGE_ABOUT.TIMELINE.HISTORY.TIME_TITLE"
                                    )
                                }}
                            </div>
                            <div :class="$style['time-thumb']">
                                <nuxt-img
                                    src="@/assets/images/about-us/time-0.png"
                                    alt=""
                                />
                            </div>
                            <div :class="$style['line-box']">
                                <div :class="$style['line-point']"></div>
                                <div :class="$style['line']"></div>
                            </div>
                            <div
                                :class="$style['time-intro']"
                                class="hidden sm:block"
                            >
                                <h3
                                    :class="$style['intro-title']"
                                    class="wow animate__fadeInUp-50"
                                >
                                    {{
                                        $t(
                                            "KEY_PAGE_ABOUT.TIMELINE.HISTORY.INTRO_TITLE"
                                        )
                                    }}
                                </h3>
                                <p
                                    :class="$style['intro-desc']"
                                    class="text wow animate__fadeInUp-50"
                                >
                                    {{
                                        $t(
                                            "KEY_PAGE_ABOUT.TIMELINE.HISTORY.INTRO_DESC"
                                        )
                                    }}
                                </p>
                                <div
                                    ref="swiperBody"
                                    :class="$style['intro-swiper']"
                                >
                                    <div
                                        ref="timeSwiper"
                                        class="swiper"
                                        :class="$style['time-swiper']"
                                    >
                                        <div class="swiper-wrapper wow-group-4">
                                            <div
                                                v-for="(
                                                    item, index
                                                ) in historySwiper"
                                                :key="index"
                                                class="swiper-slide wow animate__fadeInRight-30_percent"
                                                :class="$style['img-box']"
                                            >
                                                <nuxt-img :src="item" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        ref="swiperControl"
                                        class="flex justify-between items-center"
                                        :class="$style['swiper-controller']"
                                    >
                                        <div :class="$style['btn--to-left']">
                                            <i
                                                class="ic iconfont icon-arrow-left"
                                            ></i>
                                        </div>
                                        <div :class="$style['btn--to-right']">
                                            <i
                                                class="ic iconfont icon-arrow-right"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :class="$style['time-intro']" class="sm:hidden">
                            <h3
                                :class="$style['intro-title']"
                                class="wow animate__fadeInUp-50"
                            >
                                {{
                                    $t(
                                        "KEY_PAGE_ABOUT.TIMELINE.HISTORY.INTRO_TITLE"
                                    )
                                }}
                            </h3>
                            <p
                                :class="$style['intro-desc']"
                                class="text wow animate__fadeInUp-50"
                            >
                                {{
                                    $t(
                                        "KEY_PAGE_ABOUT.TIMELINE.HISTORY.INTRO_DESC"
                                    )
                                }}
                            </p>
                            <div
                                ref="swiperBody"
                                :class="$style['intro-swiper']"
                            >
                                <div
                                    ref="timeSwiper"
                                    class="swiper"
                                    :class="$style['time-swiper']"
                                >
                                    <div class="swiper-wrapper wow-group-4">
                                        <div
                                            v-for="(
                                                item, index
                                            ) in historySwiper"
                                            :key="index"
                                            class="swiper-slide wow animate__fadeInRight-30_percent"
                                            :class="$style['img-box']"
                                        >
                                            <nuxt-img :src="item" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    ref="swiperControl"
                                    class="flex justify-between items-center"
                                    :class="$style['swiper-controller']"
                                >
                                    <div :class="$style['btn--to-left']">
                                        <i
                                            class="ic iconfont icon-arrow-left"
                                        ></i>
                                    </div>
                                    <div :class="$style['btn--to-right']">
                                        <i
                                            class="ic iconfont icon-arrow-right"
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['time-feature']" class="flex sm:block">
                        <div :class="$style['time-box']">
                            <div :class="$style['time']">2001~</div>
                            <div :class="$style['time-title']">
                                {{
                                    $t(
                                        "KEY_PAGE_ABOUT.TIMELINE.FEATURE.TIME_TITLE"
                                    )
                                }}
                            </div>
                            <div :class="$style['time-thumb']">
                                <nuxt-img
                                    src="@/assets/images/about-us/time-1.png"
                                    alt=""
                                />
                            </div>
                            <div :class="$style['line-box']">
                                <div :class="$style['line-point']"></div>
                                <div :class="$style['line']"></div>
                            </div>
                            <div
                                :class="$style['time-intro']"
                                class="hidden sm:block"
                            >
                                <h3
                                    :class="$style['intro-title']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t(
                                            'KEY_PAGE_ABOUT.TIMELINE.FEATURE.INTRO_TITLE'
                                        )
                                    "
                                ></h3>
                                <p
                                    :class="$style['intro-desc']"
                                    class="text wow animate__fadeInUp-50"
                                    v-html="
                                        $t(
                                            'KEY_PAGE_ABOUT.TIMELINE.FEATURE.INTRO_DESC'
                                        )
                                    "
                                ></p>
                            </div>
                        </div>
                        <div :class="$style['time-intro']" class="sm:hidden">
                            <h3
                                :class="$style['intro-title']"
                                class="wow animate__fadeInUp-50"
                                v-html="
                                    $t(
                                        'KEY_PAGE_ABOUT.TIMELINE.FEATURE.INTRO_TITLE'
                                    )
                                "
                            ></h3>
                            <p
                                :class="$style['intro-desc']"
                                class="text wow animate__fadeInUp-50"
                                v-html="
                                    $t(
                                        'KEY_PAGE_ABOUT.TIMELINE.FEATURE.INTRO_DESC'
                                    )
                                "
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
import { onBeforeUnmount, onMounted, ref, useCssModule } from "vue";

const historySwiper: string[] = [
    require("@/assets/images/about-us/swiper-1.png"),
    require("@/assets/images/about-us/swiper-2.png"),
    require("@/assets/images/about-us/swiper-3.png"),
];

const { $Swiper } = useContext();
const $sn = useCssModule();
const timeSwiper = ref<HTMLElement | null>(null);
const swiperBody = ref<HTMLElement | null>(null);
onMounted(() => {
    const swiperBodyDom = swiperBody.value!;
    const timeSwiperDom = timeSwiper.value!;
    const swiper = new $Swiper(timeSwiperDom, {
        slidesPerView: "auto",
        speed: 600,
        grabCursor: true,
        parallax: true,
        navigation: {
            prevEl: $(swiperBodyDom).find(`.${$sn["btn--to-left"]}`)[0],
            nextEl: $(swiperBodyDom).find(`.${$sn["btn--to-right"]}`)[0],
        },
    });
    onBeforeUnmount(() => {
        swiper.destroy();
    });
});
</script>
<style lang="scss" module>
.timeline-module {
    overflow: hidden;

    padding-top: 79px;
    padding-bottom: 114px;
    .time-history {
        margin-bottom: -14px;
        .time-box {
            font-family: var(--SourceHanSerif);
            font-weight: 700;

            position: relative;
            z-index: 1;

            padding-left: 40px;
            .time {
                font-size: 18px;
                font-weight: 700;
                line-height: 200%;

                margin-bottom: -9px;

                color: #808389;
            }
            .time-title {
                font-size: 22px;
                font-weight: 700;
                font-style: normal;
                line-height: 200%;

                margin-bottom: 47px;
            }
            .time-thumb {
                @include image-placeholder(160px, 172px);
                margin-left: 28px;
            }
        }
        .line-box {
            .line {
                flex: 1 1 auto;

                width: 1px;
                height: 100px;

                background-image: linear-gradient(
                    180deg,
                    #fff 2px,
                    var(--theme-c) 2px
                );
                background-size: 1px 4px;
            }
        }
        .time-intro {
            position: relative;
            z-index: 10;

            padding-top: 137px;
            padding-bottom: 114px;
            .intro-desc {
                margin-bottom: 92px;
            }
        }
    }
    .time-feature {
        .line-box {
            .line-point {
                border-color: transparent;
                background-color: transparent;
                &::after {
                    @include circle(9px, var(--theme-c));
                    content: "";
                }
            }
        }
    }
    .line-box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;

        display: flex;
        flex-direction: column;

        width: 22px;
        padding-top: 8px;

        align-items: center;
        .line-point {
            @include circle(22px, #fff);
            position: relative;

            display: flex;
            flex: 0 0 auto;

            border: 2px solid var(--theme-c);

            align-items: center;
            justify-content: center;
            &::after {
                @include circle(12px, var(--theme-c));
                content: "";
            }
        }
    }
    .time-box {
        font-family: var(--SourceHanSerif);
        font-weight: 700;

        position: relative;

        padding-left: 40px;
        .time {
            font-size: 18px;
            font-weight: 700;
            line-height: 200%;

            margin-bottom: -9px;

            color: #808389;
        }
        .time-title {
            font-size: 22px;
            font-weight: 700;
            font-style: normal;
            line-height: 200%;

            margin-bottom: 47px;
        }
        .time-thumb {
            @include image-placeholder(160px, 172px);
            margin-left: 28px;
        }
    }
    .time-intro {
        min-width: 1px;
        margin-left: 88px;
        .intro-title {
            font-family: var(--SourceHanSerif);
            font-size: 28px;
            font-weight: 700;
            line-height: 200%;

            margin-bottom: 38px;
        }
        .intro-desc {
            font-size: 16px;
            line-height: 200%;

            max-width: 870px;
        }
    }
    .intro-swiper {
        position: relative;

        margin-left: -92px;
        .time-swiper {
            overflow: visible;
        }
        .img-box {
            @include image-placeholder(600px, 500px);
            @include space-between(20px);
            background-color: #fff;
        }
        .swiper-controller {
            position: absolute;
            z-index: 100;
            bottom: 47px;
            left: 92px;
        }
        .btn--to-left {
            margin-right: 12px;
        }
        .btn--to-right,
        .btn--to-left {
            @include circle(60px, #f7f9fa);
            display: flex;

            cursor: pointer;
            transition: 0.36s ease;

            color: rgba($green-4, 0.5);

            align-items: center;
            justify-content: center;
            &:hover {
                color: #fff;
                background-color: $green-4;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .time-intro {
            .intro-title {
                font-size: 26px;

                margin-bottom: 16px;
            }
            .intro-desc {
                font-size: 15px;
            }
        }
        .time-history {
            .time-intro {
                padding-top: 126px;
                padding-bottom: 104px;
                .intro-desc {
                    margin-bottom: 70px;
                }
            }
        }
        .intro-swiper {
            margin-left: -70px;
            .img-box {
                width: 500px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .time-intro {
            margin-left: 60px;
            .intro-title {
                font-size: 24px;

                margin-bottom: 10px;
            }
            .intro-desc {
                font-size: 14px;
            }
        }
        .time-box {
            .time-title {
                margin-bottom: 30px;
            }
            .time-thumb {
                width: 140px;
            }
        }
        .time-history {
            .time-intro {
                padding-top: 120px;
                padding-bottom: 90px;
                .intro-desc {
                    margin-bottom: 50px;
                }
            }
            .time-box {
                .time-title {
                    margin-bottom: 30px;
                }
                .time-thumb {
                    width: 140px;
                }
            }
        }
        .intro-swiper {
            margin-left: -60px;
            .img-box {
                width: 400px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .time-intro {
            margin-left: 30px;
            .intro-title {
                font-size: 20px;

                margin-bottom: 6px;
            }
            .intro-desc {
                font-size: 13px;
            }
        }
        .time-box {
            .time-title {
                font-size: 20px;

                margin-bottom: 30px;
            }
            .time-thumb {
                width: 120px;
                margin-left: 10px;
            }
            .time {
                font-size: 16px;

                white-space: nowrap;
            }
        }
        .time-history {
            .time-intro {
                padding-top: 100px;
                padding-bottom: 70px;
                .intro-desc {
                    margin-bottom: 40px;
                }
            }
            .time-box {
                .time {
                    font-size: 16px;

                    white-space: nowrap;
                }
                .time-title {
                    font-size: 20px;

                    margin-bottom: 30px;
                }
                .time-thumb {
                    width: 120px;
                    margin-left: 10px;
                }
            }
        }
        .intro-swiper {
            margin-left: -44px;
            .img-box {
                width: 290px;
            }
            .swiper-controller {
                bottom: 27px;
                left: 66px;
            }
            .btn--to-right,
            .btn--to-left {
                @include circle(50px, #f7f9fa);
            }
        }
        .line-box {
            padding-top: 6px;
        }
    }
    @include media-breakpoint-down(md) {
        .time-intro {
            margin-left: 25px;
            .intro-title {
                font-size: 18px;

                margin-bottom: 6px;
            }
            .intro-desc {
                font-size: 13px;
            }
        }
        .time-box {
            .time {
                font-size: 14px;
            }
            .time-title {
                font-size: 18px;

                margin-bottom: 20px;
            }
            .time-thumb {
                width: 110px;
                margin-left: 4px;
            }
        }
        .time-history {
            .time-intro {
                padding-top: 75px;
                padding-bottom: 60px;
                .intro-desc {
                    margin-bottom: 40px;
                }
            }
            .time-box {
                .time {
                    font-size: 14px;
                }
                .time-title {
                    font-size: 18px;

                    margin-bottom: 20px;
                }
                .time-thumb {
                    width: 110px;
                    margin-left: 4px;
                }
            }
        }
        .intro-swiper {
            margin-left: -42px;
            .img-box {
                width: 270px;
            }
            .swiper-controller {
                bottom: 24px;
                left: 50px;
            }
            .btn--to-right,
            .btn--to-left {
                @include circle(44px, #f7f9fa);
            }
        }
        .line-box {
            padding-top: 3px;
        }
    }
    @include media-breakpoint-down(sm) {
        padding-bottom: 90px;
        .time-intro {
            margin-left: 0;
            .intro-desc {
                font-size: 13px;
            }
        }
        .time-box {
            .time {
                font-size: 14px;
            }
        }
        .time-history {
            .time-intro {
                padding-top: 30px;
                .intro-desc {
                    margin-bottom: 40px;
                }
            }
        }
        .intro-swiper {
            margin-left: -0;
            .img-box {
                width: 250px;
            }
        }
        .time-feature {
            .time-thumb {
                &::after {
                    padding-top: 70px;
                }
            }
        }
    }
}
:global(.lang-en) {
    .timeline-module {
        .time-history {
            .time-box {
                /* stylelint-disable-next-line selector-max-compound-selectors */
                .time-title {
                    max-width: 188px;

                    white-space: nowrap;
                }
            }
        }
        @include media-breakpoint-down(xxl) {
            .time-box {
                .time-title {
                    font-size: 18px;
                }
            }
            .time-history {
                .time-box {
                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    .time-title {
                        font-size: 18px;

                        max-width: 188px;
                    }
                }
            }
            .time-intro {
                .intro-title {
                    font-size: 22px;
                    line-height: 1.4;
                }
                .intro-desc {
                    font-size: 14px;
                }
            }
        }
        @include media-breakpoint-down(xl) {
            .time-box {
                .time-thumb {
                    margin: 0;
                }
            }
            .time-history {
                .time-box {
                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    .time-title {
                        max-width: 168px;
                    }
                }
            }
            .time-intro {
                .intro-title {
                    font-size: 20px;

                    margin-bottom: 1em;
                }
                .intro-desc {
                    font-size: 13px;
                }
            }
        }
        @include media-breakpoint-down(lg) {
            .time-history {
                .time-box {
                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    .time-title {
                        max-width: 120px;
                    }
                }
            }
        }
        @include media-breakpoint-down(md) {
            .time-box {
                .time-title {
                    font-size: 17px;
                }
            }
            .time-history {
                .time-box {
                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    .time-title {
                        font-size: 17px;

                        max-width: 110px;
                    }
                }
            }
        }
        @include media-breakpoint-down(sm) {
            .time-intro {
                .intro-title {
                    font-size: 18px;
                }
            }
        }
    }
}
</style>
