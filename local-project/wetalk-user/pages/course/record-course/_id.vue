<!--
 * @Description: 我的课程 - 课程列表
 * @Author: F-Stone
 * @LastEditTime: 2023-03-31 14:55:39
-->
<template>
    <div :class="$style['course-page']">
        <div :class="$style['course-intro-module']">
            <div class="wrapper--limit-width">
                <div class="wrapper--limit-width-mini">
                    <div v-if="courseData" :class="$style['module-body']">
                        <div
                            class="flex justify-between items-start"
                            :class="$style['course-item']"
                        >
                            <div
                                class="flex items-center"
                                :class="$style['course-intro']"
                            >
                                <div
                                    :class="$style['course-thumb']"
                                    class="flex-shrink-0"
                                >
                                    <img :src="courseData.img" />
                                </div>
                                <div :class="$style['course-info']">
                                    <div :class="$style['course-title']">
                                        {{ courseData.title }}
                                    </div>
                                    <div :class="$style['course-subtitle']">
                                        {{ courseData.message }}
                                    </div>
                                    <div :class="$style['course-tag-list']">
                                        <div
                                            v-for="(
                                                item, index
                                            ) in courseData.keys"
                                            :key="index"
                                            :class="$style['course-tip']"
                                        >
                                            <span class="text">{{ item }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                :class="$style['course-attr']"
                                class="flex flex-col items-end"
                            >
                                <div
                                    class="flex items-center"
                                    :class="$style['count-info']"
                                >
                                    <div :class="$style['count-total']">
                                        <span :class="$style['num']">{{
                                            courseData.videos.length
                                        }}</span>
                                        <span class="text">{{
                                            $t("KEY_BASE.COURSE_TIP.2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :class="$style['video-area']">
                            <div :class="$style['video-list']">
                                <div
                                    v-for="(item, index) in courseData.videos"
                                    :key="index"
                                    :class="$style['video-item']"
                                    class="flex"
                                    @click="playVideo(item)"
                                >
                                    <div :class="$style['play-icon']">
                                        <i
                                            class="ic iconfont icon-strock-play-btn"
                                        ></i>
                                    </div>
                                    <div :class="$style['counter']">
                                        {{ index + 1 }}.
                                    </div>
                                    <div :class="$style['video-info']">
                                        <p :class="$style['title']">
                                            {{ item.title }}
                                        </p>
                                        <p :class="$style['info']">
                                            {{ item.duration }}
                                            <span :class="$style['divide-line']"
                                                >|</span
                                            >
                                            {{ item.viewCount }}
                                            {{ $t("人学过") }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    TYPE_MY_RECORD_COURSE_DETAIL,
    getMyRecordCourse,
} from "@/assets/script/api/api";

import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
import { useRoute, useContext } from "@nuxtjs/composition-api";
import VideoPlayer from "@/components/VideoPlay.vue";

const route = useRoute();

const courseData = ref<TYPE_MY_RECORD_COURSE_DETAIL>();

const instance = getCurrentInstance();
const { $dialog } = useContext();
function playVideo(video: TYPE_MY_RECORD_COURSE_DETAIL["videos"][number]) {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        propsData: {
            background: "",
            boxLayerFull: true,
        },
        container: instance.proxy.$createElement(VideoPlayer, {
            props: { img: courseData.value?.img, data: video },
            on: {
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
onMounted(() => {
    getMyRecordCourse({
        orderid: route.value.params.id,
    }).then((res) => {
        const course = res.data;
        if (course.message && course.message.length >= 17) {
            course.message = course.message.slice(0, 14) + "...";
        }
        courseData.value = res.data;
    });
});
</script>
<script lang="ts">
export default {
    name: "CourseInfo",
};
</script>
<style lang="scss" module>
.course-page {
    .page-tab {
        margin-top: 20px;
    }
}
.course-intro-module {
    .module-body {
        padding: $panel-padding;

        border-radius: $panel-radius;
        background-color: #fff;
    }
    @include media-breakpoint-down(sm) {
        .module-body {
            padding: $panel-padding-2;
        }
    }
}
.course-item {
    .course-thumb {
        @include image-placeholder(294px, 180px);
        margin-right: 30px;

        border-radius: 10px;
    }
    .course-title {
        font-size: 26px;
        font-weight: 700;
        line-height: em(39px, 26px);

        margin-bottom: 8px;

        color: #333;
    }
    .course-subtitle {
        font-size: 14px;
        line-height: em(21px, 14px);

        color: #b1b5c4;
    }
    .course-tag-list {
        font-size: 12px;

        margin-top: em(23px, 12px);
        .course-tip {
            line-height: em(18px, 12px);

            display: inline-block;

            margin-right: 4px;
            margin-bottom: 4px;
            padding: em(8px, 12px) em(20px, 12px);

            color: #777;
            border: 1px solid #e0e9f5;
            border-radius: em(18px, 12px);
            background: #f5f8fc;
        }
    }
    .course-attr {
        .count-info {
            font-size: 14px;
            line-height: em(21px, 14px);

            margin-top: 28px;

            color: #b1b5c4;
            span {
                display: block;

                text-align: center;
            }
            .num {
                font-family: "Inter";
                font-size: 36px;
                font-weight: 700;
                line-height: em(44px, 36px);
            }
        }
        .count-not-use {
            .num {
                color: #f8af00;
            }
        }
        .divide-line {
            width: 1px;
            height: 40px;
            margin: 0 26px;

            background-color: rgba(#000, 0.1);
        }
        .count-total {
            .num {
                color: #2d2b32;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        display: block;

        padding-bottom: 30px;

        border-bottom: 1px solid #eee;
        .course-thumb {
            //
        }
        .course-attr {
            display: flex;
            flex-direction: row;

            margin-top: 20px;

            align-items: center;
            justify-content: space-between;
            .count-info {
                margin: 0;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .course-title {
            font-size: 22px;
        }
        .course-tag-list {
            font-size: 11px;
        }
        .course-thumb {
            flex: 0 0 auto;

            width: 250px;
        }
    }
    @include media-breakpoint-down(md) {
        .course-intro {
            display: block;
        }
        .course-thumb {
            margin-bottom: 22px;
        }
        .course-attr {
            display: block;
            .count-info {
                margin-top: 20px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .course-thumb {
            width: 100%;
        }
    }
}
.lesson-group {
    margin-top: 40px;
    .category-list {
        margin-bottom: 30px;

        gap: 13px;
    }
    .finish-reason {
        padding-bottom: 28px;

        border-bottom: 1px solid #e6e8ec;
        .option {
            @include space-between(40px);
            font-size: 14px;
            line-height: em(21px, 14px);

            transition: 0.26s ease;

            color: #777;
            &[data-active] {
                color: #f8af00;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .category-list {
            font-size: 13px;
            .button {
                padding: 8px 20px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        margin-top: 30px;
        .category-list {
            width: 100%;

            gap: 6px;
            .button {
                padding: 10px 20px;

                border-radius: 4px;
            }
        }
    }
}
.lesson-list {
    .list-item {
        padding: 28px 0;

        border-bottom: 1px solid #e6e8ec;
        &:last-child {
            border-bottom-width: 0;
        }
        .item-state {
            margin-bottom: 4px;
            &[data-state="1"] {
                color: #f8af00;
            }
            &[data-state="2"] {
                color: #f8af00;
            }
            &[data-state="3"] {
                color: #29cc6a;
            }
            &[data-state="4"] {
                color: #fc5555;
            }
        }
    }
    .date {
        flex: 0 0 auto;

        width: 206px;
        padding-right: 30px;
    }
    .time {
        font-size: 18px;
        font-weight: 700;
        line-height: em(27px, 18px);

        margin-bottom: 5px;

        color: #2d2b32;
    }
    .day {
        font-size: 12px;
        line-height: em(18px, 12px);

        color: #777;
    }
    .title {
        font-size: 18px;
        font-weight: 700;
        line-height: em(27px, 18px);

        flex: 1 1 auto;

        color: #2d2b32;
    }
    .buttons[data-layout="1"] {
        .button {
            @include space-between(10px);
            padding: 12px 40px;

            border-radius: 6px;
        }
    }
    .buttons[data-layout="2"] {
        .button {
            @include space-between(10px);
            font-size: 12px;
            line-height: em(18px, 12px);

            padding: 8px 25px;

            border-radius: 25px;
        }
    }
    @include media-breakpoint-down(lg) {
        .list-item {
            .item-row {
                display: grid;

                grid-template-columns: 1fr auto;
            }
        }
        .date {
            width: 100%;
            margin-bottom: 12px;
            padding: 0;
        }
        .title {
            align-self: center;
            grid-area: 2 / 1 / 3 / 2;
        }
        .buttons {
            grid-area: 2 / 2 / 3 / 3;
        }
    }
    @include media-breakpoint-down(md) {
        .list-item {
            .item-row {
                grid-template-columns: 1fr;
            }
        }
        .title {
            grid-area: 2 / 1 / 3 / 2;
        }
        .buttons {
            margin-top: 24px;

            grid-area: 3 / 1 / 4 / 2;

            justify-content: flex-end;
        }
    }
    @include media-breakpoint-down(sm) {
        .buttons[data-layout="1"] {
            display: grid;

            gap: 5px;
            grid-template-columns: repeat(3, 1fr);
            .button {
                font-size: 12px;

                margin: 0;
                padding: 10px;

                text-align: center;
            }
        }
        .buttons[data-layout="2"] {
            display: grid;

            gap: 5px;
            grid-template-columns: repeat(2, 1fr);
            .button {
                font-size: 12px;

                margin: 0;
                padding: 10px;

                text-align: center;
            }
        }
        // .list-item .buttons {
        //     margin-top: 30px;

        //     grid-area: 3 / 1 / 4 / 2;

        //     justify-content: flex-start;
        //     flex-grow: wrap;
        //     .button {
        //         width: 50%;
        //         flex: 1 1 auto;
        //         @include space-between(12px, y);
        //         line-height: 1.6em;

        //         width: 100%;

        //         text-align: center;

        //         border-radius: 4px;
        //     }
        // }
    }
}
.empty-panel {
    @include space-placeholder(880px, 437px);
    max-width: 100%;

    border-radius: 10px;
    background: #fafafc;
    .box {
        @include ab-cover;
    }
}
:global(.lang-en) {
    .course-item {
        .course-tag-list {
            .course-tip {
                padding: em(8px, 12px) em(12px, 12px);
            }
        }
    }
    .lesson-list {
        .buttons[data-layout="2"] .button {
            padding: 8px 18px;
        }
    }
}
.video-area {
    margin-top: 35px;
    padding-top: 35px;
    padding-bottom: 35px;
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

        cursor: pointer;
        transition: 0.26s ease;

        border-bottom: 1px solid #f3f6f9;
        &:hover {
            padding-left: em(14px, 16px);

            background: #f3f6f9;
        }
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
