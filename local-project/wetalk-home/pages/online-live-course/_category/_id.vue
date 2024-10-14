<!--
 * @Description: 众语集详情页 VUE 容器
 * @Author: F-Stone
 * @LastEditTime: 2023-03-21 15:09:24
-->
<template>
    <div class="w-body w-module" :class="$style['online-live-course-body']">
        <OnlineLiveCoursePoster />
        <MessageBoard />
    </div>
</template>
<script lang="ts" setup>
import OnlineLiveCoursePoster from "@/components/online-live-course/OnlineLiveCoursePoster.vue";
import MessageBoard from "@/components/MessageBoard.vue";

//
</script>
<script lang="ts">
export default {
    name: "OnlineLiveDetail",
};
</script>
<style lang="scss" module>
.online-live-course-body {
    padding-top: var(--nav-h);
}
</style>
<style>
/* stylelint-disable-next-line selector-max-id */
#page_body_editor-wrapper .layout_group[data-window_width="true"],
#page_body_editor-wrapper
    .layout_group[data-limit_width="true"]
    > .layout_limit_wrapper {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
}
</style>
