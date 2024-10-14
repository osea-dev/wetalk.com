<template>
    <div :class="$style['about-module']">
        <div :class="$style['module-head']">
            <div class="wrapper--limit-width">
                <div
                    class="flex justify-between items-end"
                    :class="$style['head-inner']"
                >
                    <h1
                        :class="$style['module-title']"
                        class="wow animate__fadeInLeft-50"
                    >
                        <span class="text">About<br />WeTalk.</span>
                    </h1>
                    <h2
                        :class="$style['module-subtitle']"
                        class="wow animate__fadeInRight-50"
                    >
                        {{ $t("KEY_PAGE_ABOUT.ABOUT.SUBTITLE") }}
                    </h2>
                </div>
            </div>
        </div>
        <div :class="$style['module-body']" class="relative z-10">
            <div class="wrapper--limit-width">
                <div
                    :class="$style['video-box']"
                    class="wow animate__fadeInUp-50"
                    @click="
                        playVideo(
                            'https://wetalk-v1.oss-ap-southeast-1.aliyuncs.com/Media/%E6%B4%BB%E5%8A%A8%E5%AE%A3%E4%BC%A0%E7%89%87_x264.mp4'
                        )
                    "
                >
                    <img src="@/assets/images/about-us/video.jpg" alt="" />
                    <div
                        :class="$style['item-cover']"
                        class="flex justify-center items-center"
                    >
                        <div
                            :class="$style['item-play-btn']"
                            class="flex justify-center items-center"
                        >
                            <i class="ic iconfont icon-play"></i>
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
.about-module {
    font-size: 14px;
    .module-head {
        padding-top: em(262px, 14px);
        padding-bottom: em(110px, 14px);

        background-color: #f0f4fe;
        .head-inner {
            padding-bottom: 14.8%;
        }
        .module-title {
            font-family: "Poppins";
            font-size: em(130px, 14px);
            font-weight: 700;
            line-height: 1em;
        }
        .module-subtitle {
            font-size: 16px;

            width: 610px;
            padding-bottom: em(23px, 16px);

            color: var(--t-c-subtitle);
        }
    }
    .video-box {
        @include image-placeholder(1536px, 560px);
        overflow: hidden;

        max-width: 100%;
        margin-top: -14.8%;

        cursor: pointer;

        border-radius: em(50px, 14px);
    }
    .item-cover {
        position: absolute;

        width: 100%;
        height: 100%;

        transition: 0.36s ease;
    }
    .item-play-btn {
        @include circle(80px, #fff);
        font-size: 20px;

        transition: 0.36s ease;
        :global(.ic) {
            margin-right: -3px;
        }
    }
    @include media-breakpoint-down(xxxl) {
        font-size: 13px;
        .module-head {
            //
        }
    }
    @include media-breakpoint-down(xxl) {
        font-size: 12px;
        .module-head {
            .module-subtitle {
                width: min(540px, 46%);
            }
        }
    }
    @include media-breakpoint-down(xl) {
        font-size: 10px;
        .module-head {
            .head-inner {
                display: block;
            }
            .module-subtitle {
                line-height: 2em;

                width: 100%;
                margin-top: 30px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        font-size: 8px;
        .module-head {
            .module-subtitle {
                font-size: 15px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        font-size: 7px;
        .module-head {
            .module-subtitle {
                font-size: 14px;
            }
        }
        .video-box {
            & > img {
                width: 100%;
                height: 100%;

                object-fit: cover;
            }
            &::after {
                padding-top: 50%;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        font-size: 6px;
        .module-head {
            .head-inner {
                padding-bottom: 30px;
            }
            .module-subtitle {
                margin-top: 20px;
                margin-bottom: 10px;
            }
        }
        .video-box {
            & > img {
                width: 100%;
                height: 100%;

                object-fit: cover;
            }
            &::after {
                padding-top: 50%;
            }
        }
    }
}
:global(.lang-en) {
    .about-module {
        .module-head {
            .module-subtitle {
                line-height: 2;
            }
        }
        @include media-breakpoint-down(xxl) {
            .module-head {
                .module-title {
                    font-size: em(120px, 14px);
                }
                .module-subtitle {
                    font-size: 14px;

                    width: min(540px, 50%);
                }
            }
        }
        @include media-breakpoint-down(xl) {
            .module-head {
                .module-subtitle {
                    width: 100%;
                }
            }
        }
        @include media-breakpoint-down(md) {
            .module-head {
                .module-subtitle {
                    width: 100%;
                }
            }
        }
    }
}
</style>
