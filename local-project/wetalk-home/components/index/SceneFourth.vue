<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-03-09 15:05:51
-->

<template>
    <div class="scene-item">
        <div data-index="04" class="layer--scene scene--04">
            <div
                class="layer--el layer-beijing flex items-center justify-center"
            >
                <div class="img-beijing">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.02"
                        src="@/assets/images/home/04/beijing.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-1 flex items-center justify-center">
                <div class="img-1">
                    <nuxt-img src="@/assets/images/home/04/1.png" alt="" />
                </div>
            </div>
            <div class="layer--el layer-dian flex items-start justify-center">
                <div class="img-dian">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.2"
                        src="@/assets/images/home/04/dian.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-wenzi flex items-center justify-center">
                <div class="img-wenzi">
                    <nuxt-img
                        class="parallax-layer"
                        data-depth="0.1"
                        src="@/assets/images/home/04/wenzi.png"
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
                            v-html="$t('KEY_PAGE_INDEX.SCENE_FOURTH.INTRO')"
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
.scene--04 {
    .img-beijing {
        @include image-placeholder(3000px, 2860px);
        flex: 0 0 auto;

        width: em(3000px, 100px);
    }
    .img-1 {
        @include image-placeholder(3000px, 3000px);
        flex: 0 0 auto;

        width: em(2800px, 100px);
    }
    .img-wenzi {
        @include image-placeholder(1254px, 742px);
        width: em(627px, 100px);
    }
    .img-dian {
        @include image-placeholder(1786px, 846px);
        width: em(1786px, 100px);
    }
    .layer-dian {
        perspective: 3000px;
        transform-style: preserve-3d;
    }
    @include media-breakpoint-down(xxxl) {
        font-size: min(100px, 9vh);
    }
    @include media-breakpoint-down(xxl) {
        @media (orientation: portrait) {
            .img-wenzi {
                width: em(400px, 100px);
            }
            .img-1 {
                width: em(1700px, 100px);
            }
        }
        font-size: min(100px, 8vh);
    }
    @include media-breakpoint-down(lg) {
        @media (orientation: portrait) {
            .img-wenzi {
                width: em(440px, 100px);
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @media (orientation: portrait) {
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
