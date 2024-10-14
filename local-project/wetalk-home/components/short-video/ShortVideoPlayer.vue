<template>
    <div :class="$style['short-video-player']">
        <div :class="$style['video-box']">
            <div
                :class="$style['bg-layer']"
                :style="{ backgroundImage: 'url(' + data?.img + ')' }"
            ></div>
            <div
                :class="$style['video-layer']"
                class="flex justify-center items-center relative"
            >
                <!-- controls="false"
                    controlslist="nodownload" -->
                <video
                    ref="video"
                    :src="data?.video"
                    autoplay
                    @pause="videoPause = true"
                    @play="videoPause = false"
                    @click="toggleVideoPlay"
                ></video>
                <div
                    :class="$style['item-cover']"
                    :data-show="videoPause"
                    class="flex justify-center items-center"
                >
                    <div
                        :class="$style['item-play-btn']"
                        class="flex justify-center items-center"
                    >
                        <i class="ic iconfont icon-play"></i>
                    </div>
                </div>
            </div>
            <div :class="$style['control-layer']">
                <div
                    :class="$style['control--right']"
                    class="flex items-center"
                >
                    <button
                        :class="$style['btn--close']"
                        class="flex items-center justify-center z-10"
                        @click="closeVideo"
                    >
                        <i class="ic iconfont icon-close"></i>
                    </button>
                    <div :class="$style['video-tab-btns']">
                        <button
                            v-if="data?.backShortVideoid"
                            :class="$style['btn--prev']"
                            class="flex items-center justify-center rotate-180"
                            @click="tabVideo('prev')"
                        >
                            <i class="ic iconfont icon-arrow-down"></i>
                        </button>
                        <button
                            v-if="data?.nextShortVideoid"
                            :class="$style['btn--next']"
                            class="flex items-center justify-center"
                            @click="tabVideo('next')"
                        >
                            <i class="ic iconfont icon-arrow-down"></i>
                        </button>
                    </div>
                </div>

                <div v-if="data" :class="$style['video-info']">
                    <div :class="$style['tag-list']" class="flex flex-wrap">
                        <div
                            v-for="(item, index) in data.keys"
                            :key="index"
                            :class="$style['tag-item']"
                        >
                            {{ item }}
                        </div>
                    </div>
                    <div :class="$style['video-head']">
                        <div :class="$style['video-title']">
                            {{ data.title }}
                        </div>
                        <div :class="$style['video-desc']">
                            {{ data.message }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    getShortVideoDetail,
    TYPE_VIDEO_DETAIL,
} from "@/assets/script/api/api";
import { ref, onBeforeMount } from "vue";

const prop = defineProps<{ id: number }>();
const emit = defineEmits<{ (e: "close"): void }>();
const videoPause = ref<boolean>(false);

// const testData = {
//     video: "https://wetalk-v1.oss-accelerate.aliyuncs.com/Upfile/News/DdCFkiRdix.mp4",
//     shortVideoid: 1,
//     img: require("@/assets/images/short-video/1.png"),
//     title: "汉语难学吗？一分钟获得入门级宝典",
//     message: "觉得汉语难学吗？那是你没有找到学习方法....",
//     keys: ["#国学", "#少儿成语", "#汉语入门"],
//     hits: 1000,
//     backShortVideoid: 2,
//     nextShortVideoid: 3,
// };
// const testData2 = {
//     video: "https://wetalk-v1.oss-accelerate.aliyuncs.com/Upfile/News/2eWhspC3bw.mp4",
//     shortVideoid: 1,
//     img: require("@/assets/images/short-video/2.png"),
//     title: "汉语难学吗？一分钟获得入门级宝典",
//     message: "觉得汉语难学吗？那是你没有找到学习方法....",
//     keys: ["#国学", "#少儿成语", "#汉语入门"],
//     hits: 1000,
//     backShortVideoid: 2,
//     nextShortVideoid: 3,
// };

const data = ref<TYPE_VIDEO_DETAIL>();
const video = ref<HTMLVideoElement>();

function closeVideo() {
    video.value?.pause();
    emit("close");
}

function playVideo() {
    video.value?.play();
}

function getVideo(id: number) {
    return getShortVideoDetail({ shortVideoid: id }).then((res) => {
        return res.data;
    });
}

