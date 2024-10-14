<template>
    <div :class="$style['own-lesson-panel']">
        <div
            :class="$style['panel-head']"
            class="flex justify-between items-center"
        >
            <div :class="$style['panel-title']">
                <span class="text">{{ $t("KEY_BASE.MY_COURSE") }}</span>
            </div>
            <Link :to="linkManage.course" :class="$style['link--lesson-page']">
                <span class="text">{{ $t("KEY_BASE.ALL") }}</span>
            </Link>
        </div>
        <div :class="$style['panel-body']">
            <div :class="$style['own-lesson-list']">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    :class="$style['lesson-table']"
                >
                    <div :class="$style['table-head']">
                        <div
                            :class="$style['lesson-info']"
                            :data-start="item.classes !== 0"
                        >
                            <div>
                                <span v-if="item.classes !== 0" class="text">{{
                                    $t("KEY_BASE.LESSON_STATE.0")
                                }}</span>
                                <span v-else class="text">{{
                                    $t("KEY_BASE.LESSON_STATE.1")
                                }}</span>
                            </div>
                            <div
                                class="sm:hidden"
                                :style="{
                                    opacity: item.skuTypeid ? 1 : 0,
                                }"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.LESSON_METHOD")
                                }}</span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div :class="$style['table-body']">
                        <div :class="$style['lesson-item']">
                            <div :class="$style['lesson-title']">
                                <span class="text">{{ item.courseName }}</span>
                            </div>
                            <TagSku
                                class="inline-block"
                                :style="{
                                    opacity: item.skuTypeid ? 1 : 0,
                                }"
                                :class="$style['lesson-sku']"
                                :data="{
                                    skuTypeid: item.skuTypeid,
                                    type: item.type,
                                }"
                            />
                            <BtnBooking
                                :id="item.userCourseid"
                                :class="$style['lesson-booking']"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.BOOKING")
                                }}</span>
                            </BtnBooking>
                            <div
                                :class="$style['lesson-progress']"
                                class="flex items-center"
                            >
                                <span class="text mr-4">{{
                                    $t("KEY_BASE.LESSON_PROGRESS")
                                }}</span>
                                <div
                                    :class="$style['process']"
                                    class="flex-auto"
                                >
                                    <div
                                        :class="$style['process-inner']"
                                        :style="{
                                            width:
                                                (item.classes /
                                                    item.classHour) *
                                                    100 +
                                                '%',
                                        }"
                                    ></div>
                                </div>
                                <div :class="$style['process-count']">
                                    <span
                                        class="text"
                                        :class="$style['finish']"
                                        >{{ item.classes }}</span
                                    >/<span
                                        :class="$style['total']"
                                        class="text"
                                        >{{ item.classHour }}</span
                                    >
                                </div>
                            </div>
                            <PublicButton
                                :to="
                                    linkManage.course + '/' + item.userCourseid
                                "
                                :class="[
                                    $style['lesson-list'],
                                    $style['button'],
                                ]"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.LESSON_LIST")
                                }}</span>
                            </PublicButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_STUDENT_HOME_PAGE } from "@/assets/script/api/api";

import linkManage from "~/assets/script/local-data/link-manage";

defineProps<{ data: TYPE_STUDENT_HOME_PAGE["userCourses"] }>();
</script>
<style lang="scss" module>
.own-lesson-panel {
    padding: calc(var(--p-normal) * 3.4) calc(var(--p-normal) * 4)
        calc(var(--p-normal) * 4);

    border-radius: $panel-radius;
    background-color: #fff;
    .panel-head {
        margin-bottom: calc(var(--y-space-normal) * 1.3);
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
    }
    .panel-title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(30px, 20px);

        color: #2d2b32;
    }
    .table-row {
        display: flex;

        align-items: center;
    }
    .table-head {
        font-size: 13px;
        line-height: em(20px, 13px);

        margin-bottom: 11px;

        color: #777;
    }
    @include media-breakpoint-down(sm) {
        .panel-head {
            margin-bottom: var(--y-space-normal);
        }
    }
}
.lesson-table {
    margin-bottom: 30px;
    padding-bottom: 30px;

    border-bottom: 1px solid rgb(0 0 0 / 0.04);
    &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;

        border-bottom-width: 0 !important;
    }
    .lesson-info,
    .lesson-item {
        display: grid;

        gap: 12px;
        grid-template-columns: 1fr 1fr 116px;
        & > * {
            align-self: center;
            &:nth-child(1) {
                grid-area: 1 / 1 / 2 / 2;
            }
            &:nth-child(2) {
                grid-area: 1 / 2 / 2 / 3;
                justify-self: start;
            }
            &:nth-child(3) {
                grid-area: 1 / 3 / 2 / 4;
            }
            &:nth-child(4) {
                grid-area: 2 / 1 / 3 / 3;
            }
            &:nth-child(5) {
                grid-area: 2 / 3 / 3 / 4;
            }
        }
    }
    .lesson-info {
        & > * {
            &:nth-child(1) {
                color: #f8af00;
            }
        }
        &[data-start] {
            & > * {
                /* stylelint-disable-next-line max-nesting-depth */
                &:nth-child(1) {
                    color: #0aca91;
                }
            }
        }
    }
    .lesson-item {
        grid-template-rows: repeat(2, 1fr);
    }
    .lesson-title {
        @include ellipse(1);
        font-size: 16px;
        font-weight: 700;
        line-height: 200%;

        white-space: nowrap;

        color: #2d2b32;
    }
    .lesson-progress {
        font-size: 13px;
        line-height: em(20px, 13px);

        color: #777;
        .process {
            max-width: 200px;
            height: 8px;

            border-radius: 10px;
            background: #f5f6f9;
        }
        .process-inner {
            width: 50%;
            max-width: 100%;
            height: 100%;

            border-radius: 10px;
            background: #0aca91;
        }
        .process-count {
            font-family: "Inter";
            font-weight: 700;

            margin-left: 17px;

            color: #777;
        }
        .finish {
            font-size: 13px;
            line-height: em(16px, 13px);

            color: #2d2b32;
        }
    }
    .lesson-booking,
    .lesson-list {
        font-size: 14px;
        line-height: 21px;

        padding: 8px 10px;

        transition: 0.26s ease;
        text-align: center;

        color: #777;
        border-radius: 21px;
        box-shadow: inset 0 0 0 1px #d4d6d9;
        &:hover {
            color: #fff;
            background: #f8af00;
            box-shadow: inset 0 0 0 1px #f8af00;
        }
    }
    .lesson-sku {
        margin: 0;
    }
    @include media-breakpoint-down(sm) {
        .lesson-progress {
            .process {
                max-width: 100%;
            }
        }
        .lesson-info {
            display: block;
        }
        .lesson-item {
            grid-template-columns: repeat(10, 1fr);
            & > * {
                &:nth-child(1) {
                    grid-area: 1 / 1 / 2 / 5;
                }
                &:nth-child(2) {
                    grid-area: 1 / 5 / 2 / 11;
                    justify-self: flex-end;
                }
                &:nth-child(3) {
                    grid-area: 3 / 1 / 4 / 6;
                }
                &:nth-child(4) {
                    grid-area: 2 / 1 / 3 / 11;
                }
                &:nth-child(5) {
                    grid-area: 3 / 6 / 4 / 11;
                }
            }
        }
    }
}
</style>
