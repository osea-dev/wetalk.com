<template>
    <div
        :class="$style['type-tag']"
        class="inline-flex items-center justify-center"
    >
        <i class="ic" :class="info.icon"></i>
        <span class="text">{{ info.name }}</span>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const prop = defineProps<{ type: "小班课" }>();

const info = computed(() => {
    return {
        小班课: {
            icon: "iconfont icon-xiaobanke",
            name: "小班课",
        },
    }[prop.type];
});
</script>
<style lang="scss" module>
.type-tag {
    font-size: 13px;
    font-weight: 700;
    line-height: em(20px, 13px);

    padding: 8px 20px;

    color: #f8af00;
    border-radius: 18px;
    background: rgb(248 175 0 / 0.2);
    :global(.ic) {
        font-size: 14px;

        margin-right: 4px;
    }
}
</style>
