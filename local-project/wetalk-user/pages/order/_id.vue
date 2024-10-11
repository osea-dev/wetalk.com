<template>
    <div :class="$style['order-page']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <template v-if="orderDetail">
                    <div :class="$style['order-detail-panel']">
                        <div
                            class="flex justify-between items-center"
                            :class="$style['panel-head']"
                        >
                            <h3 :class="$style['panel-title']">
                                {{ $t("KEY_ORDER.DETAIL_TITLE") }}
                            </h3>
                            <div
                                :class="$style['panel-state']"
                                :data-status="orderDetail.status"
                            >
                                <span
                                    v-if="orderDetail.status === -1"
                                    class="text"
                                >
                                    {{ $t("KEY_ORDER.STATUS.6") }}
                                </span>
                                <span
                                    v-if="orderDetail.status === 0"
                                    class="text"
                                >
                                    {{ $t("KEY_BASE.COURSE_STATUS.5") }}
                                </span>
                                <span
                                    v-if="orderDetail.status === 1"
                                    class="text"
                                >
                                    {{ $t("KEY_ORDER.STATUS.4") }}
                                </span>
                                <span
                                    v-if="orderDetail.status === 2"
                                    class="text"
                                >
                                    {{ $t("KEY_ORDER.STATUS.1") }}
                                </span>
                            </div>
                        </div>
                        <div :class="$style['panel-body']">
                            <div class="grid" :class="$style['course-detail']">
                                <div
                                    class="flex items-center"
                                    :class="$style['col-1']"
                                >
                                    <div :class="$style['course-thumb']">
                                        <img :src="orderDetail.img" />
                                    </div>
                                    <div :class="$style['course-info']">
                                        <div :class="$style['course-title']">
                                            {{ orderDetail.title }}
                                        </div>
                                        <div :class="$style['course-subtitle']">
                                            {{ orderDetail.message }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    :class="$style['col-2']"
                                    :style="{
                                        opacity: !orderDetail.skuTypeid ? 0 : 1,
                                    }"
                                >
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
                                <div :class="$style['col-3']">
                                    <div :class="$style['lesson-count-title']">
                                        {{ $t("KEY_BASE.COURSE_NUM") }}
                                    </div>
                                    <div :class="$style['lesson-count']">
                                        {{ orderDetail.classHour }}
                                    </div>
                                </div>
                                <div :class="$style['col-4']">
                                    <div
                                        class="flex items-end"
                                        :class="$style['price']"
                                    >
                                        <i class="ic" :class="$style['unit']">
                                            {{ orderDetail.ico }}</i
                                        ><span
                                            class="text"
                                            :class="$style['num']"
                                        >
                                            {{ orderDetail.price }}
                                        </span>
                                    </div>
                                    <div
                                        v-if="orderDetail.status !== 1"
                                        :class="$style['price-origin']"
                                    >
                                        {{
                                            $t("KEY_ORDER.ORIGIN_PRICE", [
                                                orderDetail.ico +
                                                    orderDetail.marketPrice,
                                            ])
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="orderDetail.status === 1"
                        :class="$style['pay-info-panel']"
                    >
                        <div :class="$style['panel-head']">
                            <h2 :class="$style['panel-title']">
                                {{ $t("KEY_ORDER.ORDER_INFO") }}
                            </h2>
                        </div>
                        <div :class="$style['panel-body']">
                            <div :class="$style['pay-info-list']">
                                <div
                                    class="flex justify-between"
                                    :class="$style['list-item']"
                                >
                                    <span :class="$style['item-title']">{{
                                        $t("KEY_ORDER.ORDER_ID", [""])
                                    }}</span
                                    ><span
                                        class="text"
                                        :class="$style['item-value']"
                                    >
                                        {{ orderDetail.orderSn }}
                                    </span>
                                </div>
                                <div
                                    class="flex justify-between"
                                    :class="$style['list-item']"
                                >
                                    <span :class="$style['item-title']">{{
                                        $t("KEY_ORDER.TIME")
                                    }}</span
                                    ><span
                                        class="text"
                                        :class="$style['item-value']"
                                    >
                                        {{ orderDetail.paytime }}
                                    </span>
                                </div>
                                <div
                                    class="flex justify-between items-center"
                                    :class="$style['list-item']"
                                >
                                    <span :class="$style['item-title']">{{
                                        $t("KEY_ORDER.METHOD")
                                    }}</span>
                                    <div class="flex items-center">
                                        <img
                                            class="h-6 mr-2"
                                            :src="orderDetail.payType.ico"
                                        />
                                        <span
                                            class="text"
                                            :class="$style['item-value']"
                                        >
                                            {{ orderDetail.payType.payName }}
                                        </span>
                                    </div>
                                </div>
                                <!-- <div
                                    class="flex justify-between"
                                    :class="$style['list-item']"
                                >
                                    <span :class="$style['item-title']"
                                        >促销码</span
                                    ><span
                                        class="text"
                                        :class="$style['item-value']"
                                    >
                                        未使用
                                    </span>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex justify-between items-center"
                        :class="$style['order-foot']"
                    >
                        <div :class="$style['order-price']">
                            <span class="text">{{ $t("KEY_BASE.TOTAL") }}</span>
                            <div
                                class="flex items-end"
                                :class="$style['price']"
                            >
                                <i class="ic" :class="$style['unit']">
                                    {{ orderDetail.ico }}</i
                                ><span class="text" :class="$style['num']">
                                    {{ orderDetail.price }}
                                </span>
                            </div>
                        </div>
                        <Link
                            v-if="orderDetail.status === 0"
                            :class="$style['btn--to-detail']"
                            :to="
                                linkManage.orderPay + '/' + orderDetail.orderid
                            "
                        >
                            <span class="text">{{ $t("KEY_ORDER.PAY") }}</span>
                        </Link>
                        <Link
                            v-if="orderDetail.status === 2"
                            :class="$style['btn--to-detail']"
                            :to="
                                linkManage.orderPay + '/' + orderDetail.orderid
                            "
                        >
                            <span class="text-right">{{
                                $t("KEY_ORDER.REPAY")
                            }}</span>
                        </Link>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_ORDER_DETAIL } from "@/assets/script/api/api";

import { useRoute } from "@nuxtjs/composition-api";
import { computed, onMounted, ref } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";

import { OrderDetail } from "@/assets/script/api/api";
import { formateDate } from "@/assets/script/util/date";

const route = useRoute();
const orderDetail = ref<TYPE_ORDER_DETAIL>();
const orderId = computed(() => {
    return route.value.params.id;
});
onMounted(() => {
    OrderDetail({ orderid: orderId.value }).then((res) => {
        orderDetail.value = res.data;
        orderDetail.value.message =
            (orderDetail.value.message || "").slice(0, 14) + "...";
        orderDetail.value.paytime = formateDate(
            Number(orderDetail.value.paytime),
            "yyyy-MM-dd HH:mm:ss"
        );
    });
});
</script>
<script lang="ts">
export default {
    name: "OrderDetail",
};
</script>
<style lang="scss" module>
.order-detail-panel,
.pay-info-panel,
.order-foot {
    margin-bottom: 15px;

    border-radius: $panel-radius;
    background-color: #fff;
    &:last-child {
        margin-bottom: 0;
    }
}
.pay-info-panel,
.order-foot {
    padding: $panel-padding;
    @include media-breakpoint-down(sm) {
        padding: $panel-padding-2;
    }
}
.order-detail-panel {
    font-size: 22px;
    .panel-head {
        padding: c-space(2.4) c-space(6);

        border-bottom: 1px solid #e6e8ec;
    }
    .panel-title {
        font-weight: 700;
        line-height: em(32px, 22px);

        color: #2d2b32;
    }
    .panel-state {
        font-weight: 700;
        line-height: em(33px, 22px);
        &[data-status="0"] {
            color: #f8af00;
        }
        &[data-status="1"] {
            color: #3cbb58;
        }
        &[data-status="-1"],
        &[data-status="2"] {
            color: #f53f2d;
        }
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
        .course-thumb {
            @include image-placeholder(180px, 110px);
            overflow: hidden;

            margin-right: c-space(3);

            border-radius: 4px;
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

            max-width: 200px;

            color: #b1b5c4;
        }
        .lesson-count-title,
        .type-title {
            font-size: 13px;
            line-height: em(20px, 13px);

            margin-bottom: 9px;

            color: #777;
        }
        .lesson-count {
            font-family: "Inter";
            font-size: em(28px, 22px);
            font-weight: 700;
            line-height: em(34px, 28px);

            color: #2d2b32;
        }
        .price {
            font-family: "Inter";
            font-size: em(36px, 22px);
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
                display: flex;
                flex-direction: column;

                align-items: flex-end;
                grid-area: 3 / 1 / 4 / 3;
                justify-content: center;
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
.pay-info-panel {
    font-size: 22px;
    .panel-title {
        font-weight: 700;
        line-height: em(32px, 22px);

        color: #2d2b32;
    }
    .panel-body {
        margin-top: c-space(4);
    }
    .pay-info-list {
        font-size: 14px;
        line-height: em(21px, 14px);

        color: #777;
        .list-item {
            padding: c-space(2) 0;

            border-bottom: 1px solid #e6e8ec;
            &:last-child {
                border-bottom-width: 0;
            }
            :global(.ic) {
                font-size: 20px;

                margin-right: 4px;
            }
        }
        .item-value {
            user-select: all;
        }
    }
    @include media-breakpoint-down(sm) {
        font-size: 18px;
    }
}
.order-foot {
    font-size: 18px;
    .btn--to-detail {
        font-weight: 700;
        line-height: em(27px, 18px);

        padding: 16px 60px;

        color: #fff;
        border-radius: 10px;
        background: linear-gradient(
            82.16deg,
            #ff5656 35.79%,
            #ff7356 76.16%,
            #ffab6d 100%
        );
    }
    .order-price {
        line-height: em(26px, 18px);

        color: #777;
    }
    .price {
        font-family: "Inter";
        font-size: em(22px, 18px);
        font-weight: 700;
        line-height: em(28px, 22px);

        margin-top: 7px;

        color: #f53f2d;
        .num {
            font-size: em(36px, 22px);
            font-weight: 700;
            line-height: em(44px, 36px);
        }
        .unit {
            line-height: em(38px, 22px);
        }
    }
    @include media-breakpoint-down(sm) {
        font-size: 16px;

        flex-direction: column;

        align-items: flex-end;
        .btn--to-detail {
            width: 100%;
            padding: 14px 60px;

            text-align: center;
        }
        .order-price {
            display: flex;

            width: 100%;
            margin-bottom: 20px;

            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
