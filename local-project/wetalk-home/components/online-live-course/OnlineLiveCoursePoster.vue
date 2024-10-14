<!--
 * @Description: 课程详情
 * @Author: F-Stone
 * @LastEditTime: 2023-03-24 14:23:01
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
            <div :class="$style['course-intro']" v-html="course.intro"></div>
            <LessonStatement />
        </div>
    </div>
</template>
<script lang="ts">
import BugVideoCourse from "@/components/public/BugVideoCourse.vue";
import LessonStatement from "@/components/education/LessonStatement.vue";

import { computed, defineComponent, ref, watch } from "vue";
import { useRoute, useFetch } from "@nuxtjs/composition-api";
import {
    getOnlineCourseDetail,
    TYPE_ONLINE_COURSE_DETAIL,
} from "~/assets/script/api/api";
import { useSiteStore } from "@/store/site";
import linkManage from "~/assets/script/local-data/link-manage";

export default defineComponent({
    components: {
        BugVideoCourse,
        LessonStatement,
    },
    setup() {
        const course = ref<TYPE_ONLINE_COURSE_DETAIL | null>(null);
        const siteStore = useSiteStore();
        const route = useRoute();

        const id = computed(() => {
            return route.value.params.id;
        });

        // 项目列表
        function loadCourse() {
            return getOnlineCourseDetail({ onlineCourseid: id.value }).then(
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
                linkManage.orderCreate + "/online-live-course/" + id.value,
                "_blank"
            );
        }

        return { course, buyCourse };
    },
});
</script>
<style lang="scss" module>
.course-intro {
    font-size: 16px;
    font-weight: 300;

    color: #777;
    p {
        margin-bottom: em(8px, 16px);
    }
    img {
        width: 100%;
    }
    @include media-breakpoint-down(xxl) {
        font-size: 14px;
    }
}
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
