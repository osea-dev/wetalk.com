<!--
 * @Description: Site 留言板
 * @Author: F-Stone
 * @LastEditTime: 2023-03-30 13:47:45
-->
<template>
    <div :class="$style['message-board-module']">
        <div class="wrapper--limit-width-mini flex justify-between md:block">
            <div class="state-pos--left text-white wow-group-4">
                <h2
                    :class="$style['module-title']"
                    class="wow animate__fadeInUp-50"
                >
                    <span class="text">{{
                        $t("KEY_MODULE_MESSAGE.TITLE")
                    }}</span>
                    <i class="ic">
                        <nuxt-img
                            src="@/assets/images/site/icon-vector.png"
                            alt=""
                        />
                    </i>
                </h2>
                <h4
                    :class="$style['module-subtitle']"
                    class="wow animate__fadeInUp-50"
                >
                    <span class="text">
                        {{ $t("KEY_MODULE_MESSAGE.SUBTITLE") }}
                    </span>
                </h4>
                <div
                    :class="$style['module-desc']"
                    class="wow animate__fadeInUp-50"
                >
                    <p :class="$style['row']">
                        <i class="ic">1. </i>
                        <span class="text">{{
                            $t("KEY_MODULE_MESSAGE.DESC[0]")
                        }}</span>
                    </p>
                    <p :class="$style['row']">
                        <i class="ic">2. </i>
                        <span class="text">{{
                            $t("KEY_MODULE_MESSAGE.DESC[1]")
                        }}</span>
                    </p>
                    <p :class="$style['row']">
                        <i class="ic">3. </i>
                        <span class="text">{{
                            $t("KEY_MODULE_MESSAGE.DESC[2]")
                        }}</span>
                    </p>
                </div>
                <div
                    :class="$style['avatar-list']"
                    class="wow animate__fadeInUp-50"
                >
                    <nuxt-img
                        src="@/assets/images/site/message-avatar.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="state-pos--right wow animate__fadeIn">
                <FormPanel
                    :title="$t('KEY_MODULE_MESSAGE.FORM.TITLE')"
                    :class="$style['form-panel']"
                    @submit="submit"
                >
                    <FormRow
                        :class="$style['form-row']"
                        :subtitle="$t('KEY_MODULE_MESSAGE.FORM.LIST[0]')"
                    >
                        <FormSelect
                            v-model="formData.courseName"
                            :options="crouseOptions"
                            name="courseName"
                        />
                    </FormRow>
                    <FormRow
                        :class="$style['form-row']"
                        :subtitle="$t('KEY_MODULE_MESSAGE.FORM.LIST[1]')"
                        :error-msg="formError.mobile"
                    >
                        <FormTelInput
                            ref="telInput"
                            v-model="formData.mobile"
                            :placeholder="$t('KEY_MODULE_MESSAGE.FORM.LIST[2]')"
                            :disable="disableMobile"
                            name="mobile"
                        />
                    </FormRow>
                    <FormRow
                        :class="$style['form-row']"
                        :subtitle="$t('KEY_MODULE_MESSAGE.FORM.LIST[3]')"
                        :error-msg="formError.email"
                    >
                        <FormInput
                            v-model="formData.email"
                            :error-msg="formError.email"
                            placeholder="wetalk@gmail.com"
                            :disable="disableEmail"
                            name="email"
                    /></FormRow>
                </FormPanel>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { reactive, defineComponent, ref, watch } from "vue";

import { useContext } from "@nuxtjs/composition-api";
import { postTrialCourseApply } from "@/assets/script/api/api";
import FormTelInput from "@/components/form/TelInput.vue";
import { useUserStore } from "@/store/user";

