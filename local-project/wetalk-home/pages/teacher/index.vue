<template>
    <div :class="$style['teacher-container']">
        <section
            ref="bannerModule"
            class="p-module"
            :class="$style['module-banner']"
        >
            <div class="wrapper--limit-width h-full">
                <div :class="$style['module-bg']" class="relative h-full">
                    <div :class="$style['img-box']">
                        <!-- <img src="@/assets/images/teacher/banner-1.png" alt="" /> -->
                        <div :class="$style['parallax-box']">
                            <img
                                class="parallax-layer"
                                data-depth="0.2"
                                src="@/assets/images/teacher/banner-l-1.png"
                                alt=""
                            />
                        </div>
                        <div :class="$style['parallax-box']">
                            <img
                                class="parallax-layer"
                                data-depth="0.1"
                                src="@/assets/images/teacher/banner-l-2.png"
                                alt=""
                            />
                        </div>
                        <div :class="$style['parallax-box']">
                            <img
                                class="parallax-layer"
                                data-depth="-0.3"
                                src="@/assets/images/teacher/banner-l-3.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div :class="$style['img-box']">
                        <img
                            src="@/assets/images/teacher/banner-3.png"
                            alt=""
                        />
                    </div>
                    <div
                        class="wrapper--limit-width-mini h-full flex items-center justify-end z-20 relative lg:justify-center"
                    >
                        <div :class="$style['logo-img-box']">
                            <img
                                src="@/assets/images/teacher/banner-2.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div ref="teacherBannerDom" :class="$style['teacher-banner']">
            <div class="wrapper--limit-width">
                <div class="swiper relative">
                    <div class="swiper-wrapper">
                        <div
                            v-for="(item, index) in teacherBannerList"
                            :key="index"
                            class="swiper-slide"
                            :class="$style['list-item']"
                        >
                            <Link
                                v-if="item.url"
                                :to="item.url"
                                target="_blank"
                            >
                                <img :src="item.img" alt="" />
                            </Link>
                            <div v-else>
                                <img :src="item.img" alt="" />
                            </div>
                        </div>
                    </div>
                    <div
                        :class="$style['swiper-tab']"
                        class="flex justify-center"
                    >
                        <div
                            ref="teacherSwiperTab"
                            :class="$style['swiper-tab-box']"
                            class="inline-flex"
                        >
                            <div class="tab-btn state-active"></div>
                            <div class="tab-btn"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TeacherIntro class="p-module" />
        <TeacherList class="p-module" />
        <MessageBoard class="p-module" />
    </div>
</template>
<script lang="ts">
import TeacherIntro from "@/components/teacher/TeacherIntro.vue";
import TeacherList from "@/components/teacher/TeacherList.vue";
import MessageBoard from "@/components/MessageBoard.vue";

import Parallax from "parallax-js";
import { onBeforeUnmount, onMounted, ref, useCssModule } from "vue";
import { defineComponent, useContext, useFetch } from "@nuxtjs/composition-api";
import { getBanner } from "~/assets/script/api/api.site";
import type { TYPE_BANNER } from "~/assets/script/api/api.site";

