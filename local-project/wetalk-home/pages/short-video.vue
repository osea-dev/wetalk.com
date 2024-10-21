<template>
    <main :class="$style['short-video-container']">
        <div class="p-module relative z-10" :class="$style['banner-module']">
            <div :class="$style['banner-left']">
                <div :class="$style['tree-box']">
                    <img src="@/assets/images/education/banner-2.png" alt="" />
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
                        <img
                            src="@/assets/images/education/banner-1.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
        <ShortVideoModule class="wow animate__fadeInUp-50" />
    </main>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import ShortVideoModule from "~/components/short-video/ShortVideoModule.vue";

export default defineComponent({
    components: { ShortVideoModule },
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
.short-video-container {
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
