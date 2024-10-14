<!--
 * @Description:课程的详细介绍
 * @Author: F-Stone
 * @LastEditTime: 2023-03-20 14:22:46
-->
<template>
    <div :class="$style['lesson-detail']" class="overflow-hidden">
        <div class="wrapper--limit-width-mini">
            <div ref="lessonDetailBar" :class="$style['lesson-detail-bar']">
                <div class="flex" :class="$style['lesson-bar-inner']">
                    <div
                        v-for="item in group"
                        :key="item.title"
                        :class="$style['btn--bar']"
                        :data-select="currentShowGroup === item.type"
                        :data-type="item.type"
                        @click="scrollTo(item.type)"
                    >
                        <span class="text">{{ item.title }}</span>
                    </div>
                </div>
            </div>
            <div :class="$style['lesson-detail-body']">
                <div
                    v-for="item in group"
                    :key="item.type"
                    ref="groups"
                    :class="$style['lesson-detail-group']"
                    :data-type="item.type"
                >
                    <h3 :class="$style['group-title']">
                        <span class="text">{{ item.title }}</span>
                        <i class="ic"></i>
                    </h3>
                    <div :class="$style['group-body']">
                        <template v-if="item.type === 'intro'">
                            <LessonIntro :content="item.content" />
                        </template>
                        <template v-if="item.type === 'target'">
                            <LessonIntro :content="item.content" />
                        </template>
                        <template v-if="item.type === 'merit'">
                            <LessonMerit :content="item.content" />
                        </template>
                        <template v-if="item.type === 'adapt'">
                            <LessonIntro :content="item.content" />
                        </template>
                        <template v-if="item.type === 'outline'">
                            <LessonIntro :content="item.content" />
                        </template>
                        <template v-if="item.type === 'statement'">
                            <LessonStatement />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import LessonIntro from "@/components/education/LessonIntro.vue";
import LessonStatement from "@/components/education/LessonStatement.vue";
import LessonMerit from "@/components/education/LessonMerit.vue";
import type { TYPE_SUB_COURSE_DETAIL } from "@/assets/script/api/api";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContext } from "@nuxtjs/composition-api";

const prop = defineProps<{
    data: TYPE_SUB_COURSE_DETAIL;
}>();

const detail = reactive(prop.data);
const { i18n } = useContext();

const group = computed<{ title: string; type: string; content: string }[]>(
    () => {
        const list = {
            intro: {
                title: i18n.t("课程介绍"),
                type: "intro",
                content: detail.intro,
            },
            target: {
                title: i18n.t("课程目标"),
                type: "target",
                content: detail.objectives,
            },
            adapt: {
                title: i18n.t("适合人群"),
                type: "adapt",
                content: detail.crowd,
            },
            merit: {
                title: i18n.t("课程特色"),
                type: "merit",
                content: detail.merit,
            },
            outline: {
                title: i18n.t("课程大纲"),
                type: "outline",
                content: detail.catalog,
            },
            statement: {
                title: i18n.t("购课须知"),
                type: "statement",
                content: "true",
            },
        };

        return Object.values(list).filter((item) => !!item.content);
    }
);

const currentShowGroup = ref<string>("intro");
const groups = ref<HTMLElement[] | []>([]);
const lessonDetailBar = ref<HTMLElement | null>();

