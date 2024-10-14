<!--
 * @Description: 优秀学生成功故事
 * @Author: F-Stone
 * @LastEditTime: 2022-09-26 18:27:09
-->
<template>
    <div :class="$style['list-card']" ref="Dom">
        <div :class="$style['swiper-box']">
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
                class="swiper wow animate__fadeIn"
                :class="$style['list-swiper']"
            >
                <div
                    class="swiper-wrapper"
                    :class="$style['list-swiper-wrapper']"
                >
                    <div
                        class="swiper-slide"
                        :class="$style['list-swiper-slide']"
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <div :class="$style['list-card']">
                            <div
                                :class="$style['item-header']"
                                class="flex items-center"
                            >
                                <div :class="$style['student-thumb']">
                                    <img :src="item.thumb" alt="" />
                                </div>
                                <div :class="$style['student-name']">
                                    <span class="text">{{ item.name }}</span>
                                </div>
                            </div>
                            <div :class="$style['item-body']">
                                <p class="text">{{ item.desc }}</p>
                            </div>
                            <div :class="$style['item-footer']" class="flex">
                                <i
                                    class="ic iconfont icon-start"
                                    v-for="(_start, i) in item.score"
                                    :key="i"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, useCssModule } from "vue";
import { useContext } from "@nuxtjs/composition-api";
const Dom = ref<HTMLElement | null>(null);
const $sn = useCssModule();
defineProps<{
    list: {
        thumb: string;
        name: string;
        desc: string;
        score: number;
    }[];
}>();

const { $Swiper } = useContext();
onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dom = Dom.value!;
    const slider = $(dom).find(".swiper")[0];
    const swiper = new $Swiper(slider, {
        slidesPerView: "auto",
        effect: "creative",
        grabCursor: true,
        loop: true,
        watchSlidesProgress: true,
        updateOnWindowResize: true,
        navigation: {
            prevEl: $(dom).find(`.${$sn["btn--prev"]}`)[0],
            nextEl: $(dom).find(`.${$sn["btn--next"]}`)[0],
        },
        creativeEffect: {
            perspective: true,
            limitProgress: 1,
            shadowPerProgress: true,
            prev: {
                translate: ["0%", 0, -120],
                rotate: [0, 0, -6],
            },
            next: {
                translate: ["calc(100% + 20px)", 0, 0],
                rotate: [0, 0, 0],
            },
        },
        speed: 500,
        observer: true,
        observeParents: true,
    });
    onBeforeUnmount(() => swiper.destroy());
});
</script>
<style lang="scss" module>
.list-card {
    padding-top: 5px;
    .list-swiper-slide {
        overflow: visible !important;

        height: 100%;
    }
    .list-card {
        padding: 52px;

        transition: 0.36s ease;

        border: 2px solid #e9eef4;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 0 rgb(7 47 35 / 0.1);
        &:hover {
            border-color: #0aca91;
            box-shadow: 0 30px 60px rgb(7 47 35 / 0.1);
        }
    }
    .list-swiper {
        overflow: visible;

        width: calc(50% - 10px);
        margin: 0;
    }
    .swiper-controller {
        position: absolute;
        right: 0;
        bottom: calc(100% + 45px);

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
    .swiper-box {
        position: relative;

        // margin-bottom: -60px;
    }
    // .list-swiper-wrapper {
    //     padding-bottom: 60px;
    // }
    .item-header {
        font-size: 24px;

        margin-bottom: em(32px, 24px);
        .student-thumb {
            @include circle(em(64px, 24px));
            overflow: hidden;

            margin-right: em(18px, 24px);
            img {
                width: 100%;

                object-fit: contain;
            }
        }
        .student-name {
            font-family: "Inter";
            font-weight: 700;
        }
    }
    .item-body {
        @include ellipse(4, em(30px, 14px), 1);
        font-size: 14px;
        line-height: em(30px, 14px);

        margin-bottom: em(33px, 14px);

        color: #838383;
    }
    .item-footer {
        :global(.ic) {
            @include circle(36px);
            @include space-between(2px);
            display: flex;

            color: #ffc728;
            background-color: rgba(#ffc728, 0.1);

            align-items: center;
            justify-content: center;
        }
    }
    @include media-breakpoint-down(xxl) {
        .list-card {
            padding: 42px;
        }
        .swiper-controller {
            bottom: calc(100% + 35px);

            width: 120px;
            .btn--prev,
            .btn--next {
                @include circle(50px);
            }
        }
        .item-header {
            font-size: 20px;
        }
        .item-body {
            @include ellipse(5, em(30px, 14px), 1);
            font-size: 13px;
        }
        .item-footer {
            :global(.ic) {
                @include circle(32px);
                font-size: 13px;
            }
        }
    }
}
</style>
