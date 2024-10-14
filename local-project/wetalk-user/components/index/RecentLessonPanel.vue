<template>
    <div :class="$style['recent-lesson-panel']">
        <div
            :class="$style['panel-head']"
            class="flex justify-between items-start sm:block"
        >
            <div class="state-pos--left">
                <div :class="$style['panel-title']">
                    <span class="text">{{ $t("KEY_RECENT_PANEL.TITLE") }}</span>
                </div>
            </div>
            <div class="state-pos--right sm:mt-1">
                <div :class="$style['panel-tip']" v-if="lang != 'en'">
                    <span class="text">{{
                        $t("KEY_RECENT_PANEL.TIP", [data.classroomMin])
                    }}</span>
                </div>
            </div>
        </div>
        <div :class="$style['panel-body']">
            <div :class="$style['lesson-group']">
                <div :class="$style['group-title']">
                    <span class="text">{{
                        getWeekTime(data.menkeStarttime, lang)
                    }}</span>
                </div>
                <div :class="$style['group-body']">
                    <div :class="$style['lesson-item']" class="flex">
                        <div class="state-pos--left">
                            <div :class="$style['lesson-time']">
                                <span class="text">{{
                                    getClock(data.menkeStarttime)
                                }}</span>
                            </div>
                            <div :class="$style['line']"></div>
                        </div>
                        <div class="state-pos--center flex-auto pr-5">
                            <div :class="$style['lesson-title']">
                                <span class="text">{{ data.menkeName }}</span>
                            </div>
                            <div :class="$style['lesson-desc']">
                                <span class="text">{{
                                    data.menkeLessonName
                                }}</span>
                            </div>
                            <div :class="$style['lesson-teacher']">
                                <span class="text">{{
                                    $t("KEY_BASE.COURSE_TEACHER", [
                                        data.menkeTeacherName,
                                    ])
                                }}</span>
                            </div>
                        </div>
                        <div class="state-pos--right">
                            <div :class="$style['lesson-oper']">
                                <BtnEntryClassroom
                                    :class="$style['btn']"
                                    data-thumb="yellow"
                                    :time="data.classroomMin"
                                    :url="data.menkeEntryurl"
                                />
                                <BtnLessonCancel
                                    :class="$style['btn']"
                                    :id="data.userLessonid"
                                    :disable="data.isCancel === 0"
                                    @confirm="cancelConfirm"
                                    data-layout="outline"
                                />
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

import { getWeekTime, getClock } from "@/assets/script/util/date";
import { useContext } from "@nuxtjs/composition-api";

defineProps<{ data: TYPE_USER_LESSON }>();

const { app } = useContext();
const lang = app.i18n.locale;

const emit = defineEmits<{ (e: "refresh"): void }>();
function cancelConfirm() {
    emit("refresh");
}
</script>
<style lang="scss" module>
.recent-lesson-panel {
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
    .panel-tip {
        font-size: 13px;
        line-height: em(20px, 13px);

        color: #f78921;
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
    :global {
        .state-pos--left {
            display: flex;

            width: 60px;
            margin-right: 20px;

            justify-content: space-between;
        }
        .state-pos--right {
            padding-bottom: 40px;
        }
    }
    &:last-child {
        :global(.state-pos--right) {
            padding-bottom: 0;
        }
        .line {
            height: calc(100% - 9px);
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
        button {
            @include space-between(10px, "y");
            line-height: em(22px, 15px);

            display: block;

            width: 100%;
            padding: 10px 32px;

            transition: 0.26s ease;

            color: #777;
            border-radius: 8px;
            box-shadow: inset 0 0 0 2px #d4d6d9;
            &:hover {
                color: #fff;
                background: #f8af00;
                box-shadow: inset 0 0 0 2px #f8af00;
            }
            &[data-disable] {
                cursor: not-allowed;

                background: #f5f6f9;
                box-shadow: inset 0 0 0 2px #d4d6d9;
                &:hover {
                    color: #777;
                    background: #f5f6f9;
                    box-shadow: inset 0 0 0 2px #d4d6d9;
                }
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

            height: calc(100% - 9px);
        }
        .line {
            display: none;
        }
        .lesson-time {
            margin-bottom: calc(var(--y-space-normal) / 2);
        }
        .lesson-oper {
            display: grid;

            margin-top: var(--y-space-normal);

            gap: 12px;

            grid-template-columns: 1fr 1fr;
            .btn {
                margin: 0;
            }
        }
    }
}
</style>
