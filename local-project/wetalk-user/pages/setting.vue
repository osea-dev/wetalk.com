<template>
    <div :class="$style['user-setting']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['module-body']">
                    <div class="state-pos--left" :class="$style['left-area']">
                        <div :class="$style['layer--sticky']">
                            <div :class="$style['side-panel']">
                                <div
                                    :class="$style['nav-list']"
                                    class="lg:grid lg:grid-cols-2 lg:gap-3"
                                >
                                    <div
                                        :class="$style['list-item']"
                                        class="flex-auto"
                                        @click="showPanel = 'info'"
                                        :data-active="showPanel === 'info'"
                                    >
                                        <span class="text">{{
                                            $t("KEY_SETTING_PANEL.TITLE")
                                        }}</span>
                                    </div>
                                    <div
                                        :class="$style['list-item']"
                                        class="flex-auto"
                                        @click="showPanel = 'setting'"
                                        :data-active="showPanel === 'setting'"
                                    >
                                        <span class="text">{{
                                            $t("KEY_BASE.GENERAL_SETTING")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <div :class="$style['active-icon']"></div>
                        </div>
                    </div>
                    <div class="state-pos--right" v-if="showPanel === 'info'">
                        <div :class="$style['user-info-panel']">
                            <div
                                :class="$style['panel-head']"
                                class="flex items-start justify-between"
                            >
                                <UserAvatar :class="$style['user-avatar']" />
                                <button
                                    class="sm:hidden"
                                    :class="$style['btn--editor']"
                                    @click="openUserSetting"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.EDITOR")
                                    }}</span>
                                </button>
                            </div>
                            <div :class="$style['info-list']">
                                <div
                                    :class="$style['info-item']"
                                    class="flex"
                                    v-for="(item, index) in userBaseInfo"
                                    :key="index"
                                >
                                    <div :class="$style['item-title']">
                                        <span class="text">
                                            {{ item.title }}
                                        </span>
                                    </div>
                                    <div
                                        :class="$style['item-value']"
                                        class="flex-auto"
                                    >
                                        <span class="text">{{
                                            item.value ||
                                            $t("KEY_BASE.EMPTY_VALUE")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="hidden sm:block sm:w-full mt-6"
                                :class="$style['btn--editor']"
                                @click="openUserSetting"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.EDITOR")
                                }}</span>
                            </button>
                        </div>
                        <div
                            :class="$style['family-info-panel']"
                            v-if="age <= 16"
                        >
                            <div
                                :class="$style['panel-head']"
                                class="flex justify-between items-start"
                            >
                                <div :class="$style['panel-title']">
                                    <span class="text">{{
                                        $t("KEY_BASE.FAMILY_INFO")
                                    }}</span>
                                </div>
                                <button
                                    class="sm:hidden"
                                    :class="$style['btn--editor']"
                                    @click="openGuardianSetting"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.EDITOR")
                                    }}</span>
                                </button>
                            </div>
                            <div :class="$style['info-list']">
                                <div
                                    :class="$style['info-item']"
                                    class="flex"
                                    v-for="(item, index) in familyInfo"
                                    :key="index"
                                >
                                    <div :class="$style['item-title']">
                                        <span class="text">
                                            {{ item.title }}
                                        </span>
                                    </div>
                                    <div :class="$style['item-value']">
                                        <span class="text">{{
                                            item.value ||
                                            $t("KEY_BASE.EMPTY_VALUE")
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="hidden sm:block sm:w-full mt-6"
                                :class="$style['btn--editor']"
                                @click="openGuardianSetting"
                            >
                                <span class="text">{{
                                    $t("KEY_BASE.EDITOR")
                                }}</span>
                            </button>
                        </div>
                    </div>
                    <div
                        class="state-pos--right"
                        v-if="showPanel === 'setting'"
                    >
                        <div :class="$style['user-setting-panel']">
                            <div
                                :class="$style['panel-head']"
                                class="flex items-start justify-between relative z-10"
                            >
                                <div></div>
                                <button
                                    class="sm:hidden"
                                    :class="$style['btn--editor']"
                                    @click="openBaseSetting"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.EDITOR")
                                    }}</span>
                                </button>
                            </div>
                            <div :class="$style['info-list']">
                                <div
                                    :class="$style['info-item']"
                                    class="flex"
                                    v-for="(item, index) in userSetting"
                                    :key="index"
                                >
                                    <div :class="$style['item-title']">
                                        <span class="text">
                                            {{ item.title }}
                                        </span>
                                    </div>
                                    <div
                                        :class="$style['item-value']"
                                        class="flex-auto"
                                    >
                                        <span class="text">{{
                                            item.value ||
                                            $t("KEY_BASE.EMPTY_VALUE")
                                        }}</span>
                                    </div>
                                </div>
                                <button
                                    class="hidden sm:block sm:w-full mt-6"
                                    :class="$style['btn--editor']"
                                    @click="openBaseSetting"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.EDITOR")
                                    }}</span>
                                </button>
                                <div :class="$style['divide-line']"></div>
                                <div
                                    :class="$style['info-item']"
                                    class="flex justify-between items-center sm:block"
                                >
                                    <div class="flex items-center">
                                        <div :class="$style['item-title']">
                                            <span class="text">{{
                                                $t("KEY_BASE.PASSWORD")
                                            }}</span>
                                        </div>
                                        <div :class="$style['item-value']">
                                            <span class="text">****</span>
                                        </div>
                                    </div>

                                    <button
                                        class="sm:block sm:w-full mt-6"
                                        :class="$style['btn--editor']"
                                        @click="openPwPanel"
                                    >
                                        <span class="text">{{
                                            $t("KEY_BASE.EDITOR")
                                        }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useContext } from "@nuxtjs/composition-api";
