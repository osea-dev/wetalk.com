<!--
 * @Description: 进入教室按钮
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 16:14:42
-->
<template>
    <PublicButton
        :disable="!url"
        :class="$style['button']"
        @click.native="goClassmate"
    >
        <span class="text">{{ $t("KEY_BASE.ENTER_CLASSROOM") }}</span>
    </PublicButton>
</template>
<script lang="ts" setup>
import { getCurrentInstance, useContext } from "@nuxtjs/composition-api";
import MessagePanel from "~/components/dialog-panel/MessagePanel.vue";
const { $dialog, i18n } = useContext();

const instance = getCurrentInstance();
const prop = defineProps<{ url?: string; time?: string }>();

function goClassmate() {
    if (!instance) return;
    if (prop.url) {
        window.open(prop.url, "_blank");
        return;
    }
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(MessagePanel, {
            props: {
                title: i18n.t("KEY_BASE.TIP"),
                content: i18n.t("KEY_BASE.ENTER_CLASSROOM_TIP", [prop.time]),
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
//
</style>
