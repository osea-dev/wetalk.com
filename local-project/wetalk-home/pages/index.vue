<template>
    <main
        id="home-body"
        class="w-body w-module home-body"
        :class="customClass"
        ref="homePage"
    >
        <SceneModule />
    </main>
</template>

<script lang="ts">
import SceneModule from "@/components/index/SceneModule.vue";
import { useSiteStore } from "@/store/site";
import { defineComponent } from "@nuxtjs/composition-api";
import { computed } from "vue";

export default defineComponent({
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.INDEX.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.INDEX.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.INDEX.DESC"),
                },
            ],
        };
    },
    name: "IndexPage",
    layout: "index",
    components: { SceneModule },
    setup() {
        const siteStore = useSiteStore();
        const customClass = computed(() => {
            return siteStore.minNavIsOpen ? "relative z-10" : "";
        });
        return {
            customClass,
        };
    },
});
</script>
<style lang="scss" module>
//
</style>
