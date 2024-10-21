<template>
    <main :class="$style['record-course-container']">
        <div
            ref="bannerModule"
            class="p-module relative z-10"
            :class="$style['banner-module']"
        >
            <div
                class="wrapper--limit-width h-full flex justify-between items-center lg:justify-end"
            >
                <div :class="$style['banner-left']">
                    <div ref="birder1" :class="$style['birder-1']">
                        <nuxt-img
                            class="parallax-layer"
                            data-depth="0.1"
                            src="@/assets/images/record-course/banner-1.png"
                            alt=""
                        />
                    </div>
                    <div ref="birder2" :class="$style['birder-2']">
                        <nuxt-img
                            class="parallax-layer"
                            data-depth="0.2"
                            src="@/assets/images/record-course/banner-2.png"
                            alt=""
                        />
                    </div>
                </div>
                <div :class="$style['banner-right']" class="flex-shrink-0">
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
        <RecordedCoursesModule class="wow animate__fadeInUp-50" />
    </main>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { onMounted, ref, onBeforeUnmount } from "vue";
import RecordedCoursesModule from "~/components/recorded-courses/RecordedCoursesModule.vue";
import Parallax from "parallax-js";

export default defineComponent({
    components: { RecordedCoursesModule },
    setup() {
        const bannerModule = ref<HTMLElement | null>(null);
        const birder1 = ref<HTMLElement | null>(null);
        const birder2 = ref<HTMLElement | null>(null);

        onMounted(() => {
            const bannerDom = bannerModule.value!;

            const animalAnimate = gsap.timeline();
            animalAnimate.from(birder1.value, { duration: 0.8, opacity: 0 });
            animalAnimate.from(
                birder1.value,
                {
                    duration: 1.2,
                    x: -200,
                    yPercent: 30,
                    z: 200,
                },
                "<"
            );
            animalAnimate.from(
                birder2.value,
                { duration: 0.8, opacity: 0 },
                "<+=0.2"
            );
            animalAnimate.from(
                birder2.value,
                {
                    duration: 1.2,
                    xPercent: -40,
                    yPercent: 15,
                    z: 200,
                },
                "<"
            );

            const px = new Parallax(bannerDom, {
                selector: ".parallax-layer",
                scalarX: 5,
                scalarY: 5,
                hoverOnly: true,
            });

            onBeforeUnmount(() => {
                px.destroy();
            });
        });
        return {
            bannerModule,
            birder1,
            birder2,
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
.record-course-container {
    .banner-module {
        height: vw(560px, 1920px);
        min-height: 460px;
        margin-bottom: -60px;

        background: #f8edff;
    }
    .banner-right {
        width: percent(440px, 1536px);
        margin-right: 40px;
    }
    .slogan-box {
        @include image-placeholder(440px, 277px);
        overflow: visible !important;

        width: 100%;
        & > img {
            position: absolute !important;
        }
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
    .banner-left {
        position: relative;

        padding-top: 50px;
        padding-left: 182px;

        perspective: 1000px;
        perspective-origin: center;
        transform-style: preserve-3d;
        .birder-1 {
            @include image-placeholder(716px, 444px);

            overflow: visible !important;
            & > img {
                position: absolute !important;
            }
        }
        .birder-2 {
            @include image-placeholder(387px, 373px);
            position: absolute;
            bottom: -50px;
            left: 0;

            overflow: visible !important;

            width: percent(387px, 716px);
            & > img {
                position: absolute !important;
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        .banner-module {
            min-height: 400px;
            margin-bottom: -50px;
        }
        .banner-left {
            width: max(60%);
            padding-top: 150px;
            padding-left: 82px;
            .birder-1 {
                max-width: 100%;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .banner-module {
            min-height: 400px;
            margin-bottom: -50px;
        }
    }
    @include media-breakpoint-down(lg) {
        .banner-left {
            position: absolute;
            z-index: 10;
            bottom: 0;
            left: 0;
        }
        .banner-right {
            width: 40%;
            margin-right: 0;
        }
    }
    @include media-breakpoint-down(sm) {
        .banner-module {
            min-height: 280px;
            margin-bottom: -35px;
        }
        .banner-left {
            bottom: 40px;
        }
        .banner-right {
            width: 50%;
        }
    }
}
</style>
