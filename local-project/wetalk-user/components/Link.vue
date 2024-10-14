<!--
 * @Description: 用于处理 站内地址 和 站外地址 混用的情况。 一般来说，如果是通过接口传入的未知地址，
                 应该为完整的链接，使用 a 标签进行处理。 这里主要应用静态数据中的链接混用的情况。
 * @Author: F-Stone
 * @LastEditTime: 2022-05-17 10:29:47
-->
<template lang="html">
    <NuxtLink
        v-if="isInternal"
        :class="$style['link']"
        v-bind="propsData"
        :target="target"
        :to="localePath(to)"
    >
        <slot></slot>
    </NuxtLink>
    <a
        v-else
        :class="$style['link']"
        :href="to || 'javascript:;'"
        :target="target ? target : '_blank'"
        :to="false"
    >
        <slot></slot>
    </a>
</template>
<script lang="ts" setup>
import "@nuxtjs/composition-api";
const propsData = withDefaults(
    defineProps<{ to: string; target?: "_blank" | "_self" | "" }>(),
    { to: "", target: "" }
);

/**
 * @see Regex101 expression: {@link https://regex101.com/r/1y7iod/1}
 */
const isInternal = /^\/(?!\/)/.test(propsData.to);
// /**
//  * @see Regex101 expression: {@link https://regex101.com/r/RnUseS/1}
//  */
// const externalLink = /^https?:\/\//i.test(props.to);
</script>
<style lang="scss" module>
//
</style>
