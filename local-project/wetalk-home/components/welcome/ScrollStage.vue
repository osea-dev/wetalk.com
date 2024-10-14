<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-28 18:54:00
-->
<template>
    <main id="scrollStage" class="scroll-stage" ref="scrollStage">
        <div class="scroll-container"></div>
    </main>
</template>
<script lang="ts" setup>
import type InitScroll from "@/assets/script/welcome-page/init-scroll";

import { useContext } from "@nuxtjs/composition-api";
import { onMounted, onUnmounted, ref } from "vue";

const { app } = useContext();
const vsScroll = ref<InitScroll["vsScroll"] | null>(null);
const scrollStage = ref<HTMLElement | null>(null);
let scrollInstance: any = null;

function initScroll() {
    scrollInstance = new app.$InitScroll(
        document.querySelector("#scrollStage")
    ).init() as InitScroll;
    vsScroll.value = scrollInstance.vsScroll;
}

defineExpose({ vsScroll });

onUnmounted(() => {
    scrollInstance?.destroy();
});

onMounted(() => {
    requestAnimationFrame(() => {
        initScroll();
    });
});
</script>
<style lang="scss" module>
//
</style>
