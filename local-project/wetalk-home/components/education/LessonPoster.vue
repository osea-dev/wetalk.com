<!--
 * @Description: 课程详情页
 * @Author: F-Stone
 * @LastEditTime: 2023-03-20 14:24:09
-->
<template>
    <div :class="$style['lesson-module']" class="p-module">
        <div
            v-if="intro"
            class="wrapper--limit-width"
            :class="$style['module-inner']"
        >
            <LessonCard :intro="intro" :sub-course-id="subCourseId" />
            <LessonDetail :data="intro" />
        </div>
    </div>
</template>
<script lang="ts">
import LessonCard from "@/components/education/LessonCard.vue";
import LessonDetail from "@/components/education/LessonDetail.vue";

import { ref } from "vue";
import { getSubCourseDetail } from "@/assets/script/api/api";
import { defineComponent, useFetch, useRoute } from "@nuxtjs/composition-api";

export default defineComponent({
    components: {
        LessonCard,
        LessonDetail,
    },
    setup() {
        const route = useRoute();

        const intro = ref<any>(null);
        useFetch(async () => {
            await getSubCourseDetail({
                courseGroupInfoid: route.value.params.id,
            }).then((res) => {
                intro.value = res.data;
            });
        });
        return { intro, subCourseId: route.value.params.id };
    },
});
</script>
<style lang="scss" module>
.lesson-module {
    padding-top: 98px;
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
