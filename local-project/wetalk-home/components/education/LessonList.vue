<template>
    <div
        :class="$style['education-list']"
        class="lg:grid lg:grid-cols-2 lg:gap-5 md:block"
    >
        <div
            v-for="item in prop.lessonList"
            :key="item.courseid"
            :class="$style['education-item']"
            class="flex wow animate__fadeInUp-100 lg:block"
        >
            <div :class="$style['item-thumb']" class="flex-grow-0">
                <div :class="$style['inner']">
                    <nuxt-img :src="item.img" alt="" />
                </div>
            </div>
            <div
                :class="$style['item-info']"
                class="flex-auto min-h-full flex items-center lg:min-h-0 lg:items-start"
            >
                <div :class="$style['inner']" class="w-full">
                    <div
                        :class="$style['item-head']"
                        class="flex justify-between items-start xxl:flex-col-reverse"
                    >
                        <div :class="$style['item-title']">
                            <span class="text">{{ item.title }}</span>
                        </div>
                    </div>
                    <div :class="$style['item-desc']">
                        <p>
                            {{ item.message }}
                        </p>
                    </div>
                    <div :class="$style['item-tags']">
                        <div
                            :class="$style['tag-group']"
                            class="flex flex-wrap"
                        >
                            <div
                                v-for="(tag, index) in item.keys"
                                :key="index"
                                :class="$style['tag']"
                                data-theme="gray"
                            >
                                <span class="text">{{ tag }}</span>
                            </div>
                        </div>
                        <div
                            :class="$style['tag-group']"
                            class="flex flex-wrap"
                        >
                            <TagSku
                                v-for="(tag, index) in item.skuTypes"
                                :key="index"
                                :class="$style['sku-tag']"
                                :data="tag"
                            />
                        </div>
                    </div>
                    <div
                        :class="$style['item-footer']"
                        class="flex justify-between items-center"
                    >
                        <Link
                            :to="link.education + '/' + item.courseid"
                            target="_blank"
                            :class="$style['btn']"
                        >
                            <span class="text">{{ $t("了解课程") }}</span>
                            <i class="ic iconfont icon-link-arrow"></i>
                        </Link>
                        <div :class="$style['item-price']">
                            <span class="unit text">{{ item.ico }}</span>
                            <span class="price text">
                                {{ item.minPrice }}
                            </span>
                            <span class="text"> {{ $t("起") }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import link from "~/assets/script/local-data/link-manage";
import type { TYPE_COURSE } from "@/assets/script/api/api.course";

const prop = withDefaults(
    defineProps<{
        lessonList: TYPE_COURSE[];
    }>(),
    {
        lessonList: () => [],
    }
);
</script>
<script lang="ts">
export default {
    name: "LessonList",
};
</script>
<style lang="scss" module>
.education-item {
    @include space-between(120px, y);

    transition: 0.36s ease;

    background-color: #fff;
    .item-thumb {
        flex: 0 0 auto;

        width: min(600px, 50%);
        margin-right: 51px;
        .inner {
            @include image-placeholder(490px, 300px);
            overflow: hidden;

            width: 100%;

            border-radius: var(--r-normal);
        }
    }
    .item-head {
        font-size: 22px;

        margin-bottom: em(28px, 22px);
        .item-title {
            @include ellipse();
            font-size: em(32px, 22px);
            font-weight: 700;
            line-height: em(48px, 32px);

            position: relative;

            flex: 0 0 auto;

            width: 100%;

            color: #333;
            :global(.ic) {
                font-size: em(18px, 22px);
                font-weight: initial;

                position: absolute;
                top: 0.39em;
                right: em(22px, 18px);

                display: inline-block;

                margin-left: em(11px, 18px);

                transition: 0.26s ease;

                opacity: 0;
            }
        }
    }
    .item-desc {
        @include ellipse(2, 2em, 1);
        font-size: 15px;
        line-height: 200%;

        max-width: 750px;
        margin-bottom: em(23px, 15px);

        color: #777;
    }
    .item-footer {
        font-size: 13px;

        height: auto;
        margin-top: em(30px, 13px);
    }
    .item-tags {
        font-size: 13px;

        display: grid;

        gap: em(10px, 13px);
    }
    .tag-group {
        font-size: inherit;

        margin-right: em(-10px, 13px);
        margin-bottom: em(-10px, 13px);
        .tag {
            line-height: em(20px, 13px);

            padding: em(8px, 13px) em(20px, 13px);

            color: #777;
            border: 1px solid #e0e9f5;
            border-radius: em(18px, 13px);
            &[data-theme="gray"] {
                color: #777;
                border-color: #e0e9f5;
                background: #f5f8fc;
            }
            &[data-theme="yellow"] {
                color: #f29100;
                border-color: #f5d587;
                background: #fceecc;
            }
            &[data-theme="green"] {
                color: #0aca91;
                border-color: #7de2a6;
                background: #e1faeb;
            }
        }
        .tag,
        .sku-tag {
            font-size: inherit;

            margin-right: em(10px, 13px);
            margin-bottom: em(10px, 13px);
        }
    }
    .item-price {
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
            font-weight: normal;

            margin-left: em(10px, 18px);
        }
    }
    /* #endregion */
    @include media-breakpoint-down(xxxl) {
        .item-thumb {
            margin-right: 50px;
        }
    }
    @include media-breakpoint-down(xxl) {
        @include space-between(90px, y);
        .item-head {
            font-size: 18px;

            margin-bottom: em(12px, 22px);
        }
        .item-thumb {
            width: min(470px, 46%);
            margin-right: 40px;
        }
        .item-footer {
            margin-top: 16px;
            padding-bottom: 4px;
        }
        .item-desc {
            font-size: 14px;

            margin-bottom: 10px;
        }
        .item-tags {
            font-size: 12px;
        }
        .btn {
            font-size: 14px;
        }
        .item-price {
            font-size: 15px;
        }
    }
    @include media-breakpoint-down(xl) {
        @include space-between(80px, y);
        .item-head {
            font-size: 14px;
        }
        .item-desc {
            font-size: 12px;

            margin-bottom: 12px;
        }
        .item-thumb {
            width: min(470px, 47%);
            margin-right: 20px;
        }
        .item-tags {
            margin-top: -10px;

            transform: scale(0.8);
            transform-origin: left bottom;
        }
        .tag-group {
            max-width: 100%;
            .sku-tag,
            .tag {
                padding-top: 7px;
                padding-bottom: 7px;

                white-space: nowrap;
            }
        }
        .item-price {
            font-size: 14px;
        }
        .item-info {
            min-width: 0;
        }
        .item-footer {
            .btn {
                font-size: 12px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 30px;
        .item-thumb {
            width: 100%;
            margin-bottom: 30px;
        }
        .item-info {
            max-height: initial;
            padding: 0 6px;
        }
        .item-desc {
            margin-bottom: 10px;
        }
        .item-tags {
            width: 125%;
            margin-bottom: 30px;
        }
    }
    @include media-breakpoint-only(md) {
        display: flex;
        flex-direction: column;
        .item-info {
            position: relative;

            flex: 1 1 auto;

            padding-bottom: 70px;
        }
        .item-tags {
            margin-bottom: 0;
        }
        .item-footer {
            position: absolute;
            bottom: 0;
            left: 0;

            width: 100%;
            margin-top: 0;
        }
    }
    @include media-breakpoint-down(md) {
        @include space-between(80px, y);
        .item-info {
            padding: 0 20px;
        }
        .item-tags {
            width: 100%;
            margin-top: 20px;

            transform: scale(1);
        }
        .item-footer {
            .item-price {
                font-size: 16px;
            }
            .btn {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        @include space-between(50px, y);
        .item-thumb {
            margin-bottom: 20px;
        }
        .item-tags {
            font-size: 10px;
        }
        .item-info {
            padding: 0 10px;
        }
        .item-desc {
            font-size: 13px;
        }
    }
}
:global(.lang-en) {
    .education-item {
        @include media-breakpoint-down(xxxl) {
            .item-thumb {
                width: min(600px, 46%);
            }
            .item-head {
                margin-bottom: em(14px, 22px);
                .item-title {
                    font-size: em(28px, 22px);
                }
            }
            .item-desc {
                font-size: 14px;
            }
            .item-tags {
                font-size: 12px;
            }
            .btn {
                font-size: 15px;
            }
            .item-footer {
                font-size: 12px;
            }
            .item-price {
                font-size: 15px;
            }
        }
        @include media-breakpoint-down(xxl) {
            .item-desc {
                font-size: 13px;
            }
            .btn,
            .item-price {
                font-size: 13px;
            }
        }
        @include media-breakpoint-down(xl) {
            .item-desc {
                font-size: 12px;
            }
            .item-tags {
                margin-top: 0;

                transform: scale(1);
            }
            .btn,
            .item-price {
                font-size: 13px;
            }
        }
        @include media-breakpoint-down(lg) {
            .btn,
            .item-price {
                font-size: 12px;
            }
            .item-thumb {
                width: 100%;
                margin-right: 0;
            }
            .item-info {
                min-width: 1px;
                .inner {
                    width: 100%;
                }
            }
            .tag-group {
                min-width: 1px;
                .tag {
                    max-width: 100%;

                    white-space: initial;
                }
            }
            .item-tags {
                font-size: 10px;

                width: 100%;
            }
        }
        @include media-breakpoint-down(lg) {
            .item-tags {
                font-size: 9px;
            }
        }
    }
}
</style>
