<!--
 * @Description: 弹窗层
 * @Author: F-Stone
 * @LastEditTime: 2023-03-17 15:17:20
-->
<template>
    <div :class="$style['dialog-layer']" data-pos="cc">
        <div
            ref="mask"
            :class="$style['layer--dialog-mask']"
            @click.self="close"
        ></div>
        <div ref="dialogBox" :class="$style['dialog-box']">
            <slot>
                <div v-html="container"></div>
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
}>();
function close() {
    tl.reverse().then(() => {
        prop.onDestroy();
    });
}

const mask = ref<HTMLElement | null>(null);
const dialogBox = ref<HTMLElement | null>(null);
onMounted(() => {
    tl.to(mask.value, {
        duration: 0.26,
        background: "rgba(0, 0, 0, 0.6)",
    }).to(
        dialogBox.value,
        {
            duration: 0.26,
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

    transform: translateY(50px);

    opacity: 0;
}
</style>
