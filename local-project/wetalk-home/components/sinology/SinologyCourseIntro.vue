<!--
 * @Description: 潮国学课程介绍
 * @Author: F-Stone
 * @LastEditTime: 2023-01-13 15:30:45
-->
<template>
    <div :class="$style['sinology-course-intro']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <ModuleHeader
                    :class="$style['module-header']"
                    :title="$t('KEY_PAGE_SINOLOGY.INTRO.TITLE')"
                    :desc="$t('KEY_PAGE_SINOLOGY.INTRO.DESC')"
                />
                <div
                    :class="$style['module-body']"
                    ref="moduleBody"
                    class="relative"
                >
                    <div
                        :class="$style['swiper-controller']"
                        class="flex items-center justify-between wow animate__fadeInUp-50"
                    >
                        <div
                            :class="$style['btn--prev']"
                            class="flex items-center justify-center"
                        >
                            <i class="ic iconfont icon-long-arrow--left"></i>
                        </div>
                        <div
                            :class="$style['btn--next']"
                            class="flex items-center justify-center"
                        >
                            <i class="ic iconfont icon-long-arrow--right"></i>
                        </div>
                    </div>
                    <div
                        class="swiper"
                        ref="courseSwiper"
                        :class="$style['course-swiper']"
                    >
                        <div
                            class="swiper-wrapper wow-group-4"
                            :class="$style['course-list']"
                        >
                            <div
                                class="swiper-slide wow animate__fadeInRight-10_percent"
                                :class="$style['course-item']"
                                v-for="(item, index) in courseList"
                                :key="index"
                            >
                                <img :src="item.thumb" alt="" />
                            </div>
                        </div>
                    </div>
                    <div :class="$style['curse-category']" class="wow-group-5">
                        <div
                            :class="$style['category-list']"
                            class="flex items-start wow animate__fadeInUp-50"
                            v-for="(cat, index) in courseCat"
                            :key="index"
                        >
                            <i
                                class="ic iconfont icon-circle-right-strock flex-shrink-0"
                            ></i>
                            <div class="flex" :class="$style['cat-row']">
                                <div :class="$style['cat-title']">
                                    {{ $t(cat.title) }}：
                                </div>
                                <div
                                    :class="$style['cat-body']"
                                    class="flex flex-wrap"
                                    v-html="$t(cat.desc)"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
import { onBeforeUnmount, onMounted, ref, useCssModule } from "vue";
const $sn = useCssModule();
const courseList = [
    {
        link: "",
        thumb: require("@/assets/images/sinology/course-1.png"),
    },

    {
        link: "",
        thumb: require("@/assets/images/sinology/course-2.png"),
    },

    {
        link: "",
        thumb: require("@/assets/images/sinology/course-3.png"),
    },

    {
        link: "",
        thumb: require("@/assets/images/sinology/course-4.png"),
    },
];
const courseCat = [
    {
        title: "KEY_PAGE_SINOLOGY.INTRO.LIST[0].TITLE",
        desc: "KEY_PAGE_SINOLOGY.INTRO.LIST[0].DESC",
    },
    {
        title: "KEY_PAGE_SINOLOGY.INTRO.LIST[1].TITLE",
        desc: "KEY_PAGE_SINOLOGY.INTRO.LIST[1].DESC",
    },
    {
        title: "KEY_PAGE_SINOLOGY.INTRO.LIST[2].TITLE",
        desc: "KEY_PAGE_SINOLOGY.INTRO.LIST[2].DESC",
    },
    {
        title: "KEY_PAGE_SINOLOGY.INTRO.LIST[3].TITLE",
        desc: "KEY_PAGE_SINOLOGY.INTRO.LIST[3].DESC",
    },
    {
        title: "KEY_PAGE_SINOLOGY.INTRO.LIST[4].TITLE",
        desc: "KEY_PAGE_SINOLOGY.INTRO.LIST[4].DESC",
    },
];
const courseSwiper = ref<HTMLElement | null>(null);
const moduleBody = ref<HTMLElement | null>(null);
const { $Swiper } = useContext();

