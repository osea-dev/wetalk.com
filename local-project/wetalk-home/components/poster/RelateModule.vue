<template>
    <div :class="$style['relate-module']">
        <div :class="$style['relate-title']">
            {{ $t("KEY_OTHER.RELATED_INFORMATION") }}
        </div>
        <RelateList :list="prop.list" />
    </div>
</template>
<script lang="ts" setup>
import RelateList from "@/components/poster/RelateList.vue";
import type { TYPE_NEW_DETAIL } from "@/assets/script/api/api";

const prop = defineProps<{ list: TYPE_NEW_DETAIL["relations"] }>();
</script>
<style lang="scss" module>
.relate-module {
    width: 320px;
    max-width: 100%;
    padding-top: 11px;
    .relate-title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(28px, 20px);

        margin-bottom: 45px;
    }
    @include media-breakpoint-down(xxl) {
        .relate-title {
            margin-bottom: 35px;
        }
    }
}
</style>
