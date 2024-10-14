<template>
    <div :class="$style['lesson-intro']">
        <div :class="$style['intro-text']" v-html="course.introUp"></div>
        <div :class="$style['video-area']">
            <div :class="$style['area-title']">
                <span class="text">{{
                    $t("KEY_VIDEO_COURSE.OTHER.课程目录")
                }}</span>
            </div>
            <div :class="$style['video-list']">
                <div
                    v-for="(item, index) in course.videos"
                    :key="index"
                    :class="$style['video-item']"
                    class="flex"
                >
                    <div :class="$style['play-icon']">
                        <i class="ic iconfont icon-strock-play-btn"></i>
                    </div>
                    <div :class="$style['counter']">{{ index + 1 }}.</div>
                    <div :class="$style['video-info']">
                        <p :class="$style['title']">
                            {{ item.title }}
                        </p>
                        <p :class="$style['info']">
                            {{ item.duration }}
                            <span :class="$style['divide-line']">|</span>
                            {{ item.viewCount }}
                            {{ $t("KEY_VIDEO_COURSE.OTHER.人学过") }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style['intro-text']" v-html="course.introLow"></div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_RECORD_COURSE_DETAIL } from "@/assets/script/api/api";
defineProps<{ course: TYPE_RECORD_COURSE_DETAIL }>();
</script>
<style lang="scss" module>
.lesson-intro {
    font-size: 16px;
    font-weight: 300;

    color: #777;
    p {
        margin-bottom: em(8px, 16px);
    }
    img {
        width: 100%;
    }
    @include media-breakpoint-down(xxl) {
        font-size: 14px;
    }
}
.video-area {
    padding-top: 35px;
    padding-bottom: 70px;
    .area-title {
        margin-bottom: 34px;
        padding: 15px 35px;

        color: #2d2b32;
        border-radius: 8px;
        background: #f5f8fa;
    }
    .video-item {
        font-size: 16px;

        padding: 17px 0;

        border-bottom: 1px solid #f3f6f9;
        &:last-child {
            border-bottom-width: 0;
        }
        .title {
            line-height: em(24px, 16px);

            margin-bottom: 5px;

            color: #2d2b32;
        }
        .info {
            font-size: 12px;
            line-height: em(24px, 16px);

            color: #95a1af;
        }
        .divide-line {
            display: inline-block;

            margin: 0 4px;

            transform: scaleY(0.6);
        }
        .play-icon {
            margin-right: em(14px, 16px);
        }
        .counter {
            margin-right: em(8px, 16px);

            color: #777;
        }
    }
}
</style>
