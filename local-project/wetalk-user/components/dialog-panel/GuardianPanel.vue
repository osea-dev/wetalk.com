<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 11:38:17
-->
<template>
    <div :class="$style['guardian-panel']" class="scroll-container">
        <div :class="$style['panel-body']">
            <section :class="$style['register-form']">
                <FormRow
                    :subtitle="$t('KEY_GUARDIAN_PANEL.FORM.1')"
                    :errorMsg="formErrorTip.name"
                >
                    <FormInput
                        :placeholder="$t('KEY_GUARDIAN_PANEL.FORM.0')"
                        v-model="guardianForm.name"
                        :errorMsg="formErrorTip.name"
                        name="name"
                /></FormRow>
                <FormRow
                    :subtitle="$t('KEY_GUARDIAN_PANEL.FORM.5')"
                    :errorMsg="formErrorTip.mobile"
                >
                    <div class="flex sm:block">
                        <FormTelInput
                            class="flex-auto"
                            :placeholder="$t('KEY_GUARDIAN_PANEL.FORM.2')"
                            v-model="guardianForm.mobile"
                            ref="telInput"
                            :disable="hadTel"
                            @error="changeMobileErr"
                            name="mobile"
                        />
                        <button
                            v-if="hadTel"
                            @click="clearMobile"
                            :class="$style['btn--change-tel']"
                        >
                            {{ $t("KEY_BASE.CHANGE") }}
                        </button>
                    </div>
                </FormRow>
                <FormRow :subtitle="$t('KEY_GUARDIAN_PANEL.FORM.4')">
                    <FormInput
                        :placeholder="$t('KEY_GUARDIAN_PANEL.FORM.3')"
                        v-model="guardianForm.relation"
                        name="mobile"
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
            </section>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { updateStudentInfo } from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

const { i18n } = useContext();
const hadTel = ref<boolean>(false);
const prop = defineProps<{ userInfo: any }>();
const guardianForm = reactive({
    name: "",
    mobile: { dialCode: "", number: "", code: "" },
    relation: "",
});

const formErrorTip = reactive({
    name: "",
    mobile: "",
    relation: "",
});

function clearMobile() {
    hadTel.value = false;
    guardianForm.mobile = { dialCode: "", number: "", code: "" };
}

function changeMobileErr(msg: string) {
    formErrorTip.mobile = msg;
}
const emit = defineEmits<{
    (e: "close"): void;
    (e: "submit"): void;
}>();

type TYPE_TEL_INPUT = InstanceType<any>;
const telInput = ref<TYPE_TEL_INPUT>();
function checkForm() {
    if (!/.+/.test(guardianForm.name.trim())) {
        formErrorTip.name = i18n.t("KEY_GUARDIAN_PANEL.TIP.0");
        return false;
    }

    if (!hadTel.value) {
        const telInputVerify = telInput.value?.verify();
        if (telInputVerify) {
            formErrorTip.mobile = telInputVerify;
            return false;
        }
    }

    if (!/.+/.test(guardianForm.relation.trim())) {
        formErrorTip.relation = i18n.t("KEY_GUARDIAN_PANEL.TIP.1");
        return false;
    }

    Object.keys(formErrorTip).forEach((item) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        formErrorTip[item] = "";
    });
    return true;
}
function submit() {
    const isOk = checkForm();
    if (!isOk) return;
    if (hadTel.value) {
        updateStudentInfo({
            guardianName: guardianForm.name,
            guardianshipFee: guardianForm.relation,
        }).then((res) => {
            if (res.statusCode === 0) {
                emit("submit");
            }
        });
    } else {
        updateStudentInfo({
            guardianName: guardianForm.name,
            guardianMobileCode: guardianForm.mobile.dialCode,
            guardianMobile: guardianForm.mobile.number,
            guardianSmsCode: guardianForm.mobile.code,
            guardianshipFee: guardianForm.relation,
        }).then((res) => {
            if (res.statusCode === 0) {
                emit("submit");
            }
        });
    }
}

onMounted(() => {
    if (prop.userInfo.guardianMobile) {
        hadTel.value = true;
    }
    guardianForm.name = prop.userInfo.guardianName;
    guardianForm.mobile = {
        dialCode: prop.userInfo.guardianMobileCode,
        number: prop.userInfo.guardianMobile,
        code: "",
    };
    guardianForm.relation = prop.userInfo.guardianshipFee;
});
function cancel() {
    emit("close");
}
</script>
<style lang="scss" module>
.guardian-panel {
    overflow: auto;

    width: 545px;
    max-width: 100%;
    max-height: w-h(80);
    padding: $panel-padding;

    border-radius: var(--r-normal);
    background-color: #fff;
    .submit-row {
        margin-top: 29px;
    }
    .btn--change-tel {
        flex: 0 0 auto;

        margin-left: 12px;
        padding: 0 26px;

        color: #fff;
        border-radius: 6px;
        background-color: #f8af00;
    }
    @include media-breakpoint-down(sm) {
        .btn--change-tel {
            width: 100%;
            margin: 0;
            margin-top: 6px;
            padding: 10px 20px;
        }
    }
}
</style>
