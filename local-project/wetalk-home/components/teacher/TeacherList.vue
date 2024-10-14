<template>
    <div :class="$style['teacher-module']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div
                    :class="$style['module-header']"
                    class="flex items-center lg:block"
                >
                    <h3 :class="$style['module-title']">
                        <span class="text">{{ $t("教师团队") }}</span>
                    </h3>
                    <div :class="$style['teacher-category']">
                        <div class="flex">
                            <span
                                :class="$style['category-item']"
                                v-for="(item, index) in categoryList"
                                :data-active="
                                    currentCat === item.teacherCategoryid
                                "
                                :key="index"
                                :data-id="item.teacherCategoryid"
                                @click="currentCat = item.teacherCategoryid"
                            >
                                {{ item.title }}
                            </span>
                        </div>
                    </div>
                </div>
                <div :class="$style['module-body']">
                    <div
                        :class="$style['teacher-list']"
                        class="grid grid-cols-3 grid-rows-1 gap-5 wow-group-6 xl:gap-3 lg:grid-cols-2 lg:gap-6 md:grid-cols-1"
                    >
                        <Link
                            v-for="item in teacherList"
                            :key="item.teacherid"
                            :to="linkManage.teacher + '/' + item.teacherid"
                            :class="$style['teacher-item']"
                            class="flex flex-col wow animate__fadeInUp-50 md:grid md:grid-cols-2 sm:grid-cols-1"
                        >
                            <div :class="$style['item-thumb']">
                                <div :class="$style['img-box']">
                                    <img :src="item.img" alt="" />
                                </div>
                            </div>
                            <div
                                :class="$style['item-info']"
                                class="md:flex md:flex-col md:justify-center"
                            >
                                <h4 :class="$style['item-title']">
                                    {{ item.name }}
                                </h4>

                                <div
                                    :class="$style['item-tags']"
                                    class="flex items-center"
                                >
                                    <span
                                        v-for="(tag, j) in item.keys"
                                        :key="j"
                                        :class="$style['item-tag']"
                                        class="text"
                                        >{{ tag }}</span
                                    >
                                </div>
                            </div>
                        </Link>
                    </div>
                    <PageTab
                        v-if="total > 1"
                        :total="total"
                        :link="linkManage.teacher + '/?page={{page}}'"
                        :page-size="pagesize"
                        :current-index="currentPage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    useContext,
    useFetch,
    useRoute,
} from "@nuxtjs/composition-api";
import PageTab from "@/components/PageTab.vue";
import { ref, watch } from "vue";
import {
    getTeacherCategory,
    getTeacherList,
} from "@/assets/script/api/api.teacher";
import type { TYPE_TEACHER_LIST } from "@/assets/script/api/api.teacher";
import linkManage from "~/assets/script/local-data/link-manage";

