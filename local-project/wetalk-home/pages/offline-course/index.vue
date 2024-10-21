<template>
    <main :class="$style['online-live-course']">
        <div
            ref="bannerModule"
            class="p-module relative z-10"
            :class="$style['banner-module']"
        >
            <div
                class="wrapper--limit-width h-full flex justify-between items-end lg:justify-end"
            >
                <div :class="$style['banner-left']">
                    <div ref="tree" :class="$style['tree-box']">
                        <img
                            class="parallax-layer"
                            data-depth="0.1"
                            src="@/assets/images/offline-course/banner.png"
                            alt=""
                        />
                    </div>
                </div>
                <div
                    :class="$style['banner-right']"
                    class="h-full flex items-center"
                >
                    <div
                        :class="$style['slogan-box']"
                        class="wow animate__fadeInRight-50"
                    >
                        <img
                            class="parallax-layer"
                            data-depth="0.3"
                            src="@/assets/images/education/banner-1.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
        <OfflineCourseModule class="wow animate__fadeInUp-50" />
    </main>
</template>
<script lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { defineComponent } from "@nuxtjs/composition-api";
import OfflineCourseModule from "~/components/offline-course/OfflineCourseModule.vue";
import Parallax from "parallax-js";

export default defineComponent({
    name: "OfflineCourseIndex",
    components: { OfflineCourseModule },
    setup() {
        const tree = ref<HTMLElement>();
        const bannerModule = ref<HTMLElement | null>(null);

        onMounted(() => {
            const bannerDom = bannerModule.value!;
            gsap.timeline({ delay: 0.3 })
                .fromTo(tree.value!, { opacity: 0 }, { opacity: 1 })
                .fromTo(
                    tree.value!,
                    { rotate: -10, transformOrigin: "60% 90%" },
                    { rotate: 0, duration: 2.5, ease: "elastic.out(1, 0.3)" },
                    0
                );
            const px = new Parallax(bannerDom, {
                selector: ".parallax-layer",
                scalarX: 5,
                scalarY: 3,
                hoverOnly: true,
            });

            onBeforeUnmount(() => {
                px.destroy();
            });
        });
        return {
            tree,
            bannerModule,
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
.online-live-course {
    .banner-module {
        height: vw(560px, 1920px);
        min-height: 460px;
        margin-bottom: -60px;

        background: #fff8e1;
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
    .banner-left {
        width: percent(900px, 1536px);
        margin-left: 80px;
    }
    .tree-box {
        @include image-placeholder(900px, 419px);
        overflow: visible !important;

        width: 100%;

        opacity: 0;
        & > img {
            position: absolute !important;
        }
    }
    @include media-breakpoint-down(xl) {
        .banner-module {
            min-height: 400px;
            margin-bottom: -50px;
        }
        .banner-left {
            margin-left: 10px;
        }
    }
    @include media-breakpoint-down(lg) {
        .banner-right {
            width: 40%;
        }
        .banner-left {
            position: absolute;
            bottom: 0;
            left: 0;

            width: percent(1000px, 1536px);
        }
    }
    @include media-breakpoint-down(sm) {
        .banner-module {
            min-height: 280px;
            margin-bottom: -35px;
        }
        .banner-right {
            width: 55%;
            margin-right: 20px;
        }
        .banner-left {
            width: percent(1200px, 1536px);
        }
    }
}
</style>
