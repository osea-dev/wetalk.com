<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 12:00:58
-->
<template>
    <div :class="$style['message-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">{{ title }}</h2>
        </div>
        <div :class="$style['panel-body']" v-html="content"></div>
        <div :class="$style['panel-foot']">
            <button @click="close">{{ $t("KEY_CANCEL_COURSE.TIP.3") }}</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{ title: string; content: string }>();

const emit = defineEmits<{ (e: "close"): void }>();
function close() {
    emit("close");
}
</script>
<style lang="scss" module>
.message-panel {
    padding: $dialog-panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    .panel-head {
        margin-bottom: var(--y-space-normal);
    }
    .panel-title {
        @include dialog-head;
        text-align: left;
    }
    .panel-body {
        font-size: 14px;
        line-height: 200%;

        width: 400px;
        max-width: 100%;

        color: #777;
    }
    .panel-foot {
        margin-top: var(--y-space-normal);
        button {
            font-size: 16px;
            line-height: em(24px, 16px);

            width: 100%;
            padding: 12px;

            color: #fff;
            border-radius: 6px;
            background: #f8af00;
        }
    }
}
</style>
