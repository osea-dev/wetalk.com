<template>
    <div :class="$style['radio-wrapper']">
        <div :class="$style['input-title']" :name="name" v-if="title">
            <span class="text"> {{ title }} </span>
        </div>
        <div :class="$style['input-row']" class="flex items-center">
            <label
                v-for="(option, i) in options"
                :key="i"
                :class="$style['radio-option']"
                class="flex items-center cursor-pointer"
            >
                <input
                    @change="change"
                    type="radio"
                    :name="name"
                    :value="option.value"
                    :checked="value == option.value"
                />
                <div :class="$style['radio-box']"></div>
                <span class="text whitespace-nowrap">{{ option.title }}</span>
            </label>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";

const prop = withDefaults(
    defineProps<{
        title?: string;
        value: string | number;
        name: string;
        options: { title: string; value: string | number }[];
    }>(),
    {
        title: "",
        value: "",
        name: "",
        options: () => [],
    }
);
const { name, value, title, options } = toRefs(prop);

const emit = defineEmits<{ (e: "input", value: string): void }>();
function change(event: any) {
    emit("input", event.currentTarget.value);
}
</script>
<style lang="scss" module>
.radio-wrapper {
    .input-title {
        font-size: 13px;
        line-height: em(24px, 13px);

        margin-bottom: 6px;

        color: #777;
    }
    .input-row {
        font-size: 13px;
        font-weight: 400;
        line-height: em(24px, 13px);

        position: relative;

        padding: 10px 0;

        color: #2d2b32;
    }
    input[type="radio"] {
        @include hide;
        &:checked {
            & + .radio-box {
                border-color: #2a85ff;
            }
            & + .radio-box::after {
                opacity: 1;
            }
        }
    }
    .radio-option {
        @include space-between(26px);
        font-size: 14px;
        line-height: 24px;

        color: #777;
    }
    .radio-box {
        @include ring(15px, 2px, rgba(#6f767e, 0.3));
        position: relative;

        display: flex;

        margin-right: 6px;

        align-items: center;
        justify-content: center;
        &::after {
            @include circle(7px, #2a85ff);
            // @include move-center;

            content: "";

            opacity: 0;
        }
    }
}
</style>
