<template>
    <div :class="$style['rating-panel']">
        <div :class="$style['panel-body']">
            <div
                :class="$style['teacher-info']"
                class="flex flex-col justify-center items-center"
            >
                <Avatar
                    :class="$style['teacher-avatar']"
                    :avatar="info?.teacherHeadImg || ''"
                />
                <div :class="$style['teacher-name']">
                    <span class="text">{{
                        info?.teacherName || "&nbsp;"
                    }}</span>
                </div>
            </div>
            <div
                :class="$style['rating-row']"
                class="flex items-center justify-center"
            >
                <span class="text" :class="$style['title']">{{
                    $t("KEY_RATING_PANEL.TITLE")
                }}</span>
                <PublicStarList
                    :fixed="state === 2"
                    :score="info?.score || 0"
                    size="24px"
                    @submit="changeScore"
                />
            </div>
        </div>
        <div :class="$style['panel-foot']" v-if="state != 2">
            <button
                :class="$style['btn--submit']"
                :data-is-done="isDone"
                @click="submit"
            >
                <span class="text">{{
                    isDone
                        ? $t("KEY_RATING_PANEL.TIP.2", [info?.studentScoreDays])
                        : $t("KEY_RATING_PANEL.TIP.3")
                }}</span>
            </button>
            <div :class="$style['tip']">
                <span class="text">{{ $t("KEY_RATING_PANEL.TIP.0") }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Vue, { onMounted, ref } from "vue";

import type { TYPE_LESSON_SCORE } from "@/assets/script/api/api";
import { ToTeacherSorce, LessonScore } from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

let currentScore = 5;
const { i18n } = useContext();
const info = ref<TYPE_LESSON_SCORE>();
const prop = defineProps<{ id: number; state?: 0 | 1 | 2 }>();
const isDone = ref<boolean>(false);

function changeScore(score: number) {
    currentScore = score;
}

const emit = defineEmits<{ (e: "submit"): void }>();

function submit() {
    if (isDone.value) return;
    ToTeacherSorce({ userLessonid: prop.id, score: currentScore }).then(
        (res) => {
            if (res.statusCode === 0) {
                Vue.notify?.({
                    group: "form-notice",
                    title: i18n.t("KEY_RATING_PANEL.TIP.1"),
                    type: "success",
                    duration: 2000,
                });
                emit("submit");
            }
        }
    );
}

onMounted(() => {
    LessonScore({ userLessonid: prop.id }).then((res) => {
        currentScore = res.data.score;
        info.value = res.data;
    });
});
</script>
<style lang="scss" module>
.rating-panel {
    width: 520px;
    max-width: 100%;
    padding: calc(var(--p-normal) * 5) calc(var(--p-normal) * 6)
        calc(var(--p-normal) * 4);

    border-radius: var(--r-normal);
    background-color: #fff;
    .panel-foot {
        text-align: center;
    }
    .btn--submit {
        font-size: 16px;
        line-height: em(24px, 16px);

        display: inline-block;

        width: 400px;
        max-width: 100%;
        margin-top: var(--p-normal);
        margin-bottom: 13px;
        padding: 12px 30px;

        transition: 0.26s ease;

        color: #fff;
        border-radius: 6px;
        background: #f8af00;
        &[data-is-done] {
            color: #777;
            background-color: #fff;
            box-shadow: inset 0 0 0 1px #e6e8ec;
        }
    }
    .rating-row {
        font-size: 14px;
        line-height: em(24px, 14px);

        margin-top: 26px;
        padding-bottom: 20px;

        color: #eaeaea;
        .title {
            color: #777;
        }
    }
    .tip {
        font-size: 13px;
        line-height: em(24px, 13px);

        text-align: center;

        opacity: 0.6;
        color: #777;
    }
    .teacher-name {
        font-size: 16px;
        line-height: em(24px, 16px);

        margin-top: 11px;

        color: #2d2b32;
    }
    .teacher-avatar {
        width: 120px;
    }
    @include media-breakpoint-down(sm) {
        .teacher-avatar {
            width: 86px;
        }
        .rating-row {
            flex-direction: column-reverse;
            .title {
                margin-top: 12px;
            }
        }
    }
}
</style>
