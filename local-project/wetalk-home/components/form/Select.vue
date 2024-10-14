<template>
    <div :class="$style['select-wrapper']">
        <div :class="$style['input-title']" v-if="title">
            <span class="text"> {{ title }} </span>
        </div>
        <div :class="$style['input-row']">
            <select
                :name="prop.name"
                :value="prop.value"
                :disable="disable"
                @change="change"
            >
                <option
                    v-for="(op, index) in prop.options"
                    :key="index"
                    :value="op.value"
                >
                    {{ op.title }}
                </option>
            </select>
        </div>
    </div>
</template>
<script lang="ts" setup>
const prop = withDefaults(
    defineProps<{
        value: string;
        name: string;
        title?: string;
        disable?: boolean;
        options: { title: string; value: string | number }[];
    }>(),
    {
        title: "",
        name: "",
        value: "",
        disable: false,
        options: () => [],
    }
);

const emit = defineEmits<{ (e: "input", value: string): void }>();
function change(event: any) {
    emit("input", event.currentTarget.value);
}
</script>
<style lang="scss" module>
.select-wrapper {
    .input-title {
        line-height: em(24px, 13px);

        margin-bottom: 6px;

        color: #777;
    }
    .input-row {
        font-weight: 400;
        line-height: em(24px, 13px);

        position: relative;

        color: #2d2b32;
    }
}
</style>
