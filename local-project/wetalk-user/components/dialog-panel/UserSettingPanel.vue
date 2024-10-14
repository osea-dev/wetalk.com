<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 16:13:26
-->
<template>
    <div :class="$style['user-setting-panel']" class="scroll-container">
        <div :class="$style['panel-body']">
            <section :class="$style['register-form']">
                <div
                    :class="$style['avatar-row']"
                    class="flex items-center sm:block"
                >
                    <Avatar
                        :class="$style['user-avatar']"
                        :avatar="settingForm.avatar"
                    />
                    <div
                        :class="$style['oper']"
                        class="sm:flex sm:flex-col-reverse"
                    >
                        <div :class="$style['info']">
                            <p>
                                {{ $t("KEY_SETTING_PANEL.TIP.0") }}
                            </p>
                            <p>{{ $t("KEY_SETTING_PANEL.TIP.1") }}</p>
                        </div>
                        <button
                            :class="$style['btn--upload-img']"
                            @click="upload"
                        >
                            {{ $t("KEY_BASE.UPLOAD") }}
                            <input
                                type="file"
                                ref="fileInput"
                                class="file"
                                name="file"
                                @change="imgChange"
                            />
                        </button>
                    </div>
                </div>
                <FormRow
                    :class="$style['form-item']"
                    dir="row"
                    :subtitle="$t('KEY_BASE.NAME')"
                    :errorMsg="formErrorTip.name"
                >
                    <div class="grid grid-cols-2 gap-2">
                        <FormInput
                            :placeholder="$t('KEY_BASE.LAST_NAME')"
                            v-model="settingForm.firstname"
                            :errorMsg="formErrorTip.name"
                            name="name"
                        />
                        <FormInput
                            :placeholder="$t('KEY_BASE.FIRST_NAME')"
                            v-model="settingForm.lastname"
                            :errorMsg="formErrorTip.name"
                            name="name"
                        />
                    </div>
                </FormRow>
                <FormRow
                    :class="$style['form-item']"
                    dir="row"
                    :subtitle="$t('KEY_BASE.BIRTHDAY')"
                >
                    <FormBirthday v-model="settingForm.birthday" />
                </FormRow>
                <FormRow
                    :class="$style['form-item']"
                    dir="row"
                    :subtitle="$t('KEY_BASE.GENDER')"
                >
                    <FormRadio
                        v-model="settingForm.gender"
                        :options="genderOptions"
                        name="gender"
                    />
                </FormRow>
                <FormRow
                    :class="$style['form-item']"
                    dir="row"
                    :subtitle="$t('KEY_BASE.BIRTHPLACE')"
                >
                    <FormMultiSelect
                        v-model="settingForm.birthPlace"
                        :options="localOptions"
                        name="birthPlace"
                    />
                </FormRow>
                <FormRow
                    :class="$style['form-item']"
                    dir="row"
                    :subtitle="$t('KEY_BASE.LOCAL_UTC')"
                >
                    <div class="grid grid-cols-2 gap-2">
                        <FormMultiSelect
                            v-model="settingForm.local"
                            :options="localOptions"
                            name="local"
                        />
                        <FormSelect
                            v-model="settingForm.utc"
                            :options="utcOptions"
                            name="utc"
                        />
                    </div>
                </FormRow>
                <FormRow
                    :class="$style['form-item']"
                    dir="row"
                    :subtitle="$t('KEY_BASE.CULTURE')"
                >
                    <FormInput
                        v-model="settingForm.culture"
                        :placeholder="$t('KEY_BASE.CULTURE')"
                        name="culture"
                    />
                </FormRow>
                <FormRow :class="[$style['submit-row']]">
                    <div class="grid grid-cols-2 gap-2">
                        <FormSubmitBtn
                            @submit="registerUser"
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
<script lang="ts">
import type { TYPE_TIME_ZONE } from "@/assets/script/api/api";
import Vue, { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { uploadHeadImg } from "@/assets/script/api/api";
import {
    getTimezoneList,
    getCountryList,
    updateStudentInfo,
} from "@/assets/script/api/api";
import { useContext } from "@nuxtjs/composition-api";

export default defineComponent({
    props: {
        userInfo: {
            type: Object,
        },
    },
    emits: {
        close: null,
        submit: null,
    },
    setup(prop, { emit }) {
        const { i18n } = useContext();

        const formErrorTip = reactive<Record<string, string>>({
            name: "",
        });
        const settingForm = reactive({
            avatar: "",
            lan: "",
            culture: "",
            birthday: "1992-01-01",
            birthPlace: "",
            gender: 0,
            firstname: "",
            lastname: "",
            local: "",
            utc: "",
        });

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

        const timeZoneList = ref<TYPE_TIME_ZONE>([]);
        const utcOptions = ref<{ title: string; value: string }[]>([]);
        const lanOptions = ref<{ title: string; value: string }[]>([]);
        const localOptions = ref<{ title: string; value: string }[]>([]);

        const fileInput = ref<HTMLElement | null>(null);

        function checkForm() {
            if (
                !/.+/.test(settingForm.firstname.trim()) ||
                !/.+/.test(settingForm.lastname.trim())
            ) {
                formErrorTip.name = i18n.t("KEY_BASE.TIP_MSG.0");
                return false;
            }
            Object.keys(formErrorTip).forEach((item) => {
                formErrorTip[item] = "";
            });
            return true;
        }
        function registerUser() {
            if (checkForm()) {
                updateStudentInfo({
                    headImg: settingForm.avatar,
                    firstName: settingForm.firstname,
                    lastName: settingForm.lastname,
                    birthdate: settingForm.birthday,
                    gender: settingForm.gender,
                    native: settingForm.birthPlace,
                    timezoneid: settingForm.utc,
                    education: settingForm.culture,
                    nativeLang: settingForm.lan,
                }).then((res) => {
                    if (res.statusCode === 0) {
                        emit("submit");
                    }
                });
            }
        }

        const limitSize = 2;

        function imgChange(ev: any) {
            const file = ev.target.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("upfile", file);

            // let reader: FileReader | null;
            if (file) {
                if (file.size > limitSize * 1024 * 1024) {
                    Vue.notify?.({
                        group: "form-notice",
                        title: i18n.t("KEY_BASE.TIP_MSG.1", [limitSize]),
                        type: "error",
                        duration: 3000,
                    });
                    return;
                }
                uploadHeadImg(formData).then((res) => {
                    settingForm.avatar = res.data.url;
                });
                // reader = new FileReader();
                // reader.readAsDataURL(file);
                // reader.onload = (e: any) => {
                //     console.log(" e.target.result:", e.target.result);
                //     settingForm.avatar = e.target.result;
                //     reader = null;
                // };
            }
        }
        function upload() {
            $(fileInput.value!).trigger("click");
        }
        function cancel() {
            emit("close");
        }
        function updateUtcOption(initVal: string) {
            let result: TYPE_TIME_ZONE[number]["timeZones"] = [];
            timeZoneList.value.some((item) => {
                if (item.countryCode === settingForm.local) {
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
                settingForm.utc = initVal || "";
            });
        }
        watch(
            () => settingForm.local,
            () => {
                updateUtcOption(utcOptions.value[0]?.value.toString());
            }
        );
        onMounted(async () => {
            settingForm.avatar = prop.userInfo?.headImg || "";
            settingForm.firstname = prop.userInfo?.firstName || "";
            settingForm.lastname = prop.userInfo?.lastName || "";
            settingForm.gender = prop.userInfo?.gender || 0;
            settingForm.birthday = prop.userInfo?.birthdate || "2000-01-01";
            settingForm.culture = prop.userInfo?.education || "";
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
                    settingForm.local = prop.userInfo?.timezone.code || "";
                    settingForm.birthPlace =
                        prop.userInfo?.nativeCountryCode || "";
                })
                .then(() => {
                    updateUtcOption(
                        prop.userInfo?.timezone.timezoneid?.toString()
                    );
                });
        });
        return {
            fileInput,
            settingForm,
            formErrorTip,
            genderOptions,
            localOptions,
            utcOptions,
            lanOptions,
            registerUser,
            imgChange,
            upload,
            cancel,
        };
    },
});
</script>
<style lang="scss" module>
.user-setting-panel {
    overflow: auto;

    width: 645px;
    max-width: 100%;
    max-height: w-h(80);
    padding: $panel-padding;

    border-radius: var(--r-normal);
    background-color: #fff;
    .submit-row {
        margin-top: 29px;
    }
    @include media-breakpoint-down(sm) {
        .form-item {
            display: block;
            :global {
                .row-head {
                    width: 100%;
                    margin: 0;
                    margin-bottom: 13px;
                    padding-top: 0;
                }
            }
        }
    }
}
.avatar-row {
    margin-bottom: 27px;
    .user-avatar {
        width: 130px;
        margin-right: 28px;
    }
    .btn--upload-img {
        font-size: 13px;
        line-height: em(20px, 13px);

        padding: 8px 20px;

        transition: 0.26s ease;

        color: #2d2b32;
        border-radius: 6px;
        background: #f5f6f9;
        &:hover {
            color: #fff;
            background: #f8af00;
        }
        input {
            @include hide;
        }
    }
    .oper {
        flex: 1 1 auto;
    }
    .info {
        font-size: 12px;
        line-height: 200%;

        margin-bottom: 8px;

        color: #777;
    }
    @include media-breakpoint-down(sm) {
        .user-avatar {
            width: 90px;
            margin: 0 auto;
            margin-bottom: var(--y-space-normal);
        }
        .btn--upload-img {
            margin-bottom: calc(var(--y-space-normal) * 0.5);
        }
    }
}
</style>
