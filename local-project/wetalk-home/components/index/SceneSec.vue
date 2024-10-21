<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-12-28 17:49:01
-->
<template>
    <div class="scene-item">
        <div class="layer--scene scene--02">
            <div class="layer--el layer-beijing">
                <div class="img-beijing">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.02"
                        data-invert-x="false"
                        src="@/assets/images/home/02/beijing.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div
                class="layer--el layer-taiyang flex justify-center items-start"
            >
                <div class="img-taiyang">
                    <nuxt-img
                        src="@/assets/images/home/02/taiyang.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-ren1 flex items-end justify-center">
                <div class="img-ren1">
                    <nuxt-img src="@/assets/images/home/02/ren1.png" alt="" />
                </div>
            </div>
            <div class="layer--el layer-ren2 flex items-end justify-center">
                <div class="img-ren2">
                    <nuxt-img src="@/assets/images/home/02/ren2.png" alt="" />
                </div>
            </div>
            <div
                class="layer--el layer-chengqiang flex items-end justify-center"
            >
                <div class="img-chengqiang">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.1"
                        src="@/assets/images/home/02/chengqiang.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-you">
                <div class="img-you">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.02"
                        src="@/assets/images/home/02/you.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-zuo">
                <div class="img-zuo">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.02"
                        src="@/assets/images/home/02/zuo.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-beijing01">
                <div class="img-beijing01">
                    <div class="img-box flex justify-center items-end">
                        <nuxt-img
                            class="parallax-layer"
                            data-depth="0.2"
                            src="@/assets/images/home/02/beijing01.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="layer--el layer-beijing02">
                <div class="img-beijing02">
                    <div class="img-box flex justify-center items-end">
                        <nuxt-img
                            class="parallax-layer"
                            data-depth="0.25"
                            src="@/assets/images/home/02/beijing02.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="layer--el layer-wenzi flex items-center justify-center">
                <div class="img-wenzi">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.2"
                        src="@/assets/images/home/02/wenzi.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-info flex items-end justify-center">
                <div class="info--container flex justify-center">
                    <div class="info--box">
                        <div class="info-bg"></div>
                        <div
                            class="scene-intro"
                            v-html="$t('KEY_PAGE_INDEX.SCENE_SEC.INTRO')"
                        ></div>
                        <div class="img-tansuo" @click="openNews">
                            <div class="box box-text">
                                <nuxt-img :src="TANSUO_IMG" alt="" />
                            </div>
                            <div class="box box-juanzou">
                                <div class="tansuo-left"></div>
                                <div class="tansuo-center"></div>
                                <div class="tansuo-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, useContext } from "@nuxtjs/composition-api";

const zhImg = require("@/assets/images/home/tansuo-text.png");
const enImg = require("@/assets/images/home/tansuo-text-en.png");

const { i18n } = useContext();

const TANSUO_IMG = computed(() => {
    let result = zhImg;
    if (i18n.localeProperties.code === "en") {
        result = enImg;
    }
    return result;
});

const emit = defineEmits<{
    (e: "openNews"): void;
}>();

