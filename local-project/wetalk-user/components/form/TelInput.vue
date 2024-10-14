<!--
 * @Description: 手机号选择器
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 10:48:12
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
        <div
            v-if="withCode && !disable"
            :class="[$style['input-row'], $style['btn-input-row']]"
            class="grid gap-2"
        >
            <input
                type="text"
                name="code"
                :placeholder="$t('KEY_BASE.TIP_MSG.2')"
                @input="codeInput"
                :data-error="!!error.code"
            />
            <button
                :class="$style['btn--send-code']"
                @click="sendCode"
                :data-disable="timer > 0"
            >
                {{ $t("KEY_BASE.TIP_MSG.3") }}
                <span class="text" v-if="timer > 0">{{
                    $t("KEY_BASE.TIP_MSG.4", [timer])
                }}</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { SendSms } from "@/assets/script/api/api";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { useContext } from "@nuxtjs/composition-api";
const prop = withDefaults(
    defineProps<{
        type?: "password" | "text";
        title?: string;
        withCode?: boolean;
        disable: boolean;
        value: {
            country?: string;
            dialCode: string;
            number: string;
            code?: string;
        };
        placeholder: string;
        name: string;
    }>(),
    {
        type: "text",
        withCode: true,
        title: "",
        disable: false,
        placeholder: "",
        value: () => ({ country: "", dialCode: "", number: "", code: "" }),
        name: "",
    }
);

const emit = defineEmits<{
    (
        e: "input",
        value: {
            dialCode: any;
            number: string;
            code?: string;
            country?: string;
        }
    ): void;
    (e: "error", value: string): void;
}>();
let iti: ReturnType<typeof intlTelInput> | null = null;

function input(event: any) {
    emit("input", {
        dialCode: iti?.getSelectedCountryData().dialCode,
        country: iti?.getSelectedCountryData().iso2.toLocaleUpperCase(),
        number: event.currentTarget.value,
        code: prop.withCode && !prop.disable ? prop.value.code : "",
    });
}
function codeInput(event: any) {
    emit("input", {
        dialCode: prop.value.dialCode,
        number: prop.value.number,
        country: prop.value.country || "",
        code: event.currentTarget.value,
    });
}

const telInput = ref<HTMLElement | null>(null);
const timer = ref<number>(0);
const error = reactive({
    number: "",
    code: "",
});

const { i18n } = useContext();
let intervalTimer: NodeJS.Timer;
function sendCode() {
    if (!iti?.isValidNumber()) {
        const errMsg = i18n.t("KEY_BASE.TIP_MSG.5");
        error.number = errMsg;
        emit("error", errMsg);
        return;
    } else {
        error.number = "";
        emit("error", "");
        if (timer.value > 0) {
            return;
        }
        timer.value = 60;
        intervalTimer = setInterval(() => {
            if (timer.value > 0) {
                timer.value -= 1;
            } else {
                clearInterval(intervalTimer);
            }
        }, 1000);
        SendSms({
            mobileCode: prop.value.dialCode,
            mobile: prop.value.number,
        }).then((res) => {
            if (res.statusCode === 4002) {
                error.code = res.message;
            }
        });
    }
}
onBeforeUnmount(() => {
    clearInterval(intervalTimer);
});

function verify() {
    let errorNumber = "";
    let errorCode = "";
    if (!prop.value.number || !prop.value.dialCode) {
        errorNumber = i18n.t("KEY_BASE.TIP_MSG.6");
    } else if (!iti?.isValidNumber()) {
        errorNumber = i18n.t("KEY_BASE.TIP_MSG.5");
    }
    if (prop.withCode && !prop.disable) {
        if (!prop.value.code) {
            errorCode = i18n.t("KEY_BASE.TIP_MSG.2");
        }
    }
    error.number = errorNumber;
    if (error.number) {
        return error.number;
    }
    if (prop.withCode && !prop.disable) {
        error.code = errorCode;
        if (error.code) {
            return error.code;
        }
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

            border-radius: 8px 0 0 8px;
        }
        .iti--separate-dial-code .iti__selected-flag {
            border-radius: 8px 0 0 8px;
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
