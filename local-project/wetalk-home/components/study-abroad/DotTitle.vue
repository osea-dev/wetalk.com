<template>
    <div :class="$style['module-head']">
        <div :class="$style['module-title']" class="flex items-center">
            <div :class="$style['dot-group']" class="grid grid-cols-2">
                <div :class="$style['dot']"></div>
                <div :class="$style['dot']"></div>
            </div>
            <span class="text">{{ text }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{ text: string }>();
</script>
<style lang="scss" module>
.module-head {
    color: #18181b;
    border-bottom: 1px solid rgba(#000, 0.1);
}
.module-title {
    font-size: 36px;
    font-weight: 700;
    line-height: em(54px, 36px);

    padding: em(30px, 36px) 0;
}
.dot-group {
    margin-right: em(16px, 36px);

    gap: 6px;
    .dot {
        @include circle(em(12px, 36px));
        border: 3px solid #0aca91;
        background: #0aca91;
        &:first-child {
            background-color: #fff;
        }
    }
}
@include media-breakpoint-down(xxl) {
    .module-title {
        font-size: 28px;
    }
}
@include media-breakpoint-down(xl) {
    .module-title {
        font-size: 26px;
    }
}
@include media-breakpoint-down(md) {
    .module-title {
        font-size: 22px;
    }
    .dot-group {
        .dot {
            border-width: 1px;
        }
    }
}
@include media-breakpoint-down(sm) {
    .module-title {
        font-size: 20px;
    }
}
:global(.lang-en) {
    .module-title {
        align-items: start;
        .dot-group {
            margin-top: 0.55em;
        }
    }
}
</style>
