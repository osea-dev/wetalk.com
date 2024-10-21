<!--
 * @Description: 课程介绍
 * @Author: F-Stone
 * @LastEditTime: 2023-01-04 13:32:26
-->
<template>
    <div :class="$style['course-intro-module']">
        <div :class="$style['module-inner']">
            <div :class="$style['module-head']">
                <h2 :class="$style['module-title']">
                    <span class="text">{{ $t("课程体系") }}</span>
                </h2>
                <p :class="$style['module-desc']">
                    {{ course.curricula }}
                </p>
            </div>
            <div :class="$style['module-body']">
                <div
                    :class="$style['course-category']"
                    class="flex animate__fadeInUp-50 wow"
                >
                    <button
                        v-for="(item, index) in category"
                        :key="index"
                        :class="$style['category-item']"
                        class="flex items-center justify-center"
                        :data-active="currentCategory === item.value"
                        @click="tabCategory(index)"
                    >
                        <span class="text">{{ item.title }}</span>
                    </button>
                    <div
                        ref="categoryShadow"
                        :class="$style['category-shadow']"
                        :style="{ width: (1 / category.length) * 100 + '%' }"
                    >
                        <div :class="$style['icon']"></div>
                    </div>
                </div>
                <div :class="$style['lesson-list']">
                    <template v-for="group in course.groups">
                        <template v-for="item in group.groupInfos">
                            <div
                                v-if="group.courseGroupid === currentCategory"
                                :key="item.courseGroupInfoid"
                                :class="$style['list-item']"
                                class="flex items-center animate__fadeInUp-50 wow"
                            >
                                <div
                                    :key="item.courseGroupInfoid"
                                    :class="$style['item-thumb']"
                                >
                                    <nuxt-img :src="item.img" alt="" />
                                    <div :class="$style['level-icon']">
                                        <span class="text">{{
                                            item.level
                                        }}</span>
                                    </div>
                                </div>
                                <div
                                    :key="item.courseGroupInfoid + 'info'"
                                    :class="$style['item-info']"
                                    class="min-w-0"
                                >
                                    <div :class="$style['item-title']">
                                        {{ item.title }}
                                    </div>
                                    <div :class="$style['item-desc']">
                                        {{ item.message }}
                                    </div>
                                    <div :class="$style['item-tag']">
                                        <TagText
                                            :class="$style['tag-item']"
                                            :tags="item.keys"
                                        />
                                    </div>
                                    <Link
                                        :to="
                                            linkManage.educationCourse +
                                            '/' +
                                            item.courseGroupInfoid
                                        "
                                        target="_blank"
                                        :class="$style['btn']"
                                    >
                                        <span class="text">{{
                                            $t("了解课程")
                                        }}</span>
                                        <i
                                            class="ic iconfont icon-link-arrow"
                                        ></i>
                                    </Link>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";

import type { TYPE_COURSE_DETAIL } from "@/assets/script/api/api";

const prop = defineProps<{ course: TYPE_COURSE_DETAIL }>();

const course = computed(() => {
    return prop.course;
});

const currentCategory = ref<number>(1);

const category = computed(() => {
    return course.value.groups.map((group) => {
        return {
            value: group.courseGroupid,
            title: group.groupName,
        };
    });
});

onMounted(() => {
    currentCategory.value = category.value[0]?.value;
});

const categoryShadow = ref<HTMLElement | null>(null);
function tabCategory(index: number) {
    gsap.to(categoryShadow.value, {
        left: (1 / category.value.length) * 100 * index + "%",
        duration: 0.26,
    });
    currentCategory.value = category.value[index].value;
}
</script>

