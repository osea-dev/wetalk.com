<!--
 * @Description: 弹窗层
 * @Author: F-Stone
 * @LastEditTime: 2023-03-17 15:18:50
-->
<template>
    <div :class="$style['dialog-layer']" data-pos="cc">
        <div
            :class="$style['layer--dialog-mask']"
            ref="mask"
            @click.self="close"
        ></div>
        <div :class="$style['dialog-box']" ref="dialogBox">
            <slot>
                <div v-html="prop.container || ''"></div>
            </slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
const tl = gsap.timeline({
    paused: true,
});

const prop = defineProps<{
    onDestroy: () => void;
    container: string;
    background: string;
}>();
function close() {
    tl.reverse().then(() => {
        prop.onDestroy();
    });
}
defineExpose({ close });

const mask = ref<HTMLElement | null>(null);
const dialogBox = ref<HTMLElement | null>(null);

onMounted(() => {
    tl.to(mask.value, {
        background: prop.background ?? "rgba(0,0,0,0.5)",
        duration: 0.16,
    }).to(
        dialogBox.value,
        {
            duration: 0.36,
            y: 0,
            opacity: 1,
        },
        "-=0.1"
    );
    tl.play();
});
</script>

<style lang="scss" module>
.dialog-layer {
    position: fixed;
    z-index: $zindex-popover;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    &[data-pos="cc"] {
        display: flex;

        align-items: center;
        justify-content: center;
    }
}
.layer--dialog-mask {
    @include ab-cover;
}
.dialog-box {
    position: relative;
    z-index: 10;

    transform: translateY(30px);

    opacity: 0;
    @include media-breakpoint-down(sm) {
        width: 100%;
    }
}
</style>
