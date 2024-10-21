<!--
    * @Description:
    * @Author: F-Stone
 * @LastEditTime: 2022-12-28 17:53:24
   -->
<template>
    <div class="scene-item">
        <div data-index="05" class="layer--scene scene--05">
            <div class="layer--el layer-beijing">
                <div class="img-beijing">
                    <nuxt-img
                        src="@/assets/images/home/05/beijing.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-xiaoniao1">
                <div class="img-xiaoniao1">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.05"
                        src="@/assets/images/home/05/xiaoniao1.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-xiaoniao2">
                <div class="img-xiaoniao2">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.05"
                        src="@/assets/images/home/05/xiaoniao2.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-shu flex justify-center items-center">
                <div class="img-shu parallax-layer" data-depth="0.1">
                    <nuxt-img src="@/assets/images/home/05/shu01.png" alt="" />
                    <!--  -->
                    <nuxt-img src="@/assets/images/home/05/shu02.png" alt="" />
                    <!--  -->
                    <nuxt-img src="@/assets/images/home/05/shu03.png" alt="" />
                    <!--  -->
                    <nuxt-img src="@/assets/images/home/05/shu04.png" alt="" />
                    <!--  -->
                    <nuxt-img src="@/assets/images/home/05/shu05.png" alt="" />
                </div>
            </div>
            <div class="layer--el layer-wenzi flex items-center justify-center">
                <div class="img-wenzi">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.25"
                        src="@/assets/images/home/05/wenzi.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-niao1">
                <div class="img-niao1">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.2"
                        src="@/assets/images/home/05/niao1.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-niao2">
                <div class="img-niao2">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.3"
                        src="@/assets/images/home/05/niao2.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-dian flex items-center justify-center">
                <div class="img-dian">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.03"
                        src="@/assets/images/home/05/dian.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-mask">
                <div class="img-mask-top">
                    <nuxt-img
                        src="@/assets/images/home/05/mask-top.png"
                        alt=""
                    />
                </div>
                <div class="img-mask-bottom">
                    <nuxt-img
                        src="@/assets/images/home/05/mask-bottom.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-info flex items-end justify-center">
                <div class="info--container flex justify-center">
                    <div class="info--box">
                        <div class="info-bg"></div>
                        <div class="scene-intro hidden">
                            <p>
                                <br />
                            </p>
                        </div>
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
.scene--05 {
    // background-color: #00002e;
    .img-beijing {
        @include image-placeholder(1920px, 2250px);
        top: calc(50% - em(2070px, 100px));
        left: 50%;

        width: max(100vw, em(2460px, 100px));

        transform: translateX(-50%);
        img {
            height: 100%;

            object-fit: cover;
        }

        // justify-content: center;
        // img {
        //     flex: 0 0 auto;

        //     width: 100vw;
        //     max-width: initial;
        // }
    }
    .img-shu {
        @include image-placeholder(890px, 670px);
        position: relative !important;

        width: em(890px, 100px);
    }
    .layer-niao1 {
        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-niao1 {
        @include image-placeholder(654px, 661px, $position: absolute);
        bottom: calc(50% - em(170px, 100px));
        left: calc(50% + em(290px, 100px));

        width: em(654px, 100px);
    }
    .layer-niao2 {
        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-niao2 {
        @include image-placeholder(666px, 707px, $position: absolute);
        top: calc(50% - em(190px, 100px));
        right: calc(50% + em(290px, 100px));

        width: em(666px, 100px);
    }
    .layer-xiaoniao1 {
        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-xiaoniao1 {
        @include image-placeholder(132px, 285px, $position: absolute);
        right: calc(50% + em(360px, 100px));
        bottom: calc(50% + em(200px, 100px));

        width: em(132px, 100px);
    }
    .layer-xiaoniao2 {
        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-xiaoniao2 {
        @include image-placeholder(281px, 140px, $position: absolute);
        top: calc(50% + em(90px, 100px));
        left: calc(50% + em(360px, 100px));

        width: em(281px, 100px);
    }
    .layer-dian {
        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-dian {
        @include image-placeholder(1890px, 1000px);

        width: em(1755px, 100px);
    }
    .img-mask-top {
        @include image-placeholder(1920px, 308px, $position: absolute);
        top: 0;
        left: 0;

        // width: em(1920px, 100px);
        width: 100vw;
    }
    .img-mask-bottom {
        @include image-placeholder(1888px, 303px, $position: absolute);
        bottom: 0;
        left: 0;

        // width: em(1920px, 100px);
        width: 100vw;
    }
    .img-wenzi {
        @include image-placeholder(1124px, 552px);
        width: em(562px, 100px);
    }
    @include media-breakpoint-down(xxxl) {
        font-size: min(100px, 9vh);
    }
    @include media-breakpoint-down(xxl) {
        font-size: min(100px, 8vh);
        .img-beijing {
            top: calc(50% - em(1280px, 100px));

            width: max(100vw, em(1620px, 100px));
        }
        .img-shu {
            font-size: em(76px, 100px);
        }
        .img-wenzi {
            width: em(400px, 100px);
        }
        .img-niao1 {
            width: em(560px, 100px);
        }
        .img-niao2 {
            width: em(556px, 100px);
        }
    }
    @include media-breakpoint-down(xl) {
        @media (orientation: portrait) {
            font-size: min(100px, 8vh);
            .img-beijing {
                top: calc(50% - em(1080px, 100px));

                width: max(100vw, em(1520px, 100px));
            }
            .img-shu {
                font-size: em(56px, 100px);
            }
            .img-wenzi {
                width: em(364px, 100px);
            }
            .img-niao1 {
                bottom: calc(50% - em(10px, 100px));
                left: calc(50% + em(100px, 100px));

                width: em(454px, 100px);
            }
            .img-niao2 {
                top: calc(50% - em(10px, 100px));
                right: calc(50% + em(20px, 100px));

                width: em(466px, 100px);
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .img-niao1 {
            bottom: calc(50% - em(170px, 100px));
            left: calc(50% + em(190px, 100px));
        }
        .img-niao2 {
            top: calc(50% - em(190px, 100px));
            right: calc(50% + em(190px, 100px));
        }
    }
    @include media-breakpoint-down(lg) {
        @media (orientation: portrait) {
            .img-beijing {
                top: calc(50% - em(1380px, 100px));

                width: max(100vw, em(1820px, 100px));
            }
            .img-wenzi {
                width: em(440px, 100px);
            }
            .img-shu {
                font-size: em(70px, 100px);
            }
            .img-niao1 {
                left: calc(50% + em(90px, 100px));

                width: em(604px, 100px);
            }
            .img-niao2 {
                right: calc(50% + em(90px, 100px));

                width: em(566px, 100px);
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @media (orientation: portrait) {
            .img-beijing {
                top: calc(50% - em(1260px, 100px));

                width: max(100vw, em(1620px, 100px));
            }
            .img-shu {
                font-size: em(62px, 100px);
            }
            .img-wenzi {
                top: em(-10px, 100px);

                width: em(450px, 100px);
                max-width: 86%;
            }
            .layer-info {
                .info--box {
                    transform: translateY(em(68px, 22px));
                }
            }
            .img-niao1 {
                bottom: calc(50% - em(60px, 100px));
                left: calc(50% - em(140px, 100px));

                width: em(540px, 100px);
            }
            .img-niao2 {
                top: calc(50% - em(30px, 100px));
                right: calc(50% - em(20px, 100px));

                width: em(526px, 100px);
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
