<template>
    <div ref="sceneModule" :class="$style['scene-module']">
        <div :class="$style['scene-playgroup']" class="scroll-container">
            <div ref="swiperShadow" class="swiper-shadow">
                <div class="scene-wrapper">
                    <div class="scene-box">
                        <component
                            :is="item.component"
                            v-for="item in SceneList"
                            :key="item.index"
                            :data-index="item.index"
                            class="scene-item"
                            style="display: none"
                            @openNews="showNews = true"
                        ></component>
                    </div>
                </div>
                <div class="swiper-wrapper">
                    <div
                        v-for="item in SceneList"
                        :key="item.index"
                        class="swiper-slide"
                        :data-index="item.index"
                    ></div>
                </div>
            </div>
            <div :class="$style['layer-swiper-control']" class="sm:hidden">
                <div class="wrapper--limit-width h-full">
                    <div class="relative h-full">
                        <div class="swiper-control flex items-center">
                            <div class="swiper-ctrl--inner">
                                <!-- <div class="swiper-dot active"></div>
                                <div class="swiper-dot"></div>
                                <div class="swiper-dot"></div>
                                <div class="swiper-dot"></div>
                                <div class="swiper-dot"></div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layer-cover">
                <div class="wrapper--limit-width h-full flex items-end">
                    <div class="module-inner relative w-full h-full">
                        <div class="discover-box">
                            <div class="img-discover">
                                <img src="@/assets/images/home/mo.png" alt="" />
                            </div>
                            <div class="text-box">
                                <span class="text">discover</span>
                                <i class="ic"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="[$style['scene-story'], $style['module-side-area']]">
            <div :class="$style['wrapper--story']">
                <div
                    :class="$style['layer-left-side']"
                    :data-active="showStory"
                    @click.self="showStory = false"
                >
                    <div :class="$style['left-side-inner']">
                        <div :class="$style['scroll-container']">
                            <template v-for="(item, index) in SceneList">
                                <div
                                    v-if="currentScene === item.index"
                                    :key="index"
                                    class="scroll-inner"
                                    :data-index="item.index"
                                >
                                    <h2 class="story-title">
                                        {{ item.story.title }}
                                    </h2>
                                    <h3 class="story-subtitle">
                                        {{ item.story.subtitle }}
                                    </h3>
                                    <div
                                        class="story-body"
                                        v-html="$t(item.story.body)"
                                    ></div>
                                </div>
                            </template>
                        </div>
                        <div class="story-footer">
                            <div class="story-logo">
                                <img
                                    src="@/assets/images/home/stroy-logo.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="layer-control">
                            <div
                                class="btn-open flex items-center"
                                @click.stop="showStory = true"
                            >
                                <div class="ic"></div>
                                <div class="line"></div>
                                <div class="circle"></div>
                                <span class="text">{{ $t("探索典故") }}</span>
                            </div>
                            <div
                                class="btn-close flex justify-center items-center"
                                @click.stop="showStory = false"
                            >
                                <i class="ic iconfont icon-close"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="[$style['module-news'], $style['module-side-area']]">
            <div :class="$style['wrapper--news']">
                <div
                    :class="$style['layer-left-side']"
                    :data-active="showNews"
                    @click.self="showNews = false"
                >
                    <div :class="$style['left-side-inner']">
                        <div :class="$style['scroll-container']">
                            <div :class="$style['panel-head']">
                                <span class="text">{{ $t("新闻动态") }}</span>
                            </div>
                            <div :class="$style['panel-body']">
                                <template v-for="item in newList">
                                    <Link
                                        v-if="!item.video"
                                        :key="item.newsid"
                                        :class="$style['list-item']"
                                        class="flex items-center"
                                        :to="
                                            linkManage.news + '/' + item.newsid
                                        "
                                    >
                                        <div :class="$style['item-thumb']">
                                            <img :src="item.img" alt="" />
                                        </div>
                                        <div :class="$style['item-info']">
                                            <div :class="$style['item-title']">
                                                <span class="text">{{
                                                    item.title
                                                }}</span>
                                            </div>
                                            <div
                                                :class="$style['item-time']"
                                                class="flex items-center"
                                            >
                                                <i
                                                    class="ic iconfont icon-clock"
                                                ></i>
                                                <span class="text">{{
                                                    formateDate(item.sendtime)
                                                }}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div
                                        v-else
                                        :key="item.newsid + 'video'"
                                        :class="$style['list-item']"
                                        class="flex items-center"
                                        @click="playVideo(item.video)"
                                    >
                                        <div :class="$style['item-thumb']">
                                            <img :src="item.img" alt="" />
                                            <div
                                                :class="$style['item-cover']"
                                                class="flex justify-center items-center"
                                            >
                                                <div
                                                    :class="
                                                        $style['item-play-btn']
                                                    "
                                                    class="flex justify-center items-center"
                                                >
                                                    <i
                                                        class="ic iconfont icon-play"
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div :class="$style['item-info']">
                                            <div :class="$style['item-title']">
                                                <span class="text">{{
                                                    item.title
                                                }}</span>
                                            </div>
                                            <div
                                                :class="$style['item-time']"
                                                class="flex items-center"
                                            >
                                                <i
                                                    class="ic iconfont icon-clock"
                                                ></i>
                                                <span class="text">{{
                                                    formateDate(item.sendtime)
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div
                            :class="$style['btn--more']"
                            class="flex justify-end"
                        >
                            <Link :to="linkManage.news" :class="$style['link']">
                                <span class="text">{{ $t("查看全部") }}</span>
                                <i class="ic iconfont icon-arrow-right"></i>
                            </Link>
                        </div>
                        <div class="layer-control">
                            <div
                                class="btn-close flex justify-center items-center"
                                @click.stop="showNews = false"
                            >
                                <i class="ic iconfont icon-close"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type Scene from "@/assets/script/index-page/scene";
import type { TYPE_NEWS_LIST } from "@/assets/script/api/api";

import { SceneList } from "@/assets/script/index-page/scene-list";
import { getNewsList } from "@/assets/script/api/api";
import { formateDate } from "@/assets/script/util/date";

import Scene01 from "@/assets/script/index-page/scene-01";
import Scene02 from "@/assets/script/index-page/scene-02";
import Scene03 from "@/assets/script/index-page/scene-03";
import Scene04 from "@/assets/script/index-page/scene-04";
import Scene05 from "@/assets/script/index-page/scene-05";

import { onBeforeUnmount, onMounted, ref } from "vue";

import { useContext } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";

const { $Swiper } = useContext();

const sceneModule = ref<any>(null);
function bindSceneCtrl() {
    const scenes = $(sceneModule.value!).find(".scene-item");
    const ctrl: { [key: string]: typeof Scene } = {
        scene01: Scene01,
        scene02: Scene02,
        scene03: Scene03,
        scene04: Scene04,
        scene05: Scene05,
    };
    $(scenes).each((i, dom) => {
        if (ctrl["scene" + $(dom).data("index")]) {
            $(dom).data(
                "animate",
                new ctrl["scene" + $(dom).data("index")](dom).init()
            );
        }
    });
}

const swiperShadow = ref<HTMLElement | null>(null);

const currentScene = ref<string>("01");
function initSwiper() {
    let lock = false;
    const scenes = $(sceneModule.value).find(".scene-item");
    const swiper = new $Swiper(swiperShadow.value!, {
        direction: "vertical",
        speed: 100,
        slidesPerView: 1,
        pagination: {
            type: "bullets",
            clickable: false,
            renderBullet(index, className) {
                return `<div data-index="${index}" class="${className}"></div>`;
            },
            el: $(sceneModule.value!).find(
                ".swiper-control .swiper-ctrl--inner"
            )[0],
            bulletClass: "swiper-dot",
            bulletActiveClass: "active",
        },
        mousewheel: {
            eventsTarget: "container",
        },
        touchEventsTarget: "container",
        on: {
            slideChangeTransitionStart: (swiper) => {
                if (lock) return;
                sceneChange(swiper.previousIndex, swiper.activeIndex);
            },
        },
    });

    let tmpTl: gsap.core.Timeline | null = null;

    const sceneChange = (previousIndex: number, activeIndex: number): any => {
        lock = true;
        swiper.mousewheel.disable();
        const prevDom = scenes.eq(previousIndex);
        const activeDom = scenes.eq(activeIndex);
        currentScene.value = $(activeDom).data("index");
        const isLast = activeIndex === scenes.length - 1;
        tmpTl?.pause();
        gsap.killTweensOf(tmpTl);
        tmpTl = gsap.timeline({
            onStart() {
                // gsap.set(this.sceneBox, {
                //     display: "block",
                // });
                if (isLast) {
                    gsap.to($(".discover-box"), {
                        opacity: 0,
                    });
                }
            },
            onComplete() {
                if (!isLast) {
                    gsap.to($(".discover-box"), {
                        opacity: 1,
                    });
                }
            },
        });

        const prevDomCtrl = prevDom?.data("animate");
        const activeDomCtrl = activeDom.data("animate");

        if (previousIndex !== -1) {
            tmpTl.add(prevDomCtrl.levelTl.play(0));
            tmpTl.add(() => {
                gsap.set(prevDom, {
                    display: "none",
                });
                lock = false;
                swiper.mousewheel.enable();
            });
        } else {
            lock = false;
            swiper.mousewheel.enable();
        }
        tmpTl.add(() => {
            gsap.set(activeDom, {
                display: "block",
            });
        });
        tmpTl.add(activeDomCtrl.playTl.play(0));
    };

    $(swiper.pagination?.bullets).on("click", (ev) => {
        if (lock) return;
        swiper.slideTo($(ev.currentTarget).data("index"));
    });
    gsap.set(scenes, {
        zIndex: (i) => {
            return scenes.length - i;
        },
    });

    sceneChange(-1, 0);
    return function destroy() {
        gsap.killTweensOf(tmpTl);
        $(swiper.pagination?.bullets).off();
        swiper.destroy();
    };
}

const showStory = ref<boolean>(false);
const showNews = ref<boolean>(false);

const { $dialog } = useContext();

function playVideo(video?: string) {
    if (!video) return;
    $dialog({
        type: "video",
        src: video,
        poster: "",
    });
}

const newList = ref<TYPE_NEWS_LIST["list"]>();

function updateNewsList() {
    getNewsList({ pageSize: 12 }).then((res) => {
        newList.value = res.data.list;
    });
}

onMounted(() => {
    bindSceneCtrl();
    const destroy = initSwiper();
    updateNewsList();
    onBeforeUnmount(() => {
        destroy();
    });
});
</script>
<style lang="scss" module>
.scene-module {
    // position: relative;
    // z-index: 10;

    overflow: hidden;
    .layer-swiper-control {
        @include ab-cover;
        z-index: 1000;

        pointer-events: none;
    }
}
.module-side-area {
    @include ab-cover;
    font-weight: 700;

    z-index: 10000;

    overflow: hidden;

    pointer-events: none;
    ::-webkit-scrollbar {
        display: none;
    }
}
.layer-left-side {
    @include ab-cover;
    font-size: 15px;
    line-height: em(30px, 15px);

    color: #fff;
    &[data-active] {
        pointer-events: all;
        .left-side-inner {
            transform: translateX(-0%);
        }
        :global {
            .btn-open {
                visibility: hidden;

                transition-delay: 0s;

                opacity: 0;
            }
            .btn-close {
                visibility: visible;

                opacity: 1;
            }
        }
    }
    p {
        margin-bottom: em(30px, 15px);
    }
    .left-side-inner {
        position: relative;

        width: 698px;
        max-width: 100%;
        height: 100%;

        transition: 0.5s ease;
        transform: translateX(-100%);

        background: rgba(#000, 0.9);
    }
    .scroll-container {
        overflow-x: hidden;
        overflow-y: auto;

        height: 100%;
        padding: 23vh 100px calc(em(60px, 15px) + 23vh);
    }
    :global {
        .story-title {
            font-size: em(32px, 15px);

            margin-bottom: em(9px, 32px);
        }
        .story-subtitle {
            font-size: em(20px, 15px);

            margin-bottom: em(43px, 20px);

            color: #b90201;
        }
        .story-footer {
            position: absolute;
            bottom: 0;
            left: 0;

            display: flex;

            width: 100%;
            padding-top: em(30px, 15px);
            padding-right: em(66px, 15px);
            padding-bottom: em(60px, 15px);

            pointer-events: none;

            justify-content: flex-end;
            &::before {
                @include ab-cover;
                content: "";

                /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
                background-image: linear-gradient(
                    180deg,
                    transparent,
                    transparent 10%,
                    rgb(0 0 0 / 1) 50%
                );
            }
            .story-logo {
                @include image-placeholder(231px, 228px);
                z-index: 10;

                overflow: visible;

                width: percent(231px, 698px);
            }
        }
        .layer-control {
            position: absolute;
            z-index: 1000;
            top: 0;
            bottom: 0;
            left: 100%;

            pointer-events: none;
        }
        .btn-open {
            position: absolute;
            top: 50%;
            left: 100%;

            visibility: visible;

            padding-left: 25px;

            cursor: pointer;
            transition: 0.36s ease;
            transition-delay: 0.5s;
            transform: translateY(-50%);
            white-space: nowrap;
            pointer-events: all;

            opacity: 1;
            .ic {
                position: absolute;
                top: 50%;
                left: 0;

                width: 25px;
                height: 60px;
                margin-top: -30px;

                background-image: url("@/assets/images/home/open-btn.png");
                background-repeat: no-repeat;
                background-position: top right;
                background-size: auto 100%;
            }
            .circle {
                @include circle(12px);
                border: 2px solid #fff;
            }
            .line {
                width: 0;
                height: 2px;

                transition: 0.36s ease;

                background-color: #fff;
            }
            .text {
                text-indent: 10px;
            }
            &:hover {
                .line {
                    width: 12px;
                }
            }
        }
        .btn-close {
            font-size: 16px;

            position: absolute;
            top: 50%;
            right: 0;

            visibility: hidden;

            width: em(100px, 16px);
            height: em(174px, 16px);

            cursor: pointer;
            transition: 0.36s ease;
            transform: translateX(calc(50% - 1px)) translateY(-50%);
            pointer-events: all;

            opacity: 0;
            background-image: url("@/assets/images/home/close-btn.png");
            background-repeat: no-repeat;
            background-position: top right;
            background-size: auto 100%;
        }
    }
    @include media-breakpoint-down(xl) {
        .scroll-container {
            padding: 23vh 70px calc(em(60px, 15px) + 23vh);
        }
        .left-side-inner {
            width: min(578px, 55%);
        }
        :global {
            .btn-open {
                font-size: 13px;

                padding-left: em(25px, 15px);
                .ic {
                    width: em(25px, 15px);
                    height: em(60px, 15px);
                    margin-top: em(-30px, 15px);
                }
                .circle {
                    @include circle(em(12px, 15px));
                    border: 2px solid #fff;
                }
                .text {
                    text-indent: em(10px, 15px);
                }
                &:hover {
                    /* stylelint-disable-next-line max-nesting-depth */
                    .line {
                        width: em(12px, 15px);
                    }
                }
            }
            .btn-close {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .scroll-container {
            padding: 13vh 50px calc(em(60px, 15px) + 23vh);
        }
        .left-side-inner {
            width: min(578px, 50%);
        }
        :global {
            .story-title {
                font-size: 26px;
            }
            .story-subtitle {
                font-size: 15px;
                line-height: em(20px, 14px);
            }
            .story-body {
                font-size: 13px;
            }
            .story-footer {
                padding: 5vh 50px;
                .story-logo {
                    width: percent(260px, 698px);
                }
                &::before {
                    background-image: linear-gradient(
                        180deg,
                        transparent,
                        transparent 0%,
                        rgb(0 0 0) 50%
                    );
                }
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @media (orientation: portrait) {
            padding-top: 22vh;
            &[data-active] {
                .left-side-inner {
                    transform: translateY(0);
                }
            }
            .scroll-container {
                padding: 40px 25px calc(em(60px, 15px) + 23vh);
            }
            .left-side-inner {
                width: 100%;

                transform: translateY(100%);

                border-radius: 30px 30px 0 0;
            }
            :global {
                .btn-close {
                    display: none;
                }
                .story-title {
                    font-size: 24px;
                    line-height: em(34px, 24px);

                    margin-bottom: 0;
                }
                .story-subtitle {
                    font-size: 14px;
                    line-height: em(20px, 14px);

                    color: #fff;
                }
                .story-subtitle,
                .story-title {
                    text-align: center;
                }
                .story-body {
                    font-size: 13px;
                }
                .story-footer {
                    padding: 5vh 10vw;
                    .story-logo {
                        width: percent(260px, 698px);
                    }
                    &::before {
                        background-image: linear-gradient(
                            180deg,
                            transparent,
                            transparent 0%,
                            rgb(0 0 0) 50%
                        );
                    }
                }
                .layer-control {
                    top: auto;
                    right: 0;
                    bottom: 100%;
                    left: 0;

                    transform: rotate(-90deg);
                }
                .btn-open {
                    font-size: 13px;

                    top: auto;
                    bottom: 100%;
                    left: 50%;

                    visibility: visible;

                    transform: translateY(50%);

                    opacity: 1;
                    .text {
                        margin-left: -8px;

                        transform: rotate(90deg);
                        text-indent: 0;
                    }
                }
            }
        }
    }
}
.wrapper--news {
    .left-side-inner {
        position: relative;
    }
    .btn--more {
        font-family: var(--SourceHanSans);
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;

        position: absolute;
        bottom: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 200px;
        padding: 100px 100px 0;

        transition: 0.26s ease;
        pointer-events: none;

        color: #fff;

        align-items: center;
        :global(.ic) {
            line-height: 21px;

            margin-left: 6px;
        }
        .link {
            position: relative;
            z-index: 100;

            pointer-events: all;

            opacity: 0.5;
            &:hover {
                opacity: 1;
            }
        }
        &::before {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            content: "";

            background-image: linear-gradient(
                180deg,
                transparent,
                transparent 10%,
                rgb(0 0 0) 50%
            );
        }
    }
    .scroll-container {
        padding: 10vh 100px calc(4em + 10vh);
    }
    .panel-head {
        font-size: 28px;
        font-weight: 700;
        line-height: em(42px, 28px);

        margin-bottom: 40px;

        color: #fff;
    }
    .list-item {
        @include space-between(45px, "y");
        cursor: pointer;
        &:hover {
            .item-cover {
                background-color: rgb(0 0 0 / 0.3);
            }
            .item-play-btn {
                transform: translateY(0);

                opacity: 1;
            }
        }
        .item-cover {
            position: absolute;

            width: 100%;
            height: 100%;

            transition: 0.36s ease;

            background-color: rgb(0 0 0 / 0);
        }
        .item-play-btn {
            @include circle(52px, #fff);
            font-size: 17px;

            transition: 0.36s ease;
            transform: translateY(14px);

            opacity: 0;
            color: #333;
            :global(.ic) {
                margin-right: -3px;
            }
        }
    }
    .item-thumb {
        @include image-placeholder(180px, 100px);
        flex: 0 0 auto;

        margin-right: 20px;

        border-radius: 6px;
        img {
            height: 100%;

            object-fit: cover;
        }
    }
    .item-title {
        @include ellipse(2, em(26px, 16px), 1);
        font-family: var(--SourceHanSans);
        font-size: 16px;
        font-weight: 700;
        line-height: em(26px, 16px);

        padding-top: em(3px, 16px);

        color: #fff;
    }
    .item-time {
        font-family: "Poppins";
        font-size: 14px;
        font-weight: 600;
        line-height: em(23px, 14px);

        margin-top: 10px;

        color: #b7b7b7;
        :global(.ic) {
            line-height: em(23px, 14px);

            margin-top: -1px;
            margin-right: 6px;
        }
    }
    @include media-breakpoint-down(xl) {
        .panel-head {
            font-size: 24px;
        }
        .scroll-container {
            padding: 10vh 70px calc(4em + 10vh);
        }
        .left-side-inner {
            width: min(578px, 55%);
        }
        .item-title {
            font-size: 14px;
        }
        .item-time {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(xl) {
        @media (orientation: portrait) {
            .scroll-container {
                padding: 10vh 50px calc(4em + 10vh);
            }
            .left-side-inner {
                width: 500px;
            }
            .item-thumb {
                width: 160px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        @media (orientation: portrait) {
            .left-side-inner {
                width: 450px;
            }
            .item-thumb {
                width: 160px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @media (orientation: portrait) {
            .list-item {
                @include space-between(35px, "y");
                .item-play-btn {
                    font-size: 13px;

                    width: 40px;
                    height: 40px;
                }
            }
            .panel-head {
                font-size: 24px;
                line-height: em(36px, 24px);

                margin-bottom: 25px;

                text-align: center;
            }
            .scroll-container {
                padding: 40px 25px calc(4em + 80px);
            }
            .layer-left-side {
                padding-top: 16vh;
                &[data-active] {
                    /* stylelint-disable-next-line max-nesting-depth */
                    .left-side-inner {
                        transform: translateY(0);
                    }
                }
            }
            .left-side-inner {
                width: 100%;

                transform: translateY(100%);

                border-radius: 30px 30px 0 0;
            }
            .item-thumb {
                width: 138px;
                margin-right: 15px;

                border-radius: 4px;
            }
            .item-title {
                font-size: 13px;
                line-height: 160%;
            }
            .item-time {
                font-size: 12px;
                line-height: 100%;
            }
            .btn--more {
                font-size: 14px;

                height: 130px;
                padding: 20px 50px 30px;

                align-items: flex-end;

                justify-content: center;
            }
        }
    }
}
/* stylelint-disable selector-max-compound-selectors */
:global {
    .lang-en {
        .layer--scene .info--box {
            .scene-intro {
                font-size: em(18px, 21px);
            }
            .img-tansuo .box-text {
                text-align: center;
                img {
                    max-width: initial;
                    height: 2.145455em;
                }
            }
        }
    }
}
</style>
