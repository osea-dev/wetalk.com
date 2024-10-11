<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 14:57:59
-->
<template>
    <div
        :class="[$style['teacher-page'], lesson ? '' : 'flex']"
        class="items-center justify-center relative"
    >
        <div class="wrapper--limit-width min-w-0">
            <div :class="$style['panel-body']">
                <div :class="$style['main-panel']" v-if="!lesson">
                    <section :class="$style['forgot-pw-form']">
                        <FormRow
                            :errorMsg="formErrorTip.pw"
                            :title="$t('KEY_BASE.TIP_MSG.12')"
                        >
                            <FormInput
                                type="password"
                                :placeholder="$t('KEY_BASE.TIP_MSG.13')"
                                v-model="pwForm.pw"
                                :errorMsg="formErrorTip.pw"
                                name="email"
                            />
                        </FormRow>
                        <FormRow :class="[$style['submit-row']]">
                            <FormSubmitBtn
                                @submit="submit"
                                :text="$t('KEY_BASE.ENTER')"
                            />
                        </FormRow>
                    </section>
                </div>
                <section v-else>
                    <div :class="$style['teacher-panel']">
                        <div
                            :class="$style['panel-head']"
                            class="flex justify-between"
                        >
                            <div :class="$style['lesson-info']">
                                <div :class="$style['title']">
                                    {{ lesson.menkeLessonName }}
                                </div>
                                <div :class="$style['course']">
                                    {{ lesson.menkeCourseName }}
                                </div>
                            </div>
                            <div :class="$style['lesson-date']">
                                <div :class="$style['day']">
                                    {{
                                        getWeekTimeReverse(
                                            lesson.menkeStarttime,
                                            lang
                                        )
                                    }}
                                </div>
                                <div :class="$style['time']">
                                    {{ getClock(lesson.menkeStarttime) }} -
                                    {{ getClock(lesson.menkeEndtime) }}
                                </div>
                            </div>
                        </div>
                        <div :class="$style['panel-foot']">
                            <div :class="$style['student-list']">
                                <div
                                    :class="$style['list-item']"
                                    :data-finish="item.userLessonReportid != 0"
                                    v-for="item in lesson.studentReports"
                                    :key="item.userLessonid"
                                >
                                    <div
                                        :class="$style['item-info']"
                                        :data-active="
                                            selectStudentId == item.userLessonid
                                        "
                                        @click="
                                            changeSelectStudent(
                                                item.userLessonid
                                            )
                                        "
                                        class="flex items-center justify-between"
                                    >
                                        <div
                                            :class="$style['student-info']"
                                            class="flex items-center"
                                        >
                                            <Avatar
                                                :avatar="item.headImg"
                                                :class="$style['avatar']"
                                            />
                                            <div
                                                :class="$style['name']"
                                                class="flex items-center"
                                            >
                                                {{ item.firstName }}
                                                {{ item.lastName }}
                                                <div :class="$style['tag']">
                                                    <span class="text">{{
                                                        $t(
                                                            "KEY_BASE.APPRAISE_STATUS.3"
                                                        )
                                                    }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            :class="$style['btn-select']"
                                            class="flex items-center justify-center"
                                        >
                                            <i
                                                class="ic iconfont icon-arrow-down"
                                            ></i>
                                        </button>
                                    </div>
                                    <div
                                        class="hidden"
                                        :class="$style['item-form']"
                                        ref="studentForm"
                                        :data-id="item.userLessonid"
                                    >
                                        <div :class="$style['form-group']">
                                            <template v-if="lesson.isTrial">
                                                <div
                                                    :class="[
                                                        $style['form-row'],
                                                        $style['form-level'],
                                                    ]"
                                                >
                                                    <div
                                                        class="text"
                                                        :class="
                                                            $style[
                                                                'level-title'
                                                            ]
                                                        "
                                                    >
                                                        {{ form.level.title }}
                                                    </div>
                                                    <div
                                                        class="flex items-center"
                                                        :class="
                                                            $style['level-bar']
                                                        "
                                                    >
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="10"
                                                            :class="
                                                                $style['slider']
                                                            "
                                                            v-model="
                                                                form.level.value
                                                            "
                                                        />
                                                        <span
                                                            :class="
                                                                $style[
                                                                    'slider-info'
                                                                ]
                                                            "
                                                            >Level
                                                            {{
                                                                form.level.value
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div
                                                    :class="[
                                                        $style['form-row'],
                                                        $style['score-row'],
                                                    ]"
                                                    class="grid grid-cols-2"
                                                >
                                                    <template
                                                        v-for="(
                                                            item, index
                                                        ) in form"
                                                    >
                                                        <div
                                                            v-if="
                                                                index !=
                                                                    'message' &&
                                                                index != 'level'
                                                            "
                                                            :class="
                                                                $style[
                                                                    'score-item'
                                                                ]
                                                            "
                                                            class="flex"
                                                            :key="index"
                                                        >
                                                            <div
                                                                :class="
                                                                    $style[
                                                                        'title'
                                                                    ]
                                                                "
                                                            >
                                                                {{ item.title }}
                                                            </div>
                                                            <FormScore
                                                                v-model="
                                                                    item.value
                                                                "
                                                            />
                                                        </div>
                                                    </template>
                                                </div>
                                                <div
                                                    :class="$style['form-row']"
                                                >
                                                    <textarea
                                                        step="1"
                                                        cols="30"
                                                        rows="10"
                                                        :placeholder="
                                                            $t(
                                                                'KEY_BASE.TIP_MSG.14'
                                                            )
                                                        "
                                                        v-model="
                                                            form.message.value
                                                        "
                                                    ></textarea>
                                                </div>
                                            </template>
                                            <div
                                                :class="[
                                                    $style['form-row'],
                                                    $style['submit-row'],
                                                ]"
                                                class="flex justify-end"
                                            >
                                                <button
                                                    @click="submitForm(item)"
                                                >
                                                    {{ $t("KEY_BASE.SUBMIT") }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_TEACHER_LESSON_REPORT } from "@/assets/script/api/api";

