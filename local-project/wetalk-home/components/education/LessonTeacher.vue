<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-26 18:45:28
-->
<template>
    <div
        :class="$style['teacher-card']"
        class="flex justify-between items-start"
    >
        <div class="state-pos--left">
            <div :class="$style['card-head']">
                <div :class="$style['teacher-name']">
                    <span class="text">{{ teacher.name }}</span>
                </div>
                <div :class="$style['teacher-tag']" class="flex items-center">
                    <template v-for="(item, index) in teacher.tag">
                        <div :class="$style['tag-item']" :key="index">
                            <span class="text">{{ item }}</span>
                            <i
                                :class="$style['divide-line']"
                                class="ic"
                                v-if="index != teacher.tag.length - 1"
                            ></i>
                        </div>
                    </template>
                </div>
            </div>
            <div :class="$style['card-body']">
                <div :class="$style['msg-row']">
                    <span class="text title">{{ $t("来自") }}：</span>
                    <span class="text value">{{ teacher.from }}</span>
                </div>
                <div :class="$style['msg-row']">
                    <span class="text title">{{ $t("教育") }}：</span>
                    <span class="text value">{{ teacher.edu }}</span>
                </div>
                <div :class="$style['msg-row']">
                    <span class="text title">{{ $t("宗教信仰") }}：</span>
                    <span class="text value">{{ teacher.religion }}</span>
                </div>
            </div>
            <div :class="$style['card-footer']">
                <div :class="$style['teach-advantage-list']" class="flex">
                    <div
                        v-for="(advantage, index) in teacher.advantage"
                        :key="index"
                        :class="$style['advantage-item']"
                    >
                        <div :class="$style['item-row']">
                            <span :class="$style['item-value']">{{
                                advantage.value
                            }}</span>
                            <sup
                                :class="$style['item-sup']"
                                v-if="advantage.sup"
                                >{{ advantage.sup }}</sup
                            >
                            <sub
                                :class="$style['item-sub']"
                                v-if="advantage.sub"
                                >{{ advantage.sub }}</sub
                            >
                        </div>
                        <div :class="$style['item-row']">
                            <div :class="$style['item-title']">
                                <span class="text">{{ advantage.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="state-pos--right">
            <div :class="$style['teacher-thumb']">
                <img :src="teacher.thumb" alt="" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    teacher: {
        thumb: string;
        name: string;
        tag: string[];
        from: string;
        edu: string;
        religion: string;
        advantage: {
            value: string;
            sub: string;
            sup: string;
            title: string;
        }[];
    };
}>();
</script>
<style lang="scss" module>
.teacher-card {
    overflow: hidden;

    padding: 62px 189px 0 81px;

    border-radius: 20px;
    background-color: #effcf5;
    background-image: url("@/assets/images/education/teacher-bg.png");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 60.5882352941176% auto;
    // :global(.state-pos--left) {
    //     width: 480px;
    // }
    :global(.state-pos--right) {
        width: 384px;
    }
    .teacher-thumb {
        @include image-placeholder(1092px, 1442px);
        width: 100%;
    }
    @include media-breakpoint-down(xxl) {
        padding: 43.4px 132.3px 0 56.7px;
        :global(.state-pos--right) {
            width: 36%;
        }
    }
}
.card-head {
    font-size: 30px;

    padding-top: em(34px, 30px);
    padding-bottom: em(33px, 30px);
    .teacher-name {
        font-weight: 700;

        margin-bottom: em(8px, 30px);
    }
    .teacher-tag {
        font-size: 14px;

        color: #777;
        .divide-line {
            display: inline-block;

            width: 1px;
            height: 12px;
            margin: 0 10px;

            transform: rotate(30deg);

            background-color: #777;
        }
    }
    @include media-breakpoint-down(xxl) {
        font-size: 26px;

        padding-bottom: 20px;
        .teacher-tag {
            font-size: 13px;
        }
    }
}
.card-body {
    font-size: 14px;
    font-weight: 400;

    width: min(480px, 100%);
    padding-top: 28px;

    color: #777;
    border-top: 1px solid rgba(#313131, 0.1);
    .msg-row {
        @include space-between(19px, "y");
    }
    @include media-breakpoint-down(xxl) {
        font-size: 13px;

        padding-top: 20px;
        .msg-row {
            @include space-between(14px, "y");
        }
    }
}
.card-footer {
    margin-top: 47px;
    .advantage-item {
        @include space-between(74px);
        font-size: 14px;
        font-weight: 400;

        color: #777;
        .item-row {
            @include space-between(7px, "y");
        }
        .item-value {
            font-family: "Inter";
            font-size: 42px;
            font-weight: 700;
            line-height: em(51px, 42px);

            color: #0aca91;
        }
        .item-sub {
            font-size: 14px;

            bottom: -0;

            margin-left: 2px;
        }
        .item-sup {
            font-family: "Inter";
            font-size: 36px;
            font-weight: 700;

            top: -0.3em;

            color: #0aca91;
        }
    }
    @include media-breakpoint-down(xxl) {
        margin-top: 38px;
        .advantage-item {
            @include space-between(50px);
            font-size: 13px;
            .item-row {
                @include space-between(5px, "y");
            }
            .item-value {
                font-size: 38px;
            }
            .item-sup {
                font-size: 34px;
            }
            .item-sub {
                font-size: 13px;
            }
        }
    }
}
</style>
