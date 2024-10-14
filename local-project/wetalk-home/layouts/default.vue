<!--
 * @Description: page 的默认布局结构
 * @Author: F-Stone
 * @LastEditTime: 2023-03-23 18:59:19
-->
<template>
    <div
        class="w-page"
        :class="[$style['w-page'], device + '-ui', 'lang-' + lang]"
    >
        <link rel="stylesheet" href="/style/editorPageStyle.css" />
        <SiteNav />
        <SiteNavMini />
        <Nuxt :class="$style['w-b']" />
        <SiteContact class="relative z-10" />
        <SiteFooter class="relative z-10" />
        <LangSwitch />
        <clientOnly>
            <SiteNotice />
        </clientOnly>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSiteStore } from "@/store/site";

import SiteNav from "@/components/SiteNav.vue";
import SiteContact from "@/components/SiteContact.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteNotice from "@/components/SiteNotice.vue";
import { watch } from "vue";

const siteStore = useSiteStore();
const { device, lang } = storeToRefs(useSiteStore());

watch(
    () => {
        let result = "";
        Object.entries(siteStore.mediaMatch).some(([k, v]) => {
            if (v === true) {
                result = k;
                return true;
            }
        });
        return result;
    },
    (lastAdaptScreen) => {
        if (lastAdaptScreen === "md" || lastAdaptScreen === "sm") {
            $("body").addClass("agent-mobile");
        } else {
            $("body").removeClass("agent-mobile");
        }
    }
);
</script>
<script lang="ts">
export default {
    name: "DefaultLayout",
    middleware: ["device", "base-info"],
};
</script>
<style lang="scss" module>
//
</style>
<style lang="scss">
.vue-notification-group {
    margin-top: calc($nav-h-default + 27px);
}
.vue-notification-wrapper {
    display: flex !important;

    padding-top: 20px !important;

    justify-content: center;
}
</style>
