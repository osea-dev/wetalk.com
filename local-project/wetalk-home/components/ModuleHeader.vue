<!--
 * @Description: 模块标题
 * @Author: F-Stone
 * @LastEditTime: 2022-11-20 17:11:17
-->
<template>
    <div :class="$style['module-header']" class="wow-group-3">
        <h2
            :class="$style['module-title']"
            class="wow animate__fadeInUp-50"
            :data-ornament="!!subtitle"
        >
            {{ title }}
        </h2>
        <h3
            v-if="subtitle"
            :class="$style['module-subtitle']"
            class="wow animate__fadeInUp-50"
        >
            {{ subtitle }}
        </h3>
        <div
            :class="$style['module-desc']"
            v-if="desc"
            class="wow animate__fadeInUp-50"
        >
            <p class="text">{{ desc }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    title: string;
    subtitle?: string;
    desc?: string;
}>();
</script>
<style lang="scss" module>
.module-header {
    .module-title {
        font-size: var(--module-title-size);
        font-weight: 700;

        position: relative;

        display: inline-block;

        margin-bottom: em(20px, 36px);

        color: #23242a;
        &[data-ornament] {
            margin-bottom: 0;
            &::after {
                position: absolute;
                top: em(-24px, 40px);
                right: em(-46px, 40px);

                width: em(45.64px, 40px);
                height: em(44.6px, 40px);

                content: "";

                background-image: url("data:image/png;base64,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");
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }
    }
    .module-subtitle {
        font-family: "Inter";
        font-size: var(--module-subtitle-size);
        font-weight: 700;
        line-height: em(60px, 50px);

        text-transform: capitalize;

        color: #23242a;
    }
    .module-desc {
        font-size: 15px;
        font-weight: 500;
        line-height: em(30px, 15px);

        color: #65666a;
    }
    @include media-breakpoint-down(xxl) {
        .module-desc {
            font-size: 14px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-desc {
            font-size: 13px;
        }
    }
}
</style>
