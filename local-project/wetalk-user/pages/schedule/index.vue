<!--
 * @Author: F-Stone 我的课表页面
 * @LastEditTime: 2023-01-11 14:25:21
-->
<template>
    <div :class="$style['schedule-page']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['schedule-module']">
                    <div :class="$style['module-body']">
                        <div :class="$style['calendar-bar']" class="grid">
                            <div :class="$style['tab-show']">
                                <div class="relative">
                                    <div
                                        :class="$style['tab-block']"
                                        :data-type="showType"
                                    ></div>

                                    <button
                                        @click="showType = 'calendar'"
                                        :data-active="showType === 'calendar'"
                                    >
                                        {{ $t("KEY_CALENDAR.TITLE") }}
                                    </button>
                                    <button
                                        @click="showType = 'list'"
                                        :data-active="showType === 'list'"
                                    >
                                        {{ $t("KEY_CALENDAR.LIST") }}
                                    </button>
                                </div>
                            </div>
                            <div
                                :class="$style['tab-time']"
                                class="flex items-center"
                            >
                                <button @click="prevMonth">
                                    <i class="ic iconfont icon-arrow-left"></i>
                                </button>
                                <div :class="$style['month']">
                                    {{ date.month }}
                                </div>
                                <button
                                    :class="$style['btn--tab-month']"
                                    @click="nextMonth"
                                >
                                    <i class="ic iconfont icon-arrow-right"></i>
                                </button>
                            </div>
                            <div :class="$style['go-today']" @click="toTody">
                                <button>{{ $t("KEY_CALENDAR.TODAY") }}</button>
                            </div>
                        </div>
                        <div
                            :class="$style['calendar']"
                            v-if="showType === 'calendar'"
                        >
                            <div
                                :class="$style['head']"
                                class="grid grid-cols-7"
                            >
                                <div
                                    v-for="(item, index) in WEEK"
                                    :key="index"
                                    :class="$style['day']"
                                >
                                    <span class="text">
                                        {{ $t("KEY_CALENDAR.WEEK", [item]) }}
                                    </span>
                                </div>
                            </div>
                            <div
                                :class="$style['body']"
                                class="grid grid-cols-7"
                            >
                                <div
                                    :class="$style['day']"
                                    v-for="(item, index) in date.days"
                                    :data-list="!!userLesson[item.ymd]"
                                    :key="index"
                                    :data-active="item.active"
                                    @click="selectTime = item.ymd"
                                    :data-select="selectTime === item.ymd"
                                    :data-weekend="[0, 6].includes(item.week)"
                                >
                                    <span class="text" :class="$style['num']">
                                        {{ item.num }}
                                    </span>
                                    <div class="text" :class="$style['lunar']">
                                        {{ item.lunar }}
                                    </div>
                                    <div
                                        :class="$style['schedule-list']"
                                        v-if="userLesson[item.ymd]"
                                    >
                                        <template
                                            v-for="(
                                                lesson, index
                                            ) in userLesson[item.ymd]"
                                        >
                                            <Link
                                                :class="$style['list-item']"
                                                :key="index"
                                                :to="
                                                    linkManage.courseLesson +
                                                    '/' +
                                                    lesson.id
                                                "
                                                :data-state="lesson.state"
                                                target="_blank"
                                            >
                                                <span :class="$style['time']">{{
                                                    lesson.time
                                                }}</span>
                                                <span
                                                    :class="$style['title']"
                                                    >{{ lesson.title }}</span
                                                >
                                            </Link>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            :class="$style['calendar-list']"
                            v-if="showType === 'list'"
                        >
                            <div
                                :class="$style['category-list']"
                                class="inline-grid grid-cols-3"
                            >
                                <PublicButton
                                    v-for="(
                                        item, index
                                    ) in currentCategoryOption"
                                    :key="index"
                                    :active="currentCategory === item.value"
                                    :class="$style['button']"
                                    @click.native="
                                        changeCurrentCategory(item.value)
                                    "
                                >
                                    <span class="text">{{ item.title }}</span>
                                </PublicButton>
                            </div>
                            <div
                                :class="$style['lesson-list']"
                                v-if="showCourse.length"
                            >
                                <div
                                    :class="$style['list-item']"
                                    v-for="item in showCourse"
                                    :key="item.id"
                                >
                                    <div
                                        :class="$style['item-row']"
                                        class="flex items-start"
                                    >
                                        <div :class="$style['date']">
                                            <div :class="$style['time']">
                                                {{ item.time }}
                                            </div>
                                            <div :class="$style['day']">
                                                {{
                                                    getWeekTimeReverse(
                                                        item.date,
                                                        lang
                                                    )
                                                }}
                                            </div>
                                        </div>
                                        <div :class="$style['title']">
                                            <span class="text">{{
                                                item.title
                                            }}</span>
                                        </div>
                                        <PublicButton
                                            :class="$style['button']"
                                            :to="
                                                linkManage.courseLesson +
                                                '/' +
                                                item.id
                                            "
                                            target="_blank"
                                        >
                                            <span class="text">{{
                                                $t("KEY_BASE.DETAIL")
                                            }}</span>
                                        </PublicButton>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="relative"
                                v-else
                                :class="$style['empty-panel']"
                            >
                                <div
                                    class="flex items-center justify-center"
                                    :class="$style['box']"
                                >
                                    <div>
                                        <span class="text">{{
                                            $t("KEY_BASE.EMPTY2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="userLesson[selectTime]"
                            :class="$style['select-day-list']"
                            class="hidden md:block"
                        >
                            <div :class="$style['schedule-list']">
                                <template
                                    v-for="(lesson, index) in userLesson[
                                        selectTime
                                    ]"
                                >
                                    <Link
                                        :class="$style['list-item']"
                                        :key="index"
                                        :to="
                                            linkManage.courseLesson +
                                            '/' +
                                            lesson.id
                                        "
                                        :data-state="lesson.state"
                                        target="_blank"
                                    >
                                        <span :class="$style['time']">{{
                                            lesson.time
                                        }}</span>
                                        <span :class="$style['title']">{{
                                            lesson.title
                                        }}</span>
                                    </Link>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext, useRoute, useRouter } from "@nuxtjs/composition-api";
import { Solar, SolarMonth } from "lunar-typescript";
import { computed, onMounted, reactive, ref, watch } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";
import { getMySchedule } from "@/assets/script/api/api";
import {
    getClock,
    getEndOfMonth,
    getStartOfMonth,
    getWeekTimeReverse,
} from "@/assets/script/util/date";
import { useSiteStore } from "~/store/site";

const { i18n, app } = useContext();

const lang = app.i18n.locale;

const selectTime = ref<any>();
const showType = ref<"list" | "calendar">("calendar");
watch(showType, () => {
    selectTime.value = "";
});

const WEEK = [
    i18n.t("KEY_CALENDAR.DAY.0"),
    i18n.t("KEY_CALENDAR.DAY.1"),
    i18n.t("KEY_CALENDAR.DAY.2"),
    i18n.t("KEY_CALENDAR.DAY.3"),
    i18n.t("KEY_CALENDAR.DAY.4"),
    i18n.t("KEY_CALENDAR.DAY.5"),
    i18n.t("KEY_CALENDAR.DAY.6"),
];
const date = reactive<{
    month: string;
    days: {
        active: boolean;
        num: number;
        lunar: string;
        week: number;
        ymd: string;
    }[];
}>({
    month: "",
    days: [],
});

const currentDate = new Date();
const searchTime = ref<{ begintime: number; endtime: number }>({
    begintime: 0,
    endtime: 0,
});

const userLessonList = ref<
    {
        id: number;
        date: number;
        time: string;
        title: string;
        state: number;
    }[]
>([]);

const userLesson = computed(() => {
    const result: any = {};
    userLessonList.value.forEach((item) => {
        const data = Solar.fromDate(new Date(item.date * 1000)).toYmd();
        if (!result[data]) {
            result[data] = [];
        }
        result[data].push(item);
    });
    return result;
});

function toLunar(d: Solar) {
    const dl = d.getLunar();
    let lunar = "";
    const fs = [];
    const jq = dl.getJieQi();
    const l = dl.getFestivals();
    if (jq) {
        fs.push(jq);
    }
    if (l) {
        fs.push(...l);
    }
    if (fs.length > 0) {
        lunar += fs.join(",");
    } else {
        if (1 == dl.getDay()) {
            lunar += dl.getMonthInChinese() + i18n.t("KEY_CALENDAR.MONTH");
        } else {
            lunar += dl.getDayInChinese();
        }
    }
    return lunar;
}
function generate(mm: SolarMonth) {
    searchTime.value = {
        begintime: getStartOfMonth(new Date(mm.toString())),
        endtime: getEndOfMonth(new Date(mm.toString())),
    };
    date.days = [];
    const month = mm.getMonth();
    date.month =
        mm.getYear() +
        i18n.t("KEY_CALENDAR.YEAR") +
        " " +
        (month >= 10 ? month : "0" + month) +
        i18n.t("KEY_CALENDAR.MONTH");
    const days = mm.getDays();
    const firstWeek = days[0].getWeek();
    for (let i = 0; i < firstWeek; i++) {
        const prevDate = days[0].next(i - firstWeek);
        date.days.push({
            num: prevDate.getDay(),
            lunar: toLunar(prevDate),
            ymd: prevDate.toYmd(),
            week: prevDate.getWeek(),
            active: false,
        });
    }
    for (let i = 0, j = days.length; i < j; i++) {
        const d = days[i];
        date.days.push({
            num: d.getDay(),
            lunar: toLunar(d),
            week: d.getWeek(),
            ymd: d.toYmd(),
            active: d.toYmd() === Solar.fromDate(new Date()).toYmd(),
        });
    }
    const lastDay = days[days.length - 1];
    const lastWeek = lastDay.getWeek();
    for (let i = lastWeek; i < WEEK.length - 1; i++) {
        const nextDate = lastDay.next(i - lastWeek + 1);
        date.days.push({
            num: nextDate.getDay(),
            lunar: toLunar(nextDate),
            ymd: nextDate.toYmd(),
            week: nextDate.getWeek(),
            active: false,
        });
    }
}
let month = SolarMonth.fromDate(currentDate);
generate(month);
function nextMonth() {
    month = month.next(1);
    generate(month);
}
function prevMonth() {
    month = month.next(-1);
    generate(month);
}

function toTody() {
    generate(SolarMonth.fromDate(currentDate));
}

const currentCategory = ref<1 | 2 | 3>(1);
const currentCategoryOption: { title: string; value: 1 | 2 | 3 }[] = [
    {
        title: i18n.t("KEY_BASE.COURSE_STATUS.3"),
        value: 1,
    },
    {
        title: i18n.t("KEY_BASE.COURSE_STATUS.2"),
        value: 2,
    },
    {
        title: i18n.t("KEY_BASE.COURSE_STATUS.6"),
        value: 3,
    },
];
const router = useRouter();
const route = useRoute();
function changeCurrentCategory(value: 1 | 2 | 3) {
    router.replace({
        path: router.currentRoute.path,
        query: {
            status: value.toString(),
        },
    });
}
watch(
    () => {
        return route.value.query;
    },
    (query) => {
        const status = Number(query.status);
        if ([1, 2, 3].includes(status)) {
            currentCategory.value = status as any;
        } else {
            currentCategory.value = 1;
        }
    },
    { immediate: true }
);

const showCourse = computed(() => {
    return userLessonList.value.filter((item) => {
        if (currentCategory.value === 3) {
            return item.state >= 3;
        }
        return item.state === currentCategory.value;
    });
});

function updateLessonList() {
    const { begintime, endtime } = searchTime.value;
    getMySchedule({ begintime, endtime }).then((res) => {
        if (res.statusCode === 0) {
            userLessonList.value = res.data.map((item) => {
                return {
                    id: item.userLessonid,
                    date: item.menkeStarttime,
                    time:
                        getClock(item.menkeStarttime) +
                        "-" +
                        getClock(item.menkeEndtime),
                    title: item.lessonName,
                    state: item.menkeState,
                };
            });
        }
    });
}
watch(searchTime, updateLessonList, { deep: true });

const siteStore = useSiteStore();
watch(
    () => {
        let result = "";
        Object.entries(siteStore.mediaMatch).some(([k, v]) => {
            if (v === true) {
                result = k;
                return true;
            }
        });
        return result;
    },
    () => {
        selectTime.value = "";
    }
);

onMounted(() => {
    searchTime.value = {
        begintime: getStartOfMonth(new Date(month.toString())),
        endtime: getEndOfMonth(new Date(month.toString())),
    };
});
</script>
<style lang="scss" module>
.schedule-page {
    // init
}
.schedule-module {
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    .calendar-bar {
        margin-bottom: c-space(4);

        grid-template-columns: 200px 1fr 200px;
        .tab-time {
            font-family: "Inter";
            font-size: 20px;
            font-weight: 700;
            line-height: em(24px, 20px);

            /* dark/d/1 */

            color: #323338;

            justify-self: center;
            .month {
                margin: 0 10px;
            }
            button {
                padding: 0 em(20px, 20px);
            }
        }
        .tab-show {
            position: relative;

            padding: 3px;

            color: #777;
            border-radius: 6px;
            background: #f5f6f9;

            justify-self: start;
            button {
                font-size: 12px;
                line-height: em(18px);

                position: relative;
                z-index: 10;

                padding: 4px 29px;

                text-align: center;

                color: #777;
                &[data-active] {
                    color: #1a1d1f;
                }
            }
            .tab-block {
                position: absolute;
                top: 0;
                left: 0;

                width: 50%;
                height: 100%;

                transition: 0.26s ease;

                background-color: #fff;
                &[data-type="list"] {
                    left: 50%;
                }
            }
        }
        .go-today {
            justify-self: end;
            button {
                font-size: 12px;
                line-height: em(18px);

                padding: 7px 28px;

                color: #777;
                border-radius: 6px;
                background: #f5f6f9;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        padding: c-space(3);
        .calendar-bar {
            .tab-time {
                font-size: 16px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .calendar-bar {
            grid-template-columns: auto auto;
            .tab-time {
                padding-top: 30px;

                grid-area: 2 / 1 / 3 / 3;
            }
        }
        .select-day-list {
            margin-top: 20px;
            padding: 20px 0;
            .list-item {
                @include space-between(20px, y);
                --color: #6147ff;
                position: relative;

                display: block;

                padding-bottom: 20px;
                padding-left: 20px;

                border-bottom: 1px solid #e6e8ec;
                .time {
                    display: block;
                }
                &:last-child {
                    border-bottom-width: 0;
                }
                &::after {
                    position: absolute;
                    top: 7px;
                    left: 0;

                    width: 4px;
                    height: 30px;

                    content: "";

                    border-radius: 4px;
                    background-color: var(--color);
                }
                &:nth-of-type(1) {
                    --color: #ff4747;
                }
                &:nth-of-type(2) {
                    --color: #ffb131;
                }
                &:nth-of-type(3) {
                    --color: #00ca72;
                }
                &:nth-of-type(4) {
                    --color: #16e7da;
                }
                &:nth-of-type(5) {
                    --color: #2e80ff;
                }
                &:nth-of-type(6) {
                    --color: #6147ff;
                }
                &:nth-of-type(7) {
                    --color: #ff47ed;
                }
                &[data-state="3"],
                &[data-state="4"] {
                    --color: #2d2b32;
                    color: #bac0d1;
                }
            }
        }
    }
}
.calendar {
    .schedule-list {
        .list-item {
            @include space-between(3px, "y");
            --color: #6147ff;
            font-family: "Inter";
            font-size: 11px;
            font-weight: 700;
            line-height: em(16px, 11px);

            position: relative;

            width: 100%;
            padding: 9px 6px;

            text-align: left;

            color: #323338;
            border-left: 2px solid var(--color);
            border-radius: 0 4px 4px 0;
            &::after {
                @include ab-cover;
                z-index: 1;

                content: "";

                opacity: 0.1;
                background-color: var(--color);
            }
            & > * {
                position: relative;
                z-index: 10;

                display: block;
            }
            &:nth-of-type(1) {
                --color: #ff4747;
            }
            &:nth-of-type(2) {
                --color: #ffb131;
            }
            &:nth-of-type(3) {
                --color: #00ca72;
            }
            &:nth-of-type(4) {
                --color: #16e7da;
            }
            &:nth-of-type(5) {
                --color: #2e80ff;
            }
            &:nth-of-type(6) {
                --color: #6147ff;
            }
            &:nth-of-type(7) {
                --color: #ff47ed;
            }
            &[data-state="3"],
            &[data-state="4"] {
                --color: #2d2b32;
                box-shadow: none;
                &:hover {
                    background-color: transparent;
                }
            }
        }
    }
    .day {
        position: relative;

        margin: -1px;

        border: 1px solid #e8ecee;
        background-color: #fff;
        &[data-active] {
            z-index: 100;

            border-color: #3b71fe;
            .num {
                color: #3b71fe;
            }
        }
        & > * {
            display: block;
        }
    }
    .head {
        font-size: 14px;
        .day {
            line-height: 1;

            padding: em(20px, 14px) 0;

            text-align: center;

            color: #323338;
        }
    }
    .body {
        font-size: 14px;
        .day {
            min-height: 120px;
            padding: 14px 0 0;
            &[data-weekend] {
                background: #f5f7fd;
                .num,
                .lunar {
                    color: #bac0d1;
                }
            }
        }
        .num {
            font-family: "Inter";
            line-height: em(18px, 14px);

            padding: 0 em(15px, 14px);

            color: #5b5c60;
        }
        .lunar {
            font-size: em(12px, 14px);
            line-height: em(18px, 12px);

            padding: 0 em(15px, 12px);

            color: #bac0d1;
        }
    }
    @include media-breakpoint-down(lg) {
        .head {
            font-size: 12px;
        }
        .body {
            font-size: 12px;
        }
    }
    @include media-breakpoint-down(md) {
        .schedule-list {
            display: none;
        }
        .body {
            .day {
                position: relative;

                min-height: 90px;

                cursor: pointer;
            }
        }
        .day {
            &[data-list] {
                &::after {
                    @include circle(7px, #777);
                    position: absolute;
                    right: 0;
                    bottom: 14px;
                    left: 0;

                    margin: 0 auto;

                    content: "";
                }
            }
            &[data-select] {
                &::after {
                    @include circle(7px, #f29100);
                }
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .body {
            .day {
                min-height: 70px;
                padding: 0;
            }
        }
        .day {
            display: flex;
            flex-direction: column;

            text-align: center;

            align-items: center;
            justify-content: center;
            &[data-list] {
                &::after {
                    @include circle(6px, #777);
                    bottom: 8px;
                }
            }
            &[data-select] {
                &::after {
                    @include circle(6px, #f29100);
                }
            }
        }
    }
}
.calendar-list {
    .category-list {
        margin-top: 45px;
        margin-bottom: 30px;

        gap: 13px;
    }
    .lesson-list {
        .list-item {
            padding: 28px 0;

            border-bottom: 1px solid #e6e8ec;
            &:last-child {
                border-bottom-width: 0;
            }
            .item-state {
                margin-bottom: 4px;
                &[data-state="2"] {
                    color: #29cc6a;
                }
                &[data-state="3"] {
                    color: #f8af00;
                }
                &[data-state="4"] {
                    color: #fc5555;
                }
            }
        }
        .date {
            flex: 0 0 auto;

            width: 206px;
            padding-right: 30px;
        }
        .time {
            font-size: 18px;
            font-weight: 700;
            line-height: em(27px, 18px);

            margin-bottom: 5px;

            color: #2d2b32;
        }
        .day {
            font-size: 12px;
            line-height: em(18px, 12px);

            color: #777;
        }
        .title {
            font-size: 18px;
            font-weight: 700;
            line-height: em(27px, 18px);

            flex: 1 1 auto;

            color: #2d2b32;
        }
        .buttons[data-layout="1"] {
            .button {
                @include space-between(10px);
                padding: 12px 40px;

                border-radius: 6px;
            }
        }
        .buttons[data-layout="2"] {
            .button {
                @include space-between(10px);
                font-size: 12px;
                line-height: em(18px, 12px);

                padding: 8px 25px;

                border-radius: 25px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .category-list {
            display: grid;

            margin-top: 0;
            margin-bottom: 20px;

            grid-template-columns: repeat(3, 1fr);
            .button {
                padding: 12px 4px;

                border-radius: 4px;

                gap: 6px;
            }
        }
        .item-row {
            display: grid;

            grid-template-columns: 1fr auto;
            .title {
                margin: 20px 0;

                grid-area: 2 / 1 / 3 / 2;
            }
            .button {
                align-self: center;
                grid-area: 2 / 2 / 3 / 3;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .category-list {
            .button {
                font-size: 12px;

                padding: 8px 4px;
            }
        }
        .item-row {
            display: grid;

            grid-template-columns: 1fr;
            .title {
                grid-area: initial;
            }
            .button {
                text-align: center;

                border-radius: 4px;

                grid-area: initial;
            }
        }
    }
}
.empty-panel {
    @include space-placeholder(880px, 437px);
    max-width: 100%;

    border-radius: 10px;
    background: #fafafc;
    .box {
        @include ab-cover;
    }
}
</style>