function openNews() {
    emit("openNews");
}
</script>
<style lang="scss">
// 固定图片比例站位
@mixin image-placeholder(
    $width,
    $height,
    $position: relative,
    $type: 0,
    $size: 0
) {
    @if ($position !=none) {
        position: $position;
    }
    @if ($size != 0) {
        width: $size;
    } @else {
        width: $width;
    }
    & > img {
        @if ($type == "fit") {
            width: 100%;
            height: 100%;

            object-fit: cover;
            object-position: center;
        } @else {
            width: 100%;
        }
        position: absolute;
        top: 0;
        left: 0;
    }
    &::after {
        display: block;

        width: 100%;
        padding-top: percent($height, $width);

        content: "";
    }
}
.scene--02 {
    overflow: hidden;
    .layer-beijing {
        display: flex;

        justify-content: center;
        img {
            left: 0;

            flex: 0 0 auto;

            width: 100vw;
            max-width: initial;
        }
    }
    .img-beijing02 {
        position: absolute;
        bottom: 0;
        left: 0;

        display: flex;

        width: 100%;

        justify-content: center;
        .img-box {
            @include image-placeholder(1920px, 542px);

            width: em(1920px, 100px);
            img {
                position: static !important;

                flex: 0 0 auto;

                width: 180%;
                max-width: initial;
            }
        }
    }
    .img-beijing01 {
        position: absolute;
        bottom: 0;
        left: 0;

        display: flex;

        width: 100%;

        justify-content: center;
        .img-box {
            @include image-placeholder(1920px, 711px);

            width: em(1920px, 100px);
            img {
                position: static !important;

                flex: 0 0 auto;

                width: 158%;
                max-width: initial;
            }
        }
    }
    .img-zuo {
        @include image-placeholder(684px, 539px, $position: absolute);
        top: 0;
        left: 0;

        width: em(684px, 100px);
    }
    .img-you {
        @include image-placeholder(608px, 544px, $position: absolute);
        top: 0;
        right: 0;

        width: em(608px, 100px);
    }
    .img-taiyang {
        @include image-placeholder(459px, 468px);
        width: em(459px, 100px);

        transform: translateY(em(130px, 100px));
    }
    .img-wenzi {
        @include image-placeholder(641px, 324px);
        width: em(641px, 100px);
    }
    .img-chengqiang {
        @include image-placeholder(638px, 379px);
        width: em(638px, 100px);

        transform: translateY(em(-135px, 100px));

        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-ren1 {
        @include image-placeholder(421px, 737px);
        overflow: visible !important;

        width: em(421px, 100px);

        transform: translateX(em(-258px, 100px)) translateY(em(-103px, 100px));

        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-ren2 {
        @include image-placeholder(415px, 714px);
        overflow: visible !important;

        width: em(415px, 100px);

        transform: translateX(em(272px, 100px)) translateY(em(-103px, 100px));

        perspective: 3000px;
        transform-style: preserve-3d;
    }
    @include media-breakpoint-down(xxxl) {
        font-size: min(100px, 9vh);
    }
    @include media-breakpoint-down(xxl) {
        font-size: min(100px, 8vh);
        .layer-beijing {
            height: 100%;
            img {
                height: 100%;

                object-fit: cover;
            }
        }
        .img-taiyang {
            top: em(20px, 100px);

            width: em(380px, 100px);
        }
        .img-ren1 {
            font-size: em(96px, 100px);
        }
        .img-ren2 {
            font-size: em(96px, 100px);
        }
        .img-chengqiang {
            font-size: em(96px, 100px);
        }
        .img-zuo {
            font-size: em(90px, 100px);
        }
        .img-you {
            font-size: em(90px, 100px);
        }
    }
    @include media-breakpoint-down(xxl) {
        @media (orientation: portrait) {
            .img-wenzi {
                width: em(400px, 100px);
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        @media (orientation: portrait) {
            .img-zuo {
                font-size: em(70px, 100px);
            }
            .img-you {
                font-size: em(70px, 100px);
            }
            .img-ren1 {
                transform: translateX(em(-258px, 100px))
                    translateY(em(-203px, 100px));
            }
            .img-ren2 {
                transform: translateX(em(272px, 100px))
                    translateY(em(-203px, 100px));
            }
            .img-beijing02 {
                .img-box {
                    img {
                        width: 280%;
                    }
                }
            }
            .img-beijing01 {
                .img-box {
                    img {
                        width: 258%;
                    }
                }
            }
        }
    }
    @include media-breakpoint-down(lg) {
        @media (orientation: portrait) {
            .img-zuo {
                font-size: em(60px, 100px);
            }
            .img-you {
                font-size: em(60px, 100px);
            }
            .img-wenzi {
                width: em(544px, 100px);
            }
            .img-ren1 {
                font-size: em(86px, 100px);

                transform: translateX(em(-258px, 100px))
                    translateY(em(-303px, 100px));
            }
            .img-ren2 {
                font-size: em(86px, 100px);

                transform: translateX(em(272px, 100px))
                    translateY(em(-303px, 100px));
            }
            .img-chengqiang {
                font-size: em(86px, 100px);

                transform: translateY(em(-155px, 100px));
            }
            .img-beijing02 {
                .img-box {
                    img {
                        width: 380%;
                    }
                }
            }
            .img-beijing01 {
                .img-box {
                    bottom: em(25px, 100px);
                    img {
                        width: 258%;
                    }
                }
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @media (orientation: portrait) {
            .img-zuo {
                font-size: em(50px, 100px);
            }
            .img-you {
                font-size: em(50px, 100px);
            }
            .img-ren1 {
                font-size: em(90px, 100px);

                transform: translateX(em(-208px, 100px))
                    translateY(em(-203px, 100px));
            }
            .img-ren2 {
                font-size: em(90px, 100px);

                transform: translateX(em(222px, 100px))
                    translateY(em(-203px, 100px));
            }
            .img-wenzi {
                top: em(-50px, 100px);

                width: em(450px, 100px);
                max-width: 86%;
            }
            .img-chengqiang {
                font-size: em(76px, 100px);

                transform: translateY(em(-125px, 100px));
            }
            .info--box {
                font-size: 20px;

                bottom: em(68px, 22px);

                width: 300px;
                .info-bg {
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 70%;
                }
                .scene-intro {
                    font-size: 12px;
                    line-height: 1.8;
                }
                p {
                    display: inline;
                }
            }
        }
    }
}
</style>
