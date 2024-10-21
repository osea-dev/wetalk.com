<!--
 * @Description: 众语国学堂
 * @Author: F-Stone
 * @LastEditTime: 2023-01-03 17:53:59
-->
<template>
    <div :class="$style['sinology-education']">
        <div class="wrapper--limit-width">
            <div :class="$style['module-body']">
                <div
                    :class="$style['module-container']"
                    class="flex items-center justify-between md:block"
                >
                    <div class="state-pos--left wow animate__fadeInLeft-50">
                        <div :class="$style['module-head']">
                            <h3 :class="$style['module-title']">
                                {{ $t("KEY_PAGE_SINOLOGY.EDUCATION.TITLE") }}
                            </h3>
                        </div>
                        <div :class="$style['module-info']">
                            <p :class="$style['module-subtitle']">
                                {{ $t("KEY_PAGE_SINOLOGY.EDUCATION.SUBTITLE") }}
                            </p>
                            <p :class="$style['module-desc']">
                                {{ $t("KEY_PAGE_SINOLOGY.EDUCATION.DESC") }}
                            </p>
                        </div>
                        <div :class="$style['module-footer']">
                            <i class="ic"></i>
                            <span class="text">WeTalk education</span>
                        </div>
                    </div>
                    <div class="state-pos--right wow animate__fadeInRight-50">
                        <div :class="$style['edu-thumb']">
                            <img
                                src="@/assets/images/sinology/edu.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" module>
.sinology-education {
    .module-body {
        font-size: min(16px, vw(16px, 1920px));

        border-radius: 60px;
        background: linear-gradient(
            360deg,
            #e4f0ff 0%,
            rgb(228 240 255 / 0) 100%
        );
    }
    .module-container {
        width: 89.0625%;
        margin: 0 auto;
        padding: em(70px, 16px) em(50px, 16px) em(42px, 16px);
        :global(.state-pos--left) {
            width: min(531px, 42%);
            padding-bottom: em(50px, 16px);
        }
        :global(.state-pos--right) {
            width: min(545px, 50%);
        }
    }
    .edu-thumb {
        @include image-placeholder(1090px, 976px);
        width: 100%;
    }
    .module-head {
        font-size: 36px;
        font-weight: 900;
        line-height: em(48px, 36px);

        margin-bottom: em(44px, 36px);

        color: #2d2b32;
    }
    .module-subtitle {
        font-size: 20px;
        font-weight: 500;
        line-height: em(40px, 20px);

        margin-bottom: em(17px, 20px);

        color: #2d2b32;
    }
    .module-desc {
        font-size: 14px;
        font-weight: 500;
        line-height: 30px;

        color: #808389;
    }
    .module-footer {
        font-family: "Poppins";
        font-size: 16px;
        font-weight: 500;
        line-height: em(26px, 16px);

        position: relative;

        margin-top: 116px;
        padding-left: 32px;

        color: #2d2b32;
        :global(.ic) {
            @include circle(em(8px, 28px), #0aca91);
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

                border: 2px solid #0aca91;
                border-radius: 50%;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-container {
            padding: em(70px, 16px) em(50px, 16px) em(70px, 16px);
            :global(.state-pos--left) {
                width: min(531px, 44%);
            }
            :global(.state-pos--right) {
                width: min(545px, 46%);
            }
        }
        .module-head {
            font-size: 32px;
        }
        .module-subtitle {
            font-size: 16px;
        }
        .module-footer {
            margin-top: 80px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-container {
            padding: em(60px, 16px) em(10px, 16px);
            :global(.state-pos--left) {
                padding-bottom: 10px;
            }
            :global(.state-pos--right) {
                width: min(545px, 44%);
            }
        }
        .module-head {
            font-size: 28px;

            margin-bottom: 18px;
        }
        .module-subtitle {
            font-size: 14px;
        }
        .module-desc {
            font-size: 13px;
        }
        .module-body {
            border-radius: 40px;
        }
        .module-footer {
            font-size: 15px;

            margin-top: 70px;
            padding-left: 28px;
            :global(.ic) {
                font-size: 22px;

                margin-top: -4px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .module-container {
            :global(.state-pos--left) {
                width: 100%;
            }
            :global(.state-pos--right) {
                width: 50%;
                margin: 0 auto;
                padding: 40px 0;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .module-body {
            border-radius: 20px;
        }
        .module-container {
            :global(.state-pos--right) {
                width: 80%;
            }
        }
    }
}
:global(.lang-en) {
    .sinology-education {
        @include media-breakpoint-down(xxxl) {
            .module-head {
                font-size: 27px;
            }
            .module-subtitle {
                font-size: 16px;
            }
            .module-container {
                padding: 4.375em 3.125em 4.625em;
                :global(.state-pos--left) {
                    width: min(531px, 49%);
                    padding-bottom: 0;
                }
                :global(.state-pos--right) {
                    width: min(545px, 40%);
                }
            }
            .module-footer {
                margin-top: 86px;
            }
        }
        @include media-breakpoint-down(xxl) {
            .module-head {
                font-size: 26px;
            }
            .module-subtitle {
                font-size: 14px;
            }
            .module-container {
                padding: 4.375em 0 4.625em;
                :global(.state-pos--left) {
                    width: min(531px, 52%);
                }
            }
        }
        @include media-breakpoint-down(lg) {
            .module-container {
                display: block;

                padding: 6.375em 3.125em 8.625em;
                :global(.state-pos--left) {
                    width: 100%;
                    padding-bottom: 0;
                }
                :global(.state-pos--right) {
                    width: 60%;
                    margin: 0 auto;
                    margin-top: 80px;
                }
            }
        }
        @include media-breakpoint-down(md) {
            .module-container {
                padding: 3.75em 0.625em;
                .module-footer {
                    margin-top: 70px;
                }
                :global(.state-pos--right) {
                    width: 70%;
                    margin: 0 auto;
                    margin-top: 40px;
                }
            }
        }
    }
}
</style>
