<template>
    <div :class="$style['resource-btn']">
        <a
            class="flex"
            :class="$style['btn--preview']"
            target="_blank"
            :href="data.attachmentPreviewUrl"
        >
            <div
                :class="$style['icon']"
                class="flex items-center justify-center"
                :style="{ backgroundColor: icon[fileType].color }"
            >
                <i class="icon iconfont" :class="icon[fileType].ic"></i>
            </div>
            <div :class="$style['info']" class="flex-auto">
                <div class="text" :class="$style['title']">{{ title }}</div>
                <div class="text" :class="$style['data']">
                    {{ data.attachmentType }}{{ calSize(data.size) }}
                </div>
            </div>
        </a>
        <a
            :class="$style['download']"
            :download="title"
            :href="data.attachmentUrl"
            target="_blank"
        >
            <i class="ic iconfont icon-download"></i>
        </a>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_REMARK_FILE } from "@/assets/script/api/api";
import { computed } from "vue";
function calSize(size: number) {
    if (size / 1024 / 1024 > 1) {
        return size ? "-" + (size / 1024 / 1024).toFixed(1) + "MB" : "";
    } else {
        return size ? "-" + (size / 1024).toFixed(1) + "KB" : "";
    }
}
const prop = defineProps<{
    title: string;
    data: TYPE_REMARK_FILE;
}>();

const fileType = computed(() => {
    switch (prop.data.attachmentType.toLocaleLowerCase()) {
        case "mp3":
            return "mp3";

        case "mp4":
        case "mov":
            return "mp4";

        case "img":
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
            return "img";

        case "file":
            return "file";

        default:
            return "file";
    }
});

const icon = {
    mp3: {
        color: "#33CC99",
        ic: "icon-voise",
    },
    file: {
        color: "#FF7960",
        ic: "icon-file",
    },
    mp4: {
        color: "#323338",
        ic: "icon-strock-play-btn",
    },
    img: {
        color: "#3B71FE",
        ic: "icon-image",
    },
};
</script>
<style lang="scss" module>
.resource-btn {
    position: relative;

    width: 322px;
    max-width: 100%;
    padding: 20px;

    border-radius: 10px;
    background-color: #fff;
    .btn--preview {
        padding-right: 20px;
    }
    .download {
        @include flex(c, c);
        position: absolute;
        top: 50%;
        right: 10px;

        width: 40px;
        height: 40px;
        margin-top: -20px;

        transition: 0.26s ease;

        color: #5b5c60;
        border-radius: 50%;
        &:hover {
            color: #fff;
            background-color: #f29100;
        }
    }
    .icon {
        font-size: 18px;

        width: 34px;
        height: 34px;
        margin-right: 10px;
        padding: 5px;

        color: #fff;
        border-radius: 6px;
    }
    .info {
        padding-top: 2px;

        text-align: left;
    }
    .title {
        font-size: 14px;
        line-height: 14px;

        margin-bottom: 4px;

        color: #323338;
    }
    .data {
        font-size: 11px;
        line-height: em(13px, 11px);

        color: #5b5c60;
    }
    @include media-breakpoint-only(md) {
        .btn--preview {
            display: block;
        }
        .download {
            top: 16px;

            margin: 0;

            transform: translate(0);
        }
        .info {
            margin-top: 18px;
        }
    }
}
</style>
