<template>
    <div :class="$style['course-panel']">
        <div :class="$style['panel-inner']" v-if="course">
            <div :class="$style['panel-body']" class="flex justify-between">
                <div class="state-pos--left">
                    <h2 :class="$style['title']">{{ course.title }}</h2>
                    <div :class="$style['desc']">{{ course.message }}</div>
                    <div :class="$style['tag-group']">
                        <div
                            :class="$style['tag-group-inner']"
                            class="flex flex-wrap"
                        >
                            <div
                                :class="$style['tag']"
                                v-for="(item, index) in course.keys"
                                :key="index"
                            >
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="state-pos--right text-right lg:hidden">
                    <div :class="$style['price-group']">
                        <div
                            :class="$style['price']"
                            class="flex items-end justify-end"
                        >
                            <span class="unit">{{ course.currencyIco }}</span>
                            <span class="text">
                                {{ price.price }}
                            </span>
                        </div>
                        <div
                            :class="$style['origin-price']"
                            class="flex justify-end"
                        >
                            <span class="unit">
                                {{ $t("原价", [course.currencyIco]) }}</span
                            >
                            <span class="text"> {{ price.marketPrice }}</span>
                        </div>
                    </div>
                    <button :class="$style['btn--buy']" @click="buy">
                        <span class="text">{{ $t("购买课时包") }}</span>
                    </button>
                </div>
            </div>
            <div :class="$style['panel-foot']">
                <div :class="$style['select-group']">
                    <div
                        :class="$style['select-item']"
                        class="flex items-start sm:flex-col sm:items-start sm:justify-start"
                    >
                        <div :class="$style['select-title']" class="sm:mb-3">
                            <span class="text">{{ $t("上课方式") }}</span>
                        </div>
                        <div
                            :class="$style['select-values']"
                            class="flex flex-wrap"
                        >
                            <button
                                :class="$style['select-option']"
                                v-for="item in typeOption"
                                :data-active="
                                    selectType?.skuTypeid === item.skuTypeid
                                "
                                @click="selectType = item"
                                :key="item.courseSkuid + '-type'"
                            >
                                <span>
                                    {{ item.type }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <div
                        :class="$style['select-item']"
                        class="flex items-start sm:flex-col"
                    >
                        <div :class="$style['select-title']" class="sm:mb-3">
                            <span class="text">{{ $t("可选课时") }}</span>
                        </div>
                        <div
                            :class="$style['select-values']"
                            class="flex flex-wrap"
                        >
                            <button
                                :class="$style['select-option']"
                                v-for="item in hourOption"
                                :data-active="
                                    selectHour?.classHour === item.classHour
                                "
                                @click="selectHour = item"
                                :key="item.courseSkuid + '-options'"
                            >
                                <span class="text">{{
                                    $t("课时", [item.classHour])
                                }}</span>
                                <div
                                    v-if="
                                        item.discount &&
                                        item.discount !== '10.0'
                                    "
                                    :class="$style['discount-icon']"
                                    class="flex items-center justify-center"
                                >
                                    <span class="text">{{
                                        Number(item.discount) * 10 + "%"
                                    }}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="hidden lg:flex lg:flex-col lg:mt-5"
                    :class="$style['min-price-box']"
                >
                    <div :class="$style['price-group']">
                        <div
                            :class="$style['price']"
                            class="flex items-end justify-end"
                        >
                            <span class="unit">{{ course.currencyIco }}</span>
                            <span class="text">
                                {{ price.price }}
                            </span>
                        </div>
                        <div
                            :class="$style['origin-price']"
                            class="flex justify-end"
                        >
                            <span class="unit">{{
                                $t("原价", [course.currencyIco])
                            }}</span>
                            <span class="text"> {{ price.marketPrice }}</span>
                        </div>
                    </div>
                    <button :class="$style['btn--buy']" @click="buy">
                        <span class="text">{{ $t("购买课时包") }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type {
    TYPE_COURSE_DETAIL,
    TYPE_COURSE_SKU,
} from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";
import { computed, onMounted, ref, watch } from "vue";
import linkManage from "~/assets/script/local-data/link-manage";

const prop = defineProps<{ course: TYPE_COURSE_DETAIL }>();

const course = computed(() => {
    return prop.course;
});

const selectType = ref<TYPE_COURSE_SKU>();
const selectHour = ref<TYPE_COURSE_SKU>();

const price = computed(() => {
    const result = {
        price: 0,
        marketPrice: 0,
    };
    course.value?.skus?.some((item) => {
        if (
            item.skuTypeid === selectType.value?.skuTypeid &&
            item.classHour === selectHour.value?.classHour
        ) {
            result.price = item.price;
            result.marketPrice = item.marketPrice;
        }
    });
    return result;
});

const typeOption = computed(() => {
    const showList: number[] = [];
    return course.value?.skus?.filter((item) => {
        if (showList.includes(item.skuTypeid)) {
            return false;
        }
        showList.push(item.skuTypeid);
        return true;
    });
});

const hourOption = computed(() => {
    return course.value?.skus?.filter((item) => {
        return item.skuTypeid === selectType.value?.skuTypeid;
    });
});

const { i18n } = useContext();

function buy() {
    let skuid = -1;
    course.value?.skus.some((item) => {
        if (
            item.skuTypeid === selectType.value?.skuTypeid &&
            item.classHour === selectHour.value?.classHour
        ) {
            skuid = item.courseSkuid;
            return true;
        }
    });
    if (skuid === -1) {
        alert(i18n.t("缺少商品信息"));
    } else {
        window.open(linkManage.orderCreate + "/" + skuid, "_blank");
    }
}

watch(
    () => selectType.value?.courseSkuid,
    () => {
        selectHour.value = hourOption.value?.[0];
    },
    { immediate: true }
);

onMounted(() => {
    selectType.value = course.value.skus[0];
});
</script>
<style lang="scss" module>
.course-panel {
    width: 1440px;
    max-width: 100%;
    margin: 0 auto;
    margin-top: -80px;
    margin-bottom: 110px;
    padding: 80px 50px;

    border-radius: 15px;
    background: #fff;
    box-shadow: 0 30px 60px rgb(56 49 71 / 0.1);
    :global(.state-pos--left) {
        min-width: 0;
    }
    .panel-inner {
        width: 1200px;
        max-width: 100%;
        margin: 0 auto;
    }
    .title {
        font-size: 32px;
        font-weight: 700;
        line-height: em(48px, 32px);

        margin-bottom: 15px;

        color: #333;
    }
    .desc {
        font-size: 15px;
        font-weight: 500;
        line-height: 200%;

        max-width: 740px;
        margin-bottom: 23px;
        padding-right: 60px;

        color: #777;
    }
    .tag-group {
        margin-bottom: 74px;
        .tag-group-inner {
            margin-right: -10px;
            margin-bottom: -10px;
        }
        .tag {
            font-size: 13px;
            line-height: em(20px, 13px);

            min-width: 1px;
            margin-right: 10px;
            margin-bottom: 10px;
            padding: 8px 20px;

            white-space: initial;

            color: #777;
            border: 1px solid #e0e9f5;
            border-radius: 18px;
            background: #f5f8fc;
        }
    }
    .select-group {
        .select-item {
            @include space-between(30px, y);
        }
        .select-title {
            font-size: 14px;
            line-height: em(50px, 14px);

            margin-right: 18px;

            white-space: nowrap;

            color: #777;
        }
        .select-values {
            margin-right: -10px;
            margin-bottom: -10px;
        }
        .select-option {
            font-size: 15px;
            line-height: em(22px, 15px);

            position: relative;

            overflow: hidden;

            min-width: 168px;
            margin-right: 10px;
            margin-bottom: 10px;
            padding: 13px 30px;

            transition: 0.26s ease;

            color: #777;
            border: 1px solid #e0e9f5;
            border-radius: 25px;
            background: #fff;
            &[data-active] {
                color: #f29100;
                border: 1px solid #ff8f03;
                background: #fceecc;
                .discount-icon {
                    background-color: #f68900;
                }
            }
            .discount-icon {
                font-size: 12px;
                line-height: em(18px, 12px);

                position: absolute;
                top: 0;
                right: 0;

                width: 52px;
                height: 24px;

                transition: 0.26s ease;

                color: #fff;
                border-radius: 0 0 0 24px;
                background-color: rgb(246 135 0 / 1);
            }
        }
    }
    .price-group {
        font-size: 60px;

        padding-top: 10px;
        .price {
            font-family: "Inter";
            font-weight: 700;
            line-height: em(73px, 60px);

            vertical-align: baseline;

            color: #f53f2d;
            :global(.unit) {
                font-size: em(36px, 60px);
                line-height: em(58px, 36px);
            }
        }
        .origin-price {
            font-size: em(14px, 60px);
            line-height: em(21px, 14px);

            color: #777;

            text-decoration-line: line-through;
        }
    }
    .btn--buy {
        font-size: 18px;
        font-weight: 700;
        line-height: em(27px, 18px);

        position: relative;

        overflow: hidden;

        margin-top: em(36px, 18px);
        padding: em(16px, 18px) em(60px, 18px);

        white-space: nowrap;

        color: #fff;
        border-radius: em(10px, 18px);
        background: #f8af00;
        &::after {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            content: "";
            transition: 0.36s ease;

            opacity: 0;
            background: linear-gradient(
                82.16deg,
                #ff5656 35.79%,
                #ff7356 76.16%,
                #ffab6d 100%
            );
        }
        &:hover {
            &::after {
                opacity: 1;
            }
        }
        & > * {
            position: relative;
            z-index: 10;
        }
    }
    @include media-breakpoint-down(xxxl) {
        margin-top: -65px;
        padding: 65px 60px;
        .btn--buy {
            font-size: 16px;
        }
        .price-group {
            font-size: 55px;
        }
    }
    @include media-breakpoint-down(xxl) {
        margin-bottom: 90px;
        .tag-group {
            margin-bottom: 50px;
            .tag {
                font-size: 10px;
            }
        }
        .btn--buy {
            margin-top: 1.6em;
        }
        .select-group {
            .select-item {
                margin-bottom: 20px;
            }
            .select-title {
                font-size: 13px;
                line-height: 41px;
            }
            .select-option {
                font-size: 13px;

                min-width: 138px;
                padding: 10px 26px;
                .discount-icon {
                    transform: scale(0.8);
                    transform-origin: right top;
                }
            }
        }
    }
    @include media-breakpoint-down(xl) {
        margin-top: -55px;
        padding: 55px 40px;
        .title {
            font-size: 26px;

            margin-bottom: 6px;
        }
        .desc {
            font-size: 13px;

            margin-bottom: 18px;
        }
        .price-group {
            font-size: 42px;

            padding-top: 0;
        }
        .btn--buy {
            font-size: 14px;
        }
        .tag-group {
            margin-bottom: 40px;

            transform: scale(0.9);
            transform-origin: left;
        }
        .select-group {
            .select-item {
                margin-bottom: 20px;
            }
            .select-title {
                font-size: 12px;
                line-height: 35px;
            }
            .select-option {
                font-size: 12px;

                min-width: 128px;
                padding: 8px 22px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .min-price-box {
            margin-top: 50px;
            padding-top: 25px;

            border-top: 1px solid #e0e9f5;
        }
        .desc {
            padding: 0;
        }
    }
    @include media-breakpoint-down(md) {
        padding: 55px 30px;
        .tag-group {
            width: 100%;
        }
        .select-group {
            .select-title {
                margin-right: 10px;
            }
            .select-option {
                min-width: 118px;
                padding: 8px 18px;
                .discount-icon {
                    transform: scale(0.7);
                }
            }
        }
    }
    @include media-breakpoint-down(sm) {
        margin-top: -40px;
        .tag-group {
            transform: scale(1);
        }
        .select-group {
            .select-title {
                font-size: 14px;
            }
        }
    }
}
:global(.lang-en) {
    .course-panel {
        @include media-breakpoint-down(sm) {
            padding: 55px 20px;
            .title {
                font-size: 21px;
            }
            .desc {
                font-size: 12px;
            }
        }
    }
}
</style>
