<template>
    <div
        :class="$style['short-video-list']"
        class="grid grid-cols-5 xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
    >
        <div
            v-for="item in data"
            :key="item.shortVideoid"
            :class="$style['video-item']"
            class="wow animate__fadeInUp-100"
        >
            <div
                :class="$style['video-thumb']"
                @click="playVideo(item.shortVideoid)"
            >
                <img :src="item.img" alt="" />
                <div :class="$style['video-tags']" class="flex items-end">
                    <div :class="$style['tags-list']" class="flex flex-wrap">
                        <div
                            v-for="(tag, index) in item.keys"
                            :key="index"
                            :class="$style['tag-item']"
                        >
                            {{ tag }}
                        </div>
                    </div>
                </div>
                <div
                    :class="$style['item-cover']"
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
            <div :class="$style['video-info']">
                <div :class="$style['video-title']">
                    {{ item.title }}
                </div>
                <div :class="$style['video-desc']">
                    {{ item.message }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_VIDEO_ITEM } from "@/assets/script/api/api.video";

import { getCurrentInstance } from "vue";
import { useContext } from "@nuxtjs/composition-api";
import ShortVideoPlayer from "./ShortVideoPlayer.vue";

// import { shortVideoList } from "@/assets/script/api/mock/short-video";

defineProps<{ data: TYPE_VIDEO_ITEM[] }>();

const instance = getCurrentInstance();
const { $dialog } = useContext();
function playVideo(id: number) {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        propsData: {
            background: "",
        },
        container: instance.proxy.$createElement(ShortVideoPlayer, {
            props: { id },
            on: {
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
</script>
<style lang="scss" module>
.short-video-list {
    // init
    gap: 60px 13px;
    @include media-breakpoint-down(md) {
        gap: 46px 13px;
    }
    @include media-breakpoint-down(sm) {
        gap: 36px 13px;
    }
}
.video-item {
    cursor: pointer;
    &:hover {
        .item-cover {
            background-color: rgb(0 0 0 / 0.2);
        }
        .item-play-btn {
            transform: translateY(0);

            opacity: 1;
        }
    }
    .video-tags {
        @include ab-cover;
        font-size: 12px;
        line-height: 18px;

        padding: 21px 20px;

        color: #fff;
        background: linear-gradient(
            0deg,
            rgb(0 0 0 / 0.5) -5.42%,
            rgb(0 0 0 / 0.09) 17.5%,
            rgb(0 0 0 / 0) 25%
        );
        .tag-item {
            margin-right: 12px;
            margin-bottom: 8px;
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
        @include circle(em(68px, 19px), #fff);
        font-size: em(19px, $t-s-default);

        transition: 0.36s ease;
        transform: translateY(14px);

        opacity: 0;
        color: #2d2b32;
        :global(.ic) {
            margin-right: -3px;
        }
    }
    .video-thumb {
        @include image-placeholder(9, 16);
        position: relative;

        overflow: hidden;

        color: #fff;
        border-radius: 12px;
    }
    .video-info {
        padding: 0 3px;
        padding-top: 15px;
        .video-title {
            @include ellipse();
            font-size: 15px;
            line-height: 200%;

            margin-bottom: 3px;

            color: #2d2b32;
        }
        .video-desc {
            @include ellipse();
            font-size: 13px;
            line-height: 200%;

            color: #777;
        }
    }
    @include media-breakpoint-down(lg) {
        .video-tags {
            padding: 20px 16px;
            .tag-item {
                margin-bottom: 6px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .video-tags {
            padding: 10px 16px;
        }
    }
}
</style>
