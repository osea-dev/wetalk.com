<template>
    <div :class="$style['order-info-page']" class="flex items-center">
        <div
            class="wrapper--limit-width flex items-center justify-center min-w-0"
            v-if="orderDetail"
        >
            <div
                class="flex items-center justify-center w-full"
                :class="$style['panel-wrapper']"
                v-if="orderDetail.status === 0"
            >
                <div :class="[$style['waiting-panel'], $style['panel']]">
                    <div :class="$style['panel-head']">
                        <span class="text">{{ $t("KEY_ORDER.STATUS.0") }}</span>
                    </div>
                    <div :class="$style['panel-body']">
                        <p class="justify-center" :class="$style['row']">
                            {{ $t("KEY_ORDER.TIP.0") }}&nbsp;
                            <span :class="$style['yellow']">{{
                                $t("KEY_BASE.NEW_PAGE")
                            }}</span>
                            {{ $t("KEY_ORDER.TIP.1") }}
                        </p>
                    </div>
                    <div class="grid grid-cols-2" :class="$style['panel-foot']">
                        <Link
                            data-layout="outline"
                            :class="$style['contact']"
                            :to="linkManage.order + '/' + orderDetail.orderid"
                        >
                            <span class="text">{{
                                $t("KEY_ORDER.STATUS.1")
                            }}</span>
                        </Link>
                        <button data-theme="green" @click="updateOrder()">
                            <span class="text">{{
                                $t("KEY_ORDER.STATUS.2")
                            }}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="flex items-center justify-center w-full"
                :class="$style['panel-wrapper']"
                v-else-if="orderDetail.status === 1"
            >
                <div :class="[$style['success-panel'], $style['panel']]">
                    <div
                        class="flex items-center justify-center"
                        :class="$style['panel-head']"
                    >
                        <i class="ic iconfont icon-fill-circle-right"></i>
                        <span class="text">{{ $t("KEY_ORDER.STATUS.2") }}</span>
                    </div>
                    <div :class="$style['panel-body']">
                        <div :class="$style['row']">
                            <div :class="$style['title']">
                                {{ ($t("KEY_ORDER.ORDER_ID"), [""]) }}：
                            </div>
                            <div :class="$style['value']">
                                {{ orderDetail.orderSn }}
                            </div>
                        </div>
                        <div :class="$style['row']">
                            <div :class="$style['title']">
                                {{ $t("KEY_ORDER.METHOD") }}：
                            </div>
                            <div
                                :class="$style['value']"
                                class="flex items-center"
                            >
                                <img
                                    :src="orderDetail.payType.ico"
                                    class="mr-2 h-6"
                                    alt=""
                                />
                                {{ orderDetail.payType.payName }}
                            </div>
                        </div>
                        <div :class="$style['row']">
                            <div :class="$style['title']">
                                {{ $t("KEY_ORDER.PAY_MONEY") }}：
                            </div>
                            <div :class="$style['value']">
                                {{ orderDetail.ico }}{{ orderDetail.price }}
                            </div>
                        </div>
                        <div :class="$style['row']">
                            <Link
                                :to="
                                    linkManage.order + '/' + orderDetail.orderid
                                "
                                ><span class="text">{{
                                    $t("KEY_ORDER.OPEN_DETAIL")
                                }}</span></Link
                            >
                        </div>
                    </div>
                    <div class="grid grid-cols-2" :class="$style['panel-foot']">
                        <button
                            data-theme="yellow"
                            :class="$style['contact']"
                            @click="contact"
                        >
                            <span class="text">{{
                                $t("KEY_BASE.TIP_MSG.8")
                            }}</span>
                        </button>
                        <Link data-layout="outline" :to="linkManage.index">
                            <span class="text">{{
                                $t("KEY_BASE.BACK_HOME")
                            }}</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                class="flex items-center justify-center w-full"
                :class="$style['panel-wrapper']"
                v-else-if="orderDetail.status === 2"
            >
                <div :class="[$style['fail-panel'], $style['panel']]">
                    <div :class="$style['panel-head']">
                        <span class="text">{{ $t("KEY_ORDER.STATUS.1") }}</span>
                    </div>
                    <div :class="$style['panel-body']">
                        <div :class="$style['row']">
                            <div :class="$style['title']">
                                {{ $t("KEY_ORDER.ORDER_ID", [""]) }}：
                            </div>
                            <div :class="$style['value']">
                                {{ orderDetail.orderSn }}
                            </div>
                        </div>
                        <div :class="$style['row']">
                            <div :class="$style['title']">
                                {{ $t("KEY_ORDER.METHOD") }}：
                            </div>
                            <div
                                :class="$style['value']"
                                class="flex items-center"
                            >
                                <img
                                    :src="orderDetail.payType.ico"
                                    class="mr-2 h-6"
                                    alt=""
                                />
                                {{ orderDetail.payType.payName }}
                            </div>
                        </div>
                        <div :class="$style['row']">
                            <div :class="$style['title']">
                                {{ $t("KEY_ORDER.PAY_MONEY") }}：
                            </div>
                            <div :class="$style['value']">
                                {{ orderDetail.ico }}{{ orderDetail.price }}
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1" :class="$style['panel-foot']">
                        <Link
                            data-theme="yellow"
                            :to="
                                linkManage.orderPay + '/' + orderDetail.orderid
                            "
                        >
                            <span class="text">{{
                                $t("KEY_ORDER.REPAY")
                            }}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_ORDER_DETAIL } from "@/assets/script/api/api";

