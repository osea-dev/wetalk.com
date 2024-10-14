<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-22 19:27:50
-->
<template>
    <div :class="$style['star-box']" class="flex items-center">
        <div
            :class="$style['start-list']"
            class="flex"
            @mouseleave="hoverScore = -1"
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
            :data-active="currentScore >= 0"
            >{{ scoreText[currentScore - 1] }}</span
        >
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
import { ref, computed, onMounted } from "vue";

const hoverScore = ref<number>(-1);
const selectScore = ref<number>(5);
const isDone = ref<boolean>(false);
const prop = withDefaults(
    defineProps<{
        value: number;
        totalScore?: number;
        size?: string;
    }>(),
    { totalScore: 5, size: "22px" }
);
const { i18n } = useContext();
const scoreText = [
    i18n.t("非常差"),
    i18n.t("差"),
    i18n.t("一般"),
    i18n.t("好"),
    i18n.t("非常好"),
];

const currentScore = computed(() => {
    if (isDone.value) {
        return prop.value;
    }
    return hoverScore.value === -1 ? selectScore.value : hoverScore.value;
});

function changeScore(ev: MouseEvent) {
    const currentTarget = ev.currentTarget!;
    hoverScore.value = Number($(currentTarget).index() + 1);
}

const emit = defineEmits<{ (e: "input", score: number): void }>();
function submit(score: number) {
    selectScore.value = score;
    emit("input", score);
}

onMounted(() => {
    selectScore.value = prop.value;
});
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
        color: #777;
        &[data-active] {
            color: #f8af00;
        }
    }
}
</style>
