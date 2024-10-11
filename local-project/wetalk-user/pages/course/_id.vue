<!--
 * @Description: 我的课程 - 课程列表
 * @Author: F-Stone
 * @LastEditTime: 2023-03-28 18:06:17
-->
<template>
    <div :class="$style['course-page']">
        <div :class="$style['course-intro-module']">
            <div class="wrapper--limit-width">
                <div class="wrapper--limit-width-mini">
                    <div :class="$style['module-body']">
                        <div
                            v-if="courseData"
                            class="flex justify-between items-center"
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
                                :style="{
                                    opacity: courseData.skuTypeid ? 1 : 0,
                                }"
                            >
                                <TagSku
                                    class="inline-block"
                                    :data="{
                                        skuTypeid: courseData.skuTypeid,
                                        type: courseData.type,
                                    }"
                                />
                                <div
                                    class="flex items-center"
                                    :class="$style['count-info']"
                                >
                                    <div :class="$style['count-not-use']">
                                        <span :class="$style['num']">{{
                                            courseData.classHour -
                                            courseData.classes
                                        }}</span>
                                        <span class="text">{{
                                            $t("KEY_BASE.COURSE_TIP.0")
                                        }}</span>
                                    </div>
                                    <div :class="$style['divide-line']"></div>
                                    <div :class="$style['count-total']">
                                        <span :class="$style['num']">{{
                                            courseData.classHour
                                        }}</span>
                                        <span class="text">{{
                                            $t("KEY_BASE.COURSE_TIP.1")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :class="$style['lesson-group']">
                            <div
                                class="inline-grid grid-cols-3"
                                :class="$style['category-list']"
                            >
                                <PublicButton
                                    v-for="(
                                        item, index
                                    ) in currentCategoryOption"
                                    :key="index"
                                    :active="currentCategory === item.value"
                                    :class="$style['button']"
                                    @click.native="
                                        changeCurrentCategory(item.value)
                                    "
                                >
                                    <span class="text">{{ item.title }}</span>
                                </PublicButton>
                            </div>
                            <div
                                v-if="currentCategory === 2"
                                class="flex"
                                :class="$style['finish-reason']"
                            >
                                <button
                                    v-for="(item, index) in finishReasonOption"
                                    :key="index"
                                    :class="$style['option']"
                                    :data-active="finishReason === item.value"
                                    @click="changeFinishReason(item.value)"
                                >
                                    <span class="text">{{ item.title }}</span>
                                </button>
                            </div>
                            <div
                                v-if="showCourse.length"
                                :class="$style['lesson-list']"
                            >
                                <div
                                    v-for="item in showCourse"
                                    :key="item.userLessonid"
                                    :class="$style['list-item']"
                                >
                                    <div
                                        v-if="item.menkeState >= 0"
                                        :class="$style['item-state']"
                                        :data-state="item.menkeState"
                                    >
                                        {{ state[item.menkeState] }}
                                    </div>
                                    <div
                                        class="flex items-start"
                                        :class="$style['item-row']"
                                    >
                                        <div :class="$style['date']">
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
                                        <div :class="$style['title']">
                                            <span class="text">{{
                                                item.lessonName
                                            }}</span>
                                        </div>
                                        <div
                                            v-if="item.menkeState < 2"
                                            class="flex"
                                            data-layout="1"
                                            :class="$style['buttons']"
                                        >
                                            <BtnEntryClassroom
                                                v-if="item.menkeState < 2"
                                                :class="$style['button']"
                                                :time="item.classroomMin"
                                                :url="item.menkeEntryurl"
                                            />
                                            <BtnLessonCancel
                                                v-if="item.menkeState === 1"
                                                :id="item.userLessonid"
                                                :disable="item.isCancel === 0"
                                                :class="$style['button']"
                                            />
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
                                        <div
                                            v-else
                                            class="flex"
                                            data-layout="2"
                                            :class="$style['buttons']"
                                        >
                                            <template
                                                v-if="item.menkeState === 3"
                                            >
                                                <BtnAppraiseTeacher
                                                    :id="item.userLessonid"
                                                    :state="item.isScore"
                                                    :class="$style['button']"
                                                />
                                                <PublicButton
                                                    v-if="item.isHomeWork"
                                                    target="_blank"
                                                    :class="$style['button']"
                                                    :to="
                                                        linkManage.courseHomework +
                                                        '/' +
                                                        item.userLessonid
                                                    "
                                                >
                                                    <span class="text">{{
                                                        $t("KEY_BASE.HOMEWORK")
                                                    }}</span>
                                                </PublicButton>
                                                <BtnReport
                                                    :id="
                                                        item.userLessonReportid
                                                    "
                                                    :class="$style['button']"
                                                    :is-ok="item.isReport === 1"
                                                >
                                                    <span class="text">{{
                                                        $t(
                                                            "KEY_BASE.COURSER_REPORT"
                                                        )
                                                    }}</span>
                                                </BtnReport>
                                            </template>
                                            <template v-else>
                                                <PublicButton
                                                    :class="$style['button']"
                                                    @click.native="openZC"
                                                >
                                                    <span class="text">{{
                                                        $t(
                                                            "KEY_BASE.CONTACT_US"
                                                        )
                                                    }}</span>
                                                </PublicButton>
                                            </template>
                                            <!-- <BtnPlayVideo
                                            v-if="item.recordUrl"
                                            :class="$style['button']"
                                            :video="item.recordUrl"
                                            >课节回放
                                        </BtnPlayVideo> -->
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
                                </div>
                            </div>
                            <div
                                v-else
                                class="relative -mt-0.5"
                                :class="$style['empty-panel']"
                            >
                                <div
                                    class="flex items-center justify-center"
                                    :class="$style['box']"
                                >
                                    <BtnBooking
                                        v-if="currentCategory === 0"
                                        :id="userCourseid"
                                        layout="radius"
                                        :active="true"
                                    >
                                        <span class="text">{{
                                            $t("KEY_BASE.TIP_MSG.8")
                                        }}</span>
                                    </BtnBooking>
                                    <div v-if="currentCategory === 1">
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
                                    </div>
                                    <div v-if="currentCategory === 2">
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <PageTab
                                v-if="pageInfo.total > 0"
                                :class="$style['page-tab']"
                                :current-index="pageInfo.page"
                                :page-size="pageInfo.pageSize"
                                :total="pageInfo.total"
                                @changePage="changePage"
                            >
                            </PageTab>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type {
    TYPE_USER_LESSON_LIST,
    TYPE_USER_COURSE,
} from "@/assets/script/api/api";

import { computed, onMounted, reactive, ref, watch } from "vue";
import { useContext, useRoute } from "@nuxtjs/composition-api";

import { UserLessonList, UserCourse } from "@/assets/script/api/api";

import linkManage from "~/assets/script/local-data/link-manage";
import { getClock, getWeekTimeReverse } from "@/assets/script/util/date";

const { i18n, app } = useContext();
const route = useRoute();
const lang = app.i18n.locale;

const currentCategory = ref<0 | 1 | 2>(0);
const pageInfo = reactive<{ total: number; pageSize: number; page: number }>({
    total: 0,
    pageSize: 12,
    page: 1,
});
const currentCategoryOption: { title: string; value: 0 | 1 | 2 }[] = [
    { title: i18n.t("KEY_BASE.COURSE_STATUS.3"), value: 0 },
    { title: i18n.t("KEY_BASE.COURSE_STATUS.2"), value: 1 },
    { title: i18n.t("KEY_BASE.COURSE_STATUS.6"), value: 2 },
];

function changeCurrentCategory(value: 0 | 1 | 2) {
    currentCategory.value = value;
    pageInfo.page = 1;
}

// 0全部，1已完成，2未完成/缺席,3已取消
type TYPE_FINISH_REASON = 0 | 1 | 2 | 3;
const finishReason = ref<TYPE_FINISH_REASON>(0);
const finishReasonOption: { title: string; value: TYPE_FINISH_REASON }[] = [
    {
        title: i18n.t("KEY_BASE.ALL_TEXT"),
        value: 0,
    },
    {
        title: i18n.t("KEY_ORDER.STATUS.4"),
        value: 1,
    },
    {
        title: i18n.t("KEY_BASE.COURSE_STATUS.5"),
        value: 2,
    },
    {
        title: i18n.t("KEY_BASE.COURSE_STATUS.4"),
        value: 3,
    },
];

const state: { [key: number]: string } = {
    1: i18n.t("KEY_BASE.COURSE_STATUS.3"),
    2: i18n.t("KEY_BASE.COURSE_STATUS.2"),
    3: i18n.t("KEY_BASE.COURSE_STATUS.1"),
    4: i18n.t("KEY_BASE.COURSE_STATUS.0"),
};

function changeFinishReason(value: TYPE_FINISH_REASON) {
    finishReason.value = value;
    pageInfo.page = 1;
}

const courseData = ref<TYPE_USER_COURSE>();

const showCourse = ref<TYPE_USER_LESSON_LIST["list"]>([]);

function changePage(pageIndex: number) {
    if (typeof pageIndex === "undefined") return;
    pageInfo.page = pageIndex;
}

const userCourseid = computed(() => {
    return Number(route.value.params.id);
});

function updateLessonList() {
    UserLessonList({
        userCourseid: userCourseid.value,
        startStatus: currentCategory.value,
        endStatus: finishReason.value,
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
    }).then((res) => {
        pageInfo.total = res.data.total;
        showCourse.value = res.data.list;
    });
}
watch([() => pageInfo.page, currentCategory, finishReason], updateLessonList, {
    immediate: true,
});

function openZC() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    zc("frame_status", function (data) {
        // console.log(data);
    });
}

onMounted(() => {
    UserCourse({ userCourseid: Number(route.value.params.id) }).then((res) => {
        if (res.data.message && res.data.message.length >= 17) {
            res.data.message = res.data.message.slice(0, 14) + "...";
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
</style>
