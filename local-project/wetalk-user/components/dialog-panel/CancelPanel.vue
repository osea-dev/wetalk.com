<template>
    <div :class="$style['cancel-panel']">
        <template v-if="!confirmCancel">
            <div :class="$style['panel-title']">
                <span class="text">{{ $t("KEY_CANCEL_COURSE.TITLE") }}</span>
            </div>
            <button :class="$style['btn--close-panel']" @click="close">
                <i class="ic iconfont icon-close"></i>
            </button>
            <div :class="$style['panel-body']">
                <div :class="$style['reason-list']">
                    <button
                        :class="$style['list-item']"
                        :data-active="!otherReason && reason === item"
                        v-for="(item, index) in reasonList"
                        :key="index"
                        @click="changeReason(item)"
                    >
                        <span class="text">{{ item }}</span>
                    </button>
                    <div :class="$style['other-reason']">
                        <textarea
                            name="otherReason"
                            rows="7"
                            :placeholder="$t('KEY_CANCEL_PANEL.TIP.0')"
                            v-model="otherReason"
                        >
                        </textarea>
                    </div>
                </div>
            </div>
            <div :class="$style['panel-footer']" class="grid grid-cols-2">
                <button :class="$style['btn--confirm']" @click="confirm">
                    <span class="text">{{
                        $t("KEY_CANCEL_COURSE.TIP.0")
                    }}</span>
                </button>
                <button :class="$style['btn--cancel']" @click="close">
                    <span class="text">{{
                        $t("KEY_CANCEL_COURSE.TIP.1")
                    }}</span>
                </button>
            </div>
        </template>
        <template v-else>
            <div :class="$style['message-box']">
                <div :class="$style['message']">
                    <span class="text">{{
                        $t("KEY_CANCEL_COURSE.TIP.2")
                    }}</span>
                </div>
                <button @click="close">
                    <span class="text">{{
                        $t("KEY_CANCEL_COURSE.TIP.3")
                    }}</span>
                </button>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
import Vue, { onMounted, ref } from "vue";
import { CancelLessonKeys, ApplyCancelLesson } from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

const reason = ref<string>("");
const otherReason = ref<string>("");

const confirmCancel = ref<boolean>(false);

const reasonList = ref<string[]>([]);
function changeReason(item: string) {
    reason.value = item;
    otherReason.value = "";
}
const emit = defineEmits<{
    (e: "close"): void;
    (e: "submit", reason: string): void;
}>();

const prop = defineProps<{ lessonId: number }>();
const { i18n } = useContext();

function confirm() {
    if (!reason.value.trim() && !otherReason.value.trim()) {
        Vue.notify?.({
            group: "form-notice",
            title: i18n.t("KEY_CANCEL_COURSE.TIP.4"),
            type: "error",
            duration: 3000,
        });
        return;
    }
    ApplyCancelLesson({
        userLessonid: prop.lessonId,
        keys: [],
        message: otherReason.value || reason.value,
    }).then((res) => {
        if (res.statusCode === 0) {
            emit("submit", otherReason.value || reason.value);
            confirmCancel.value = true;
        }
    });
}
function close() {
    emit("close");
}

onMounted(() => {
    CancelLessonKeys().then((res) => {
        reasonList.value = res.data;
    });
});
</script>
<style lang="scss" module>
.cancel-panel {
    position: relative;

    width: 545px;
    max-width: 100%;
    padding: $dialog-panel-padding;

    border-radius: var(--r-normal);
    background-color: #fff;
    .panel-title {
        @include dialog-head;
    }
    .btn--close-panel {
        font-size: 16px;

        position: absolute;
        top: 15px;
        right: 20px;

        width: 50px;
        height: 50px;

        color: #92929d;
    }
    .reason-list {
        margin-top: 29px;
        .list-item {
            font-size: 13px;
            line-height: em(24px, 13px);

            margin-right: 6px;
            padding: 6px 18px;

            transition: 0.16s ease;

            color: #777;
            border: 1px solid #e6e8ec;
            border-radius: 6px;
            &:last-of-type {
                margin-right: 0;
            }
            &[data-active] {
                color: #fff;
                border-color: #f8af00;
                background-color: #f8af00;
            }
        }
        .other-reason {
            margin-top: 20px;
            textarea {
                width: 100%;
                padding: 14px 18px;

                /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
                resize: none;

                color: #777;
                border: 1px solid #e6e8ec;
                border-radius: 6px;
            }
        }
    }
    .panel-footer {
        margin-top: 20px;

        gap: 13px;
        button {
            font-size: 16px;
            line-height: em(24px, 16px);

            padding: 12px;

            text-align: center;

            color: #777;
            border: 1px solid #e6e8ec;
            border-radius: 6px;
        }
        .btn--cancel {
            color: #fff;
            border-color: #f8af00;
            background-color: #f8af00;
        }
    }
    .message-box {
        button {
            font-size: 16px;
            line-height: em(24px, 16px);

            width: 100%;
            padding: 12px 30px;

            color: #fff;
            border-color: #f8af00;
            border-radius: 6px;
            background-color: #f8af00;
        }
        .message {
            font-size: 14px;
            line-height: em(24px, 14px);

            margin-bottom: var(--y-space-normal);
            padding: 20px;

            color: #2d2b32;
            border: 1px dashed #cdd4e3;
            border-radius: 6px;
        }
    }
    @include media-breakpoint-down(sm) {
        .reason-list {
            display: grid;

            gap: 12px;
            grid-template-columns: 1fr 1fr;
            .list-item {
                margin: 0;
            }
            .other-reason {
                margin-top: 0;

                grid-column-end: 3;
                grid-column-start: 1;
            }
        }
    }
}
</style>
