<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-29 14:38:07
-->
<template>
    <div :class="$style['form-row']" :data-error="!!errorMsg" :data-dir="dir">
        <div :class="$style['row-head']" v-if="title || subtitle">
            <div :class="$style['row-title']" v-if="title">
                {{ title }}
            </div>
            <div :class="$style['row-subtitle']" v-if="subtitle">
                {{ subtitle }}
            </div>
        </div>
        <div :class="$style['row-inner']">
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
    font-size: 16px;

    margin-bottom: em(20px, 16px);
    &[data-dir="row"] {
        display: flex;
        .row-head {
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
        margin-bottom: 9px;
    }
    .row-title {
        font-size: 12px;
        font-weight: 300;
    }
    .row-subtitle {
        font-size: 12px;
        font-weight: 300;
    }
}
</style>
