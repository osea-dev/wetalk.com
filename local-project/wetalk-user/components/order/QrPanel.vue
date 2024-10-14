<template>
    <div :class="$style['qr-pay-panel']">
        <div
            class="flex items-center justify-between"
            :class="$style['panel-head']"
        >
            <div>
                <div class="text-green" :class="$style['panel-msg']">
                    {{ $t("KEY_ORDER.TIP.11") }}
                </div>
                <div>
                    <span class="text">{{
                        $t("KEY_ORDER.ORDER_ID", [""])
                    }}</span
                    ><span class="text" :class="$style['order-sn']">{{
                        qrPayInfo.orderSn
                    }}</span>
                </div>
            </div>
            <div class="flex items-center" :class="$style['order-price']">
                <span class="text">{{ $t("KEY_ORDER.PAY_MONEY") }}：</span>
                <div :class="$style['price']">
                    <i class="ic" :class="$style['unit']">{{
                        qrPayInfo.price.ico
                    }}</i
                    ><span
                        class="text whitespace-nowrap"
                        :class="$style['num']"
                        >{{ qrPayInfo.price.number }}</span
                    >
                </div>
            </div>
        </div>
        <div :class="$style['panel-body']">
            <div :class="$style['pay-type']" class="flex items-center">
                <img :src="qrPayInfo.payType.ico" class="mr-3 h-7" />
                <span class="text">{{ qrPayInfo.payType.name }}</span>
            </div>
            <div
                class="flex justify-center items-center flex-col"
                :class="$style['qr-box']"
            >
                <div v-if="timeCount > 0" :class="$style['tip']">
                    {{ $t("KEY_ORDER.TIP.9") }}
                    <span :class="$style['time-counter']">{{
                        timeCount.toString().padStart(2, "0")
                    }}</span>
                    {{ $t("KEY_ORDER.TIP.10") }}
                </div>
                <div v-else :class="$style['tip']">
                    {{ $t("KEY_ORDER.TIP.7")
                    }}<span :class="$style['btn']" @click="refreshOrder">{{
                        $t("KEY_BASE.REFRESH")
                    }}</span
                    >{{ $t("KEY_ORDER.TIP.8") }}
                </div>
                <div :class="$style['qr']">
                    <img :src="qrPayInfo.qrcode" />
                    <div v-if="timeCount <= 0" :class="$style['cover']">
                        {{ $t("KEY_ORDER.TIP.6") }}
                    </div>
                </div>
                <div
                    class="flex items-center justify-center"
                    :class="$style['qr-scan-tip']"
                >
                    <i class="ic iconfont icon-qr-scan"></i>
                    <span class="text">{{ $t("KEY_ORDER.TIP.5") }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, toRef, watch } from "vue";
import { GetOrderStatus } from "@/assets/script/api/api";
import { useRouter } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";

const timeCount = ref<number>(0);

const prop = defineProps<{
    data: {
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
    };
}>();

watch(
    () => {
        return prop.data.qrcode || "";
    },
    () => {
        startCountTime();
        startCheckOrderSate();
    }
);

const qrPayInfo = toRef(prop, "data");

const emit = defineEmits<{ (e: "refreshOrder"): void }>();

function refreshOrder() {
    emit("refreshOrder");
}

let expressTime = 1;
let timeCounter: NodeJS.Timer;
function startCountTime() {
    clearInterval(timeCounter);
    timeCount.value = expressTime * 60;
    timeCounter = setInterval(() => {
        timeCount.value -= 1;
        if (timeCount.value <= 0) {
            clearInterval(timeCounter);
        }
    }, 1000);
}

onBeforeUnmount(() => {
    clearInterval(timeCounter);
});

const checkOrderStateTime = ref<number>(0);
const router = useRouter();

let checkOrderStateTimer: NodeJS.Timer;
function startCheckOrderSate() {
    clearInterval(checkOrderStateTimer);
    checkOrderStateTime.value = expressTime * 60;
    checkOrderStateTimer = setInterval(() => {
        checkOrderStateTime.value -= 1;
        if (checkOrderStateTime.value <= 0) {
            clearInterval(checkOrderStateTimer);
        } else {
            GetOrderStatus({ orderid: prop.data.orderId }).then((res) => {
                if (res.data.status != 0) {
                    clearInterval(checkOrderStateTimer);
                    router.push(linkManage.order + "/" + prop.data.orderId);
                }
            });
        }
    }, 5000);
}

onMounted(() => {
    expressTime = qrPayInfo.value.expire;
    startCountTime();
    startCheckOrderSate();
});
onBeforeUnmount(() => {
    clearInterval(checkOrderStateTimer);
});
</script>
<style lang="scss" module>
.qr-pay-panel {
    .panel-head {
        font-size: 16px;
        line-height: em(23px, 16px);

        padding: $panel-padding;

        color: #777;
        border-radius: $panel-radius;
        background-color: #fff;
        .panel-msg {
            margin-bottom: 13px;
        }
        .order-sn {
            color: #2d2b32;
        }
        .order-price {
            .price {
                font-family: "Inter";
                font-size: 24px;
                font-weight: 700;
                line-height: em(29px, 24px);

                color: #f53f2d;
            }
        }
    }
    .panel-body {
        margin-top: 15px;
        padding: $panel-padding;
        padding-bottom: 60px;

        border-radius: $panel-radius;
        background-color: #fff;
        .tip {
            font-size: 14px;
            line-height: em(21px, 14px);

            margin-bottom: 30px;

            color: #777;
            .btn {
                cursor: pointer;

                color: #3b71fe;

                text-decoration-line: underline;
            }
            .time-counter {
                font-family: "Inter";
                font-weight: 700;

                color: #f53f2d;
            }
        }
        .qr {
            position: relative;

            overflow: hidden;

            width: 300px;
            margin-bottom: 15px;
            padding: 20px;

            border: 1px solid #ddd;
            border-radius: var(--r-normal);
            background: #fff;
            .cover {
                @include ab-cover;
                font-size: 16px;
                line-height: em(24px, 16px);

                display: flex;

                color: #fff;
                background: rgb(0 0 0 / 0.6);

                align-items: center;
                justify-content: center;
            }
        }
        .qr-scan-tip {
            width: 300px;
            padding: 18px;

            color: #fff;
            border-radius: var(--r-normal);
            background: #0aca91;
            :global(.ic) {
                @include circle(47px);

                font-size: 22px;

                display: flex;

                margin-right: 13px;

                background: rgb(6 148 105 / 0.3);

                align-items: center;
                justify-content: center;
            }
        }
        .pay-type {
            font-size: 22px;
            font-weight: 700;
            line-height: em(32px, 22px);

            margin-bottom: 16px;

            color: #2d2b32;
        }
    }
    :global(.text-green) {
        color: #3cbb58;
    }
    @include media-breakpoint-down(sm) {
        .panel-head {
            display: block;
            .order-price {
                margin-top: 20px;
                padding-top: 20px;

                border-top: 1px solid #e6e8ec;

                justify-content: flex-end;
            }
        }
        .panel-body {
            .pay-type {
                justify-content: center;
            }
            .qr-scan-tip {
                padding: 12px;
            }
        }
    }
}
</style>
