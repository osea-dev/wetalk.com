<!--
 * @Description: 众语集详情页 VUE 容器
 * @Author: F-Stone
 * @LastEditTime: 2022-11-28 16:57:51
-->
<template>
    <div class="w-body w-module" :class="$style['education-lesson-body']">
        <CoursePoster />
        <MessageBoard />
    </div>
</template>
<script lang="ts" setup>
import CoursePoster from "~/components/education/CoursePoster.vue";
import MessageBoard from "@/components/MessageBoard.vue";

//
</script>
<script lang="ts">
export default {
    name: "EductionDetail",
};
</script>
<style lang="scss" module>
.education-lesson-body {
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
