<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-12-28 17:48:12
-->
<template>
    <div class="scene-item">
        <div class="layer--scene scene--03">
            <div class="layer--el layer-beijing">
                <div class="img-beijing">
                    <nuxt-img
                        src="@/assets/images/home/03/beijing.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-yuan flex justify-center items-center">
                <div class="img-yuan">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.02"
                        src="@/assets/images/home/03/yuan.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-taiji flex justify-center items-center">
                <div class="img-taiji">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.06"
                        src="@/assets/images/home/03/taiji.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-mask flex justify-center items-center">
                <div class="img-mask">
                    <nuxt-img src="@/assets/images/home/03/mask.png" alt="" />
                </div>
            </div>
            <div class="layer--el layer-yu">
                <div class="img-yu">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.35"
                        src="@/assets/images/home/03/yu.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-niao">
                <div class="img-niao">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.3"
                        src="@/assets/images/home/03/niao.png"
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
                            src="@/assets/images/home/03/beijing01.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="layer--el layer-guang">
                <div class="img-guang">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.3"
                        src="@/assets/images/home/03/guang.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-guang2">
                <div class="img-guang2">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.2"
                        src="@/assets/images/home/03/guang2.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-wenzi flex items-center justify-center">
                <div class="img-wenzi">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.1"
                        src="@/assets/images/home/03/wenzi.png"
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
                            v-html="$t('KEY_PAGE_INDEX.SCENE_THIRD.INTRO')"
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
.scene--03 {
    perspective: 3000px;
    perspective-origin: center center;
    transform-style: preserve-3d;
    .layer-beijing {
        display: flex;

        justify-content: center;
        img {
            flex: 0 0 auto;

            width: 100vw;
            max-width: initial;
            height: 100%;

            object-fit: cover;
        }
    }
    .img-beijing01 {
        @include image-placeholder(3800px, 260px, $position: absolute);
        bottom: 0;
        left: 0;

        // width: em(3800px, 100px);
        width: 100%;
        .img-box {
            @include ab-cover();
        }
        img {
            position: static !important;

            flex: 0 0 auto;

            width: 206%;
            max-width: initial;
        }
    }
    .img-niao {
        @include image-placeholder(826px, 536px, $position: absolute);
        right: calc(50% - em(23px, 100px));
        bottom: calc(50% - em(143px, 100px));

        width: em(826px, 100px);
    }
    .img-yu {
        @include image-placeholder(570px, 438px, $position: absolute);
        top: calc(50% - em(75px, 100px));
        left: calc(50% + em(115px, 100px));

        width: em(570px, 100px);
    }
    .img-taiji {
        @include image-placeholder(260px, 258px);

        width: em(260px, 100px);
    }
    .img-yuan {
        @include image-placeholder(1024px, 933px);
        width: em(1024px, 100px);
    }
    .img-guang {
        @include image-placeholder(1178px, 530px, $position: absolute);
        bottom: 0;
        left: 0;

        width: em(1178px, 100px);
    }
    .img-guang2 {
        @include image-placeholder(1920px, 1000px, $position: absolute);
        bottom: 0;
        left: 0;

        width: em(1920px, 100px);
    }
    .img-wenzi {
        @include image-placeholder(1268px, 628px);
        width: em(634px, 100px);
    }
    .img-mask {
        @include image-placeholder(685px, 685px);
        width: em(342.5px, 100px);
    }
    @include media-breakpoint-down(xxxl) {
        font-size: min(100px, 9vh);
    }
    @include media-breakpoint-down(xxl) {
        font-size: min(100px, 8vh);
        .img-niao {
            right: calc(50% - em(123px, 100px));
            bottom: calc(50% + em(43px, 100px));

            width: em(726px, 100px);
        }
        .img-yu {
            top: calc(50% + em(65px, 100px));
            left: calc(50% + em(15px, 100px));

            width: em(470px, 100px);
        }
    }
    @include media-breakpoint-down(xxl) {
        @media (orientation: portrait) {
            .img-wenzi {
                width: em(400px, 100px);
            }
        }
    }
    @include media-breakpoint-down(lg) {
        @media (orientation: portrait) {
            .img-wenzi {
                width: em(544px, 100px);
            }
            .img-niao {
                right: calc(50% - em(123px, 100px));
                bottom: calc(50% + em(73px, 100px));

                width: em(626px, 100px);
            }
            .img-yu {
                top: calc(50% + em(65px, 100px));
                left: calc(50% + em(15px, 100px));

                width: em(420px, 100px);
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @media (orientation: portrait) {
            .img-yuan,
            .img-taiji {
                font-size: em(92px, 100px);
                img {
                    max-width: initial;
                }
            }
            .img-taiji {
                min-width: em(260px, 100px);
            }
            .img-yuan {
                min-width: em(1024px, 100px);
            }
            .img-niao {
                right: calc(50% - em(123px, 100px));
                bottom: calc(50% + em(73px, 100px));

                width: em(526px, 100px);
            }
            .img-yu {
                top: calc(50% + em(105px, 100px));
                left: calc(50% - em(115px, 100px));

                width: em(420px, 100px);
            }
            .img-wenzi {
                top: em(-50px, 100px);

                width: em(450px, 100px);
                max-width: 86%;
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
