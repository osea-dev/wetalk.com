<template>
    <Avatar :avatar="avatar || userInfo?.headImg" />
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
defineProps<{ avatar?: string }>();
</script>
<style lang="scss" module>
//
</style>
