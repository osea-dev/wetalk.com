<template>
    <div :class="$style['login-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">
                {{ $t("KEY_LOGIN_PANEL.TITLE") }}
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
            <div :class="$style['login-method-tab']" class="flex">
                <button
                    :class="$style['btn']"
                    :data-active="loginType === 'email'"
                    @click="loginType = 'email'"
                >
                    <span class="text">{{ $t("KEY_BASE.EMAIL_LOGIN") }}</span>
                </button>
                <button
                    :class="$style['btn']"
                    :data-active="loginType === 'mobile'"
                    @click="loginType = 'mobile'"
                >
                    <span class="text">{{ $t("KEY_BASE.MOBILE_LOGIN") }}</span>
                </button>
            </div>
            <form
                v-if="loginType === 'email'"
                :class="$style['login-form']"
                @submit.prevent="login"
            >
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
                                autocomplete="username"
                                name="email"
                                v-model="loginFormData.email"
                            />
                        </div>
                    </div>
                    <div :class="$style['error-tip']" v-if="formErrorTip.email">
                        <span class="text">{{ formErrorTip.email }}</span>
                    </div>
                </div>
                <div
                    :class="$style['form-row']"
                    :data-error="!!formErrorTip.password"
                >
                    <div :class="$style['row-inner']">
                        <FormInput
                            type="password"
                            :errorMsg="formErrorTip.password"
                            :placeholder="$t('KEY_BASE.PASSWORD')"
                            v-model="loginFormData.password"
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
                <div :class="$style['form-row']">
                    <label
                        :class="$style['checkbox-option']"
                        class="flex items-center cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            name="saveLoginState"
                            @click="saveLoginState = !saveLoginState"
                            :value="saveLoginState"
                            :checked="saveLoginState"
                        />
                        <div :class="$style['checkbox-box']"></div>
                        <span class="text whitespace-nowrap">{{
                            $t("KEY_LOGIN_PANEL.TIP.3")
                        }}</span>
                    </label>
                </div>
                <div :class="[$style['form-row'], $style['submit-row']]">
                    <button
                        :class="$style['submit-btn']"
                        @click.prevent="login"
                    >
                        {{ $t("KEY_BASE.LOGIN") }}
                    </button>
                </div>
            </form>
            <form
                v-if="loginType === 'mobile'"
                :class="$style['login-form']"
                @submit.prevent="mobileLogin"
            >
                <div
                    :class="$style['form-row']"
                    :data-error="!!formErrorTip.mobile"
                >
                    <div :class="$style['row-inner']">
                        <FormTelInput
                            :placeholder="$tc('KEY_BASE.PHONE_NUMBER')"
                            v-model="mobileLoginFormData.mobile"
                            :disable="false"
                            ref="telInput"
                            :withCode="false"
                            name="mobile"
                        />
                    </div>
                    <div
                        :class="$style['error-tip']"
                        v-if="formErrorTip.mobile"
                    >
                        <span class="text">{{ formErrorTip.mobile }}</span>
                    </div>
                </div>
                <div
                    :class="$style['form-row']"
                    :data-error="!!formErrorTip.password"
                >
                    <div :class="$style['row-inner']">
                        <FormInput
                            type="password"
                            :errorMsg="formErrorTip.password"
                            :placeholder="$t('KEY_BASE.PASSWORD')"
                            v-model="mobileLoginFormData.password"
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
                <div :class="$style['form-row']">
                    <label
                        :class="$style['checkbox-option']"
                        class="flex items-center cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            name="saveLoginState"
                            @click="saveLoginState = !saveLoginState"
                            :value="saveLoginState"
                            :checked="saveLoginState"
                        />
                        <div :class="$style['checkbox-box']"></div>
                        <span class="text whitespace-nowrap">{{
                            $t("KEY_LOGIN_PANEL.TIP.3")
                        }}</span>
                    </label>
                </div>
                <div :class="[$style['form-row'], $style['submit-row']]">
                    <button
                        :class="$style['submit-btn']"
                        @click.prevent="mobileLogin"
                    >
                        {{ $t("KEY_BASE.LOGIN") }}
                    </button>
                </div>
            </form>
            <div
                :class="$style['tip']"
                class="flex justify-between items-center"
            >
                <div class="state-pos--left">
                    <span class="text">{{ $t("KEY_LOGIN_PANEL.TIP.2") }}</span
                    ><Link
                        :class="$style['link']"
                        :to="localePath(linkManage.register)"
                        >{{ $t("KEY_LOGIN_PANEL.REGISTER") }}</Link
                    >
                </div>
                <div class="state-pos--right">
                    <Link :to="localePath(linkManage.forgotPW)">{{
                        $t("KEY_LOGIN_PANEL.TIP.1")
                    }}</Link>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    reactive,
    useRouter,
    ref,
    useContext,
    useRoute,
} from "@nuxtjs/composition-api";
import { UserLoginEmail, UserLoginMobile } from "@/assets/script/api/api";
import linkManage from "@/assets/script/local-data/link-manage";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { emailVerify, pwVerify, emptyCheck } from "@wetalk/wetalk-assets";

