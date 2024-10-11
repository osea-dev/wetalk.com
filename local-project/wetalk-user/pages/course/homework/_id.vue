<!--
 * @Description: 家庭作业页面
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 13:12:42
-->
<template>
    <div :class="$style['course-homework-page']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['homework-module']" v-if="homework">
                    <div :class="$style['module-head']">
                        <div :class="$style['module-title']">
                            <h2 :class="$style['course-name']">
                                {{
                                    $t("KEY_HOMEWORK_PANEL.NAME", [
                                        homework.lessonName,
                                    ])
                                }}
                            </h2>
                            <h3 :class="$style['lesson-name']">
                                {{ homework.courseName }}
                            </h3>
                        </div>
                        <div :class="$style['module-subtitle']">
                            <span class="text"
                                >{{ getClock(homework.menkeStarttime) }}-{{
                                    getClock(homework.menkeEndtime)
                                }}</span
                            >
                            <span class="ml-1 text">{{
                                getWeekTimeReverse(
                                    homework.menkeStarttime,
                                    lang
                                )
                            }}</span>
                        </div>
                    </div>
                    <div :class="$style['module-body']">
                        <h1 :class="$style['title']">
                            {{ homework.title }}
                        </h1>
                        <div :class="$style['content']">
                            <h2 class="mb-3">
                                {{ $t("KEY_HOMEWORK_PANEL.TIP.0") }}
                            </h2>
                            <div v-html="homework.content"></div>
                        </div>
                        <div
                            :class="$style['resource']"
                            v-if="homework.resources.length"
                            class="inline-grid grid-cols-2"
                        >
                            <BtnResource
                                :class="$style['button']"
                                v-for="(item, index) in homework.resources"
                                :key="index"
                                :title="homework.lessonName"
                                :data="item"
                            />
                        </div>
                        <div
                            :class="$style['video-box']"
                            v-if="homework.recordUrl"
                        >
                            <img
                                src="@/assets/images/report/video.png"
                                alt=""
                            />
                            <BtnPlayVideo
                                :video="homework.recordUrl"
                                :class="$style['play-btn']"
                            >
                                <i class="ic iconfont icon-play"></i>
                            </BtnPlayVideo>
                        </div>
                        <template v-if="homework.isSubmit">
                            <div
                                :class="$style['student-area']"
                                v-for="(
                                    work, index
                                ) in homework.submitHomeworks"
                                :key="index"
                            >
                                <h2 :class="$style['area-title']">
                                    {{ $t("KEY_HOMEWORK_PANEL.TITLE") }}
                                </h2>
                                <div :class="$style['area-time']">
                                    {{ formateDate(work.submitTime) }}
                                    &nbsp;
                                    {{ getClock(work.submitTime) }}
                                </div>
                                <div :class="$style['area-body']">
                                    <div
                                        :class="$style['resource']"
                                        class="inline-grid grid-cols-2"
                                        v-if="work.submitFiles.length"
                                    >
                                        <BtnResource
                                            :class="$style['button']"
                                            v-for="(
                                                item, index
                                            ) in work.submitFiles"
                                            :key="index"
                                            :title="homework.lessonName"
                                            :data="item"
                                        />
                                    </div>
                                    <div
                                        :class="$style['content']"
                                        v-html="work.submitContent"
                                    ></div>
                                    <div
                                        :class="$style['teacher']"
                                        v-if="work.isRemark"
                                    >
                                        <div class="flex items-start lg:block">
                                            <div
                                                :class="$style['intro']"
                                                class="flex items-center"
                                            >
                                                <Avatar
                                                    :avatar="
                                                        work.teacherHeadImg
                                                    "
                                                    :class="$style['avatar']"
                                                />
                                                <div :class="$style['info']">
                                                    <div
                                                        :class="$style['name']"
                                                    >
                                                        {{ work.teacherName }}
                                                    </div>
                                                    <div
                                                        :class="
                                                            $style['position']
                                                        "
                                                        v-if="work.teacherKeys"
                                                    >
                                                        {{
                                                            work.teacherKeys.join(
                                                                "/"
                                                            )
                                                        }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div :class="$style['feedback']">
                                                <PublicStarList
                                                    :class="$style['star-list']"
                                                    :margin="false"
                                                    :totalScore="4"
                                                    :score="work.remarkRank + 1"
                                                    :scoreText="[
                                                        $t('KEY_BASE.STAR.0'),
                                                        $t('KEY_BASE.STAR.1'),
                                                        $t('KEY_BASE.STAR.2'),
                                                        $t('KEY_BASE.STAR.3'),
                                                        $t('KEY_BASE.STAR.4'),
                                                    ]"
                                                    :fixed="true"
                                                />
                                                <div
                                                    :class="$style['msg']"
                                                    v-html="work.remarkContent"
                                                ></div>
                                            </div>
                                        </div>
                                        <div
                                            :class="$style['resource']"
                                            class="inline-grid grid-cols-2"
                                            v-if="work.remarkFiles.length"
                                        >
                                            <BtnResource
                                                :class="$style['button']"
                                                v-for="(
                                                    item, index
                                                ) in work.remarkFiles"
                                                :key="index"
                                                :title="homework.lessonName"
                                                :data="item"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_HOMEWORK_DETAIL } from "@/assets/script/api/api";

