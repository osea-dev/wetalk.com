<template>
    <div :class="$style['report-detail']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <template v-if="reportDetail">
                    <div
                        :class="$style['report-detail-panel']"
                        v-if="!reportDetail.isTrial"
                    >
                        <div :class="$style['panel-head']">
                            <h2 :class="$style['panel-title']">
                                <span class="text">{{
                                    $t("KEY_REPORT_DETAIL.TITLE")
                                }}</span>
                            </h2>
                            <p
                                :class="$style['panel-subtitle']"
                                class="flex items-center"
                            >
                                <span
                                    class="text"
                                    :class="$style['lesson-time']"
                                    >{{
                                        getClock(reportDetail.menkeStarttime)
                                    }}-{{
                                        getClock(reportDetail.menkeEndtime)
                                    }}</span
                                >
                                <span
                                    class="text"
                                    :class="$style['lesson-day']"
                                    >{{
                                        getWeekTimeReverse(
                                            reportDetail.menkeStarttime,
                                            lang
                                        )
                                    }}</span
                                >
                            </p>
                        </div>
                        <div :class="$style['panel-body']">
                            <div
                                :class="$style['lesson-teacher']"
                                class="flex items-center"
                            >
                                <div class="state-pos--left">
                                    <Avatar
                                        :class="$style['avatar']"
                                        :avatar="reportDetail.teacherHeadImg"
                                    />
                                </div>
                                <div class="state-pos--right">
                                    <div :class="$style['title']">
                                        {{ $t("KEY_REPORT_DETAIL.1") }}
                                    </div>
                                    <div :class="$style['msg']">
                                        <p>{{ reportDetail.message }}</p>
                                    </div>
                                </div>
                            </div>
                            <div :class="$style['star-area']">
                                <h3 :class="$style['area-name']">
                                    <span class="text">
                                        {{ $t("KEY_REPORT_DETAIL.TIP.0") }}
                                    </span>
                                </h3>
                                <div
                                    :class="$style['star-list']"
                                    class="grid grid-cols-2 lg:grid-cols-1"
                                >
                                    <div
                                        :class="$style['list-item']"
                                        class="flex sm:block"
                                        v-for="(item, index) in form"
                                        :key="index"
                                    >
                                        <div :class="$style['title']">
                                            {{ item.title }}
                                        </div>
                                        <div :class="$style['value']">
                                            <StarList
                                                :margin="false"
                                                :score="item.value"
                                                :fixed="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                :class="$style['lesson-replay']"
                                v-if="reportDetail.recordUrl"
                            >
                                <div :class="$style['video-box']">
                                    <img
                                        src="@/assets/images/report/video.png"
                                        alt=""
                                    />
                                    <BtnPlayVideo
                                        :video="reportDetail.recordUrl"
                                        :class="$style['play-btn']"
                                    >
                                        <i class="ic iconfont icon-play"></i>
                                    </BtnPlayVideo>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LevelPanel
                        v-else
                        :time="reportDetail.dtime"
                        :score="reportDetail.level"
                    ></LevelPanel>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_LESSON_REPORT } from "@/assets/script/api/api";

import { onMounted, ref } from "vue";
import StarList from "@/components/public/StarList.vue";
import LevelPanel from "@/components/report/LevelPanel.vue";
import { useContext, useRoute } from "@nuxtjs/composition-api";

import { getWeekTimeReverse, getClock } from "@/assets/script/util/date";
import { LessonReport } from "@/assets/script/api/api";

const { i18n, app } = useContext();
const route = useRoute();
const lang = app.i18n.locale;
const reportDetail = ref<TYPE_LESSON_REPORT>();

const form = ref<Record<string, { title: string; value: number }>>({
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
});

onMounted(() => {
    LessonReport({ userLessonReportid: Number(route.value.params.id) }).then(
        (res) => {
            if (res.statusCode === 0) {
                reportDetail.value = res.data;

                Object.keys(form.value).forEach((k: any) => {
                    form.value[k].value = (res.data as any)[k];
                });
            }
        }
    );
});
</script>
<script lang="ts">
export default {
    name: "ReportDetail",
};
</script>
<style lang="scss" module>
.report-detail {
    .report-detail-panel {
        padding: $panel-padding-3;

        border-radius: var(--r-normal);
        background-color: #fff;
    }
    .panel-head {
        font-size: 26px;
        font-weight: 700;
        line-height: em(38px, 26px);

        color: #2d2b32;
    }
    .panel-title {
        @include panel-head;

        margin-bottom: var(--p-normal);
    }
    .panel-subtitle {
        font-size: 16px;
        font-weight: 700;
        line-height: em(24px, 16px);

        color: #2d2b32;
        .lesson-day {
            font-size: 14px;
            font-weight: 500;
            line-height: em(21px, 14px);

            margin-left: 8px;

            color: #777;
        }
    }
    .lesson-teacher {
        margin-top: c-space(3.5);
        padding-top: 20px;
        padding-bottom: c-space(5);

        border-bottom: 1px solid #e6e8ec;
        .avatar {
            @include circle(90px);
            @include image-placeholder(90px, 90px);
            margin-right: var(--x-space-normal);

            background-color: #fff;
        }
        .title {
            font-size: 18px;
            font-weight: 700;
            line-height: em(27px, 18px);

            margin-bottom: 9px;

            color: #2d2b32;
        }
        .msg {
            font-size: 13px;
            line-height: 200%;

            max-width: 538px;

            color: #b1b5c4;
        }
    }
    .star-area {
        padding-top: 45px;
        padding-bottom: 20px;
        .area-name {
            font-size: 24px;
            font-weight: 700;
            line-height: em(36px, 24px);

            margin-bottom: 28px;

            color: #2d2b32;
        }
    }
    .star-list {
        .list-item {
            @include space-between(29px, "y");
        }
        .title {
            font-size: 15px;
            line-height: em(24px, 15px);

            width: 90px;
            margin-right: 28px;

            text-align: right;

            color: #777;
        }
    }
    .lesson-replay {
        margin-top: 30px;
    }
    .video-box {
        @include image-placeholder(880px, 578px);
        position: relative;

        width: 100%;

        border-radius: 10px;
        .play-btn {
            @include circle(em(100px, 30px), #fff);
            font-size: 30px;

            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            margin: auto;
            padding: 0;

            transition: 0.26s ease;

            color: #333;
            box-shadow: 0 0 0 0 rgb(0 0 0 / 0.1);
            :global(.ic) {
                margin-right: em(-5px, 30px);
            }
            &:hover {
                color: #333;
                box-shadow: 10px 20px 30px 0 rgb(0 0 0 / 0.1);
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .star-area {
            .title {
                width: 100%;
                margin-bottom: 10px;

                text-align: left;
            }
        }
        .video-box {
            border-radius: 10px;
            .play-btn {
                font-size: 22px;
            }
        }
    }
}
</style>
