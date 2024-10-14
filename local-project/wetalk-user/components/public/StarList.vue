<template>
    <div :class="$style['star-box']" class="flex items-center">
        <div
            :class="$style['start-list']"
            class="flex"
            @mouseleave="hoverScore = -1"
            :style="{ marginLeft: prop.margin ? '' : '0' }"
        >
            <div
                :class="$style['start']"
                @mousemove="changeScore"
                @click="submit(index + 1)"
                v-for="(item, index) in prop.totalScore"
                :key="index"
                :data-active="index < currentScore"
            >
                <i class="ic iconfont icon-start"></i>
            </div>
        </div>
        <span
            class="text"
            :class="$style['score-text']"
            :data-active="currentScore > 0"
            >{{
                scoreText.length > 0
                    ? scoreText[currentScore]
                    : defaultScoreText[currentScore]
            }}</span
        >
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
import { ref, computed, watch } from "vue";
const { i18n } = useContext();
const hoverScore = ref<number>(-1);
const selectScore = ref<number>(5);
const isDone = ref<boolean>(false);
const defaultScoreText = [
    i18n.t("KEY_BASE.STAR.0"),
    i18n.t("KEY_BASE.STAR2.0"),
    i18n.t("KEY_BASE.STAR2.1"),
    i18n.t("KEY_BASE.STAR2.2"),
    i18n.t("KEY_BASE.STAR2.3"),
    i18n.t("KEY_BASE.STAR2.4"),
];
const prop = withDefaults(
    defineProps<{
        score?: number;
        totalScore?: number;
        fixed?: boolean;
        size?: string;
        scoreText?: string[];
        margin?: boolean;
    }>(),
    {
        score: 5,
        totalScore: 5,
        fixed: false,
        size: "22px",
        margin: true,
        scoreText: () => [],
    }
);

const currentScore = computed(() => {
    if (isDone.value) {
        return prop.score;
    }
    return hoverScore.value === -1 ? selectScore.value : hoverScore.value;
});

function changeScore(ev: MouseEvent) {
    if (prop.fixed) return;
    const currentTarget = ev.currentTarget!;
    hoverScore.value = Number($(currentTarget).index() + 1);
}

const emit = defineEmits<{ (e: "submit", score: number): void }>();
function submit(score: number) {
    if (prop.fixed) return;
    selectScore.value = score;
    emit("submit", score);
}

watch(
    () => prop.score,
    () => {
        selectScore.value = prop.score;
    },
    { immediate: true }
);
</script>
<style lang="scss" module>
.star-box {
    font-size: 14px;
    line-height: em(24px, 14px);

    color: #eaeaea;
    .title {
        color: #777;
    }
    .start-list {
        margin-right: 14px;
        margin-left: 18px;
    }
    .start {
        @include space-between(10px);
        font-size: v-bind(size);

        cursor: pointer;
        transition: 0.2s ease;
        text-align: center;
        &[data-active] {
            color: #f8af00;
        }
    }
    .score-text {
        width: 50px;

        color: #777;
        &[data-active] {
            color: #f8af00;
        }
    }
}
</style>
