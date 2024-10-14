<template>
    <div :class="$style['pay-method-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">{{ $t("KEY_ORDER.METHOD") }}</h2>
        </div>
        <div :class="$style['panel-body']">
            <div :class="$style['method-list']">
                <div
                    class="flex items-center justify-between"
                    v-for="(item, index) in payTypes"
                    :class="$style['list-item']"
                    :data-active="selectPayId === item.paytypeid"
                    :key="index"
                    @click="changeMethod(item.paytypeid)"
                >
                    <div :class="$style['method-icon']">
                        <img class="ic" :src="item.ico" />
                        <span class="text">{{ item.payName }}</span>
                    </div>
                    <div :class="$style['select']"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_PAY_TYPE } from "@/assets/script/api/api";

defineProps<{
    selectPayId: number;
    payTypes: TYPE_PAY_TYPE[];
}>();

const emit = defineEmits<{ (e: "change", type: number): void }>();
function changeMethod(type: number) {
    emit("change", type);
}
</script>
<style lang="scss" module>
.pay-method-panel {
    font-size: 22px;

    margin-bottom: 15px;
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    &:last-child {
        margin-bottom: 0;
    }
    .panel-title {
        font-weight: 700;
        line-height: em(32px, 22px);

        color: #2d2b32;
    }
    .panel-body {
        margin-top: c-space(4);
    }
    .list-item {
        padding: 20px 0;

        cursor: pointer;

        border-bottom: 1px solid #e6e8ec;
        &:last-child {
            border-bottom-width: 0;
        }
        &[data-active] .select {
            box-shadow: inset 0 0 0 2px #2a85ff;
            &::after {
                background-color: #2a85ff;
            }
        }
    }
    .method-icon {
        font-size: 16px;
        line-height: em(24px, 16px);

        display: flex;

        align-items: center;
        :global(.ic) {
            line-height: 1;

            display: inline-block;

            height: em(28px, 16px);
            margin-right: 8px;
            margin-bottom: -2px;
        }
    }
    .select {
        @include circle(18px);
        display: flex;

        transform: 0.26s ease;

        box-shadow: inset 0 0 0 2px rgb(111 118 126 / 0.3);

        align-items: center;
        justify-content: center;
        &::after {
            @include circle(8px);
            display: inline-block;

            content: "";
            transform: 0.26s ease;

            background-color: #fff;
        }
    }
    @include media-breakpoint-down(sm) {
        padding: $panel-padding-2;
    }
    @include media-breakpoint-down(sm) {
        font-size: 18px;
        .panel-body {
            margin-top: 10px;
        }
        .method-icon {
            font-size: 14px;
        }
    }
}
</style>
