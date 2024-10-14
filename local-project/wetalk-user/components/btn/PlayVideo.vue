<!--
 * @Description: 视频播放按钮
 * @Author: F-Stone
 * @LastEditTime: 2022-11-18 10:28:32
-->
<template>
    <PublicButton
        :class="$style['video-play']"
        @click.native="playVideo(video)"
    >
        <slot />
    </PublicButton>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
const { $dialog } = useContext();

defineProps<{ video?: string }>();

function playVideo(video?: string) {
    if (!video) return;
    if (/\.mp4$/.test(video)) {
        $dialog({
            type: "video",
            src: video,
            poster: "",
        });
    } else {
        window.open(video, "_blank");
    }
}
</script>
<style lang="scss" module>
.video-play {
    // init
}
</style>