import Vue, { reactive, ref, watch } from "vue";
import { useContext, useRoute } from "@nuxtjs/composition-api";
import {
    TeacherLessonReport,
    TeacherSubmitLessonReport,
} from "@/assets/script/api/api";

import { getWeekTimeReverse, getClock } from "@/assets/script/util/date";

const { i18n, app } = useContext();

const lang = app.i18n.locale;

const selectStudentId = ref<number>(-1);
const lesson = ref<TYPE_TEACHER_LESSON_REPORT>();

const scoreType = [
    "homework",
    "write",
    "attention",
    "thinking",
    "enthusiasm",
    "emotionalQuotient",
    "hear",
    "loveQuotient",
    "say",
    "inverseQuotient",
    "read",
    "performance",
    "message",
    "level",
];
const form = ref<Record<string, { title: string; value: number | string }>>({
    homework: { title: i18n.t("KEY_STUDENT_SCORE.TITLE"), value: 0 },
    write: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.1"), value: 0 },
    attention: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.0"), value: 0 },
    thinking: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.2"), value: 0 },
    enthusiasm: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.3"), value: 0 },
    emotionalQuotient: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.4"), value: 0 },
    hear: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.5"), value: 0 },
    loveQuotient: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.6"), value: 0 },
    say: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.7"), value: 0 },
    inverseQuotient: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.8"), value: 0 },
    read: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.9"), value: 0 },
    performance: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.10"), value: 0 },
    level: { title: i18n.t("KEY_STUDENT_SCORE.TYPE.11"), value: 0 },
    message: {
        title: i18n.t("KEY_STUDENT_SCORE.TYPE.12"),
        value: "",
    },
});

const formErrorTip = reactive<{ pw: string }>({
    pw: "",
});
const pwForm = reactive<{ pw: string }>({
    pw: "",
});

function checkForm() {
    if (!/.+/.test(pwForm.pw)) {
        formErrorTip.pw = i18n.t("KEY_BASE.TIP_MSG.12");
        return false;
    }
    return true;
}

const route = useRoute();

function updateTeacherLessonReport() {
    TeacherLessonReport({
        menkeLessonId: Number(route.value.params.id),
        code: pwForm.pw,
    }).then((res) => {
        lesson.value = res.data;
    });
}
function submit() {
    if (checkForm()) {
        updateTeacherLessonReport();
    }
}

const studentForm = ref<HTMLElement[]>([]);

watch(selectStudentId, (newVal, oldVal) => {
    // 切换学生面板
    const closeDom = $(studentForm.value)
        .filter((index, item) => {
            return $(item).attr("data-id") === oldVal.toString();
        })
        .eq(0);
    closeDom.slideUp();
    if (newVal !== -1) {
        const openDom = $(studentForm.value)
            .filter((index, item) => {
                return $(item).attr("data-id") === newVal.toString();
            })
            .eq(0);
        openDom.slideDown();
    }

    // 切换表单数据
    if (newVal == -1) {
        return;
    }
    let currentStudentInfo: TYPE_TEACHER_LESSON_REPORT["studentReports"][number];

    lesson.value?.studentReports.some((student) => {
        if (student.userLessonid === newVal) {
            currentStudentInfo = student;
            return true;
        }
    });
    if (currentStudentInfo!) {
        Object.entries(currentStudentInfo).forEach(([k, v]) => {
            if (scoreType.includes(k)) {
                form.value[k].value = v as any;
            }
        });
    }
});

