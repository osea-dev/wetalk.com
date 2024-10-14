<template>
    <main :class="$style['about-us-page']">
        <AboutModule />
        <TimelineModule />
        <LessonIntroModule />
        <MapModule />
        <CompanyInfo />
        <BrandIntro />
        <CultureIntroModule />
        <MessageBoard class="p-module" />
    </main>
</template>
<script lang="ts">
import AboutModule from "@/components/about-us/AboutModule.vue";
import TimelineModule from "@/components/about-us/TimelineModule.vue";
import LessonIntroModule from "@/components/about-us/LessonIntroModule.vue";
import MapModule from "@/components/about-us/MapModule.vue";
import CompanyInfo from "@/components/about-us/CompanyInfo.vue";
import BrandIntro from "@/components/about-us/BrandIntro.vue";
import CultureIntroModule from "@/components/about-us/CultureIntroModule.vue";
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.ABOUT_US.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.ABOUT_US.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.ABOUT_US.DESC"),
                },
            ],
        };
    },
    components: {
        AboutModule,
        TimelineModule,
        LessonIntroModule,
        MapModule,
        CompanyInfo,
        BrandIntro,
        CultureIntroModule,
    },
});
</script>
<style lang="scss" module>
//
</style>
