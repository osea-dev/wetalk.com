<template>
    <div></div>
</template>
<script lang="ts" setup>
import { onMounted, useRoute } from "@nuxtjs/composition-api";

const route = useRoute();
onMounted(() => {
    if (typeof route.value.query.url === "string" && route.value.query.url) {
        window.location.href = route.value.query.url;
    }
});
</script>
<script lang="ts">
export default {
    layout: "empty",
};
</script>
<style lang="scss" module>
//
</style>