export default defineComponent({
    components: {
        TeacherIntro,
        TeacherList,
        MessageBoard,
    },
    setup() {
        const $sn = useCssModule();
        const bannerModule = ref<HTMLElement | null>(null);
        const teacherBannerList = ref<TYPE_BANNER | []>([]);

        function getDom(dom: HTMLElement, className: string) {
            return $(dom).find("." + $sn[className]);
        }

        useFetch(async () => {
            await getBanner({
                type: "teachers_banner",
            }).then((res) => {
                teacherBannerList.value = res.data;
            });
        });

        onMounted(() => {
            const bannerDom = bannerModule.value!;
            gsap.timeline({
                scrollTrigger: {
                    trigger: bannerDom,
                    start: "top 10",
                },
            })
                .from(getDom(bannerDom, "parallax-box")[1], {
                    opacity: 0,
                    y: 50,
                })
                .from(
                    getDom(bannerDom, "parallax-box")[2],
                    {
                        opacity: 0,
                        x: 0,
                        y: 0,
                    },
                    "+=0.36"
                )
                .from(
                    getDom(bannerDom, "parallax-box")[0],
                    {
                        y: -50,
                        opacity: 0,
                    },
                    "<"
                )
                .from(getDom(bannerDom, "logo-img-box")[0], {
                    y: 30,
                    duration: 0.66,
                    opacity: 0,
                });

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

        const { $Swiper } = useContext();
        const teacherBannerDom = ref<HTMLElement | null>();
        const teacherSwiperTab = ref<HTMLElement | null>(null);
        onMounted(() => {
            const swiperDom = $(teacherBannerDom.value!).find(".swiper")[0];
            const swiper = new $Swiper(swiperDom, {
                grabCursor: true,
                loop: true,
                speed: 600,
                autoplay: {
                    delay: 4000,
                },
                pagination: {
                    el: teacherSwiperTab.value!,
                    type: "bullets",
                    renderBullet(index, className) {
                        return `<div data-index="${index}" class="${className}"></div>`;
                    },
                    bulletActiveClass: "state-active",
                    bulletClass: "tab-btn",
                    bulletElement: "div",
                    clickable: true,
                },
            });
            onBeforeUnmount(() => {
                swiper.destroy();
            });
        });

        return {
            bannerModule,
            teacherBannerDom,
            teacherSwiperTab,
            teacherBannerList,
        };
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.TEACHER.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.TEACHER.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.TEACHER.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
.teacher-container {
    :global(.p-module) {
        margin-bottom: 140px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    @include media-breakpoint-down(xl) {
        :global(.p-module) {
            margin-bottom: 120px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        :global(.p-module) {
            margin-bottom: 90px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .module-banner {
            margin-bottom: 180px;
        }
    }
    @include media-breakpoint-down(md) {
        :global(.p-module) {
            margin-bottom: 70px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .module-banner {
            margin-bottom: 140px;
        }
    }
    @include media-breakpoint-down(sm) {
        :global(.p-module) {
            margin-bottom: 60px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .module-banner {
            margin-bottom: 100px;
        }
    }
}
.module-banner {
    font-size: 16px;

    height: em(560px, 16px);

    border-radius: 0 0 em(150px, 16px);
    background: #e2e6fa;
    .logo-img-box {
        @include image-placeholder(516px, 228px);
        bottom: em(-10px, 16px);
        left: em(-40px, 16px);

        width: em(516px, 16px);
    }
    .img-box {
        &:nth-child(1) {
            @include space-placeholder(702px, 380px);
            position: absolute;
            bottom: em(-40px, 16px);
            left: 0;

            overflow: visible;

            width: em(702px, 16px);
            .parallax-box {
                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                height: 100%;
                &:nth-child(1) {
                    z-index: 10;
                    bottom: 0;

                    width: 102.9%;
                    max-width: initial;
                    margin: auto;
                }
                &:nth-child(2) {
                    right: 0;

                    width: percent(560px, 702px);
                    margin: 0 auto;
                }
                &:nth-child(3) {
                    right: 0;

                    width: percent(560px, 702px);
                    margin: 0 auto;

                    transform: translate3d(em(40px, 16px), em(-40px, 16px), 0);
                }
            }
            img {
                position: absolute !important;
            }
        }
        &:nth-child(2) {
            @include image-placeholder(992px, 1120px);
            position: absolute;
            top: 0;
            right: em(-90px, 16px);

            width: em(496px, 16px);
        }
    }
    @include media-breakpoint-down(xxxl) {
        font-size: 15px;
        .logo-img-box {
            width: em(500px, 16px);
        }
        .img-box {
            &:nth-child(1) {
                width: em(652px, 16px);
            }
            &:nth-child(2) {
                right: em(-10px, 16px);
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        font-size: 14px;
        .logo-img-box {
            width: em(456px, 16px);
        }
        .img-box {
            &:nth-child(1) {
                width: em(602px, 16px);
            }
        }
    }
    @include media-breakpoint-down(xl) {
        font-size: 12px;
    }
    @include media-breakpoint-down(lg) {
        font-size: 13px;
        .logo-img-box {
            bottom: 0;
            left: 0;

            width: 400px;
        }
        .img-box {
            &:nth-child(1) {
                z-index: 100;
                bottom: -140px;
                left: -6%;

                width: 400px;
                img {
                    position: absolute !important;
                }
            }
            &:nth-child(2) {
                top: 50%;
                left: 50%;

                width: 400px;

                transform: translate(-50%, -50%);
            }
        }
    }
    @include media-breakpoint-down(md) {
        font-size: 12px;
        .logo-img-box {
            width: 300px;
        }
        .img-box {
            &:nth-child(1) {
                bottom: -110px;
                left: -6%;

                width: 340px;
            }
            &:nth-child(2) {
                width: 360px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        font-size: 9px;
        .logo-img-box {
            width: 260px;
        }
        .img-box {
            &:nth-child(1) {
                bottom: -110px;
                left: -6%;

                width: 280px;
            }
            &:nth-child(2) {
                width: 280px;
            }
        }
    }
}
.teacher-banner {
    margin-bottom: 140px;
    :global(.swiper) {
        overflow: hidden;

        border-radius: 30px;
    }
    .swiper-tab {
        position: absolute;
        z-index: 100;
        right: 0;
        bottom: 0;
        left: 0;

        margin: 0 auto;
        margin-bottom: 16px;
        padding: 20px 0;
    }
    .swiper-tab-box {
        width: auto !important;
        padding: 3px 12px;

        border-radius: 20px;
        background: rgb(0 0 0 / 30%);
    }
    :global {
        .tab-btn {
            @include space-between(1px);
            position: relative;

            width: 20px;
            height: 20px;

            cursor: pointer;
            transition: 0.26s ease;

            color: var(--t-c-lighter);
            &:hover {
                color: var(--t-c-default);
            }
            &::after {
                @include circle(6px, rgba(255, 255, 255, 0.5));
                @include move-center;
                content: "";
                transition: 0.26s ease;
            }
            &.state-active {
                &::after {
                    @include circle(9px, rgba(255, 255, 255, 1));
                }
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        margin-bottom: 120px;
        .swiper-tab {
            margin-bottom: 0;
        }
    }
    @include media-breakpoint-down(xl) {
        margin-bottom: 100px;
        padding-top: 80px;
        .swiper-tab {
            padding: 10px 0;
        }
        .swiper-tab-box {
            padding: 4px 9px;
        }
        :global {
            .swiper {
                border-radius: 20px;
            }
            .tab-btn {
                width: 16px;
                height: 16px;
                &::after {
                    @include circle(4px, rgba(255, 255, 255, 0.5));
                }
                &.state-active {
                    &::after {
                        @include circle(7px, rgba(255, 255, 255, 1));
                    }
                }
            }
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 80px;
        padding-top: 60px;
    }
    @include media-breakpoint-down(md) {
        margin-bottom: 60px;
        padding-top: 60px;
        .swiper-tab-box {
            padding: 2px 6px;
        }
        :global {
            .swiper {
                border-radius: 16px;
            }
            .tab-btn {
                width: 14px;
                height: 14px;
                &.state-active {
                    &::after {
                        @include circle(6px, rgba(255, 255, 255, 1));
                    }
                }
            }
        }
    }
    @include media-breakpoint-down(sm) {
        margin-bottom: 40px;
        padding-top: 80px;
    }
}
</style>
