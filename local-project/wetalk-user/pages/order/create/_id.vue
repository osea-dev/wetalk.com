<template>
    <div :class="$style['order-page']">
        <div v-if="orderDetail" class="wrapper--limit-width">
            <div v-if="!qrPayInfo" class="wrapper--limit-width-mini">
                <OrderCourseDetail
                    :order-detail="orderDetail"
                    type="createOrder"
                />
                <OrderPayMethod
                    :select-pay-id="selectPayId"
                    :pay-types="orderDetail.payTypes"
                    @change="changePayMethod"
                />
                <OrderPayFooter
                    :ico="orderDetail.ico"
                    :price="orderDetail.price"
                    :waiting="waiting"
                    @submit="toPay"
                />
            </div>
            <div v-else class="wrapper--limit-width-mini">
                <QrPanel :data="qrPayInfo" @refreshOrder="refreshOrder" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_ORDER } from "@/assets/script/api/api";
import { computed, onMounted, ref } from "vue";
import { useContext, useRoute, useRouter } from "@nuxtjs/composition-api";
import { ConfirmOrder, CreateOrder, OrderPay } from "@/assets/script/api/api";
import linkManage from "~/assets/script/local-data/link-manage";
import QrPanel from "~/components/order/QrPanel.vue";
import QRCode from "qrcode";
const { i18n } = useContext();

const selectPayId = ref<number>();
const orderDetail = ref<TYPE_ORDER>();
const qrPayInfo = ref<{
    orderId: number;
    orderSn: string;
    qrcode: string;
    expire: number;
    price: {
        ico: string;
        number: number;
    };
    payType: {
        ico: string;
        name: string;
    };
}>();

const route = useRoute();
const router = useRouter();
const courseSkuid = computed(() => {
    return route.value.params.id;
});
const payType = computed(() => {
    let type = -1;
    orderDetail.value?.payTypes.forEach((item) => {
        if (item.paytypeid === selectPayId.value) {
            if (item.isWeb === 1) {
                type = 1;
            } else if (item.isScan === 1) {
                type = 2;
                // 判断微信浏览器
                // if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
                //     type = 3;
                // } else {
                //     type = 2;
                // }
            }
        }
    });
    return type;
});

const orderId = ref<number>();

function changePayMethod(typeId: number) {
    selectPayId.value = typeId;
}

let newWin: Window | null;

function orderPay() {
    if (!orderId.value) return;
    if (typeof selectPayId.value === "undefined") {
        alert(i18n.t("KEY_BASE.TIP_MSG.10"));
        return Promise.reject();
    }

    return OrderPay({
        orderid: orderId.value,
        payTypeid: selectPayId.value,
        type: payType.value,
    }).then((res) => {
        if (res.statusCode !== 0) return;
        const payData = res.data;
        if (payData.apiUrl) {
            router.push(linkManage.orderInfo + "/" + orderId.value);
            newWin && (newWin.location.href = payData.apiUrl);
        } else if (payData.qrcode) {
            QRCode.toDataURL(payData.qrcode, { width: 260, margin: 0 }).then(
                (url: string) => {
                    qrPayInfo.value = {
                        orderId: Number(payData.orderid),
                        orderSn: payData.orderSn,
                        qrcode: url,
                        expire: payData.expire,
                        price: {
                            ico: payData.ico,
                            number: payData.amount,
                        },
                        payType: {
                            ico: payData.payType.ico,
                            name: payData.payType.payName,
                        },
                    };
                }
            );
        }
    });
}

function refreshOrder() {
    orderPay();
}

const waiting = ref<boolean>(false);
function toPay() {
    if (waiting.value) return;
    waiting.value = true;
    if (payType.value === 1) {
        newWin = window.open("about:blank", "_blank");
    }

    CreateOrder({
        courseSkuid: courseSkuid.value,
    })
        .then((res) => {
            if (res.statusCode !== 0) return;
            orderId.value = res.data.orderid;
            return orderPay();
        })
        .finally(() => {
            waiting.value = false;
        });
}
onMounted(() => {
    ConfirmOrder({ courseSkuid: courseSkuid.value }).then((res) => {
        if (res.data.message) {
            res.data.message = res.data.message.slice(0, 14) + "...";
        }
        orderDetail.value = res.data;
        selectPayId.value = res.data.payTypes[0]?.paytypeid;
    });
});
</script>
<script lang="ts">
export default {
    name: "OrderDetail",
};
</script>
<style lang="scss" module>
.order-page {
    // init
    .order-pay-panel,
    .pay-method-panel,
    .order-foot {
        margin-bottom: 15px;

        border-radius: $panel-radius;
        background-color: #fff;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .pay-method-panel,
    .order-foot {
        padding: 35px 60px;
    }
    .order-pay-panel {
        .panel-head {
            padding: 24px 60px;

            border-bottom: 1px solid #e6e8ec;
        }
        .panel-title {
            font-size: 22px;
            font-weight: 700;
            line-height: em(32px, 22px);

            color: #2d2b32;
        }
        .panel-body {
            padding: 40px 60px;
        }
    }
    .course-detail {
        gap: 30px;
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

            margin-right: 30px;

            border-radius: 4px;
        }
        .course-info {
            flex: 1 1 auto;

            min-width: 1px;
        }
        .course-title {
            font-size: 20px;
            font-weight: 700;
            line-height: em(30px, 20px);

            margin-bottom: 7px;

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
    .pay-method-panel {
        .panel-title {
            font-size: 22px;
            font-weight: 700;
            line-height: em(32px, 22px);

            color: #2d2b32;
        }
        .panel-body {
            margin-top: 40px;
        }
        .list-item {
            padding: 20px 0;

            cursor: pointer;

            border-bottom: 1px solid #e6e8ec;
            &:last-child {
                border-bottom-width: 0;
            }
            &[data-active] .select {
                box-shadow: inset 0 0 0 2px #2a85ff;
                &::after {
                    background-color: #2a85ff;
                }
            }
        }
        .method-icon {
            font-size: 16px;
            line-height: em(24px, 16px);

            display: flex;

            align-items: center;
            :global(.ic) {
                line-height: 1;

                display: inline-block;

                height: 28px;
                margin-right: 8px;
                margin-bottom: -2px;
            }
        }
        .select {
            @include circle(18px);
            display: flex;

            transform: 0.26s ease;

            box-shadow: inset 0 0 0 2px rgb(111 118 126 / 0.3);

            align-items: center;
            justify-content: center;
            &::after {
                @include circle(8px);
                display: inline-block;

                content: "";
                transform: 0.26s ease;

                background-color: #fff;
            }
        }
    }
    .order-foot {
        .btn--to-pay {
            font-size: 18px;
            font-weight: 700;
            line-height: em(27px, 18px);

            padding: 16px 60px;

            transition: 0.26s ease;

            color: #fff;
            border-radius: 10px;
            background: linear-gradient(
                82.16deg,
                #ff5656 35.79%,
                #ff7356 76.16%,
                #ffab6d 100%
            );
            &[data-disable] {
                cursor: not-allowed;

                background: #d3d3d3;
            }
        }
        .order-price {
            font-size: 18px;
            line-height: em(26px, 18px);

            color: #777;
        }
        .price {
            font-family: "Inter";
            font-size: 22px;
            font-weight: 700;
            line-height: em(28px, 22px);

            margin-top: 7px;

            color: #f53f2d;
        }
        .num {
            font-size: 36px;
            font-weight: 700;
            line-height: em(44px, 36px);
        }
        .unit {
            line-height: em(38px, 22px);
        }
    }
}
</style>
