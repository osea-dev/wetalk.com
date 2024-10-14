<template>
    <div
        class="p-module education-module"
        :class="$style['short-video-module']"
    >
        <div class="wrapper--limit-width relative z-10">
            <div :class="$style['module-body']">
                <div
                    :class="$style['module-head']"
                    class="flex justify-between relative z-10"
                >
                    <div
                        :class="$style['state-pos--left']"
                        class="flex items-center flex-auto md:block"
                    >
                        <div :class="$style['module-title']" class="md:mb-3">
                            {{ $t("KEY_VIDEO_COURSE.VIDEO_COURSE.短视频") }}
                        </div>
                        <div :class="$style['tag-list']" class="flex md:hidden">
                            <div
                                v-for="(item, index) in tagList"
                                :key="index"
                                :class="$style['tag-item']"
                                :data-active="activeTag === item.tag"
                                @click="activeTag = item.tag"
                            >
                                {{ item.tag }}
                            </div>
                        </div>
                    </div>
                    <div :class="$style['state-pos--right']">
                        <div :class="$style['sort-condition']">
                            <div
                                :class="$style['active-option']"
                                class="grid gap-2 items-center"
                            >
                                <span class="text">{{ activeSort.name }}</span
                                ><i class="ic iconfont icon-arrow-down"></i>
                            </div>
                            <div :class="$style['option-list']">
                                <div
                                    v-for="item in sortCondition"
                                    :key="item.value"
                                    :class="$style['option-item']"
                                    @click="activeSort = item"
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    :class="$style['tag-list']"
                    class="hidden md:flex w-full overflow-auto pt-1 pb-1"
                >
                    <div
                        v-for="(item, index) in tagList"
                        :key="index"
                        :class="$style['tag-item']"
                        :data-active="activeTag === item.tag"
                        @click="activeTag = item.tag"
                    >
                        {{ item.tag }}
                    </div>
                </div>
                <ShortVideoList :class="$style['video-list']" :data="list" />
                <PageTab
                    v-if="total > 1"
                    :total="total"
                    :link="linkManage.shortVideo + '/?page={{page}}'"
                    :page-size="pageSize"
                    :current-index="currentPage"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, ref, watch } from "vue";
import {
    defineComponent,
    useContext,
    useFetch,
    useRoute,
} from "@nuxtjs/composition-api";

import linkManage from "~/assets/script/local-data/link-manage";
import ShortVideoList from "./ShortVideoList.vue";
import PageTab from "@/components/PageTab.vue";
import { getShortVideoList } from "~/assets/script/api/api.video";
import { getTagsList, TYPE_TAGS } from "@/assets/script/api/api";

export default defineComponent({
    name: "ShortVideoModule",
    components: {
        ShortVideoList,
        PageTab,
    },
    setup() {
        // 检索信息
        const pageSize = 20;
        const currentPage = ref<number>(1);

        const route = useRoute();
        const total = ref<number>(1);
        const list = ref<any[]>([]);
        const tagList = ref<TYPE_TAGS[]>([]);
        const activeTag = ref<string>("");

        type SortType = Parameters<typeof getShortVideoList>[0]["sortType"];

        const { i18n } = useContext();

        const sortCondition: {
            value: SortType;
            name: string;
        }[] = [
            {
                value: "",
                name: i18n.t("KEY_VIDEO_COURSE.OTHER.默认"),
            },
            {
                value: "hot",
                name: i18n.t("KEY_VIDEO_COURSE.OTHER.近期热门"),
            },
            {
                value: "views",
                name: i18n.t("KEY_VIDEO_COURSE.OTHER.播放最多"),
            },
        ];
        const activeSort = ref<{ value: SortType; name: string }>(
            sortCondition[0]
        );

        function loadTag() {
            return getTagsList({ sty: 4 }).then((res) => {
                tagList.value = res.data;
            });
        }

        // 项目列表
        function loadList() {
            return getShortVideoList({
                sortType: activeSort.value.value,
                key: activeTag.value,
                page: Number(route.value.query.page) || 1,
                pageSize,
            }).then((res) => {
                list.value = res.data.list;
                total.value = res.data.total;
                currentPage.value = Number(route.value.query.page) || 1;
                return res.data;
            });
        }

        useFetch(async () => {
            await Promise.all([loadList(), loadTag()]);
        });

        watch(
            [
                () => route.value.query.page,
                () => activeTag.value,
                () => activeSort.value.value,
            ],
            () => {
                loadList();
            }
        );

        onMounted(() => {
            loadTag();
        });

        return {
            linkManage,
            total,
            pageSize,
            currentPage,
            list,
            tagList,
            activeTag,
            activeSort,
            sortCondition,
        };
    },
});
</script>

