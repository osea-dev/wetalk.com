<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-03 18:47:41
-->
<template>
    <div :class="$style['science-education']">
        <div class="wrapper--limit-width">
            <div :class="$style['module-body']">
                <div :class="$style['module-container']">
                    <div
                        :class="$style['module-header']"
                        class="wow animate__fadeInUp-50"
                    >
                        <h3 :class="$style['module-title']">
                            {{ $t("KEY_PAGE_SCIENCE.EDUCATION.TITLE") }}
                        </h3>
                    </div>
                    <div
                        :class="$style['module-info']"
                        class="grid grid-cols-2 wow-group-2 sm:grid-cols-1"
                    >
                        <p class="text relative z-10 wow animate__fadeInUp-50">
                            {{ $t("KEY_PAGE_SCIENCE.EDUCATION.DESC[0]") }}
                        </p>
                        <p class="text relative z-10 wow animate__fadeInUp-50">
                            {{ $t("KEY_PAGE_SCIENCE.EDUCATION.DESC[1]") }}
                        </p>
                        <div :class="$style['module-bg']">
                            <nuxt-img
                                src="@/assets/images/science/edu-bg.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        :class="$style['module-footer']"
                        class="wow animate__fadeInUp-50"
                    >
                        <i class="ic"></i>
                        <span class="text">WeTalk education</span>
                    </div>
                    <div
                        :class="$style['wrapper-bar']"
                        class="h-0 flex items-center"
                    >
                        <div
                            :class="$style['module-bar']"
                            class="grid grid-cols-3 wow animate__flipInX lg:grid-cols-1 lg:w-full"
                        >
                            <div
                                v-for="(item, index) in introList"
                                :key="index"
                                :class="$style['intro-item']"
                                class="flex"
                            >
                                <div :class="$style['intro-thumb']">
                                    <nuxt-img :src="item.icon" alt="" />
                                </div>
                                <div :class="$style['intro-info']">
                                    <div :class="$style['intro-title']">
                                        {{ $t(item.title) }}
                                    </div>
                                    <div :class="$style['intro-subtitle']">
                                        {{ $t(item.subtitle) }}
                                    </div>
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
const introList = [
    {
        icon: require("@/assets/images/science/icon-1.png"),
        title: "KEY_PAGE_SCIENCE.EDUCATION.LIST[0].TITLE",
        subtitle: "KEY_PAGE_SCIENCE.EDUCATION.LIST[0].SUBTITLE",
    },
    {
        icon: require("@/assets/images/science/icon-2.png"),
        title: "KEY_PAGE_SCIENCE.EDUCATION.LIST[1].TITLE",
        subtitle: "KEY_PAGE_SCIENCE.EDUCATION.LIST[1].SUBTITLE",
    },
    {
        icon: require("@/assets/images/science/icon-3.png"),
        title: "KEY_PAGE_SCIENCE.EDUCATION.LIST[2].TITLE",
        subtitle: "KEY_PAGE_SCIENCE.EDUCATION.LIST[2].SUBTITLE",
    },
];
</script>
<style lang="scss" module>
.science-education {
    padding-bottom: 85px;
    .module-header {
        font-size: 36px;
        line-height: em(48px, 36px);

        position: relative;
        z-index: 1;

        margin-bottom: em(44px, 36px);
    }
    .module-title {
        font-weight: 900;

        color: #2d2b32;
    }
    .module-body {
        padding-top: 140px;

        border-radius: 60px;
        background: linear-gradient(
            0deg,
            rgb(255 227 141 / 0.1) 0.03%,
            rgb(255 205 56 / 0.3) 100%
        );
    }
    .module-container {
        width: 89.0625%;
        margin: 0 auto;
    }
    .module-info {
        font-size: 20px;
        font-weight: 500;
        line-height: em(40px, 20px);

        position: relative;

        color: #2d2b32;

        gap: min(117px, 10%);
        .module-bg {
            @include image-placeholder(335px, 270px);
            position: absolute;
            right: 0;

            transform: translateY(-50%);
        }
    }
    .module-footer {
        font-family: "Poppins";
        font-size: 16px;
        font-weight: 500;
        line-height: em(26px, 16px);

        position: relative;

        margin-top: 44px;
        padding-left: 32px;

        color: #2d2b32;
        :global(.ic) {
            @include circle(em(8px, 28px), #ffcc35);
            font-size: 28px;

            position: absolute;
            top: 50%;
            left: 0;

            margin-top: em(-4px, 28px);
            &::after {
                position: absolute;
                top: 0;
                left: em(12px, 28px);

                width: em(8px, 28px);
                height: em(8px, 28px);

                content: "";

                border: 2px solid #ffcc35;
                border-radius: 50%;
            }
        }
    }
    .wrapper-bar {
        margin-top: 161px;
    }
    .module-bar {
        padding: 38px 80px 33px;

        // transform: translateY(50%);

        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 30px 60px rgb(216 198 143 / 0.3);

        gap: min(126px, 11%);
        .intro-thumb {
            @include image-placeholder(125px, 125px);
            flex: 0 0 auto;

            width: 62px;
            margin-right: 30px;
        }
        .intro-title {
            font-size: 18px;
            font-weight: 700;
            line-height: em(26px, 18px);

            margin-bottom: em(7px, 18px);
            padding-top: 2px;

            color: #12141d;
        }
        .intro-subtitle {
            font-size: 12px;
            line-height: em(22px, 12px);

            opacity: 0.7;
            color: #12141d;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .module-body {
            padding-top: 100px;

            border-radius: 50px;
        }
        .module-info {
            font-size: 18px;
            .module-bg {
                width: 300px;
            }
        }
        .module-header {
            font-size: 34px;
        }
        .module-bar {
            padding: 38px 60px 33px;

            gap: 60px;
            .intro-thumb {
                width: 60px;
                margin-right: 24px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-body {
            padding-top: 94px;
        }
        .module-header {
            font-size: 32px;
        }
        .module-info {
            font-size: 16px;
            .module-bg {
                width: 260px;
            }
        }
        .module-bar {
            padding: 38px 40px 33px;

            gap: 30px;
            .intro-thumb {
                width: 56px;
                margin-right: 20px;
            }
            .intro-title {
                font-size: 16px;
            }
        }
        .wrapper-bar {
            margin-top: 140px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-body {
            padding-top: 64px;

            border-radius: 30px;
        }
        .module-header {
            font-size: 28px;
        }
        .module-info {
            font-size: 13px;
            .module-bg {
                width: 220px;
            }
        }
        .module-footer {
            font-size: 14px;

            padding-left: 28px;
            :global(.ic) {
                font-size: 22px;

                margin-top: -4px;
            }
        }
        .module-bar {
            padding: 33px 28px 28px;

            gap: 30px;
            .intro-thumb {
                width: 50px;
                margin-right: 12px;
            }
            .intro-title {
                font-size: 14px;
            }
        }
        .wrapper-bar {
            margin-top: 140px;
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 160px !important;
        .module-info {
            gap: 20px;
        }
        .wrapper-bar {
            margin-top: 190px;
        }
        .module-bar {
            padding: 40px;

            gap: 40px;
        }
    }
    @include media-breakpoint-down(sm) {
        margin-bottom: 200px !important;
        .module-body {
            padding-top: 40px;
        }
        .module-header {
            font-size: 26px;

            position: relative;
            z-index: 100;

            margin-bottom: 20px;
        }
        .module-container {
            width: 80%;
        }
        .wrapper-bar {
            margin-top: 270px;
        }
        .module-bar {
            padding: 40px 30px;

            gap: 40px;
            .intro-thumb {
                margin-right: 20px;
            }
        }
    }
}
:global(.lang-en) {
    .science-education {
        @include media-breakpoint-down(xxl) {
            .module-header {
                font-size: 30px;
            }
            .module-info {
                font-size: 14px;
            }
            .module-body {
                padding-top: 80px;
            }
            .module-bar {
                .intro-title {
                    font-size: 14px;

                    padding-top: 7px;
                }
            }
        }
        @include media-breakpoint-down(xl) {
            .module-header {
                font-size: var(--module-title-size);
            }
            .module-body {
                padding-top: 64px;
            }
            .module-info {
                font-size: 13px;

                grid-template-columns: 1fr;
            }
            .module-bar {
                .intro-title {
                    padding-top: 16px;
                }
            }
        }
        @include media-breakpoint-down(md) {
            .module-bar {
                .intro-title {
                    padding-top: 5px;
                }
            }
            .module-body {
                padding-top: 40px;
            }
        }
        @include media-breakpoint-down(sm) {
            .wrapper-bar {
                margin-top: 210px;
            }
            .module-bar {
                .intro-title {
                    font-size: 12px;
                }
                & > * {
                    align-items: center;
                }
            }
        }
    }
}
</style>