export default defineComponent({
    components: {
        FormTelInput,
    },
    setup() {
        const formData = reactive({
            courseName: "少儿汉语",
            email: "",
            mobile: { dialCode: "", number: "" },
        });

        const { i18n } = useContext();

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

        const formError = reactive<Record<string, string>>({
            email: "",
            mobile: "",
        });

        const telInput = ref<any>();
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
                formError.email = i18n.t("KEY_FORM.EMAIL_MSG");
                return false;
            }
            return true;
        }

        function submit() {
            const isOk = checkFromData();
            if (!isOk) return;

            postTrialCourseApply({
                courseName: formData.courseName,
                email: formData.email,
                mobileCode: formData.mobile.dialCode,
                mobile: formData.mobile.number,
            }).then(
                (res) => {
                    if (res.statusCode === 0) {
                        Vue.notify?.({
                            group: "form-notice",
                            title: i18n.t("KEY_FORM.SUCCESS"),
                            type: "success",
                            duration: 3000,
                        });
                        formData.email = "";
                        formData.mobile.number = "";
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

        const userStore = useUserStore();

        const disableMobile = ref<boolean>(false);
        const disableEmail = ref<boolean>(false);

        watch(
            [
                () => {
                    return userStore.userInfo?.mobileCode;
                },
                () => {
                    return userStore.userInfo?.mobile;
                },
            ],
            ([mobileCode, mobile]) => {
                if (mobileCode && mobile) {
                    disableMobile.value = true;
                }
                formData.mobile = {
                    dialCode: mobileCode || "",
                    number: mobile || "",
                };
            },
            { immediate: true }
        );
        watch(
            () => {
                return userStore.userInfo?.email;
            },
            (email) => {
                if (email) {
                    disableEmail.value = true;
                }
                formData.email = email || "";
            },
            { immediate: true }
        );

        return {
            formData,
            formError,
            crouseOptions,
            submit,
            telInput,
            disableMobile,
            disableEmail,
        };
    },
});
</script>
<style lang="scss" module>
.message-board-module {
    padding: 62px;

    background-color: #0aca91;
    background-image: url("@/assets/images/site/message-board-bg.png");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: cover;

    /* #region 左侧信息展示 */
    // :global(.state-pos--left) {
    // }
    .module-title {
        font-size: 48px;
        font-weight: bold;

        position: relative;

        margin-top: em(87px, 48px);
        :global(.ic) {
            position: absolute;
            top: em(-34px, 48px);
            right: em(-52px, 48px);

            width: em(68px, 48px);
            height: em(67px, 48px);
        }
    }
    .module-subtitle {
        font-size: 15px;

        margin-top: em(8px, 15px);
    }
    .module-desc {
        font-size: 13px;
        font-weight: 300;

        margin-top: 64px;
        .row {
            margin-bottom: em(13.5px, 13px);

            opacity: 0.8;
            &:last-child {
                margin-bottom: 0;
            }
        }
        :global(.ic) {
            font-family: "Inter";
            font-style: italic;
        }
    }
    .avatar-list {
        font-size: 50px;

        height: 1em;
        margin-top: em(76px, 50px);
        margin-bottom: em(33px, 50px);
        img {
            height: 100%;

            object-fit: contain;
        }
    }
    /* #endregion */
    @include media-breakpoint-down(xxl) {
        // padding-top: 87px;
        .module-title {
            font-size: 38px;

            margin-top: em(55px, 38px);
        }
        .module-subtitle {
            font-size: 14px;
        }
        .avatar-list {
            height: 46px;
        }
    }
    @include media-breakpoint-down(xl) {
        .module-title {
            font-size: 28px;

            display: inline-block;

            margin-top: em(58px, 38px);
        }
        .module-subtitle {
            font-size: 13px;
        }
        .avatar-list {
            height: 40px;
        }
        .module-desc {
            margin-top: 45px;
        }
        .form-row {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(lg) {
        padding: 60px 40px;
        .form-panel {
            width: clamp(300px, 36vw, 350px);
        }
    }
    @include media-breakpoint-down(md) {
        .form-panel {
            width: clamp(300px, 70vw, 400px);
            margin-top: 80px;
        }
    }
    @include media-breakpoint-down(sm) {
        padding: 25px 6% 60px;
        .module-desc {
            margin-top: 30px;
        }
        .avatar-list {
            margin: 40px 0;
        }
        .form-panel {
            box-sizing: border-box;
            width: 100%;
            margin: 0;
            padding: 38px 30px;
        }
    }
}
:global(.lang-en) {
    .message-board-module {
        .module-title {
            display: inline-block;
            :global(.ic) {
                top: em(-24px, 48px);
                right: em(-52px, 48px);

                width: em(68px, 48px);
                height: em(67px, 48px);
            }
        }
        :global(.state-pos--left) {
            padding-right: 50px;
        }
    }
    @include media-breakpoint-down(lg) {
        .message-board-module {
            .module-title {
                font-size: 25px;
            }
            .form-panel {
                width: clamp(270px, 36vw, 350px);
            }
            .avatar-list {
                margin-top: em(56px, 50px);
                margin-bottom: em(23px, 50px);
            }
        }
    }
    @include media-breakpoint-down(md) {
        .message-board-module {
            .form-panel {
                box-sizing: border-box;
                width: 100%;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .message-board-module {
            :global(.state-pos--left) {
                padding-right: 0;
            }
        }
    }
}
</style>
