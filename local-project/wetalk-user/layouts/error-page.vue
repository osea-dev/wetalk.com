<!--
 * @Description: page 的默认布局结构
 * @Author: F-Stone
 * @LastEditTime: 2022-12-30 18:31:30
-->
<template>
    <div
        class="w-page"
        data-layout="simple"
        data-theme="deep"
        :class="[$style['w-page'], device + '-ui', 'lang-' + lang]"
    >
        <div :class="$style['w-nav']">
            <div class="wrapper--limit-width">
                <div
                    :class="$style['module-body']"
                    class="flex items-center justify-between xl:justify-center"
                >
                    <div class="state-pos--left">
                        <Link
                            :to="linkManage.index"
                            :class="$style['w-logo']"
                            class="flex items-center justify-center"
                        >
                            <h1 class="hide">wetalk</h1>
                            <img
                                class="hide"
                                src="@/assets/images/logo.png"
                                alt=""
                            />
                            <i class="ic color-iconfont color-icon-logo"></i>
                        </Link>
                    </div>
                    <div class="state-pos--right"></div>
                </div>
            </div>
        </div>
        <Nuxt :class="$style['w-b']" />
        <clientOnly>
            <SiteNotice />
        </clientOnly>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSiteStore } from "@/store/site";
import linkManage from "@/assets/script/local-data/link-manage";
import SiteNotice from "@/components/SiteNotice.vue";

const { device, lang } = storeToRefs(useSiteStore());
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ErrorPageLayout",
    middleware: ["device"],
});
</script>
<style lang="scss" module>
.w-page[data-theme="deep"] {
    min-height: 100%;

    background-color: #f5f6fb;
    .w-footer {
        .copyright {
            color: #777;
        }
    }
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
</style>
