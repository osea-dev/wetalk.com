<template>
    <div
        :class="$style['education-list']"
        class="grid grid-cols-3 wow-group-3 lg:grid-cols-2 md:grid-cols-1"
    >
        <Link
            :to="link.education + '/' + item.courseid"
            target="_blank"
            :class="$style['education-item']"
            class="wow animate__fadeInUp-100 md:grid md:grid-cols-2 sm:grid-cols-1"
            v-for="item in prop.lessonList"
            :key="item.courseid"
        >
            <div :class="$style['item-thumb']">
                <img :src="item.img" alt="" />
            </div>
            <div :class="$style['item-info']">
                <div
                    :class="$style['item-head']"
                    class="flex justify-between items-start xxl:flex-col-reverse"
                >
                    <div :class="$style['item-title']">
                        <span class="text">{{ item.title }}</span>
                        <i class="ic iconfont icon-link-arrow"></i>
                    </div>
                </div>
                <div :class="$style['item-desc']">
                    {{ item.message }}
                </div>
                <div
                    :class="$style['item-footer']"
                    class="flex justify-between items-center"
                >
                    <div :class="$style['item-price']">
                        <span class="unit text">{{ item.ico }}</span>
                        <span class="price text">
                            {{ item.minPrice }}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    </div>
</template>
<script lang="ts" setup>
import link from "~/assets/script/local-data/link-manage";

import type { TYPE_COURSE } from "@/assets/script/api/api";

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
.education-list {
    gap: 33px;
    @include media-breakpoint-down(xxxl) {
        gap: 1.73410404624277vw;
    }
}
.education-item {
    overflow: hidden;

    padding-bottom: 14px;

    transition: 0.36s ease;

    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgb(56 49 71 / 0);
    &:hover {
        box-shadow: 0 20px 80px 0 rgb(56 49 71 / 0.15);
        .item-title {
            :global(.ic) {
                opacity: 1;
            }
        }
    }
    .item-thumb {
        @include image-placeholder(490px, 300px);
        overflow: hidden;

        width: 100%;
    }
    .item-info {
        font-size: 13px;

        padding: 35px 30px 0;

        color: #777;
    }
    .item-head {
        font-size: 22px;

        margin-bottom: 1em;
    }
    .item-title {
        @include ellipse();
        position: relative;

        padding-right: em(59px, 22px);

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
    .item-tag {
        font-size: 13px;
        line-height: 36px;

        display: inline-block;
        flex: 0 0 auto;

        padding: 0 20px;

        border-radius: 18px;
        &[data-type="直播课"] {
            color: #177b42;
            background-color: #cbf2dc;
        }
        &[data-type="录播课"] {
            color: #d69a09;
            background-color: #fceecc;
        }
        &[data-type="中心课"] {
            color: #fe2f83;
            background-color: #ffe4ef;
        }
        :global(.ic) {
            margin-right: 5px;
        }
    }
    .item-desc {
        @include ellipse(2, 1.6em, 1);
        line-height: 1.6em;

        margin-bottom: em(27px, 13px);
        & > * {
            margin-bottom: em(11px, 13px);
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    /* #region 底部价格信息 */
    .divide-line {
        width: 1px;
        height: 10px;
        margin: 0 em(11px, 13px);

        background-color: #d9d9d9;
    }
    .item-footer {
        font-size: 13px;

        height: em(82px, 13px);

        border-top: 1px solid #e9e8ed;
    }
    .item-msg {
        color: #777;
        :global(.num) {
            font-family: "Poppins";
            font-size: em(16px, 13px);
            font-weight: 700;

            display: inline-block;

            transform: translateY(2px);
        }
    }
    .item-price {
        font-family: "Inter";
        font-size: em(30px, 13px);
        font-weight: bold;

        vertical-align: baseline;

        color: #f53f2d;
        :global(.unit) {
            font-size: em(16px, 30px);
        }
    }
    /* #endregion */
    @include media-breakpoint-down(xxl) {
        .item-title {
            font-size: 20px;

            max-width: 100%;
        }
        .item-tag {
            // font-size: 12px;
            line-height: 29px;
        }
        .item-desc,
        .item-footer {
            // font-size: 12px;
        }
    }
    @include media-breakpoint-down(xl) {
        .item-info {
            padding: 25px 20px 0;
        }
        .item-head {
            margin-bottom: 12px;
        }
        .item-title {
            font-size: 17px;
        }
        .item-desc {
            font-size: 12px;

            margin-bottom: 1.6em;
        }
        .item-footer {
            height: 50px;
        }
        .item-price {
            font-size: em(24px, 13px);
        }
    }
    @include media-breakpoint-down(md) {
        @include space-between(12px, "y");
        padding-bottom: 0;
        .item-info {
            padding-bottom: 10px;
        }
    }
}
[data-is-mobile="1"] .education-item {
    box-shadow: 0 20px 80px 0 rgb(56 49 71 / 0.15);
    .item-title {
        :global(.ic) {
            opacity: 1;
        }
    }
}
:global(.lang-en) {
    .education-item {
        .item-title {
            font-weight: bold;
        }
    }
}
</style>
