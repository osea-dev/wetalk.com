<template>
    <div
        class="flex justify-between items-center"
        :class="$style['order-foot']"
    >
        <div :class="$style['order-price']">
            <span class="text">{{ $t("KEY_BASE.TOTAL") }}</span>
            <div class="flex items-end" :class="$style['price']">
                <i :class="$style['unit']">{{ ico }}</i>
                <span class="text" :class="$style['num']"> {{ price }}</span>
            </div>
        </div>
        <button
            :class="$style['btn--to-pay']"
            :data-disable="waiting"
            @click="toPay"
        >
            <span class="text">{{ $t("KEY_ORDER.CONFRIM_PAY") }}</span>
        </button>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    ico: string;
    price: number;
    waiting: boolean;
}>();

const emit = defineEmits<{ (e: "submit"): void }>();
function toPay() {
    emit("submit");
}
</script>
<style lang="scss" module>
.order-foot {
    font-size: 18px;

    margin-bottom: 15px;
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    &:last-child {
        margin-bottom: 0;
    }
    .btn--to-pay {
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
        padding: $panel-padding-2;
    }
    @include media-breakpoint-down(sm) {
        font-size: 16px;

        display: block;

        justify-content: flex-end;
        .order-price {
            text-align: right;
        }
        .price {
            display: block;
        }
        .btn--to-pay {
            width: 100%;
            margin-top: 21px;
        }
    }
}
</style>
