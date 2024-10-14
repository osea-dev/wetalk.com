<template>
    <main :class="$style['simple-page-body']">
        <article
            :class="$style['article-body']"
            v-html="$t('KEY_PAGE_POLICY')"
        ></article>
    </main>
</template>
<script lang="ts">
import { defineComponent, useRoute } from "@nuxtjs/composition-api";

export default defineComponent({
    name: "SimplePage",
    setup() {
        const route = useRoute();

        return {
            name: route.value.params.name,
        };
    },
});
</script>
<style lang="scss" module>
.simple-page-body {
    padding-top: var(--nav-h);
    padding-bottom: 100px;

    background-color: #f5f6f9;
    .article-body {
        font-family: Inter var(--SourceHanSans);
        font-size: 14px;
        font-weight: 500;
        line-height: 180%;

        width: 80%;
        max-width: 800px;
        margin: 0 auto;
        margin-top: 60px;
        padding: 0 60px 60px;

        color: #2d2b32;
        border-radius: var(--r-normal);
        background-color: #fff;
    }
    h1,
    h2,
    h3,
    h4 {
        font-size: 18px;
        font-weight: 700;
        line-height: 180%;

        margin: 1em 0;
        /* or 32px */

        color: #000;
    }
    h1 {
        font-size: 20px;
        line-height: em(24px, 20px);

        margin-bottom: 30px;
        padding: 30px 0;

        color: #000;
        border-bottom: 1px solid #e6e8ec;
    }
    h3 {
        font-size: 16px;
        font-weight: 700;
        line-height: 180%;
    }
    h4 {
        font-size: 14px;
        font-weight: 500;
        line-height: 180%;

        color: #2d2b32;
    }
    p {
        margin: 1em 0;

        // text-indent: 2em;
    }
    li {
        p {
            text-indent: 0;
        }
    }
}
</style>
