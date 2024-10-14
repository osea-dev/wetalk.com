<template>
    <div :class="$style['booking-panel']" class="scroll-container">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">
                <span class="text">{{
                    $t("KEY_BOOKING_PANEL.TITLE_DETAIL")
                }}</span>
            </h2>
        </div>
        <div :class="$style['panel-body']">
            <div :class="$style['panel-form']">
                <FormRow>
                    <FormSelect
                        :title="$tc('KEY_BOOKING_PANEL.COURSE_NAME')"
                        v-model="bookingForm.course"
                        :options="crouseOptions"
                        name="lan"
                    />
                </FormRow>
                <FormRow :errorMsg="formErrorTip.mobile">
                    <FormTelInput
                        :title="$tc('KEY_BOOKING_PANEL.CANTACT')"
                        :placeholder="$tc('KEY_BOOKING_PANEL.CANTACT')"
                        v-model="bookingForm.mobile"
                        :disable="
                            !!bookingForm.mobile.dialCode &&
                            !!bookingForm.mobile.number
                        "
                        ref="telInput"
                        :withCode="false"
                        name="mobile"
                    />
                </FormRow>
                <FormRow :errorMsg="formErrorTip.email">
                    <FormInput
                        :title="$t('KEY_BASE.EMAIL')"
                        :placeholder="$t('KEY_BOOKING_PANEL.TIP.4')"
                        v-model="bookingForm.email"
                        :errorMsg="formErrorTip.email"
                        :disable="!!bookingForm.email"
                        name="email"
                    />
                </FormRow>
                <FormRow :errorMsg="formErrorTip.birthdate">
                    <FormBirthday
                        :title="$t('KEY_BOOKING_PANEL.TIP.5')"
                        v-model="bookingForm.birthdate"
                    />
                </FormRow>
                <FormRow>
                    <FormRadio
                        :title="$t('KEY_BOOKING_PANEL.GENDER')"
                        v-model="bookingForm.gender"
                        :options="genderOptions"
                        name="gender"
                    />
                </FormRow>
                <FormRow>
                    <FormRadio
                        :title="$t('KEY_BOOKING_PANEL.TIP.6')"
                        v-model="bookingForm.foundation"
                        :options="foundationOptions"
                        name="foundation"
                    />
                </FormRow>
                <FormRow
                    :class="$style['form-error-row']"
                    :errorMsg="formErrorTip.submit"
                    v-if="formErrorTip.submit"
                >
                </FormRow>
                <FormRow :class="[$style['submit-row']]">
                    <FormSubmitBtn
                        @submit="submit"
                        :text="$t('KEY_BASE.SUBMIT')"
                    />
                </FormRow>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import FormRow from "@/components/form/Row.vue";
import FormInput from "@/components/form/Input.vue";
import FormSelect from "@/components/form/Select.vue";
import FormRadio from "@/components/form/Radio.vue";
import FormSubmitBtn from "@/components/form/SubmitBtn.vue";
import { useUserStore } from "~/store/user";
import { TrialCourseApply } from "@/assets/script/api/api";
import { emailVerify } from "@wetalk/wetalk-assets";
import { onMounted, reactive, ref } from "vue";
import { useContext } from "@nuxtjs/composition-api";

const { $pinia, i18n } = useContext();
const userStore = useUserStore($pinia);

const bookingForm = reactive({
    course: "少儿汉语",
    mobile: { dialCode: "", number: "" },
    email: "",
    birthdate: "",
    gender: 1,
    foundation: 1,
});

onMounted(() => {
    const info = userStore.userInfo;
    bookingForm.mobile = {
        dialCode: info?.mobileCode || "",
        number: info?.mobile || "",
    };
    bookingForm.email = info?.email || "";
    bookingForm.gender = info?.gender || 1;
    if (info?.birthdate) {
        bookingForm.birthdate = info?.birthdate;
    }
});

const crouseOptions = [
    {
        title: i18n.t("少儿汉语"),
        value: "少儿汉语",
    },
    {
        title: i18n.t("成人汉语"),
        value: "成人汉语",
    },
    {
        title: i18n.t("少儿英语"),
        value: "少儿英语",
    },
    {
        title: i18n.t("成人英语"),
        value: "成人英语",
    },
];

const genderOptions = [
    {
        title: i18n.t("KEY_BASE.BOY"),
        value: 1,
    },
    {
        title: i18n.t("KEY_BASE.girl"),
        value: 0,
    },
];
const foundationOptions = [
    {
        title: i18n.t("KEY_BASE.YES"),
        value: 1,
    },
    {
        title: i18n.t("KEY_BASE.NO"),
        value: 0,
    },
];
const formErrorTip = reactive({
    mobile: "",
    email: "",
    birthdate: "",
    submit: "",
});

const telInput = ref<any>();

function checkForm() {
    const { email, birthdate } = bookingForm;
    Object.keys(formErrorTip).forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        formErrorTip[k] = "";
    });

    const telInputVerify = telInput.value?.verify();
    if (telInputVerify) {
        formErrorTip.mobile = telInputVerify;
        return false;
    }

    formErrorTip.email = emailVerify(email);
    if (formErrorTip.email) {
        formErrorTip.email = i18n.t(formErrorTip.email);
        return false;
    }

    if (!/.+/.test(birthdate.trim())) {
        formErrorTip.birthdate = i18n.t("KEY_BOOKING_PANEL.TIP.7");
        return false;
    }

    return true;
}

const emit = defineEmits<{ (e: "close"): void; (e: "submit"): void }>();

function submit() {
    const isOk = checkForm();
    if (!isOk) return;
    TrialCourseApply({
        courseName: bookingForm.course,
        mobile: bookingForm.mobile.number,
        mobileCode: bookingForm.mobile.dialCode,
        birthdate: bookingForm.birthdate,
        email: bookingForm.email,
        gender: bookingForm.gender,
        isChinese: bookingForm.foundation,
    }).then((res) => {
        if (res.statusCode === 0) {
            emit("submit");
            emit("close");
        } else if (res.statusCode === 4000) {
            formErrorTip.submit = res.message;
        }
    });
}
</script>
<style lang="scss" module>
.booking-panel {
    overflow: auto;

    width: 520px;
    max-width: 100%;
    max-height: w-h(80);
    padding: $dialog-panel-padding;

    border-radius: var(--r-normal);
    background-color: #fff;
    .panel-head {
        margin-bottom: 29px;
    }
    .panel-title {
        @include dialog-head;
    }
    .submit-row {
        margin-top: 18px;
    }
    @include media-breakpoint-down(sm) {
        .panel-head {
            margin-bottom: var(--y-space-normal);
        }
    }
}
</style>
