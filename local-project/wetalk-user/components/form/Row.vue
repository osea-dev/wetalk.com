<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-22 16:21:34
-->
<template>
    <div :class="$style['form-row']" :data-error="!!errorMsg" :data-dir="dir">
        <div
            class="row-head"
            :class="$style['row-head']"
            v-if="title || subtitle"
        >
            <div :class="$style['row-title']" v-if="title">
                {{ title }}
            </div>
            <div :class="$style['row-subtitle']" v-if="subtitle">
                {{ subtitle }}
            </div>
        </div>
        <div class="row-inner" :class="$style['row-inner']">
            <div :class="$style['group']">
                <slot />
            </div>
            <div :class="$style['error-tip']" v-if="errorMsg">
                <span class="text">{{ errorMsg }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { toRef } from "vue";

const prop = withDefaults(
    defineProps<{
        errorMsg?: string;
        title?: string;
        subtitle?: string;
        dir?: "row" | "col";
    }>(),
    {
        errorMsg: "",
        dir: "col",
    }
);
const errorMsg = toRef(prop, "errorMsg");
</script>
<style lang="scss" module>
.form-row {
    // margin-bottom: 50px;
    margin-bottom: 15px;
    &[data-dir="row"] {
        display: flex;
        .row-head {
            flex: 0 0 auto;

            width: 90px;
            margin: 0;
            margin-right: 10px;
            padding-top: 11px;
        }
        .row-inner {
            flex: 1 1 auto;
        }
    }
    &[data-error] {
        margin-bottom: 3px;
    }
    &:last-child {
        margin-bottom: 0;
    }
    .error-tip {
        line-height: 32px;

        color: #d93237;
    }
    .group {
        & > * {
            @include space-between(10px, "y");
        }
    }
    .row-head {
        margin-bottom: 13px;
    }
    .row-title {
        font-size: 16px;
        line-height: em(24px, 16px);

        color: #2d2b32;
    }
    .row-subtitle {
        font-size: 13px;
        line-height: em(24px, 13px);

        color: #777;
    }
}
</style>
