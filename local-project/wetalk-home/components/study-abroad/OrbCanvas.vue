<template>
    <canvas ref="canvas" :class="$style['orb-canvas']"></canvas>
</template>
<script lang="ts" setup>
import { useSiteStore } from "@/store/site";
import { onMounted, onBeforeMount, ref } from "vue";
import { loadPixi } from "@/assets/script/study-abroad/color-palette";

const prop = defineProps<{
    color: string[];
}>();

const siteStore = useSiteStore();
const canvas = ref<HTMLCanvasElement | null>(null);

let getOrb: any = null;

if (process.browser) {
    getOrb = loadPixi().then((createOrbEffect) => {
        return createOrbEffect;
    });
}

function initOrbBg(createOrbEffect: any) {
    const orbCtrl = new createOrbEffect({
        container: canvas.value!,
        colorChoices: prop.color,
        followPointer: false,
        originPointer: {
            x: (window.innerWidth / 3) * 1.4,
            y: (window.innerHeight / 3) * 2,
        },
        orbParam: {
            radius: Math.min(
                window.innerHeight * 0.3,
                window.innerWidth * 0.3,
                500
            ),
            scaleRange: [1, 1],
        },
    }).init();
    orbCtrl.start();
    if (!(siteStore.device === "mo")) {
        $("body").on(
            {
                "pointerenter.orb": (ev) => {
                    orbCtrl.circleState.catch = true;
                    const $dom = $(ev.currentTarget);
                    const targetDom = $dom.find(
                        "." + $dom.data("circle-catch")
                    );
                    const { top, left } = targetDom[0].getBoundingClientRect();

                    orbCtrl.circleState.position = {
                        x: left,
                        y: top,
                    };
                },
                "pointerleave.orb": () => {
                    orbCtrl.circleState.catch = false;
                },
            },
            ".area--alter-circle[data-circle-catch]"
        );
    }
    return {
        destroy: () => {
            orbCtrl.destroy();
            $("body").off("pointerenter.orb");
            $("body").off("pointerleave.orb");
        },
    };
}
let destroy: any = null;
onMounted(() => {
    getOrb?.then((createOrbEffect: any) => {
        if (createOrbEffect) {
            destroy = initOrbBg(createOrbEffect).destroy;
        }
    });
    onBeforeMount(() => {
        destroy?.();
    });
});
</script>
<style lang="scss" module>
.orb-canvas {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    pointer-events: none;
}
</style>
