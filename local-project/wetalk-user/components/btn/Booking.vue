<!--
 * @Description: 预约按钮
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 16:14:36
-->
<template>
    <PublicButton
        v-if="layout === 'radius'"
        :active="active"
        @click.native="contact"
    >
        <slot />
    </PublicButton>
    <button :class="$style['lesson-booking']" @click="contact" v-else>
        <slot />
    </button>
</template>
<script lang="ts" setup>
import { getCurrentInstance, useContext } from "@nuxtjs/composition-api";
import MessagePanel from "~/components/dialog-panel/MessagePanel.vue";
import { CourseApply } from "@/assets/script/api/api";
import { useUserStore } from "~/store/user";

const { $dialog, i18n } = useContext();
const instance = getCurrentInstance();
const prop = defineProps<{ id: number; layout?: "radius"; active?: boolean }>();
const userStore = useUserStore();

function contact() {
    if (!instance) return;
    CourseApply({ userCourseid: prop.id }).then((res) => {
        if (res.statusCode === 0) {
            const userName =
                (userStore.userInfo?.firstName || "") +
                (userStore.userInfo?.lastName || "");
            const dialog = $dialog({
                type: "custom",
                parent: instance.proxy,
                container: instance.proxy.$createElement(MessagePanel, {
                    props: {
                        title: i18n.t("KEY_BASE.HI", [userName]),
                        content: i18n.t("KEY_BASE.TIP_MSG.7"),
                    },
                    on: {
                        close() {
                            dialog.close();
                        },
                    },
                }),
            });
        }
    });
}
</script>
<style lang="scss" module>
.lesson-booking {
    // init
}
</style>