const saveLoginState = ref<boolean>(false);
const { app, i18n, $cookies, localePath } = useContext();

const router = useRouter();
const route = useRoute();
const loginType = ref<"mobile" | "email">("email");

const formErrorTip = reactive({
    mobile: "",
    email: "",
    password: "",
    submit: "",
});

/* #region 邮箱登录 */

const loginFormData = reactive({
    email: "",
    password: "",
});

function checkForm() {
    const { email, password } = loginFormData;
    Object.keys(formErrorTip).forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        formErrorTip[k] = "";
    });

    formErrorTip.email = emailVerify(email);
    if (formErrorTip.email) {
        formErrorTip.email = i18n.t(formErrorTip.email);
        return false;
    }
    if (emptyCheck(password)) {
        formErrorTip.password = i18n.t("KEY_LOGIN_PANEL.TIP.0");
        return false;
    }

    return true;
}

function login() {
    const isOk = checkForm();
    if (isOk) {
        UserLoginEmail({
            email: loginFormData.email,
            userpwd: loginFormData.password,
            isLong: saveLoginState.value ? 1 : 0,
        }).then((res) => {
            switch (res.statusCode) {
                case 0:
                    {
                        $cookies.set(
                            "UserToken",
                            res.data.userToken,
                            saveLoginState.value
                                ? { maxAge: 60 * 60 * 24 * 7, path: "/" }
                                : { path: "/" }
                        );
                        if (
                            typeof route.value.query.redirect === "string" &&
                            !/^http/.test(route.value.query.redirect)
                        ) {
                            router.push(route.value.query.redirect);
                        } else {
                            router.push(app.localePath(linkManage.index));
                        }
                    }
                    break;

                default:
                    break;
            }
        });
    }
}

/* #endregion */

/* #region 手机号登录 */

const mobileLoginFormData = reactive({
    mobile: {
        dialCode: "",
        number: "",
    },
    password: "",
});
const telInput = ref<any>();

function checkMobileForm() {
    const { password } = mobileLoginFormData;
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

    if (emptyCheck(password)) {
        formErrorTip.password = i18n.t("KEY_LOGIN_PANEL.TIP.0");
        return false;
    }

    return true;
}
function mobileLogin() {
    const isOk = checkMobileForm();
    if (isOk) {
        UserLoginMobile({
            mobile: mobileLoginFormData.mobile.number,
            mobileCode: mobileLoginFormData.mobile.dialCode,
            userpwd: mobileLoginFormData.password,
            isLong: saveLoginState.value ? 1 : 0,
        }).then((res) => {
            switch (res.statusCode) {
                case 0:
                    $cookies.set(
                        "UserToken",
                        res.data.userToken,
                        saveLoginState.value
                            ? { maxAge: 60 * 60 * 24 * 7, path: "/" }
                            : { path: "/" }
                    );
                    router.push(app.localePath(linkManage.index));
                    break;

                default:
                    break;
            }
        });
    }
}

/* #endregion */
</script>
<style lang="scss" module>
.login-panel {
    box-sizing: content-box;
    width: 374px;
    padding: 30px 20px;

    background-color: #fff;
    .panel-head {
        margin-bottom: 20px;
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
}
.login-method-tab {
    margin-bottom: 23px;
    padding-bottom: 7px;

    border-bottom: 1px solid #f7f9fa;
    .btn {
        @include space-between(30px);
        font-size: 14px;
        font-weight: 400;
        line-height: em(24px, 14px);

        position: relative;

        transition: 0.26s ease;

        color: #808389;
        &::after {
            position: absolute;
            right: 0;
            bottom: -8px;
            left: 0;

            width: 40%;
            height: 2px;
            margin: 0 auto;

            content: "";
            transition: 0.26s ease;

            opacity: 0;
            background-color: #f8af00;
        }
        &[data-active] {
            &::after {
                width: 100%;

                opacity: 1;
            }
        }
        &:hover,
        &[data-active] {
            color: #2d2b32;
        }
    }
    @include media-breakpoint-down(sm) {
        .btn {
            font-size: 13px;
        }
    }
}
.login-form {
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
.checkbox-option {
    font-size: 13px;
    line-height: 140%;

    color: #777;
    input[type="checkbox"] {
        @include hide;
        &:checked {
            & + .checkbox-box {
                border-color: #2a85ff;
                background-color: #2a85ff;
            }
            & + .checkbox-box::after {
                opacity: 1;
            }
        }
    }
    .checkbox-box {
        position: relative;

        width: 18px;
        height: 18px;
        margin-right: 8px;

        transition: 0.1s ease;

        border: 1px solid rgba(#6f767e, 0.3);
        border-radius: 4px;
        &::after {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            content: "";

            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABESURBVHgBjY/BDQAgCANhA0Zxc0dwBEdxBOxD+QipTRpCuUBQIXJ3QzH9gIYwCJ7wgtsNezQVdAYRllCyIYfoOfLpow3yHWkpTycOKwAAAABJRU5ErkJggg==");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 10px;
        }
    }
}
</style>