import Vue, { computed, getCurrentInstance, ref } from "vue";
import UserSettingPanel from "@/components/dialog-panel/UserSettingPanel.vue";
import GuardianPanel from "@/components/dialog-panel/GuardianPanel.vue";
import BaseSettingPanel from "@/components/dialog-panel/BaseSettingPanel.vue";
import ResetPwPanel from "@/components/dialog-panel/ResetPwPanel.vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { getUtcTime } from "@/assets/script/util/get-utc-time";
import { getStudentInfo } from "@/assets/script/api/api";
import { getDifferenceInYears } from "@/assets/script/util/date";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { $dialog, i18n } = useContext();

const showPanel = ref<"info" | "setting">("info");

const userBaseInfo = computed(() => ({
    name: {
        title: i18n.t("KEY_BASE.NAME"),
        value: userInfo.value?.firstName + " " + userInfo.value?.lastName,
    },
    birthday: {
        title: i18n.t("KEY_BASE.BIRTHDAY"),
        value: userInfo.value?.birthdate,
    },
    gender: {
        title: i18n.t("KEY_BASE.GENDER"),
        value:
            userInfo.value?.gender === 0
                ? i18n.t("KEY_BASE.girl")
                : i18n.t("KEY_BASE.BOY"),
    },
    from: {
        title: i18n.t("KEY_BASE.BIRTHPLACE"),
        value: userInfo.value?.native,
    },
    location: {
        title: i18n.t("KEY_BASE.LOCAL"),
        value: userInfo.value?.timezone.country,
    },
    utc: {
        title: i18n.t("KEY_BASE.UTC"),
        value: `${userInfo.value?.timezone.timezoneName} (${getUtcTime(
            new Date(),
            userInfo.value?.timezone.timezoneName,
            "'UTC'xxx"
        )})`,
    },
    culture: {
        title: i18n.t("KEY_BASE.CULTURE"),
        value: userInfo.value?.education,
    },
}));

const familyInfo = computed(() => ({
    name: {
        title: i18n.t("KEY_GUARDIAN_PANEL.FORM.1"),
        value: userInfo.value?.guardianName,
    },
    tel: {
        title: i18n.t("KEY_GUARDIAN_PANEL.FORM.5"),
        value: userInfo.value?.guardianMobile
            ? `+${userInfo.value?.guardianMobileCode} ${userInfo.value?.guardianMobile}`
            : "",
    },
    rel: {
        title: i18n.t("KEY_GUARDIAN_PANEL.FORM.4"),
        value: userInfo.value?.guardianshipFee,
    },
}));

const userSetting = computed(() => ({
    email: {
        title: i18n.t("KEY_BASE.EMAIL2"),
        value: userInfo.value?.email,
    },
    tel: {
        title: i18n.t("KEY_BASE.PHONE_NUMBER2"),
        value: userInfo.value?.mobile
            ? `+${userInfo.value?.mobileCode} ${userInfo.value?.mobile}`
            : "",
    },
}));

const age = computed(() => {
    if (userInfo.value?.birthdate) {
        return getDifferenceInYears(
            new Date(),
            new Date(userInfo.value?.birthdate)
        );
    } else {
        return 0;
    }
});

