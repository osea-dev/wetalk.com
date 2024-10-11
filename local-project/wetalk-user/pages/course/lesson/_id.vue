<!--
 * @Description: 课程 => 预约的课节信息
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 11:41:01
-->
<template>
    <div :class="$style['course-lesson-page']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['lesson-info-panel']" v-if="lessonData">
                    <div
                        :class="$style['lesson-into']"
                        class="flex justify-between"
                    >
                        <div :class="$style['date']">
                            <div :class="$style['day']">
                                <span class="text">{{
                                    getWeekTimeReverse(
                                        lessonData.menkeStarttime,
                                        lang
                                    )
                                }}</span>
                            </div>
                            <div :class="$style['time']">
                                <span class="text">{{
                                    getClock(lessonData.menkeStarttime) +
                                    "-" +
                                    getClock(lessonData.menkeEndtime)
                                }}</span>
                            </div>
                        </div>
                        <div
                            :class="$style['buttons']"
                            v-if="lessonData.menkeState === 1"
                            class="flex flex-col items-end"
                        >
                            <div :class="$style['tip']">
                                <span class="text">{{
                                    $t("KEY_RECENT_PANEL.TIP", [
                                        lessonData.classroomMin,
                                    ])
                                }}</span>
                            </div>
                            <BtnEntryClassroom
                                :class="$style['button']"
                                :time="lessonData.classroomMin"
                                :url="lessonData.menkeEntryurl"
                            />
                            <BtnLessonCancel
                                :id="lessonData.userLessonid"
                                :disable="lessonData.isCancel === 0"
                                :class="$style['button']"
                            />
                        </div>
                    </div>
                    <div
                        :class="$style['lesson-row']"
                        class="flex justify-between"
                    >
                        <div
                            :class="$style['lesson-title']"
                            class="flex items-center sm:block"
                        >
                            <span
                                :class="$style['course-name']"
                                class="sm:block"
                                v-if="lessonData.courseName"
                                >{{ lessonData.courseName }}</span
                            >
                            <span :class="$style['lesson-name']">{{
                                lessonData.lessonName
                            }}</span>
                        </div>
                        <div
                            :class="$style['lesson-oper']"
                            v-if="lessonData.menkeState === 3"
                        >
                            <BtnAppraiseTeacher
                                :id="lessonData.userLessonid"
                                :state="lessonData.isScore"
                                :class="$style['button']"
                            />
                            <PublicButton
                                :class="$style['button']"
                                v-if="lessonData.isHomeWork"
                                :to="
                                    linkManage.courseHomework +
                                    '/' +
                                    lessonData.userLessonid
                                "
                                target="_blank"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.HOMEWORK")
                                }}</span>
                            </PublicButton>
                            <BtnReport
                                :class="$style['button']"
                                :id="lessonData.userLessonReportid"
                                :isOk="lessonData.isReport === 1"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.COURSER_REPORT")
                                }}</span>
                            </BtnReport>
                            <BtnPlayVideo
                                v-if="lessonData.recordUrl"
                                :video="lessonData.recordUrl"
                                :class="$style['button']"
                                >{{ $t("KEY_BASE.COURSE_REPLAY") }}
                            </BtnPlayVideo>
                        </div>
                        <PublicButton
                            v-if="lessonData.menkeState == 4"
                            state="error"
                            :class="[$style['course-report'], $style['button']]"
                            :disable="true"
                        >
                            <span class="text">{{
                                $t("KEY_BASE.COURSE_STATUS.0")
                            }}</span>
                        </PublicButton>
                    </div>
                    <div :class="$style['lesson-teacher']">
                        <div
                            :class="$style['info-group']"
                            class="flex items-center"
                        >
                            <Avatar
                                :class="$style['avatar']"
                                :avatar="lessonData.teacherHeadImg"
                            />
                            <div :class="$style['info']">
                                <div :class="$style['name']">
                                    {{ lessonData.teacherName }}
                                </div>
                                <div :class="$style['position']">
                                    {{ lessonData.teacherKeys.join("/") }}
                                </div>
                            </div>
                        </div>
                        <div
                            :class="$style['intro']"
                            v-html="lessonData.teacherMessage"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_USER_LESSON_DETAIL } from "@/assets/script/api/api";

import { onMounted, ref } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";

import { UserLessonDetail } from "@/assets/script/api/api";
import { useContext, useRoute } from "@nuxtjs/composition-api";
import { getClock, getWeekTimeReverse } from "@/assets/script/util/date";

