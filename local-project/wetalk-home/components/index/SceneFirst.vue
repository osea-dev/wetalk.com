<template>
    <div class="scene-item">
        <div class="layer--scene scene--01">
            <div class="layer--el layer-beijing">
                <div class="img-beijing">
                    <img
                        class="parallax-layer"
                        data-depth="0.02"
                        src="@/assets/images/home/01/beijing.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-taiyang">
                <div class="box-sky">
                    <div class="img-taiyang">
                        <img src="@/assets/images/home/01/taiyang.png" alt="" />
                    </div>
                    <div class="img-yu-1"></div>
                    <div class="img-yu-2"></div>
                    <div class="img-niao"></div>
                </div>
            </div>
            <div class="layer--el layer-niao">
                <div class="box-sky">
                    <div class="img-taiyang"></div>
                    <div class="img-yu-1"></div>
                    <div class="img-yu-2"></div>
                    <div class="img-niao">
                        <img
                            class="parallax-layer"
                            data-depth="0.04"
                            src="@/assets/images/home/01/niao.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="layer--el layer-shan">
                <div class="img-shan">
                    <img
                        class="parallax-layer"
                        data-depth="0.1"
                        src="@/assets/images/home/01/shan.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-shu">
                <div class="img-shu">
                    <div class="img-box flex justify-start items-start">
                        <img
                            class="parallax-layer"
                            data-depth="0.15"
                            src="@/assets/images/home/01/shu.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="layer--el layer-ren">
                <div class="img-ren">
                    <img
                        class="parallax-layer"
                        data-depth="0.2"
                        src="@/assets/images/home/01/ren.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-hailang">
                <div class="img-hailang">
                    <img
                        class="parallax-layer"
                        data-depth="0.3"
                        src="@/assets/images/home/01/hailang.png"
                        alt=""
                    />
                </div>
                <div class="img-hailang">
                    <img
                        class="parallax-layer"
                        data-depth="0.4"
                        src="@/assets/images/home/01/hailang.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-wenzi flex items-center justify-center">
                <div class="img-wenzi">
                    <img
                        class="parallax-layer"
                        data-depth="0.1"
                        src="@/assets/images/home/01/wenzi.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="layer--el layer-yu-1">
                <div class="box-sky">
                    <div class="img-taiyang"></div>
                    <div class="img-yu-1">
                        <img
                            class="parallax-layer"
                            data-depth="0.08"
                            src="@/assets/images/home/01/001.png"
                            alt=""
                        />
                    </div>
                    <div class="img-yu-2"></div>
                    <div class="img-niao"></div>
                </div>
            </div>
            <div class="layer--el layer-yu-2">
                <div class="box-sky">
                    <div class="img-taiyang"></div>
                    <div class="img-yu-1"></div>
                    <div class="img-yu-2">
                        <img
                            class="parallax-layer"
                            data-depth="0.35"
                            src="@/assets/images/home/01/002.png"
                            alt=""
                        />
                    </div>
                    <div class="img-niao"></div>
                </div>
            </div>
            <div class="layer--el layer-info flex items-end justify-center">
                <div class="info--container flex justify-center">
                    <div class="info--box">
                        <div class="info-bg"></div>
                        <div
                            class="scene-intro"
                            v-html="$t('KEY_PAGE_INDEX.SCENE_FIRST.INTRO')"
                        ></div>
                        <div class="img-tansuo" @click="openNews">
                            <div class="box box-text">
                                <img :src="TANSUO_IMG" alt="" />
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
.scene--01 {
    .layer-yu-1,
    .layer-yu-2 {
        perspective: 3000px;
        transform-style: preserve-3d;
    }
    .img-beijing {
        @include image-placeholder(1920px, 1000px, $position: absolute);
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;

            object-fit: cover;
        }
    }
    .img-ren {
        @include image-placeholder(900px, 935px, $position: absolute);
        right: em(-147px, 100px);
        bottom: em(-75px, 100px);

        width: em(900px, 100px);
    }
    .img-hailang {
        @include image-placeholder(2560px, 330px, $position: absolute);

        position: absolute;
        bottom: em(-40px, 100px);

        width: em(2560px, 100px);
        &:nth-child(1) {
            left: 0;
        }
        &:nth-child(2) {
            right: 0;
        }
    }
    .img-shu {
        @include image-placeholder(894px, 855px, $position: absolute);
        right: 0;
        bottom: em(260px, 100px);

        overflow: visible;

        width: em(447px, 100px);
        .img-box {
            @include ab-cover();
        }
        img {
            position: static !important;

            flex: 0 0 auto;

            width: 200%;
            max-width: initial;
        }
    }
    .img-shan {
        @include image-placeholder(980px, 381px, $position: absolute);

        right: 0;
        bottom: em(152px, 100px);

        width: em(980px, 100px);
    }
    .img-taiyang {
        position: absolute;
        top: 0;
        left: 30%;
    }
    .img-wenzi {
        @include image-placeholder(644px, 279px);

        width: em(644px, 100px);

        transform: translateY(em(-60px, 100px));
    }
    .box-sky {
        @include space-placeholder(514px, 546px);
        position: absolute;
        top: em(146px, 100px);
        // right: calc(50% + em(47.5px, 100px));
        left: calc(50% - em(560px, 100px));

        width: em(514px, 100px);

        transform-style: preserve-3d;
        .img-taiyang {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
        }
        .img-yu-1 {
            @include image-placeholder(291px, 469px, $position: absolute);

            top: calc(50% - em(285px, 100px));
            right: calc(50% + em(240px, 100px));

            width: em(291px, 100px);
        }
        .img-yu-2 {
            @include image-placeholder(369px, 413px, $position: absolute);
            top: calc(50% + em(16px, 100px));
            left: calc(50% + em(130px, 100px));

            width: em(369px, 100px);
        }
        .img-niao {
            @include image-placeholder(152px, 157px, $position: absolute);
            bottom: calc(50% + em(112.5px, 100px));
            left: calc(50% + em(161.5px, 100px));

            width: em(152px, 100px);
        }
        .img-sky {
            @include image-placeholder(2560px, 6000px, $position: absolute);

            top: calc(50% - em(1737px, 100px));
            left: calc(50% - em(530px, 100px));

            width: em(1300px, 100px);
        }
        .img-sky-1 {
            @include image-placeholder(2560px, 6000px, $position: absolute);
            top: calc(50% - em(1605px, 100px));
            left: calc(50% - em(912px, 100px));

            width: em(2560px, 100px);
        }
    }
    .img-dibu {
        @include image-placeholder(2278px, 619px, $position: absolute);
        bottom: em(-76px, 100px);
        left: 0;

        width: em(2278px, 100px);
    }
    @include media-breakpoint-down(xxxl) {
        font-size: min(100px, 9vh);
        .box-sky {
            top: em(186px, 100px);
            // right: calc(50% + em(47.5px, 100px));
            left: calc(50% - em(590px, 100px));

            width: em(500px, 100px);
            .img-yu-1 {
                width: em(261px, 100px);
            }
            .img-yu-2 {
                width: em(339px, 100px);
            }
            .img-niao {
                width: em(122px, 100px);
            }
            .img-sky {
                width: em(1270px, 100px);
            }
            .img-sky-1 {
                width: em(2530px, 100px);
            }
        }
        .img-hailang {
            bottom: em(-30px, 100px);
        }
    }
    @include media-breakpoint-down(xxl) {
        font-size: min(100px, 8vh);
        .box-sky {
            font-size: min(100px, 7vh);

            top: em(326px, 100px);
            // right: calc(50% + em(47.5px, 100px));
            left: calc(50% - em(610px, 100px));

            width: em(400px, 100px);
        }
        .img-hailang {
            bottom: em(-100px, 100px);

            width: em(2960px, 100px);
        }
        .img-shan {
            right: em(-152px, 100px);
        }
        .img-ren {
            right: em(-287px, 100px);

            width: em(860px, 100px);
        }
        .img-shu {
            right: em(-60px, 100px);
            bottom: em(320px, 100px);

            width: em(367px, 100px);
        }
    }
    @include media-breakpoint-down(xxl) {
        @media (orientation: portrait) {
            .box-sky {
                font-size: min(100px, 6vh);

                top: em(426px, 100px);
                // right: calc(50% + em(47.5px, 100px));
                left: calc(50% - em(710px, 100px));
            }
            .img-ren {
                right: em(-587px, 100px);

                width: em(960px, 100px);
            }
            .img-shu {
                right: em(-10px, 100px);
                bottom: em(120px, 100px);

                width: em(400px, 100px);
            }
            .img-shan {
                right: em(-260px, 100px);
            }
            .img-wenzi {
                width: em(400px, 100px);
            }
        }
    }
    @include media-breakpoint-down(lg) {
        @media (orientation: portrait) {
            .box-sky {
                font-size: min(100px, 9vh);

                top: em(206px, 100px);
                left: calc(50% - em(510px, 100px));
                .img-yu-2 {
                    display: none;
                }
            }
            .img-ren {
                right: em(-497px, 100px);

                width: em(860px, 100px);
            }
            .img-wenzi {
                width: em(544px, 100px);
            }
            .img-shan {
                right: em(-340px, 100px);
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @media (orientation: portrait) {
            .box-sky {
                font-size: min(100px, 7vh);

                top: em(186px, 100px);
                left: calc(50% - em(440px, 100px));
            }
            .img-shu {
                right: em(30px, 100px);
                bottom: em(190px, 100px);

                width: em(300px, 100px);
            }
            .img-shan {
                display: none;
            }
            .img-hailang {
                bottom: em(-40px, 100px);

                width: em(1660px, 100px);
            }
            .img-wenzi {
                top: em(-50px, 100px);

                width: em(450px, 100px);
                max-width: 86%;
            }
            .img-ren {
                right: em(-500px, 100px);
                bottom: em(-40px, 100px);

                width: em(820px, 100px);
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