<script lang="ts">
export default {
    name: "CourseIntro",
};
</script>
<style lang="scss" module>
.course-intro-module {
    padding-bottom: 180px;
    .module-inner {
        max-width: 1200px;
        margin: 0 auto;
    }
    .module-head {
        margin-bottom: 62px;
        .module-title {
            font-size: 48px;
            font-weight: 700;
            line-height: em(72px, 48px);

            margin-bottom: 17px;

            color: #333;
        }
        .module-desc {
            font-size: 16px;
            line-height: 200%;

            color: #777;
        }
    }
    @include media-breakpoint-down(xxl) {
        padding-bottom: 100px;
        .module-head {
            margin-bottom: 52px;
            .module-title {
                font-size: 42px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .module-head {
            margin-bottom: 47px;
            .module-title {
                font-size: 32px;

                margin-bottom: 14px;
            }
            .module-desc {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .module-head {
            margin-bottom: 30px;
            .module-title {
                font-size: 28px;

                margin-bottom: 10px;
            }
        }
    }
}
.course-category {
    position: relative;

    margin-bottom: 60px;

    border-radius: 40px;
    background: #f3f8ff;
    .category-item {
        font-size: 16px;
        line-height: em(24px, 16px);

        position: relative;
        z-index: 20;

        width: 100%;
        height: 80px;

        transition: 0.26s ease;

        color: #777;
        &[data-active] {
            color: #fff;
        }
    }
    .category-shadow {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;

        width: 100px;
        height: 100%;

        border-radius: 40px;
        background: #0aca91;
        box-shadow: 0 10px 20px rgb(0 0 0 / 0.08);
        &::after {
            position: absolute;
            top: 100%;
            left: 50%;

            width: 30px;
            height: 30px;

            content: "";
            transform: translateX(-50%) translateY(-80%) rotate(45deg);

            border-radius: 3px;
            background: #0aca91;
        }
    }
    @include media-breakpoint-down(xxl) {
        .category-item {
            height: 70px;
        }
    }
    @include media-breakpoint-down(xl) {
        margin-bottom: 50px;
        .category-item {
            font-size: 14px;

            height: 54px;
        }
    }
    @include media-breakpoint-down(lg) {
        .category-item {
            font-size: 13px;
        }
    }
}
.lesson-list {
    .list-item {
        @include space-between(80px, "y");
    }
    .item-thumb {
        @include image-placeholder(512px, 314px);
        flex: 0 0 auto;

        margin-right: 45px;

        border-radius: 10px;
    }
    .level-icon {
        font-size: 13px;
        font-weight: 700;
        line-height: em(20px, 13px);

        position: absolute;
        top: em(25px, 13px);
        left: em(25px, 13px);

        padding: em(8px, 13px) em(24px, 13px);

        color: #4f4f4f;
        border-radius: em(18px, 13px);
        background-color: #fff;
    }
    .item-title {
        @include ellipse(2, em(78px, 26px));
        font-size: 26px;
        font-weight: 700;
        line-height: em(39px, 26px);

        margin-bottom: 26px;

        color: #333;
    }
    .item-desc {
        font-size: 13px;
        line-height: 200%;

        max-width: 600px;
        margin-bottom: 18px;

        color: #777;
    }
    .item-tag {
        margin-bottom: 37px;
    }
    .btn {
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

            opacity: 0;
            background: linear-gradient(
                82.16deg,
                #ff5656 35.79%,
                #ff7356 76.16%,
                #ffab6d 100%
            );
        }
        &:hover {
            &::after {
                opacity: 1;
            }
        }
        & > * {
            position: relative;
            z-index: 10;
        }
        :global(.ic) {
            margin-left: 10px;
        }
    }
    @include media-breakpoint-down(xl) {
        .item-thumb {
            width: 390px;
            max-width: 100%;
            margin-right: 30px;
        }
        .item-title {
            @include ellipse(1);
            font-size: 20px;

            display: block;

            margin-bottom: 10px;
        }
        .item-desc {
            @include ellipse(2, 2em);
            font-size: 12px;
        }
        .item-tag {
            margin-bottom: 20px;

            transform: scale(0.9);
            transform-origin: left;
            .tag-item {
                font-size: 12px;
            }
        }
        .level-icon {
            font-size: 12px;

            transform: scale(0.9);
            transform-origin: left top;
        }
        .btn {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(lg) {
        .item-thumb {
            margin: 0;
        }
        .list-item {
            @include space-between(50px, y);
            display: grid;

            gap: 20px;
            grid-template-columns: 330px 1fr;
        }
        .item-title {
            font-size: 18px;

            margin-bottom: 5px;
        }
        .item-desc {
            margin-bottom: 8px;
        }
        .item-tag {
            margin-bottom: 10px;
        }
    }
    @include media-breakpoint-down(md) {
        .item-thumb {
            width: 100%;
            margin-bottom: 20px;
        }
        .item-title {
            margin-bottom: 10px;
        }
        .item-desc {
            font-size: 13px;

            margin-bottom: 14px;
        }
        .list-item {
            display: block;
        }
        .item-tag {
            margin-bottom: 20px;
        }
        .btn {
            width: 100%;

            text-align: center;
        }
    }
}
:global(.lang-en) {
    .course-category {
        .category-item {
            font-size: 15px;
        }
        @include media-breakpoint-down(xl) {
            .category-item {
                font-size: 13px;
            }
        }
        @include media-breakpoint-down(lg) {
            .category-item {
                padding: 0 30px;
            }
        }
        @include media-breakpoint-down(md) {
            border-radius: 10px;
            .category-item {
                font-size: 12px;

                height: 74px;
            }
            .category-shadow {
                border-radius: 10px;
            }
        }
        @include media-breakpoint-down(sm) {
            border-radius: 10px;
            .category-shadow {
                border-radius: 10px;
            }
            .category-item {
                font-size: 10px;

                height: 54px;
                padding: 0 10px;
            }
        }
    }
    .lesson-list {
        .item-title {
            font-size: 24px;

            margin-bottom: 16px;
        }
        .item-tag {
            margin-bottom: 26px;
        }
        .btn {
            font-size: 15px;
        }
        @include media-breakpoint-down(xl) {
            .item-title {
                font-size: 20px;

                margin-bottom: 10px;
            }
            .btn {
                font-size: 14px;
            }
        }
        @include media-breakpoint-down(lg) {
            .item-title {
                font-size: 18px;

                margin-bottom: 10px;
            }
            .item-tag {
                margin-bottom: 14px;
            }
            .btn {
                font-size: 12px;
            }
        }
        @include media-breakpoint-down(md) {
            .item-tag {
                margin-bottom: 24px;
            }
            .item-title {
                @include ellipse(2, em(78px, 26px));
            }
        }
    }
}
</style>
