<!--
 * @Description: 手机号选择器
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 16:38:03
-->
<template>
    <div :class="$style['input-wrapper']">
        <div v-if="title" :class="$style['input-title']">
            <span class="text"> {{ title }} </span>
        </div>
        <div :class="$style['input-row']">
            <input
                ref="telInput"
                type="tel"
                :data-error="!!error.number"
                :name="name"
                :disabled="disable"
                :placeholder="placeholder"
                :value="value.number"
                @countrychange="input"
                @input="input"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { useContext } from "@nuxtjs/composition-api";
const prop = withDefaults(
    defineProps<{
        type?: "text";
        title?: string;
        value: { dialCode: string; number: string };
        placeholder?: string;
        disable?: boolean;
        name: string;
    }>(),
    {
        type: "text",
        title: "",
        disable: false,
        placeholder: "",
        value: () => ({ dialCode: "", number: "" }),
        name: "",
    }
);

const emit = defineEmits<{
    (e: "input", value: { dialCode: any; number: string }): void;
    (e: "error", value: string): void;
}>();
let iti: ReturnType<typeof intlTelInput> | null = null;

function input(event: any) {
    emit("input", {
        dialCode: iti?.getSelectedCountryData().dialCode,
        number: event.currentTarget.value,
    });
}

const telInput = ref<HTMLElement | null>(null);
const error = reactive({
    number: "",
    code: "",
});

const { i18n } = useContext();

function verify() {
    let errorNumber = "";
    const errorCode = "";
    if (!prop.value.number || !prop.value.dialCode) {
        errorNumber = i18n.t("请输入手机号");
    } else if (!iti?.isValidNumber()) {
        errorNumber = i18n.t("请检查手机号是否正确");
    }
    error.number = errorNumber;
    if (error.number) {
        return error.number;
    }
    error.code = errorCode;
    if (error.code) {
        return error.code;
    }
    return "";
}

defineExpose({
    verify,
});

watch(
    () => {
        return prop.value.dialCode;
    },
    () => {
        iti?.setNumber(`+${prop.value.dialCode}${prop.value.number}`);
    }
);

onMounted(() => {
    requestAnimationFrame(() => {
        iti = intlTelInput(telInput.value!, {
            initialCountry: "sg",
            preferredCountries: ["sg", "cn", "ph", "ca", "tw", "au"],
            separateDialCode: true,
            utilsScript: require("intl-tel-input/build/js/utils"),
        });
        if (
            prop.value.number.length !== 0 &&
            prop.value.dialCode.length !== 0
        ) {
            iti.setNumber(`+${prop.value.dialCode}${prop.value.number}`);
        }
    });
    onBeforeUnmount(() => {
        iti?.destroy();
    });
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
    :global {
        .iti {
            width: 100%;
        }
        .iti__flag-container {
            top: 1px;
            bottom: 1px;
            left: 1px;

            border-radius: 0.25em;
        }
        .iti--separate-dial-code .iti__selected-flag {
            border-radius: 0.25em;
            background: #f5f6f9;
        }
    }
}
.input-row {
    @include space-between(8px, "y");
}
.btn-input-row {
    grid-template-columns: 1fr auto;
}
.btn--send-code {
    padding: 0 20px;

    color: #fff;
    border-radius: 6px;
    background: #3b71fe;
    &[data-disable] {
        color: #777;
        background: #f5f6f9;
    }
}
</style>
