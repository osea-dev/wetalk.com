<template>
    <main
        id="home-body"
        ref="homePage"
        class="w-body w-module home-body"
        :class="customClass"
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
    name: "IndexPage",
    components: { SceneModule },
    layout: "index",
    setup() {
        const siteStore = useSiteStore();
        const customClass = computed(() => {
            return siteStore.minNavIsOpen ? "relative z-10" : "";
        });
        return {
            customClass,
        };
    },
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
});
</script>
<style lang="scss" module>
//
</style>
