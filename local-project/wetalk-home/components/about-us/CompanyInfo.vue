<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-03 21:00:07
-->
<template>
    <div :class="$style['company-info-module']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['module-head']" class="flex">
                    <div class="state-pos--left">
                        <h2 :class="$style['module-title']">
                            {{ $t("KEY_PAGE_ABOUT.COMPANY.TITLE") }}
                        </h2>
                        <h3 :class="$style['module-subtitle']">
                            {{ $t("KEY_PAGE_ABOUT.COMPANY.SUBTITLE") }}
                        </h3>
                        <p
                            :class="$style['module-desc']"
                            v-html="$t('KEY_PAGE_ABOUT.COMPANY.DESC')"
                        ></p>
                    </div>
                    <div class="state-pos--right">
                        <div :class="$style['module-thumb']">
                            <nuxt-img
                                src="@/assets/images/about-us/company-thumb.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div
                    :class="$style['module-body']"
                    class="flex"
                    v-html="$t('KEY_PAGE_ABOUT.COMPANY.BODY')"
                ></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" module>
.company-info-module {
    padding-top: 190px;
    padding-bottom: 122px;
    .module-head {
        margin-bottom: 52px;
        :global(.state-pos--left) {
            width: 50%;
            margin-right: 90px;

            border-bottom: 1px solid #e1e5f1;
        }
        :global(.state-pos--right) {
            width: 50%;
        }
    }
    .module-title {
        font-size: 32px;
        font-weight: 700;
        line-height: 200%;

        margin-bottom: -14px;
    }
    .module-subtitle {
        font-size: 18px;
        font-weight: 700;
        line-height: 200%;

        color: var(--t-c-lighter);
    }
    .module-desc {
        font-size: 16px;
        line-height: 200%;

        max-width: 600px;
        margin-top: 70px;
    }
    .module-body {
        font-size: 16px;
        line-height: 200%;
        p {
            width: 50%;
            &:first-child {
                margin-right: 90px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        padding-top: 150px;
        .module-desc {
            font-size: 15px;
        }
        .module-body {
            font-size: 15px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-desc {
            font-size: 14px;
        }
        .module-body {
            font-size: 14px;
            p {
                &:first-child {
                    margin-right: 60px;
                }
            }
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: 100px;
        .module-head {
            display: block;

            margin-bottom: 44px;
            padding-bottom: 50px;

            border-bottom: 1px solid #e1e5f1;
            :global(.state-pos--left) {
                width: 100%;
                margin-right: 0;

                border-bottom-width: 0;
            }
            :global(.state-pos--right) {
                width: 100%;
                padding-top: 30px;
            }
        }
        .module-title {
            font-size: 28px;

            margin-bottom: -10px;
        }
        .module-desc {
            max-width: 100%;
            margin-top: 30px;
            padding-bottom: 30px;
        }
        .module-thumb {
            width: 300px;
        }
        .module-body {
            display: block;
            p {
                @include space-between(30px, y);
                width: 100%;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .module-title {
            font-size: 24px;

            margin-bottom: -6px;
        }
        .module-subtitle {
            font-size: 16px;
        }
        .module-desc {
            font-size: 13px;
        }
        .module-thumb {
            width: 300px;
            max-width: 100%;
        }
        .module-body {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 65px;
        padding-bottom: 70px;
        .module-desc {
            font-size: 14px;
        }
        .module-thumb {
            max-width: 60%;
        }
        .module-body {
            font-size: 14px;
        }
    }
}
:global(.lang-en) {
    .company-info-module {
        .module-title {
            line-height: 1.2;

            margin-bottom: 0;
        }
        @include media-breakpoint-down(xxxl) {
            .module-title {
                font-size: 28px;
            }
        }
        @include media-breakpoint-down(xxl) {
            .module-title {
                margin-bottom: 0.5em;
            }
        }
        @include media-breakpoint-down(xl) {
            .module-subtitle {
                font-size: 17px;
            }
            .module-head {
                :global(.state-pos--left) {
                    margin-right: 40px;
                }
            }
            .module-desc {
                margin-top: 35px;
                padding-bottom: 52px;
            }
        }
        @include media-breakpoint-down(md) {
            padding-top: 70px;
        }
        @include media-breakpoint-down(sm) {
            .module-title {
                font-size: 26px;
            }
            .module-subtitle {
                font-size: 15px;
            }
        }
    }
}
</style>
