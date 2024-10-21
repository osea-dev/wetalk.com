<template>
    <div :class="$style['lesson-intro-module']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['module-body']">
                    <div :class="$style['intro-card']">
                        <div
                            :class="$style['card-list']"
                            class="grid grid-cols-3 gap-10 wow wow-group-3 xxl:gap-7 xl:gap-5 lg:grid-cols-1"
                        >
                            <div
                                v-for="(item, index) in introCardList"
                                :key="index"
                                :class="$style['card-item']"
                                class="wow animate__fadeInUp-50 lg:grid lg:grid-cols-2 sm:block"
                            >
                                <div :class="$style['item-thumb']">
                                    <img :src="item.thumb" alt="" />
                                </div>
                                <div :class="$style['item-intro']">
                                    <div :class="$style['item-title']">
                                        {{ $t(item.title) }}
                                    </div>
                                    <div :class="$style['item-desc']">
                                        {{ $t(item.desc) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    :class="$style['module-footer']"
                    class="wow animate__fadeInUp-50"
                    v-html="$t('KEY_PAGE_ABOUT.LESSON.DESC')"
                ></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const introCardList: { thumb: string; title: string; desc: string }[] = [
    {
        thumb: require("@/assets/images/about-us/card-1.png"),
        title: "KEY_PAGE_ABOUT.LESSON.LIST[0].TITLE",
        desc: "KEY_PAGE_ABOUT.LESSON.LIST[0].DESC",
    },
    {
        thumb: require("@/assets/images/about-us/card-2.png"),
        title: "KEY_PAGE_ABOUT.LESSON.LIST[1].TITLE",
        desc: "KEY_PAGE_ABOUT.LESSON.LIST[1].DESC",
    },
    {
        thumb: require("@/assets/images/about-us/card-3.png"),
        title: "KEY_PAGE_ABOUT.LESSON.LIST[2].TITLE",
        desc: "KEY_PAGE_ABOUT.LESSON.LIST[2].DESC",
    },
];
</script>
<style lang="scss" module>
.lesson-intro-module {
    padding-top: 120px;
    padding-bottom: 63px;

    background: linear-gradient(
        180deg,
        #f0f4fe 0%,
        rgb(240 244 254 / 0) 93.45%
    );
    .intro-card {
        margin-bottom: 63px;
        .card-item {
            padding: 16px;
            padding-bottom: 34px;

            border-radius: 16px;
            background-color: #fff;
            box-shadow: 0 54px 67px -50px #e4e4e4;
        }
        .item-thumb {
            @include image-placeholder(395px, 240px);
            overflow: hidden;

            width: 100%;

            border-radius: var(--r-normal);
        }
        .item-intro {
            margin-top: 30px;
            padding: 0 32px;
        }
        .item-title {
            font-size: 24px;
            line-height: em(44px, 24px);

            margin-bottom: 10px;
        }
        .item-desc {
            font-size: 14px;
            line-height: 2em;

            color: var(--t-c-lighter);
        }
    }
    .module-footer {
        font-size: 16px;
        line-height: 2em;

        width: 1079px;
        max-width: 100%;
    }
    @include media-breakpoint-down(xxl) {
        padding-top: 100px;
        padding-bottom: 50px;
        .intro-card {
            .card-item {
                padding: 12px;
                padding-bottom: 28px;

                border-radius: 12px;
            }
            .item-intro {
                margin-top: 18px;
                padding: 0 22px;
            }
            .item-title {
                font-size: 22px;

                margin-bottom: 5px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        padding-top: 90px;
        .intro-card {
            .item-intro {
                padding: 0 10px;
            }
            .item-title {
                font-size: 20px;

                margin-bottom: 2px;
            }
        }
        .module-footer {
            font-size: 15px;
        }
    }
    @include media-breakpoint-down(lg) {
        .intro-card {
            .card-item {
                padding: 12px;

                align-items: center;
                gap: 30px;
                grid-template-columns: 300px 1fr;
            }
            .item-intro {
                margin-top: 0;
                padding: 0;
                padding-right: 20px;
                padding-bottom: 10px;
            }
        }
        .module-footer {
            font-size: 14px;
        }
    }
    @include media-breakpoint-down(md) {
        .intro-card {
            .card-item {
                gap: 30px;
                grid-template-columns: 220px 1fr;
            }
            .item-intro {
                padding-right: 20px;
                padding-bottom: 6px;
            }
            .item-title {
                font-size: 16px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
        .module-footer {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(sm) {
        .intro-card {
            .item-intro {
                margin-top: 20px;
                padding: 12px;
                padding-top: 2px;
            }
            .item-title {
                font-size: 20px;
            }
            .item-desc {
                font-size: 14px;
            }
        }
        .module-footer {
            font-size: 14px;
        }
    }
}
:global(.lang-en) {
    .lesson-intro-module {
        .intro-card {
            .item-title {
                font-size: 22px;
                font-weight: bold;
            }
        }
        @include media-breakpoint-down(xxxl) {
            .intro-card {
                .item-title {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
        @include media-breakpoint-down(xxl) {
            .intro-card {
                .item-title {
                    font-size: 18px;
                }
                .item-desc {
                    font-size: 14px;
                }
            }
            .module-footer {
                font-size: 14px;
            }
        }
        @include media-breakpoint-down(xl) {
            .intro-card {
                .item-title {
                    font-size: 16px;
                }
                .item-desc {
                    font-size: 13px;
                }
            }
            .module-footer {
                font-size: 13px;
            }
        }
        @include media-breakpoint-down(md) {
            .intro-card {
                .card-item {
                    display: block;
                }
                .item-intro {
                    margin: 0;
                    padding: 20px;
                }
            }
        }
    }
}
</style>
