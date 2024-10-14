<template>
    <div :class="$style['avatar']" :style="{ width: size }">
        <img :src="avatar" alt="" />
    </div>
</template>
<script lang="ts" setup>
defineProps<{ avatar?: string; size?: string }>();
</script>
<style lang="scss" module>
.avatar {
    @include image-placeholder(56px, 56px);

    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 6px 15px rgb(0 0 0 / 0.05);
    & > img {
        width: 100%;
        height: 100%;

        transform: translate3d(0, 0, 0);

        object-fit: cover;
    }
}
</style>
