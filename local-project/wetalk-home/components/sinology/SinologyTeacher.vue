<!--
 * @Description: 师资介绍
 * @Author: F-Stone
 * @LastEditTime: 2023-01-13 15:43:02
-->
<template>
    <div :class="$style['sinology-teacher']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <ModuleHeader
                    :class="$style['module-head']"
                    :title="$t('KEY_PAGE_SINOLOGY.TEACHER.TITLE')"
                    :desc="$t('KEY_PAGE_SINOLOGY.TEACHER.DESC')"
                />
            </div>
        </div>
        <div :class="$style['module-body']">
            <div class="wrapper--limit-width">
                <div
                    class="wrapper--limit-width-mini flex items-center justify-between md:block"
                >
                    <div :class="$style['module-info']">
                        <div
                            :class="$style['info-list']"
                            class="wow animate__fadeInRight-50"
                        >
                            <div
                                :class="$style['info-item']"
                                class="flex items-center"
                                v-for="(item, index) in infoList"
                                :key="index"
                            >
                                <i
                                    class="ic iconfont flex-shrink-0 icon-circle-right-strock flex items-center justify-center"
                                ></i>
                                <span class="text">{{ $t(item) }}</span>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['teacher-thumb-list']" class="flex">
                        <div :class="$style['teacher-thumb']">
                            <img
                                src="@/assets/images/sinology/teacher-2.png"
                                alt=""
                            />
                        </div>
                        <div :class="$style['teacher-thumb']">
                            <img
                                src="@/assets/images/sinology/teacher-1.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const infoList = [
    "KEY_PAGE_SINOLOGY.TEACHER.LIST[0]",
    "KEY_PAGE_SINOLOGY.TEACHER.LIST[1]",
    "KEY_PAGE_SINOLOGY.TEACHER.LIST[2]",
];
</script>
<style lang="scss" module>
.sinology-teacher {
    position: relative;

    overflow: hidden;
    .module-head {
        width: 670px;
        max-width: 60%;
        margin-bottom: 60px;
    }
    .module-body {
        margin-top: -52px;

        background-image: url("@/assets/images/sinology/bg.png"),
            linear-gradient(0deg, #e4f0ff 0%, rgb(228 240 255 / 0) 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 35.4166666666667% auto, auto auto;
    }
    .info-list {
        font-size: 16px;
        font-weight: 500;
        line-height: em(30px, 16px);

        padding: em(43px, 16px) em(70px, 16px) em(43px, 16px) em(55px, 16px);

        color: #333;
        border-radius: em(16px, 16px);
        background-color: #fff;

        backdrop-filter: blur(10px);
    }
    .info-item {
        @include space-between(em(33px, 16px), "y");
        :global(.ic) {
            @include circle(em(36px, 20px));

            font-size: em(20px, 16px);

            margin-right: em(15px, 20px);

            color: #fff;
            background: #0aca91;
        }
    }
    .teacher-thumb-list {
        position: relative;

        width: 71.9%;
        // height: 668px;
        margin-right: -6.4327485380117%;
    }
    .teacher-thumb {
        @include image-placeholder(1010px, 1376px);

        // width: 505px;
        width: min(505px, 52%);
        &:first-child {
            margin-right: -26px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-info {
            //
        }
        .info-list {
            font-size: 14px;
        }
    }
    @include media-breakpoint-down(xl) {
        .info-list {
            font-size: 13px;
        }
        .teacher-thumb-list {
            width: 70%;
        }
    }
    @include media-breakpoint-down(lg) {
        .module-head {
            max-width: 100%;
            margin-bottom: 20px;
        }
        .module-body {
            padding-top: 70px;
        }
        .info-list {
            padding: 40px 30px;
            .info-item {
                @include space-between(20px, y);
            }
        }
    }
    @include media-breakpoint-down(md) {
        .module-body {
            padding-top: 70px;
        }
        // .info-list {
        //     position: absolute;
        //     z-index: 10;
        //     top: 30%;

        //     padding: 30px 20px;
        //     .info-item {
        //         @include space-between(20px, y);
        //     }
        // }
        .info-list {
            position: relative;

            margin-bottom: 30px;
            padding: 30px 20px;
            .info-item {
                @include space-between(20px, y);
            }
        }
        .teacher-thumb-list {
            width: 100%;

            justify-content: center;
        }
        .teacher-thumb:first-child {
            margin-right: -0;
        }
    }
    @include media-breakpoint-down(sm) {
        .module-body {
            padding-top: 70px;
        }
    }
}
:global(.lang-en) {
    .sinology-teacher {
        .info-item {
            align-items: flex-start;
            :global(.ic) {
                transform: translateY(-2px);
            }
        }
        @include media-breakpoint-down(xxl) {
            .info-item {
                @include space-between(em(20px, 16px), "y");
                // padding: em(33px, 16px) em(70px, 16px) em(33px, 16px)
                // em(55px, 16px);
            }
        }
        @include media-breakpoint-down(xl) {
            .teacher-thumb-list {
                width: 100%;
            }
        }
        @include media-breakpoint-down(lg) {
            :global(.wrapper--limit-width-mini) {
                display: block;
            }
            .module-body {
                padding-top: 100px;
            }
            .teacher-thumb-list {
                width: 80%;
                margin: 0 auto;
            }
        }
    }
}
</style>
