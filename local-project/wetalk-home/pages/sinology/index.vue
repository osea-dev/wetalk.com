<!--
 * @Description: 潮国学
 * @Author: F-Stone
 * @LastEditTime: 2023-03-21 18:20:37
-->
<template>
    <main ref="Dom" class="w-body w-module" :class="$style['sinology-body']">
        <Banner class="p-module" />
        <SinologyCourseIntro class="p-module" />
        <SinologyEducation class="p-module" />
        <SinologyCourseFeatures class="p-module" />
        <IntroCard2
            :class="$style['intro-card-2']"
            v-bind="advantageModule"
            class="p-module"
        />
        <SinologyTeacher class="p-module" />
        <IntroCard v-bind="cardData" class="p-module" />
        <LevelIntroModule :level-intro-list="levelIntroList" class="p-module" />
        <MessageBoard class="p-module" />
    </main>
</template>
<script lang="ts">
import Banner from "@/components/sinology/SinologyBanner.vue";
import SinologyCourseIntro from "@/components/sinology/SinologyCourseIntro.vue";
import SinologyEducation from "@/components/sinology/SinologyEducation.vue";
import SinologyCourseFeatures from "@/components/sinology/SinologyCourseFeatures.vue";
import SinologyTeacher from "@/components/sinology/SinologyTeacher.vue";
import IntroCard2 from "@/components/IntroCard2.vue";
import IntroCard from "@/components/IntroCard.vue";
import LevelIntroModule from "@/components/LevelIntroModule.vue";
import MessageBoard from "@/components/MessageBoard.vue";
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    components: {
        Banner,
        SinologyCourseIntro,
        SinologyEducation,
        SinologyCourseFeatures,
        SinologyTeacher,
        IntroCard2,
        IntroCard,
        LevelIntroModule,
        MessageBoard,
    },
    setup() {
        const advantageModule = {
            title: "KEY_PAGE_SINOLOGY.INTRO_CARD.TITLE",
            subtitle: "KEY_PAGE_SINOLOGY.INTRO_CARD.SUBTITLE",
            list: [
                {
                    title: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[0].TITLE",
                    desc: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[0].DESC",
                    btn: {
                        title: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[0].BTN",
                        link: "",
                    },
                },
                {
                    title: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[1].TITLE",
                    desc: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[1].DESC",
                    btn: {
                        title: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[1].BTN",
                        link: "",
                    },
                },
                {
                    title: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[2].TITLE",
                    desc: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[2].DESC",
                    btn: {
                        title: "KEY_PAGE_SINOLOGY.INTRO_CARD.LIST[2].BTN",
                        link: "",
                    },
                },
            ],
        };

        const levelIntroList = [
            {
                theme: "#906DFF",
                title: "KEY_PAGE_SINOLOGY.LEVEL.TITLE",
                subtitle: "KEY_PAGE_SINOLOGY.LEVEL.SUBTITLE",
                desc: "KEY_PAGE_SINOLOGY.LEVEL.DESC",
                thumb: require("@/assets/images/chinese/level-1.png"),
            },
        ];
        const cardData = {
            title: "KEY_PAGE_SINOLOGY.ADVANTAGES.TITLE",
            list: [
                {
                    title: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[0].TITLE",
                    subtitle: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[0].SUBTITLE",
                    tag: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[0].TAG",
                    icon: require("@/assets/images/sinology/sinology-icon-1.png"),
                },
                {
                    title: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[1].TITLE",
                    subtitle: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[1].SUBTITLE",
                    tag: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[1].TAG",
                    icon: require("@/assets/images/sinology/sinology-icon-2.png"),
                },
                {
                    title: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[2].TITLE",
                    subtitle: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[2].SUBTITLE",
                    tag: "KEY_PAGE_SINOLOGY.ADVANTAGES.LIST[2].TAG",
                    icon: require("@/assets/images/sinology/sinology-icon-3.png"),
                },
            ],
        };
        return {
            advantageModule,
            levelIntroList,
            cardData,
        };
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.SINOLOGY.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.SINOLOGY.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.SINOLOGY.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
.sinology-body {
    overflow: hidden;
    :global(.p-module) {
        margin-bottom: 140px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    @include media-breakpoint-down(xxl) {
        :global(.p-module) {
            margin-bottom: 120px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .intro-card-2 {
            margin: 0;
            padding-bottom: 120px;
        }
    }
    @include media-breakpoint-down(xl) {
        :global(.p-module) {
            margin-bottom: 100px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .intro-card-2 {
            margin: 0;
            padding-bottom: 100px;
        }
    }
    @include media-breakpoint-down(md) {
        :global(.p-module) {
            margin-bottom: 80px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .intro-card-2 {
            margin: 0;
            padding-bottom: 100px;
        }
    }
}
</style>
