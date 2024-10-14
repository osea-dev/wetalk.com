<template>
    <div
        id="welcome-body"
        class="w-body w-module welcome-body"
        ref="welcomeBody"
    >
        <template v-if="!IS_IPAD">
            <FirstStage
                ref="firstStage"
                @playLevelAnimate="playLevelAnimate"
                v-if="!levelEnd"
            />
            <ScrollStage ref="scrollStage" />
            <RoleStage style="opacity: 0" />
        </template>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onBeforeMount, onMounted, ref } from "vue";

import "@/assets/style/welcome-page/role-stage.scss";
import FirstStage from "@/components/welcome/FirstStage.vue";
import ScrollStage from "@/components/welcome/ScrollStage.vue";
import RoleStage from "@/components/welcome/RoleStage.vue";

import lazyload from "lazyload";
import Parallax from "parallax-js";
import imagesLoaded from "imagesloaded";
import LevelAnimate from "@/assets/script/welcome-page/level-animate";
import SceneControl from "@/assets/script/welcome-page/scene-control";
import { useContext, useRouter } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";
import { useSiteStore } from "@/store/site";

const firstStage = ref<InstanceType<typeof FirstStage> | null>(null);
let parallax: Parallax | null = null;

function cloudParallax() {
    const scene = $("#cloud-scene");
    parallax = new Parallax(scene[0], {
        selector: ".parallax-layer",
        scalarX: 8,
        scalarY: 5,
    });
}

let levelTl: LevelAnimate | null = null;
function playLevelAnimate() {
    levelTl?.tl.timeScale(2);
    levelTl?.play();
}

const welcomeBody = ref<HTMLElement | null>(null);
const levelEnd = ref<boolean>(false);
let scrollControl: SceneControl | null = null;
function initLevelAnimate() {
    levelTl = new LevelAnimate(welcomeBody.value!);
    levelTl.tl.add(() => {
        scrollControl?.start();
    }, "-=1");
    levelTl.tl.eventCallback("onComplete", () => {
        parallax?.destroy();
        levelEnd.value = true;
    });
}

const scrollStage = ref<InstanceType<typeof ScrollStage> | null>(null);

const IS_IPAD = ref<boolean>(true);
const { app, $cookies } = useContext();
const $router = useRouter();

const siteStore = useSiteStore();

onBeforeMount(() => {
    IS_IPAD.value =
        navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    if (IS_IPAD.value || siteStore.device === "mo") {
        $cookies.set("ignore-welcome", "1");
        return $router.replace({ path: app.localePath(linkManage.index) });
    }
});

onMounted(() => {
    if (!IS_IPAD.value) {
        cloudParallax();
        initLevelAnimate();

        const welcomeStage = $(".welcome-stage");
        const roleStageLazy = new lazyload($("#roleStage").find("img"));
        const imgLoad = imagesLoaded(welcomeStage.find("*").toArray(), {
            background: true,
        });
        imgLoad.on("always", () => {
            gsap.set(welcomeStage, { opacity: 1 });

            roleStageLazy.loadAndDestroy();
            firstStage.value!.enterTl?.play();

            // init stage
            scrollControl = new SceneControl(
                welcomeBody.value!,
                scrollStage.value!.vsScroll
            ).init();
            scrollStage.value!.vsScroll.update();
        });
    }
});
onBeforeUnmount(() => {
    // gsap.globalTimeline.clear();
    gsap.killTweensOf("*");
});
</script>
<script lang="ts">
export default {
    name: "WelcomePage",
    layout: "welcome",
};
</script>
<style lang="scss" module>
.welcome {
    // init
}
</style>