onMounted(() => {
    const moduleBodyDom = moduleBody.value!;
    const courseSwiperDom = courseSwiper.value!;

    const swiper = new $Swiper(courseSwiperDom, {
        slidesPerView: "auto",
        speed: 600,
        grabCursor: true,
        parallax: true,
        navigation: {
            prevEl: $(moduleBodyDom).find(`.${$sn["btn--prev"]}`)[0],
            nextEl: $(moduleBodyDom).find(`.${$sn["btn--next"]}`)[0],
        },
    });
    onBeforeUnmount(() => {
        swiper.destroy();
    });
});
</script>
<style lang="scss" module>
.sinology-course-intro {
    overflow: hidden;

    padding-top: 22px;
    .module-header {
        width: 620px;
        margin-bottom: 53px;
    }

    /* #region 项目列表 */
    .course-swiper {
        overflow: visible;
    }
    .course-item {
        @include image-placeholder(441px, 280px);
        @include space-between(79px);

        box-shadow: 40px 40px 40px rgb(54 58 70 / 0.3),
            8px 8px 10px rgb(54 58 70 / 0.3);
    }
    .swiper-controller {
        position: absolute;
        right: 0;
        bottom: calc(100% + 62px);

        width: 134px;
        .btn--prev,
        .btn--next {
            @include circle(61px);

            font-weight: bold;

            cursor: pointer;
            transition: 0.36s ease;

            color: rgba(#152137, 0.5);
            border: 2px solid #e9eef4;

            filter: drop-shadow(0 10px 40px rgb(97 97 97 / 0.1));
            &:hover {
                color: #fff;
                border-color: #0cc991;
                background-color: #0cc991;
            }
        }
    }
    /* #endregion */
    .curse-category {
        margin-top: 111px;
    }
    .category-list {
        @include space-between(em(28px, 14px), "y");
        font-size: 14px;
        font-weight: 500;
        line-height: em(30px, 14px);

        color: #333;
        :global(.ic) {
            @include circle(36px);
            @include flex(c, c);
            font-size: 20px;

            margin-right: 12px;

            color: #fff;
            background-color: #0aca91;
        }
        .cat-title {
            white-space: nowrap;
        }
    }
    @include media-breakpoint-down(xxl) {
        .swiper-controller {
            width: 128px;
            .btn--prev,
            .btn--next {
                @include circle(56px);
            }
        }
        .course-item {
            @include space-between(66px);
            width: 400px;

            box-shadow: 30px 30px 30px rgb(54 58 70 / 0.25),
                8px 8px 10px rgb(54 58 70 / 0.25);
        }
        .curse-category {
            margin-top: 90px;
        }
        .category-list {
            @include space-between(em(24px, 14px), "y");
            :global(.ic) {
                @include circle(30px);
                font-size: 16px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .module-header {
            margin-bottom: 44px;
        }
        .swiper-controller {
            width: 114px;
            .btn--prev,
            .btn--next {
                @include circle(50px);
            }
        }
        .course-item {
            @include space-between(56px);
            width: 370px;

            box-shadow: 26px 26px 26px rgb(54 58 70 / 0.2),
                8px 8px 10px rgb(54 58 70 / 0.2);
        }
        .curse-category {
            margin-top: 70px;
        }
        .category-list {
            @include space-between(em(20px, 14px), "y");
            font-size: 12px;
            :global(.ic) {
                @include circle(26px);
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .module-header {
            width: 490px;
            max-width: 100%;
        }
        .course-item {
            width: 320px;
            margin-right: 40px;
        }
    }
    @include media-breakpoint-down(md) {
        .swiper-controller {
            bottom: calc(100% + 129px);

            width: 100px;
            .btn--prev,
            .btn--next {
                @include circle(41px);
                font-size: 12px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .swiper-controller {
            display: none;
        }
        .module-header {
            margin-bottom: 30px;
        }
        .course-item {
            @include space-between(26px);
            width: 260px;

            box-shadow: 26px 26px 26px rgb(54 58 70 / 0.1),
                8px 8px 10px rgb(54 58 70 / 0.1);
        }
        .curse-category {
            margin-top: 50px;
        }
    }
}
:global(.lang-en) {
    .sinology-course-intro {
        .module-header {
            width: 800px;
        }
        .category-list {
            :global(.ic) {
                transform: translateY(-1px);
            }
        }
        .cat-row {
            display: block;
        }
        @include media-breakpoint-down(xxl) {
            .module-header {
                width: 700px;
            }
        }
        @include media-breakpoint-down(xl) {
            .module-header {
                width: 600px;
            }
        }
        @include media-breakpoint-down(lg) {
            .module-header {
                width: 500px;
            }
        }
        @include media-breakpoint-down(md) {
            .swiper-controller {
                bottom: calc(100% + 210px);
            }
        }
    }
}
</style>