function scrollTo(type: typeof group.value[number]["type"]) {
    const targetDom = groups.value.filter((dom) => {
        return $(dom).data("type") === type;
    });

    const barHeight = $(lessonDetailBar.value!).outerHeight() || 0;
    const computedStyle = getComputedStyle($("body")[0]);
    const navH = parseInt(computedStyle.getPropertyValue("--nav-h"));
    gsap.to(window, {
        duration: 0.56,
        scrollTo: () => {
            const target = targetDom[0]?.getBoundingClientRect();
            if (!target) return;
            const scrollTarget = "+=" + (target.top - barHeight - navH);
            return {
                y: scrollTarget,
                x: 0,
            };
        },
        onComplete() {
            currentShowGroup.value = type;
        },
    });
}
onMounted(() => {
    const computedStyle = getComputedStyle($("body")[0]);
    const scrollTriggerList: any[] = [];
    const lessonDetailBarDom = lessonDetailBar.value!;
    requestAnimationFrame(() => {
        scrollTriggerList.push(
            ScrollTrigger.create({
                trigger: lessonDetailBarDom.parentElement,
                // pin: lessonDetailBarDom,
                // pinSpacing: false,
                pinType: "transform",
                start: () => {
                    const navH = parseInt(
                        computedStyle.getPropertyValue("--nav-h")
                    );
                    return `top ${navH}`;
                },
                end: () => {
                    const navH = parseInt(
                        computedStyle.getPropertyValue("--nav-h")
                    );
                    return `top ${
                        navH +
                        Number(
                            gsap
                                .getProperty(lessonDetailBarDom, "height")
                                .toString()
                        )
                    }`;
                },
                endTrigger: $(groups.value).filter(
                    '[data-type="statement"]'
                )[0],
                scrub: true,
                onEnter() {
                    $(lessonDetailBarDom).addClass("state-sticky");
                },
                onLeaveBack() {
                    $(lessonDetailBarDom).removeClass("state-sticky");
                },
            })
        );
        groups.value.forEach((el) => {
            scrollTriggerList.push(
                ScrollTrigger.create({
                    trigger: el,
                    start: "top center",
                    onEnter(self) {
                        currentShowGroup.value = $(self.trigger!).data("type");
                    },
                }),
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 100px",
                    onLeaveBack(self) {
                        currentShowGroup.value = $(self.trigger!).data("type");
                    },
                })
            );
        });
        let resizeTimer: NodeJS.Timeout;
        $(window).on("resize.ScrollTrigger", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        });
    });
    onBeforeUnmount(() => {
        scrollTriggerList.map((scroll) => scroll.kill());
        currentShowGroup.value = "statement";
        $(window).off("resize.ScrollTrigger");
    });
});
</script>
<style lang="scss" module>
.lesson-detail-bar {
    font-size: 16px;

    position: relative;
    z-index: $zindex-fixed - 100;

    color: #777;
    border-bottom: 1px solid #e8ecee;
    // top: var(--nav-h);

    will-change: transform;
    &::after {
        position: absolute;
        top: 0;
        left: 50%;

        width: 200vw;
        height: 100%;
        margin-left: -100vw;

        content: "";
        transition: 0.26s ease;
    }
    .lesson-bar-inner {
        position: relative;
        z-index: 10;

        overflow: auto;

        white-space: nowrap;
    }
    &:global(.state-sticky) {
        &::after {
            background-color: #fff;
        }
    }
    .btn--bar {
        @include space-between(86px);
        position: relative;

        padding: 29px 0;

        cursor: pointer;
        transition: 0.36s ease;
        &[data-select] {
            color: #2d2b32;
            &::after {
                bottom: 20px;

                opacity: 1;
            }
        }
        &:hover {
            color: #2d2b32;
        }
        &::after {
            position: absolute;
            bottom: 25px;
            left: 50%;

            width: 24px;
            height: 4px;

            content: "";
            transition: 0.36s ease;
            transform: translateX(-50%);

            opacity: 0;
            border-radius: 2px;
            background: #2d2b32;
        }
    }
    @include media-breakpoint-down(xxxl) {
        font-size: 15px;
        .btn--bar {
            @include space-between(70px);

            padding: 24px 0;
            &[data-select] {
                &::after {
                    bottom: 16px;
                }
            }
            &::after {
                bottom: 11px;

                width: 26px;
                height: 4px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        font-size: 14px;
        .btn--bar {
            @include space-between(60px);

            padding: 22px 0;
            &[data-select] {
                &::after {
                    bottom: 16px;
                }
            }
            &::after {
                bottom: 11px;

                width: 24px;
                height: 3px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .btn--bar {
            @include space-between(50px);
        }
    }
    @include media-breakpoint-down(md) {
        .btn--bar {
            @include space-between(40px);
        }
    }
}
.lesson-detail-group {
    padding-top: 65px;
    padding-bottom: 50px;
    .group-title {
        font-size: 26px;
        font-weight: 700;
        line-height: em(39px, 26px);

        position: relative;

        margin-bottom: em(36px, 28px);
        padding-left: em(35px, 28px);

        color: #333;
        :global(.ic) {
            @include circle(em(8px, 28px), #0aca91);
            position: absolute;
            top: 50%;
            left: 0;

            margin-top: em(-4px, 28px);
            &::after {
                position: absolute;
                top: 0;
                left: 12px;

                width: em(8px, 28px);
                height: em(8px, 28px);

                content: "";

                border: 2px solid #0aca91;
                border-radius: 50%;
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        padding-bottom: 40px;
        .group-title {
            font-size: 26px;
        }
    }
    @include media-breakpoint-down(xxl) {
        padding-top: 45px;
        padding-bottom: 40px;
        .group-title {
            font-size: 24px;
            // :global(.ic) {
            //     @include circle(8px, #0aca91);
            //     position: absolute;
            //     top: 50%;
            //     left: 0;

            //     margin-top: -4px;
            //     &::after {
            //         position: absolute;
            //         top: 0;
            //         left: 12px;

            //         width: 8px;
            //         height: 8px;

            //         content: "";

            //         border: 2px solid #0aca91;
            //         border-radius: 50%;
            //     }
            // }
        }
    }
    @include media-breakpoint-down(xl) {
        padding-top: 35px;
        padding-bottom: 30px;
        .group-title {
            font-size: 22px;
        }
    }
    @include media-breakpoint-down(md) {
        .group-title {
            font-size: 20px;
        }
    }
}
.lesson-detail-body {
    padding-bottom: 95px;
}
:global(.lang-en) {
    .lesson-detail-bar {
        @include media-breakpoint-down(xl) {
            font-size: 13px;
            .lesson-bar-inner {
                .btn--bar {
                    @include space-between(30px);
                }
            }
        }
    }
}
</style>
