<template>
    <main :class="$style['search-body']">
        <div :class="$style['search-module']">
            <div class="wrapper--limit-width">
                <div :class="$style['search-bar']">
                    <div
                        :class="$style['search-bar--inner']"
                        class="flex items-center"
                    >
                        <div :class="$style['input-wrapper']" class="flex-auto">
                            <input
                                v-model="searchText"
                                type="text"
                                :placeholder="$t('请输入关键词进行搜索')"
                                @keydown.enter="submitSearch"
                            />
                            <div
                                :class="$style['clear-btn']"
                                :data-show="!!searchText"
                                @click="searchText = ''"
                            >
                                <i class="ic iconfont icon-close"></i>
                            </div>
                        </div>
                        <div
                            :class="$style['search-btn']"
                            class="flex items-center justify-center"
                            @click="submitSearch"
                        >
                            <span class="text">{{ $t("搜索") }}</span>
                        </div>
                    </div>
                    <div
                        v-if="lastSearch.text"
                        :class="$style['search-bar--tip']"
                    >
                        <span class="text">{{
                            $t("搜索共找到条结果", [
                                lastSearch.text,
                                lastSearch.counter,
                            ])
                        }}</span>
                    </div>
                </div>
                <div :class="$style['search-list']">
                    <div
                        v-if="showCourseList.length"
                        :class="$style['list--lesson']"
                    >
                        <div :class="$style['list-head']">
                            <h2 :class="$style['list-title']">
                                <span class="text">{{ $t("众语集") }}</span>
                            </h2>
                        </div>
                        <LessonList :lesson-list="showCourseList" />
                        <div
                            v-if="moreCourseBtn"
                            :class="$style['list-footer']"
                            class="flex justify-center"
                        >
                            <div
                                :class="$style['btn--loader-more']"
                                @click="showMoreCourse = true"
                            >
                                <i class="ic iconfont icon-reloader"></i>
                                <span class="text">{{ $t("加载更多") }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="showNewList.length" :class="$style['list--new']">
                        <div :class="$style['list-head']">
                            <h2 :class="$style['list-title']">
                                <span class="text">{{ $t("温故知新") }}</span>
                            </h2>
                        </div>
                        <NewsList :list="showNewList" />
                        <div
                            v-if="moreNewsBtn"
                            :class="$style['list-footer']"
                            class="flex justify-center"
                        >
                            <div
                                :class="$style['btn--loader-more']"
                                @click="showMoreNews = true"
                            >
                                <i class="ic iconfont icon-reloader"></i>
                                <span class="text">{{ $t("加载更多") }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MessageBoard class="p-module" />
    </main>
</template>
<script lang="ts">
import type { TYPE_NEWS_LIST, TYPE_COURSE } from "@/assets/script/api/api";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import LessonList from "@/components/search/LessonList.vue";
import NewsList from "@/components/news/NewsList.vue";
import MessageBoard from "@/components/MessageBoard.vue";

import { getSearchList } from "@/assets/script/api/api";
import { useSiteStore } from "@/store/site";

export default defineComponent({
    name: "SearchPage",
    components: {
        LessonList,
        NewsList,
        MessageBoard,
    },
    setup() {
        const newList = ref<TYPE_NEWS_LIST["list"]>([]);
        const courseList = ref<TYPE_COURSE[]>([]);
        const searchText = ref<string>("");
        const lastSearch = reactive({
            text: "",
            counter: 0,
        });
        const showMoreCourse = ref<boolean>(false);
        const showMoreNews = ref<boolean>(false);
        const limitSize = ref<number>(3);
        const showNewList = computed(() => {
            if (showMoreNews.value) {
                return newList.value;
            } else {
                return newList.value.slice(0, limitSize.value);
            }
        });
        const showCourseList = computed(() => {
            if (showMoreCourse.value) {
                return courseList.value;
            } else {
                return courseList.value.slice(0, limitSize.value);
            }
        });

        const moreNewsBtn = computed(() => {
            return newList.value.length > showNewList.value.length;
        });
        const moreCourseBtn = computed(() => {
            return courseList.value.length > showCourseList.value.length;
        });

        function submitSearch() {
            getSearchList({
                key: searchText.value,
            }).then((res) => {
                const data = res.data;
                newList.value = data.newss;
                courseList.value = data.courses;
                lastSearch.text = searchText.value;
                lastSearch.counter = data.newss.length + data.courses.length;
            });
        }

        const siteStore = useSiteStore();

        watch(
            () => siteStore.currency,
            () => {
                submitSearch();
            }
        );

        return {
            showNewList,
            showCourseList,
            showMoreCourse,
            showMoreNews,
            moreNewsBtn,
            moreCourseBtn,
            searchText,
            submitSearch,
            lastSearch,
        };
    },
});
</script>
<style lang="scss" module>
.search-module {
    padding-bottom: 133px;
    .search-bar {
        margin-bottom: 68px;
    }
    .search-bar--tip {
        font-size: em(13px, $t-s-default);
        line-height: em(26px, 13px);

        margin-top: em(14px, 13px);
        padding-left: em(37px, 13px);

        color: var(--t-c-lighter);
    }
    .search-bar--inner {
        line-height: 56px;

        width: 1000px;
        max-width: 100%;
    }
    .search-btn {
        font-size: 16px;
        font-weight: 700;

        width: em(118px, 16px);
        margin-left: 22px;

        cursor: pointer;
        transition: 0.26s ease;

        color: #fff;
        border-radius: 28px;
        background-color: #0aca91;
        &:hover {
            background-color: lighten($color: #0aca91, $amount: 2);
        }
    }
    .input-wrapper {
        position: relative;

        border: 1px solid rgb(204 217 231 / 0.5);
        border-radius: 28px;
        background: rgb(235 239 245 / 0.5);
        .clear-btn {
            position: absolute;
            top: 0;
            right: 10px;

            width: 50px;

            cursor: pointer;
            transition: 0.26s ease;
            text-align: center;

            opacity: 0;
            &[data-show] {
                opacity: 1;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .search-bar--inner {
            line-height: 50px;
        }
        .search-btn {
            width: 6.375em;
        }
    }
    @include media-breakpoint-down(sm) {
        .search-bar {
            margin-bottom: 38px;
        }
        .search-bar--tip {
            margin-left: 0;
            padding-left: 20px;
        }
    }
}
.search-list {
    min-height: 300px;
    .list--lesson {
        margin-bottom: 106px;
    }
    .list-title {
        font-size: em(26px, $t-s-default);
        font-weight: 700;
        line-height: em(52px, 26px);

        margin-bottom: 21px;
    }
    .list-footer {
        margin-top: 50px;
        margin-bottom: 76px;
    }
    .btn--loader-more {
        font-size: 13px;
        line-height: em(40px, 13px);

        padding: 0 28px 0 25px;

        cursor: pointer;
        transition: 0.26s ease;

        color: var(--t-c-lighter);
        border-radius: em(20px, 13px);
        :global(.ic) {
            margin-right: em(6px, 13px);
        }
        &:hover {
            color: #fff;
            background: #0aca91;
        }
    }
    @include media-breakpoint-down(xl) {
        .list-title {
            font-size: em(22px, $t-s-default);
        }
    }
}
.search-body {
    padding-top: 190px;
    .input-wrapper input {
        width: 100%;
        padding: 0 37px;

        outline: none !important;
        background-color: transparent;
        box-shadow: none !important;
        /* stylelint-disable-next-line selector-no-vendor-prefix */
        &::-webkit-input-placeholder {
            opacity: 0.6;
            color: var(--t-c-lighter) !important;
        }
        &:input-placeholder {
            opacity: 0.6;
            color: var(--t-c-lighter) !important;
        }
        &:placeholder {
            opacity: 0.6;
            color: var(--t-c-lighter) !important;
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: calc(var(--nav-h) + 50px);
    }
}
:global(.lang-en) {
    .search-module {
        @include media-breakpoint-down(xxl) {
            .search-btn {
                font-size: 14px;

                width: 8.375em;
            }
        }
        @include media-breakpoint-down(sm) {
            .search-btn {
                width: 7.375em;
                margin-left: 10px;
            }
        }
    }
    .search-body {
        @include media-breakpoint-down(sm) {
            .input-wrapper {
                input {
                    font-size: 13px;

                    padding: 0 24px;
                }
            }
        }
    }
}
</style>
