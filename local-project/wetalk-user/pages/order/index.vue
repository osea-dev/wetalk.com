<template>
    <div :class="$style['order-page']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['order-list-panel']" class="relative">
                    <div :class="$style['panel-head']">
                        <div
                            :class="$style['panel-head-row']"
                            class="flex items-center justify-between lg:block"
                        >
                            <h2 :class="$style['panel-title']">
                                {{ $t("KEY_ORDER.LIST") }}
                            </h2>
                            <div
                                :class="$style['type-list']"
                                class="inline-grid grid-cols-4 md:grid md:grid-cols-3"
                            >
                                <PublicButton
                                    :class="$style['list-item']"
                                    :active="currentType === '3'"
                                    @click.native="currentType = '3'"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.COURSE_TYPE.3")
                                    }}</span>
                                </PublicButton>
                                <PublicButton
                                    :class="$style['list-item']"
                                    :active="currentType === '4'"
                                    @click.native="currentType = '4'"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.COURSE_TYPE.4")
                                    }}</span>
                                </PublicButton>
                                <PublicButton
                                    :class="$style['list-item']"
                                    :active="currentType === '5'"
                                    @click.native="currentType = '5'"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.COURSE_TYPE.5")
                                    }}</span>
                                </PublicButton>
                                <PublicButton
                                    :class="$style['list-item']"
                                    :active="currentType === '1'"
                                    @click.native="currentType = '1'"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.COURSE_TYPE.0")
                                    }}</span>
                                </PublicButton>
                            </div>
                        </div>
                        <div :class="$style['order-category']">
                            <div
                                :class="$style['category-list']"
                                class="flex items-center"
                            >
                                <div
                                    v-for="(item, index) in categoryList"
                                    :key="index"
                                    :class="$style['list-item']"
                                    :data-active="
                                        item.value === currentPayStatus
                                    "
                                    @click="currentPayStatus = item.value"
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['panel-body']">
                        <div :class="$style['table-head']">
                            <div :class="$style['row']">
                                <div :class="$style['col-1']">
                                    {{ $t("KEY_ORDER.COURSE_NAME") }}
                                </div>
                                <div
                                    :class="$style['col-2']"
                                    :style="{
                                        opacity: currentType === '1' ? 1 : 0,
                                    }"
                                >
                                    {{ $t("KEY_BASE.LESSON_METHOD") }}
                                </div>
                                <div :class="$style['col-3']">
                                    {{ $t("KEY_BASE.COURSE_NUM") }}
                                </div>
                                <div :class="$style['col-4']">
                                    {{ $t("KEY_BASE.PRICE") }}
                                </div>
                                <div :class="$style['col-5']">
                                    {{ $t("KEY_ORDER.STATUS.3") }}
                                </div>
                                <div :class="$style['col-6']">
                                    {{ $t("KEY_BASE.OPER") }}
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="orderList.length"
                            :class="$style['table-body']"
                        >
                            <div>
                                <div
                                    v-for="item in orderList"
                                    :key="item.orderid"
                                    :class="$style['row']"
                                >
                                    <div
                                        :class="$style['col-1']"
                                        class="flex items-center"
                                    >
                                        <div :class="$style['course-thumb']">
                                            <img :src="item.img" alt="" />
                                        </div>
                                        <div :class="$style['course-info']">
                                            <div
                                                :class="$style['course-title']"
                                            >
                                                {{ item.title }}
                                            </div>
                                            <div
                                                :class="
                                                    $style['course-subtitle']
                                                "
                                            >
                                                {{ item.message }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        :class="$style['col-2']"
                                        :style="{
                                            opacity:
                                                currentType === '1' ? 1 : 0,
                                        }"
                                    >
                                        <TagSku
                                            class="inline-block"
                                            :data="{
                                                skuTypeid: item.skuTypeid,
                                                type: item.type,
                                            }"
                                        />
                                    </div>
                                    <div :class="$style['col-3']">
                                        <div :class="$style['lesson-count']">
                                            {{
                                                item.classHour ||
                                                item.lessonCount
                                            }}
                                            <span
                                                class="hidden lg:inline-block"
                                                >{{
                                                    $t("KEY_BASE.COURSE_NUM")
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                    <div :class="$style['col-4']">
                                        <div :class="$style['price']">
                                            <i :class="$style['unit']">{{
                                                item.ico
                                            }}</i
                                            ><span
                                                class="text"
                                                :class="$style['num']"
                                                >{{ item.price }}</span
                                            >
                                        </div>
                                    </div>
                                    <div :class="$style['col-5']">
                                        <div
                                            :class="$style['order-state']"
                                            :data-status="item.status"
                                        >
                                            <span
                                                v-if="item.status === 0"
                                                class="text"
                                                >{{
                                                    $t("KEY_ORDER.STATUS.5")
                                                }}</span
                                            >
                                            <span
                                                v-if="item.status === 1"
                                                class="text"
                                                >{{
                                                    $t("KEY_ORDER.STATUS.4")
                                                }}</span
                                            >
                                            <span
                                                v-if="item.status === 2"
                                                class="text"
                                                >{{
                                                    $t("KEY_ORDER.STATUS.1")
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                    <div
                                        :class="$style['col-6']"
                                        :data-state="item.status"
                                    >
                                        <template v-if="item.status === 0">
                                            <Link
                                                :class="[
                                                    $style['pay'],
                                                    $style['button'],
                                                ]"
                                                :to="
                                                    linkManage.orderPay +
                                                    '/' +
                                                    item.orderid
                                                "
                                            >
                                                <span class="text">{{
                                                    $t("KEY_ORDER.REPAY")
                                                }}</span>
                                            </Link>
                                            <button
                                                :class="[
                                                    $style['cancel'],
                                                    $style['button'],
                                                ]"
                                                @click="
                                                    cancelOrder(item.orderid)
                                                "
                                            >
                                                <span class="text">{{
                                                    $t("KEY_ORDER.CANCEL")
                                                }}</span>
                                            </button>
                                        </template>
                                        <template v-if="item.status === 2">
                                            <Link
                                                :class="[
                                                    $style['pay'],
                                                    $style['button'],
                                                ]"
                                                :to="
                                                    linkManage.orderPay +
                                                    '/' +
                                                    item.orderid
                                                "
                                            >
                                                <span class="text">{{
                                                    $t("KEY_ORDER.REPAY")
                                                }}</span>
                                            </Link>
                                            <button
                                                :class="[
                                                    $style['cancel'],
                                                    $style['button'],
                                                ]"
                                                @click="
                                                    cancelOrder(item.orderid)
                                                "
                                            >
                                                <span class="text">{{
                                                    $t("KEY_ORDER.CANCEL")
                                                }}</span>
                                            </button>
                                        </template>
                                        <Link
                                            :class="[
                                                $style['order-detail'],
                                                $style['button'],
                                            ]"
                                            :to="
                                                linkManage.order +
                                                '/' +
                                                item.orderid
                                            "
                                        >
                                            <span class="text">{{
                                                $t("KEY_ORDER.DETAIL")
                                            }}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-else
                            :class="$style['empty-panel']"
                            class="flex items-center justify-center"
                        >
                            {{ $t("KEY_ORDER.EMPTY") }}
                        </div>
                    </div>
                    <PageTab
                        v-if="total > 1"
                        :total="total"
                        :class="$style['page-tab-bar']"
                        :layout-size="2"
                        :page-size="pageSize"
                        :current-index="currentPage"
                        @changePage="changePage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TYPE_ORDER_LIST } from "@/assets/script/api/api";

