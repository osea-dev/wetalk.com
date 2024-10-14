<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 16:09:44
-->
<template>
    <div :class="$style['reset-pw-panel']" class="scroll-container">
        <div :class="$style['panel-title']">
            <h2>{{ $t("KEY_RESET_PW_PANEL.TITLE") }}</h2>
        </div>
        <div :class="$style['panel-body']">
            <FormRow
                :errorMsg="formErrorTip.newPw"
                :title="$t('KEY_BASE.NEW_PW')"
            >
                <FormInput
                    type="password"
                    :placeholder="$t('KEY_RESET_PW_PANEL.TIP.0')"
                    v-model="resetPWForm.newPw"
                    :errorMsg="formErrorTip.newPw"
                    name="email"
                />
            </FormRow>
            <FormRow :errorMsg="formErrorTip.confirmPw">
                <FormInput
                    type="password"
                    :placeholder="$t('KEY_RESET_PW_PANEL.TIP.1')"
                    v-model="resetPWForm.confirmPw"
                    :errorMsg="formErrorTip.confirmPw"
                    name="email"
                />
            </FormRow>
            <FormRow :class="[$style['submit-row']]">
                <div class="grid grid-cols-2 gap-2">
                    <FormSubmitBtn
                        @submit="submit"
                        :text="$t('KEY_BASE.SUBMIT')"
                    />
                    <FormCancelBtn
                        @submit="cancel"
                        :text="$t('KEY_BASE.BTN.CANCEL')"
                    />
                </div>
            </FormRow>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { pwVerify } from "@wetalk/wetalk-assets";
import { updateStudentInfo } from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

const resetPWForm = reactive({
    newPw: "",
    confirmPw: "",
});
const formErrorTip = reactive({
    newPw: "",
    confirmPw: "",
});

const { i18n } = useContext();

function checkForm() {
    const { newPw, confirmPw } = resetPWForm;
    Object.keys(formErrorTip).forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        formErrorTip[k] = "";
    });

    formErrorTip.newPw = pwVerify(newPw);
    if (formErrorTip.newPw) {
        formErrorTip.newPw = i18n.t(formErrorTip.newPw);
        return false;
    }

    if (confirmPw !== newPw) {
        formErrorTip.confirmPw = i18n.t("KEY_RESET_PW_PANEL.TIP.2");
        return false;
    }

    return true;
}

const emit = defineEmits<{
    (e: "close"): void;
    (e: "submit"): void;
}>();
function submit() {
    const isOk = checkForm();
    if (isOk) {
        updateStudentInfo({
            userpwd: resetPWForm.newPw,
        }).then((res) => {
            if (res.statusCode === 0) {
                emit("submit");
            }
        });
    }
}
function cancel() {
    emit("close");
}
</script>
<style lang="scss" module>
.reset-pw-panel {
    overflow: auto;

    width: 545px;
    max-width: 100%;
    max-height: w-h(80);
    padding: $panel-padding;

    border-radius: var(--r-normal);
    background-color: #fff;
    .panel-title {
        @include dialog-head;

        margin-bottom: var(--y-space-normal);

        text-align: left;
    }
    .submit-row {
        margin-top: 29px;
    }
}
</style>
