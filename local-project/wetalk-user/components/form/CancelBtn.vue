<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-20 19:46:59
-->
<template>
    <button :class="$style['cancel-btn']" @click="submit">
        {{ prop.text }}
    </button>
</template>
<script lang="ts" setup>
const emit = defineEmits<{ (e: "submit"): void }>();
const prop = withDefaults(defineProps<{ text: string }>(), { text: "" });
function submit() {
    emit("submit");
}
</script>
<style lang="scss" module>
.cancel-btn {
    font-size: 16px;
    font-weight: 700;
    font-weight: normal;
    line-height: em(24px, 16px);

    width: 100%;
    padding: 12px 20px;

    text-align: center;

    color: #2d2b32;
    border-radius: 6px;
    background: #f5f6f9;
}
</style>
