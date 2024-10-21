<!--
 * @Description: 课程特色
 * @Author: F-Stone
 * @LastEditTime: 2023-01-03 18:00:58
-->
<template>
    <div :class="$style['sinology-course-features']">
        <div class="wrapper--limit-width">
            <div
                class="wrapper--limit-width-mini flex justify-between lg:items-center md:block"
                :class="$style['module-body']"
            >
                <div class="state-pos--left">
                    <ModuleHeader
                        :title="$t('KEY_PAGE_SINOLOGY.FEATURES.TITLE')"
                        :desc="$t('KEY_PAGE_SINOLOGY.FEATURES.DESC')"
                    />
                    <div :class="$style['intro-list']" class="wow-group-3">
                        <div
                            v-for="(item, index) in introList"
                            :key="index"
                            :class="$style['intro-item']"
                            class="flex items-center wow animate__fadeInUp-50"
                        >
                            <i class="ic iconfont icon-fill-circle-right"></i>
                            <span class="text">{{ $t(item) }}</span>
                        </div>
                    </div>
                </div>
                <div class="state-pos--right wow animate__fadeInRight-50">
                    <div :class="$style['thumb-box']">
                        <nuxt-img
                            src="@/assets/images/sinology/course-feature.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const introList = [
    "KEY_PAGE_SINOLOGY.FEATURES.LIST[0]",
    "KEY_PAGE_SINOLOGY.FEATURES.LIST[1]",
    "KEY_PAGE_SINOLOGY.FEATURES.LIST[2]",
];
</script>
<style lang="scss" module>
.sinology-course-features {
    overflow: hidden;
    :global {
        .state-pos--left {
            width: 522px;
            margin-right: 70px;
            padding-top: 64px;
        }
        .state-pos--right {
            width: 708px;
        }
    }
    .intro-list {
        margin-top: 74px;
    }
    .intro-item {
        @include space-between(em(35px, 18px), "y");
        font-size: 18px;
        font-weight: 400;
        line-height: em(34px, 18px);

        color: #191a15;
        :global(.ic) {
            font-size: em(30px, 18px);

            margin-right: em(13px, 18px);

            color: #0aca91;
        }
    }
    .thumb-box {
        @include image-placeholder(955px, 881px);
        width: 100%;
    }
    @include media-breakpoint-down(xxxl) {
        .intro-item {
            font-size: 16px;
        }
    }
    @include media-breakpoint-down(xxl) {
        :global {
            .state-pos--left {
                width: 562px;
                padding-top: 50px;
            }
            .state-pos--right {
                width: 608px;
            }
        }
        .intro-list {
            margin-top: 64px;
        }
    }
    @include media-breakpoint-down(xl) {
        :global {
            .state-pos--left {
                padding-top: 42px;
            }
        }
        .intro-list {
            margin-top: 40px;
            .intro-item {
                @include space-between(20px, y);
                font-size: 14px;
                :global(.ic) {
                    margin-top: 2px;
                    margin-right: 10px;
                }
            }
        }
    }
    @include media-breakpoint-down(md) {
        :global {
            .state-pos--left {
                width: 100%;
                padding-top: 50px;
            }
            .state-pos--right {
                width: 70%;
                margin: 0 auto;
                margin-top: 60px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        :global {
            .state-pos--left {
                padding-top: 10px;
            }
            .state-pos--right {
                width: 80%;
            }
        }
    }
}
:global(.lang-en) {
    .sinology-course-features {
        :global(.state-pos--left) {
            padding-top: 42px;
        }
        .intro-item {
            font-size: 17px;

            align-items: flex-start;
            :global(.ic) {
                transform: translateY(2px);
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        .sinology-course-features {
            .intro-item {
                font-size: 16px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .sinology-course-features {
            :global(.state-pos--left) {
                padding-top: 22px;
            }
            .intro-item {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .sinology-course-features {
            :global(.state-pos--left) {
                margin-right: 40px;
                padding-top: 0;
            }
            :global(.state-pos--right) {
                width: 628px;
            }
            .intro-item {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .sinology-course-features {
            :global(.state-pos--left),
            :global(.state-pos--right) {
                width: 100%;
            }
            .module-body {
                display: block;
            }
            .thumb-box {
                width: 50%;
                margin: 0 auto;
                margin-top: 80px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .sinology-course-features {
            .thumb-box {
                width: 80%;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .sinology-course-features {
            .thumb-box {
                width: 80%;
            }
        }
    }
}
</style>
