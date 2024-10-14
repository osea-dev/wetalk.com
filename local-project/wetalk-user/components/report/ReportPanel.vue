<template>
    <div :class="$style['report-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">
                <span class="text">{{ $t("KEY_NAV.REPORT") }}</span>
            </h2>
            <div :class="$style['btn-list']" class="inline-grid">
                <div :class="$style['list-item']">
                    <button
                        class="h-full"
                        :data-active="type === 'lesson'"
                        :class="$style['btn--lesson']"
                        @click="type = 'lesson'"
                    >
                        {{ $t("KEY_BASE.COURSE_REPORT_DETAIL") }}
                    </button>
                </div>
                <div
                    :class="$style['list-item']"
                    :data-active="type === 'level'"
                >
                    <button
                        class="h-full"
                        :data-active="type === 'level'"
                        @click="type = 'level'"
                        :class="$style['btn--level']"
                    >
                        {{ $t("KEY_REPORT_PANEL.TIP.0") }}
                    </button>
                </div>
            </div>
        </div>
        <div :class="$style['panel-body']">
            <template v-if="type === 'lesson'">
                <template v-if="courseReport.length">
                    <div
                        :class="$style['course-group']"
                        v-for="(course, index) in courseReport"
                        :data-open="course.userCourseid === openCourseId"
                        :key="index"
                    >
                        <div :class="$style['group-head']" class="grid">
                            <div
                                class="state-pos--left"
                                :class="$style['left-area']"
                            >
                                <div :class="$style['course-name']">
                                    <span class="text">{{
                                        course.courseName
                                    }}</span>
                                </div>
                                <div :class="$style['course-count']">
                                    <span class="text">{{
                                        $t("KEY_BASE.TOTAL_COURSE", [
                                            course.classHour,
                                        ])
                                    }}</span>
                                </div>
                            </div>
                            <div class="state-pos--center">
                                <TagSku
                                    class="inline-block"
                                    :data="{
                                        skuTypeid: course.skuTypeid,
                                        type: course.type,
                                    }"
                                />
                            </div>
                            <div
                                class="state-pos--right flex items-start"
                                :class="$style['right-area']"
                            >
                                <button
                                    :class="[$style['more']]"
                                    @click="openCourse(course.userCourseid)"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.ALL")
                                    }}</span>
                                    <i
                                        class="ic icon iconfont icon-arrow-down"
                                    ></i>
                                </button>
                            </div>
                        </div>
                        <div
                            :class="$style['group-body']"
                            v-show="openCourseId === course.userCourseid"
                        >
                            <div
                                v-if="course.lessonReports.length > 0"
                                :class="[
                                    $style['report-list'],
                                    $style['lesson-report-list'],
                                ]"
                            >
                                <div
                                    :class="$style['list-item']"
                                    class="grid"
                                    v-for="(
                                        item, index
                                    ) in course.lessonReports"
                                    :key="index"
                                >
                                    <div
                                        class="state-pos--left"
                                        :class="$style['left-area']"
                                    >
                                        <div :class="$style['report-time']">
                                            <span class="text">{{
                                                getClock(item.menkeStarttime) +
                                                "-" +
                                                getClock(item.menkeEndtime)
                                            }}</span>
                                        </div>
                                        <div :class="$style['report-day']">
                                            <span class="text">{{
                                                getWeekTimeReverse(
                                                    item.menkeStarttime,
                                                    lang
                                                )
                                            }}</span>
                                        </div>
                                    </div>
                                    <div
                                        class="state-pos--center flex-auto"
                                        :class="$style['center-area']"
                                    >
                                        <div :class="$style['lesson-index']">
                                            {{ item.lessonName }}
                                        </div>
                                    </div>
                                    <div
                                        class="state-pos--right flex-none flex items-center"
                                        :class="$style['right-area']"
                                    >
                                        <BtnReport
                                            :class="$style['button']"
                                            :id="item.userLessonReportid"
                                            :isOk="true"
                                        >
                                            <span class="text">{{
                                                $t("KEY_OPEN_DETAIL")
                                            }}</span>
                                        </BtnReport>
                                    </div>
                                </div>
                            </div>
                            <PublicEmptyPanel
                                :class="$style['empty-panel']"
                                :text="$t('KEY_BASE.EMPTY')"
                                class="mt-4"
                                v-else
                            ></PublicEmptyPanel>
                        </div>
                    </div>
                </template>
                <div class="relative" v-else :class="$style['empty-panel']">
                    <div
                        class="flex items-center justify-center"
                        :class="$style['box']"
                    >
                        <div>
                            <span class="text">{{ $t("KEY_BASE.EMPTY") }}</span>
                        </div>
                    </div>
                </div>
            </template>
            <div
                :class="[$style['report-list'], $style['level-report-list']]"
                v-if="type === 'level'"
            >
                <template v-if="levelReportList.length">
                    <div
                        :class="$style['list-item']"
                        class="grid"
                        v-for="(item, index) in levelReportList"
                        :key="index"
                    >
                        <div
                            class="state-pos--left"
                            :class="$style['left-area']"
                        >
                            <div :class="$style['report-title']">
                                {{ item.menkeLessonName }}
                            </div>
                        </div>
                        <div class="state-pos--center flex-auto">
                            <div :class="$style['level-title']">
                                {{ $t("KEY_BASE.CURRENT_LEVEL") }}
                            </div>
                            <div :class="$style['level-tag']">
                                <span class="text">Level {{ item.level }}</span>
                            </div>
                        </div>
                        <div
                            class="state-pos--right flex-none flex items-center"
                        >
                            <BtnReport
                                :class="$style['button']"
                                :id="item.userLessonReportid"
                                :isOk="true"
                            >
                                <span class="text">{{
                                    $t("KEY_OPEN_DETAIL")
                                }}</span>
                            </BtnReport>
                        </div>
                    </div>
                </template>
                <div class="relative" v-else :class="$style['empty-panel']">
                    <div
                        class="flex items-center justify-center"
                        :class="$style['box']"
                    >
                        <div>
                            <span class="text">{{ $t("KEY_BASE.EMPTY") }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type {
    TYPE_LESSON_REPORT_LIST,
    TYPE_LEVEL_REPORT_LIST,
} from "@/assets/script/api/api";

import { onMounted, ref } from "vue";
import { getClock, getWeekTimeReverse } from "@/assets/script/util/date";

import { LevelReportList, LessonReportList } from "@/assets/script/api/api";
import { useContext, useRoute } from "@nuxtjs/composition-api";

const { app } = useContext();
const lang = app.i18n.locale;
const route = useRoute();
const type = ref<"lesson" | "level">("lesson");
const courseReport = ref<TYPE_LESSON_REPORT_LIST>([]);
const levelReportList = ref<TYPE_LEVEL_REPORT_LIST>([]);

const openCourseId = ref<number>(-1);
function openCourse(id: number) {
    if (id === openCourseId.value) {
        openCourseId.value = -1;
    } else {
        openCourseId.value = id;
    }
}

onMounted(() => {
    const qType = route.value.query.type;
    if (qType && (qType === "lesson" || qType === "level")) {
        type.value = qType;
    }
    LessonReportList().then((res) => {
        courseReport.value = res.data;
    });
    LevelReportList().then((res) => {
        levelReportList.value = res.data;
    });
});
</script>
<style lang="scss" module>
.report-panel {
    padding: calc(var(--p-normal) * 3.4) calc(var(--p-normal) * 4)
        calc(var(--p-normal) * 4);

    border-radius: var(--r-normal);
    background-color: #fff;
    .panel-head {
        margin-bottom: calc(var(--p-normal) * 2);
    }
    .panel-title {
        @include panel-head;
        margin-bottom: calc(var(--p-normal) * 2.5);
    }
    .btn-list {
        gap: 13px;
        grid-template-columns: auto auto;
        .btn--lesson,
        .btn--level {
            font-size: 14px;
            line-height: em(21px, 14px);

            padding: 12px 34px;

            transition: 0.26s ease;

            color: #777;
            border-radius: 26px;
            box-shadow: inset 0 0 0 2px #e6e8ec;
            &[data-active],
            &:hover {
                color: #fff;
                background: #f8af00;
                box-shadow: inset 0 0 0 2px #f8af00;
            }
        }
    }
    .empty-panel {
        width: 100%;

        border-radius: 10px;
    }
    @include media-breakpoint-down(sm) {
        .btn-list {
            display: grid;

            padding: 4px;

            border-radius: 6px;
            background: #f5f6f9;

            grid-template-columns: 1fr 1fr;
            .list-item {
                width: 100%;

                vertical-align: top;
            }
            .btn--lesson,
            .btn--level {
                width: 100%;
                padding: 0;
                padding: 6px 4px;

                text-align: center;
                vertical-align: top;

                border-radius: 4px;
                box-shadow: none;
                &[data-active],
                &:hover {
                    color: #333;
                    background: #fff;
                    box-shadow: none;
                }
            }
        }
    }
}
.report-list {
    .list-item {
        padding: calc(var(--p-normal) * 3.6) 0;

        border-bottom: 1px solid #e6e8ec;

        gap: var(--x-space-normal);

        grid-template-columns: 32.6% 1fr auto;
        &:last-child {
            border-bottom-width: 0 !important;
        }
    }
    .report-title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(30px, 20px);

        margin-bottom: 5px;

        color: #2d2b32;
    }
    .report-time {
        font-family: "Inter";
        font-size: 13px;
        font-weight: 600;
        line-height: em(16px, 13px);

        color: #b1b5c4;
    }
    .level-title {
        font-size: 13px;
        line-height: em(20px, 13px);

        margin-bottom: 9px;

        color: #777;
    }
    .level-tag {
        font-size: 13px;
        font-weight: 700;
        line-height: em(20px, 13px);

        display: inline-block;

        padding: 3px 12px;

        color: #f8af00;
        border-radius: 14px;
        background: rgb(248 175 0 / 0.2);
    }
    .button {
        font-size: 14px;
        line-height: em(21px, 14px);

        padding: 12px 34px;

        transition: 0.26s ease;

        color: #777;
        border-radius: 6px;
        box-shadow: inset 0 0 0 2px #e6e8ec;
        &[data-active],
        &:hover {
            color: #fff;
            background: #f8af00;
            box-shadow: inset 0 0 0 2px #f8af00;
        }
    }
    @include media-breakpoint-down(md) {
        .list-item {
            gap: 10px;
            grid-template-columns: 1fr auto;
            .left-area {
                grid-area: 1 / 1 / 2 / 3;
            }
        }
    }
}
.course-group {
    &:last-child {
        .group-head {
            border-bottom: 1px solid transparent;
        }
    }
    &[data-open] {
        .group-head {
            border-bottom: 1px solid #e6e8ec;
        }
        .button {
            :global(.ic) {
                transform: rotate(-180deg);
            }
        }
    }
    .group-head,
    .group-body {
        gap: var(--x-space-normal);
        grid-template-columns: 32.6% 1fr auto;
    }
    .group-head {
        padding: calc(var(--p-normal) * 3) 0;

        border-bottom: 1px solid #e6e8ec;
        .more {
            font-size: 14px;
            line-height: em(21px, 14px);

            padding: 10px 32px;

            color: #fff;
            border-radius: 6px;
            background: #f8af00;
            :global(.ic) {
                display: inline-block;

                margin-left: 6px;

                transition: 0.26s ease;
            }
        }
        .course-name {
            font-size: 18px;
            font-weight: 700;
            line-height: em(27px, 18px);

            margin-bottom: 8px;

            color: #2d2b32;
        }
        .course-count {
            font-size: 13px;
            line-height: em(20px, 13px);

            color: #b1b5c4;
        }
    }
    .group-body {
        .button {
            @include space-between(10px);
            font-size: 12px;
            line-height: em(18px, 12px);

            padding: 8px 25px;

            border-radius: 26px;
            &[data-theme="gray"] {
                color: #333;
                background: #f5f6f9;
                box-shadow: inset 0 0 0 2px #f5f6f9;
            }
        }
        .report-time {
            font-size: 18px;
            font-weight: 700;
            line-height: em(27px, 18px);

            color: #2d2b32;
        }
        .report-day {
            font-size: 12px;
            line-height: em(18px, 12px);

            color: #777;
        }
        .lesson-index {
            font-size: 18px;
            font-weight: 700;
            line-height: em(27px, 18px);

            color: #2d2b32;
        }
        .lesson-name {
            font-size: 13px;
            line-height: em(20px, 13px);

            color: #777;
        }
    }
    @include media-breakpoint-down(md) {
        .group-head {
            grid-template-columns: 1fr auto;
            .left-area {
                grid-area: 1 / 1 / 2 / 3;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .group-head {
            grid-template-columns: 1fr auto;
            .left-area {
                grid-area: initial;
            }
            .right-area {
                grid-area: 2 / 1 / 3 / 3;
            }
            .more {
                width: 100%;
            }
        }
    }
}
.lesson-report-list {
    @include media-breakpoint-down(md) {
        .list-item {
            grid-template-columns: 1fr auto;
            .left-area {
                grid-area: 1 / 1 / 2 / 3;
            }
            .center-area {
                grid-area: 2 / 1 / 3 / 2;
            }
            .right-area {
                grid-area: 2 / 2 / 3 / 3;
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
