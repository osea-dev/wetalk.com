<template>
    <VideoCourseModule
        :title="$t('KEY_VIDEO_COURSE.VIDEO_COURSE.录播课')"
        :total="total"
        :tag-list="tagList"
        :link="linkManage.recordedCourses"
        :page-size="pageSize"
        :current-page="currentPage"
        :active-tag="activeTag"
        @changeTag="activeTag = $event"
    >
        <div
            :class="$style['record-course-list']"
            class="lg:grid lg:grid-cols-2 lg:gap-5 md:block"
        >
            <VideoCourseItem
                v-for="item in list"
                :key="item.recordCourseid"
                :data="item"
                :link="linkManage.recordedCourses + '/' + item.recordCourseid"
            />
        </div>
    </VideoCourseModule>
</template>
<script lang="ts">
import { ref, watch } from "vue";
import { defineComponent, useFetch, useRoute } from "@nuxtjs/composition-api";

import { useSiteStore } from "@/store/site";
// import { recordCourseList } from "@/assets/script/api/mock/record-course";
import linkManage from "@/assets/script/local-data/link-manage";
import { getRecordCourseList } from "@/assets/script/api/api";

import VideoCourseModule from "@/components/public/VideoCourseModule.vue";
import VideoCourseItem from "@/components/public/VideoCourseItem.vue";
import { getTagsList, TYPE_TAGS } from "@/assets/script/api/api";

export default defineComponent({
    name: "RecordedCoursesModule",

    components: {
        VideoCourseModule,
        VideoCourseItem,
    },
    setup() {
        // 检索信息
        const pageSize = 5;
        const currentPage = ref<number>(1);

        const route = useRoute();
        const total = ref<number>(1);
        const list = ref<any[]>([]);
        const tagList = ref<TYPE_TAGS[]>([]);
        const activeTag = ref<string>("");

        // 项目列表
        function loadList() {
            return getRecordCourseList({
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

        function loadTag() {
            return getTagsList({ sty: 5 }).then((res) => {
                tagList.value = res.data;
            });
        }

        useFetch(async () => {
            await Promise.all([loadList(), loadTag()]);
        });

        const siteStore = useSiteStore();
        watch(
            [
                () => route.value.query.page,
                () => activeTag.value,
                () => siteStore.currency,
            ],
            () => {
                loadList();
            }
        );

        return {
            linkManage,
            total,
            pageSize,
            currentPage,
            tagList,
            list,
            activeTag,
            // recordCourseList,
        };
    },
});
</script>

<style lang="scss" module>
//
</style>
