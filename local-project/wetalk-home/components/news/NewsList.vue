<template>
    <div
        :class="$style['news-list']"
        class="grid grid-cols-3 wow-group-3 lg:grid-cols-2 md:grid-cols-1"
    >
        <template v-for="item in prop.list">
            <Link
                v-if="!item.video"
                :key="item.newsid"
                :class="$style['news-item']"
                class="wow animate__fadeInUp-100 md:grid md:grid-cols-2 sm:grid-cols-1"
                :to="item.url || linkManage.news + '/' + item.newsid"
            >
                <div :class="$style['item-thumb']">
                    <img :src="item.img" alt="" />
                </div>
                <div :class="$style['item-info']">
                    <div :class="$style['item-title']">
                        <span class="text">{{ item.title }}</span>
                    </div>
                    <div :class="$style['item-desc']">
                        <span class="text">{{ item.message }}</span>
                    </div>
                    <div :class="$style['item-time']">
                        <i class="ic iconfont icon-clock"></i>
                        <span class="text">{{
                            formateDate(item.sendtime)
                        }}</span>
                    </div>
                </div>
            </Link>
            <div
                v-else
                :key="item.newsid + 'video'"
                :class="$style['news-item']"
                class="wow animate__fadeInUp-100 md:grid md:grid-cols-2 sm:grid-cols-1"
                :data-video="item.video"
                data-type="video"
                @click="playVideo(item.video)"
            >
                <div :class="$style['item-thumb']">
                    <img :src="item.img" alt="" />
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
                <div :class="$style['item-info']">
                    <div :class="$style['item-title']">
                        <span class="text">{{ item.title }}</span>
                    </div>
                    <div :class="$style['item-desc']">
                        <span class="text">{{ item.message }}</span>
                    </div>
                    <div :class="$style['item-time']">
                        <i class="ic iconfont icon-clock"></i>
                        <span class="text">{{
                            formateDate(item.sendtime)
                        }}</span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { TYPE_NEWS_LIST } from "@/assets/script/api/api";

import { useContext } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";
import { formateDate } from "@/assets/script/util/date";

const prop = defineProps<{
    list: TYPE_NEWS_LIST["list"];
}>();

const { $dialog } = useContext();

function playVideo(video?: string) {
    if (!video) return;
    $dialog({
        type: "video",
        src: video,
        poster: "",
    });
}
</script>

<style lang="scss" module>
.news-list {
    gap: 55px 46px;
    @include media-breakpoint-down(xl) {
        gap: 40px 30px;
    }
    @include media-breakpoint-down(lg) {
        gap: 40px 20px;
    }
}
.news-item {
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
    .item-thumb {
        @include image-placeholder(480px, 266px);
        position: relative;

        max-width: 100%;

        border-radius: 10px;
        img {
            width: 100%;
            height: 100%;

            object-fit: cover;
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
        :global(.ic) {
            margin-right: -3px;
        }
    }
    .item-info {
        width: 100%;
        padding-top: em(26px, $t-s-default);
    }
    .item-title {
        @include ellipse();
        font-size: em(18px, $t-s-default);
        font-weight: 700;
        line-height: em(24px, 18px);
    }
    .item-desc {
        @include ellipse(2, 2em, 1);
        font-size: em(13px, $t-s-default);
        line-height: 2em;

        margin-top: em(22px, 13px);

        color: var(--t-c-lighter);
    }
    .item-time {
        margin-top: em(16px, $t-s-default);

        color: #b7b7b7;
    }
    @include media-breakpoint-down(xl) {
        font-size: 12px;
        .item-desc {
            margin-top: em(18px, 13px);
        }
    }
    @include media-breakpoint-down(md) {
        font-size: 13px;

        align-items: center;
        gap: 20px;
        .item-info {
            padding-top: 0;
        }
        .item-thumb {
            width: 100%;
        }
        .item-desc {
            font-size: 13px;

            margin-top: 10px;
        }
    }
}
body[data-has-hover="0"] {
    .news-item {
        .item-cover {
            background-color: rgb(0 0 0 / 0.1);
        }
        .item-play-btn {
            transform: translateY(0);

            opacity: 1;
        }
    }
}
</style>
