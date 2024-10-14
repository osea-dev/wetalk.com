<!--
 * @Description: 课程详情
 * @Author: F-Stone
 * @LastEditTime: 2023-04-24 13:27:42
-->
<template>
    <div :class="$style['course-poster']">
        <div
            v-if="course"
            :class="$style['module-inner']"
            class="wrapper--limit-width"
        >
            <BugVideoCourse
                class="wow animate__fadeInUp-100"
                :course="course"
                @buyCourse="buyCourse"
            />
            <RecordCourseIntro :course="course" />
            <LessonStatement statement="RECORDED_COURSES_STATEMENT" />
        </div>
    </div>
</template>
<script lang="ts">
import BugVideoCourse from "@/components/public/BugVideoCourse.vue";
import RecordCourseIntro from "./RecordCourseIntro.vue";

import LessonStatement from "@/components/education/LessonStatement.vue";
import { computed, defineComponent, ref, watch } from "vue";
import { useRoute, useFetch } from "@nuxtjs/composition-api";
import {
    getRecordCourseDetail,
    TYPE_RECORD_COURSE_DETAIL,
} from "~/assets/script/api/api";
import { useSiteStore } from "@/store/site";
import linkManage from "~/assets/script/local-data/link-manage";
// import { recordCourseDetail } from "@/assets/script/api/mock/record-course";

export default defineComponent({
    components: {
        BugVideoCourse,
        RecordCourseIntro,
        LessonStatement,
    },
    setup() {
        const course = ref<TYPE_RECORD_COURSE_DETAIL | null>(null);
        const siteStore = useSiteStore();
        const route = useRoute();

        const id = computed(() => {
            return route.value.params.id;
        });

        // 项目列表
        function loadCourse() {
            return getRecordCourseDetail({ recordCourseid: id.value }).then(
                (res) => {
                    if (res.statusCode == 0) {
                        course.value = res.data;
                        // course.value = recordCourseDetail;
                    }
                }
            );
        }

        watch(
            () => siteStore.currency,
            () => {
                loadCourse();
            }
        );

        useFetch(async () => {
            await loadCourse();
        });

        function buyCourse() {
            window.open(
                linkManage.orderCreate + "/record-course/" + id.value,
                "_blank"
            );
        }

        return { course, buyCourse };
    },
});
</script>
<style lang="scss" module>
.course-poster {
    padding-top: 98px;
    padding-bottom: 125px;
    .module-inner {
        max-width: calc(1200px + 12%);
    }
    @include media-breakpoint-down(xxxl) {
        padding-top: 78px;
    }
    @include media-breakpoint-down(xl) {
        padding-top: 50px;
    }
    @include media-breakpoint-down(md) {
        padding-top: 30px;
    }
}
</style>
