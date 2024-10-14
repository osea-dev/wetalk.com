<!--
 * @Description: 课程评价按钮
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 16:14:26
-->
<template>
    <PublicButton
        :class="$style['appraise-btn']"
        @click.native="lessonAppraise"
        :data-theme="state === 2 ? 'gray' : ''"
    >
        {{ showText }}
    </PublicButton>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, ref } from "vue";
import { useContext } from "@nuxtjs/composition-api";
import RatingPanel from "@/components/dialog-panel/RatingPanel.vue";

const { $dialog, i18n } = useContext();
const currentState = ref<0 | 1 | 2>();

const prop = defineProps<{
    id: number;
    state?: 0 | 1 | 2;
}>();

const text = {
    0: i18n.t("KEY_BASE.APPRAISE_STATUS.0"),
    1: i18n.t("KEY_BASE.APPRAISE_STATUS.1"),
    2: i18n.t("KEY_BASE.APPRAISE_STATUS.2"),
};

const showText = computed(() => {
    if (typeof currentState.value !== "undefined") {
        return text[currentState.value];
    } else {
        return text[prop.state || 0];
    }
});

const instance = getCurrentInstance();
function lessonAppraise() {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(RatingPanel, {
            props: { id: prop.id, state: prop.state },
            on: {
                submit() {
                    currentState.value = 1;
                    dialog.close();
                },
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
</script>
<style lang="scss" module>
.appraise-btn {
    // init
}
</style>