import Vue, { computed, getCurrentInstance, onMounted, ref } from "vue";

import linkManage from "~/assets/script/local-data/link-manage";
import MessagePanel from "~/components/dialog-panel/MessagePanel.vue";
import { useContext, useRoute } from "@nuxtjs/composition-api";
import { OrderDetail } from "@/assets/script/api/api";
import { useUserStore } from "@/store/user";

const { $dialog, i18n } = useContext();
const instance = getCurrentInstance();
const route = useRoute();
const orderDetail = ref<TYPE_ORDER_DETAIL>();
const orderId = computed(() => {
    return route.value.params.id;
});
const userStore = useUserStore();
function contact() {
    if (!instance) return;
    const { firstName, lastName } = userStore.userInfo || {
        firstName: "",
        lastName: "",
    };
    const useName = firstName + lastName;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(MessagePanel, {
            props: {
                title: i18n.t("KEY_BASE.HI", [useName]),
                content: i18n.t("KEY_BASE.TIP_MSG.7"),
            },
            on: {
                close() {
                    dialog.close();
                },
            },
        }),
    });
}

function updateOrder(noCheck = false) {
    OrderDetail({ orderid: orderId.value }).then((res) => {
        orderDetail.value = res.data;
        if (!noCheck) {
            if (res.data.status == 0) {
                Vue.notify?.({
                    group: "form-notice",
                    title: i18n.t("KEY_ORDER.TIP.12"),
                    type: "error",
                    duration: 3000,
                });
            }
        }
    });
}

onMounted(() => {
    updateOrder(true);
});
</script>
<script lang="ts">
export default {
    name: "OrderInfo",
};
</script>
<style lang="scss" module>
.order-info-page {
    .panel-wrapper {
        width: 545px;
        max-width: 100%;
        padding: c-space(7.4) 0;

        border-radius: $panel-radius;
        background-color: #fff;
    }
    .panel {
        width: 100%;
        padding: 0 20px;
        .panel-head {
            font-size: 28px;
            font-weight: 700;
            line-height: em(42px, 28px);

            margin-bottom: c-space(5);

            text-align: center;

            color: #3cbb58;
            :global(.ic) {
                font-size: em(42px, 28px);

                margin-right: em(11px, 28px);
            }
        }
        .row {
            @include space-between(16px, y);
            font-size: 16px;
            line-height: em(24px, 16px);

            display: flex;

            color: #2d2b32;
            .title {
                min-width: em(80px, 16px);

                color: #777;
            }
            a {
                font-size: em(15px, 16px);
                line-height: em(24px, 15px);

                color: #3b71fe;
            }
        }
        .panel-foot {
            font-size: 16px;
            line-height: em(24px, 16px);

            margin-top: c-space(5.4);
            padding: 0 40px;

            gap: 11px;
            & > * {
                padding: 12px 0;

                text-align: center;

                border-radius: 24px;
            }
            & > *[data-theme="yellow"] {
                color: #fff;
                background: #f8af00;
            }
            & > *[data-theme="green"] {
                color: #fff;
                background: #3cbb58;
            }
            & > *[data-layout="outline"] {
                color: #2d2b32;
                background: #fff;
                box-shadow: inset 0 0 0 1px #e6e8ec;
            }
        }
        .yellow {
            color: #f8af00;
        }
    }
    .waiting-panel {
        .panel-head {
            color: #f8af00;
        }
    }
    .success-panel {
        padding: 0 60px;
    }
    .fail-panel {
        padding: 0 60px;
        .panel-head {
            color: #f53f2d;
        }
        .panel-foot {
            padding: 0;
        }
    }
    @include media-breakpoint-down(sm) {
        .panel {
            padding: 0 30px;
            .panel-head {
                font-size: 24px;
            }
            .panel-foot {
                font-size: 14px;

                padding: 0;
            }
            .row {
                font-size: 14px;
            }
        }
    }
}
</style>