const { app } = useContext();
const lang = app.i18n.locale;
const lessonData = ref<TYPE_USER_LESSON_DETAIL>();

const route = useRoute();

onMounted(() => {
    UserLessonDetail({ userLessonid: Number(route.value.params.id) }).then(
        (res) => {
            lessonData.value = res.data;
        }
    );
});
</script>
<script lang="ts">
export default {
    name: "courseLessonInfo",
};
</script>
<style lang="scss" module>
.lesson-info-panel {
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    .lesson-into {
        font-size: 18px;
        .date {
            padding-bottom: 60px;
        }
        .day {
            font-weight: 500;
            line-height: em(27px, 18px);

            margin-bottom: 2px;

            color: #777;
        }
        .time {
            font-family: "Inter";
            font-size: em(50px, 18px);
            font-weight: 700;
            line-height: em(61px, 50px);

            color: #2d2b32;
        }
        .tip {
            font-size: 13px;
            line-height: em(20px, 13px);

            margin-bottom: 10px;

            color: #f78921;
        }
        .buttons {
            //
        }
        .button {
            @include space-between(14px, y);
            font-size: 16px;
            font-weight: 700;
            line-height: em(24px, 16px);

            display: block;
            flex: 0 0 auto;

            min-width: 176px;
            padding: 16px 60px;

            text-align: center;

            border-radius: 8px;
        }
    }
    .lesson-title {
        font-size: 20px;
        .course-name {
            font-weight: 700;
            line-height: em(30px, 20px);

            margin-right: 18px;

            color: #333;
        }
        .lesson-name {
            font-size: em(18px, 20px);
            font-weight: 500;
            line-height: em(27px, 18px);

            color: #333;
        }
    }
    .lesson-teacher {
        font-size: 18px;

        margin-top: 60px;
        padding-top: 40px;
        padding-bottom: 20px;

        border-top: 1px solid #e6e8ec;
        .avatar {
            width: em(70px, 18px);
            margin-right: em(15px, 18px);
        }
        .name {
            line-height: em(24px, 18px);

            color: #2d2b32;
        }
        .position {
            font-size: em(13px, 18px);
            line-height: em(21px, 13px);

            color: #777;
        }
        .intro {
            font-size: em(13px, 18px);
            line-height: 200%;

            max-width: 450px;
            margin-top: em(22px, 18px);

            color: #777;
        }
    }
    @include media-breakpoint-down(lg) {
        .lesson-into {
            // display: block;
            .time {
                font-size: em(40px, 18px);
            }
            .tip {
                display: none;
            }
            .date {
                padding-bottom: 30px;
            }
            .buttons {
                display: block;
            }
            .button {
                font-size: 15px;

                display: inline-block;

                min-width: 0;
                margin: 0;
                margin-right: 10px;
                padding: 10px 30px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        .lesson-teacher {
            margin-top: 40px;
            padding-top: 40px;
            padding-bottom: 0;
        }
    }
    @include media-breakpoint-down(md) {
        .lesson-into {
            font-size: 14px;

            display: block;
            .tip {
                font-size: 12px;
            }
            .buttons {
                margin-top: -16px;
                padding-bottom: 30px;
            }
            .button {
                font-size: 12px;

                display: inline-block;

                margin: 0;
                margin-right: 10px;
                padding: 10px 30px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        .lesson-teacher {
            margin-top: 30px;
            padding-top: 30px;
        }
    }
    @include media-breakpoint-down(sm) {
        .lesson-into {
            .date {
                padding-bottom: 20px;
            }
        }
        .lesson-title {
            font-size: 18px;
            .course-name {
                margin: 0;
            }
        }
        .lesson-teacher {
            font-size: 16px;
        }
    }
}
.lesson-row {
    .button {
        @include space-between(10px);

        font-size: 12px;
        line-height: em(18px, 12px);

        padding: 8px 25px;
    }
    @include media-breakpoint-down(lg) {
        display: block;
        .lesson-title {
            margin-bottom: 20px;
        }
    }
    @include media-breakpoint-down(md) {
        .button {
            @include space-between(3px);
        }
    }
    @include media-breakpoint-down(sm) {
        .button {
            width: 100%;
            margin-bottom: 10px;
            padding: 12px 10px;

            text-align: center;

            border-radius: 4px;
        }
    }
}
</style>
