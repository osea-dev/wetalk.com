<!--
 * @Description: 返回上一页
 * @Author: F-Stone
 * @LastEditTime: 2022-11-18 18:22:36
-->
<template>
    <button :class="$style['back']" @click="back">
        <slot />
    </button>
</template>
<script lang="ts" setup>
import { useContext, useRouter } from "@nuxtjs/composition-api";

const prop = defineProps<{ defaultBack?: string }>();

const router = useRouter();

const { app, from } = useContext();
function back() {
    if (from || !prop.defaultBack) {
        router.back();
    } else {
        /**
         * @see Regex101 expression: {@link https://regex101.com/r/1y7iod/1}
         */
        const isInternal = /^\/(?!\/)/.test(prop.defaultBack);
        // /**
        //  * @see Regex101 expression: {@link https://regex101.com/r/RnUseS/1}
        //  */
        // const externalLink = /^https?:\/\//i.test(props.to);
        if (isInternal) {
            router.push(app.localePath(prop.defaultBack));
        } else {
            window.location.href = prop.defaultBack;
        }
    }
}
</script>
<style lang="scss" module>
.back {
    // init
}
</style>
