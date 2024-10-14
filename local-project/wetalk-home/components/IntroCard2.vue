<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-03 17:38:11
-->
<template>
    <div :class="$style['intro-card-2']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <ModuleHeader
                    :title="$t(title)"
                    :subtitle="$t(subtitle)"
                    :class="$style['module-header']"
                />
                <div :class="$style['module-body']">
                    <div
                        :class="$style['card-list']"
                        class="grid grid-cols-3 gap-5 wow-group-3 lg:grid-cols-1"
                    >
                        <div
                            :class="$style['card-item']"
                            class="wow animate__fadeInRight-10_percent flex flex-col"
                            v-for="(item, index) in list"
                            :key="index"
                        >
                            <div :class="$style['item-info']" class="flex-auto">
                                <div :class="$style['item-title']">
                                    <span class="text">{{
                                        $t(item.title)
                                    }}</span>
                                </div>
                                <div :class="$style['item-desc']">
                                    <span class="text">{{
                                        $t(item.desc)
                                    }}</span>
                                </div>
                            </div>
                            <!-- <button
                                :class="$style['item-btn']"
                                class="flex items-center justify-between"
                            >
                                <span class="text">
                                    {{ $t(item.btn.title) }}
                                </span>
                                <i
                                    class="ic iconfont icon-long-arrow--right"
                                ></i>
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    title: string;
    subtitle: string;
    list: {
        title: string;
        desc: string;
        btn: {
            title: string;
            link: string;
        };
    }[];
}>();
</script>
<style lang="scss" module>
.intro-card-2 {
    .module-body {
        margin-top: 60px;
    }
    .card-item {
        overflow: hidden;

        border-radius: 10px;
        background-color: #fff;
        box-shadow: 8.90951px 8.90951px 44.5476px 2.67285px rgb(39 92 141 / 0.1);
        &:hover {
            .item-btn {
                color: #fff;
                background: #0aca91;
            }
        }
    }
    .item-info {
        padding: 60px 55px;

        border-bottom: 1px solid #e8edf3;
    }
    .module-header {
        padding-top: em(30px, 22px);
    }
    .item-title {
        font-size: 22px;
        font-weight: 700;
        font-style: normal;
        line-height: em(30px, 22px);

        margin-bottom: em(22px, 22px);

        color: #23242a;
    }
    .item-desc {
        font-size: 14px;
        font-weight: 500;
        line-height: em(30px, 14px);
    }
    .item-btn {
        font-size: 14px;
        font-weight: 500;
        line-height: em(21px, 14px);

        width: 100%;
        height: 60px;
        padding: 0 50px;

        transition: 0.26s ease;

        // background: #0aca91;
        color: #bdbdbd;
    }
    @include media-breakpoint-down(xxxl) {
        .item-info {
            padding: 50px 45px;
        }
        .item-title {
            font-size: 21px;
        }
        .item-btn {
            padding: 0 45px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .item-title {
            @include ellipse(2, em(30px, 22px), 1);
            font-size: 20px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-body {
            margin-top: 50px;
        }
        .item-title {
            font-size: 18px;
        }
        .item-info {
            padding: 35px 30px;
        }
        .item-desc {
            font-size: 13px;
        }
        .item-btn {
            font-size: 13px;

            height: 54px;
            padding: 0 30px;
        }
    }
    @include media-breakpoint-down(lg) {
        .item-title {
            height: em(30px, 22px);
        }
    }
    @include media-breakpoint-down(sm) {
        .module-body {
            margin-top: 40px;
        }
    }
}
:global(.lang-en) {
    .intro-card-2 {
        .item-title {
            display: block;

            min-height: em(90px, 22px);

            white-space: initial;
            text-overflow: initial;
        }
    }
    @include media-breakpoint-down(lg) {
        .intro-card-2 {
            .item-title {
                min-height: em(60px, 22px);
            }
        }
    }
}
</style>