function tabVideo(dir: "prev" | "next") {
    if (!data.value) return;
    video.value?.pause();
    getVideo(
        dir == "prev"
            ? data.value.backShortVideoid
            : data.value.nextShortVideoid
    ).then((videoDetail) => {
        if (!videoDetail) {
            closeVideo();
            return;
        }
        data.value = videoDetail;
    });
}

function toggleVideoPlay() {
    const videoDom = video?.value;
    if (!videoDom) return;

    if (videoDom.paused) {
        videoDom.play();
    } else {
        videoDom.pause();
    }
}

onBeforeMount(() => {
    getVideo(prop.id).then((videoDetail) => {
        data.value = videoDetail;
    });
});
</script>
<style lang="scss" module>
.short-video-player {
    pointer-events: none;
    video,
    button {
        cursor: pointer;
        pointer-events: all;
    }
    .video-box {
        // @include space-placeholder(1920px, 1000px);
        position: relative;

        overflow: hidden;

        width: 100vw;
        height: 100vh;
        &::after {
            @include ab-cover;
            z-index: 11;

            content: "";
            pointer-events: none;

            background: linear-gradient(0deg, #000 0, rgb(0 0 0 / 0) 200px);
        }
    }
    .bg-layer {
        @include ab-cover;
        z-index: 1;

        transform: scale(1.2);
        transform-origin: center;

        background-color: #333;
        background-position: center;
        background-size: cover;

        filter: blur(25px);
        &::after {
            @include ab-cover;
            content: "";

            opacity: 0.5;
            background: #141414;
        }
    }
    .video-layer {
        @include ab-cover;
        z-index: 10;
        video {
            max-width: 86%;
            max-height: calc(100% - min(17vh, 180px));

            border-radius: 14px;
        }
    }
    .control-layer {
        @include ab-cover;
        z-index: 20;

        max-width: percent(1560, 1920);
        margin: auto;
    }
    .control--right {
        position: absolute;
        top: 0;
        right: 0;

        height: 100%;
    }
    .btn--close {
        @include circle(60px);
        font-size: 16px;

        position: absolute;
        top: 100px;
        right: 0;

        color: #fff;
        background-color: rgb(45 43 50 / 0.3);
    }
    .btn--prev,
    .btn--next {
        @include circle(60px);
        @include space-between(11px, y);
        font-size: 15px;

        transition: 0.26s ease;

        color: #2d2b32;
        background: #f7f9fa;
        &:hover {
            color: #fff;
            background-color: var(--theme-c);
        }
    }
    .item-cover {
        position: absolute;

        width: 100%;
        height: 100%;

        transition: 0.36s ease;

        background-color: rgb(0 0 0 / 0);
        &[data-show] {
            .item-play-btn {
                opacity: 1;
            }
        }
    }
    .item-play-btn {
        @include circle(em(68px, 19px), #fff);
        font-size: em(19px, $t-s-default);

        transition: 0.36s ease;
        transform: translateY(14px);

        opacity: 0;
        color: #fff;
        background-color: rgba(#2d2b32, 0.8);
        :global(.ic) {
            margin-right: -3px;
        }
    }
    .video-info {
        position: absolute;
        bottom: min(80px, 6vh);
        left: 0;

        max-width: 400px;

        color: #fff;
        .tag-list {
            margin-bottom: 20px;
        }
        .tag-item {
            @include space-between(20px);
            font-size: 15px;
            line-height: em(22px, 15px);

            padding: 9px 0;

            color: #fff;
        }
        .video-title {
            @include ellipse();
            font-size: 24px;
            line-height: 200%;
        }
        .video-desc {
            @include ellipse();
            font-size: 16px;
            line-height: 200%;

            margin-top: 2px;
        }
    }
    @include media-breakpoint-down(xl) {
        .control-layer {
            max-width: 90%;
        }
        .video-info {
            .tag-list {
                margin-bottom: 10px;
            }
            .video-title {
                font-size: 22px;
            }
            .video-desc {
                font-size: 14px;
            }
        }
        .btn--prev,
        .btn--next,
        .btn--close {
            @include circle(50px);
            font-size: 16px;
        }
        .btn--close {
            top: 50px;
        }
    }
    @include media-breakpoint-down(lg) {
        .video-layer {
            video {
                max-height: calc(100% - 200px);
            }
        }
        .item-play-btn {
            font-size: 16px;
        }
    }
    @include media-breakpoint-down(md) {
        .btn--prev,
        .btn--next {
            display: none;
        }
        .item-play-btn {
            font-size: 22px;
        }
    }
}
</style>
