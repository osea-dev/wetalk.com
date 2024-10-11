<template>
    <div :class="$style['order-page']">
        <div class="wrapper--limit-width" v-if="orderDetail">
            <div class="wrapper--limit-width-mini" v-if="!qrPayInfo">
                <OrderCourseDetail :orderDetail="orderDetail" type="payOrder" />
                <OrderPayMethod
                    :selectPayId="selectPayId"
                    :payTypes="payTypes"
                    @change="changePayMethod"
                />
                <OrderPayFooter
                    :ico="orderDetail.ico"
                    :price="orderDetail.price"
                    :waiting="waiting"
                    @submit="toPay"
                />
            </div>
            <div class="wrapper--limit-width-mini" v-else>
                <QrPanel :data="qrPayInfo" @refreshOrder="refreshOrder" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_ORDER_DETAIL, TYPE_PAY_TYPE } from "@/assets/script/api/api";
import { computed, onMounted, ref } from "vue";
import { useContext, useRoute, useRouter } from "@nuxtjs/composition-api";
import { OrderPay, OrderDetail, PayTypes } from "@/assets/script/api/api";
import linkManage from "~/assets/script/local-data/link-manage";
import QrPanel from "~/components/order/QrPanel.vue";
import QRCode from "qrcode";

const { i18n } = useContext();

const selectPayId = ref<number>();
const orderDetail = ref<TYPE_ORDER_DETAIL>();
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
const orderId = computed(() => {
    return route.value.params.id;
});

const payTypes = ref<TYPE_PAY_TYPE[]>([]);

const payType = computed(() => {
    let type = -1;
    payTypes.value.forEach((item) => {
        if (item.paytypeid === selectPayId.value) {
            if (item.isWeb === 1) {
                type = 1;
            } else if (item.isScan === 1) {
                type = 2;
            }
        }
    });
    return type;
});

function changePayMethod(typeId: number) {
    selectPayId.value = typeId;
}

function orderPay() {
    if (!orderId.value) return;
    if (typeof selectPayId.value === "undefined") {
        alert(i18n.t("KEY_BASE.TIP_MSG.10"));
        return Promise.reject();
    }
    let newWin: Window | null;

    if (payType.value === 1) {
        newWin = window.open("about:blank", "_blank");
    }
    return OrderPay({
        orderid: Number(orderId.value),
        payTypeid: selectPayId.value,
        type: payType.value,
    }).then((res) => {
        if (res.statusCode !== 0) {
            waiting.value = false;
            return;
        }
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
    orderPay();
}
onMounted(() => {
    OrderDetail({ orderid: orderId.value }).then((res) => {
        orderDetail.value = res.data;
        selectPayId.value = res.data.payType.paytypeid;
    });
    PayTypes().then((res) => {
        payTypes.value = res.data;
    });
});
</script>
<script lang="ts">
export default {
    name: "OrderDetail",
};
</script>
<style lang="scss" module>
//
</style>
