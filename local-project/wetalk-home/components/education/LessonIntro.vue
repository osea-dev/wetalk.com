<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-28 14:57:24
-->
<template>
    <div :class="$style['lesson-intro']" v-html="content"></div>
</template>
<script lang="ts" setup>
defineProps<{
    content: string;
}>();
</script>
<style lang="scss" module>
.lesson-intro {
    font-size: 16px;
    font-weight: 300;

    color: #777;
    p {
        margin-bottom: em(8px, 16px);
    }
    img {
        width: 100%;
    }
    @include media-breakpoint-down(xxl) {
        font-size: 14px;
    }
}
</style>
