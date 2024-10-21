<!--
 * @Description: 真科学 课程特色
 * @Author: F-Stone
 * @LastEditTime: 2023-01-04 15:47:54
-->
<template>
    <div :class="$style['science-course-feature']">
        <div class="wrapper--limit-width">
            <div
                :class="$style['module-container']"
                class="wrapper--limit-width-mini flex justify-between lg:block"
            >
                <div class="state-pos--left">
                    <div :class="$style['wrapper--module-info']">
                        <ModuleHeader
                            :title="$t('KEY_PAGE_SCIENCE.FEATURE.TITLE')"
                            :class="$style['module-header']"
                            :desc="$t('KEY_PAGE_SCIENCE.FEATURE.DESC')"
                        />
                        <div :class="$style['module-body']">
                            <div :class="$style['intro-list']">
                                <div
                                    v-for="(item, index) in introList"
                                    :key="index"
                                    :class="$style['intro-item']"
                                    class="flex items-center wow animate__fadeInUp-50"
                                >
                                    <i
                                        class="ic iconfont icon-fill-circle-right"
                                    ></i>
                                    <span class="text">{{ $t(item) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="state-pos--right flex justify-end lg:justify-center"
                >
                    <div
                        :class="$style['thumb-wrapper']"
                        class="flex justify-end"
                    >
                        <div
                            ref="thumbBox"
                            :class="$style['thumb-box']"
                            class="flex-shrink-0 wow-group-3"
                        >
                            <div :class="$style['img-box']">
                                <nuxt-img
                                    src="@/assets/images/science/card-1.png"
                                    alt=""
                                />
                            </div>
                            <div :class="$style['img-box']">
                                <nuxt-img
                                    src="@/assets/images/science/card-2.png"
                                    alt=""
                                />
                            </div>
                            <div :class="$style['img-box']">
                                <nuxt-img
                                    src="@/assets/images/science/card-3.png"
                                    alt=""
                                />
                            </div>
                            <div :class="$style['thumb-bg']"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, useCssModule } from "vue";

const introList = [
    "KEY_PAGE_SCIENCE.FEATURE.LIST[0]",
    "KEY_PAGE_SCIENCE.FEATURE.LIST[1]",
    "KEY_PAGE_SCIENCE.FEATURE.LIST[2]",
];
const thumbBox = ref<HTMLElement | null>(null);
const $sn = useCssModule();
onMounted(() => {
    const dom = thumbBox.value;
    gsap.timeline({
        scrollTrigger: {
            trigger: dom,
            start: "top center",
        },
    })
        .from($(dom!).find("." + $sn["thumb-bg"]), {
            opacity: 0,
            rotateY: 0,
        })
        .from($(dom!).find("." + $sn["img-box"]), {
            y: "50%",
            stagger: 0.1,
            opacity: 0,
        });
});
</script>
<style lang="scss" module>
.science-course-feature {
    .module-container {
        :global(.state-pos--right) {
            width: 40%;
        }
    }
    .intro-list {
        margin-top: 74px;
    }
    .intro-item {
        @include space-between(em(35px, 18px), "y");
        font-size: 18px;
        font-weight: 400;
        line-height: em(34px, 18px);

        color: #191a15;
        :global(.ic) {
            font-size: em(30px, 18px);

            margin-right: em(13px, 30px);

            color: #0aca91;
        }
    }
    .thumb-wrapper {
        flex: 0 0 auto;

        width: 182.751877775544%;
        padding-top: 38px;
        padding-right: 80px;
    }
    .thumb-box {
        @include space-placeholder(920px, 535px);
        position: relative;

        width: 100%;

        perspective: 2000px;
        transform-style: preserve-3d;
        .img-box {
            position: absolute;

            overflow: hidden;

            width: percent(285px, 920px);

            border-radius: 12.2371px;
            box-shadow: 0 9.78967px 67.304px rgb(155 162 173 / 0.17);
            &:nth-child(1) {
                top: percent(-20px, 535px);
                right: percent(272px, 920px);
            }
            &:nth-child(2) {
                top: percent(275px, 535px);
                right: percent(272px, 920px);
            }
            &:nth-child(3) {
                top: 50%;
                right: percent(-52px, 920px);

                transform: translateY(-50%);
            }
        }
    }
    .thumb-bg {
        @include ab-cover;

        transform: rotateY(-45deg);
        transform-origin: right;

        border-radius: 29.369px;
        background: linear-gradient(
            231.52deg,
            rgb(10 202 145 / 0.56) 1.53%,
            rgb(10 202 145 / 0) 100.04%
        );
    }
    .wrapper--module-info {
        width: 523px;
    }
    @include media-breakpoint-down(xxxl) {
        .intro-item {
            font-size: 16px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .wrapper--module-info {
            width: 460px;
        }
        .thumb-wrapper {
            padding-top: 30px;
            padding-right: 64px;
        }
        .intro-list {
            margin-top: 64px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-container {
            :global(.state-pos--right) {
                width: 36%;
            }
        }
        .wrapper--module-info {
            width: 410px;
            padding-top: 18px;
        }
        .intro-list {
            margin-top: 50px;
        }
        .intro-item {
            font-size: 14px;

            margin-bottom: 16px;
        }
    }
    @include media-breakpoint-down(lg) {
        overflow: hidden;
        .module-container {
            :global(.state-pos--right) {
                width: 50%;
                margin: 0 auto;
                margin-top: 50px;
            }
        }
        .wrapper--module-info {
            width: 100%;
        }
        .thumb-wrapper {
            transform: translateX(-10%);
        }
    }
    @include media-breakpoint-down(sm) {
        .module-container {
            :global(.state-pos--right) {
                width: 80%;
                margin-top: 30px;
            }
        }
    }
}
:global(.lang-en) {
    .science-course-feature {
        .intro-item {
            font-size: 16px;
            line-height: 1.6;

            align-items: flex-start;
            :global(.ic) {
                transform: translateY(2px);
            }
        }
        .intro-list {
            margin-top: 54px;
        }
        @include media-breakpoint-down(xxl) {
            .module-desc {
                font-size: 13px;
            }
            .intro-item {
                @include space-between(em(28px, 18px), "y");
                font-size: 14px;

                align-items: flex-start;
                :global(.ic) {
                    transform: translateY(2px);
                }
            }
        }
    }
}
</style>
