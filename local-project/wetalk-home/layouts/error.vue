<!--
 * @Description: 错误页面
 * @Author: F-Stone
 * @LastEditTime: 2022-12-30 18:29:09
-->
<template lang="html">
    <div :class="$style['error-page']">
        <div class="wrapper--limit-width">
            <div
                :class="$style['page-body']"
                class="flex items-center justify-center"
            >
                <div :class="$style['box--error-tip']">
                    <img
                        v-if="error.statusCode === 404"
                        src="@/assets/images/error/404.png"
                        alt=""
                    />
                    <img
                        v-if="error.statusCode === 500"
                        src="@/assets/images/error/500.png"
                        alt=""
                    />
                    <img
                        v-if="error.statusCode === 503"
                        src="@/assets/images/error/503.png"
                        alt=""
                    />
                    <Link
                        :to="linkManage.index"
                        :class="$style['btn--to_index']"
                        class="inline-flex justify-center items-center"
                    >
                        <span class="text">{{ $t("返回主页") }}</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import linkManage from "@/assets/script/local-data/link-manage";
withDefaults(
    defineProps<{
        error: {
            statusCode: number;
        };
    }>(),
    {
        error: () => ({
            statusCode: 404,
        }),
    }
);
</script>
<script lang="ts">
export default {
    name: "ErrorPage",
    layout: "error-page",
};
</script>
<style lang="scss" module>
.page-body {
    height: w-h(100);
}
.box--error-tip {
    text-align: center;
    img {
        width: 935px;
        max-width: 100%;
    }
}
.btn--to_index {
    font-size: 16px;
    font-weight: 500;
    line-height: em(20px, 16px);

    display: inline-block;

    padding: em(16px, 16px) em(30px, 16px);

    cursor: pointer;
    transition: 0.26s ease;

    color: #fff;
    border-radius: em(6px, 16px);
    background: #0aca91;
    &:hover {
        color: #fff;
        background: lighten($color: #0aca91, $amount: 2);
    }
    @include media-breakpoint-down(sm) {
        font-size: 14px;
    }
}
</style>
