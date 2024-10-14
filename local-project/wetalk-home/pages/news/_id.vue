<template>
    <main :class="$style['news-poster-page']">
        <div :class="$style['breadcrumb-module']">
            <div class="wrapper--limit-width">
                <div :class="$style['module-body']" class="flex">
                    <!-- <Link :class="$style['btn--back']">
                        <i class="ic iconfont icon-arrow-left"></i>
                        <span class="text">返回</span>
                    </Link> -->
                    <div :class="$style['breadcrumb-list']" class="flex">
                        <Link
                            :class="$style['list-item']"
                            :to="linkManage.index"
                        >
                            <span class="text">{{ $t("首页") }}</span>
                        </Link>
                        <Link
                            :class="$style['list-item']"
                            :to="linkManage.news"
                        >
                            <span class="text">{{ $t("温故知新") }}</span>
                        </Link>
                        <div :class="$style['list-item']">
                            <span class="text">{{ detail?.title }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style['poster-module']">
            <div class="wrapper--limit-width">
                <div :class="$style['module-body']">
                    <div>
                        <div
                            :class="$style['poster-head']"
                            class="wow wow-group-2"
                        >
                            <h2
                                :class="$style['poster-title']"
                                class="wow animate__fadeInUp-50"
                            >
                                {{ detail?.title }}
                            </h2>
                            <div
                                :class="$style['poster-info']"
                                class="flex wow animate__fadeInUp-50"
                            >
                                <div
                                    v-if="detail?.sendtime"
                                    :class="$style['poster-time']"
                                >
                                    <i class="ic iconfont icon-clock"></i>
                                    <span class="text">{{
                                        formateDate(detail.sendtime)
                                    }}</span>
                                </div>
                                <div
                                    v-if="detail?.source"
                                    :class="$style['poster-author']"
                                >
                                    <span class="text"
                                        >{{ $t("来源") }}：{{
                                            detail?.source
                                        }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <div
                            :class="$style['poster-body']"
                            class="wow animate__fadeIn"
                        >
                            <div
                                v-if="detail?.video"
                                :class="$style['news-video']"
                            >
                                <video
                                    :src="detail?.video"
                                    controlslist="nodownload"
                                    controls
                                ></video>
                            </div>
                            <div v-html="detail?.intro"></div>
                        </div>
                        <div :class="$style['poster-footer']">
                            <div
                                :class="$style['tag-with-share']"
                                class="flex items-center"
                            >
                                <div
                                    :class="$style['poster-tag']"
                                    class="flex-auto"
                                >
                                    <div
                                        :class="$style['tag-list']"
                                        class="flex"
                                    >
                                        <div
                                            v-for="(
                                                item, index
                                            ) in detail?.keys"
                                            :key="index"
                                            :class="$style['list-item']"
                                        >
                                            <span class="text">{{ item }}</span>
                                        </div>
                                    </div>
                                </div>
                                <ShareBtn />
                            </div>
                            <div
                                :class="$style['tabs-btns']"
                                class="flex justify-between"
                            >
                                <Link
                                    v-if="detail?.backNews"
                                    :class="[
                                        $style['btn--prev'],
                                        $style['tab-btn'],
                                    ]"
                                    class="flex items-center"
                                    :to="
                                        detail.backNews.url ||
                                        linkManage.news +
                                            '/' +
                                            detail.backNews.newsid
                                    "
                                >
                                    <i
                                        class="ic iconfont icon-long-arrow--left"
                                    ></i>
                                    <div :class="$style['item-info']">
                                        <span :class="$style['item-title']">
                                            {{ detail.backNews.title }}
                                        </span>
                                        <span :class="$style['btn-title']">{{
                                            $t("上一篇")
                                        }}</span>
                                    </div>
                                </Link>
                                <div v-else></div>
                                <Link
                                    v-if="detail?.nextNews"
                                    :class="[
                                        $style['btn--next'],
                                        $style['tab-btn'],
                                    ]"
                                    class="flex items-center"
                                    :to="
                                        detail.nextNews.url ||
                                        linkManage.news +
                                            '/' +
                                            detail.nextNews.newsid
                                    "
                                >
                                    <div :class="$style['item-info']">
                                        <span :class="$style['item-title']">
                                            {{ detail.nextNews.title }}
                                        </span>
                                        <span :class="$style['btn-title']">{{
                                            $t("下一篇")
                                        }}</span>
                                    </div>
                                    <i
                                        class="ic iconfont icon-long-arrow--right"
                                    ></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <RelateModule
                        v-if="detail?.relations.length"
                        :class="$style['relate-module']"
                        :list="detail.relations"
                    />
                </div>
            </div>
        </div>
        <MessageBoard class="p-module" />
    </main>
