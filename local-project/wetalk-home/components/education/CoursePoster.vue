<!--
 * @Description: 课程详情
 * @Author: F-Stone
 * @LastEditTime: 2022-12-27 14:26:28
-->
<template>
    <div :class="$style['course-poster']">
        <div
            :class="$style['poster-banner']"
            :style="
                course
                    ? { 'background-image': 'url(' + course.banner + ')' }
                    : ''
            "
        ></div>
        <div v-if="course" class="wrapper--limit-width">
            <BuyCoursePanel
                class="wow animate__fadeInUp-100"
                :course="course"
            />
            <CourseIntro :course="course" />
        </div>
    </div>
</template>
<script lang="ts">
import BuyCoursePanel from "@/components/education/BuyCoursePanel.vue";
import CourseIntro from "@/components/education/CourseIntro.vue";

import { computed, defineComponent, ref, watch } from "vue";
import { useRoute, useFetch } from "@nuxtjs/composition-api";
import { getCourse } from "~/assets/script/api/api";
import { useSiteStore } from "@/store/site";
import type { TYPE_COURSE_DETAIL } from "@/assets/script/api/api";

export default defineComponent({
    components: {
        BuyCoursePanel,
        CourseIntro,
    },
    setup() {
        const course = ref<TYPE_COURSE_DETAIL | null>(null);
        const siteStore = useSiteStore();
        const route = useRoute();

        const id = computed(() => {
            return route.value.params.id;
        });

        // 项目列表
        function loadCourse() {
            return getCourse({ courseid: id.value }).then((res) => {
                if (res.statusCode == 0) {
                    course.value = res.data;
                }
            });
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

        return { course };
    },
});
</script>
<style lang="scss" module>
.course-poster {
    .poster-banner {
        @include space-placeholder(1920px, 600px);
        width: 100%;
        min-height: 400px;

        background-position: center;
        background-size: cover;
    }
    @include media-breakpoint-down(md) {
        .poster-banner {
            min-height: 300px;
        }
    }
    @include media-breakpoint-down(sm) {
        .poster-banner {
            min-height: 200px;
        }
    }
}
</style>
