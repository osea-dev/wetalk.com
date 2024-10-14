<template>
    <VideoCourseModule
        :title="title"
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
                :key="item.onlineCourseid"
                :data="item"
                :link="
                    linkManage.onlineLiveCourse +
                    '/' +
                    categoryId +
                    '/' +
                    item.onlineCourseid
                "
            />
        </div>
    </VideoCourseModule>
</template>
<script lang="ts">
import { ref, watch, computed } from "vue";
import {
    defineComponent,
    useFetch,
    useContext,
    useRoute,
} from "@nuxtjs/composition-api";

import linkManage from "@/assets/script/local-data/link-manage";
import {
    getOnlineCourseList,
    TYPE_ONLINE_COURSE_ITEM,
} from "@/assets/script/api/api";
import { useSiteStore } from "@/store/site";
// import { onlineLiveCourse } from "@/assets/script/api/mock/online-live-course";

import VideoCourseModule from "@/components/public/VideoCourseModule.vue";
import VideoCourseItem from "@/components/public/VideoCourseItem.vue";

export default defineComponent({
    name: "OnlineLiveCourseModule",
    components: { VideoCourseModule, VideoCourseItem },
    setup() {
        // 检索信息
        const pageSize = 5;
        const currentPage = ref<number>(1);

        const route = useRoute();
        const total = ref<number>(1);
        const list = ref<TYPE_ONLINE_COURSE_ITEM[]>([]);

        const categoryId = computed(() => {
            return route.value.params.category;
        });

        const { i18n } = useContext();

        const title = computed(() => {
            return (
                {
                    3: i18n.t("KEY_NAV.真科学"),
                    4: i18n.t("KEY_NAV.潮国学"),
                    5: i18n.t("KEY_NAV.语言学"),
                }[categoryId.value] || ""
            );
        });

        // 项目列表
        function loadList() {
            return getOnlineCourseList({
                onlineCategoryid: categoryId.value,
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

        useFetch(async () => {
            await loadList();
        });

        const siteStore = useSiteStore();
        watch([() => route.value.query.page, () => siteStore.currency], () => {
            loadList();
        });

        return {
            linkManage,
            total,
            pageSize,
            currentPage,
            categoryId,
            list,
            title,
            // onlineLiveCourse,
        };
    },
});
</script>

<style lang="scss" module>
//
</style>
