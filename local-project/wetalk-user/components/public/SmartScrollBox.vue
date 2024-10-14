<template>
    <div ref="container">
        <slot />
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { smartScroll } from "@/assets/script/util/smart-scroll";

const container = ref<HTMLElement>();

defineExpose({ container });

onMounted(() => {
    if (container.value) {
        const { destroy } = smartScroll(
            $(container.value),
            ".scroll-container"
        );
        onBeforeUnmount(destroy);
    }
});
</script>
<style lang="scss" module>
//
</style>
