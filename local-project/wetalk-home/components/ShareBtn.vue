<template>
    <div
        :class="$style['share-btn']"
        class="flex items-center justify-center"
        @click="share"
    >
        <div
            :class="$style['share-icon']"
            class="flex items-center justify-center"
        >
            <i class="ic iconfont icon-share"></i>
        </div>
        <div :class="$style['wrapper--share-list']">
            <div :class="$style['share-list']">
                <div :class="$style['share-group']">
                    <div
                        :class="$style['share-item']"
                        class="fb-xfbml-parse-ignore"
                        @click="shareWeb(getFacebookShareLink())"
                    >
                        <i class="ic color-iconfont color-icon-facebook"></i>
                        <span class="text">{{ $t("分享至Facebook") }}</span>
                    </div>
                    <div
                        :class="$style['share-item']"
                        class="fb-xfbml-parse-ignore"
                        @click="shareWeb(getWeiboShareLink())"
                    >
                        <i class="ic color-iconfont color-icon-weibo"></i>
                        <span class="text">{{ $t("分享至微博") }}</span>
                    </div>
                    <div
                        :class="$style['share-item']"
                        class="fb-xfbml-parse-ignore"
                        @click="shareWeb(getQZoneShareLink())"
                    >
                        <i class="ic color-iconfont color-icon-qzone"></i>
                        <span class="text">{{ $t("分享至QQ空间") }}</span>
                    </div>
                </div>
                <div :class="$style['share-group']">
                    <div ref="copyBtn" :class="$style['share-item']">
                        <i class="ic iconfont icon-link"></i>
                        <span class="text">{{ $t("复制链接") }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext, useRoute } from "@nuxtjs/composition-api";
import clipboard from "clipboard";
import Vue, { onBeforeUnmount, onMounted, ref, computed } from "vue";

const copyBtn = ref<HTMLElement>();

const route = useRoute();
const shareUrl = computed(() => {
    return encodeURIComponent(process.env.DOMAIN + route.value.fullPath);
});

function share() {
    const shareData = {
        title: $("title").text(),
        text: $("meta[name='description']").attr("content"),
        url: window.location.href,
    };
    try {
        navigator
            .share?.(shareData)
            .then((e) => {
                console.log("e:", e);
            })
            .catch((e) => console.log(e));
    } catch (err) {
        console.log("err", err);
    }
}

function getFacebookShareLink() {
    return (
        "https://www.facebook.com/sharer/sharer.php?u=" +
        shareUrl.value +
        ";src=sdkpreparse"
    );
}

function getWeiboShareLink() {
    const shareData = {
        link: shareUrl.value,
        title: $("title").text(),
        text: $("meta[name='description']").attr("content"),
    };
    return `https://service.weibo.com/share/share.php?url=${shareData.link}&title=${shareData.title}#_loginLayer_1680761717652`;
}
function getQZoneShareLink() {
    const shareData = {
        title: $("title").text(),
        text: $("meta[name='description']").attr("content"),
    };
    return `
        https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareUrl.value}&title=${shareData.title}&summary=${shareData.text})
        `;
}

function shareWeb(url: string) {
    const newWin: Window | null = window.open("about:blank", "_blank");
    newWin && (newWin.location.href = url);
}

onMounted(() => {
    if (!copyBtn.value) return;
    const clip = new clipboard(copyBtn.value, {
        text: () => window.location.href || "",
    });
    const { i18n } = useContext();
    clip.on("success", () => {
        Vue.notify?.({
            group: "form-notice",
            title: i18n.t("链接复制成功"),
            type: "success",
            duration: 3000,
        });
    });
    onBeforeUnmount(() => {
        clip.destroy();
    });
});
</script>
<style lang="scss" module>
.share-btn {
    position: relative;
    z-index: 100;
    &:hover {
        .share-icon {
            color: #fff;
            border-color: #0aca91;
            background-color: #0aca91;
        }
        .wrapper--share-list {
            top: 100%;

            visibility: visible;

            opacity: 1;
        }
    }
    .share-icon {
        font-size: 20px;

        width: 50px;
        height: 50px;

        cursor: pointer;
        transition: 0.26s ease;

        color: #777;
        border: 2px solid #dde6ea;
        border-radius: 50%;
    }
    .wrapper--share-list {
        position: absolute;
        top: calc(100% + 15px);
        left: 50%;

        visibility: hidden;

        padding-top: 17px;

        transition: 0.36s ease;
        transform: translateX(-50%);

        opacity: 0;
        &::after {
            position: absolute;
            top: 10px;
            left: 50%;

            width: 15px;
            height: 15px;

            content: "";
            transform: translateX(-50%) rotate(45deg);

            border-radius: 3px;
            background-color: #fff;
        }
    }
    .share-list {
        position: relative;
        z-index: 10;

        white-space: nowrap;

        color: var(--t-c-lighter);
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 7px 13px rgb(152 169 188 / 0.26);
    }
    .share-group {
        padding: 10px 0;

        cursor: pointer;

        border-bottom: 1px solid #edf2f9;
        &:last-child {
            border-bottom-width: 0 !important;
        }
    }
    .share-item {
        font-size: 13px;

        padding: 10px 40px;

        transition: 0.26s ease;
        &:hover {
            color: var(--t-c-default);
            background-color: rgb(0 0 0 / 0.02);
        }
        :global(.ic) {
            font-size: 14px;

            display: inline-block;

            width: 16px;
            margin-right: 9px;

            text-align: center;
        }
    }
    @include media-breakpoint-down(xl) {
        .wrapper--share-list {
            right: 0;
            left: auto;

            transform: translateX(0);
        }
    }
}
body[data-is-mobile="1"] {
    .wrapper--share-list {
        display: none;
    }
}
</style>
