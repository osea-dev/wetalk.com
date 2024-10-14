<template>
    <div
        :class="$style['empty-panel']"
        class="flex items-center justify-center"
    >
        <div :class="$style['box']">
            <span class="text">{{ text }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{ text: string }>();
</script>
<style lang="scss" module>
.empty-panel {
    @include space-placeholder(880px, 437px);
    width: 100%;

    background: #fafafc;
}
</style>
