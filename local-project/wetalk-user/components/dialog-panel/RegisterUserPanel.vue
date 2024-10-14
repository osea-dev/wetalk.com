<template>
    <PublicSmartScrollBox :class="$style['dialog-layer']">
        <div :class="$style['dialog-box']" ref="dialogBox">
            <div
                :class="$style['register-user-panel']"
                class="scroll-container"
            >
                <div :class="$style['panel-head']">
                    <div
                        :class="$style['panel-title']"
                        class="flex items-center"
                    >
                        <span class="text">{{
                            $t("KEY_REGISTER_USER_PANEL.WELCOME")
                        }}</span>
                        <div :class="$style['ic']">
                            <img
                                src="data:image/png;base64,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"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div :class="$style['panel-body']">
                    <section :class="$style['register-form']">
                        <FormRow
                            :class="$style['row']"
                            :title="$t('KEY_REGISTER_USER_PANEL.TIP.0')"
                            :subtitle="$t('KEY_REGISTER_USER_PANEL.TIP.1')"
                            :errorMsg="formErrorTip.mobile"
                        >
                            <FormTelInput
                                :placeholder="$t('KEY_BASE.PHONE_NUMBER')"
                                v-model="registerForm.mobile"
                                ref="telInput"
                                @error="changeMobileErr"
                                name="mobile"
                            />
                        </FormRow>
                        <FormRow
                            :class="$style['row']"
                            :title="$t('KEY_REGISTER_USER_PANEL.TIP.2')"
                            :subtitle="$t('KEY_REGISTER_USER_PANEL.TIP.3')"
                        >
                            <FormBirthday v-model="registerForm.birthday" />
                        </FormRow>
                        <FormRow
                            :class="$style['row']"
                            :title="$t('KEY_REGISTER_USER_PANEL.TIP.4')"
                            :subtitle="$t('KEY_REGISTER_USER_PANEL.TIP.5')"
                        >
                            <FormMultiSelect
                                v-model="registerForm.birthPlace"
                                :options="localOptions"
                                name="birthPlace"
                            />
                        </FormRow>
                        <FormRow
                            :class="$style['row']"
                            :title="$t('KEY_REGISTER_USER_PANEL.TIP.6')"
                            :subtitle="$t('KEY_REGISTER_USER_PANEL.TIP.7')"
                        >
                            <div class="grid grid-cols-2 gap-2">
                                <FormMultiSelect
                                    v-model="registerForm.local"
                                    :options="localOptions"
                                    name="local"
                                />
                                <FormSelect
                                    v-model="registerForm.utc"
                                    :options="utcOptions"
                                    name="utc"
                                />
                            </div>
                        </FormRow>
                        <FormRow :class="[$style['submit-row']]">
                            <FormSubmitBtn
                                @submit="registerUser"
                                :text="$t('KEY_BASE.SUBMIT')"
                            />
                            <div
                                :class="$style['btn-logout']"
                                class="text text-center"
                                @click="logout"
                            >
                                {{ $t("KEY_REGISTER_USER_PANEL.BTN.0") }}
                            </div>
                        </FormRow>
                    </section>
                </div>
            </div>
        </div>
    </PublicSmartScrollBox>
</template>
<script lang="ts">
import type { TYPE_TIME_ZONE } from "@/assets/script/api/api";

import { useContext } from "@nuxtjs/composition-api";
import Vue, { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useUserStore } from "@/store/user";
import FormTelInput from "@/components/form/TelInput.vue";
import {
    postLogout,
    PerfectReg,
    getTimezoneList,
    getCountryList,
    getStudentInfo,
} from "@/assets/script/api/api";

type TYPE_REGISTER_FORM = {
    birthPlace: string;
    mobile: {
        dialCode: string;
        number: string;
        code: string;
        country: string;
    };
    birthday: string;
    local: string;
    utc: string;
};

type TYPE_TEL_INPUT = InstanceType<any>;

