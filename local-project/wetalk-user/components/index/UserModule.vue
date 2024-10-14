<template>
    <section :class="$style['user-module']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['module-body']">
                    <div class="state-pos--left" :class="$style['left-area']">
                        <div :class="$style['layer--sticky']">
                            <div :class="$style['user-panel']">
                                <div :class="$style['duration']">
                                    <p class="flex items-center">
                                        <span class="text">{{
                                            $t("KEY_USER_PANEL.TIP.2")
                                        }}</span
                                        ><img
                                            src="@/assets/images/user/wetalk.png"
                                        />
                                    </p>
                                    <p>
                                        <span class="text">{{
                                            $t("KEY_USER_PANEL.TIP.1", [
                                                days || 0,
                                            ])
                                        }}</span>
                                    </p>
                                </div>
                                <div>
                                    <UserAvatar
                                        :class="$style['user-avatar']"
                                    />
                                    <div :class="$style['user-name']">
                                        {{ userInfo?.firstName }}
                                        {{ userInfo?.lastName }}
                                    </div>
                                    <div :class="$style['user-location']">
                                        <div :class="$style['location']">
                                            <i
                                                class="ic iconfont icon-location"
                                            ></i>
                                            <span class="text">{{
                                                userInfo?.native
                                            }}</span>
                                        </div>
                                        <div :class="$style['location-time']">
                                            <span class="text">
                                                {{
                                                    $t("KEY_USER_PANEL.TIP.0", [
                                                        userInfo?.timezone
                                                            .country,
                                                        time,
                                                    ])
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div :class="$style['user-ad-1']">
                                <img src="@/assets/images/user/ad-1.png" />
                            </div>
                            <div :class="$style['user-ad-2']">
                                <img src="@/assets/images/user/ad-2.png" />
                            </div>
                        </div>
                    </div>
                    <div class="state-pos--right">
                        <IndexBookingPanel
                            v-if="
                                trialLessonReport &&
                                (trialLessonReport.status === 0 ||
                                    trialLessonReport.status === 3)
                            "
                            :data="trialLessonReport"
                            @refresh="refresh"
                        />
                        <IndexRecentLessonPanel
                            v-if="lastUserLesson"
                            :data="lastUserLesson"
                            @refresh="refresh"
                        />
                        <IndexOwnLessonPanel
                            v-if="userCourses?.length"
                            :data="userCourses"
                        />
                        <IndexFinishLessonPanel
                            v-if="endUserLessons?.length"
                            :data="endUserLessons"
                        />
                        <IndexRecommendLessonPanel />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import type {
    TRIAL_LESSON_REPORT,
    TYPE_USER_LESSON,
    TYPE_STUDENT_HOME_PAGE,
} from "@/assets/script/api/api";

import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    ref,
} from "vue";
import { useFetch } from "@nuxtjs/composition-api";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import millisecondsToHours from "date-fns/millisecondsToHours";
import { getStudentHomePage } from "@/assets/script/api/api";
import { getUtcTime } from "@/assets/script/util/get-utc-time";

export default defineComponent({
    setup() {
        const trialLessonReport = ref<TRIAL_LESSON_REPORT>();
        const lastUserLesson = ref<TYPE_USER_LESSON>();
        const userCourses = ref<TYPE_STUDENT_HOME_PAGE["userCourses"]>();
        const endUserLessons = ref<TYPE_USER_LESSON[]>();

        const userStore = useUserStore();
        const { userInfo } = storeToRefs(userStore);

        const currentDate = ref<number>(new Date().getTime());
        const time = computed(() => {
            const timeZone = userInfo.value?.timezone.timezoneName;
            return getUtcTime(new Date(currentDate.value), timeZone);
        });
        const days = computed(() => {
            if (!userInfo.value) return;
            const distance = millisecondsToHours(
                currentDate.value - userInfo.value.regtime * 1000
            );
            return Math.ceil(distance / 24);
        });

        function updateStudentHomePage() {
            return getStudentHomePage().then((res) => {
                if (res.statusCode === 0) {
                    trialLessonReport.value = res.data.trialLessonReport;
                    lastUserLesson.value = res.data.lastUserLesson;
                    userCourses.value = res.data.userCourses;
                    endUserLessons.value = res.data.endUserLessons;
                }
            });
        }

        useFetch(async () => {
            await updateStudentHomePage();
        });

        function refresh() {
            updateStudentHomePage();
        }

        onMounted(() => {
            currentDate.value = new Date().getTime();
            const timer = setInterval(() => {
                currentDate.value = new Date().getTime();
            }, 1000);
            onBeforeUnmount(() => {
                clearInterval(timer);
            });
        });

        return {
            days,
            time,
            userInfo,
            trialLessonReport,
            lastUserLesson,
            userCourses,
            endUserLessons,
            refresh,
        };
    },
});
</script>
<style lang="scss" module>
.user-module {
    .module-body {
        display: grid;

        gap: var(--panel-space-between);
        grid-template-columns: 340px auto;
        & > :global(.state-pos--left),
        & > :global(.state-pos--right) {
            display: flex;
            flex-direction: column;
            /* stylelint-disable-next-line selector-max-compound-selectors */
            & > * {
                @include space-between(var(--panel-space-between), "y");
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .module-body {
            grid-template-columns: 280px auto;
        }
    }
    @include media-breakpoint-down(lg) {
        .module-body {
            display: block;
        }
    }
}
//  左侧面板
.layer--sticky {
    position: sticky;
    top: calc(var(--nav-h) + var(--y-space-normal));
    bottom: var(--y-space-normal);
    & > * {
        @include space-between(var(--panel-space-between), "y");
    }
    .user-panel {
        font-size: 14px;

        position: relative;

        display: flex;
        flex-direction: column;

        padding: 45px 10px 32px;

        text-align: center;

        border-radius: $panel-radius;
        background-color: #fff;

        align-items: center;
        .duration {
            font-size: 12px;
            line-height: em(18px, 12px);

            position: absolute;
            top: 26px;
            left: 30px;

            text-align: left;

            color: #777;
            span {
                margin-left: 6px;
            }
            img {
                height: 12px;
            }
        }
        .user-avatar {
            width: 130px;
            margin: 0 auto;
            margin-bottom: 8px;
        }
        .user-name {
            font-size: 18px;
            font-weight: 700;
            font-style: normal;
            line-height: em(26px, 18px);

            margin-bottom: 7px;
        }
        .user-location {
            margin-top: 24px;

            color: #777;
        }
    }
    .user-ad-1 {
        @include image-placeholder(340px, 140px);
        width: 100%;

        border-radius: $panel-radius;
        background-color: #fff;
    }
    .user-ad-2 {
        @include image-placeholder(340px, 214px);
        width: 100%;

        border-radius: $panel-radius;
        background-color: #fff;
    }
    @include media-breakpoint-down(xl) {
        .user-panel {
            font-size: 12px;

            padding: 65px 10px 32px;
            .user-avatar {
                width: 100px;
            }
            .user-name {
                font-size: 16px;

                margin-bottom: 7px;
            }
            .user-location {
                margin-top: 18px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        position: static;

        display: grid;

        margin-bottom: var(--panel-space-between) !important;

        gap: var(--panel-space-between);

        grid-template-columns: 1.53214286fr 1fr;
        .user-panel {
            display: none;
        }
        .user-ad-1 {
            margin-bottom: 0;
        }
    }
}
</style>