const instance = getCurrentInstance();
function openUserSetting() {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(UserSettingPanel, {
            props: {
                userInfo: userInfo,
            },
            on: {
                submit() {
                    Vue.notify?.({
                        group: "form-notice",
                        title: i18n.t("KEY_BASE.TIP_MSG.9"),
                        type: "success",
                        duration: 2000,
                    });
                    getStudentInfo().then((res) => {
                        userStore.updateUserInfo(res.data);
                        dialog.close();
                    });
                },
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
function openGuardianSetting() {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(GuardianPanel, {
            props: {
                userInfo: userInfo,
            },
            on: {
                submit() {
                    Vue.notify?.({
                        group: "form-notice",
                        title: i18n.t("KEY_BASE.SUBMIT_SUC"),
                        type: "success",
                        duration: 2000,
                    });
                    getStudentInfo().then((res) => {
                        userStore.updateUserInfo(res.data);
                        dialog.close();
                    });
                },
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
function openBaseSetting() {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(BaseSettingPanel, {
            props: {
                userInfo: userInfo,
            },
            on: {
                submit() {
                    Vue.notify?.({
                        group: "form-notice",
                        title: i18n.t("KEY_BASE.SUBMIT_SUC"),
                        type: "success",
                        duration: 2000,
                    });
                    getStudentInfo().then((res) => {
                        userStore.updateUserInfo(res.data);
                        dialog.close();
                    });
                },
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
function openPwPanel() {
    if (!instance) return;
    const dialog = $dialog({
        type: "custom",
        parent: instance.proxy,
        container: instance.proxy.$createElement(ResetPwPanel, {
            on: {
                submit() {
                    Vue.notify?.({
                        group: "form-notice",
                        title: i18n.t("KEY_BASE.SUBMIT_SUC"),
                        type: "success",
                        duration: 2000,
                    });
                    dialog.close();
                },
                close() {
                    dialog.close();
                },
            },
        }),
    });
}
</script>
<style lang="scss" module>
.user-setting {
    .module-body {
        display: grid;

        gap: 15px;
        grid-template-columns: 340px auto;
        & > :global(.state-pos--left),
        & > :global(.state-pos--right) {
            display: flex;
            flex-direction: column;
            /* stylelint-disable-next-line selector-max-compound-selectors */
            & > * {
                @include space-between(15px, "y");
            }
        }
    }
    .layer--sticky {
        position: sticky;
        top: calc(var(--nav-h) + var(--y-space-normal));
        bottom: var(--y-space-normal);
        & > * {
            @include space-between(var(--panel-space-between), "y");
        }
    }
    @include media-breakpoint-down(xl) {
        .module-body {
            grid-template-columns: 280px auto;
        }
    }
    @include media-breakpoint-down(lg) {
        .module-body {
            display: block;
        }
    }
}
.side-panel {
    position: relative;

    border-radius: $panel-radius;
    background-color: #fff;
    .nav-list {
        font-size: 13px;
        line-height: em(20px, 13px);

        padding: 25px 15px;

        color: #777;
    }
    .list-item {
        @include space-between(10px, "y");
        position: relative;

        padding: 11px 15px;

        cursor: pointer;
        transition: 0.26s ease;

        border-radius: 6px;
        &:hover,
        &[data-active] {
            color: #333;
            background: #f5f6f9;
        }
        &[data-active] {
            &::after {
                opacity: 1;
            }
        }
        &::after {
            position: absolute;
            top: 50%;
            left: -15px;

            width: 4px;
            height: 16px;
            margin-top: -8px;

            content: "";

            opacity: 0;
            border-radius: 5px;
            background-color: #ff8a1b;
        }
    }
    @include media-breakpoint-down(lg) {
        padding: 25px 15px;
        .nav-list {
            padding: 0;

            border-radius: 6px;
            background: #f5f6f9;
        }
        .list-item {
            width: 100%;
            margin: 0;

            text-align: center;
            &[data-active] {
                &::before {
                    opacity: 1;
                }
            }
            span {
                position: relative;
                z-index: 10;
            }
            &::after {
                display: none;
            }
            &::before {
                position: absolute;
                top: 2px;
                right: 2px;
                bottom: 2px;
                left: 2px;

                content: "";
                transition: 0.26s ease;

                opacity: 0;
                border-radius: 6px;
                background-color: #fff;
            }
        }
    }
}
.user-setting-panel {
    .panel-head {
        height: 0;
    }
}
.user-setting-panel,
.family-info-panel,
.user-info-panel {
    padding: $panel-padding;

    border-radius: $panel-radius;
    background-color: #fff;
    .btn--editor {
        font-size: 13px;
        line-height: em(20px, 13px);

        padding: 9px 30px;

        color: #2d2b32;
        border-radius: 6px;
        background: #f5f6f9;
    }
    .panel-title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(30px, 20px);

        margin-bottom: 32px;

        color: #2d2b32;
    }
    .user-avatar {
        width: 130px;
        margin-bottom: 30px;
    }
    .info-item {
        @include space-between(calc(var(--p-normal) * 2.8), "y");
        .item-title {
            font-size: 13px;
            line-height: em(20px, 13px);

            flex: 0 0 auto;

            width: 100px;
            margin-right: 18px;

            color: #777;
        }
    }
    .divide-line {
        width: 100%;
        height: 1px;
        margin: 40px 0;

        background-color: rgb(0 0 0 / 0.05);
    }
    @include media-breakpoint-down(sm) {
        .user-avatar {
            width: 100px;
        }
    }
}
</style>
