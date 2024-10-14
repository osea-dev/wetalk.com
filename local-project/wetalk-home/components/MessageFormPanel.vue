<template>
    <FormPanel
        :class="$style['message-form-panel']"
        :title="title"
        @submit="submit"
    >
        <FormRow :subtitle="$t('KEY_FORM.COUNSELING_SUBJECTS')">
            <FormSelect
                v-model="formData.course"
                :options="courseOptions"
                :disable="true"
                name="courseid"
            />
        </FormRow>
        <FormRow
            :subtitle="$t('KEY_FORM.CONTACT_TITLE')"
            :error-msg="formError.mobile"
        >
            <FormTelInput
                ref="telInput"
                v-model="formData.mobile"
                :placeholder="$t('KEY_FORM.TEL_TITLE')"
                name="mobile"
            />
        </FormRow>
        <FormRow
            :subtitle="$t('KEY_FORM.EMAIL_TITLE')"
            :error-msg="formError.email"
        >
            <FormInput
                v-model="formData.email"
                :error-msg="formError.email"
                placeholder="wetalk@gmail.com"
                name="email"
        /></FormRow>
    </FormPanel>
</template>
<script lang="ts" setup>
import Vue, { reactive, ref } from "vue";
import FormTelInput from "@/components/form/TelInput.vue";
import { postCourseMessage } from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

const prop = defineProps<{
    title: string;
    currentCourse: {
        title: string;
        value: string;
    };
}>();
const formData = reactive({
    course: prop.currentCourse.value,
    email: "",
    mobile: { dialCode: "", number: "" },
});

const formError = reactive<Record<string, string>>({
    email: "",
    mobile: "",
});

const courseOptions = ref<{ title: string; value: string | number }[]>([
    prop.currentCourse,
]);

const { i18n } = useContext();

const telInput = ref<InstanceType<typeof FormTelInput>>();
function checkFromData() {
    const telInputVerify = telInput.value?.verify();
    Object.keys(formError).forEach((item) => {
        formError[item] = "";
    });
    if (telInputVerify) {
        formError.mobile = telInputVerify;
        return false;
    }
    if (
        !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
            formData.email.trim()
        )
    ) {
        // formError.email = i18n.t("KEY_FORM.EMAIL_MSG");
        return false;
    }
    return true;
}

const emit = defineEmits<(e: "close") => void>();

function submit() {
    const isOk = checkFromData();
    if (!isOk) return;

    postCourseMessage({
        courseGroupInfoid: Number(prop.currentCourse.value),
        mobileCode: formData.mobile.dialCode,
        mobile: formData.mobile.number,
        email: formData.email,
    }).then(
        (res) => {
            if (res.statusCode === 0) {
                Vue.notify?.({
                    group: "form-notice",
                    title: i18n.t("KEY_FORM.SUCCESS"),
                    type: "success",
                    duration: 3000,
                });
                emit("close");
            }
        },
        () => {
            Vue.notify?.({
                group: "form-notice",
                title: i18n.t("KEY_FORM.NET_ERR"),
                type: "error",
                duration: 3000,
            });
        }
    );
}
</script>
<style lang="scss" module>
.message-form-panel {
    @include media-breakpoint-down(sm) {
        box-sizing: border-box;
        width: 96%;
        margin: 0 auto;
    }
}
</style>
