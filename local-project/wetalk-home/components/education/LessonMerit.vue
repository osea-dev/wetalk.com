<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-06 18:37:05
-->
<template>
    <div :class="$style['lesson-merit']" class="lesson-module">
        <div v-html="prop.content"></div>
    </div>
</template>
<script lang="ts" setup>
const prop = defineProps<{
    content: string;
}>();
</script>
<style lang="scss" module>
.lesson-merit {
    .module-header {
        font-size: 18px;

        width: min(602px, 50%);
        padding-top: em(34px, 18px);
        padding-bottom: em(137px, 18px);

        color: #838383;
    }
    .module-desc {
        line-height: em(40px, 18px);
    }
    .module-body {
        :global {
            .state-pos--left {
                font-size: 15px;

                flex: 0 0 auto;

                width: min(592px, 50%);
                padding-right: em(40px, 15px);
                padding-bottom: em(50px, 15px);
            }
            .state-pos--right {
                width: 680px;
            }
        }
        .des-row {
            @include space-between(88px, "y");
        }
        .des-row[data-revers] {
            flex-direction: row-reverse;
            :global {
                /* stylelint-disable-next-line selector-max-compound-selectors */
                .state-pos--left {
                    padding-right: 0;
                    padding-left: em(40px, 15px);
                }
            }
        }
        .des-title {
            font-size: 36px;
            font-weight: 700;

            margin-bottom: em(23px, 36px);
        }
        .des-body {
            line-height: em(30px, 15px);

            color: #838383;
        }
        .des-btn {
            font-size: 17px;
            line-height: em(60px, 17px);

            position: relative;

            overflow: hidden;

            width: em(190px, 17px);
            margin-top: em(60px, 17px);

            text-align: center;

            color: #fff;
            border-radius: 10px;
            &::after {
                position: absolute;
                top: 0;
                right: 0;

                width: 200%;
                height: 100%;

                content: "";
                transition: 0.46s ease;

                background: linear-gradient(
                    82.16deg,
                    #ff5656 67.895%,
                    #ff7356 88.08%,
                    #ffab6d 100%
                );
            }
            span {
                position: relative;
                z-index: 10;
            }
            &:hover {
                &::after {
                    transition: 2s ease;
                    transform: translateX(50%);
                }
            }
        }
        .des-thumb {
            width: 100%;
            img {
                width: 114.705882352941%;
                max-width: none;
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        .module-header {
            font-size: 16px;

            padding-bottom: 90px;
        }
        .module-body {
            :global {
                .state-pos--left {
                    font-size: 16px;

                    width: min(582px, 46%);
                }
            }
            .des-row {
                @include space-between(60px, "y");
            }
            .des-title {
                font-size: 34px;
            }
            .des-btn {
                font-size: 16px;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-header {
            font-size: 16px;

            padding-bottom: 90px;
        }
        .module-body {
            :global {
                .state-pos--left {
                    font-size: 14px;

                    width: min(582px, 46%);
                }
            }
            .des-title {
                font-size: 32px;
            }
            .des-btn {
                font-size: 14px;
            }
        }
    }
}
</style>