</template>
<script lang="ts">
import type { TYPE_NEW_DETAIL } from "@/assets/script/api/api";
import { getNewsDetail } from "@/assets/script/api/api";
import { formateDate } from "@/assets/script/util/date";

import RelateModule from "@/components/poster/RelateModule.vue";
import ShareBtn from "@/components/ShareBtn.vue";
import { useFetch, useRoute } from "@nuxtjs/composition-api";

import { defineComponent, ref } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";

export default defineComponent({
    components: {
        RelateModule,
        ShareBtn,
    },
    setup() {
        const route = useRoute();
        const detail = ref<TYPE_NEW_DETAIL>();
        useFetch(async () => {
            await getNewsDetail({
                newsid: route.value.params.id,
            }).then((res) => {
                detail.value = res.data;
            });
        });
        return {
            linkManage,
            detail,
            formateDate,
        };
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.NEWS.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.NEWS.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.NEWS.DESC"),
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: this.$i18n.t("KEY_SEO.NEWS.KEYWORDS"),
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: this.$i18n.t("KEY_SEO.NEWS.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
.news-poster-page {
    padding-top: 180px;
    :global(#page_body_editor-wrapper .layout_group[data-window_width="true"]) {
        width: 100% !important;
        margin: 0 !important;
    }
    @include media-breakpoint-down(xxl) {
        padding-top: 140px;
        .relate-module {
            width: 280px;
            padding-top: 8px;
        }
    }
    @include media-breakpoint-down(xl) {
        .relate-module {
            width: 100%;
            padding-top: 60px;
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: 120px;
    }
}
.breadcrumb-module {
    margin-bottom: 53px;

    color: var(--t-c-lighter);
    .module-body {
        position: relative;

        padding-left: 160px;
    }
    .btn--back {
        font-size: 15px;
        line-height: em(18px, 15px);

        position: absolute;
        top: 0;
        left: 0;

        cursor: pointer;
        transition: 0.26s ease;
        :global(.ic) {
            margin-right: 4px;
        }
        &:hover {
            color: var(--t-c-default);
        }
    }
    .breadcrumb-list {
        width: 100%;

        white-space: nowrap;
        .list-item {
            font-size: 12px;
            line-height: em(18px, 12px);

            cursor: pointer;
            transition: 0.26s ease;
            &:hover {
                color: var(--t-c-default);
            }
            &::after {
                font-family: "iconfont" !important;
                font-style: normal;
                line-height: 1;

                margin: 0 8px;

                content: "\e689";

                color: #5d5d5b;

                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            &:last-child {
                overflow: hidden;

                text-overflow: ellipsis;
                &::after {
                    display: none;
                }
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        margin-bottom: 40px;
        .module-body {
            padding-left: 110px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-body {
            padding-left: 0;
        }
    }
}
.poster-module {
    padding-bottom: 164px;
    .module-body {
        display: grid;

        padding-left: 160px;

        column-gap: 152px;

        grid-template-columns: 1fr 320px;
        & > * {
            min-width: 1px;
        }
    }
    .poster-title {
        font-size: 40px;
        font-weight: 700;
        line-height: em(60px, 40px);

        margin-bottom: 13px;
    }
    .poster-head {
        padding-bottom: 42px;

        border-bottom: 1px solid #edf2f9;
    }
    .poster-info {
        font-size: 12px;
        line-height: 2em;

        color: var(--t-c-lighter);
        .poster-time {
            margin-right: 14px;
        }
    }
    .poster-body {
        line-height: 1.6em;

        padding: 34px 0;

        animation-delay: 0.3s;
        .news-video {
            margin-bottom: 20px;
            video {
                min-height: 400px;
                max-height: w-h(80);
                margin: 0 auto;
            }
        }
    }
    .poster-footer {
        .tag-list {
            font-size: 12px;
            line-height: 2em;

            margin-right: 40px;
            padding: 40px 0;

            color: var(--t-c-lighter);
            .list-item {
                @include space-between(10px);
                padding: 4px 18px;

                cursor: pointer;
                transition: 0.26s ease;

                border: 2px solid #dde6ea;
                border-radius: em(18px, 12px);
                &:hover {
                    color: #fff;
                    border-color: #0aca91;
                    background-color: #0aca91;
                }
            }
        }
        .tabs-btns {
            padding-top: 30px;

            border-top: 1px solid #edf2f9;
        }
        .tab-btn {
            max-width: 45%;

            cursor: pointer;
            :global(.ic) {
                @include circle(61px, #fff);
                display: flex;
                flex: 0 0 auto;

                transition: 0.26s ease;

                color: var(--t-c-lighter);
                box-shadow: 0 10px 40px rgb(97 97 97 / 0.1);

                align-items: center;
                justify-content: center;
            }
            .item-info {
                min-width: 1px;
            }
            .btn-title {
                font-size: 14px;
                line-height: em(16px, 12px);

                display: block;

                padding-top: 0;

                transition: 0.26s ease;

                color: var(--t-c-lighter);
            }
            .item-title {
                @include ellipse(1);
                font-size: 14px;
                line-height: em(16px, 14px);

                display: block;
                overflow: hidden;

                max-width: 240px;
                height: 0;

                transition: 0.26s ease;

                color: var(--t-c-default);
            }
            &:hover {
                :global(.ic) {
                    color: #fff;
                    background-color: #0aca91;
                }
                .btn-title {
                    font-size: 12px;

                    padding-top: 8px;
                }
                .item-title {
                    height: em(16px, 14px);
                }
            }
        }
        .btn--prev {
            text-align: left;
            :global(.ic) {
                margin-right: 24px;
            }
        }
        .btn--next {
            text-align: right;
            :global(.ic) {
                margin-left: 24px;
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        .module-body {
            padding-left: 110px;

            column-gap: 110px;
        }
        .poster-head {
            padding-bottom: 35px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-body {
            padding-left: 0;

            column-gap: 50px;

            grid-template-columns: 1fr 280px;
        }
        .poster-title {
            font-size: 36px;

            margin-bottom: 10px;
        }
    }
    @include media-breakpoint-down(xl) {
        padding-bottom: 110px;
        .module-body {
            margin-bottom: 50px;

            grid-template-columns: 1fr;
        }
    }
    @include media-breakpoint-down(lg) {
        .poster-head {
            padding-bottom: 30px;
        }
        .poster-body {
            padding-top: 30px;
            padding-bottom: 10px;
        }
        .poster-title {
            font-size: 32px;
        }
        .module-body {
            margin-bottom: 20px;
        }
    }
    @include media-breakpoint-down(md) {
        padding-bottom: 90px;
        .module-body {
            margin-bottom: 0;
        }
    }
    @include media-breakpoint-down(sm) {
        padding-bottom: 70px;
    }
}
body[data-is-mobile="1"] {
    .poster-module {
        .poster-footer {
            .tag-list {
                width: 100%;
                margin: 0;
                padding-bottom: 50px;
            }
        }
        .tab-btn {
            .btn-title {
                font-size: 12px;

                padding-top: 8px;
            }
            .item-title {
                height: em(16px, 14px);
            }
        }
    }
}
</style>