<style lang="scss" module>
.short-video-module {
    position: relative;
    z-index: 10;

    padding-top: 140px;
    padding-bottom: 50px;
    &::after {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        width: 94%;
        max-width: calc(#{$content-w} + 78px * 2);
        height: 460px;
        margin: 0 auto;

        content: "";

        border-radius: 15px 15px 0 0;
        background: linear-gradient(
            180deg,
            #fff 36.56%,
            rgb(255 255 255 / 0) 81.5%
        );
        box-shadow: 0 -25px 50px rgb(56 49 71 / 6%);
    }
    .video-list {
        margin-top: 35px;
    }
    .module-title {
        font-size: 32px;
        line-height: em(48px, 32px);

        margin-right: em(46px, 32px);

        color: #2d2b32;
    }
    .tag-list {
        //
    }
    .tag-item {
        @include space-between(10px);
        font-size: 14px;
        line-height: em(21px, 14px);

        padding: em(7px, 14px) em(20px, 14px);

        cursor: pointer;
        transition: 0.26s ease;
        white-space: nowrap;

        color: #777;
        border-radius: 40px;
        &:hover {
            color: #2d2b32;
        }
        &[data-active] {
            color: #fff;
            background: #0aca91;
        }
    }
    .module-body {
        padding: 0 70px;
    }
    @include media-breakpoint-down(xxxl) {
        padding-top: 110px;
        padding-bottom: 280px;
        .module-body {
            padding: 0 40px;
        }
    }
    @include media-breakpoint-down(xxl) {
        padding-bottom: 240px;
        .module-body {
            padding: 0 30px;
        }
    }
    @include media-breakpoint-down(xl) {
        padding-top: 100px;
        padding-bottom: 180px;
        .module-title {
            font-size: 26px;
        }
        .module-body {
            padding: 0;
        }
        .tag-item {
            @include space-between(10px);

            font-size: 12px;
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: 80px;
        padding-bottom: 120px;
    }
    @include media-breakpoint-down(md) {
        padding-top: 80px;
        padding-bottom: 80px;
        .module-title {
            padding: 0 em(10px, 26px);
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 60px;
        padding-bottom: 60px;
    }
}
.sort-condition {
    font-size: 13px;

    position: relative;
    &:hover {
        .option-list {
            visibility: visible;

            opacity: 1;
        }
        .active-option {
            border-color: #3b71fe;
        }
    }
    .active-option {
        line-height: 2em;

        padding: 5px 16px;

        cursor: pointer;
        transition: 0.26s ease;
        white-space: nowrap;

        border: 2px solid transparent;
        border-radius: 6px;

        grid-template-columns: 1fr auto;
    }
    .option-list {
        position: absolute;
        top: calc(100% + 20px);
        right: 0;

        visibility: hidden;
        overflow: hidden;

        min-width: 164px;

        transition: 0.26s ease;

        opacity: 0;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 0 14px -4px rgb(0 0 0 / 0.1),
            0 32px 48px -8px rgb(0 0 0 / 0.1);
        &::after {
            position: absolute;
            bottom: 100%;
            left: 0;

            width: 100%;
            height: 20px;

            content: "";
        }
    }
    .option-item {
        line-height: em(24px, 13px);

        padding: 12px 15px;

        cursor: pointer;
        transition: 0.26s ease;

        color: #777;
        &:hover {
            color: #2d2b32;
            background: #f4f4f4;
        }
    }
}
:global(.lang-en) {
    .short-video-module .module-title {
        font-weight: bold;

        text-transform: capitalize;
    }
}
</style>
