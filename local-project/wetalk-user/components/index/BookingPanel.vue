<template>
    <div
        class="flex justify-between items-center sm:block"
        :class="$style['booking-free-lesson']"
    >
        <div
            v-if="data?.status === 0 || data?.status === 1"
            :class="$style['info-group']"
        >
            <div :class="$style['title']">
                <span class="text">{{ $t("KEY_BOOKING_PANEL.TITLE") }}</span>
            </div>
            <div :class="$style['subtitle']">
                <span class="text">{{ $t("KEY_BOOKING_PANEL.SUBTITLE") }}</span>
            </div>
        </div>
        <div
            v-if="data?.status === 2 || data?.status === 3"
            :class="$style['info-group']"
        >
            <div :class="$style['title']">
                <span class="text">{{
                    $t("KEY_BOOKING_PANEL.LEVEL_REPORT")
                }}</span>
            </div>
            <div v-if="data?.level" :class="$style['subtitle']">
                <span class="text">{{
                    $t("KEY_BOOKING_PANEL.LEVEL_DESC")
                }}</span>
                <i :class="$style['level-tag']">Level {{ data?.level }}</i>
                <!-- <i class="ic iconfont icon-tip hidden"></i> -->
            </div>
        </div>
        <div
            :class="$style['booking-btn']"
            :data-state="data?.status === 1 ? 'waiting' : ''"
        >
            <button
                :class="$style['button']"
                class="text"
                v-if="data?.status === 0"
                @click="openBookingPanel"
            >
                {{ $t("KEY_BOOKING_PANEL.BOOKING") }}
            </button>
            <button
                :class="$style['button']"
                class="text flex items-center"
                v-if="data?.status === 1"
            >
                <i
                    class="ic icon iconfont icon-tip"
                    style="margin-bottom: -3px"
                ></i>
                <span class="text">{{ $t("KEY_BOOKING_PANEL.TIP.1") }}</span>
            </button>
            <button
                :class="$style['button']"
                class="text"
                v-if="data?.status === 2"
            >
                <span class="text"> {{ $t("KEY_BOOKING_PANEL.TIP.2") }} </span>
            </button>
            <Link
                :class="$style['button']"
                :to="linkManage.report + '?type=level'"
                class="text"
                v-if="data?.status === 3"
            >
                <span class="text"> {{ $t("KEY_BOOKING_PANEL.TIP.3") }} </span>
            </Link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TRIAL_LESSON_REPORT } from "@/assets/script/api/api";

import Vue, { getCurrentInstance } from "vue";
import BookingPanel from "@/components/dialog-panel/BookingPanel.vue";
import { useContext } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";

defineProps<{
    data: TRIAL_LESSON_REPORT;
}>();

const instance = getCurrentInstance();

const { $dialog, i18n } = useContext();
const emit = defineEmits<{ (e: "refresh"): void }>();

function openBookingPanel() {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(BookingPanel, {
            on: {
                close() {
                    dialog.close();
                },
                submit() {
                    emit("refresh");
                    Vue.notify?.({
                        group: "form-notice",
                        title: i18n.t("KEY_BASE.SUBMIT_SUC"),
                        type: "success",
                        duration: 3000,
                    });
                },
            },
        }),
    });
}
</script>
<style lang="scss" module>
.booking-free-lesson {
    padding: $panel-padding-2;

    border-radius: $panel-radius;
    background-color: #fff;
    .level-tag {
        font-size: 13px;
        font-weight: 700;
        line-height: 20px;

        margin-left: 6px;
        padding: 3px 10px;

        color: #f8af00;
        border-radius: 13px;
        background: rgba(#f8af00, 0.2);
        & + :global(.ic) {
            display: inline-block;

            margin-left: 5px;

            transform: translateY(-4px);

            color: #d4d6d9;
        }
    }
    .title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(29px, 20px);

        margin-bottom: 6px;
    }
    .subtitle {
        font-size: 13px;
        line-height: em(20px, 13px);

        color: #777;
    }
    .booking-btn {
        text-align: center;
        .level-finished {
            margin-bottom: 6px;

            color: #777;
        }
        .number {
            color: #f8af00;
        }
        .button {
            font-size: 16px;
            font-weight: 700;
            line-height: em(24px, 16px);

            display: flex;

            padding: 13px 32px;

            color: #fff;
            border-radius: 8px;
            background: #f8af00;

            align-items: center;
            justify-content: center;
        }
        &[data-state="waiting"] {
            font-size: 15px;
            line-height: em(22px, 15px);
            button {
                cursor: default;

                background-color: #0aca91;
            }
        }
        :global(.ic) {
            font-size: 20px;

            margin-right: 6px;
        }
    }
    @include media-breakpoint-down(sm) {
        .booking-btn {
            margin-top: var(--y-space-normal);
            :global(.ic) {
                font-size: 18px;
            }
            button {
                width: 100%;
            }
        }
    }
}
</style>
