<template>
    <div
        :class="$style['reset-pw-body']"
        class="flex items-center justify-center"
    >
        <div :class="$style['main-panel']">
            <div :class="$style['reset-pw-panel']" v-if="!resetPWDown">
                <div :class="$style['panel-head']">
                    <div :class="$style['panel-title']">
                        <span class="text">{{
                            $t("KEY_RESET_PW_PANEL.TITLE")
                        }}</span>
                    </div>
                    <div :class="$style['panel-subtitle']" v-if="email">
                        <span class="text">
                            {{ $t("KEY_RESET_PW_PANEL.TIP.3", [email]) }}
                        </span>
                    </div>
                </div>
                <div :class="$style['panel-body']">
                    <h3>{{ $t("KEY_BASE.NEW_PW") }}</h3>
                    <section :class="$style['forgot-pw-form']">
                        <FormRow :errorMsg="formErrorTip.newPw">
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
                            <FormSubmitBtn
                                @submit="submit"
                                :text="$t('KEY_BASE.SUBMIT')"
                            />
                        </FormRow>
                    </section>
                </div>
            </div>
            <div :class="$style['reset-confirm-panel']" v-else>
                <div :class="$style['panel-body']">
                    <div :class="$style['confirm-icon']">
                        <img src="@/assets/images/confirm-icon.png" alt="" />
                    </div>
                    <h3 class="text-center">
                        {{ $t("KEY_RESET_PW_PANEL.TIP.4") }}
                    </h3>
                    <Link :class="$style['btn']" :to="linkManage.login">
                        {{ $t("KEY_RESET_PW_PANEL.LOGIN") }}
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    reactive,
    ref,
    useContext,
    useFetch,
    useRoute,
} from "@nuxtjs/composition-api";
import { ResetPwd, Email } from "@/assets/script/api/api";
import linkManage from "~/assets/script/local-data/link-manage";

export default defineComponent({
    layout: "simple-deep",
    setup() {
        const { i18n } = useContext();
        const resetPWDown = ref<boolean>(false);
        const email = ref<string>("");
        const resetPWForm = reactive({
            newPw: "",
            confirmPw: "",
        });
        const formErrorTip = reactive({
            newPw: "",
            confirmPw: "",
        });

        function checkForm() {
            const { newPw, confirmPw } = resetPWForm;
            Object.keys(formErrorTip).forEach((k) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                formErrorTip[k] = "";
            });

            if (!/.+/.test(newPw)) {
                formErrorTip.newPw = i18n.t("KEY_LOGIN_PANEL.TIP.0");
                return false;
            }

            if (!/.+/.test(confirmPw)) {
                formErrorTip.confirmPw = i18n.t("KEY_LOGIN_PANEL.TIP.0");
                return false;
            }

            if (confirmPw !== newPw) {
                formErrorTip.confirmPw = i18n.t("KEY_RESET_PW_PANEL.TIP.2");
                return false;
            }

            return true;
        }

        const route = useRoute();
        const code = route.value.params.code;

        function submit() {
            const isOk = checkForm();
            if (isOk) {
                ResetPwd({
                    code,
                    pwd: resetPWForm.newPw,
                    pwd1: resetPWForm.confirmPw,
                }).then((res) => {
                    if (res.statusCode === 0) {
                        resetPWDown.value = true;
                    }
                });
            }
        }

        useFetch(async () => {
            await Email({ code }).then((res) => {
                if (res.statusCode === 0) {
                    email.value = res.data.email;
                }
            });
        });

        return {
            email,
            resetPWForm,
            formErrorTip,
            resetPWDown,
            linkManage,
            submit,
        };
    },
});
</script>
<style lang="scss" module>
.reset-pw-body {
    width: 100%;
    height: w-h(100);
    .main-panel {
        width: 720px;
        padding: 70px;

        border-radius: 16px;
        background-color: #fff;
        box-shadow: 0 20px 60px -6px rgb(40 40 40 / 0.08);
    }
    @include media-breakpoint-down(md) {
        .main-panel {
            box-sizing: border-box;
            max-width: 92%;
            padding: 30px 30px 40px;
        }
    }
}
.reset-pw-panel {
    .panel-head {
        margin-bottom: 24px;
    }
    .panel-title {
        font-size: 26px;
        font-weight: 700;
        line-height: em(39px, 26px);

        color: #23262f;
    }
    .panel-subtitle {
        font-size: 13px;
        line-height: em(32px, 13px);

        color: #777e91;
    }
    .panel-body {
        h3 {
            font-size: 16px;
            line-height: em(24px, 16px);

            margin-bottom: 16px;
        }
    }
    .submit-row {
        margin-top: 30px;
    }
}
.reset-confirm-panel {
    h3 {
        font-size: 26px;
        font-weight: 700;
        line-height: em(45px, 26px);

        margin-top: 20px;

        color: #23262f;
    }
    .confirm-icon {
        @include image-placeholder(140px, 140px);
        margin: 0 auto;
    }
    .btn {
        font-size: 16px;
        font-weight: 700;
        font-weight: normal;
        line-height: em(24px, 16px);

        width: 100%;
        margin-top: 68px;
        padding: 12px 20px;

        text-align: center;

        color: #fff;
        border-radius: 6px;
        background: #3b71fe;
    }
    @include media-breakpoint-down(md) {
        h3 {
            font-size: 20px;
        }
        .confirm-icon {
            @include image-placeholder(90px, 90px);
        }
        .btn {
            margin-top: 30px;
        }
    }
}
</style>