import { onMounted, ref } from "vue";
import { HomeworkDetail } from "@/assets/script/api/api";
import { useContext, useRoute } from "@nuxtjs/composition-api";
import {
    getWeekTimeReverse,
    getClock,
    formateDate,
} from "@/assets/script/util/date";

const { app } = useContext();
const lang = app.i18n.locale;
const homework = ref<TYPE_HOMEWORK_DETAIL>();

const route = useRoute();

onMounted(() => {
    HomeworkDetail({ userLessonid: Number(route.value.params.id) }).then(
        (res) => {
            if (res.statusCode === 0) {
                homework.value = res.data;
            }
        }
    );
});
</script>
<script lang="ts">
export default {
    name: "HomeWorkPage",
};
</script>
<style lang="scss" module>
.course-homework-page {
    .btn--back {
        font-size: 16px;
        line-height: em(24px, 16px);

        margin-bottom: 23px;

        transition: 0.26s ease;

        color: #777;
        &:hover {
            color: #333;
        }
    }
}
.homework-module {
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    .module-head {
        padding-bottom: 36px;

        border-bottom: 1px solid #e6e8ec;
    }
    .module-title {
        @include panel-head;

        margin-bottom: 12px;
        .lesson-name {
            font-size: 15px;
            font-weight: 500;
            line-height: 1.5;

            color: #777;
        }
    }
    .video-box {
        @include image-placeholder(880px, 578px);
        position: relative;

        width: 100%;
        margin-top: 60px;

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

            transition: 0.26s ease;

            color: #333;
            box-shadow: 0 0 0 0 rgb(0 0 0 / 0.1);
            :global(.ic) {
                margin-right: -5px;
            }
            &:hover {
                color: #333;
                box-shadow: 10px 20px 30px 0 rgb(0 0 0 / 0.1);
            }
        }
    }
    .module-subtitle {
        font-size: 14px;
        line-height: em(21px, 14px);

        color: #777;
    }
    .module-body {
        font-size: 14px;
        line-height: 200%;

        padding-top: em(34px, 14px);
        padding-bottom: em(66px, 14px);

        color: #2d2b32;
        .title {
            margin-bottom: em(30px, 14px);
            padding-left: em(20px, 14px);

            border-left: 5px solid #f29100;
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
            font-size: em(20px, 14px);
            line-height: em(30px, 20px);

            color: #2d2b32;
        }
        h1 {
            font-size: em(22px, 14px);
        }
    }
    .resource {
        margin-top: 40px;

        gap: 20px;
        .button {
            box-shadow: inset 0 0 0 2px rgb(119 119 119 / 0.3);
        }
    }
    @include media-breakpoint-down(md) {
        padding: $panel-padding-2;
        .resource {
            gap: 10px;
        }
    }
    @include media-breakpoint-down(sm) {
        .module-head {
            padding-bottom: 16px;
        }
        .resource {
            display: grid;

            margin-top: 20px;

            grid-template-columns: 1fr;
            .button {
                width: 100%;
            }
        }
        .module-body {
            font-size: 12px;

            padding-top: 20px;
            .title {
                margin-bottom: 30px;
                padding-left: em(10px, 14px);

                border-left: 4px solid #f29100;
            }
        }
        .video-box {
            margin-top: 30px;
            .play-btn {
                font-size: 22px;

                padding: 0;
            }
        }
    }
}
.student-area {
    margin-top: 50px;
    padding-top: 43px;

    border-top: 1px solid #e6e8ec;
    .area-title {
        font-size: 26px;
        font-weight: 700;
        line-height: em(38px, 26px);

        color: #2d2b32;
    }
    .area-time {
        font-size: 12px;

        margin-bottom: 26px;

        color: #777;
    }
    .area-body {
        padding: 40px 50px;

        border-radius: 10px;
        background: #f5f6f9;
        .resource {
            margin-bottom: 42px;

            gap: 20px;
        }
        .button {
            border: 0 solid #3b71fe;
        }
    }
    .teacher {
        position: relative;

        margin-top: 25px;
        padding: 30px 30px 42px;

        border-radius: 10px;
        background-color: #fff;
        box-shadow: 10px 20px 40px rgb(0 0 0 / 0.06);
        &::after {
            position: absolute;
            top: -12px;
            left: 92px;

            width: 32px;
            height: 32px;

            content: "";
            transform: rotate(45deg);

            border-radius: 4px;
            background-color: #fff;
        }
        .avatar {
            width: 70px;
            margin-right: 15px;
        }
        .name {
            font-size: 18px;
            line-height: em(24px, 18px);

            color: #2d2b32;
        }
        .position {
            font-size: 13px;
            line-height: 158%;

            margin-top: 6px;

            color: #777;
        }
        .feedback {
            padding-top: 11px;
        }
        .intro {
            margin-right: 80px;
        }
        .star-list {
            margin: 0;
        }
        .msg {
            font-size: 13px;
            line-height: 200%;

            max-width: 397px;
            margin-top: 16px;

            color: #777;
        }
        .voice {
            font-family: "Inter";
            font-weight: 700;

            width: 200px;
            margin-top: 18px;
            padding: 10px 20px;

            color: #3b71fe;
            border-radius: 20px;
            background: #fff;
            box-shadow: 0 4px 15px rgb(38 51 77 / 0.12);
            :global(.ic) {
                margin-right: 4px;
            }
        }
        .resource {
            margin: 0;
            margin-top: 40px;
        }
    }
    .content {
        font-size: 13px;
        line-height: em(34px, 13px);

        color: #777;
    }
    @include media-breakpoint-down(lg) {
        .area-body {
            padding: 30px 40px;
            .resource {
                margin: 20px 0;
            }
        }
        .teacher {
            padding: 30px 20px;
            .avatar {
                width: 50px;
            }
            .intro {
                font-size: 14px;

                margin-right: 40px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .area-body {
            padding: 30px;
        }
    }
    @include media-breakpoint-down(sm) {
        margin-top: 30px;
        padding-top: 22px;
        .area-time {
            margin-bottom: 14px;
        }
        .area-body {
            padding: 20px 14px;
            .resource {
                margin-top: 0;
            }
            .intro {
                display: block;

                margin: 0;
                margin-bottom: 5px;
                padding-bottom: 12px;

                border-bottom: 1px solid rgb(0 0 0 / 0.1);
            }
            .name {
                margin-top: 10px;
            }
        }
    }
}
</style>