export default defineComponent({
    name: "TeacherPage",
    components: { PageTab },
    setup() {
        const currentCat = ref<number>(0);
        const pagesize = 12;
        const total = ref<number>(1);
        const currentPage = ref<number>(1);

        const categoryList = ref<
            { teacherCategoryid: number; title: string }[]
        >([]);
        const teacherList = ref<TYPE_TEACHER_LIST>([]);

        const { i18n } = useContext();

        useFetch(async () => {
            await getTeacherCategory().then((res) => {
                categoryList.value = [
                    { teacherCategoryid: 0, title: i18n.t("全部") },
                    ...res.data,
                ];
            });
        });

        const route = useRoute();
        const { fetch } = useFetch(async () => {
            await getTeacherList({
                teacherCategoryid: currentCat.value,
                page: Number(route.value.query.page) || 1,
                pagesize,
            }).then((res) => {
                teacherList.value = res.data.list;
                currentPage.value = Number(route.value.query.page) || 1;
                total.value = res.data.total;
                return res.data;
            });
        });
        watch(
            [
                currentCat,
                () => {
                    return route.value.query.page;
                },
            ],
            () => {
                fetch();
            }
        );

        return {
            categoryList,
            teacherList,
            currentCat,
            total,
            pagesize,
            currentPage,
            linkManage,
        };
    },
});
</script>
<style lang="scss" module>
.teacher-module {
    .teacher-item {
        --l-c-1: #e4f0ff;
        --l-c-2: #aed2ff;
        --l-c-3: rgb(214 232 255 / 0.15);

        transition: 0.36s ease;

        border-radius: 0 0 12px 12px;
        box-shadow: 0 23.6559px 70.9677px rgb(56 49 71 / 0);
        &:hover {
            box-shadow: 0 23.6559px 70.9677px rgb(56 49 71 / 0.1);
        }
        .item-thumb {
            position: relative;

            overflow: hidden;

            width: 100%;

            border-radius: 12px 12px 0 0;
            .img-box {
                @include image-placeholder(880px, 600px);
                z-index: 10;

                width: 100%;
            }
            &::after {
                @include ab-cover;
                content: "";

                border: 2px solid transparent;
                border-radius: 12px 12px 0 0;
                background-color: var(--l-c-1);
                background-clip: content-box;
            }
            &::before {
                @include ab-cover;
                content: "";

                background-color: var(--l-c-1);
                background-image: linear-gradient(
                    180deg,
                    var(--l-c-2) 0%,
                    var(--l-c-3) 100%
                );
            }
        }
        &:nth-child(9n + 1) {
            --l-c-1: #e4f0ff;
            --l-c-2: #aed2ff;
            --l-c-3: rgb(214 232 255 / 0.15);
        }
        &:nth-child(9n + 2) {
            --l-c-1: #ffecb4;
            --l-c-2: #fbde89;
            --l-c-3: rgb(255 236 180 / 0);
        }
        &:nth-child(9n + 3) {
            --l-c-1: #d9f2e5;
            --l-c-2: #94ecbe;
            --l-c-3: rgb(217 242 229 / 0);
        }
        &:nth-child(9n + 4) {
            --l-c-1: #e2e6fa;
            --l-c-2: #aed2ff;
            --l-c-3: rgb(214 232 255 / 0.15);
        }
        &:nth-child(9n + 5) {
            --l-c-1: #ffe1b4;
            --l-c-2: #fbde89;
            --l-c-3: rgb(255 236 180 / 0);
        }
        &:nth-child(9n + 6) {
            --l-c-1: #ffe9fd;
            --l-c-2: #ffcffb;
            --l-c-3: rgb(255 207 251 / 0);
        }
        &:nth-child(9n + 7) {
            --l-c-1: #ffebeb;
            --l-c-2: #fed1d1;
            --l-c-3: rgb(254 209 209 / 0.15);
        }
        &:nth-child(9n + 8) {
            --l-c-1: #e4f0ff;
            --l-c-2: #aed2ff;
            --l-c-3: rgb(214 232 255 / 0.15);
        }
        &:nth-child(9n + 9) {
            --l-c-1: #ffecb4;
            --l-c-2: #fbde89;
            --l-c-3: rgb(255 236 180 / 0);
        }
    }
    .module-header {
        margin-bottom: 50px;
    }
    .module-title {
        font-size: var(--module-title-size);
        font-weight: 700;

        margin-right: em(45px, 40px);

        color: #191a15;
    }
    .teacher-category {
        padding-bottom: 5px;
        .category-item {
            @include space-between(em(30px, 16px));
            font-size: 16px;

            position: relative;

            padding: 0 em(10px, 16px);

            cursor: pointer;
            transition: 0.36s ease;

            color: #777;
            &:hover,
            &[data-active] {
                color: #2d2b32;
                &::after {
                    top: calc(100% + 4px);

                    opacity: 1;
                }
            }
            &::after {
                position: absolute;
                top: calc(100% + em(9px, 16px));
                left: 50%;

                width: em(24px, 16px);
                height: 3px;

                content: "";
                transition: 0.36s ease;
                transform: translateX(-50%);

                opacity: 0;
                border-radius: 4px;
                background: #2d2b32;
            }
        }
    }
    .item-info {
        font-size: 22px;

        overflow: hidden;
        flex: 1 1 auto;

        padding: em(30px, 22px) em(34px, 22px) em(37px, 22px);

        border: 1px solid #e4ecf5;
        border-top-width: 0;
        border-radius: 0 0 12px 12px;
    }
    .item-title {
        font-weight: 700;

        margin-bottom: 7px;

        color: #333;
    }
    .item-tags {
        // @include ellipse(1);
        font-size: em(15px, 22px);

        display: block;

        color: #777;
        &::after {
            display: block;
            clear: both;

            content: "";
        }
        .item-tag {
            display: inline-flex;
            float: left;

            // white-space: nowrap;

            align-items: center;
            &::after {
                display: inline-flex;

                width: 1px;
                height: em(14px, 15px);
                margin: 0 em(13px, 15px);

                content: "";
                transform: rotate(24deg);

                background-color: #777;
            }
            &:last-child {
                &::after {
                    display: none;
                }
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .teacher-category {
            .category-item {
                font-size: 14px;
            }
        }
        .item-info {
            font-size: 19px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-header {
            margin-bottom: 40px;
        }
        .item-info {
            font-size: 15px;
        }
        .teacher-category {
            padding-bottom: 0;
            .category-item {
                font-size: 13px;
            }
        }
        .teacher-item {
            .item-thumb::after {
                border-width: 1px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .module-header {
            margin-bottom: 20px;
        }
        .teacher-category {
            overflow: auto;

            margin-top: 20px;
            padding-bottom: 20px;

            white-space: nowrap;
            .category-item {
                @include space-between(10px);
            }
        }
    }
    @include media-breakpoint-only(sm) {
        .teacher-item {
            .item-thumb {
                border-radius: 12px 0 0 12px;
                .img-box {
                    @include image-placeholder(880px, 600px);
                    z-index: 10;

                    width: 100%;
                }
                &::after {
                    border: 2px solid transparent;
                    border-radius: 12px 0 0 12px;
                }
                &::before {
                    background-image: linear-gradient(
                        90deg,
                        var(--l-c-2) 0%,
                        var(--l-c-3) 100%
                    );
                }
            }
        }
        .item-info {
            font-size: 18px;

            padding: em(30px, 22px) em(34px, 22px) em(57px, 22px);

            border-top-width: 1px;
            border-left-width: 0;
            border-radius: 0 12px 12px 0;
        }
    }
    @include media-breakpoint-down(sm) {
        .module-title {
            font-size: 24px;
        }
        .item-info {
            font-size: 17px;
        }
        .item-tag {
            font-size: 13px;
        }
    }
}
</style>
