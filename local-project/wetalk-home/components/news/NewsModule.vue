<template>
    <div :class="$style['news-module']">
        <div class="wrapper--limit-width relative z-10">
            <div :class="$style['module-body']">
                <div :class="$style['news-category']">
                    <div :class="$style['category-list']" class="flex">
                        <div
                            :class="$style['category-item']"
                            :data-active="activeCategory === 0"
                            @click="activeCategory = 0"
                        >
                            <span class="text">{{ $t("KEY_OTHER.ALL") }}</span>
                            <sup>{{ categoryTotal }}</sup>
                        </div>
                        <div
                            v-for="item in newsCategory"
                            :key="item.newsCategoryid"
                            :class="$style['category-item']"
                            :data-active="
                                activeCategory === item.newsCategoryid
                            "
                            @click="activeCategory = item.newsCategoryid"
                        >
                            <span class="text">{{ item.title }}</span>
                            <sup>{{ item.total }}</sup>
                        </div>
                    </div>
                </div>
                <NewsList :list="list" />
                <PageTab
                    :total="total"
                    :link="linkManage.news + '/?page={{page}}'"
                    :page-size="pageSize"
                    :current-index="currentPage"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { getNewsCategoryList, getNewsList } from "@/assets/script/api/api";
import type {
    TYPE_CATEGORY_LIST,
    TYPE_NEWS_LIST,
} from "@/assets/script/api/api";
// import { list } from "@/assets/script/api/mock/news-list";

import NewsList from "@/components/news/NewsList.vue";
import PageTab from "@/components/PageTab.vue";
import linkManage from "~/assets/script/local-data/link-manage";

import { defineComponent, onMounted, watch, computed, ref } from "vue";
import { useFetch, useRoute } from "@nuxtjs/composition-api";

export default defineComponent({
    components: {
        NewsList,
        PageTab,
    },
    setup() {
        const total = ref<number>(100);
        const pageSize = 15;
        const filterKeys = ref<string>("");
        const newsCategory = ref<TYPE_CATEGORY_LIST>([]);
        const activeCategory = ref<number>(0);
        const categoryTotal = ref<number>(0);

        const route = useRoute();
        const currentPage = computed(() => {
            return Number(route.value.query.page) || 1;
        });

        watch([activeCategory, currentPage], updateNewsList);

        useFetch(async () => {
            await getNewsCategoryList().then((res) => {
                newsCategory.value = res.data;
            });
        });
        useFetch(async () => {
            await updateNewsList();
        });

        const newsList = ref<TYPE_NEWS_LIST["list"]>([]);

        function updateNewsList() {
            return getNewsList({
                newsCategoryid: activeCategory.value,
                key: filterKeys.value,
                pageSize,
                page: currentPage.value,
            }).then((res) => {
                newsList.value = res.data.list;
                total.value = res.data.total;
                categoryTotal.value = res.data.total;
            });
        }

        onMounted(() => {
            updateNewsList();
        });

        return {
            total,
            pageSize,
            currentPage,
            categoryTotal,
            newsCategory,
            list: newsList,
            // list,
            activeCategory,
            linkManage,
        };
    },
});
</script>
<style lang="scss" module>
.news-module {
    position: relative;

    margin-top: -55px;
    padding-top: 55px;
    padding-bottom: 140px;
    .module-body {
        position: relative;
        z-index: 10;

        min-height: 500px;
    }
    &::before {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        left: 0;

        width: 94%;
        max-width: calc(#{$content-w} + 78px * 2);
        height: 490px;
        margin: 0 auto;

        content: "";

        border-radius: 15px 15px 0 0;
        background: linear-gradient(
            180deg,
            #fff 36.56%,
            rgb(255 255 255) 81.5%
        );
    }
    &::after {
        position: absolute;
        z-index: 1;
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
    @include media-breakpoint-down(xl) {
        margin-top: -50px;
        padding-top: 50px;
    }
    @include media-breakpoint-down(md) {
        margin-top: -30px;
        padding-top: 30px;
        padding-bottom: 80px;
    }
}
.news-category {
    margin-bottom: 45px;
    .category-item {
        @include space-between(58px);
        font-size: 16px;
        line-height: 2em;

        position: relative;

        cursor: pointer;
        transition: 0.36s ease;

        color: var(--t-c-lighter);
        sup {
            font-family: "Poppins";
            font-size: 12px;
            font-weight: 700;

            position: absolute;
            top: 9px;
            left: calc(100% + 3px);

            transition: 0.36s ease;

            opacity: 0;
        }
        &[data-active] {
            sup {
                opacity: 1;
            }
            &::after {
                width: 24px;

                opacity: 1;
            }
        }
        &:hover,
        &[data-active] {
            color: var(--t-c-default);
        }
        &::after {
            position: absolute;
            top: calc(100% + 1px);
            left: 50%;

            width: 14px;
            height: 4px;

            content: "";
            transition: 0.36s ease;
            transform: translateX(-50%);

            opacity: 0;
            border-radius: 2px;
            background-color: var(--t-c-default);
        }
    }
    @include media-breakpoint-down(xl) {
        margin-bottom: 40px;
        .category-item {
            @include space-between(42px);
            font-size: 15px;
            &::after {
                width: 12px;
                height: 3px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        overflow-x: auto;

        margin-bottom: 20px;
        padding-bottom: 20px;
        .category-item {
            @include space-between(28px);
            white-space: nowrap;
        }
    }
}
</style>
