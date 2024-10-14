<template>
    <div :class="$style['order-pay-panel']">
        <div v-if="type === 'createOrder'" :class="$style['panel-head']">
            <h3 :class="$style['panel-title']">
                {{ $t("KEY_ORDER.CONFIRM") }}
            </h3>
        </div>
        <div
            v-else
            :class="$style['panel-head']"
            class="flex items-center justify-between"
        >
            <h3 :class="$style['panel-title']">
                {{ $t("KEY_ORDER.PAY_TITLE") }}
            </h3>
            <div :class="$style['order-code']">
                {{ $t("KEY_ORDER.ORDER_ID", [orderDetail.orderSn]) }}
            </div>
        </div>
        <div :class="$style['panel-body']">
            <div class="grid" :class="$style['course-detail']">
                <div class="flex items-center" :class="$style['col-1']">
                    <div :class="$style['course-thumb']">
                        <img :src="orderDetail.img" />
                    </div>
                    <div :class="$style['course-info']">
                        <div :class="$style['course-title']">
                            {{ orderDetail.title }}
                        </div>
                        <div :class="$style['course-subtitle']">
                            {{ orderDetail.message }}...
                        </div>
                    </div>
                </div>
                <div v-if="'skuTypeid' in orderDetail" :class="$style['col-2']">
                    <div :class="$style['type-title']">
                        {{ $t("KEY_ORDER.TYPE") }}
                    </div>
                    <TagSku
                        class="inline-block"
                        :data="{
                            skuTypeid: orderDetail.skuTypeid,
                            type: orderDetail.type,
                        }"
                    >
                    </TagSku>
                </div>
                <div v-else :class="$style['col-2']"></div>
                <div v-if="'classHour' in orderDetail" :class="$style['col-3']">
                    <div :class="$style['lesson-count-title']">
                        {{ $t("KEY_BASE.COURSE_NUM") }}
                    </div>
                    <div :class="$style['lesson-count']">
                        {{ orderDetail.classHour }}
                    </div>
                </div>
                <div
                    v-else-if="'videos' in orderDetail"
                    :class="$style['col-3']"
                >
                    <div :class="$style['lesson-count-title']">
                        {{ $t("KEY_BASE.COURSE_NUM") }}
                    </div>
                    <div :class="$style['lesson-count']">
                        {{ orderDetail.videos.length }}
                    </div>
                </div>
                <div v-else :class="$style['col-3']"></div>
                <div :class="$style['col-4']">
                    <div class="flex items-end" :class="$style['price']">
                        <i class="ic" :class="$style['unit']">{{
                            orderDetail.ico
                        }}</i>
                        <span class="text" :class="$style['num']">
                            {{ orderDetail.price }}
                        </span>
                    </div>
                    <div :class="$style['price-origin']">
                        {{
                            $t("KEY_ORDER.ORIGIN_PRICE", [
                                orderDetail.ico + orderDetail.marketPrice,
                            ])
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type {
    TYPE_ORDER_DETAIL,
    TYPE_RECORD_COURSE_ORDER,
    TYPE_OFFLINE_COURSE_ORDER,
} from "@/assets/script/api/api";
defineProps<{
    type: "payOrder" | "createOrder";
    orderDetail:
        | TYPE_ORDER_DETAIL
        | TYPE_RECORD_COURSE_ORDER
        | TYPE_OFFLINE_COURSE_ORDER;
}>();
</script>
<style lang="scss" module>
.order-pay-panel {
    font-size: 22px;

    margin-bottom: 15px;

    border-radius: $panel-radius;
    background-color: #fff;
    &:last-child {
        margin-bottom: 0;
    }
    .panel-head {
        padding: c-space(2.4) c-space(6);

        border-bottom: 1px solid #e6e8ec;
    }
    .panel-title {
        font-weight: 700;
        line-height: em(32px, 22px);

        color: #2d2b32;
    }
    .order-code {
        font-size: 14px;
    }
    .panel-body {
        padding: c-space(4) c-space(6);
    }
    .course-detail {
        gap: c-space(3);
        grid-template-columns: 1fr 159px 88px auto;
        & > * {
            align-self: center;
        }
        .col-1 {
            max-width: 420px;
        }
        .course-thumb {
            @include image-placeholder(180px, 110px);
            overflow: hidden;
            flex: 0 0 auto;

            margin-right: c-space(3);

            border-radius: 4px;
        }
        .course-info {
            flex: 1 1 auto;

            min-width: 1px;
        }
        .course-title {
            font-size: em(20px, 22px);
            font-weight: 700;
            line-height: em(30px, 20px);

            margin-bottom: em(7px, 20px);

            color: #333;
        }
        .course-subtitle {
            @include ellipse(1);
            font-size: 13px;
            line-height: em(20px, 13px);

            color: #b1b5c4;
        }
        .lesson-count-title,
        .type-title {
            font-size: 13px;
            line-height: em(20px, 13px);

            margin-bottom: 9px;

            color: #777;
        }
        .type-tag {
            font-size: 13px;
            font-weight: 700;
            line-height: em(20px, 13px);

            padding: 8px 20px;

            color: #f8af00;
            border-radius: 18px;
            background: rgb(248 175 0 / 0.2);
            :global(.ic) {
                font-size: 14px;

                margin-right: 4px;
            }
        }
        .lesson-count {
            font-family: "Inter";
            font-size: 28px;
            font-weight: 700;
            line-height: em(34px, 28px);

            color: #2d2b32;
        }
        .price {
            font-family: "Inter";
            font-size: 36px;
            font-weight: 700;
            font-style: normal;
            line-height: em(30px, 36px);

            margin-bottom: 4px;

            color: #f53f2d;
            .unit {
                font-size: 20px;
                line-height: 1;

                color: #f53f2d;
            }
        }
        .price-origin {
            font-size: 12px;
            line-height: em(18px, 12px);

            text-align: right;
            text-decoration: line-through;

            color: #777;
        }
    }
    @include media-breakpoint-down(lg) {
        .course-detail {
            grid-template-columns: 1fr auto;
            .col-3 {
                display: flex;

                align-items: center;

                grid-area: 2 / 1 / 3 / 3;
                justify-content: flex-end;
            }
            .col-4 {
                display: block;

                text-align: right;

                align-items: center;
                grid-area: 3 / 1 / 4 / 3;

                justify-content: flex-end;
            }
            .price {
                display: block;
            }
            .lesson-count-title {
                margin: 0;
                margin-right: 12px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .course-detail {
            grid-template-columns: 1fr auto;
            .col-1 {
                grid-area: 1 / 1 / 2 / 3;
            }
            .col-2 {
                grid-area: 2 / 1 / 3 / 2;
            }
            .col-3 {
                display: flex;

                align-items: center;

                grid-area: 2 / 2 / 3 / 3;
                justify-content: flex-end;
            }
            .type-title {
                display: none;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        font-size: 18px;
        .panel-head {
            display: block;
            .panel-title {
                margin-bottom: 4px;
            }
        }
        .panel-head,
        .panel-body {
            padding: $panel-padding-2;
        }
        .course-detail {
            .course-thumb {
                width: 100%;
                margin-bottom: 18px;
            }
            .price {
                .unit {
                    font-size: 18px;
                }
            }
            .col-1 {
                display: block;
            }
            .col-3 {
                margin-top: 6px;
                padding-top: 16px;

                border-top: 1px solid #e6e8ec;

                grid-area: 3 / 1 / 4 / 3;
            }
            .col-4 {
                grid-area: 4 / 2 / 5 / 3;
            }
        }
    }
}
</style>
