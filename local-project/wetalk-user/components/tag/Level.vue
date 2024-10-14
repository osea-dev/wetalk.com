<!--
 * @Description: 等级标签
 * @Author: F-Stone
 * @LastEditTime: 2022-11-18 22:18:22
-->
<template>
    <div :class="$style['tag-level']">
        <slot />
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" module>
.tag-level {
    font-family: "Inter";
    font-size: 13px;
    font-weight: 700;
    line-height: em(16px, 13px);

    padding: 8px 20px;

    color: #f8af00;
    border-radius: 16px;
    background: rgb(248 175 0 / 0.2);
}
</style>
