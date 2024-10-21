<template>
    <div :class="$style['lesson-card']" class="flex items-center lg:block">
        <div class="state-pos--left relative z-10">
            <div :class="$style['swiper-box']">
                <div
                    ref="swiper"
                    class="swiper relative"
                    :class="$style['lesson-swiper']"
                >
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            :class="$style['lesson-thumb']"
                        >
                            <nuxt-img :src="intro.img" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="state-pos--right">
            <h3 :class="$style['lesson-title']">
                <span class="text">{{ intro.title }}</span>
            </h3>
            <div :class="$style['lesson-desc']">
                <p class="text">
                    {{ intro.message }}
                </p>
            </div>
            <div :class="$style['lesson-tag']">
                <TagText :tags="intro.keys" />
            </div>
            <div :class="$style['lesson-consultation']">
                <button
                    :class="$style['btn-consultation']"
                    @click="openMessageBoard"
                >
                    <span class="text">{{ $t("立即咨询") }}</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue";
import MessageFormPanel from "@/components/MessageFormPanel.vue";
import type { TYPE_SUB_COURSE_DETAIL } from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

const prop = defineProps<{
    intro: TYPE_SUB_COURSE_DETAIL;
    subCourseId: string;
}>();
const swiper = ref<HTMLElement | null>(null);

const { i18n, $dialog } = useContext();

const instance = getCurrentInstance();
function openMessageBoard() {
    if (!instance) return;
    const dialogBox = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(MessageFormPanel, {
            props: {
                title: i18n.t("请留下您的联系方式") + "：",
                currentCourse: {
                    title: prop.intro.title,
                    value: String(prop.subCourseId),
                },
            },
            on: {
                close() {
                    dialogBox.close();
                },
            },
        }),
    });
}
</script>
<style lang="scss" module>
.lesson-card {
    position: relative;

    margin-bottom: 82px;
    /* #region lesson 幻灯展示 */
    :global {
        .state-pos--left {
            flex: 1 0 auto;

            width: min(560px, 46%);
            margin-right: 82px;
        }
        .state-pos--right {
            min-width: 1px;
        }
    }
    .swiper-box {
        filter: drop-shadow(0 20px 80px rgb(56 49 71 / 0.15));
    }
    .lesson-swiper {
        overflow: hidden;
        flex: 0 0 auto;

        border-radius: 20px;
    }
    .lesson-thumb {
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
    .lesson-title {
        @include ellipse(3, em(90px, 30px));
        font-size: 30px;
        font-weight: 700;
        line-height: em(45px, 30px);

        margin-bottom: em(13px, 30px);

        color: #333;
    }
    .lesson-desc {
        @include ellipse(2, 2em, 1);
        font-size: 15px;
        line-height: 200%;

        max-width: 514px;
        margin-bottom: em(28px, 16px);

        color: #777;
    }
    .lesson-consultation {
        font-size: 17px;

        margin-top: em(40px, 17px);
    }
    .btn-consultation {
        line-height: em(60px, 17px);

        position: relative;

        overflow: hidden;

        width: em(190px, 17px);

        text-align: center;

        color: #fff;
        border-radius: em(10px, 17px);
        &::after {
            position: absolute;
            top: 0;
            right: 0;

            width: 200%;
            height: 100%;

            content: "";
            transition: 0.46s ease;

            background: linear-gradient(
                82.16deg,
                #ff5656 67.895%,
                #ff7356 88.08%,
                #ffab6d 100%
            );
        }
        span {
            position: relative;
            z-index: 10;
        }
        &:hover {
            &::after {
                transition: 2s ease;
                transform: translateX(50%);
            }
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
        .lesson-title {
            font-size: 28px;
        }
        .lesson-desc {
            font-size: 14px;
        }
        .lesson-consultation {
            font-size: 15px;

            margin-top: em(36px, 15px);
        }
        .lesson-tag {
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
        .lesson-title {
            font-size: 22px;
        }
        .lesson-swiper {
            border-radius: 16px;
        }
        .lesson-desc {
            font-size: 13px;
        }
        .lesson-consultation {
            font-size: 12px;

            margin-top: em(30px, 15px);
        }
        .lesson-tag {
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
        .lesson-title {
            display: block;

            height: auto;

            white-space: normal;
        }
        .lesson-desc {
            display: block;

            width: 100%;
            max-width: initial;
            height: auto;

            white-space: normal;
        }
        .lesson-thumb {
            width: 100%;
        }
        .lesson-consultation {
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
    .lesson-card {
        .lesson-title {
            font-size: 28px;
        }
        @include media-breakpoint-down(xxl) {
            .lesson-title {
                font-size: 25px;
            }
            .lesson-consultation {
                font-size: 14px;

                margin-top: 2em;
            }
        }
        @include media-breakpoint-down(xl) {
            .lesson-title {
                font-size: 18px;
            }
            .lesson-desc {
                margin-bottom: 1em;
            }
            .lesson-consultation {
                font-size: 13px;

                margin-top: 1em;
            }
        }
        @include media-breakpoint-down(lg) {
            .lesson-consultation {
                margin-top: 2em;
            }
        }
    }
}
</style>
