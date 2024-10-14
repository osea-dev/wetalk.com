<!--
 * @Description: page 的默认布局结构
 * @Author: F-Stone
 * @LastEditTime: 2022-12-30 11:24:20
-->
<template>
    <div
        class="w-page"
        :class="[$style['w-page'], device + '-ui', 'lang-' + lang]"
        data-page-type="IndexPage"
    >
        <SiteNav />
        <SiteNavMini />
        <Nuxt :class="$style['w-b']" />
        <LangSwitch />
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSiteStore } from "@/store/site";

import "@/assets/style/index-page/index.scss";
import SiteNav from "@/components/SiteNav.vue";
import { onBeforeMount, onBeforeUnmount } from "vue";

const { device, lang } = storeToRefs(useSiteStore());

onBeforeMount(() => {
    $("body").attr("data-index", 1);
});
onBeforeUnmount(() => {
    $("body").attr("data-index", 0);
});
</script>
<script lang="ts">
export default {
    name: "IndexLayout",
    middleware: ["device", "base-info", "enter-page"],
};
</script>
<style lang="scss" module>
//
</style>
