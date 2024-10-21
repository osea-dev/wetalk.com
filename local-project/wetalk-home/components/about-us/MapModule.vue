<template>
    <div :class="$style['map-module']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['module-body']" class="relative">
                    <div :class="$style['module-intro']">
                        <h3 :class="$style['module-title']">
                            {{ $t("KEY_PAGE_ABOUT.MAP.TITLE") }}
                        </h3>
                        <p :class="$style['module-desc']">
                            {{ $t("KEY_PAGE_ABOUT.MAP.SUBTITLE") }}
                        </p>
                        <div
                            :class="$style['counter-list']"
                            class="grid grid-cols-3 wow wow-group-3"
                        >
                            <div
                                :class="$style['counter-item']"
                                class="wow animate__fadeInUp-50"
                            >
                                <div :class="$style['counter-group']">
                                    <span :class="$style['counter']">03</span>
                                    <sup :class="$style['unit']">+</sup>
                                </div>
                                <div :class="$style['counter-title']">
                                    <span class="text">{{
                                        $t("KEY_PAGE_ABOUT.MAP.LIST[0]")
                                    }}</span>
                                </div>
                            </div>
                            <div
                                :class="$style['counter-item']"
                                class="wow animate__fadeInUp-50"
                            >
                                <div :class="$style['counter-group']">
                                    <span :class="$style['counter']">18</span>
                                    <sup :class="$style['unit']">+</sup>
                                </div>
                                <div :class="$style['counter-title']">
                                    <span class="text">{{
                                        $t("KEY_PAGE_ABOUT.MAP.LIST[1]")
                                    }}</span>
                                </div>
                            </div>
                            <div
                                :class="$style['counter-item']"
                                class="wow animate__fadeInUp-50"
                            >
                                <div :class="$style['counter-group']">
                                    <span :class="$style['counter']">10w</span>
                                    <sup :class="$style['unit']">+</sup>
                                </div>
                                <div :class="$style['counter-title']">
                                    <span class="text">{{
                                        $t("KEY_PAGE_ABOUT.MAP.LIST[2]")
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        :class="$style['module-map']"
                        class="wow animate__fadeInRight-50"
                    >
                        <nuxt-img
                            src="@/assets/images/about-us/map.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" module>
.map-module {
    padding-top: 120px;
    .module-body {
        padding-bottom: 100px;

        border-bottom: 1px solid #e1e5f1;
    }
    .module-intro {
        position: relative;
        z-index: 10;

        max-width: 610px;
        height: 520px;
    }
    .module-title {
        font-size: 36px;
        font-weight: 700;
        line-height: 2em;

        margin-bottom: 40px;
    }
    .module-desc {
        font-size: 16px;
        font-weight: 500;
        line-height: 2em;

        color: var(--t-c-lighter);
    }
    .counter-list {
        margin-top: 75px;
    }
    .counter-item {
        font-family: "Poppins";
        font-size: 50px;
        font-weight: 700;
        line-height: 1em;

        padding: 0.5em 0;
        .counter-group {
            position: relative;

            float: left;
            clear: both;
            &::after {
                clear: both;

                content: "";
            }
            span {
                float: left;
            }
        }
        .counter-title {
            font-size: 13px;
            line-height: 2em;

            clear: both;

            color: var(--t-c-lighter);
        }
    }
    .module-map {
        @include image-placeholder(810px, 520px);
        position: absolute;
        top: 0;
        right: 0;

        max-width: 100%;
        height: 100%;
    }
    @include media-breakpoint-down(xl) {
        .module-desc {
            font-size: 15px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-title {
            margin-bottom: 30px;
        }
        .module-body {
            padding-bottom: 70px;
        }
        .module-desc {
            font-size: 14px;
        }
        .counter-item {
            font-size: 40px;
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: 100px;
        .module-intro {
            max-width: 100%;
            height: 440px;
        }
    }
    @include media-breakpoint-down(md) {
        padding-top: 90px;
        .module-title {
            font-size: 32px;

            margin-bottom: 26px;
        }
        .module-body {
            padding-bottom: 50px;
        }
        .module-desc {
            font-size: 13px;
        }
        .counter-item {
            font-size: 32px;
        }
        .module-intro {
            height: 400px;
        }
        .counter-list {
            margin-top: 70px;

            gap: 14px;
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 90px;
        .module-title {
            font-size: 28px;

            margin-bottom: 26px;
        }
        .module-body {
            padding-bottom: 60px;
        }
        .module-desc {
            font-size: 14px;
        }
        .module-intro {
            height: auto;
        }
        .counter-list {
            margin-top: 50px;

            grid-template-columns: 1fr;
        }
    }
}
:global(.lang-en) {
    @include media-breakpoint-down(xxl) {
        .map-module {
            .module-title {
                font-size: 32px;
            }
            .module-desc {
                font-size: 15px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .map-module {
            .module-desc {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .map-module {
            .module-title {
                font-size: 28px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .map-module {
            .module-title {
                line-height: 1.4;
            }
        }
    }
}
</style>
