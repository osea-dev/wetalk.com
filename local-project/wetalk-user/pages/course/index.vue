<template>
    <div :class="$style['course-page']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['user-course-panel']">
                    <div :class="$style['panel-head']">
                        <h2 :class="$style['panel-title']">
                            {{ $t("KEY_BASE.MY_COURSE") }}
                        </h2>
                    </div>
                    <div :class="$style['panel-body']">
                        <div
                            class="inline-grid grid-cols-5 md:grid-cols-3"
                            :class="[$style['course-tab-list']]"
                        >
                            <PublicButton
                                :class="$style['list-item']"
                                :active="currentTab === '3'"
                                @click.native="currentTab = '3'"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.COURSE_TYPE.3")
                                }}</span>
                            </PublicButton>
                            <PublicButton
                                :class="$style['list-item']"
                                :active="currentTab === '4'"
                                @click.native="currentTab = '4'"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.COURSE_TYPE.4")
                                }}</span>
                            </PublicButton>
                            <PublicButton
                                :class="$style['list-item']"
                                :active="currentTab === '5'"
                                @click.native="currentTab = '5'"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.COURSE_TYPE.5")
                                }}</span>
                            </PublicButton>
                            <PublicButton
                                :class="$style['list-item']"
                                :active="currentTab === '1'"
                                @click.native="currentTab = '1'"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.COURSE_TYPE.0")
                                }}</span>
                            </PublicButton>
                            <PublicButton
                                :class="$style['list-item']"
                                :active="currentTab === '2'"
                                @click.native="currentTab = '2'"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.COURSE_TYPE.1")
                                }}</span>
                            </PublicButton>
                        </div>
                        <div
                            v-if="currentTab === '1'"
                            :class="[
                                $style['user-course-list'],
                                $style['course-list'],
                            ]"
                        >
                            <template v-if="userCourseList.length">
                                <div
                                    v-for="(item, index) in userCourseList"
                                    :key="index"
                                    class="flex items-start"
                                    :class="$style['list-item']"
                                >
                                    <div
                                        class="flex items-start"
                                        :class="$style['course-intro']"
                                    >
                                        <div :class="$style['thumb']">
                                            <img :src="item.img" />
                                            <div
                                                v-if="item.status === 2"
                                                :class="$style['cover']"
                                                class="flex items-center justify-center"
                                            >
                                                <i
                                                    class="ic iconfont icon-lock mr-1"
                                                ></i>
                                                <span class="text">{{
                                                    $t("KEY_BASE.COURSE_TYPE.2")
                                                }}</span>
                                            </div>
                                        </div>
                                        <div :class="$style['info']">
                                            <div :class="$style['title']">
                                                <span class="text">{{
                                                    item.title
                                                }}</span>
                                            </div>
                                            <div :class="$style['buy']">
                                                <span class="text">{{
                                                    $t("KEY_ORDER.TIP.4", [
                                                        item.classHour,
                                                    ])
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        :class="$style['course-type']"
                                        :style="{
                                            opacity: item.skuTypeid ? 1 : 0,
                                        }"
                                    >
                                        <span :class="$style['title']">
                                            {{ $t("KEY_BASE.LESSON_METHOD") }}
                                        </span>
                                        <TagSku
                                            class="inline-block lg:"
                                            :data="{
                                                skuTypeid: item.skuTypeid,
                                                type: item.type,
                                            }"
                                        />
                                    </div>
                                    <div :class="$style['course-progress']">
                                        <span :class="$style['title']">{{
                                            $t("KEY_BASE.LESSON_PROGRESS")
                                        }}</span>
                                        <div
                                            class="inline-flex items-center xl:flex"
                                            :class="$style['process']"
                                        >
                                            <div
                                                class="flex-auto"
                                                :class="$style['process-bar']"
                                            >
                                                <div
                                                    :class="
                                                        $style['process-inner']
                                                    "
                                                    :style="{
                                                        width:
                                                            (item.classes /
                                                                item.classHour) *
                                                                100 +
                                                            '%',
                                                    }"
                                                ></div>
                                            </div>
                                            <div
                                                :class="$style['process-count']"
                                            >
                                                <span
                                                    class="text"
                                                    :class="$style['finish']"
                                                    >{{ item.classes }}</span
                                                >/<span
                                                    class="text"
                                                    :class="$style['total']"
                                                    >{{ item.classHour }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="$style['course-btns']">
                                        <PublicButton
                                            :class="$style['button']"
                                            :to="
                                                linkManage.course +
                                                '/' +
                                                item.userCourseid
                                            "
                                        >
                                            <span class="text">{{
                                                $t("KEY_BASE.LESSON_LIST")
                                            }}</span>
                                        </PublicButton>
                                    </div>
                                </div>
                            </template>
                            <div
                                v-else
                                class="relative"
                                :class="$style['empty-panel']"
                            >
                                <div
                                    class="flex items-center justify-center"
                                    :class="$style['box']"
                                >
                                    <div>
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="currentTab === '2'"
                            :class="[
                                $style['free-course-list'],
                                $style['course-list'],
                            ]"
                        >
                            <template v-if="freeCourseList.length">
                                <div
                                    v-for="(item, index) in freeCourseList"
                                    :key="index"
                                    class="flex items-center"
                                    :class="$style['list-item']"
                                >
                                    <div
                                        class="flex items-start"
                                        :class="$style['course-intro']"
                                    >
                                        <div :class="$style['info']">
                                            <div :class="$style['time']">
                                                <span class="text">{{
                                                    getClock(
                                                        item.menkeStarttime
                                                    ) +
                                                    "-" +
                                                    getClock(item.menkeEndtime)
                                                }}</span>
                                            </div>
                                            <div :class="$style['day']">
                                                <span class="text">{{
                                                    getWeekTimeReverse(
                                                        item.menkeStarttime,
                                                        lang
                                                    )
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="$style['course-type']">
                                        <span :class="$style['title']">
                                            {{
                                                $t("KEY_BASE.COURSE_TITLE")
                                            }}</span
                                        >
                                        <span class="text whitespace-nowrap">
                                            {{ item.lessonName }}
                                        </span>
                                    </div>
                                    <div :class="$style['course-progress']">
                                        <span :class="$style['title']">{{
                                            $t("KEY_BASE.LESSON_PROGRESS")
                                        }}</span>
                                        <div
                                            class="inline-flex items-center lg:flex"
                                            :class="$style['process']"
                                        >
                                            <div
                                                class="flex-auto"
                                                :class="$style['process-bar']"
                                            >
                                                <div
                                                    :class="
                                                        $style['process-inner']
                                                    "
                                                    :data-status="
                                                        item.menkeState
                                                    "
                                                    :style="{
                                                        width: 100 + '%',
                                                    }"
                                                ></div>
                                            </div>
                                            <div
                                                :class="$style['process-count']"
                                            >
                                                <span
                                                    class="text"
                                                    :class="$style['finish']"
                                                    >1</span
                                                >/<span
                                                    class="text"
                                                    :class="$style['total']"
                                                    >1</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        :class="$style['course-btns']"
                                        class="flex"
                                    >
                                        <PublicButton
                                            v-if="item.menkeState == 4"
                                            state="error"
                                            :class="[
                                                $style['course-report'],
                                                $style['button'],
                                            ]"
                                            :disable="true"
                                        >
                                            <span class="text">{{
                                                $t("KEY_BASE.COURSE_STATUS.0")
                                            }}</span>
                                        </PublicButton>
                                        <PublicButton
                                            :class="$style['button']"
                                            :to="
                                                linkManage.courseLesson +
                                                '/' +
                                                item.userLessonid
                                            "
                                        >
                                            <span class="text">{{
                                                $t("KEY_BASE.DETAIL")
                                            }}</span>
                                        </PublicButton>
                                    </div>
                                </div>
                            </template>
                            <div
                                v-else
                                class="relative"
                                :class="$style['empty-panel']"
                            >
                                <div
                                    class="flex items-center justify-center"
                                    :class="$style['box']"
                                >
                                    <div>
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="currentTab === '3'"
                            :class="[
                                $style['user-course-list'],
                                $style['course-list'],
                                $style['record-course-list'],
                            ]"
                        >
                            <template v-if="recordCourseList.length">
                                <div
                                    v-for="(item, index) in recordCourseList"
                                    :key="index"
                                    class="flex items-center justify-between"
                                    :class="$style['list-item']"
                                >
                                    <div
                                        class="flex items-center"
                                        :class="$style['course-intro']"
                                    >
                                        <div :class="$style['thumb']">
                                            <img :src="item.img" />
                                        </div>
                                        <div :class="$style['info']">
                                            <div :class="$style['title']">
                                                <span class="text">{{
                                                    item.title
                                                }}</span>
                                            </div>
                                            <div :class="$style['buy']">
                                                <span class="text">{{
                                                    $t("KEY_ORDER.TIP.13", [
                                                        item.lessonCount,
                                                    ])
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="$style['course-btns']">
                                        <PublicButton
                                            :class="$style['button']"
                                            :to="
                                                linkManage.course +
                                                '/record-course/' +
                                                item.orderid
                                            "
                                        >
                                            <span class="text">{{
                                                $t("KEY_BASE.LESSON_LIST")
                                            }}</span>
                                        </PublicButton>
                                    </div>
                                </div>
                            </template>
                            <div
                                v-else
                                class="relative"
                                :class="$style['empty-panel']"
                            >
                                <div
                                    class="flex items-center justify-center"
                                    :class="$style['box']"
                                >
                                    <div>
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="currentTab === '4'"
                            :class="[
                                $style['user-course-list'],
                                $style['course-list'],
                                $style['online-course-list'],
                            ]"
                        >
                            <template v-if="onlineCourseList">
                                <div
                                    v-for="(item, index) in onlineCourseList"
                                    :key="index"
                                    class="flex items-center justify-between"
                                    :class="$style['list-item']"
                                >
                                    <div
                                        class="flex items-center"
                                        :class="$style['course-intro']"
                                    >
                                        <div :class="$style['thumb']">
                                            <img :src="item.img" />
                                        </div>
                                        <div :class="$style['info']">
                                            <div :class="$style['title']">
                                                <span class="text">{{
                                                    item.title
                                                }}</span>
                                            </div>
                                            <div :class="$style['buy']">
                                                <span class="text">{{
                                                    $t("KEY_ORDER.TIP.13", [
                                                        item.lessonCount,
                                                    ])
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="$style['course-btns']">
                                        <PublicButton
                                            :class="$style['button']"
                                            :to="
                                                linkManage.course +
                                                '/' +
                                                item.userCourseid
                                            "
                                        >
                                            <span class="text">{{
                                                $t("KEY_BASE.LESSON_LIST")
                                            }}</span>
                                        </PublicButton>
                                    </div>
                                </div>
                            </template>
                            <div
                                v-else
                                class="relative"
                                :class="$style['empty-panel']"
                            >
                                <div
                                    class="flex items-center justify-center"
                                    :class="$style['box']"
                                >
                                    <div>
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="currentTab === '5'"
                            :class="[
                                $style['user-course-list'],
                                $style['course-list'],
                                $style['offline-course-list'],
                            ]"
                        >
                            <template v-if="offlineCourseList">
                                <div
                                    v-for="(item, index) in offlineCourseList"
                                    :key="index"
                                    class="flex items-center justify-between"
                                    :class="$style['list-item']"
                                >
                                    <div
                                        class="flex items-center"
                                        :class="$style['course-intro']"
                                    >
                                        <div :class="$style['thumb']">
                                            <img :src="item.img" />
                                        </div>
                                        <div :class="$style['info']">
                                            <div :class="$style['title']">
                                                <span class="text">{{
                                                    item.title
                                                }}</span>
                                            </div>
                                            <div :class="$style['buy']">
                                                <span class="text">{{
                                                    $t("KEY_ORDER.TIP.13", [
                                                        item.lessonCount,
                                                    ])
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="$style['course-btns']">
                                        <PublicButton
                                            :class="$style['button']"
                                            @click.native="openZC"
                                        >
                                            <span class="text">{{
                                                $t("KEY_BASE.CONTACT_US")
                                            }}</span>
                                        </PublicButton>
                                    </div>
                                </div>
                            </template>
                            <div
                                v-else
                                class="relative"
                                :class="$style['empty-panel']"
                            >
                                <div
                                    class="flex items-center justify-center"
                                    :class="$style['box']"
                                >
                                    <div>
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
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
import type {
    TYPE_USER_COURSE_LIST,
    TYPE_TRIAL_USER_LESSON,
} from "@/assets/script/api/api";
import { onMounted, ref } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";

import { getClock, getWeekTimeReverse } from "@/assets/script/util/date";

import {
    UserCourseList,
    TrialUserLessonList,
    getMyRecordCourseList,
    TYPE_RECORD_COURSE_LIST,
    TYPE_ONLINE_COURSE_ITEM,
    TYPE_OFFLINE_COURSE_ITEM,
    getMyOfflineCourseList,
    getMyOnlineCourseList,
} from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

const { app } = useContext();
const lang = app.i18n.locale;

const currentTab = ref<string>("3");
const recordCourseList = ref<TYPE_RECORD_COURSE_LIST[]>([]);
const userCourseList = ref<TYPE_USER_COURSE_LIST[]>([]);
const freeCourseList = ref<TYPE_TRIAL_USER_LESSON[]>([]);
const onlineCourseList = ref<TYPE_ONLINE_COURSE_ITEM[]>([]);
const offlineCourseList = ref<TYPE_OFFLINE_COURSE_ITEM[]>([]);

// 打开客服
function openZC() {
    $(".zhiCustomBtn").trigger("click");
}

onMounted(() => {
    getMyRecordCourseList().then((res) => {
        recordCourseList.value = res.data;
    });
    UserCourseList().then((res) => {
        userCourseList.value = res.data;
    });
    TrialUserLessonList().then((res) => {
        freeCourseList.value = res.data;
    });
    getMyOnlineCourseList().then((res) => {
        onlineCourseList.value = res.data;
    });
    getMyOfflineCourseList().then((res) => {
        offlineCourseList.value = res.data;
    });
});
</script>
<style lang="scss" module>
.course-page {
    //
}
.user-course-panel {
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    .panel-head {
        margin-bottom: 25px;
    }
    .panel-title {
        @include panel-head;
    }
    .course-tab-list {
        margin-bottom: 5px;

        white-space: nowrap;

        gap: 13px;
    }
    .list-item {
        padding: 10px 20px;
    }
    @include media-breakpoint-down(lg) {
        font-size: 12px;
        .list-item {
            padding: 10px 20px;
        }
    }
    @include media-breakpoint-down(sm) {
        padding: $panel-padding-2;
        .course-tab-list {
            width: 100%;
            margin-bottom: 0;
            .list-item {
                border-radius: 4px;
            }
        }
    }
}
:global(.lang-en) {
    .user-course-panel {
        @include media-breakpoint-down(lg) {
            .course-tab-list {
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
        }
        @include media-breakpoint-down(md) {
            .course-tab-list {
                grid-template-columns: repeat(3, minmax(0, 1fr));
                .list-item {
                    padding: 10px;
                }
            }
        }
        @include media-breakpoint-down(sm) {
            .course-tab-list {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
    }
}
.course-list {
    .list-item {
        padding: 35px 0;
    }
    .course-intro {
        margin-right: 30px;
        .thumb {
            @include image-placeholder(114px, 70px);
            position: relative;

            margin-right: 25px;

            border-radius: 6px;
            .cover {
                @include ab-cover();

                font-size: 13px;
                line-height: 20px;

                z-index: 10;

                content: "";

                color: #fff;
                background-color: rgb(28 28 28 / 0.3);
            }
        }
        .info {
            width: 186px;
        }
        .title {
            @include ellipse(1);
            font-size: 16px;
            font-weight: 700;
            line-height: em(24px, 16px);

            margin-bottom: 9px;

            color: #333;
        }
        .buy {
            @include ellipse(1);
            font-size: 13px;
            line-height: em(20px, 13px);

            color: #b1b5c4;
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
    }
    .course-type {
        width: 154px;
        margin-right: 30px;
        .title {
            font-size: 13px;
            line-height: em(20px, 13px);

            display: block;

            margin-bottom: 20px;

            color: #777;
        }
    }
    .course-progress {
        flex: 1 1 auto;

        margin-right: 30px;
        .title {
            font-size: 13px;
            line-height: em(20px, 13px);

            display: block;

            margin-bottom: 22px;

            color: #777;
        }
        .process {
            //
        }
        .process-bar {
            overflow: hidden;

            width: 100px;
            height: 8px;
            margin-right: 10px;

            border-radius: 10px;
            background: #f5f6f9;
        }
        .process-inner {
            max-width: 100%;
            height: 100%;

            border-radius: 10px;
            background: #0aca91;
            &[data-status="1"],
            &[data-status="2"] {
                width: 0;
            }
            &[data-status="3"],
            &[data-status="4"] {
                width: 100%;
            }
        }
        .process-count {
            font-family: "Inter";
            font-size: 13px;
            font-weight: 700;
            line-height: em(16px, 13px);

            color: #777;
            .finish {
                color: #2d2b32;
            }
        }
    }
    .course-btns {
        padding-top: 7px;
        .button {
            @include space-between(10px);
        }
    }
}
.record-course-list {
    .course-btns {
        padding-top: 0;

        grid-area: 1/2 !important;
    }
    @include media-breakpoint-down(sm) {
        .course-btns {
            grid-area: 2/1 !important;
        }
    }
}
.user-course-list {
    @include media-breakpoint-down(xl) {
        .list-item {
            display: grid;

            gap: 30px;
            grid-template-columns: repeat(3, 1fr);
            & > * {
                width: 100%;
                margin: 0;
            }
            .course-btns {
                padding: 0;

                text-align: right;

                grid-area: 2 / 1 / 3 / 4;

                justify-self: flex-end;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .list-item {
            border-bottom: 1px solid #eee;

            grid-template-columns: repeat(2, 1fr);
            &:last-child {
                border-bottom-width: 0 !important;
            }
            .course-btns {
                grid-area: 2 / 2 / 3 / 3;
            }
            .course-type {
                text-align: right;
                .title {
                    display: none;
                }
            }
            .course-progress {
                justify-self: center;
                .title {
                    margin: 0;
                    margin-bottom: 8px;
                }
            }
        }
    }
    @include media-breakpoint-down(md) {
        .list-item {
            gap: 20px 12px;
            .course-intro {
                grid-area: 1 / 1 / 2 / 3;
            }
            .course-type {
                text-align: left;

                grid-area: 2 / 1 / 3 / 2;
            }
            .course-progress {
                grid-area: 2 / 2 / 3 / 3;
            }
            .course-btns {
                grid-area: 1 / 2 / 2 / 3;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .list-item {
            grid-template-columns: 1fr;
            .course-intro {
                display: block;

                grid-area: 1 / 1 / 2 / 2;
                .thumb {
                    width: 100%;
                }
                .info {
                    margin-top: 20px;
                }
            }
            .course-type {
                text-align: left;

                grid-area: 2 / 1 / 3 / 2;
            }
            .course-progress {
                grid-area: 3 / 1 / 4 / 2;
            }
            .course-btns {
                grid-area: 4 / 1 / 5 / 2;
            }
            .button {
                width: 100%;

                text-align: center;

                border-radius: 4px;
            }
        }
    }
}
.free-course-list {
    @include media-breakpoint-down(lg) {
        .list-item {
            display: grid;

            border-bottom: 1px solid #eee;

            gap: 30px;
            grid-template-columns: repeat(3, auto);
            & > * {
                width: 100%;
                margin: 0;
            }
            .title {
                margin-bottom: 12px;
            }
            &:last-child {
                border-bottom-width: 0 !important;
            }
        }
        .course-btns {
            width: 100%;
            padding: 0;

            grid-area: 2 / 1 / 3 / 4;
            justify-content: flex-end;
        }
    }
    @include media-breakpoint-down(md) {
        .list-item {
            gap: 20px 10px;
            grid-template-columns: repeat(2, auto);
        }
        .course-type {
            grid-area: 2 / 1 / 3 / 2;
        }
        .course-progress {
            grid-area: 2 / 2 / 3 / 3;
        }
        .course-btns {
            grid-area: 1 / 2 / 2 / 3;
        }
    }
    @include media-breakpoint-down(sm) {
        .list-item {
            grid-template-columns: 1fr;
            .course-intro {
                display: block;

                grid-area: 1 / 1 / 2 / 2;
                .info {
                    width: 100%;
                }
            }
            .course-type {
                text-align: left;

                grid-area: 2 / 1 / 3 / 2;
            }
            .course-progress {
                grid-area: 3 / 1 / 4 / 2;
            }
            .course-btns {
                grid-area: 4 / 1 / 5 / 2;
            }
            .button {
                width: 100%;

                text-align: center;

                border-radius: 4px;
            }
        }
    }
}
.empty-panel {
    @include space-placeholder(880px, 437px);
    max-width: 100%;
    margin-top: 30px;

    border-radius: 10px;
    background: #fafafc;
    .box {
        @include ab-cover;
    }
}
</style>
