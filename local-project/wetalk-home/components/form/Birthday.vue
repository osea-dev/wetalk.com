<!--
 * @Description: 生日选择器
 * @Author: F-Stone
 * @LastEditTime: 2023-01-31 18:34:21
-->
<template>
    <div :class="$style['input-wrapper']">
        <div v-if="title" :class="$style['input-title']">
            <span class="text"> {{ title }} </span>
        </div>
        <div :class="$style['input-row']" class="grid grid-cols-3 gap-2">
            <FormSelect
                v-model="birthday.year"
                :options="yearOption"
                name="year"
            />
            <FormSelect
                v-model="birthday.month"
                :options="monthOption"
                name="month"
            />
            <FormSelect
                v-model="birthday.day"
                :options="dayOption"
                name="day"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Solar, SolarMonth } from "lunar-typescript";
import { onMounted, reactive, ref, watch } from "vue";
const birthday = reactive({
    year: "",
    month: "",
    day: "",
});
const prop = withDefaults(
    defineProps<{
        type?: "text";
        title?: string;
        value: string;
    }>(),
    {
        type: "text",
        title: "",
        value: "",
    }
);

const yearOption = ref<{ title: string; value: string }[]>([]);
const dayOption = ref<{ title: string; value: string }[]>([]);
const monthOption = ref<{ title: string; value: string }[]>([
    { title: "01", value: "01" },
    { title: "02", value: "02" },
    { title: "03", value: "03" },
    { title: "04", value: "04" },
    { title: "05", value: "05" },
    { title: "06", value: "06" },
    { title: "07", value: "07" },
    { title: "08", value: "08" },
    { title: "09", value: "09" },
    { title: "10", value: "10" },
    { title: "11", value: "11" },
    { title: "12", value: "12" },
]);

const currentDate = new Date();
const month = SolarMonth.fromDate(currentDate);

function twoNum(num: number): string {
    return num > 10 ? String(num) : "0" + num;
}

function setYearOption() {
    const years: { title: string; value: string }[] = [];
    const currentYear = month.getYear();
    for (let index = 0; index < 100; index++) {
        years.push({
            title: String(currentYear - index),
            value: String(currentYear - index),
        });
    }
    yearOption.value = years;
}

function setDaysOption(data: SolarMonth = month) {
    const days: { title: string; value: string }[] = [];
    const dd = data.getDays();

    dd.forEach((d) => {
        const value = twoNum(d.getDay());
        days.push({
            title: value,
            value: value,
        });
    });

    dayOption.value = days;
}
setDaysOption();
setYearOption();

watch(
    () => birthday.month,
    (newVal) => {
        setDaysOption(
            SolarMonth.fromDate(new Date(birthday.year + "-" + newVal))
        );
    }
);

onMounted(() => {
    const time = Solar.fromDate(new Date(prop.value));
    birthday.year = String(time.getYear());
    birthday.month = twoNum(time.getMonth());
    birthday.day = twoNum(time.getDay());
});
</script>
<style lang="scss" module>
.input-wrapper {
    .input-title {
        font-size: 13px;
        line-height: em(24px, 13px);

        margin-bottom: 6px;

        color: #777;
    }
}
</style>
