<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-03-27 16:16:25
-->
<template>
    <div :class="$style['outline-panel']" class="grid grid-cols-2 gap-5">
        <div v-for="(lesson, index) in outline" :key="index">
            <div :class="$style['outline-header']" class="flex items-center">
                <span class="text">Term 1</span>
            </div>
            <div :class="$style['outline-body']">
                <div
                    v-for="(item, index) in lesson.list"
                    :key="item.id"
                    :class="$style['outline-item']"
                    class="flex justify-between items-center"
                >
                    <div class="state-pos--left flex">
                        <span class="text title-prefix">
                            {{ $t("第n课", [NumberToChinese(index + 1)]) }}
                        </span>
                        <span class="text title">
                            {{ item.title }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(lesson, index) in outline" :key="index">
            <div :class="$style['outline-header']" class="flex items-center">
                <span class="text">Term 2</span>
            </div>
            <div :class="$style['outline-body']">
                <div
                    v-for="(item, index) in lesson.list"
                    :key="item.id"
                    :class="$style['outline-item']"
                    class="flex justify-between items-center"
                >
                    <div class="state-pos--left flex">
                        <span class="text title-prefix">
                            {{ $t("第n课", [NumberToChinese(index + 1)]) }}
                        </span>
                        <span class="text title">
                            {{ item.title }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { NumberToChinese } from "@/assets/script/util/number-to-chinese";
defineProps<{
    outline: any[];
}>();
</script>
<style lang="scss" module>
/* stylelint-disable selector-max-compound-selectors */
/* stylelint-disable max-nesting-depth */
.outline-panel {
    padding: 30px;

    border-radius: 20px;
    background: #effcf5;
    .outline-header {
        font-size: 20px;
        font-weight: 700;
        line-height: em(30px, 20px);

        padding: 15px 37px;

        color: #2d2b32;
        border-radius: 6px;
        background: #fff;
    }
    .outline-item {
        font-size: 14px;

        height: em(54px, 14px);
        padding: 0 em(37px, 14px);

        transition: 0.26s ease;

        border-bottom: 1px solid #d8ece1;
        border-radius: 4px;
        &:last-child {
            border-bottom: 0;
        }
        :global {
            .title-prefix {
                margin-right: em(30px, 14px);

                color: #777;
            }
            .tag {
                margin-left: 9px;

                transition: 0.26s ease;

                color: #777;
                .ic {
                    margin-right: 6px;

                    color: #0aca91;
                }
            }
            .time {
                transition: 0.26s ease;

                color: #777;
                .ic {
                    margin-right: 8px;

                    transition: 0.26s ease;
                    vertical-align: middle;
                }
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .outline-header {
            font-size: 18px;
        }
        .outline-item {
            font-size: 13px;
        }
    }
}
</style>
