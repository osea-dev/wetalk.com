<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-20 15:38:41
-->
<template>
    <div :class="$style['tag-group']" class="flex" v-if="tags.length">
        <div
            :class="$style['tag']"
            v-for="(tag, index) in tags"
            :key="index"
            :data-theme="theme || 'gray'"
        >
            {{ tag }}
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    tags: string[];
    theme?: string;
}>();
</script>
<style lang="scss" module>
.tag-group {
    @include space-between(em(16px, 13px), y);
    font-size: 13px;
}
.tag {
    @include space-between(10px);
    line-height: em(20px, 13px);

    padding: em(8px, 13px) em(20px, 13px);

    color: #777;
    border: 1px solid #e0e9f5;
    border-radius: em(18px, 13px);
    &[data-theme="gray"] {
        color: #777;
        border-color: #e0e9f5;
        background: #f5f8fc;
    }
    &[data-theme="yellow"] {
        color: #f29100;
        border-color: #f5d587;
        background: #fceecc;
    }
    &[data-theme="green"] {
        color: #0aca91;
        border-color: #7de2a6;
        background: #e1faeb;
    }
}
</style>
