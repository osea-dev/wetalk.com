<template>
    <div :class="$style['w-footer']" :data-layout="layout">
        <div class="wrapper--limit-width">
            <div :class="$style['module-body']">
                <div class="state-pos--left">
                    <div :class="$style['copyright']">
                        <span class="text">{{
                            $t("KEY_BASE.COPYRIGHT", [fullYear])
                        }}</span>
                    </div>
                </div>
                <div class="state-pos--right"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const fullYear = new Date().getUTCFullYear();
defineProps<{
    layout?: "fixed";
}>();
</script>
<style lang="scss" module>
.w-footer {
    // position: fixed;
    // z-index: $zindex-sticky;
    // bottom: 0;
    // left: 0;

    width: 100%;
    padding: 14px 0;

    background-color: #fff;
    .copyright {
        font-size: 12px;
        line-height: em(18px, 12px);

        color: #777;
    }
    &[data-layout="fixed"] {
        position: fixed;
        z-index: $zindex-sticky;
        bottom: 0;
        left: 0;

        width: 100%;
        min-width: map-get($map: $grid-breakpoints, $key: xl);
        padding: 24px 0;

        background-color: transparent;
    }
    @include media-breakpoint-down(xl) {
        &[data-layout="fixed"] {
            min-width: 100%;

            text-align: center;
        }
    }
}
</style>
