<!--
 * @Description: 取消课程按钮
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 16:14:48
-->
<template>
    <PublicButton
        :class="$style['cancel-lesson']"
        :disable="disable"
        @click.native="cancelLesson"
    >
        <span class="text">{{ $t("KEY_BASE.CANCEL") }}</span>
    </PublicButton>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import { useContext } from "@nuxtjs/composition-api";
import CancelPanel from "@/components/dialog-panel/CancelPanel.vue";

const { $dialog } = useContext();

const instance = getCurrentInstance();
const emit = defineEmits<{
    (e: "confirm"): void;
}>();

const prop = defineProps<{ id: number; disable: boolean }>();

function cancelLesson() {
    if (!instance) return;
    if (prop.disable) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(CancelPanel, {
            props: {
                lessonId: prop.id,
            },
            on: {
                close() {
                    dialog.close();
                },
                submit() {
                    emit("confirm");
                },
            },
        }),
    });
}
</script>
<style lang="scss" module>
.cancel-lesson {
    //
}
</style>
