<template>
    <div :class="$style['finish-lesson-panel']">
        <div
            :class="$style['panel-head']"
            class="flex justify-between items-center"
        >
            <div :class="$style['panel-title']">
                <span class="text">{{
                    $t("KEY_FINISH_LESSON_PANEL.TITLE")
                }}</span>
            </div>
            <Link :to="linkManage.course" :class="$style['link--lesson-page']">
                <span class="text">{{ $t("KEY_BASE.ALL") }}</span>
            </Link>
        </div>
        <div :class="$style['panel-body']">
            <div
                :class="$style['lesson-group']"
                v-for="(item, index) in data"
                :key="index"
            >
                <div :class="$style['group-title']">
                    <span class="text">{{
                        getWeekTime(item.menkeStarttime, lang)
                    }}</span>
                </div>
                <div :class="$style['group-body']">
                    <div :class="$style['lesson-item']" class="flex">
                        <div class="state-pos--left">
                            <div :class="$style['lesson-time']">
                                <span class="text">{{
                                    getClock(item.menkeStarttime)
                                }}</span>
                            </div>
                            <div :class="$style['line']"></div>
                        </div>
                        <div
                            class="state-pos--center flex-auto flex items-center sm:block"
                        >
                            <div :class="$style['lesson-thumb']">
                                <img :src="item.img" alt="" />
                            </div>
                            <div :class="$style['lesson-info']">
                                <div :class="$style['lesson-title']">
                                    <span class="text">{{
                                        item.menkeName
                                    }}</span>
                                </div>
                                <div :class="$style['lesson-desc']">
                                    <span class="text">{{
                                        item.menkeLessonName
                                    }}</span>
                                </div>
                                <div :class="$style['lesson-teacher']">
                                    <span class="text">{{
                                        $t("KEY_BASE.COURSE_TEACHER", [
                                            item.menkeTeacherName,
                                        ])
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="state-pos--right">
                            <div :class="$style['lesson-oper']" class="flex">
                                <BtnAppraiseTeacher
                                    :id="item.userLessonid"
                                    :state="item.isScore"
                                    :class="$style['button']"
                                />
                                <BtnReport
                                    :class="$style['button']"
                                    :id="item.userLessonReportid"
                                    :isOk="item.isReport === 1"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.COURSER_REPORT")
                                    }}</span>
                                </BtnReport>
                                <BtnPlayVideo
                                    v-if="item.replayUrl"
                                    :video="item.replayUrl"
                                    :class="$style['button']"
                                    >{{ $t("KEY_BASE.COURSE_REPLAY") }}
                                </BtnPlayVideo>
                            </div>
                        </div>
                        <div :class="$style['md-line']" class="hidden"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_USER_LESSON } from "@/assets/script/api/api";

import linkManage from "~/assets/script/local-data/link-manage";
import { getWeekTime, getClock } from "@/assets/script/util/date";
import { useContext } from "@nuxtjs/composition-api";

const { app } = useContext();
const lang = app.i18n.locale;

defineProps<{ data: TYPE_USER_LESSON[] }>();
</script>
<style lang="scss" module>
.finish-lesson-panel {
    padding: calc(var(--p-normal) * 3.4) calc(var(--p-normal) * 4)
        calc(var(--p-normal) * 4);

    border-radius: $panel-radius;
    background-color: #fff;
    .panel-head {
        margin-bottom: 40px;
    }
    .panel-title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(30px, 20px);

        color: #2d2b32;
    }
    .link--lesson-page {
        font-size: 14px;
        line-height: em(21px, 14px);

        position: relative;

        padding: 10px 0;

        transition: 0.26s ease;

        color: #777;
        &::after {
            position: absolute;
            bottom: 6px;
            left: 0;

            width: 40%;
            height: 2px;

            content: "";
            transition: 0.26s ease;

            opacity: 0;
            background-color: #f78921;
        }
        &:hover {
            color: #f78921;
            &::after {
                width: 100%;

                opacity: 1;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .panel-head {
            margin-bottom: var(--y-space-normal);
        }
    }
}
.lesson-group {
    @include space-between(44px, y);
    .group-title {
        font-size: 16px;
        font-weight: 700;
        line-height: em(24px, 16px);

        display: flex;

        margin-bottom: 22px;

        color: #2d2b32;

        align-items: center;
        &::before {
            display: inline-block;

            width: 4px;
            height: 16px;
            margin-right: 11px;

            content: "";

            border-radius: 5px;
            background-color: #ff8a1b;
        }
    }
    // .group-body {

    // }
}
.lesson-item {
    position: relative;

    display: grid;

    gap: 20px;

    grid-template-columns: 60px 1fr;
    grid-template-rows: 1fr auto;
    * {
        &:nth-child(1) {
            grid-area: 1 / 1 / 3 / 2;
        }
        &:nth-child(2) {
            grid-area: 1 / 2 / 2 / 3;
        }
        &:nth-child(3) {
            grid-area: 2 / 2 / 3 / 3;
        }
    }
    &:last-child {
        .line {
            height: calc(100% - 9px);
        }
        :global {
            .state-pos--right {
                padding-bottom: 0;
            }
        }
        * {
            &:nth-child(1) {
                grid-area: 1 / 1 / 2 / 2;
            }
        }
    }
    :global {
        .state-pos--left {
            display: flex;

            justify-content: space-between;
        }
        .state-pos--right {
            padding-bottom: 40px;
        }
    }
    .md-line,
    .line {
        position: relative;

        width: 1px;

        transform: translateY(9px);

        background-color: #d9d9d9;
        &::after {
            @include circle(5px, #d9d9d9);
            position: absolute;
            top: 0;
            left: -2px;

            content: "";
        }
    }
    .lesson-time {
        font-size: 16px;
        font-weight: 700;
        line-height: em(24px, 16px);
    }
    .lesson-thumb {
        @include image-placeholder(140px, 86px);
        width: 150px;
        margin-right: 20px;

        border-radius: 5px;
    }
    .lesson-info {
        padding-bottom: 3px;
    }
    .lesson-title {
        font-size: 16px;
        line-height: em(24px, 16px);

        margin-bottom: 7px;

        color: #2d2b32;
    }
    .lesson-desc {
        font-size: 13px;
        line-height: em(20px, 13px);

        color: #777;
    }
    .lesson-teacher {
        font-size: 13px;
        line-height: em(20px, 13px);

        margin-top: 21px;

        color: #777;
    }
    .lesson-oper {
        font-size: 15px;
        font-weight: 700;
        .button {
            @include space-between(10px);
            font-size: 12px;
            line-height: em(18px, 12px);

            display: block;

            padding: 7px 22px;

            transition: 0.26s ease;

            color: #777;
            border-radius: 23px;
            box-shadow: inset 0 0 0 2px #d4d6d9;
            &:hover {
                color: #fff;
                background: #f8af00;
                box-shadow: inset 0 0 0 2px #f8af00;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        display: block;

        padding-left: 24px;
        .md-line {
            position: absolute;
            top: 0;
            left: 0;

            display: block;

            height: calc(100% - 66px);
        }
        .line {
            display: none;
        }
        .lesson-thumb {
            width: 100%;
            margin: 0;
            margin-bottom: 21px;
        }
        .lesson-desc {
            margin-bottom: 7px;
        }
        .lesson-teacher {
            margin-top: 0;
        }
        .lesson-time {
            margin-bottom: calc(var(--y-space-normal) / 2);
        }
        .lesson-oper {
            margin-top: var(--y-space-normal);
            .button {
                @include space-between(8px);
                width: 100%;
                padding: 7px 12px;

                text-align: center;
            }
        }
    }
}
</style>
