<template>
    <div :class="$style['short-video-player']">
        <div :class="$style['video-box']">
            <div
                :class="$style['bg-layer']"
                :style="{ backgroundImage: 'url(' + prop?.img + ')' }"
            ></div>
            <div
                :class="$style['video-layer']"
                class="flex justify-center items-center relative"
            >
                <video
                    ref="video"
                    :src="data.video"
                    controls
                    controlslist="nodownload"
                    autoplay
                    @click="toggleVideoPlay"
                    @pause="videoPause = true"
                    @play="videoPause = false"
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
                </div>

                <div v-if="data" :class="$style['video-info']">
                    <div :class="$style['video-head']">
                        <div :class="$style['video-title']">
                            {{ data.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_MY_RECORD_COURSE_DETAIL } from "@/assets/script/api/api";

import { ref } from "vue";

const prop = defineProps<{
    img: string;
    data: TYPE_MY_RECORD_COURSE_DETAIL["videos"][number];
}>();
const emit = defineEmits<{ (e: "close"): void }>();
const videoPause = ref<boolean>(false);

const video = ref<HTMLVideoElement>();

function closeVideo() {
    video.value?.pause();
    emit("close");
}

function playVideo() {
    video.value?.play();
}

function toggleVideoPlay() {
    if (video.value?.paused) {
        video.value?.play();
    } else {
        video.value?.pause();
    }
}

// function tabVideo(dir: "prev" | "next") {
//     if (!prop.video) return;
//     video.value?.pause();
// }
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
        @include space-placeholder(1920px, 1000px);
        position: relative;

        overflow: hidden;

        width: 100vw;
        height: 100vh;
    }
    .bg-layer {
        @include ab-cover;
        z-index: 1;

        transform: scale(1.1);

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
            max-height: calc(100% - 200px);

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
        bottom: 80px;
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
}
</style>
