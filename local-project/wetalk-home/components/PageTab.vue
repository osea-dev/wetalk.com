<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-28 16:21:53
-->
<template>
    <div
        :class="$style['page-tabs']"
        class="flex items-center"
        ref="pageTab"
        v-if="pageInfo.list.length > 1"
    >
        <Link
            :class="$style['tab-btn--prev']"
            class="flex items-center justify-center"
            :data-disable="!pageInfo.prev"
            :to="pageInfo.prev ? getLink(pageInfo.prev) : 'javascript:;'"
        >
            <i class="ic iconfont icon-arrow-left"></i>
        </Link>
        <div :class="$style['tab-center']" class="flex items-center sm:hidden">
            <template v-for="(item, index) in pageInfo.list">
                <span
                    class="text btn"
                    data-disable
                    v-if="item.index === -1"
                    :key="'dot' + index"
                    >...</span
                >
                <Link
                    v-else
                    :key="index"
                    :to="getLink(item.href)"
                    class="text btn"
                    :data-select="pageInfo.current === item.index"
                    >{{ item.index }}</Link
                >
            </template>
        </div>
        <div
            :class="$style['min-center']"
            class="hidden sm:block flex-auto text-center"
        >
            {{ currentIndex }} / {{ pageInfo.totalPage }}
        </div>
        <Link
            :data-disable="!pageInfo.next"
            :to="pageInfo.next ? getLink(pageInfo.next) : 'javascript:;'"
            :class="$style['tab-btn--next']"
            class="flex items-center justify-center"
        >
            <i class="ic iconfont icon-arrow-right"></i>
        </Link>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

const prop = defineProps<{
    total: number;
    currentIndex: number;
    pageSize: number;
    link: string;
}>();

function getLink(page: string | number) {
    return prop.link.replace("{{page}}", String(page));
}

const leftPageCount = 2;
const centerPageCount = 3;
const rightPageCount = 2;
const totalPageCount = leftPageCount + centerPageCount + rightPageCount;

function getPageList(totalSize: number, currentIndex: number) {
    const result = new Array(totalSize).fill(0).map((item, index) => {
        return {
            index: index + 1,
            href: index + 1,
        };
    });

    if (totalSize <= totalPageCount) {
        return result;
    }

    // 偏左
    if (currentIndex <= totalPageCount - rightPageCount) {
        return [
            ...result.slice(0, totalPageCount - rightPageCount),
            {
                index: -1,
                href: "",
            },
            result[totalSize - 1],
        ];
    } else if (
        currentIndex >= totalPageCount &&
        totalSize - currentIndex < rightPageCount
    ) {
        // 偏右
        return [
            result[0],
            {
                index: -1,
                href: "",
            },
            ...result.slice(totalSize - totalPageCount + leftPageCount),
        ];
    } else {
        // 居中
        const centerStartPos = currentIndex - Math.floor(centerPageCount / 2);
        return [
            result[0],
            {
                index: -1,
                href: "",
            },
            ...result.slice(centerStartPos, centerStartPos + centerPageCount),
            {
                index: -1,
                href: "",
            },
            result[totalSize - 1],
        ];
    }
}

const pageInfo = computed(() => {
    const { total, currentIndex } = prop;
    const totalPageSize = Math.ceil(total / prop.pageSize);

    return {
        total,
        current: currentIndex,
        prev: currentIndex === 1 ? "" : currentIndex - 1,
        next: currentIndex === totalPageSize ? "" : currentIndex + 1,
        list: getPageList(totalPageSize, currentIndex),
        totalPage: totalPageSize,
    };
});

const pageTab = ref<HTMLElement | null>(null);
</script>
<style lang="scss" module>
// 底部分页
.page-tabs {
    margin-top: 70px;
    .tab-btn--prev,
    .tab-btn--next {
        @include circle(em(70px, 20px), #fff);
        font-size: 20px;

        cursor: pointer;
        transition: 0.26s ease;

        opacity: 0.8;
        color: rgba(#17171b, 0.5);
        &:not([data-disable]):hover {
            opacity: 1;
            color: #17171b;
        }
        &[data-disable] {
            cursor: not-allowed;
        }
    }
    .tab-btn--prev {
        margin-right: em(52px, 20px);
    }
    .tab-btn--next {
        margin-left: em(52px, 20px);
    }
    .tab-center {
        :global(.btn) {
            @include space-between(34px);
            font-size: 14px;

            position: relative;

            padding: 0 1px;

            transition: 0.26s ease;

            color: #666;
            &::before {
                @include move-center;
                @include square(40px);

                position: absolute;

                content: "";
            }
            &::after {
                position: absolute;
                top: 110%;
                left: 0;

                width: 100%;
                height: 1px;

                content: "";
                transition: 0.26s ease;

                opacity: 0;
                background: #272727;
            }
        }
        :global(a.btn) {
            &:hover,
            &[data-select] {
                color: #17171b;
                &::after {
                    top: 100%;

                    opacity: 1;
                }
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .tab-btn--prev,
        .tab-btn--next {
            font-size: 17px;
        }
    }
    @include media-breakpoint-down(xl) {
        margin-top: 50px;
    }
    @include media-breakpoint-down(sm) {
        .tab-center {
            // display: n;
        }
    }
}
</style>
