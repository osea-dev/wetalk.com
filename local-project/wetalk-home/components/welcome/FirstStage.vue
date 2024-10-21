<template>
    <main
        id="firstStage"
        class="flex welcome-stage"
        :class="$style['first-stage']"
        style="opacity: 0"
    >
        <div class="w-state-curtain pointer-events-none">
            <div class="stage-layer layer-0">
                <div class="cloud-0"></div>
            </div>
        </div>
        <div id="cloud-scene" class="w-stage" data-relative-input="true">
            <!-- 云层 - 最外层 -->
            <div class="stage-layer layer-0 opacity-0">
                <div class="cloud-0"></div>
            </div>
            <div class="stage-layer layer-0 layer-0--alter opacity-0">
                <div class="cloud-0--alter"></div>
            </div>
            <!-- LOGO + Slogon -->
            <div class="stage-layer layer-1 opacity-0"></div>
            <div class="w-stage--right opacity-0">
                <!-- 云层 - 右侧一 -->
                <div class="stage-layer layer-3">
                    <div class="cloud-2">
                        <div class="parallax-layer" data-depth="0.2"></div>
                    </div>
                </div>
                <!-- 云层 - 右侧二 -->
                <div class="stage-layer layer-4">
                    <div class="cloud-3">
                        <div class="parallax-layer" data-depth="0.15"></div>
                    </div>
                </div>
                <!-- 云层 - 右侧三 -->
                <div class="stage-layer layer-5">
                    <div class="cloud-4">
                        <div class="parallax-layer" data-depth="0.1"></div>
                    </div>
                </div>
            </div>
            <div class="w-stage--left opacity-0">
                <!-- 云层 - 左侧一 -->
                <div class="stage-layer layer-2">
                    <div class="cloud-1">
                        <div class="parallax-layer" data-depth="0.25"></div>
                    </div>
                </div>
                <!-- 云层 - 左侧二 -->
                <div class="stage-layer layer-6">
                    <div class="cloud-5">
                        <div class="parallax-layer" data-depth="0.2"></div>
                    </div>
                </div>
                <!-- 云层 - 左侧三 -->
                <div class="stage-layer layer-7">
                    <div class="cloud-6">
                        <div class="parallax-layer" data-depth="0.15"></div>
                    </div>
                </div>
                <!-- 云层 - 左侧四 -->
                <div class="stage-layer layer-8">
                    <div class="cloud-7">
                        <div class="parallax-layer" data-depth="0.1"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-stage-cover">
            <div class="header flex items-center justify-center">
                <Link class="w-logo" :to="linkManage.index">
                    <nuxt-img src="@/assets/images/logo.png" alt="" />
                </Link>
            </div>
            <div class="body flex items-center justify-center h-full">
                <div class="circle-box relative">
                    <svg width="440" height="440" viewbox="0 0 440 440">
                        <circle
                            class="circle--alter"
                            cx="220"
                            cy="220"
                            r="210"
                            stroke-width="1"
                            stroke="rgba(245, 157, 62, 0.5)"
                            fill="none"
                        ></circle>
                        <circle
                            cx="220"
                            cy="220"
                            r="110"
                            stroke-width="1"
                            stroke="rgba(245, 157, 62, 0.2)"
                            fill="none"
                        ></circle>
                        <circle
                            cx="220"
                            cy="220"
                            r="114"
                            stroke-width="1"
                            stroke="rgba(245, 157, 62, 0.5)"
                            fill="none"
                        ></circle>
                        <circle
                            cx="220"
                            cy="220"
                            r="118"
                            stroke-width="1"
                            stroke="rgba(245, 157, 62, 0.7)"
                            fill="none"
                        ></circle>
                        <circle
                            cx="220"
                            cy="220"
                            r="122"
                            stroke-width="1"
                            stroke="rgba(245, 157, 62, 1)"
                            fill="none"
                        ></circle>
                    </svg>
                    <div
                        class="circle-box-cover absolute top-0 left-0 w-full h-full flex items-center justify-center"
                    >
                        <button
                            id="playBtn"
                            class="btn--entry flex text-base items-center"
                            @click="playLevelAnimate"
                        >
                            <div
                                class="flex text-wrapper"
                                v-html="$t('KEY_PAGE_WELCOME.START')"
                            ></div>
                            <i class="ic ml-2 opacity-0"></i>
                        </button>
                        <div
                            class="role-stage-loading flex flex-col justify-center items-center"
                        >
                            <div class="loading-text">loading</div>
                            <div class="loading-bar">
                                <div class="loading-bar--inner"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer flex items-center justify-center">
                <div
                    class="btn--jump-animate flex items-center justify-center"
                    @click="goToIndexPage"
                >
                    <span class="text">{{ $t("KEY_OTHER.SKIP") }}</span>
                </div>
            </div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import EnterAnimate from "@/assets/script/welcome-page/enter-animate";
import imagesLoaded from "imagesloaded";
import { onMounted, ref } from "vue";
import linkManage from "@/assets/script/local-data/link-manage";
import { useContext, useRouter } from "@nuxtjs/composition-api";
const enterTl = ref<gsap.core.Timeline | null>(null);

function initEntryAnime() {
    const enterAnime = new EnterAnimate(
        ".w-page[data-page-type='WelcomePage']"
    );

    const btnEnterAnime = enterAnime.btnEnter();
    const loadingAnimates = enterAnime.loadingEnter();

    enterAnime.tl.add(() => {
        const imgLoad = imagesLoaded(
            $("#roleStage").find("img").toArray()
        ) as any;
        if (imgLoad.isComplete) {
            btnEnterAnime.play();
        } else {
            loadingAnimates.enter.play();

            imgLoad.on("progress", () => {
                gsap.to(loadingAnimates.barDom, {
                    width:
                        (imgLoad.progressedCount / imgLoad.elements.length) *
                            100 +
                        "%",
                });
            });
            imgLoad.on("always", () => {
                loadingAnimates.level.add(btnEnterAnime.play(), "-=0.3");
                loadingAnimates.level.play();
            });
        }
    }, 3.6);

    enterTl.value = enterAnime.tl.timeScale(2);
}

const emit = defineEmits<{ (e: "playLevelAnimate"): void }>();

function playLevelAnimate() {
    emit("playLevelAnimate");
}

const { $cookies, localePath } = useContext();
const router = useRouter();

function goToIndexPage() {
    $cookies.set("ignore-welcome", "1", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    router.push(localePath("/"));
}

onMounted(() => {
    initEntryAnime();
});

defineExpose({ enterTl: enterTl });
</script>
<style lang="scss" module>
.first-stage {
    // init
}
</style>
