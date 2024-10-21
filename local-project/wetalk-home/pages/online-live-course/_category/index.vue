<template>
    <main :class="$style['online-live-course']">
        <div
            ref="bannerModule"
            class="p-module relative z-10"
            :class="$style['banner-module']"
        >
            <div
                class="wrapper--limit-width h-full flex justify-between items-center"
            >
                <div
                    :class="$style['banner-left']"
                    class="h-full flex items-end"
                >
                    <div
                        :class="$style['picture-box']"
                        class="wow animate__fadeInUp-50"
                    >
                        <nuxt-img
                            class="parallax-layer"
                            data-depth="0.2"
                            src="@/assets/images/online-live-course/banner-3.png"
                            alt=""
                        />
                    </div>
                </div>
                <div
                    :class="$style['banner-right']"
                    class="h-full flex items-center relative"
                >
                    <div
                        :class="$style['cloud-box']"
                        class="wow animate__fadeInRight-50"
                    >
                        <nuxt-img
                            class="parallax-layer"
                            data-depth="0.1"
                            src="@/assets/images/online-live-course/banner-2.png"
                            alt=""
                        />
                    </div>
                    <div
                        :class="$style['slogan-box']"
                        class="wow animate__fadeInRight-50"
                    >
                        <nuxt-img
                            class="parallax-layer"
                            data-depth="0.3"
                            src="@/assets/images/education/banner-1.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
        <OnlineLiveCourseModule class="wow animate__fadeInUp-50" />
    </main>
</template>
<script lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { defineComponent } from "@nuxtjs/composition-api";
import OnlineLiveCourseModule from "~/components/online-live-course/OnlineLiveCourseModule.vue";
import Parallax from "parallax-js";

export default defineComponent({
    name: "OnlineLiveCourseIndex",
    components: { OnlineLiveCourseModule },
    setup() {
        const bannerModule = ref<HTMLElement | null>(null);

        onMounted(() => {
            const bannerDom = bannerModule.value!;
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

        background: #fff0e1;
    }
    .banner-left {
        position: relative;
        z-index: 10;

        width: percent(640px, 1536px);
        margin-left: percent(70px, 1536px);
    }
    .banner-right {
        position: relative;

        width: percent(440px, 1536px);
        margin-right: 40px;
        .cloud-box {
            @include image-placeholder(1260px, 1120px);
            @include ab-cover;
            left: auto;

            overflow: visible !important;

            width: 143.181818181818%;
            & > img {
                position: absolute !important;

                width: auto;
                min-width: 100%;
                min-height: 100%;
            }
        }
    }
    .slogan-box {
        @include image-placeholder(440px, 277px);
        overflow: visible !important;

        width: 100%;
        & > img {
            position: absolute !important;
        }
    }
    .picture-box {
        @include image-placeholder(647px, 375px);
        overflow: visible !important;
        & > img {
            position: absolute !important;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .banner-left {
            position: relative;

            width: percent(540px, 1536px);
            margin-left: percent(70px, 1536px);
        }
    }
    @include media-breakpoint-down(xl) {
        .banner-module {
            min-height: 400px;
            margin-bottom: -50px;
        }
        .banner-left {
            width: percent(640px, 1536px);
        }
    }
    @include media-breakpoint-down(lg) {
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
        .banner-right {
            width: 50%;
        }
        .banner-left {
            width: 50%;
            margin-left: 10px;
        }
    }
}
</style>
