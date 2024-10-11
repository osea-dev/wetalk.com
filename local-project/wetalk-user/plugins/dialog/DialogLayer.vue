<!--
 * @Description: 弹窗层
 * @Author: F-Stone
 * @LastEditTime: 2023-03-24 17:23:01
-->
<template>
    <PublicSmartScrollBox :class="$style['dialog-layer']" data-pos="cc">
        <div
            ref="mask"
            :class="$style['layer--dialog-mask']"
            @click.self="close"
        ></div>
        <div
            ref="dialogBox"
            :data-w-full="boxLayerFull"
            :class="$style['dialog-box']"
        >
            <slot>
                <div
                    class="scroll-container"
                    v-html="prop.container || ''"
                ></div>
            </slot>
        </div>
    </PublicSmartScrollBox>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
const tl = gsap.timeline({
    paused: true,
});

const prop = defineProps<{
    onDestroy: () => void;
    container: string;
    boxLayerFull?: boolean;
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
        background: "rgba(0,0,0,0.5)",
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

    max-width: 92%;

    transform: translateY(30px);

    opacity: 0;
    &[data-w-full] {
        max-width: 100%;
    }
}
</style>
