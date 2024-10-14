<template>
    <VideoCourseModule
        :title="$t('KEY_VIDEO_COURSE.VIDEO_COURSE.线下课')"
        :total="total"
        :link="linkManage.recordedCourses"
        :page-size="pageSize"
        :current-page="currentPage"
    >
        <div
            :class="$style['online-live-course-list']"
            class="lg:grid lg:grid-cols-2 lg:gap-5 md:block wow-group-5"
        >
            <VideoCourseItem
                v-for="item in list"
                :key="item.offlineCourseid"
                :data="item"
                :link="linkManage.offlineCourse + '/' + item.offlineCourseid"
            />
        </div>
    </VideoCourseModule>
</template>
<script lang="ts">
import { ref, watch } from "vue";
import { defineComponent, useFetch, useRoute } from "@nuxtjs/composition-api";

import {
    getOfflineCourseList,
    TYPE_OFFLINE_COURSE_ITEM,
} from "@/assets/script/api/api";
import linkManage from "@/assets/script/local-data/link-manage";
import { useSiteStore } from "@/store/site";
// import { offlineCourse } from "@/assets/script/api/mock/offline-course";

import VideoCourseModule from "@/components/public/VideoCourseModule.vue";
import VideoCourseItem from "@/components/public/VideoCourseItem.vue";

export default defineComponent({
    name: "OfflineCourseModule",
    components: { VideoCourseModule, VideoCourseItem },
    setup() {
        // 检索信息
        const pageSize = 5;
        const currentPage = ref<number>(1);

        const route = useRoute();
        const total = ref<number>(1);
        const list = ref<TYPE_OFFLINE_COURSE_ITEM[]>([]);

        // 项目列表
        function loadList() {
            return getOfflineCourseList({
                key: "",
                page: Number(route.value.query.page) || 1,
                pageSize,
            }).then((res) => {
                list.value = res.data.list;
                total.value = res.data.total;
                currentPage.value = Number(route.value.query.page) || 1;
                return res.data;
            });
        }

        const siteStore = useSiteStore();
        watch([() => route.value.query.page, () => siteStore.currency], () => {
            loadList();
        });

        useFetch(async () => {
            await loadList();
        });

        return {
            linkManage,
            total,
            pageSize,
            currentPage,
            list,
            // offlineCourse,
        };
    },
});
</script>

<style lang="scss" module>
//
</style>
