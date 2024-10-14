<!--
 * @Description: page 的默认布局结构
 * @Author: F-Stone
 * @LastEditTime: 2022-12-30 14:11:55
-->
<template>
    <div
        class="w-page"
        data-layout="simple"
        data-theme="white"
        :class="[$style['w-page'], device + '-ui', 'lang-' + lang]"
    >
        <div :class="$style['w-nav']">
            <div class="wrapper--limit-width">
                <div
                    :class="$style['module-body']"
                    class="flex items-center justify-between xl:justify-center"
                >
                    <div class="state-pos--left">
                        <div
                            :class="$style['w-logo']"
                            class="flex items-center justify-center"
                        >
                            <h1 class="hide">wetalk</h1>
                            <img
                                class="hide"
                                src="@/assets/images/logo.png"
                                alt=""
                            />
                            <i
                                class="ic color-iconfont color-icon-logo-white"
                            ></i>
                        </div>
                    </div>
                    <div class="state-pos--right"></div>
                </div>
            </div>
        </div>
        <Nuxt :class="$style['w-b']" />
        <SiteFooter layout="fixed" />
        <clientOnly>
            <SiteNotice />
        </clientOnly>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSiteStore } from "@/store/site";
import { onBeforeMount, onBeforeUnmount } from "vue";

const { device, lang } = storeToRefs(useSiteStore());

onBeforeMount(() => {
    $("body").attr("data-no-zc", 1);
});
onBeforeUnmount(() => {
    $("body").attr("data-no-zc", 0);
});
</script>
<script lang="ts">
export default {
    name: "SimpleLayout",
    middleware: ["device", "base-info"],
};
</script>
<style lang="scss" module>
.w-page {
    overflow: hidden;

    min-height: 100%;
}
.w-nav {
    position: fixed;
    z-index: $zindex-sticky;
    top: 0;
    left: 0;

    width: 100%;
    min-width: map-get($map: $grid-breakpoints, $key: xl);
    padding: 50px 0;
    .w-logo {
        font-size: em(46px, $t-s-default);
        line-height: 1;

        transition: 0.26s ease;
        vertical-align: top;

        color: #fff;
    }
    @include media-breakpoint-down(xl) {
        min-width: 100%;
    }
}
.w-footer {
    position: fixed;
    z-index: $zindex-sticky;
    bottom: 0;
    left: 0;

    width: 100%;
    min-width: map-get($map: $grid-breakpoints, $key: xl);
    padding: 24px 0;
    .copyright {
        font-size: 12px;
        line-height: em(18px, 12px);

        color: #fff;
    }
    @include media-breakpoint-down(xl) {
        min-width: 100%;
    }
}
</style>
