<template>
    <div
        :class="$style['video-course-panel']"
        class="flex items-center lg:block"
    >
        <div class="state-pos--left relative z-10">
            <div :class="$style['swiper-box']">
                <div
                    ref="swiper"
                    class="swiper relative"
                    :class="$style['course-swiper']"
                >
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            :class="$style['course-thumb']"
                        >
                            <nuxt-img :src="course.img" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="state-pos--right flex-grow">
            <h3 :class="$style['course-title']">
                <span class="text">{{ course.title }}</span>
            </h3>
            <div :class="$style['course-desc']">
                <p class="text">
                    {{ course.message }}
                </p>
            </div>
            <div :class="$style['course-tag']">
                <TagText :tags="course.keys" />
            </div>
            <div :class="$style['course-data']">
                {{
                    $t("KEY_VIDEO_COURSE.OTHER.课节数n节", [course.lessonCount])
                }}
                <span :class="$style['divide-line']">|</span>
                {{ $t("KEY_VIDEO_COURSE.OTHER.已有") }}
                <span :class="$style['student-count']">{{
                    course.studentCount
                }}</span>
                {{ $t("KEY_VIDEO_COURSE.OTHER.人学习") }}
            </div>
            <div
                :class="$style['course-info']"
                class="flex flex-wrap whitespace-nowrap"
            >
                <div
                    v-if="'lessonStart' in course"
                    :class="$style['course-start']"
                    class="mr-10"
                >
                    {{ $t("KEY_VIDEO_COURSE.OTHER.上课时间") }}:
                    {{ course.lessonStart }}
                </div>
                <div v-if="'address' in course" :class="$style['course-start']">
                    {{ $t("KEY_VIDEO_COURSE.OTHER.上课地点") }}:
                    {{ course.address }}
                </div>
            </div>
            <div
                :class="$style['course-consultation']"
                class="flex justify-between items-center"
            >
                <button
                    :class="$style['btn-consultation']"
                    @click="emit('buyCourse')"
                >
                    <span class="text">{{ $t("购买课程") }}</span>
                    <i class="ic iconfont icon-link-arrow"></i>
                </button>

                <div :class="$style['item-price']" class="text-right">
                    <div :class="$style['current-price']">
                        <span class="unit text">{{ course.currencyIco }}</span>
                        <span class="price text">
                            {{ course.price }}
                        </span>
                    </div>
                    <div
                        v-if="course.marketPrice != course.price"
                        :class="$style['origin-price']"
                    >
                        <span>{{ $t("KEY_VIDEO_COURSE.OTHER.原价") }}</span
                        ><span class="unit text">{{ course.currencyIco }}</span
                        ><span class="price text">
                            {{ course.marketPrice }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type {
    TYPE_RECORD_COURSE_DETAIL,
    TYPE_ONLINE_COURSE_DETAIL,
    TYPE_OFFLINE_COURSE_DETAIL,
} from "@/assets/script/api/api";
defineProps<{
    course:
        | TYPE_RECORD_COURSE_DETAIL
        | TYPE_ONLINE_COURSE_DETAIL
        | TYPE_OFFLINE_COURSE_DETAIL;
}>();
const emit = defineEmits<{ (e: "buyCourse"): void }>();
</script>
<style lang="scss" module>
.video-course-panel {
    position: relative;

    margin-bottom: 82px;
    /* #region course 幻灯展示 */
    :global {
        .state-pos--left {
            width: min(560px, 46%);
            margin-right: 82px;
        }
        .state-pos--right {
            min-width: 1px;
        }
    }
    .current-price {
        font-size: 18px;

        color: #777;
        :global(.price) {
            font-family: "Inter";
            font-size: em(36px, 18px);
            font-weight: bold;
            line-height: em(44px, 36px);

            vertical-align: -2px;

            color: #f53f2d;
        }
        :global(.unit) {
            font-family: "Inter";
            font-size: em(20px, 18px);
            font-weight: bold;
            line-height: em(24px, 20px);

            color: #f53f2d;
        }
    }
    .origin-price {
        font-size: 12px;
        line-height: em(18px, 12px);

        text-decoration: line-through;

        color: #777;
    }
    .swiper-box {
        filter: drop-shadow(0 20px 80px rgb(56 49 71 / 0.15));
    }
    .course-swiper {
        overflow: hidden;
        flex: 0 0 auto;

        border-radius: 20px;
    }
    .course-thumb {
        @include image-placeholder(560px, 342px);
        width: 100%;
    }
    .swiper-controller {
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 0;

        width: 100%;
        height: 0;

        color: #152137;
        .btn--to-right,
        .btn--to-left {
            @include circle(61px, #fff);
            cursor: pointer;

            box-shadow: 0 10px 40px rgb(97 97 97 / 0.1);
        }
        .btn--to-right {
            margin-right: -30px;
        }
        .btn--to-left {
            margin-left: -30px;
        }
    }
    /* #endregion */

    /* #region 课程信息介绍 */
    .course-title {
        @include ellipse(3, em(90px, 30px));
        font-size: 30px;
        font-weight: 700;
        line-height: em(45px, 30px);

        margin-bottom: em(10px, 30px);

        color: #333;
    }
    .course-desc {
        @include ellipse(2, 2em, 1);
        font-size: 15px;
        line-height: 200%;

        max-width: 514px;
        margin-bottom: em(19px, 16px);

        color: #777;
    }
    .course-start,
    .course-data {
        font-size: 13px;
        line-height: em(20px, 13px);

        margin-top: em(19px, 13px);

        color: #777;
        .divide-line {
            font-size: em(12px, 13px);

            margin: 0 4px;

            opacity: 0.2;
            color: #000;
        }
        .student-count {
            font-size: 16px;
            font-weight: 700;
            line-height: em(26px, 16px);

            color: #000;
        }
    }
    .course-start {
        margin-top: 14px;
    }
    .course-consultation {
        font-size: 17px;

        margin-top: em(24px, 17px);
    }
    .btn-consultation {
        font-size: 18px;
        font-weight: 700;
        line-height: em(27px, 18px);

        position: relative;

        overflow: hidden;

        padding: em(16px, 18px) em(60px, 18px);

        color: #fff;
        border-radius: em(10px, 18px);
        background: #f8af00;
        &::after {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            content: "";
            transition: 0.36s ease;

            background: linear-gradient(
                82.16deg,
                #ff5656 35.79%,
                #ff7356 76.16%,
                #ffab6d 100%
            );
        }
        & > * {
            position: relative;
            z-index: 10;
        }
        :global(.ic) {
            font-weight: normal;

            margin-left: em(10px, 18px);
        }
    }
    /* #endregion */
    @include media-breakpoint-down(xxxl) {
        margin-bottom: 72px;
        :global {
            .state-pos--left {
                margin-right: 52px;
            }
        }
        .course-title {
            font-size: 28px;
        }
        .course-desc {
            font-size: 14px;
        }
        .course-consultation {
            font-size: 15px;

            margin-top: em(36px, 15px);
        }
        .course-tag {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(xl) {
        :global {
            .state-pos--left {
                margin-right: 50px;
            }
            .state-pos--right {
                padding-bottom: 4px;
            }
        }
        .course-title {
            font-size: 22px;
        }
        .course-swiper {
            border-radius: 16px;
        }
        .course-desc {
            font-size: 13px;
        }
        .course-consultation {
            font-size: 12px;

            margin-top: em(30px, 15px);
        }
        .course-tag {
            & > * {
                font-size: 12px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 62px;
        :global {
            .state-pos--left {
                width: 100%;
                max-width: 700px;
                margin: 0;
                margin-bottom: 50px;
            }
            .state-pos--right {
                padding-bottom: 4px;
            }
        }
        .course-title {
            display: block;

            height: auto;

            white-space: normal;
        }
        .course-desc {
            display: block;

            width: 100%;
            max-width: initial;
            height: auto;

            white-space: normal;
        }
        .course-thumb {
            width: 100%;
        }
        .course-consultation {
            font-size: 14px;

            margin-top: em(30px, 15px);
        }
    }
    @include media-breakpoint-down(sm) {
        margin-bottom: 42px;
        .btn-consultation {
            width: 100%;
        }
        :global {
            .state-pos--left {
                margin-bottom: 30px;
            }
        }
    }
}
:global(.lang-en) {
    .video-course-panel {
        .course-title {
            font-size: 28px;
        }
        @include media-breakpoint-down(xxl) {
            .course-title {
                font-size: 25px;
            }
            .course-consultation {
                font-size: 14px;

                margin-top: 2em;
            }
        }
        @include media-breakpoint-down(xl) {
            .course-title {
                font-size: 18px;
            }
            .course-desc {
                margin-bottom: 1em;
            }
            .course-consultation {
                font-size: 13px;

                margin-top: 1em;
            }
        }
        @include media-breakpoint-down(lg) {
            .course-consultation {
                margin-top: 2em;
            }
        }
    }
}
</style>
