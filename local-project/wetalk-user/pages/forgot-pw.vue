<template>
    <main
        :class="$style['forgot-pw-body']"
        class="flex items-center justify-center"
    >
        <div :class="$style['main-panel']">
            <div :class="$style['forgot-pw-panel']" v-if="!sendEmail">
                <div :class="$style['panel-head']">
                    <div :class="$style['panel-title']">
                        <span class="text">{{
                            $t("KEY_FORGOT_PANEL.TITLE")
                        }}</span>
                    </div>
                    <div :class="$style['panel-subtitle']">
                        <span class="text">
                            {{ $t("KEY_FORGOT_PANEL.SUBTITLE") }}
                        </span>
                    </div>
                </div>
                <div :class="$style['panel-body']">
                    <section :class="$style['forgot-pw-form']">
                        <FormRow :errorMsg="formErrorTip.email">
                            <FormInput
                                :placeholder="$t('KEY_BASE.EMAIL_PLACEHOLDER')"
                                v-model="forgotPWForm.email"
                                :errorMsg="formErrorTip.email"
                                name="email"
                            />
                        </FormRow>
                        <FormRow :class="[$style['submit-row']]">
                            <FormSubmitBtn
                                @submit="submit"
                                :text="$t('KEY_BASE.CONFIRM')"
                            />
                        </FormRow>
                    </section>
                </div>
            </div>
            <div :class="$style['forgot-confirm-panel']" v-else>
                <div :class="$style['panel-head']">
                    <div :class="$style['panel-title']">
                        <span class="text">{{
                            $t("KEY_FORGOT_PANEL.CONFIRM_TITLE")
                        }}</span>
                    </div>
                    <div :class="$style['panel-subtitle']">
                        <span class="text"
                            >{{
                                $t("KEY_FORGOT_PANEL.CONFIRM_SUBTITLE", [
                                    forgotPWForm.email,
                                ])
                            }}
                        </span>
                    </div>
                </div>
                <div :class="$style['panel-body']">
                    <h3>{{ $t("KEY_FORGOT_PANEL.TIP.TITLE") }}</h3>
                    <ul>
                        <li>
                            <span class="text">{{
                                $t("KEY_FORGOT_PANEL.TIP.MESSAGE.0")
                            }}</span>
                        </li>
                        <li>
                            <button
                                :class="$style['resent-email']"
                                @click="submit"
                                :data-disable="emailWaitingTime > 0"
                            >
                                {{ $t("KEY_FORGOT_PANEL.TIP.MESSAGE.1") }}
                                <span v-if="emailWaitingTime > 0"
                                    >（{{ emailWaitingTime }}s）
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div :class="$style['ic-email']">
                    <img src="@/assets/images/login/email.png" alt="" />
                </div>
            </div>
        </div>
    </main>
</template>
<script lang="ts">
import {
    defineComponent,
    onBeforeUnmount,
    reactive,
    ref,
    useContext,
} from "@nuxtjs/composition-api";
import FormRow from "@/components/form/Row.vue";
import FormInput from "@/components/form/Input.vue";
import FormSubmitBtn from "@/components/form/SubmitBtn.vue";
import { ForgetPwd } from "@/assets/script/api/api";
import { emailVerify } from "@wetalk/wetalk-assets";

export default defineComponent({
    components: {
        FormRow,
        FormInput,
        FormSubmitBtn,
    },
    layout: "simple-deep",
    setup() {
        const emailWaitingTime = ref<number>(0);
        const sendEmail = ref<boolean>(false);
        const { i18n } = useContext();

        const forgotPWForm = reactive({
            email: "",
        });
        const formErrorTip = reactive({
            email: "",
        });
        function checkForm() {
            const { email } = forgotPWForm;
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

            return true;
        }

        let waiting = false;
        function submit() {
            if (emailWaitingTime.value > 0) {
                return;
            }
            const isOk = checkForm();
            if (!isOk) return;
            if (waiting) return;
            waiting = true;
            ForgetPwd({
                email: forgotPWForm.email,
            })
                .then((res) => {
                    switch (res.statusCode) {
                        case 0:
                            recordEmailTime();
                            sendEmail.value = true;
                            break;

                        default:
                            break;
                    }
                })
                .finally(() => {
                    waiting = false;
                });
        }

        let intervalTimer: NodeJS.Timer;
        function recordEmailTime() {
            emailWaitingTime.value = 60;
            intervalTimer = setInterval(() => {
                if (emailWaitingTime.value > 0) {
                    emailWaitingTime.value -= 1;
                } else {
                    clearInterval(intervalTimer);
                }
            }, 1000);
        }
        onBeforeUnmount(() => {
            clearInterval(intervalTimer);
        });

        return {
            formErrorTip,
            forgotPWForm,
            sendEmail,
            emailWaitingTime,
            submit,
        };
    },
});
</script>
<style lang="scss" module>
.forgot-pw-body {
    width: 100%;
    height: w-h(100);
    .main-panel {
        box-sizing: content-box;
        width: 580px;
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
.forgot-pw-panel {
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
        line-height: em(26px, 13px);

        padding: 3px 0;

        color: #777e91;
    }
    .submit-row {
        margin-top: 50px;
    }
    @include media-breakpoint-down(md) {
        .submit-row {
            margin-top: 30px;
        }
    }
}
.forgot-confirm-panel {
    position: relative;
    .panel-head {
        margin-bottom: 43px;
    }
    .panel-title {
        font-size: 26px;
        line-height: em(45px, 26px);

        color: #23262f;
    }
    .panel-subtitle {
        font-size: 15px;
        font-weight: 500;
        line-height: em(32px, 15px);

        max-width: 500px;

        color: #2d2b32;
    }
    .panel-body {
        padding-bottom: 5px;
        h3 {
            font-size: 18px;
            font-weight: 700;
            line-height: 200%;

            margin-bottom: 7px;

            color: #2d2b32;
        }
        ul {
            font-size: 13px;
            line-height: em(30px, 13px);

            color: #777;
            li {
                position: relative;

                padding-left: 14px;
                &::before {
                    @include circle(5px, #d9d9d9);
                    position: absolute;
                    top: 50%;
                    left: 3px;

                    margin-top: -2px;

                    content: "";
                }
            }
            .resent-email {
                color: #3b71fe;
                &[data-disable] {
                    cursor: not-allowed;

                    color: #777;
                }
            }
        }
    }
    .ic-email {
        @include image-placeholder(160px, 160px);
        position: absolute;
        right: 0;
        bottom: 0;
    }
    @include media-breakpoint-down(md) {
        .ic-email {
            display: none;
        }
    }
}
</style>