export default defineComponent({
    components: { FormTelInput },
    setup() {
        const userStore = useUserStore();
        const registerForm = reactive<TYPE_REGISTER_FORM>({
            birthPlace: "",
            mobile: { dialCode: "", number: "", code: "", country: "" },
            birthday: "2000-01-01",
            local: "",
            utc: "",
        });

        const formErrorTip = reactive<Record<string, string>>({
            mobile: "",
        });

        const timeZoneList = ref<TYPE_TIME_ZONE>([]);
        const utcOptions = ref<{ title: string; value: string }[]>([]);
        const lanOptions = ref<{ title: string; value: string }[]>([]);
        const localOptions = ref<{ title: string; value: string }[]>([]);

        function updateUtcOption() {
            let result: TYPE_TIME_ZONE[number]["timeZones"] = [];
            timeZoneList.value.some((item) => {
                if (item.countryCode === registerForm.local) {
                    result = item.timeZones;
                    return true;
                }
            });
            const op = result.map((item) => {
                return {
                    title: item.timezoneName,
                    value: item.timezoneid.toString(),
                };
            });
            utcOptions.value = op;
            setTimeout(() => {
                registerForm.utc = op[0]?.value.toString() || "";
            });
        }
        watch(() => registerForm.local, updateUtcOption, { immediate: true });
        const telInput = ref<TYPE_TEL_INPUT>();

        function checkFormMsg() {
            const telInputVerify = telInput.value?.verify();
            if (telInputVerify) {
                formErrorTip.mobile = telInputVerify;
                return false;
            }
            Object.keys(formErrorTip).forEach((item) => {
                formErrorTip[item] = "";
            });
            return true;
        }

        const { i18n } = useContext();
        function registerUser() {
            const isOk = checkFormMsg();
            if (!isOk) return;
            PerfectReg({
                countryCode: registerForm.mobile.country,
                mobileCode: registerForm.mobile.dialCode,
                mobile: registerForm.mobile.number,
                smsCode: registerForm.mobile.code,
                birthdate: registerForm.birthday,
                native: registerForm.birthPlace,
                timezoneid: registerForm.utc,
            }).then((res) => {
                switch (res.statusCode) {
                    case 0:
                        {
                            userStore.updateUserInfoStatus(1);
                            getStudentInfo().then((res) => {
                                userStore.updateUserInfo(res.data);
                            });
                            Vue.notify?.({
                                group: "form-notice",
                                title: i18n.t("KEY_BASE.SUBMIT_SUC"),
                                type: "success",
                                duration: 2000,
                            });
                        }
                        break;

                    default:
                        break;
                }
            });
        }
        function changeMobileErr(msg: string) {
            formErrorTip.mobile = msg;
        }

        const { $cookies } = useContext();
        function logout() {
            postLogout()
                .then(() => {
                    console.log("console", "removeToken");
                    $cookies.remove("UserToken");
                })
                .then(() => {
                    window.location.reload();
                });
        }

        onMounted(async () => {
            await Promise.all([getTimezoneList(), getCountryList()])
                .then(([zone, country]) => {
                    const countryList = country.data.map((item) => {
                        return {
                            title: item.country,
                            value: item.code,
                        };
                    });
                    localOptions.value = countryList;
                    lanOptions.value = countryList;
                    timeZoneList.value = zone.data;
                })
                .then(() => {
                    requestAnimationFrame(() => {
                        registerForm.local = "CN";
                        registerForm.birthPlace = "CN";
                    });
                });
        });
        return {
            logout,
            telInput,
            lanOptions,
            utcOptions,
            localOptions,
            registerForm,
            formErrorTip,
            registerUser,
            changeMobileErr,
        };
    },
});
</script>
<style lang="scss" module>
.dialog-layer {
    display: flex;

    width: 100%;

    justify-content: center;
}
.dialog-box {
    position: relative;
    z-index: 10;

    max-width: 92%;
}
.register-user-panel {
    overflow: auto;

    width: 520px;
    max-width: 100%;
    max-height: w-h(80);
    padding: calc(var(--p-normal) * 3) calc(var(--p-normal) * 6)
        calc(var(--p-normal) * 2.4);

    border-radius: var(--r-normal);
    background-color: #fff;
    .panel-head {
        margin-bottom: 16px;
    }
    .panel-title {
        font-size: 24px;
        font-weight: 700;
        line-height: em(36px, 24px);

        color: #23262f;
        .ic {
            width: 28px;
            margin-left: 6px;
        }
    }
}
.register-form {
    & > * {
        @include space-between(24px, "y");
    }
    .submit-row {
        font-size: 12px;

        margin-top: 22px;
        margin-bottom: 0;
    }
    .btn-logout {
        cursor: pointer;
        text-decoration: underline;

        color: #3b71fe;
    }
}
</style>
