<template>
    <div
        class="p-module education-module"
        :class="$style['video-courses-module']"
    >
        <div class="wrapper--limit-width relative z-10">
            <div :class="$style['module-body']">
                <div
                    :class="$style['module-head']"
                    class="flex justify-between relative z-10"
                >
                    <div
                        :class="$style['state-pos--left']"
                        class="flex items-center"
                    >
                        <div :class="$style['module-title']">{{ title }}</div>
                        <div
                            v-if="tagList && tagList.length"
                            :class="$style['tag-list']"
                            class="flex"
                        >
                            <div
                                v-for="(item, index) in tagList"
                                :key="index"
                                :class="$style['tag-item']"
                                :data-active="activeTag === item.tag"
                                @click="emit('changeTag', item.tag)"
                            >
                                {{ item.tag }}
                            </div>
                        </div>
                    </div>
                </div>
                <slot></slot>
                <PageTab
                    v-if="total > 1"
                    :total="total"
                    :link="link + '/?page={{page}}'"
                    :page-size="pageSize"
                    :current-index="currentPage"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import PageTab from "@/components/PageTab.vue";

defineProps<{
    title: string;
    total: number;
    link: string;
    pageSize: number;
    currentPage: number;
    tagList?: any[];
    activeTag?: string;
}>();

const emit = defineEmits<{ (e: "changeTag", tag: string): void }>();
</script>

<style lang="scss" module>
.video-courses-module {
    position: relative;
    z-index: 10;

    padding-top: 90px;
    padding-bottom: 50px;
    &::after {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        width: 94%;
        max-width: calc(#{$content-w} + 78px * 2);
        height: 460px;
        margin: 0 auto;

        content: "";

        border-radius: 15px 15px 0 0;
        background: linear-gradient(
            180deg,
            #fff 36.56%,
            rgb(255 255 255 / 0) 81.5%
        );
        box-shadow: 0 -25px 50px rgb(56 49 71 / 6%);
    }
    .module-head {
        margin-bottom: 35px;
    }
    .module-title {
        font-size: 32px;
        line-height: em(48px, 32px);

        margin-right: em(46px, 32px);

        color: #2d2b32;
    }
    .tag-list {
        //
    }
    .tag-item {
        @include space-between(10px);

        font-size: 14px;
        line-height: em(21px, 14px);

        padding: 7px 20px;

        cursor: pointer;
        transition: 0.26s ease;

        color: #777;
        border-radius: 40px;
        &:hover {
            color: #2d2b32;
        }
        &[data-active] {
            color: #fff;
            background: #0aca91;
        }
    }
    .module-body {
        padding: 0 70px;
    }
    @include media-breakpoint-down(xxxl) {
        padding-top: 80px;
        padding-bottom: 280px;
        .module-body {
            padding: 0 40px;
        }
    }
    @include media-breakpoint-down(xxl) {
        padding-bottom: 240px;
        .module-body {
            padding: 0 30px;
        }
    }
    @include media-breakpoint-down(xl) {
        padding-top: 70px;
        padding-bottom: 180px;
        .module-title {
            font-size: 26px;
        }
        .module-body {
            padding: 0;
        }
    }
    @include media-breakpoint-down(lg) {
        padding-top: 60px;
        padding-bottom: 120px;
    }
    @include media-breakpoint-down(md) {
        padding-bottom: 80px;
        .module-title {
            padding: 0 em(10px, 26px);
        }
    }
    @include media-breakpoint-down(sm) {
        padding-bottom: 60px;
    }
}
:global(.lang-en) {
    .video-courses-module .module-title {
        font-weight: bold;

        text-transform: capitalize;
    }
}
</style>
