<template>
    <div ref="Dom" :class="$style['level-intro-module']">
        <div class="wrapper--limit-width">
            <div
                ref="swiperBody"
                :class="$style['module-body']"
                :style="{ backgroundColor: levelIntroList[0].theme }"
            >
                <div
                    class="relative swiper"
                    :class="$style['level-intro-swiper']"
                >
                    <div
                        class="swiper-wrapper"
                        :class="$style['level-intro-list']"
                    >
                        <div
                            v-for="(item, index) in levelIntroList"
                            :key="index"
                            :class="$style['level-intro-item']"
                            :data-theme="item.theme"
                            class="flex justify-between items-center swiper-slide md:flex-col-reverse"
                        >
                            <div
                                :class="$style['item-info']"
                                class="wow animate__fadeInLeft-100"
                            >
                                <div :class="$style['item-head']">
                                    <div :class="$style['item-title']">
                                        <span class="text">{{
                                            $t(item.title)
                                        }}</span>
                                    </div>
                                    <div :class="$style['item-subtitle']">
                                        <span class="text">{{
                                            $t(item.subtitle)
                                        }}</span>
                                    </div>
                                </div>
                                <div
                                    :class="$style['item-desc']"
                                    v-html="$t(item.desc)"
                                ></div>
                            </div>
                            <div :class="$style['item-images-box']">
                                <div :class="$style['item-imgs']">
                                    <nuxt-img
                                        class="relative"
                                        :class="$style['item-thumb']"
                                        :src="item.thumb"
                                        alt=""
                                    />
                                    <nuxt-img
                                        class="relative wow animate__fadeInUp-100 animation-delay-2"
                                        :class="$style['decorate-1']"
                                        src="@/assets/images/chinese/level-icon-1.png"
                                        alt=""
                                    />
                                    <nuxt-img
                                        class="relative wow animate__fadeInUp-50 animation-delay-1"
                                        :class="$style['decorate-2']"
                                        src="@/assets/images/chinese/level-icon-2.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

interface LevelIntroList {
    theme: string;
    subtitle: string;
    title: string;
    desc: string;
    thumb: string;
}

defineProps<{
    levelIntroList: LevelIntroList[];
}>();

