<!--
 * @Description: 课节报告
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 16:14:55
-->
<template>
    <PublicButton
        :class="$style['report-btn']"
        @click.native="openTipBox"
        v-if="!isOk"
    >
        <slot />
    </PublicButton>
    <PublicButton
        v-else
        :class="$style['course-list']"
        :to="linkManage.report + '/' + id"
    >
        <slot />
    </PublicButton>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import { useContext } from "@nuxtjs/composition-api";
import MessagePanel from "~/components/dialog-panel/MessagePanel.vue";
import linkManage from "~/assets/script/local-data/link-manage";

withDefaults(defineProps<{ id: number; isOk?: boolean }>(), {
    isOk: false,
});
const { $dialog, i18n } = useContext();

const instance = getCurrentInstance();
function openTipBox() {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(MessagePanel, {
            props: {
                title: i18n.t("KEY_BASE.TIP"),
                content: i18n.t("KEY_BASE.REPORT_TIP"),
            },
            on: {
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
</script>
<style lang="scss" module>
.report-btn {
    // init
}
</style>
