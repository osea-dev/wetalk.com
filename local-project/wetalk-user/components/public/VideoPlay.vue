<!--
 * @Description: 视频播放按钮
 * @Author: F-Stone
 * @LastEditTime: 2022-11-18 10:28:07
-->
<template>
    <button :class="$style['video-play']" @click="playVideo(video)">
        <slot />
    </button>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
const { $dialog } = useContext();

defineProps<{ video?: string }>();

function playVideo(video?: string) {
    if (!video) return;
    $dialog({
        type: "video",
        src: video,
        poster: "",
    });
}
</script>
<style lang="scss" module>
.video-play {
    // init
}
</style>
