<template>
    <div
        :class="$style['relate-list']"
        class="xl:grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 md:grid-cols-1 md:gap-3"
    >
        <template v-for="item in list">
            <Link
                v-if="!item.video"
                :key="item.newsid"
                :class="$style['list-item']"
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
                :class="$style['list-item']"
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
import type { TYPE_NEW_DETAIL } from "@/assets/script/api/api";
import { computed, useContext } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";
import { formateDate } from "@/assets/script/util/date";

// import { list } from "@/assets/script/api/mock/news-list";

const prop = defineProps<{
    list: TYPE_NEW_DETAIL["relations"];
}>();

const limitSize = 3;
const list = computed(() => {
    return prop.list.slice(0, limitSize);
});

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
.relate-list {
    .list-item {
        @include space-between(30px, "y");
        max-width: 100%;
        padding-bottom: 18px;

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
        @include media-breakpoint-down(xxl) {
            @include space-between(20px, "y");
        }
        @include media-breakpoint-down(xl) {
            font-size: 12px;

            margin: 0;
            .item-desc {
                margin-top: 10px;
            }
        }
        @include media-breakpoint-down(md) {
            font-size: 13px;

            margin: 0;

            align-items: center;
            gap: 20px;
            .item-info {
                margin-top: 4px;
                padding-top: 0;
            }
            .item-thumb {
                width: 100%;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
    .item-thumb {
        @include image-placeholder(300px, 166px);
        overflow: hidden;

        width: 100%;

        border-radius: 6px;
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
        font-size: 16px;

        transition: 0.36s ease;
        transform: translateY(em(14px, 19px));

        opacity: 0;
        :global(.ic) {
            margin-right: -3px;
        }
    }
    .item-info {
        margin-top: 19px;
    }
    .item-title {
        font-size: 14px;
        font-weight: 700;
        line-height: em(16px, 14px);
    }
    .item-desc {
        @include ellipse(2, 2em);
        font-size: 12px;
        line-height: 2em;

        margin-top: 12px;

        color: var(--t-c-lighter);
    }
    .item-time {
        font-family: "Poppins";
        font-size: 12px;
        font-weight: 600;
        line-height: em(18px, 12px);

        margin-top: 11px;

        color: #888;
    }
    @include media-breakpoint-down(xxl) {
        .item-info {
            margin-top: 17px;
        }
        .item-title {
            font-size: 14px;
        }
        .item-desc {
            margin-top: 10px;
        }
    }
}
</style>
