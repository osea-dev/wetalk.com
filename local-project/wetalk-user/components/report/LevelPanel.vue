<!--
 * @Description: 定级报告详情
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 16:12:33
-->
<template>
    <div :class="$style['report-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['report-title']">
                {{ $t("KEY_REGISTER_PANEL.TIP.3") }}
            </h2>
            <div :class="$style['report-date']">
                <div :class="$style['day']">
                    {{ getWeekTimeReverse(time, lang) }}
                </div>
            </div>
        </div>
        <div :class="$style['panel-body']">
            <h2
                :class="$style['level-msg']"
                class="flex items-center justify-center"
            >
                <span class="text">{{ $t("KEY_BASE.CURRENT_LEVEL") }} </span>
                <TagLevel> Level {{ score }} </TagLevel>
            </h2>
            <div :class="$style['level-bar']">
                <div
                    :class="$style['bar-inner']"
                    :style="{ width: (score / 10) * 100 + '%' }"
                ></div>
                <div :class="$style['bar-num']" class="flex justify-between">
                    <div
                        :data-active="userLevel === item"
                        v-for="(item, index) in level"
                        :key="index"
                    >
                        <p>
                            <span>{{ item }}</span>
                            <svg
                                v-if="userLevel === item"
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M3.01571 1.57389C4.60642 3.05012 5.50007 5.05232 5.50007 7.14002V7.14308C5.50007 5.05537 6.39372 3.05317 7.98443 1.57694C8.69439 0.91808 9.51724 0.388077 10.4108 0.00315247C9.16346 0.00296077 6.04021 0.00310165 7.28578 0.00310166L5.50007 0.00315247V0.000100714L3.71436 4.99042e-05C4.95993 4.98904e-05 1.83668 -9.0987e-05 0.589355 0.000100714C1.4829 0.385026 2.30575 0.915028 3.01571 1.57389Z"
                                    fill="#F8AF00"
                                />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { getWeekTimeReverse } from "@/assets/script/util/date";
import { useContext } from "@nuxtjs/composition-api";

const { app } = useContext();
const lang = app.i18n.locale;
const prop = withDefaults(defineProps<{ time: number; score: number }>(), {
    time: 0,
    score: 0,
});

const level = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const userLevel = ref<number>(10);
level.some((item) => {
    if (prop.score >= item) {
        userLevel.value = item;
        return false;
    }
    return true;
});
</script>
<script lang="ts">
export default {
    name: "ReportLevelPanel",
};
</script>
<style lang="scss" module>
.level-report {
    // init
}
.report-panel {
    padding: $panel-padding;
    padding-bottom: c-space(7);

    border-radius: $panel-radius;
    background-color: #fff;
    .panel-head {
        padding-bottom: var(--y-space-normal);

        border-bottom: 1px solid #e6e8ec;
    }
    .report-title {
        @include panel-head;

        margin-bottom: 7px;
    }
    .report-date {
        margin-top: 7px;

        color: #777;
    }
    .panel-body {
        padding-top: var(--y-space-normal);
        .level-msg {
            display: inline-flex;
        }
    }
    .level-msg {
        font-size: 20px;
        line-height: em(30px, 20px);

        margin-bottom: 60px;

        color: #2d2b32;
    }
    .level-bar {
        position: relative;

        margin-bottom: 9px;

        border-radius: 5px;
        background: #f5f6f9;
    }
    .msg {
        font-size: 12px;
        line-height: em(18px, 12px);

        color: #777;
    }
    .bar-inner {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;

        width: 50%;
        height: 100%;

        border-radius: 5px;
        background: linear-gradient(90deg, #ffecb4 0%, #ffa51f 96.59%);
    }
    .bar-num {
        position: relative;
        z-index: 100;

        color: #f8af00;
        div {
            position: relative;

            display: block;

            width: 1px;
            height: 10px;

            background-color: #fff;
            &:first-child,
            &:last-child {
                background-color: transparent;
            }
            &[data-active] {
                color: #fff;
                p {
                    background-color: #f8af00;
                }
            }
        }
        p {
            @include circle(25px, transparent);
            position: absolute;
            bottom: calc(100% + 6px);
            left: 50%;

            display: flex;

            transform: translateX(-50%);

            align-items: center;
            justify-content: center;
        }
        svg {
            position: absolute;
            top: 90%;
        }
    }
    .intro-title {
        font-size: 16px;
        font-weight: 700;
        line-height: em(23px, 16px);

        margin-top: 72px;
        margin-bottom: 25px;

        color: #2d2b32;
        .level {
            font-family: "Times-Roman";
            font-size: 20px;
            font-weight: 700;

            margin-right: 10px;
        }
    }
    .list-item {
        color: #777;
        p {
            @include space-between(16px, "y");
            display: flex;

            align-items: center;
        }
        :global(.ic) {
            font-size: 18px;

            margin-right: 10px;

            color: #0aca91;
        }
    }
    @include media-breakpoint-down(md) {
        padding: $panel-padding-3;
    }
    @include media-breakpoint-down(sm) {
        .level-msg {
            font-size: 16px;
        }
    }
}
</style>
