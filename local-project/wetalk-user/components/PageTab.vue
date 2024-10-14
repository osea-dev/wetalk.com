<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-12-05 14:17:19
-->
<template>
    <div
        class="flex items-center"
        v-if="pageInfo.list.length > 1"
        ref="pageTab"
        :class="$style['page-tabs']"
        :data-layout-size="layoutSize"
    >
        <Link
            class="flex items-center justify-center"
            :class="$style['tab-btn--prev']"
            :data-disable="!pageInfo.prev"
            target="_self"
            :to="pageInfo.prev ? getLink(pageInfo.prev) : 'javascript:;'"
            v-if="link"
        >
            <i class="ic iconfont icon-arrow-left"></i>
        </Link>
        <div
            class="flex items-center justify-center"
            :class="$style['tab-btn--prev']"
            :data-disable="!pageInfo.prev"
            @click="changePage(pageInfo.prev)"
            v-else
        >
            <i class="ic iconfont icon-arrow-left"></i>
        </div>
        <div class="flex items-center" :class="$style['tab-center']">
            <template v-for="(item, index) in pageInfo.list">
                <span
                    class="text btn"
                    data-disable
                    v-if="item.index === -1"
                    :key="'dot' + index"
                    >...</span
                >
                <span
                    class="text btn"
                    v-else-if="!link"
                    :data-select="pageInfo.current === item.index"
                    :key="'btn' + index"
                    @click="changePage(item.index)"
                >
                    {{ item.index }}
                </span>
                <Link
                    class="text btn"
                    v-else
                    :data-select="pageInfo.current === item.index"
                    :key="index"
                    :to="getLink(item.href)"
                    >{{ item.index }}</Link
                >
            </template>
        </div>
        <Link
            class="flex items-center justify-center"
            :class="$style['tab-btn--next']"
            :data-disable="!pageInfo.next"
            :to="pageInfo.next ? getLink(pageInfo.next) : 'javascript:;'"
            target="_self"
            v-if="link"
        >
            <i class="ic iconfont icon-arrow-right"></i>
        </Link>
        <div
            class="flex items-center justify-center"
            :class="$style['tab-btn--next']"
            :data-disable="!pageInfo.next"
            @click="changePage(pageInfo.next)"
            v-else
        >
            <i class="ic iconfont icon-arrow-right"></i>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

const prop = defineProps<{
    total: number;
    currentIndex: number;
    pageSize: number;
    layoutSize?: number;
    link?: string;
}>();

function getLink(page: string | number) {
    if (!prop.link) return "javascript:;";
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
    };
});

const pageTab = ref<HTMLElement | null>(null);

const emit = defineEmits<{
    (e: "changePage", pageIndex: number | string): void;
}>();
function changePage(pageIndex: number | string) {
    emit("changePage", pageIndex);
}
</script>
<style lang="scss" module>
// 底部分页
.page-tabs {
    margin-top: 70px;
    &[data-layout-size="2"] {
        .tab-btn--prev,
        .tab-btn--next {
            @include circle(em(50px, 20px), #fff);
        }
        .tab-btn--prev {
            margin-right: em(32px, 20px);
        }
        .tab-btn--next {
            margin-left: em(32px, 20px);
        }
    }
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
        :global(span.btn:not([data-disable])) {
            cursor: pointer;
        }
        :global(span.btn:not([data-disable])),
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
    @include media-breakpoint-down(sm) {
        justify-content: center;
        .tab-center {
            display: none;
        }
    }
}
</style>
