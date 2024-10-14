<!--
 * @Description: page 的默认布局结构
 * @Author: F-Stone
 * @LastEditTime: 2022-12-30 14:11:25
-->
<template>
    <div
        class="w-page"
        :class="[$style['w-page'], device + '-ui', 'lang-' + lang]"
    >
        <SiteNav />
        <SiteNavMini />
        <Nuxt :class="$style['w-b']" />
        <SiteFooter />
        <LangSwitch />
        <clientOnly>
            <SiteNotice />
        </clientOnly>
    </div>
</template>
<script lang="ts">
import { storeToRefs } from "pinia";
import { useSiteStore } from "@/store/site";
import { defineComponent } from "vue";

export default defineComponent({
    name: "DefaultLayout",
    middleware: ["device", "base-info", "check-user-info"],
    setup() {
        const { device, lang } = storeToRefs(useSiteStore());

        return { device, lang };
    },
});
</script>
<style lang="scss" module>
.w-page {
    // min-width: map-get($map: $grid-breakpoints, $key: sm);

    background-color: #f5f6fb;
    .w-b {
        min-height: calc(w-h(100) - var(--nav-h) - var(--footer-h));
        padding: var(--y-space-normal) 0;
    }
}
</style>
