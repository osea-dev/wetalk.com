<!--
 * @Description: user 首页
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 17:37:21
-->
<template>
    <main id="home-body" class="w-body w-module home-body">
        <div :class="$style['layer--cover']" v-if="userInfoStatus === 0">
            <RegisterUserPanel />
        </div>
        <IndexUserModule v-else />
    </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/store/user";
import RegisterUserPanel from "@/components/dialog-panel/RegisterUserPanel.vue";
import { storeToRefs } from "pinia";

export default defineComponent({
    name: "IndexPage",
    layout: "index",
    components: { RegisterUserPanel },
    setup() {
        const userStore = useUserStore();

        const { userInfoStatus } = storeToRefs(userStore);

        return {
            userInfoStatus,
        };
    },
});
</script>
<style lang="scss" module>
.layer--cover {
    position: fixed;
    z-index: $zindex-popover;
    top: 0;
    left: 0;

    display: flex;

    width: 100%;
    height: 100%;

    background-color: rgb(0 0 0 / 0.5);

    align-items: center;
    justify-content: center;
}
</style>
