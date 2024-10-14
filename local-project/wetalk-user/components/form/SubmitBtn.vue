<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-12-02 13:24:42
-->
<template>
    <button :class="$style['submit-btn']" @click="submit">
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
.submit-btn {
    font-size: 16px;
    font-weight: 700;
    font-weight: normal;
    line-height: em(24px, 16px);

    width: 100%;
    padding: 12px 20px;

    text-align: center;

    color: #fff;
    border-radius: 6px;
    background: #3b71fe;
}
</style>
