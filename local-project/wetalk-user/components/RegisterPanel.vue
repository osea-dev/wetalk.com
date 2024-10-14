<template>
    <div :class="$style['register-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">
                {{ $t("KEY_REGISTER_PANEL.TITLE") }}
            </h2>
            <p :class="$style['panel-subtitle']">
                <span class="text"> {{ $t("KEY_LOGIN_PANEL.SUBTITLE") }} </span
                ><a
                    :class="$style['link']"
                    :href="linkManage.service"
                    target="_blank"
                    >{{ $t("KEY_BASE.TERMS_OF_SERVICE") }}</a
                >
                <span class="text">{{ $t("KEY_BASE.AND") }}</span>
                <a
                    :class="$style['link']"
                    :href="linkManage.policy"
                    target="_blank"
                    >{{ $t("KEY_BASE.PRIVACY_AGREEMENT") }}</a
                >
            </p>
        </div>
        <div :class="$style['panel-body']">
            <section :class="$style['register-form']">
                <div
                    :class="$style['form-row']"
                    :data-error="
                        !!formErrorTip.firstName || !!formErrorTip.secName
                    "
                >
                    <div :class="$style['row-inner']" class="grid grid-cols-2">
                        <div
                            :class="$style['input-wrapper']"
                            :data-error="!!formErrorTip.firstName"
                        >
                            <input
                                :placeholder="$t('KEY_BASE.FIRST_NAME')"
                                type="text"
                                name="firstName"
                                v-model="registerFormData.firstName"
                            />
                        </div>
                        <div
                            :class="$style['input-wrapper']"
                            :data-error="!!formErrorTip.secName"
                        >
                            <input
                                :placeholder="$t('KEY_BASE.LAST_NAME')"
                                type="text"
                                name="secName"
                                v-model="registerFormData.secName"
                            />
                        </div>
                    </div>
                    <div
                        :class="$style['error-tip']"
                        v-if="formErrorTip.firstName || formErrorTip.secName"
                    >
                        <span class="text">{{
                            formErrorTip.firstName || formErrorTip.secName
                        }}</span>
                    </div>
                </div>
                <div
                    :class="$style['form-row']"
                    :data-error="!!formErrorTip.email"
                >
                    <div :class="$style['row-inner']">
                        <div
                            :class="$style['input-wrapper']"
                            :data-error="!!formErrorTip.email"
                        >
                            <input
                                :placeholder="$t('KEY_BASE.EMAIL')"
                                type="text"
                                name="email"
                                v-model="registerFormData.email"
                            />
                        </div>
                    </div>
                    <div :class="$style['error-tip']" v-if="formErrorTip.email">
                        <span class="text">{{ formErrorTip.email }}</span>
                    </div>
                </div>
                <div
                    :class="$style['form-row']"
                    :data-error="
                        !!formErrorTip.password || !!formErrorTip.submit
                    "
                >
                    <div :class="$style['row-inner']">
                        <FormInput
                            type="password"
                            :errorMsg="formErrorTip.password"
                            :placeholder="$t('KEY_BASE.PASSWORD')"
                            v-model="registerFormData.password"
                            name="password"
                        />
                    </div>
                    <div
                        :class="$style['error-tip']"
                        v-if="formErrorTip.password || formErrorTip.submit"
                    >
                        <span class="text">{{
                            formErrorTip.password || formErrorTip.submit
                        }}</span>
                    </div>
                </div>
                <div :class="[$style['form-row'], $style['submit-row']]">
                    <button :class="$style['submit-btn']" @click="register">
                        {{ $t("KEY_BASE.REGISTER") }}
                    </button>
                </div>
            </section>
            <div
                :class="$style['tip']"
                class="flex justify-between items-center"
            >
                <div class="state-pos--left">
                    <span class="text">{{
                        $t("KEY_REGISTER_PANEL.TIP.0")
                    }}</span>
                    <Link
                        :class="$style['link']"
                        :to="localePath(linkManage.login)"
                    >
                        {{ $t("KEY_BASE.LOGIN") }}
                    </Link>
                </div>
                <div class="state-pos--right"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, useContext } from "@nuxtjs/composition-api";

