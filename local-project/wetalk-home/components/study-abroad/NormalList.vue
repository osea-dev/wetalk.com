<template>
    <div
        :class="$style['list']"
        class="grid grid-cols-3 wow-group-3 lg:grid-cols-2 lg:wow-group-2 sm:grid-cols-1 sm:wow-group-1"
        :data-theme="theme"
    >
        <div
            v-for="(item, index) in data"
            :key="index"
            :class="$style['list-item']"
            class="wow animate__fadeInUp-50"
        >
            <div :class="$style['thumb']">
                <nuxt-img :src="item.thumb" alt="" />
            </div>
            <div :class="$style['info']">
                <div :class="$style['title']">
                    {{ item.title }}
                </div>
                <div :class="$style['desc']">
                    {{ item.desc }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    theme?: string;
    data: {
        thumb: string;
        title: string;
        desc: string;
    }[];
}>();
</script>
<style lang="scss" module>
.list {
    gap: 60px;
    &[data-theme="two"] {
        gap: 60px 45px;
        .list-item {
            padding-bottom: 0;
            .title {
                margin-bottom: 6px;
            }
        }
    }
}
.list-item {
    padding-bottom: 50px;
    .thumb {
        @include image-placeholder(360px, 220px);
        width: 100%;
        margin-bottom: 15px;

        border-radius: 10px;
    }
    .title {
        font-size: 22px;
        font-weight: 500;
        line-height: 200%;

        margin-bottom: em(10px, 22px);

        color: #2d2b32;
    }
    .desc {
        font-size: 13px;
        font-weight: 400;
        line-height: 200%;

        color: #777;
    }
}
@include media-breakpoint-down(xxl) {
    .list {
        gap: 30px;
        &[data-theme="two"] {
            gap: 50px 30px;
        }
    }
    .list-item {
        .title {
            font-size: 20px;
        }
    }
}
@include media-breakpoint-down(xxl) {
    .list-item {
        .title {
            font-size: 18px;
        }
    }
}
@include media-breakpoint-down(lg) {
    .list {
        gap: 20px;
        &[data-theme="two"] {
            gap: 40px 20px;
        }
    }
    .list-item {
        padding-bottom: 30px;
        .title {
            font-size: 16px;
        }
        .desc {
            font-size: 12px;
        }
    }
}
:global(.lang-en) {
    .list-item {
        .title {
            // @include ellipse(2, 1.6em, 1);
            font-weight: bold;
            line-height: 1.6;
        }
    }
    .list[data-theme="two"] .list-item .title {
        font-size: 17px;
    }
    @include media-breakpoint-down(xl) {
        .list-item {
            .title {
                @include ellipse(2, 1.6em, 1);
            }
        }
        .list[data-theme="two"] .list-item .title {
            font-size: 14px;
        }
    }
    @include media-breakpoint-down(sm) {
        .list-item {
            .title {
                height: auto;
            }
        }
    }
}
</style>
