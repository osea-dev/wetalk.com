<template>
    <div :class="$style['tag-sku']" :data-theme="showIcon.color">
        <i class="ic" :class="showIcon.icon"></i>
        <span class="text">{{ data.type }}</span>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const prop = defineProps<{
    data: {
        skuTypeid: 1 | 2;
        type: string;
    };
}>();

const iconInfo = {
    1: {
        color: "yellow",
        icon: "iconfont icon-xiaobanke",
    },
    2: {
        color: "yellow",
        icon: "iconfont icon-xiaobanke-2",
    },
    3: {
        color: "yellow",
        icon: "iconfont icon-xiaobanke-2",
    },
};

const showIcon = computed(() => {
    return (
        iconInfo[prop.data.skuTypeid] || {
            color: "yellow",
            icon: "iconfont icon-xiaobanke-2",
        }
    );
});
</script>
<script lang="ts">
export default {
    name: "TagSku",
};
</script>
<style lang="scss" module>
.tag-sku {
    @include space-between(em(10px, 13px));
    font-size: 13px;
    line-height: em(20px, 13px);

    padding: em(8px, 13px) em(20px, 13px);

    color: #777;
    border: 1px solid #e0e9f5;
    border-radius: em(18px, 13px);
    :global(.ic) {
        margin-right: 2px;
    }
    &[data-theme="gray"] {
        color: #777;
        border-color: #e0e9f5;
        background: #f5f8fc;
    }
    &[data-theme="yellow"] {
        color: #f29100;
        border-color: #f5d587;
        background: #fceecc;
    }
    &[data-theme="green"] {
        color: #0aca91;
        border-color: #7de2a6;
        background: #e1faeb;
    }
}
</style>
