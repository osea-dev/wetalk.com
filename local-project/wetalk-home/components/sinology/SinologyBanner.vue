<template>
    <div
        id="cloud-scene"
        ref="Dom"
        data-relative-input="true"
        :class="$style['sinology-banner-module']"
    >
        <div :class="$style['layer--bg']" class="relative z-10">
            <div
                :class="$style['limit-width']"
                class="w-full h-full relative z-10"
            >
                <div :class="$style['cloud-mask']"></div>
            </div>
            <div
                :class="$style['limit-width']"
                class="w-full h-full relative z-50"
            >
                <div
                    :class="[$style['cloud-mask'], $style['cloud-mask--alter']]"
                ></div>
            </div>
            <div
                :class="$style['line-mask']"
                class="w-full h-full relative z-10"
            ></div>
            <div
                :class="$style['limit-width']"
                class="w-full h-full relative z-10"
            >
                <div :class="$style['layer--cloud']">
                    <div :class="$style['cloud--left']">
                        <div
                            :class="[$style['cloud-box'], $style['cloud-l-4']]"
                        >
                            <div :class="$style['cloud']">
                                <div
                                    :class="$style['image-box']"
                                    class="parallax-layer"
                                    data-scalar-y="0"
                                    data-invert-x="false"
                                    data-depth="0.1"
                                ></div>
                            </div>
                        </div>
                        <div
                            :class="[$style['cloud-box'], $style['cloud-l-3']]"
                        >
                            <div :class="$style['cloud']">
                                <div
                                    :class="$style['image-box']"
                                    class="parallax-layer"
                                    data-scalar-y="0"
                                    data-invert-x="false"
                                    data-depth="0.2"
                                ></div>
                            </div>
                        </div>
                        <div
                            :class="[$style['cloud-box'], $style['cloud-l-2']]"
                        >
                            <div :class="$style['cloud']">
                                <div
                                    :class="$style['image-box']"
                                    class="parallax-layer"
                                    data-scalar-y="0"
                                    data-depth="0.3"
                                ></div>
                            </div>
                        </div>
                        <div
                            :class="[$style['cloud-box'], $style['cloud-l-1']]"
                        >
                            <div :class="$style['cloud']"></div>
                        </div>
                    </div>
                    <div :class="$style['cloud--right']">
                        <div
                            :class="[$style['cloud-box'], $style['cloud-r-4']]"
                        >
                            <div :class="$style['cloud']">
                                <div
                                    :class="$style['image-box']"
                                    class="parallax-layer"
                                    data-scalar-y="0"
                                    data-invert-x="false"
                                    data-depth="0.1"
                                ></div>
                            </div>
                        </div>
                        <div
                            :class="[$style['cloud-box'], $style['cloud-r-3']]"
                        >
                            <div :class="$style['cloud']">
                                <div
                                    :class="$style['image-box']"
                                    class="parallax-layer"
                                    data-scalar-y="0"
                                    data-invert-x="false"
                                    data-depth="0.2"
                                ></div>
                            </div>
                        </div>
                        <div
                            :class="[$style['cloud-box'], $style['cloud-r-2']]"
                        >
                            <div :class="$style['cloud']">
                                <div
                                    :class="$style['image-box']"
                                    class="parallax-layer"
                                    data-scalar-y="0"
                                    data-depth="0.3"
                                ></div>
                            </div>
                        </div>
                        <div
                            :class="[$style['cloud-box'], $style['cloud-r-1']]"
                        >
                            <div :class="$style['cloud']">
                                <div :class="$style['image-box']"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    :class="$style['layer--text']"
                    class="flex items-end justify-center"
                >
                    <div :class="$style['banner-text']">
                        <nuxt-img
                            src="@/assets/images/sinology/banner-text.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
        <div
            :class="[$style['layer--bg'], $style['layer--animal']]"
            class="absolute z-20"
        >
            <div :class="$style['animal-1']">
                <div
                    :class="$style['image-box']"
                    class="parallax-layer"
                    data-depth="0.4"
                ></div>
            </div>
            <div :class="$style['animal-2']">
                <div
                    :class="$style['image-box']"
                    class="parallax-layer"
                    data-depth="1"
                ></div>
            </div>
        </div>
        <div class="wrapper--limit-width relative z-10">
            <div ref="moduleBody" :class="$style['module-body']">
                <div :class="$style['module-info']" class="flex md:block">
                    <div class="state-pos--left">
                        <div :class="$style['slogan-box']">
                            <nuxt-img
                                src="@/assets/images/sinology/sinology-banner-1.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="state-pos--right">
                        <div :class="$style['module-header']">
                            <p :class="$style['module-title']">
                                {{ $t("KEY_PAGE_SINOLOGY.BANNER.TITLE") }}
                            </p>
                            <div :class="$style['module-desc']">
                                <p class="text">
                                    {{
                                        $t("KEY_PAGE_SINOLOGY.BANNER.SUBTITLE")
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Parallax from "parallax-js";

import { onBeforeUnmount, onMounted, ref, useCssModule } from "vue";
import mitt from "mitt";

const emitter = mitt<{ destroyPx: void }>();

const mainTL = gsap.timeline({
    paused: true,
});

const $sn = useCssModule();
const Dom = ref<HTMLElement | null>(null);

function getDom(
    moduleDom: HTMLElement | JQuery<HTMLElement>,
    name: string
): JQuery<HTMLElement> {
    const className = name
        .split(" ")
        .map((s) => {
            return "." + $sn[s];
        })
        .join(" ")
        .trim();
    return $(moduleDom).find(className);
}
function firstStep(moduleDom: HTMLElement) {
    const rightCloud = getDom(moduleDom, "cloud--right");
    const cloudRight = gsap.timeline();
    cloudRight.from(
        getDom(rightCloud, "cloud").not(getDom(rightCloud, "cloud-r-1 cloud")),
        {
            opacity: 0,
            duration: 2,
            ease: "power2.out",
            stagger: { each: 0.2 },
            xPercent: 100,
        }
    );
    mainTL.add(cloudRight);
}
function secStep(moduleDom: HTMLElement) {
    const leftCloud = getDom(moduleDom, "cloud--left");
    const cloudRight = gsap.timeline();
    cloudRight.from(
        getDom(leftCloud, "cloud").not(getDom(leftCloud, "cloud-l-1 cloud")),
        {
            opacity: 0,
            duration: 1.6,
            ease: "power2.out",
            stagger: { each: 0.3 },
            xPercent: -100,
        }
    );
    mainTL.add(cloudRight, "<+0.2");
}

function thirdStep(moduleDom: HTMLElement) {
    const cloudMask = getDom(moduleDom, "cloud-mask");
    const cloudRight = gsap.timeline();
    cloudRight.from(cloudMask, {
        ease: "linear",
        duration: 1,
    });
    mainTL.add(cloudRight, "<");
}

function fourthStep(moduleDom: HTMLElement) {
    const animal1 = getDom(moduleDom, "animal-1");
    const animal2 = getDom(moduleDom, "animal-2");
    const animalAnimate = gsap.timeline();
    animalAnimate.from(animal1, { duration: 0.8, opacity: 0 });
    animalAnimate.from(
        animal1,
        {
            duration: 1.2,
            x: 100,
            yPercent: 30,
            z: 200,
        },
        "<"
    );
    animalAnimate.from(animal2, { duration: 0.8, opacity: 0 }, "<+=0.2");
    animalAnimate.from(
        animal2,
        {
            duration: 1.2,
            xPercent: 20,
            yPercent: 15,
            z: 200,
        },
        "<"
    );
    mainTL.add(animalAnimate, "<+=1");
}

function fifthStep(moduleDom: HTMLElement) {
    const textDom = getDom(moduleDom, "banner-text");
    const textAnime = gsap.timeline();
    textAnime.from(textDom, {
        opacity: 0,
        duration: 0.8,
        yPercent: 30,
    });
    mainTL.add(textAnime, "-=1");
}

const moduleBody = ref<HTMLElement | null>(null);

onMounted(() => {
    requestAnimationFrame(() => {
        const moduleDom = Dom.value!;

        firstStep(moduleDom);
        secStep(moduleDom);
        thirdStep(moduleDom);
        fourthStep(moduleDom);
        fifthStep(moduleDom);

        mainTL.play();

        requestAnimationFrame(() => {
            const scene = $("#cloud-scene");
            const px = new Parallax(scene[0], {
                selector: ".parallax-layer",
                scalarX: 5,
                scalarY: 3,
                hoverOnly: true,
            });
            emitter.on("destroyPx", () => px.destroy());
            gsap.timeline({
                defaults: {
                    duration: 0.66,
                },
                scrollTrigger: {
                    trigger: moduleBody.value,
                    start: "top center",
                },
            })
                .from(moduleBody.value, {
                    duration: 0.5,
                    backgroundColor: "rgba(255, 255, 255, 0)",
                })
                .fromTo(
                    $(moduleBody.value!).find("." + $sn["slogan-box"]),
                    { x: "-50px", opacity: 0 },
                    { x: 0, opacity: 1 },
                    "0.1"
                )
                .fromTo(
                    $(moduleBody.value!).find(
                        "." + $sn["module-header"] + "> *"
                    ),
                    { y: "50px", opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15 },
                    "0"
                );
        });
    });
    onBeforeUnmount(() => {
        emitter.emit("destroyPx");
    });
});
</script>
<style lang="scss" module>
@keyframes sinologyMove1 {
    from {
        transform: translateX(-0%);
    }
    to {
        transform: translateX(-50%);
    }
}
@keyframes sinologyMove2 {
    from {
        transform: translateX(-50%);
    }
    to {
        transform: translateX(-100%);
    }
}
.sinology-banner-module {
    @mixin stage-cloud-bg($width, $height, $x, $y) {
        @include space-placeholder($width, $height, em($width, 16px));
        @if ($x) {
            transform: translate3d(
                percent($x, $width),
                percent($y, $height),
                0
            );
        }
    }
    position: relative;

    overflow: hidden;

    width: 100%;
    // &::after {
    //     font-size: min(16px, vw(16px, 1920px));

    //     position: absolute;
    //     top: 0;
    //     left: 0;

    //     width: 100%;
    //     height: em(560px, 16px);

    //     content: "";

    //
    // }
    .layer--bg {
        font-size: min(16px, vw(16px, 1920px));

        top: 0;
        right: 0;
        left: 0;

        width: 100%;
        height: em(560px, 16px);
        margin-bottom: em(160px, 16px);

        background-color: #e4f0ff;
        &.layer--animal {
            background-color: transparent;
        }
    }
    .limit-width {
        @include ab-cover;
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
    }
    .layer--animal {
        perspective: 1000px;
        perspective-origin: center;
        transform-style: preserve-3d;
    }
    .image-box {
        @include ab-cover;
        position: absolute !important;

        background-size: contain;
    }
    .animal-1 {
        @include stage-cloud-bg(490px, 440.5px, 159px, 201px);
        position: absolute;
        bottom: 0;
        left: 0;
        .image-box {
            background-image: url("@/assets/images/sinology/animal-1.png");
        }
    }
    .animal-2 {
        @include stage-cloud-bg(725px, 458px, 70px, 223px);
        position: absolute;
        right: 0;
        bottom: 0;
        .image-box {
            background-image: url("@/assets/images/sinology/animal-2.png");
        }
    }
    .cloud-mask {
        @include image-placeholder(8152px, 628px);
        position: absolute;
        bottom: em(-398px, 16px);
        left: 50%;

        width: min(424.583333333333%, 8152px);
        margin: 0 auto;

        transform: translateX(0%);
        animation: sinologyMove1 100s infinite linear;

        background-image: url("@/assets/images/sinology/cloud-mask-1.png");
        background-repeat: repeat;
        background-size: 50%;
    }
    .cloud-mask--alter {
        z-index: 100;
        bottom: em(-500px, 16px);

        transform: translateX(-50%);
        animation: sinologyMove2 90s infinite linear;

        opacity: 0.5;
    }
    .line-mask {
        @include image-placeholder(1920px, 600px);
        position: absolute;
        bottom: -490px;
        left: 0;

        width: 100%;

        background: linear-gradient(
            0deg,
            #fff 47.33%,
            rgb(255 255 255 / 0) 79%
        );
    }
    .layer--cloud {
        @include ab-cover;
        & > * {
            @include ab-cover;
        }
        .cloud--left {
            .cloud-box {
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .cloud {
                @include ab-cover;
                background-size: contain;
            }
        }
        .cloud--right {
            .cloud-box {
                position: absolute;
                right: 0;
                bottom: 0;
            }
            .cloud {
                @include ab-cover;
                background-size: contain;
            }
        }
        .cloud-l-1 {
            @include stage-cloud-bg(1268px, 419px, -447px, 251px);
            .cloud {
                filter: blur(em(90px, 16px));
            }
            .image-box {
                background-image: url("@/assets/images/sinology/c-l-2.png");
            }
        }
        .cloud-l-2 {
            @include stage-cloud-bg(750px, 214px, 27px, 104px);
            .image-box {
                background-image: url("@/assets/images/sinology/c-l-2.png");
            }
        }
        .cloud-l-3 {
            @include stage-cloud-bg(1100px, 274px, -460px, 69px);
            .image-box {
                background-image: url("@/assets/images/sinology/c-l-3.png");
            }
        }
        .cloud-l-4 {
            @include stage-cloud-bg(967px, 319px, -367px, -36px);
            .image-box {
                background-image: url("@/assets/images/sinology/c-l-4.png");
            }
        }
        .cloud-r-1 {
            @include stage-cloud-bg(1281px, 547px, 858px, 291px);
            .cloud {
                filter: blur(em(90px, 16px));
            }
            .image-box {
                background-image: url("@/assets/images/sinology/c-r-1.png");
            }
        }
        .cloud-r-2 {
            @include stage-cloud-bg(699px, 182px, 357px, -53px);
            // .cloud {
            //     background-image: url("@/assets/images/sinology/c-r-2.png");
            // }
            .image-box {
                background-image: url("@/assets/images/sinology/c-r-2.png");
            }
        }
        .cloud-r-3 {
            @include stage-cloud-bg(344px, 147px, -222px, -141px);
            // .cloud {
            //     background-image: url("@/assets/images/sinology/c-r-3.png");
            // }
            .image-box {
                background-image: url("@/assets/images/sinology/c-r-3.png");
            }
        }
        .cloud-r-4 {
            @include stage-cloud-bg(685px, 266px, 400px, -87px);
            // .cloud {
            //     background-image: url("@/assets/images/sinology/c-r-4.png");
            // }
            .image-box {
                background-image: url("@/assets/images/sinology/c-r-4.png");
            }
        }
    }
    .layer--text {
        @include ab-cover;
        .banner-text {
            @include image-placeholder(649px, 263px);
            width: em(649px, 16px);
            padding-bottom: em(86px, 16px);
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 40px !important;
    }
    @include media-breakpoint-down(md) {
        margin-bottom: 10px !important;
        .layer--bg {
            font-size: min(16px, vw(20px, 1920px));

            height: 41em;
            margin-bottom: 12em;
        }
        .cloud-mask {
            transform: translateY(-90%);
        }
    }
}
.module-body {
    border-radius: em(60px, 16px);
    background-color: #fff;
    /* #region 左侧 */
    .module-info {
        font-size: 16px;

        width: 89.0625%;
        margin: 0 auto;
        padding: em(123px, 16px) em(50px, 16px) em(163px, 16px);
        :global(.state-pos--left) {
            margin-right: em(161px, 16px);
        }
        :global(.state-pos--right) {
            min-width: 1px;
        }
    }
    .slogan-box {
        @include image-placeholder(288px, 274px);
        width: em(288px, 16px);
    }
    /* #endregion */

    /* #region 右侧 */
    .module-header {
        width: 765px;
        max-width: 100%;
        padding-top: em(47px, 16px);
    }
    .module-title {
        font-size: 26px;
        font-weight: 700;
        line-height: em(50px, 26px);

        margin-bottom: em(30px, 26px);

        color: #2d2b32;
    }
    .module-desc {
        font-size: 15px;

        color: #777;
    }
    /* #endregion */
    @include media-breakpoint-down(xxxl) {
        /* #region 左侧 */
        .module-info {
            :global(.state-pos--left) {
                margin-right: em(140px, 16px);
            }
        }

        /* #endregion */
        .module-title {
            font-size: 24px;
        }
    }
    @include media-breakpoint-down(xxl) {
        /* #region 左侧 */
        .module-info {
            padding: em(100px, 16px) em(50px, 16px) em(100px, 16px);
            :global(.state-pos--left) {
                margin-right: em(100px, 16px);
            }
        }
        .slogan-box {
            width: em(260px, 16px);
        }

        /* #endregion */
        .module-header {
            padding-top: em(34px, 16px);
        }
        .module-title {
            font-size: 22px;
        }
        .module-desc {
            font-size: 14px;
        }
    }
    /* #endregion */
    @include media-breakpoint-down(xl) {
        /* #region 左侧 */
        .module-header {
            padding-top: 0;
        }
        .module-info {
            font-size: 14px;

            width: 92%;
            margin: 0 auto;
            padding: em(83px, 16px) em(40px, 16px) em(93px, 16px);
            :global(.state-pos--left) {
                // margin-right: em(140px, 16px);
            }
        }
        .slogan-box {
            width: em(200px, 16px);
        }

        /* #endregion */
        .module-title {
            font-size: 18px;
            line-height: 1.8em;
        }
        .module-desc {
            line-height: 1.8em;
        }
    }
    @include media-breakpoint-down(lg) {
        border-radius: 30px;
        .slogan-box {
            width: 160px;
        }
        .module-desc {
            font-size: 13px;
        }
        .module-info {
            padding: em(60px, 16px) em(10px, 16px) em(73px, 16px);
            :global(.state-pos--left) {
                margin-right: 20px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .module-info {
            padding-top: 30px;
        }
        .slogan-box {
            width: 100px;
        }
        .module-header {
            margin-top: 30px;
        }
    }
}
:global(.lang-en) {
    .module-body {
        .module-header {
            padding-top: 1em;
        }
        .module-title {
            font-size: 24px;
            line-height: 1.6;
        }
        .module-desc {
            line-height: 2;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .module-body {
            .slogan-box {
                width: 16em;
            }
            .module-info {
                padding: 7.6875em 3.125em 2.1875em;
                :global(.state-pos--left) {
                    margin-right: 4.75em;
                }
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-body {
            .slogan-box {
                width: 12em;
            }
            .module-header {
                padding-top: 1em;
            }
            .module-title {
                font-size: 20px;
                line-height: 1.6;
            }
            .module-desc {
                line-height: 2;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .module-body {
            .module-info {
                display: block;

                padding: 5.6875em 3.125em 2.1875em;
            }
            .slogan-box {
                width: 12em;
            }
            .module-header {
                padding-top: 3em;
            }
            .module-title {
                font-size: 18px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .module-body {
            .module-info {
                padding: 3.75em 0.625em 4.5625em;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .module-body {
            .module-header {
                padding-top: 0;
            }
            .module-title {
                font-size: 16px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .module-body {
            .module-title {
                font-size: 14px;
                line-height: 2em;
            }
            .slogan-box {
                width: 100px;
            }
        }
    }
}
</style>
