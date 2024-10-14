<template>
    <div :class="$style['tag']" :data-size="size">
        <span class="text">{{ text }}</span>
    </div>
</template>
<script lang="ts" setup>
defineProps<{ text: string; size?: string }>();
</script>
<style lang="scss" module>
.tag {
    font-size: 24px;
    font-weight: 700;
    line-height: em(36px, 24px);

    display: inline-block;

    padding: em(20px, 24px) calc(40px + em(20px, 40px));

    color: #fff;
    border-radius: 56px;
    background: #0aca91;
    &[data-size="mini"] {
        font-size: 18px;
    }
    @include media-breakpoint-down(xxl) {
        font-size: 20px;
    }
    @include media-breakpoint-down(xl) {
        font-size: 18px;
    }
    @include media-breakpoint-down(md) {
        font-size: 14px;
        &[data-size="mini"] {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(sm) {
        font-size: 13px;
    }
}
:global(.lang-en) {
    @include media-breakpoint-down(xl) {
        .tag {
            padding: em(20px, 24px) calc(10px + em(36px, 40px));
            &[data-size="mini"] {
                font-size: 14px;
            }
        }
    }
}
</style>
