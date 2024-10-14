<!--
 * @Description: page 的默认布局结构
 * @Author: F-Stone
 * @LastEditTime: 2022-12-30 11:24:35
-->
<template>
    <div
        class="w-page"
        :class="[$style['w-page'], device + '-ui', 'lang-' + lang]"
        data-page-type="WelcomePage"
    >
        <clientOnly>
            <Nuxt :class="$style['w-b']" />
        </clientOnly>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSiteStore } from "@/store/site";
import { onBeforeMount, onBeforeUnmount } from "vue";

import "@/assets/style/welcome-page/welcome.scss";

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
    name: "WelcomeLayout",
    middleware: ["device"],
};
</script>
<style lang="scss" module>
//
</style>