const swiperBody = ref<HTMLElement | null>(null);
const Dom = ref<HTMLElement | null>(null);
</script>
<style lang="scss" module>
/* stylelint-disable max-nesting-depth */
.level-intro-module {
    margin-bottom: 161px;
    .module-body {
        overflow: hidden;

        padding: 0 140px;

        border-radius: 60px;
    }
    .level-intro-swiper {
        overflow: visible !important;
    }
    @include media-breakpoint-down(xxxl) {
        margin-bottom: 140px;
        .module-body {
            padding: 0 100px;

            border-radius: 60px;
        }
    }
    @include media-breakpoint-down(xxl) {
        margin-bottom: 130px;
        .module-body {
            padding: 0 80px;

            border-radius: 46px;
        }
    }
    @include media-breakpoint-down(xl) {
        margin-bottom: 120px;
        .module-body {
            padding: 0 50px;

            border-radius: 30px;
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 120px;
        .module-body {
            padding: 0 30px;
        }
    }
    @include media-breakpoint-down(md) {
        .module-body {
            border-radius: 20px;
        }
        .level-intro-swiper {
            padding-bottom: 60px;
        }
    }
    @include media-breakpoint-down(sm) {
        margin-bottom: 70px;
    }
}
.level-intro-list {
    position: relative;

    color: #fff;
}
.level-intro-item {
    overflow: visible !important;
    & ~ .level-intro-item {
        .item-info {
            opacity: 0;
        }
        .item-imgs {
            img {
                display: inline-block;

                opacity: 0;
            }
        }
        .item-images-box {
            .age {
                opacity: 0;
            }
        }
    }
    .item-head {
        position: relative;

        margin-bottom: 30px;
        padding-bottom: 36px;
        &::after {
            position: absolute;
            bottom: 0;
            left: 0;

            width: 40px;
            height: 6px;

            content: "";

            border-radius: 3px;
            background-color: #fff;
        }
    }
    .item-title {
        font-size: 44px;
        font-weight: 700;

        margin-bottom: em(5px, 44px);
    }
    .item-subtitle {
        font-size: 18px;
        line-height: em(30px, 18px);
    }
    .item-desc {
        font-size: 15px;
        line-height: em(30px, 15px);
    }
    .item-info {
        width: 490px;
    }
    .item-images-box {
        position: relative;

        padding-top: 60px;
        padding-right: 180px;
        .age {
            font-family: "Inter";
            font-size: 280px;
            font-weight: 700;
            line-height: em(339px, 280px);

            position: absolute;
            top: 50%;
            right: 0;

            transform: translateY(-68%);

            opacity: 0.1;
        }
    }
    .item-imgs {
        @include image-placeholder(908px, 1282px);
        position: relative;

        display: flex;
        overflow: visible !important;

        width: 368px;

        justify-content: center;
        .item-thumb {
            width: auto;
            max-width: none;
            height: 100%;
        }
        img {
            z-index: 10;
        }
        .decorate-1 {
            position: absolute;
            top: percent(124px, 641px);
            left: percent(-117px, 454px);

            width: percent(195px, 454px);
        }
        .decorate-2 {
            position: absolute;
            top: percent(297px, 641px);
            left: calc(100% + percent(80px, 454px));

            width: percent(179.5px, 454px);
        }
    }
    .item-btn {
        font-size: 17px;
        font-weight: 700;

        display: flex;

        width: em(185px, 17px);
        height: em(56px, 17px);
        padding: em(15px, 17px) 0;

        transition: 0.36s ease;

        border: 2px solid #fff;
        border-radius: em(28px, 17px);

        align-items: center;
        justify-content: center;
        :global(.ic) {
            font-size: em(14px, 17px);

            margin-left: em(10px, 17px);

            vertical-align: middle;
        }
        &:hover {
            color: #333;
            background-color: #fff;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .item-images-box {
            padding-right: 120px;
        }
        .item-subtitle {
            padding-right: 30px;
        }
        .item-imgs {
            width: 350px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .item-images-box {
            padding-top: 60px;
            padding-right: 40px;
            padding-left: 30px;
        }
        .item-imgs {
            width: 350px;
        }
    }
    @include media-breakpoint-down(xl) {
        .item-title {
            font-size: 30px;
        }
        .item-subtitle {
            font-size: 16px;
        }
        .item-desc {
            font-size: 14px;
        }
        .item-imgs {
            width: 290px;
        }
    }
    @include media-breakpoint-down(lg) {
        .item-head {
            margin-bottom: 18px;
            padding-bottom: 22px;
            &::after {
                height: 4px;
            }
        }
        .item-imgs {
            width: 260px;
        }
        .item-title {
            font-size: 24px;
        }
        .item-subtitle {
            font-size: 14px;
        }
        .item-desc {
            font-size: 13px;
        }
        .item-info {
            padding-top: 30px;
        }
    }
    @include media-breakpoint-down(md) {
        .item-head {
            margin-bottom: 14px;
            padding-bottom: 18px;
            &::after {
                height: 4px;
            }
        }
        .item-title {
            font-size: 26px;

            margin-bottom: 4px;
        }
        .item-imgs {
            width: 200px;
            margin: 0 auto;
        }
        .item-info {
            flex: 0 0 auto;

            width: 100%;
            padding-top: 30px;
        }
    }
    @include media-breakpoint-down(sm) {
        .item-imgs {
            width: 180px;
        }
    }
}
:global(.lang-en) {
    @include media-breakpoint-down(xxl) {
        .level-intro-module {
            .module-body {
                padding: 0 62px;

                border-radius: 34px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .level-intro-module {
            .module-body {
                padding: 0 42px;

                border-radius: 34px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .level-intro-module {
            .module-body {
                padding: 0 30px;

                border-radius: 20px;
            }
        }
    }
}
</style>