function changeSelectStudent(id: number) {
    if (selectStudentId.value === id) {
        selectStudentId.value = -1;
    } else {
        selectStudentId.value = id;
    }
}

function submitForm(
    item: TYPE_TEACHER_LESSON_REPORT["studentReports"][number]
) {
    const report: any = {};
    let isOk = true;
    if (lesson.value?.isTrial) {
        if (form.value.level.value === 0) {
            isOk = false;
        }
        Object.entries(form.value).forEach(([k, v]) => {
            if (k === "level") {
                report[k] = Number(v.value || "0");
            } else {
                report[k] = v.value;
            }
        });
    } else {
        Object.entries(form.value).forEach(([k, v]) => {
            if (v.value === 0 && k !== "level") {
                isOk = false;
            }
            report[k] = v.value;
        });
    }
    if (!isOk) {
        Vue.notify?.({
            group: "form-notice",
            title: i18n.t("KEY_STUDENT_SCORE.TIP.0"),
            type: "error",
            duration: 2000,
        });
        return;
    }
    TeacherSubmitLessonReport({
        menkeLessonId: Number(route.value.params.id),
        code: pwForm.pw,
        studentReports: [
            {
                userLessonid: item.userLessonid,
                ...report,
            },
        ],
    }).then((res) => {
        if (res.statusCode === 0) {
            lesson.value?.studentReports.forEach((lesson) => {
                if (lesson.userLessonid === item.userLessonid) {
                    lesson.userLessonReportid = 1;
                }
            });
            Vue.notify?.({
                group: "form-notice",
                title: i18n.t("KEY_BASE.SUBMIT_SUC"),
                type: "success",
                duration: 2000,
            });
            updateTeacherLessonReport();
        }
    });
}
</script>
<script lang="ts">
export default {
    layout: "simple-deep",
    name: "TeacherPage",
};
</script>
<style lang="scss" module>
.teacher-page {
    z-index: $zindex-fixed + 10;

    width: 100%;
    min-height: w-h(100);
    .panel-body {
        padding: 150px 0;
    }
    .main-panel {
        width: 660px;
        max-width: 100%;
        padding: 70px;

        border-radius: 16px;
        background-color: #fff;
        box-shadow: 0 20px 60px -6px rgb(40 40 40 / 0.08);
    }
    @include media-breakpoint-down(md) {
        .main-panel {
            padding: 50px;
        }
    }
    @include media-breakpoint-down(sm) {
        .main-panel {
            padding: 30px 20px;
        }
    }
}
.teacher-panel {
    width: 1000px;
    max-width: 100%;
    margin: 0 auto;
    padding: $panel-padding;

    border-radius: $panel-radius;
    background: #fff;
    .title {
        @include panel-head;
    }
    .course {
        font-size: 18px;
        line-height: em(27px, 18px);

        color: #777;
    }
    .lesson-date {
        text-align: right;
    }
    .day {
        font-size: 16px;
        line-height: em(24px, 16px);

        color: #777;
    }
    .time {
        font-family: "Inter";
        font-size: 32px;
        font-weight: 700;
        line-height: em(39px, 32px);

        color: #2d2b32;
    }
    .panel-head {
        padding: 30px 0;

        border-bottom: 1px solid #e6e8ec;
    }
    .panel-body {
        padding: 40px 10px;
    }
    @include media-breakpoint-down(md) {
        padding: $panel-padding-2;
        .panel-head {
            align-items: flex-start;
        }
        .lesson-date {
            display: flex;
            flex-direction: column-reverse;

            padding-top: 8px;
        }
        .day {
            font-size: 12px;
        }
        .time {
            font-size: 18px;
        }
    }
    @include media-breakpoint-down(sm) {
        .panel-head {
            flex-direction: column;

            padding-top: 10px;
        }
        .lesson-date {
            margin-top: 12px;

            text-align: left;
        }
    }
}
.student-list {
    .list-item {
        border-bottom: 1px solid #e6e8ec;
        &:last-child {
            border-bottom-width: 0;
        }
        .tag {
            font-size: 12px;

            display: none;

            margin-right: 10px;
            margin-left: 10px;
            padding: 3px 10px;

            color: #fff;
            border-radius: 3px;
            background-color: #3cbb58;
        }
        &[data-finish] {
            .tag {
                display: block;
            }
        }
    }
    .item-info {
        padding: 30px;

        cursor: pointer;
        transition: 0.26s ease;
        &:hover:not([data-active]) {
            background: #f5f6f9;
            .btn-select {
                color: #fff;
                background: #f8af00;
            }
        }
    }
    .avatar {
        width: 60px;
        margin-right: 15px;
    }
    .btn-select {
        @include circle(60px);
        font-size: 16px;

        transition: 0.26s ease;
        :global(.ic) {
            display: inline-block;

            margin-bottom: -4px;
        }
    }
    @include media-breakpoint-down(md) {
        .item-info {
            padding: 20px;
        }
        .avatar {
            width: 50px;
        }
        .btn-select {
            @include circle(50px);
        }
    }
    @include media-breakpoint-down(sm) {
        .item-info {
            padding: 14px 20px;
        }
        .avatar {
            width: 40px;
        }
        .btn-select {
            @include circle(40px);
        }
    }
}
.form-group {
    padding: 10px 40px 67px;
    .form-row {
        gap: 29px;
    }
    .score-item {
        .title {
            font-size: 15px;
            font-weight: 500;
            line-height: em(24px, 15px);

            flex: 0 0 auto;

            width: 90px;
            margin-right: 28px;

            text-align: right;

            color: #777;
        }
    }
    .score-row {
        margin-bottom: 50px;
    }
    textarea {
        width: 100%;
        padding: 16px 20px;

        border-width: 0;
        border-radius: 6px;
        outline: none;
        box-shadow: inset 0 0 0 1px #e6e8ec;
        &:focus {
            box-shadow: inset 0 0 0 2px #3b71fe;
        }
        &[data-error] {
            box-shadow: inset 0 0 0 2px #d93237;
        }
    }
    .submit-row {
        margin-top: 30px;
        button {
            font-size: 15px;
            line-height: em(22px, 15px);

            padding: 10px 60px;

            color: #fff;
            border-radius: 6px;
            background: #3b71fe;
        }
    }
    @include media-breakpoint-down(xl) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }
    @include media-breakpoint-down(md) {
        padding: 10px 20px 40px;
    }
    @include media-breakpoint-down(sm) {
        .form-level {
            & + .submit-row {
                margin-top: 10px;
            }
        }
        .score-row {
            gap: 20px;
        }
        .score-item {
            display: block;

            padding-bottom: 20px;

            border-bottom: 1px solid rgb(0 0 0 / 0.1);
            &:last-child {
                border-bottom-width: 0;
            }
            .title {
                width: 100%;
                margin-bottom: 12px;

                text-align: left;
            }
        }
        .submit-row {
            display: block;
            button {
                width: 100%;
            }
        }
    }
}
.form-level {
    padding: 20px 0;
    .level-title {
        font-size: 18px;

        margin-bottom: 10px;
    }
    .slider {
        padding: 20px 0;

        cursor: pointer;

        border-width: none !important;
        outline: none !important;
        box-shadow: none;
    }
    .slider-info {
        font-family: "Inter";
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2307692308em;

        min-width: 100px;
        margin-left: 20px;
        padding: 8px 20px;

        text-align: center;
        white-space: nowrap;

        color: #f8af00;
        border-radius: 16px;
        background: rgb(248 175 0 / 0.2);
    }
    @include media-breakpoint-down(sm) {
        .level-bar {
            display: grid;
        }
        .slider-info {
            display: block;

            margin: 0;
            margin-top: 10px;
        }
    }
}
.slider {
    position: relative;

    width: 100%;
    height: 2px;

    outline: none; /*去掉点击时出现的外边框*/

    appearance: none; /*这三个是去掉那条线原有的默认样式，划重点！！*/
    /*这三个是设置滑块下面那条线的样式*/
    &::after {
        position: absolute;
        top: 50%;
        left: 0;

        width: 100%;
        height: 8px;

        content: "";
        transform: translateY(-50%);

        border-radius: 4px;
        background: #f8af00;
    }
}
input[type="range"]::-webkit-slider-thumb {
    position: relative;
    z-index: 10;

    width: 20px;
    height: 20px;

    border-radius: 50%;
    background-color: #fff;
    background-size: cover;
    box-shadow: 4px 4px 10px rgb(0 0 0 / 0.2);

    appearance: none;
}
</style>
