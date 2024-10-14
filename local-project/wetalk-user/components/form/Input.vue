<template>
    <div :class="$style['input-wrapper']">
        <div :class="$style['input-title']" v-if="title">
            <span class="text"> {{ title }} </span>
        </div>
        <div :class="$style['input-row']">
            <input
                :placeholder="placeholder"
                :type="pwShow ? 'text' : type"
                :name="name"
                :value="value"
                :disabled="disable"
                :autocomplete="type === 'password' ? 'current-password' : 'on'"
                @input="input"
                :data-error="!!errorMsg"
            />
            <i
                v-if="type === 'password' && value.length"
                :class="[
                    $style['after-icon'],
                    pwShow ? 'icon-eye-open' : 'icon-eye-close',
                ]"
                class="ic iconfont"
                @pointerdown="pwShow = true"
                @pointerup="pwShow = false"
            ></i>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from "vue";
const pwShow = ref<boolean>(false);

const prop = withDefaults(
    defineProps<{
        type?: "password" | "text" | "number";
        title?: string;
        disable?: boolean;
        value: string;
        errorMsg?: string;
        placeholder: string;
        name: string;
    }>(),
    {
        type: "text",
        title: "",
        disable: false,
        placeholder: "",
        value: "",
        errorMsg: "",
        name: "",
    }
);
const { value, errorMsg, placeholder, name, type, title } = toRefs(prop);

const emit = defineEmits<{ (e: "input", value: string): void }>();
function input(event: any) {
    emit("input", event.currentTarget.value);
}
</script>
<style lang="scss" module>
.input-wrapper {
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

        color: #2d2b32;
    }
    .after-icon {
        font-size: 13px;

        position: absolute;
        top: 0;
        right: 0;

        display: flex;

        box-sizing: content-box;
        width: 12px;
        height: 100%;
        padding: 0 20px;

        cursor: pointer;
        transition: 0.26s ease;

        color: #b1b5c4;

        align-items: center;
        &:hover {
            color: #333;
        }
    }
}
</style>
