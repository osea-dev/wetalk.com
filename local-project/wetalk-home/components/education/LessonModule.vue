<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-12-27 14:24:40
-->
<template>
    <div class="p-module education-module" :class="$style['education-module']">
        <div class="wrapper--limit-width relative z-10">
            <div :class="$style['module-body']">
                <LessonList :lessonList="list" />
                <PageTab
                    v-if="total > 1"
                    :total="total"
                    :link="linkManage.education + '/?page={{page}}'"
                    :page-size="pageSize"
                    :current-index="currentPage"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import PageTab from "@/components/PageTab.vue";

import { ref, watch } from "vue";
import LessonList from "~/components/education/LessonList.vue";

import { getCourseList } from "@/assets/script/api/api";
import { defineComponent, useFetch, useRoute } from "@nuxtjs/composition-api";
import link from "~/assets/script/local-data/link-manage";
import linkManage from "~/assets/script/local-data/link-manage";
import { useSiteStore } from "@/store/site";

export default defineComponent({
    name: "LessonModule",
    components: {
        PageTab,
        LessonList,
    },
    setup() {
        // 检索信息
        const pageSize = 9;
        const currentPage = ref<number>(1);

        const route = useRoute();
        const total = ref<number>(1);
        const list = ref<any[]>([]);

        const siteStore = useSiteStore();

        // 项目列表
        function loadList(key = "") {
            return getCourseList({
                key,
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

        watch([() => route.value.query.page, () => siteStore.currency], () => {
            loadList();
        });

        return {
            loadList,
            link,
            pageSize,
            currentPage,
            total,
            list,
            linkManage,
        };
    },
});
</script>

<style lang="scss" module>
.education-module {
    position: relative;
    z-index: 10;

    padding-top: 140px;
    padding-bottom: 280px;
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
        .module-body {
            padding: 0;
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: 80px;
        padding-bottom: 120px;
    }
    @include media-breakpoint-down(md) {
        padding-top: 80px;
        padding-bottom: 80px;
    }
    @include media-breakpoint-down(sm) {
        padding-top: 60px;
        padding-bottom: 60px;
    }
}
</style>
