<template>
    <div :class="$style['brand-intro-module']">
        <div class="wrapper--limit-width">
            <div :class="$style['module-body']">
                <div
                    class="wrapper--limit-width-mini flex justify-between items-center xl:block relative z-10"
                >
                    <div class="state-pos--left">
                        <div :class="$style['module-head']">
                            <h2 :class="$style['module-title']">
                                {{ $t("KEY_PAGE_ABOUT.BRAND.TITLE") }}
                            </h2>
                            <h3 :class="$style['module-subtitle']">
                                {{ $t("KEY_PAGE_ABOUT.BRAND.SUBTITLE") }}
                            </h3>
                        </div>
                        <div
                            :class="$style['play-btn']"
                            class="flex items-center wow animate__fadeInUp-50"
                            @click="
                                playVideo(
                                    'https://wetalk-v1.oss-ap-southeast-1.aliyuncs.com/Media/%E6%B4%BB%E5%8A%A8%E5%AE%A3%E4%BC%A0%E7%89%87_x264.mp4'
                                )
                            "
                        >
                            <i class="ic iconfont icon-play"></i>
                            <span class="text">Play Video</span>
                        </div>
                    </div>
                    <div class="state-pos--right wow wow-group-2">
                        <div
                            :class="$style['intro-item']"
                            class="wow animate__fadeInRight-50"
                        >
                            <div :class="$style['item-title']">
                                {{ $t("KEY_PAGE_ABOUT.BRAND.LIST[0].TITLE") }}
                            </div>
                            <p
                                class="text"
                                v-html="$t('KEY_PAGE_ABOUT.BRAND.LIST[0].DESC')"
                            ></p>
                        </div>
                        <div
                            :class="$style['intro-item']"
                            class="wow animate__fadeInRight-50"
                        >
                            <div :class="$style['item-title']">
                                {{ $t("KEY_PAGE_ABOUT.BRAND.LIST[1].TITLE") }}
                            </div>
                            <p
                                class="text"
                                v-html="$t('KEY_PAGE_ABOUT.BRAND.LIST[1].DESC')"
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";

const { $dialog } = useContext();

function playVideo(video?: string) {
    if (!video) return;
    $dialog({
        type: "video",
        src: video,
        poster: "",
    });
}
</script>
<style lang="scss" module>
.brand-intro-module {
    position: relative;

    overflow: hidden;

    max-width: 100%;
    &::after {
        position: absolute;
        top: 0;
        left: 50%;

        width: calc(1536px);
        height: 100%;
        margin: 0 auto;

        content: "";
        transform: translateX(-50%);

        border-radius: 30px;
        background: #f8faff;
    }
    :global(.state-pos--left) {
        width: 558px;
        margin-right: 96px;
    }
    :global(.state-pos--right) {
        width: 678px;
    }
    .module-body {
        padding: 50px 60px;
    }
    .module-head {
        margin-bottom: 86px;
        padding-top: 50px;
    }
    .module-title {
        font-family: "Poppins";
        font-size: 66px;
        font-weight: 700;
        line-height: 110%;

        margin-bottom: 10px;
    }
    .module-subtitle {
        font-size: 20px;
        line-height: em(30px, 20px);

        color: var(--t-c-lighter);
    }
    .intro-item {
        max-width: 500px;
        padding: 52px 0;

        border-top: 1px solid #e1e5f1;
        &:first-child {
            border-top-width: 0;
        }
        .item-title {
            font-size: 20px;
            font-weight: 700;
            line-height: em(30px, 20px);

            margin-bottom: 16px;
        }
        p {
            font-size: 14px;
            line-height: 200%;

            color: var(--t-c-lighter);
        }
    }
    .play-btn {
        font-family: "Poppins";
        font-size: 18px;
        font-style: normal;
        line-height: em(31px, 18px);

        cursor: pointer;
        :global(.ic) {
            @include circle(80px, $green-4);
            @include flex(c, c);

            font-size: 23px;

            margin-right: 20px;

            color: #fff;
            &::before {
                display: inline-block;

                margin-right: -3px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        :global(.state-pos--left) {
            margin-right: 76px;
        }
        .module-head {
            padding-top: 4px;
        }
    }
    @include media-breakpoint-down(xl) {
        :global(.state-pos--left) {
            display: flex;

            width: 100%;
            margin-right: 0;
            margin-bottom: 20px;
            padding: 0;

            align-items: flex-start;
            justify-content: space-between;
        }
        :global(.state-pos--right) {
            width: 100%;
        }
        .module-head {
            margin: 0;
            padding: 0;
            .module-title {
                font-size: 58px;

                width: 400px;
                margin: 0;
                margin-bottom: 20px;
            }
            .module-subtitle {
                font-size: 18px;
            }
        }
        .module-body {
            padding: 50px;
        }
        .play-btn {
            padding-top: 10px;
        }
        .intro-item {
            max-width: 100%;
            padding: 40px 0;
        }
    }
    @include media-breakpoint-down(lg) {
        .module-body {
            padding: 70px 0 50px;
        }
        .module-head {
            .module-title {
                font-size: 46px;
            }
            .module-subtitle {
                font-size: 16px;
            }
        }
        .play-btn {
            font-size: 15px;

            padding-top: 2px;
            :global(.ic) {
                @include circle(60px);
                font-size: 18px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        :global(.state-pos--left) {
            margin-bottom: 30px;
        }
        .module-head {
            .module-title {
                font-size: 42px;

                width: 300px;
                max-width: 100%;
                margin-bottom: 10px;
            }
            .module-subtitle {
                font-size: 14px;
            }
        }
        .intro-item {
            padding: 30px 0;
            .item-title {
                font-size: 18px;
            }
            p {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        :global(.state-pos--left) {
            display: block;

            margin-bottom: 0;
        }
        .module-head {
            margin-bottom: 30px;
        }
        .play-btn {
            font-size: 14px;

            padding-top: 2px;
            :global(.ic) {
                @include circle(50px);
                font-size: 16px;

                margin-right: 14px;
            }
        }
        .intro-item p {
            font-size: 14px;
        }
    }
}
:global(.lang-en) {
    .brand-intro-module {
        :global(.state-pos--left) {
            padding-bottom: 100px;
        }
        .module-head {
            padding-top: 0;
        }
        @include media-breakpoint-down(xxl) {
            .module-body {
                padding: 50px 0;
            }
        }
        @include media-breakpoint-down(xl) {
            :global(.state-pos--left) {
                padding-bottom: 50px;
            }
            .module-body {
                padding: 100px 0;
            }
        }
        @include media-breakpoint-down(md) {
            :global(.state-pos--left) {
                padding-bottom: 0;
            }
            .module-body {
                padding: 70px 0;
            }
        }
    }
}
</style>