import Vue, { getCurrentInstance, onMounted, ref, watch } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";
import { useContext } from "@nuxtjs/composition-api";
import CancelOrderPanel from "~/components/dialog-panel/CancelOrderPanel.vue";
import {
    OrderList,
    CancelOrder,
    RecordOrderList,
    OnlineOrderList,
    OfflineOrderList,
} from "@/assets/script/api/api";

const { $dialog, i18n } = useContext();
const currentType = ref<"1" | "3" | "4" | "5">("3");

type TYPE_CATEGORY = 0 | 1 | 2;
const categoryList = ref<{ name: string; value: TYPE_CATEGORY }[]>([
    { name: i18n.t("KEY_BASE.ALL_TEXT"), value: 0 },
    { name: i18n.t("KEY_ORDER.TIP.2"), value: 1 },
    { name: i18n.t("KEY_ORDER.TIP.3"), value: 2 },
]);

const orderList = ref<TYPE_ORDER_LIST["list"]>([]);
const pageSize = 12;
const total = ref<number>(0);
const currentPage = ref<number>(1);

const instance = getCurrentInstance();
function cancelOrder(orderId: number) {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(CancelOrderPanel, {
            on: {
                submit(reason: string) {
                    CancelOrder({
                        orderid: orderId,
                        keys: [],
                        message: reason,
                    }).then(() => {
                        Vue.notify?.({
                            group: "form-notice",
                            title: i18n.t("KEY_ORDER.CANCEL_SUC"),
                            type: "success",
                            duration: 3000,
                        });
                        if (orderList.value.length === 1) {
                            currentPage.value = 1;
                        }
                        updateOrderList();
                    });
                },
                close() {
                    dialog.close();
                },
            },
        }),
    });
}

