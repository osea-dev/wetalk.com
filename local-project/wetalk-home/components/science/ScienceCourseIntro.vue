<template>
    <div :class="$style['science-course-intro']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <ModuleHeader
                    :class="$style['module-header']"
                    :title="$t('KEY_PAGE_SCIENCE.COURSE.TITLE')"
                    :desc="$t('KEY_PAGE_SCIENCE.COURSE.DESC')"
                />
                <div
                    ref="moduleBody"
                    :class="$style['module-body']"
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
                        ref="courseSwiper"
                        class="swiper"
                        :class="$style['course-swiper']"
                    >
                        <div
                            class="swiper-wrapper wow-group-4"
                            :class="$style['course-list']"
                        >
                            <div
                                v-for="(item, index) in courseList"
                                :key="index"
                                class="swiper-slide wow animate__fadeInRight-10_percent"
                                :class="$style['course-item']"
                            >
                                <nuxt-img :src="item.thumb" alt="" />
                                <div :class="$style['course-info']">
                                    <div :class="$style['course-title']">
                                        {{ $t(item.title) }}
                                    </div>
                                    <div :class="$style['course-subtitle']">
                                        {{ $t(item.subtitle) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['curse-category']" class="wow-group-5">
                        <div
                            v-for="(cat, index) in courseCat"
                            :key="index"
                            :class="$style['category-list']"
                            class="flex items-start wow animate__fadeInUp-50"
                        >
                            <i class="ic iconfont icon-circle-right-strock"></i>
                            <div :class="$style['item-body']">
                                {{ $t(cat.desc) }}
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
        title: "KEY_PAGE_SCIENCE.COURSE.LIST[0].TITLE",
        subtitle: "KEY_PAGE_SCIENCE.COURSE.LIST[0].SUBTITLE",
        thumb: require("@/assets/images/science/course-1.png"),
    },

    {
        title: "KEY_PAGE_SCIENCE.COURSE.LIST[1].TITLE",
        subtitle: "KEY_PAGE_SCIENCE.COURSE.LIST[1].SUBTITLE",
        thumb: require("@/assets/images/science/course-2.png"),
    },

    {
        title: "KEY_PAGE_SCIENCE.COURSE.LIST[2].TITLE",
        subtitle: "KEY_PAGE_SCIENCE.COURSE.LIST[2].SUBTITLE",
        thumb: require("@/assets/images/science/course-3.png"),
    },
];
const courseCat = [
    {
        desc: "KEY_PAGE_SCIENCE.COURSE.CATS[0]",
    },
    {
        desc: "KEY_PAGE_SCIENCE.COURSE.CATS[1]",
    },
    {
        desc: "KEY_PAGE_SCIENCE.COURSE.CATS[2]",
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
.science-course-intro {
    overflow: hidden;
    .module-header {
        width: 590px;
        margin-bottom: 97px;
    }
    .course-swiper {
        overflow: visible;
    }
    .course-item {
        @include image-placeholder(600px, 360px);
        @include space-between(129px);
        position: relative;

        overflow: visible;

        border-radius: 20px;
        box-shadow: 0 30px 60px rgb(7 47 35 / 0.1);
        &:global(.swiper-slide-active) {
            .course-info {
                color: #fff;
                background: #0aca91;
            }
        }
    }
    .course-info {
        position: absolute;
        z-index: 10;
        top: -50px;
        left: 40px;

        width: 300px;
        padding: 19px 40px 23px;

        transition: 0.26s ease;

        color: #333;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 30px 60px rgb(7 47 35 / 0.1);
    }
    .course-title {
        font-size: 24px;
        font-weight: 700;
        line-height: em(36px, 24px);

        margin-bottom: 1px;
    }
    .course-subtitle {
        font-size: 13px;
        font-weight: 400;
        font-weight: 500;
        line-height: em(20px, 13px);
    }
    .curse-category {
        display: grid;

        margin-top: 111px;

        grid-column-gap: 0;
        grid-row-gap: 0;
        grid-template-columns: repeat(2, 1fr);
    }
    .category-list {
        @include space-between(28px, "y");
        font-size: 14px;
        font-weight: 500;
        line-height: em(30px, 14px);

        color: #333;
        :global(.ic) {
            @include circle(36px);
            @include flex(c, c);
            font-size: 20px;

            flex: 0 0 auto;

            margin-right: 12px;

            color: #fff;
            background-color: #0aca91;
        }
        .item-body {
            padding: 3px 0;
        }
        &:nth-child(1) {
            grid-area: 1 / 1 / 2 / 2;
        }
        &:nth-child(2) {
            grid-area: 2 / 1 / 3 / 2;
        }
        &:nth-child(3) {
            grid-area: 1 / 2 / 3 / 3;
        }
    }
    .swiper-controller {
        position: absolute;
        right: 0;
        bottom: calc(100% + 110px);

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
    @include media-breakpoint-down(xxxl) {
        .course-item {
            @include space-between(90px);

            overflow: visible;

            width: 500px;
        }
        .course-info {
            top: -44px;

            width: 260px;
            padding: 16px 30px 20px;
        }
        .course-title {
            font-size: 21px;
        }
        .course-subtitle {
            font-size: 12px;
        }
        .curse-category {
            margin-top: 100px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .course-item {
            @include space-between(80px);

            overflow: visible;

            width: 420px;
        }
        .course-info {
            top: -42px;

            width: 250px;
            padding: 16px 30px 20px;
        }
        .course-title {
            font-size: 19px;
        }
        .curse-category {
            margin-top: 80px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-header {
            margin-bottom: 80px;
        }
        .course-item {
            @include space-between(56px);

            width: 380px;
        }
        .course-info {
            top: -36px;

            width: 240px;
            padding: 14px 24px 18px;
        }
        .course-title {
            font-size: 16px;
        }
        .curse-category {
            margin-top: 70px;
        }
        .category-list {
            font-size: 12px;
            :global(.ic) {
                font-size: 16px;

                width: 32px;
                height: 32px;
            }
        }
        .swiper-controller {
            bottom: calc(100% + 90px);

            width: 124px;
            .btn--prev,
            .btn--next {
                @include circle(54px);
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .module-header {
            width: 490px;
            max-width: 100%;
        }
        .course-item {
            width: 360px;
            margin-right: 40px;
        }
        .curse-category {
            display: block;
        }
    }
    @include media-breakpoint-down(md) {
        padding-top: 10px;
        .swiper-controller {
            bottom: calc(100% + 146px);

            width: 100px;
            .btn--prev,
            .btn--next {
                @include circle(41px);
                font-size: 12px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 10px;
        .swiper-controller {
            display: none;
        }
        .course-item {
            @include space-between(30px);

            width: 280px;
        }
        .course-info {
            left: 30px;

            width: 200px;
            padding: 12px 20px 14px;
        }
        .course-title {
            font-size: 14px;
        }
    }
}
:global(.lang-en) {
    .science-course-intro {
        .curse-category {
            grid-column-gap: 50px;
            grid-row-gap: 30px;
        }
        .category-list {
            margin-bottom: 0;
            &:nth-child(2) {
                align-self: flex-end;
            }
        }
        @include media-breakpoint-down(xl) {
            .curse-category {
                display: grid;

                grid-template-columns: 1fr;
                & > * {
                    grid-area: initial;
                }
            }
        }
    }
}
</style>
