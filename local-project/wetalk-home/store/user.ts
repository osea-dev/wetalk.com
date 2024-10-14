/*
 * @Description: 用户信息状态管理
 * @Author: F-Stone
 * @LastEditTime: 2022-12-02 18:06:59
 */

import type { TYPE_STUDENT_INFO } from "@/assets/script/api/api";
import { defineStore } from "pinia";

export type TYPE_USER_STORE = {
    userInfo: TYPE_STUDENT_INFO | null;
};
export const useUserStore = defineStore("user", {
    state: (): TYPE_USER_STORE => ({
        userInfo: null,
    }),

    // optional actions
    actions: {
        updateUserInfo(state: TYPE_STUDENT_INFO) {
            this.userInfo = state;
        },
    },
});