import { RegUser } from "@/assets/script/api/api";
import { emailVerify, pwVerify, emptyCheck } from "@wetalk/wetalk-assets";

import linkManage from "@/assets/script/local-data/link-manage";

const { $cookies, localePath, i18n } = useContext();

const registerFormData = reactive({
    firstName: "",
    secName: "",
    email: "",
    password: "",
});

const formErrorTip = reactive({
    firstName: "",
    secName: "",
    email: "",
    password: "",
    submit: "",
});

function checkForm() {
    const { firstName, secName, email, password } = registerFormData;
    Object.keys(formErrorTip).forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        formErrorTip[k] = "";
    });

    if (emptyCheck(firstName.trim())) {
        formErrorTip.firstName = i18n.t("KEY_REGISTER_PANEL.TIP.1");
        return false;
    }
    if (emptyCheck(secName.trim())) {
        formErrorTip.secName = i18n.t("KEY_REGISTER_PANEL.TIP.2");
        return false;
    }
    formErrorTip.email = emailVerify(email);
    if (formErrorTip.email) {
        formErrorTip.email = i18n.t(formErrorTip.email);
        return false;
    }
    formErrorTip.password = pwVerify(password);
    if (formErrorTip.password) {
        formErrorTip.password = i18n.t(formErrorTip.password);
        return false;
    }

    return true;
}

const emit = defineEmits<{ (e: "submit"): void }>();

function register() {
    const isOk = checkForm();
    if (isOk) {
        RegUser({
            firstName: registerFormData.firstName,
            lastName: registerFormData.secName,
            email: registerFormData.email,
            userpwd: registerFormData.password,
        }).then((res) => {
            switch (res.statusCode) {
                case 0:
                    console.log("console", "removeToken");
                    $cookies.remove("UserToken");
                    $cookies.set("UserToken", res.data.userToken, {
                        path: "/",
                    });
                    emit("submit");
                    break;

                default:
                    break;
            }
        });
    }
}
</script>
<style lang="scss" module>
.register-panel {
    box-sizing: content-box;
    width: 374px;
    padding: 30px 20px;
    .panel-head {
        margin-bottom: 26px;
    }
    .panel-title {
        font-size: 26px;
        font-weight: 700;
        line-height: 45px;

        color: #23262f;
    }
    .panel-subtitle {
        font-size: 13px;
        line-height: em(26px, 13px);

        padding: 3px 0;

        color: #777e91;
        & > * {
            display: inline;

            vertical-align: middle;
        }
    }
    .link {
        font-weight: 500;

        cursor: pointer;

        color: #3b71fe;
    }
    .tip {
        font-size: 12px;
        font-weight: 400;
        line-height: em(18px, 12px);

        margin-top: 15px;

        color: #696974;
        span {
            display: inline-block;

            vertical-align: middle;
        }
        button {
            transition: 0.26s ease;
            &:hover {
                color: #23262f;
            }
        }
    }
    @include media-breakpoint-down(md) {
        box-sizing: border-box;
    }
    @include media-breakpoint-down(sm) {
        .panel-title {
            font-size: 23px;
        }
    }
}
.register-form {
    font-size: 13px;
    .form-row {
        @include space-between(14px, "y");
        &[data-error] {
            margin: 0;
        }
        .row-inner {
            column-gap: 14px;
        }
        .error-tip {
            line-height: 32px;

            color: #d93237;
        }
    }
    .submit-row {
        margin-top: 30px;
        .submit-btn {
            font-size: 16px;
            font-weight: 700;
            line-height: em(24px, 16px);

            width: 100%;
            padding: 12px 20px;

            text-align: center;

            color: #fff;
            border-radius: 6px;
            background: #3b71fe;
        }
    }
    .input-wrapper {
        position: relative;
        &[data-error] {
            input {
                box-shadow: inset 0 0 0 2px #d93237 !important;
            }
        }
        .after-icon {
            font-size: 13px;

            position: absolute;
            top: 0;
            right: 0;

            display: flex;

            box-sizing: content-box;
            width: 12px;
            height: 100%;
            padding: 0 20px;

            cursor: pointer;
            transition: 0.26s ease;

            color: #b1b5c4;

            align-items: center;
            &:hover {
                color: #333;
            }
        }
    }
}
</style>
