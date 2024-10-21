<template>
    <main :class="$style['news-body']">
        <section ref="bannerModule" :class="$style['module-banner']">
            <div class="wrapper--limit-width h-full relative">
                <div :class="$style['module-head']">
                    <h2 :class="$style['module-title']">
                        <span class="text">{{ $t("新闻动态") }}</span>
                    </h2>
                </div>
                <div ref="imgGroup" :class="$style['module-body']">
                    <div :class="$style['img-1']">
                        <img
                            class="parallax-layer"
                            data-depth="-0.2"
                            src="@/assets/images/news/banner-1.png"
                            alt=""
                        />
                    </div>
                    <div :class="$style['img-2']">
                        <img
                            class="parallax-layer"
                            data-depth="-0.6"
                            src="@/assets/images/news/banner-2.png"
                            alt=""
                        />
                    </div>
                    <div :class="$style['img-3']">
                        <img
                            class="parallax-layer"
                            data-depth="0.2"
                            src="@/assets/images/news/banner-3.png"
                            alt=""
                        />
                    </div>
                    <div :class="$style['img-4']">
                        <img
                            class="parallax-layer"
                            data-depth="0.5"
                            src="@/assets/images/news/banner-4.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </section>
        <NewsModule />
        <MessageBoard class="p-module" />
    </main>
</template>
<script lang="ts">
import MessageBoard from "@/components/MessageBoard.vue";
import NewsModule from "@/components/news/NewsModule.vue";
import { defineComponent } from "@nuxtjs/composition-api";
import Parallax from "parallax-js";
import { onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
    components: {
        MessageBoard,
        NewsModule,
    },
    setup() {
        const bannerAnime = gsap.timeline();
        const imgGroup = ref<HTMLElement | null>(null);
        const bannerModule = ref<HTMLElement | null>(null);

        onMounted(() => {
            const box = imgGroup.value!;

            bannerAnime.fromTo(
                $(box).children()[3],
                {
                    x: () => {
                        if (window.innerWidth <= 400) {
                            return -120;
                        } else {
                            return -300;
                        }
                    },
                    rotate: -30,
                    transformOrigin: "left bottom",
                },
                { x: 0, rotate: 0, duration: 1.6, ease: "better-elastic" }
            );
            bannerAnime.fromTo(
                $(box).children()[2],
                { opacity: 0 },
                { opacity: 1, ease: "Power3.easeOut", duration: 1.2 },
                "-=0.7"
            );
            bannerAnime.fromTo(
                $(box).children()[1],
                { opacity: 0, y: 240 },
                { opacity: 1, y: 0, ease: "Power2.easeOut", duration: 0.8 },
                "-=1.2"
            );
            bannerAnime.fromTo(
                $(box).children()[0],
                { opacity: 0, y: 240 },
                { opacity: 1, y: 0, ease: "Power2.easeOut", duration: 0.8 },
                "-=0.95"
            );

            const bannerDom = bannerModule.value!;

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
            imgGroup,
            bannerModule,
        };
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.NEWS.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.NEWS.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.NEWS.DESC"),
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: this.$i18n.t("KEY_SEO.NEWS.KEYWORDS"),
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: this.$i18n.t("KEY_SEO.NEWS.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
.news-body {
    // init
}
.module-banner {
    font-size: 16px;

    overflow: hidden;

    height: em(560px, 16px);

    background-color: #f0f4fe;
    .module-head {
        position: absolute;
        bottom: 0;

        width: 100%;
        height: 0;
    }
    .module-title {
        font-size: em(40px, 16px);
        font-weight: 700;

        position: absolute;
        z-index: 10;
        bottom: em(118px, 40px);
    }
    .module-body {
        position: relative;

        height: 100%;
        .img-1 {
            @include image-placeholder(824px, 900px);
            position: absolute;
            top: em(176px, 16px);
            right: em(-186px, 16px);

            overflow: visible;

            width: em(824px, 16px);
        }
        .img-2 {
            @include image-placeholder(1400px, 1400px);
            position: absolute;
            top: em(310px, 16px);
            right: em(440px, 16px);

            overflow: visible;

            width: em(1400px, 16px);
            width: 700px;
        }
        .img-3 {
            @include image-placeholder(945px, 526px);
            position: absolute;
            top: calc(50% + em(33px, 16px));
            left: calc(50% + em(80px, 16px));

            overflow: visible;

            width: em(472px, 16px);

            transform: translateY(-50%);
        }
        .img-4 {
            @include image-placeholder(972px, 1000px);
            position: absolute;
            top: em(-58px, 16px);
            left: calc(50% + em(518px, 16px));

            overflow: visible;

            width: math.div(em(972px, 16px), 2);
        }
    }
    @include media-breakpoint-down(xxxl) {
        font-size: 15px;
    }
    @include media-breakpoint-down(xxl) {
        font-size: 14px;
    }
    @include media-breakpoint-down(xl) {
        font-size: 12px;
    }
    @include media-breakpoint-down(lg) {
        font-size: 13px;
        .module-title {
            bottom: 2.2em;
        }
        .module-body {
            .img-1 {
                top: em(206px, 16px);
                right: em(-106px, 16px);

                width: 400px;
            }
            .img-2 {
                top: em(280px, 16px);
                right: em(190px, 16px);

                width: 500px;
            }
            .img-3 {
                top: 50%;
                left: 50%;

                width: 370px;

                transform: translate(-50%, -50%);
            }
            .img-4 {
                top: 80px;
                left: 50%;

                width: 250px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        font-size: 12px;
        .module-body {
            .img-1 {
                top: 150px;
                right: em(-126px, 16px);

                width: 400px;
            }
            .img-2 {
                top: 200px;
                right: em(220px, 16px);

                width: 400px;
            }
            .img-3 {
                top: 50%;
                left: 50%;

                width: 280px;

                transform: translate(-50%, -50%);
            }
            .img-4 {
                top: 95px;
                left: 50%;

                width: 200px;
            }
        }
        .module-title {
            bottom: 1.8em;
        }
    }
    @include media-breakpoint-down(sm) {
        font-size: 9px;
        .module-title {
            bottom: 2em;
        }
        .module-body {
            .img-1 {
                top: em(186px, 16px);
                right: em(-126px, 16px);

                width: 300px;
            }
            .img-2 {
                top: em(320px, 16px);
                right: em(170px, 16px);

                width: 300px;
            }
            .img-3 {
                top: 50%;
                left: 50%;

                width: 200px;

                transform: translate(-50%, -50%);
            }
            .img-4 {
                top: 70px;
                left: 50%;

                width: 150px;
            }
        }
    }
}
</style>
