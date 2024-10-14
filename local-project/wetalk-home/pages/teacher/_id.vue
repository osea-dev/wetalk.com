<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-13 16:07:30
-->
<template>
    <div :class="$style['teacher-detail-container']" v-if="teacherDetail">
        <div :class="$style['banner-module']" class="p-module">
            <div class="wrapper--limit-width">
                <div
                    class="wrapper--limit-width-mini flex items-end justify-between lg:flex-col-reverse lg:items-center"
                >
                    <div
                        :class="$style['wrapper-info']"
                        class="relative z-20 wow-group-5"
                    >
                        <div
                            :class="$style['teacher-row']"
                            class="wow animate__fadeInUp-50"
                        >
                            <h3 :class="$style['teacher-name']">
                                {{ teacherDetail.name }}
                            </h3>
                            <div
                                :class="$style['teacher-tags']"
                                class="flex items-center"
                            >
                                <template
                                    v-for="(item, index) in teacherDetail.keys"
                                >
                                    <div
                                        :class="$style['tag-item']"
                                        :key="index"
                                    >
                                        <span class="text">{{ item }}</span>
                                        <i
                                            :class="$style['divide-line']"
                                            class="ic"
                                            v-if="
                                                index !=
                                                teacherDetail.keys.length - 1
                                            "
                                        ></i>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <p
                            :class="$style['teacher-desc']"
                            class="wow animate__fadeInUp-50"
                        >
                            {{ teacherDetail.desc }}
                        </p>
                        <div
                            :class="$style['teacher-info']"
                            class="wow animate__fadeInUp-50"
                        >
                            <div :class="$style['row']">
                                <span :class="$style['title']"
                                    >{{ $t("出生地") }}:
                                </span>
                                <span :class="$style['value']">{{
                                    teacherDetail.comeFrom
                                }}</span>
                            </div>
                            <div :class="$style['row']">
                                <span :class="$style['title']"
                                    >{{ $t("教育") }}:
                                </span>
                                <span :class="$style['value']">{{
                                    teacherDetail.edu
                                }}</span>
                            </div>
                            <div
                                :class="$style['row']"
                                v-if="teacherDetail.religion"
                            >
                                <span :class="$style['title']"
                                    >{{ $t("宗教信仰") }}:
                                </span>
                                <span :class="$style['value']">{{
                                    teacherDetail.religion
                                }}</span>
                            </div>
                        </div>
                        <div
                            :class="$style['info-footer']"
                            class="flex wow animate__fadeInUp-50"
                            v-if="
                                teacherDetail.motto || teacherDetail.philosophy
                            "
                        >
                            <div
                                :class="$style['wrapper--info-btn']"
                                class="relative z-20"
                                @click="openDetail('motto')"
                                v-if="teacherDetail.motto"
                            >
                                <div
                                    :class="$style['info-btn']"
                                    class="inline-flex items-center"
                                >
                                    <span class="text">{{ $t("座右铭") }}</span>
                                    <i class="ic iconfont icon-arrow-down"></i>
                                </div>
                                <div
                                    :class="$style['info-box']"
                                    v-html="teacherDetail.motto"
                                ></div>
                            </div>
                            <div
                                :class="$style['wrapper--info-btn']"
                                class="relative z-10"
                                @click="openDetail('philosophy')"
                                v-if="teacherDetail.philosophy"
                            >
                                <div
                                    :class="$style['info-btn']"
                                    class="inline-flex items-center"
                                >
                                    <span class="text">{{
                                        $t("哲学修养")
                                    }}</span>
                                    <i class="ic iconfont icon-arrow-down"></i>
                                </div>
                                <div
                                    :class="$style['info-box']"
                                    v-html="teacherDetail.philosophy"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div
                        :class="$style['wrapper-thumb']"
                        class="relative z-10 flex sm:block sm:w-full"
                    >
                        <div :class="$style['thumb-box']" class="wow-group-2">
                            <img :src="teacherDetail.photo" alt="" />
                            <div
                                :class="$style['icon']"
                                class="wow animate__fadeInUp-50"
                            ></div>
                            <div
                                :class="$style['icon-2']"
                                class="wow animate__fadeInUp-50"
                            ></div>
                        </div>

                        <div
                            :class="$style['teach-advantage-list']"
                            class="wow-group-4"
                        >
                            <div
                                :class="$style['category-tag']"
                                class="wow animate__fadeInRight-30"
                            >
                                <span class="text">{{
                                    teacherDetail.category
                                }}</span>
                            </div>
                            <div
                                v-for="(
                                    advantage, index
                                ) in teacherDetail.advantages"
                                :key="index"
                                :class="$style['advantage-item']"
                            >
                                <div :class="$style['item-row']">
                                    <span :class="$style['item-value']">{{
                                        advantage.value
                                    }}</span>
                                    <sup
                                        :class="$style['item-sup']"
                                        v-if="advantage.sup"
                                        >{{ advantage.sup }}</sup
                                    >
                                    <sub
                                        :class="$style['item-sub']"
                                        v-if="advantage.sub"
                                        >{{ advantage.sub }}</sub
                                    >
                                </div>
                                <div :class="$style['item-row']">
                                    <div :class="$style['item-title']">
                                        <span class="text">{{
                                            advantage.title
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MessageBoard class="p-module" />
    </div>
</template>
<script lang="ts">
import MessageBoard from "@/components/MessageBoard.vue";

import { getTeacherDetail } from "@/assets/script/api/api.teacher";
import type { TYPE_TEACHER_DETAIL } from "@/assets/script/api/api.teacher";
import {
    defineComponent,
    useFetch,
    useRoute,
    ref,
    useContext,
} from "@nuxtjs/composition-api";

export default defineComponent({
    components: {
        MessageBoard,
    },
    setup() {
        const teacherDetail = ref<TYPE_TEACHER_DETAIL>();
        const route = useRoute();
        const { $dialog } = useContext();

        useFetch(async () => {
            await getTeacherDetail({
                teacherid: Number(route.value.params.id),
            }).then((res) => {
                teacherDetail.value = res.data;
            });
        });
        return {
            teacherDetail,
            openDetail: (type: string) => {
                if ($("body").attr("data-has-hover") === "1") return;
                const text =
                    type === "motto"
                        ? teacherDetail.value?.motto
                        : teacherDetail.value?.philosophy;
                $dialog({
                    type: "text",
                    text: text || "",
                });
            },
        };
    },
});
</script>
<style lang="scss" module>
.teacher-detail-container {
    background-color: #f3f8ff;
}
.banner-module {
    padding-top: 160px;

    background-color: #f3f8ff;
    background-image: url("@/assets/images/teacher/banner-bg-1.png");
    background-repeat: no-repeat;
    background-position: top center;
    background-size: contain;
    .wrapper-info {
        width: 475px;
        padding-bottom: 157px;
    }
    .teacher-name {
        font-size: 30px;
        font-weight: 700;

        margin-bottom: em(8px, 30px);
    }
    .teacher-tags {
        font-size: 14px;

        white-space: nowrap;

        color: #777;

        flex-wrap: wrap;
        .divide-line {
            display: inline-block;

            width: 1px;
            height: 12px;
            margin: 0 10px;

            transform: rotate(30deg);

            background-color: #777;
        }
    }
    .teacher-desc {
        font-size: 14px;
        font-weight: 400;
        line-height: em(30px, 14px);

        margin-top: em(38px, 14px);

        color: #777;
    }
    .teacher-info {
        font-size: 14px;
        font-weight: 400;

        padding-top: 60px;

        color: #777;
        .row {
            @include space-between(19px, "y");
        }
    }
    .info-footer {
        margin-top: 50px;
    }
    .wrapper--info-btn {
        position: relative;

        height: 44px;
        &:hover {
            color: #2d2b32;
            .info-btn {
                :global(.ic) {
                    transform: rotate(-180deg);
                }
                &::after {
                    top: -25px;

                    width: 540px;
                    height: 230px;

                    transition-delay: 0s;

                    box-shadow: 0 30px 60px rgb(7 47 35 / 0.1);
                }
            }
            .info-box {
                visibility: visible;

                transition-delay: 0s;
                transform: translateY(0);

                opacity: 1;
            }
        }
    }
    .info-btn {
        @include space-between(20px);
        font-size: 16px;
        font-weight: 700;
        line-height: 1;

        position: relative;

        height: em(44px, 16px);
        padding: 0 em(40px, 16px);

        cursor: pointer;
        transition: 0.36s ease;

        color: #777;
        &:hover {
            color: #2d2b32;
        }
        &::after {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            content: "";
            transition: 0.28s ease;
            transition-delay: 0.2s;

            border-radius: em(22px, 16px);
            background-color: #fff;
        }
        :global(.text) {
            position: relative;
            z-index: 10;
        }
        :global(.ic) {
            font-weight: 400;

            position: relative;
            z-index: 10;

            display: inline-block;

            margin-left: 10px;

            transition: 0.36s ease;
        }
    }
    .info-box {
        font-size: 14px;
        font-weight: 400;
        line-height: em(28px, 14px);

        position: absolute;
        z-index: 20;
        left: 0;

        visibility: hidden;
        overflow: auto;

        width: 540px;
        height: 140px;
        padding: 14px 40px 35px;

        transition: 0.2s ease;
        transition-delay: 0.2s;
        // transform: translateY(20px);

        opacity: 0;
        color: #777;
    }
    .thumb-box {
        @include image-placeholder(546px, 721px);
        position: relative;

        overflow: visible;

        width: 556px;
        margin-right: 90px;
        img {
            z-index: 10;
        }
        .icon {
            @include image-placeholder(100px, 54px);
            position: absolute;
            z-index: 20;
            right: percent(-30px, 556px);
            bottom: percent(172px, 734.205128205128px);

            border-radius: 21.519px;
            background-image: url("@/assets/images/teacher/like-icon.png");
            background-size: cover;
            box-shadow: 0 11.3924px 50.6329px rgb(24 50 88 / 0.1);
        }
        .icon-2 {
            @include space-placeholder(389px, 480px);
            position: absolute;
            bottom: percent(36px, 734.205128205128px);
            left: percent(20px, 556px);

            width: percent(194.5px, 556px);

            background-image: url("@/assets/images/teacher/banner-bg-2.png");
            background-size: cover;
        }
    }
    .teach-advantage-list {
        padding-top: 88px;
    }
    .category-tag {
        display: inline-block;

        margin-bottom: 39px;
        padding: 10px 36px;

        color: #fff;
        border-radius: 25px;
        background: #0cc991;
    }
    .advantage-item {
        @include space-between(66px, "y");
        font-size: 14px;
        font-weight: 400;

        color: #777;
        .item-row {
            @include space-between(7px, "y");
        }
        .item-value {
            font-family: "Inter";
            font-size: 42px;
            font-weight: 700;
            line-height: em(51px, 42px);

            color: #0aca91;
        }
        .item-sub {
            font-size: 14px;

            bottom: -0;

            margin-left: 2px;
        }
        .item-sup {
            font-family: "Inter";
            font-size: 36px;
            font-weight: 700;

            top: -0.3em;

            color: #0aca91;
        }
    }
    @include media-breakpoint-down(xxxl) {
        padding-top: 130px;
        .thumb-box {
            width: 500px;
            margin-right: 70px;
        }
        .wrapper-info {
            width: 475px;
            padding-bottom: 110px;
        }
        .category-tag {
            margin-bottom: 40px;
        }
        .advantage-item {
            @include space-between(50px, "y");
        }
    }
    @include media-breakpoint-down(xxl) {
        .thumb-box {
            width: 400px;
            margin-right: 60px;
            .icon {
                width: 80px;
            }
        }
        .wrapper-info {
            width: 460px;
            padding-bottom: 70px;
        }
        .teacher-desc {
            font-size: 13px;
        }
        .teacher-tags {
            font-size: 13px;
        }
        .teacher-info {
            font-size: 13px;

            padding-top: 30px;
            .row {
                @include space-between(12px, "y");
            }
        }
        .info-btn {
            font-size: 14px;
        }
        .teach-advantage-list {
            padding-top: 68px;
        }
        .category-tag {
            margin-bottom: 30px;
        }
        .advantage-item {
            @include space-between(40px, "y");
            font-size: 13px;
            .item-value {
                font-size: 40px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .thumb-box {
            width: 320px;
            margin-right: 30px;
            .icon {
                width: 80px;
            }
        }
        .wrapper-info {
            width: 460px;
            padding-bottom: 50px;
        }
        .teacher-desc,
        .teacher-tags,
        .teacher-info {
            font-size: 12px;
        }
        .teacher-info {
            padding-top: 22px;
            .row {
                @include space-between(10px, "y");
            }
        }
        .info-btn {
            font-size: 13px;
        }
        .info-box {
            font-size: 13px;
        }
        .teach-advantage-list {
            width: 120px;
            padding-top: 18px;
            .advantage-item {
                @include space-between(30px, "y");
                font-size: 12px;
                .item-value {
                    font-size: 30px;
                }
                .item-sup {
                    font-size: 30px;
                }
            }
            .category-tag {
                margin-bottom: 30px;
                padding: 10px 20px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .wrapper-info {
            width: 100%;
            padding-top: 60px;
        }
        .thumb-box {
            margin-right: 40px;
        }
    }
    @include media-breakpoint-down(md) {
        .wrapper--info-btn:hover {
            .info-btn::after {
                width: 300px;
                height: 300px;
            }
        }
        .info-box {
            width: 300px;
            height: 220px;
        }
    }
    @include media-breakpoint-down(sm) {
        overflow: hidden;

        padding-top: 80px;

        background-size: 140%;
        .wrapper--info-btn {
            &:last-child {
                .info-btn {
                    margin: 0;
                }
            }
        }
        .info-btn {
            padding: 0 2em;
        }
        .thumb-box {
            width: 260px;
            margin: 0 auto;
        }
        .teacher-name {
            font-size: 26px;
        }
        .teach-advantage-list {
            position: relative;
            z-index: 10;

            display: grid;

            width: 100%;
            padding-top: 30px;

            gap: 30px 20px;

            grid-template-columns: repeat(3, 1fr);
            .advantage-item {
                margin: 0;
                .item-value {
                    font-size: 24px;
                }
                .item-sup {
                    font-size: 24px;
                }
            }
            .category-tag {
                position: absolute;
                bottom: 190%;

                margin-bottom: 0;

                grid-area: 1 / 1 / 2 / 4;
                justify-self: flex-start;
            }
        }
    }
}
body[data-is-mobile="1"] {
    .wrapper--info-btn {
        position: relative;
        .info-box {
            display: none;
        }
        &::after {
            @include ab-cover;
            content: "";
        }
    }
    .wrapper--info-btn:hover {
        .info-btn {
            &::after {
                top: 0;

                width: 100%;
                height: 100%;

                box-shadow: none;
            }
        }
    }
}
</style>
