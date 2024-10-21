<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-03-21 15:27:26
-->
<template>
    <div :class="$style['education-container']">
        <div class="p-module relative z-10" :class="$style['banner-module']">
            <div :class="$style['banner-left']">
                <div :class="$style['tree-box']">
                    <nuxt-img
                        src="@/assets/images/education/banner-2.png"
                        alt=""
                    />
                </div>
            </div>
            <div
                class="wrapper--limit-width h-full flex justify-end items-center"
            >
                <div :class="$style['banner-right']">
                    <div
                        :class="$style['slogan-box']"
                        class="wow animate__fadeInRight-50"
                    >
                        <nuxt-img
                            src="@/assets/images/education/banner-1.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
        <LessonModule class="wow animate__fadeInUp-50" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import LessonModule from "~/components/education/LessonModule.vue";
export default defineComponent({
    name: "EducationPage",
    components: {
        LessonModule,
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.EDUCATION.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.EDUCATION.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.EDUCATION.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
@keyframes edu-banner-wave {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(1deg);
    }
}
.education-container {
    .banner-module {
        height: vw(560px, 1920px);
        min-height: 460px;
        margin-bottom: -60px;

        background: #e4f0ff;
    }
    .banner-right {
        width: percent(440px, 1536px);
        margin-right: 40px;
    }
    .slogan-box {
        @include image-placeholder(440px, 277px);
        width: 100%;
    }
    .tree-box {
        @include image-placeholder(1319px, 1405px);
        position: absolute;
        top: 0;
        left: 0;

        width: percent(1319px, 1920px);

        transform: translate(percent(-114px, 1319px), percent(-596px, 1405px));
        // img {
        //     transform-origin: left bottom;
        //     animation: edu-banner-wave 4s 1.2s infinite alternate
        //         cubic-bezier(0.455, 0.03, 0.515, 0.955);
        // }
    }
    @include media-breakpoint-down(xl) {
        .banner-module {
            min-height: 400px;
            margin-bottom: -50px;
        }
    }
    @include media-breakpoint-down(lg) {
        .banner-right {
            width: 40%;
        }
    }
    @include media-breakpoint-down(sm) {
        .banner-module {
            min-height: 280px;
            margin-bottom: -35px;
        }
        .banner-right {
            width: 55%;
        }
    }
}
</style>