const currentPayStatus = ref<TYPE_CATEGORY>(0);

function updateOrderList() {
    switch (currentType.value) {
        case "1":
            OrderList({
                payStatus: currentPayStatus.value,
                page: currentPage.value,
                pageSize,
            }).then((res) => {
                total.value = res.data.total;
                orderList.value = res.data.list;
            });
            break;
        case "3":
            RecordOrderList({
                payStatus: currentPayStatus.value,
                page: currentPage.value,
                pageSize,
            }).then((res) => {
                total.value = res.data.total;
                orderList.value = res.data.list;
            });
            break;
        case "4":
            OnlineOrderList({
                payStatus: currentPayStatus.value,
                page: currentPage.value,
                pageSize,
            }).then((res) => {
                total.value = res.data.total;
                orderList.value = res.data.list;
            });
            break;
        case "5":
            OfflineOrderList({
                payStatus: currentPayStatus.value,
                page: currentPage.value,
                pageSize,
            }).then((res) => {
                total.value = res.data.total;
                orderList.value = res.data.list;
            });
            break;

        default:
            break;
    }
}

function changePage(pageIndex: number) {
    if (typeof pageIndex === "undefined") return;
    currentPage.value = pageIndex;
}

watch([currentPage], updateOrderList);
watch([currentType], () => {
    currentPage.value = 1;
    currentPayStatus.value = 0;
    updateOrderList();
});
watch(currentPayStatus, () => {
    currentPage.value = 1;
    updateOrderList();
});
onMounted(() => {
    updateOrderList();
});
</script>
<style lang="scss" module>
.order-list-panel {
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    .panel-head {
        margin-bottom: 32px;
        .type-list {
            gap: 13px;
            @include media-breakpoint-down(lg) {
                margin-top: 20px;
                .list-item {
                    font-size: 13px;

                    padding: 10px 30px;
                }
            }
            @include media-breakpoint-down(md) {
                margin-top: 20px;

                gap: 6px;
                .list-item {
                    font-size: 12px;

                    padding: 10px 20px;
                }
            }
            @include media-breakpoint-down(sm) {
                margin-top: 0;
            }
        }
        .panel-head-row {
            @include space-between(28px, y);
        }
    }
    .panel-title {
        @include panel-head;

        margin-right: 50px;
    }
    .category-list {
        font-size: 16px;
        line-height: em(23px, 16px);

        color: #777;
        .list-item {
            @include space-between(60px);
            position: relative;

            cursor: pointer;
            &[data-active] {
                color: #2d2b32;
                &::after {
                    width: 24px;

                    opacity: 1;
                }
            }
            &::after {
                position: absolute;
                bottom: -9px;
                left: 50%;

                width: 10px;
                height: 4px;

                content: "";
                transition: 0.26s ease;
                transform: translateX(-50%);

                opacity: 0;
                border-radius: 2px;
                /* wetalk VI */

                background: #f8af00;
            }
        }
    }
    // course
    .course-thumb {
        @include image-placeholder(120px, 74px);
        flex: 0 0 auto;

        margin-right: 20px;

        border-radius: 6px;
    }
    .course-info {
        flex: 1 1 auto;

        min-width: 1px;
        padding-right: 20px;
        * {
            @include ellipse(1);
        }
    }
    .course-title {
        font-size: 16px;
        font-weight: 700;
        line-height: em(24px, 16px);

        margin-bottom: 6px;

        color: #333;
    }
    .course-subtitle {
        font-size: 12px;
        line-height: 18px;

        color: #b1b5c4;
    }
    .lesson-count {
        font-family: "Inter";
        font-size: 22px;
        font-weight: 700;
        line-height: em(27px, 22px);

        color: #2d2b32;
    }
    .price {
        font-family: "Inter";
        font-size: 16px;
        font-weight: 700;
        line-height: em(19px, 16px);

        color: #2d2b32;
        .num {
            font-size: 22px;
            line-height: em(27px, 22px);
        }
    }
    .order-state {
        &[data-status="0"] {
            color: #f8af00;
        }
        &[data-status="1"] {
            color: #3cbb58;
        }
        &[data-status="2"] {
            color: #f53f2d;
        }
    }
    .cancel {
        margin-bottom: 1px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .order-state,
    .pay {
        font-size: 14px;
        line-height: em(21px, 14px);

        padding: 4px 0;

        color: #f8af00;
    }
    .order-detail,
    .cancel {
        font-size: 14px;
        line-height: em(21px, 14px);

        padding: 4px 0;

        color: #777;
    }
    .empty-panel {
        font-size: 20px;

        height: 500px;
    }
    .page-tab-bar {
        margin-top: 10px;
    }
    @include media-breakpoint-down(lg) {
        padding: $panel-padding-3;
    }
    @include media-breakpoint-down(sm) {
        .panel-title {
            margin-right: 0;
            margin-bottom: 20px;
        }
        .category-list {
            justify-content: space-between;
            .list-item {
                margin: 0 10px;
            }
        }
    }
}
.panel-body {
    .row {
        display: grid;

        border-bottom: 1px solid #e6e8ec;

        gap: 10px;

        grid-template-columns: 280px 160px 1fr 110px 90px 56px;
        &:last-child {
            border-bottom-width: 0;
        }
        & > * {
            align-self: center;
        }
    }
    .table-head {
        font-size: 13px;
        line-height: em(20px, 13px);

        padding: 15px 23px;

        color: #777;
        border-radius: 6px;
        background: #f5f6f9;
    }
    .table-body {
        position: relative;

        padding: 0 23px;
        .row {
            padding: 35px 0;

            grid-template-rows: 89px;
        }
    }
    @include media-breakpoint-down(xl) {
        .table-head {
            .col-4,
            .col-6 {
                display: none;
            }
        }
        .row {
            grid-template-columns: max(36%, 280px) 1fr 10.8% 90px;
        }
        .col-4 {
            padding-bottom: 20px;

            grid-area: 2 / 1 / 3 / 5;
            justify-self: flex-end;
        }
        .col-5 {
            justify-self: flex-end;
        }
        .col-6 {
            grid-area: 3 / 1 / 4 / 5;
            justify-self: flex-end;
            .button {
                font-size: 12px;

                margin-right: 10px;
                padding: 8px 24px;

                transition: 0.26s ease;

                color: #777;
                border-radius: 4px;
                box-shadow: inset 0 0 0 1px #e6e8ec;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .table-head {
            display: none;
        }
        .table-body {
            padding: 0;
            .row {
                padding: 0;
            }
        }
        .row {
            margin-bottom: 10px;

            border-width: 0;

            gap: 0;

            grid-template-columns: max(50%, 280px) 1fr 130px;
            & > * {
                padding: 0 23px;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        .col-2 {
            padding: 0;
        }
        .col-3 {
            justify-self: flex-end;
        }
        .col-4 {
            padding-top: 20px;
            padding-bottom: 20px;

            grid-area: 3 / 1 / 4 / 4;
            justify-self: flex-end;
        }
        .col-5 {
            width: 100%;
            padding: 8px 23px;

            text-align: right;

            border-radius: 6px;
            background-color: #f5f6f9;

            grid-area: 1 / 1 / 2 / 4;
            justify-self: flex-end;
        }
        .col-6 {
            grid-area: 4 / 1 / 5 / 4;
            justify-self: flex-end;
            .button {
                font-size: 12px;

                margin-right: 10px;
                padding: 8px 24px;

                transition: 0.26s ease;

                color: #777;
                border-radius: 4px;
                box-shadow: inset 0 0 0 1px #e6e8ec;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
    @include media-breakpoint-down(md) {
        .table-body {
            .row {
                width: 100%;

                grid-template-columns: auto 1fr;
                grid-template-rows: initial;
                & > * {
                    flex: 0 0 auto;

                    width: 100%;

                    order: 1;
                }
            }
            .col-1 {
                min-width: 0;
                margin-bottom: 20px;

                grid-area: 2 / 1 / 3 / 3;
            }
            .col-2 {
                padding: 0 20px;

                text-align: right;

                grid-area: 3 / 2 / 4 / 3;
            }
            .col-3 {
                grid-area: 3 / 1 / 4 / 2;
            }
            .lesson-count {
                font-size: 16px;
            }
            .col-4 {
                width: 100%;

                grid-area: 5 / 1 / 6 / 3;
                .price {
                    padding-top: 20px;

                    border-top: 1px solid rgb(0 0 0 / 0.05);
                }
            }
            .col-5 {
                margin-bottom: 20px;

                text-align: left;

                grid-area: 1 / 1 / 2 / 3;
            }
            .col-6 {
                margin-bottom: 20px;

                grid-area: 6 / 1 / 7 / 3;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .table-body {
            .row {
                width: 100%;

                grid-template-columns: auto 1fr;
                grid-template-rows: initial;
                & > * {
                    flex: 0 0 auto;

                    width: 100%;
                    padding: 0;

                    order: 1;
                }
            }
            .col-1 {
                min-width: 0;
                margin-bottom: 20px;

                grid-area: 2 / 1 / 3 / 3;
            }
            .col-2 {
                grid-area: 3 / 1 / 4 / 2;
            }
            .col-3 {
                text-align: right;

                grid-area: 3 / 2 / 4 / 3;
            }
            .lesson-count {
                font-size: 16px;
            }
            .col-4 {
                width: 100%;
                margin-top: 30px;

                text-align: right;

                grid-area: 5 / 1 / 6 / 3;
                .price {
                    padding-top: 20px;

                    border-top: 1px solid rgb(0 0 0 / 0.05);
                }
            }
            .col-5 {
                margin-bottom: 30px;
                padding: 6px 20px;

                text-align: left;

                grid-area: 1 / 1 / 2 / 3;
            }
            .col-6 {
                display: grid;

                margin-top: 20px;
                margin-bottom: 20px;

                text-align: right;

                gap: 10px;

                grid-area: 6 / 1 / 7 / 3;
                grid-template-columns: repeat(3, 1fr);
                justify-content: space-between;
                &[data-state="1"] {
                    display: block;

                    text-align: right;
                }
                .button {
                    flex: 1 1 auto;

                    margin: 0;

                    text-align: center;
                }
            }
        }
    }
}
:global(.lang-en) {
    .order-list-panel .panel-head {
        .panel-title {
            margin-bottom: 20px;
        }
        .panel-head-row {
            display: block;
        }
    }
    @include media-breakpoint-down(sm) {
        .order-list-panel .panel-head .type-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
}
</style>
