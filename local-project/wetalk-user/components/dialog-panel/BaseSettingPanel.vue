<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 16:23:20
-->
<template>
    <div :class="$style['base-setting-panel']" class="scroll-container">
        <div :class="$style['panel-body']">
            <section :class="$style['register-form']">
                <FormRow
                    :subtitle="$t('KEY_BASE.EMAIL')"
                    :errorMsg="formError.email"
                >
                    <FormInput
                        :errorMsg="formError.email"
                        :placeholder="$t('KEY_BASE.EMAIL_PLACEHOLDER')"
                        v-model="baseSettingForm.email"
                        name="name"
                /></FormRow>
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
import { onMounted, reactive } from "vue";
import { updateStudentInfo } from "@/assets/script/api/api";
import { emailVerify } from "@wetalk/wetalk-assets";
import { useContext } from "@nuxtjs/composition-api";

const { i18n } = useContext();
const prop = defineProps<{ userInfo: any }>();

const baseSettingForm = reactive({
    email: "",
});

const formError = reactive({
    email: "",
});

const emit = defineEmits<{
    (e: "close"): void;
    (e: "submit"): void;
}>();
function checkFrom() {
    formError.email = emailVerify(baseSettingForm.email);
    if (formError.email) {
        formError.email = i18n.t(formError.email);
        return false;
    }
    return true;
}
function submit() {
    if (checkFrom()) {
        updateStudentInfo({
            email: baseSettingForm.email,
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

onMounted(() => {
    baseSettingForm.email = prop.userInfo.email;
});
</script>
<style lang="scss" module>
.base-setting-panel {
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
}
</style>
