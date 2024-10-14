<!--
 * @Description: 购课须知
 * @Author: F-Stone
 * @LastEditTime: 2023-04-24 13:26:50
-->
<template>
    <div :class="$style['lesson-statement']">
        <ol v-html="$t('KEY_LESSON.' + statement)"></ol>
        <div
            :class="$style['contact-card']"
            class="flex justify-between lg:block"
        >
            <div :class="$style['contact-icon']">
                <img src="@/assets/images/education/contact-icon.png" alt="" />
            </div>
            <div
                :class="$style['contact-info']"
                class="flex flex-col justify-between"
            >
                <div
                    :class="$style['card-subtitle']"
                    v-html="$t('KEY_LESSON.SUBTITLE')"
                ></div>
                <div
                    :class="$style['card-tip']"
                    v-html="$t('KEY_LESSON.TIP')"
                ></div>
            </div>
            <div :class="$style['contact-msg']" class="grid grid-cols-2">
                <div :class="$style['contact-item']">
                    <p class="text" :class="$style['value']">+86 18092779560</p>
                    <p class="text" :class="$style['title']">
                        {{ $t("客服电话") }}
                    </p>
                </div>
                <div class="lg:hidden"></div>
                <div :class="$style['contact-item']">
                    <p class="text" :class="$style['value']">8:00am-10:00pm</p>
                    <p class="text" :class="$style['title']">
                        {{ $t("服务时间") }}
                    </p>
                </div>
                <div :class="$style['contact-item']">
                    <p class="text underline" :class="$style['value']">
                        service@wetalk.com
                    </p>
                    <p class="text" :class="$style['title']">
                        {{ $t("电子邮箱") }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
withDefaults(
    defineProps<{
        statement: string;
    }>(),
    { statement: "STATEMENT" }
);
</script>
<style lang="scss" module>
.lesson-statement {
    // init
    ol {
        font-size: 15px;

        list-style-position: outside;
        list-style-type: none;

        counter-reset: sectioncounter;

        color: #777;
        li {
            @include space-between(em(27.5px, 15px), "y");
            display: flex;
            &::before {
                content: counter(sectioncounter) "、";
                counter-increment: sectioncounter;
            }
        }
    }
    .contact-card {
        position: relative;

        margin-top: 45px;
        padding: 66px 97px;

        border-radius: var(--r-normal);
        background: #fceecc;
        .contact-icon {
            @include image-placeholder(462px, 393px);
            position: absolute;
            top: 0;
            right: 100px;

            width: math.div(492px, 2);
        }
    }
    .card-subtitle {
        font-size: 18px;
        font-weight: 700;
        line-height: 200%;

        color: #2d2b32;
    }
    .card-tip {
        font-size: 13px;
        line-height: 200%;

        color: #777;
    }
    .contact-info {
        position: relative;
        z-index: 10;
    }
    .contact-msg {
        position: relative;
        z-index: 10;

        margin-left: 20px;

        gap: 80px 52px;
    }
    .contact-item {
        .value {
            font-family: "Inter";
            font-size: 18px;
            font-weight: 700;
            line-height: em(26px, 18px);

            margin-bottom: 6px;

            user-select: text;

            color: #2d2b32;
        }
        .title {
            font-size: 13px;
            line-height: em(20px, 13px);

            color: #777;
        }
    }
    @include media-breakpoint-down(xxl) {
        ol {
            font-size: 14px;
        }
        .contact-card {
            padding: 46px 77px;
        }
    }
    @include media-breakpoint-down(xl) {
        .contact-card {
            padding: 46px 47px;
            .contact-icon {
                right: 80px;

                width: math.div(392px, 2);
            }
        }
        .contact-msg {
            gap: 60px 22px;
        }
    }
    @include media-breakpoint-down(lg) {
        .contact-card {
            padding: 46px 47px;
            .contact-icon {
                right: 80px;

                width: math.div(392px, 2);
            }
        }
        .card-tip {
            margin-top: 20px;
        }
        .contact-msg {
            display: flex;

            margin: 0;
            margin-top: 50px;

            justify-content: space-between;
        }
    }
    @include media-breakpoint-down(md) {
        .contact-card {
            padding: 40px 40px 60px;
            .contact-icon {
                right: 60px;

                width: math.div(322px, 2);
            }
        }
        .contact-msg {
            display: grid;

            gap: 20px;

            grid-template-columns: 1fr;
        }
    }
    @include media-breakpoint-down(sm) {
        .contact-card {
            padding: 60px 20px;
            .contact-icon {
                right: 16px;

                width: math.div(302px, 2);
            }
        }
        .contact-msg {
            display: grid;

            gap: 20px;

            grid-template-columns: 1fr;
        }
    }
}
</style>
