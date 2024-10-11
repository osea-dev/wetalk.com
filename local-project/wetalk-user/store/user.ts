/*
 * @Description: 用户信息状态管理
 * @Author: F-Stone
 * @LastEditTime: 2022-12-02 18:06:59
 */

import type { TYPE_STUDENT_INFO } from "@/assets/script/api/api";
import { defineStore } from "pinia";

export type TYPE_USER_STORE = {
    // -1 未检测
    // 0 检测未完成
    // 1 检测已完成
    userInfoStatus: -1 | 0 | 1;
    userInfo: TYPE_STUDENT_INFO | null;
};
export const useUserStore = defineStore("user", {
    state: (): TYPE_USER_STORE => ({
        userInfoStatus: -1,
        userInfo: null,
    }),

    // optional actions
    actions: {
        updateUserInfoStatus(state: TYPE_USER_STORE["userInfoStatus"]) {
            this.userInfoStatus = state;
        },
        updateUserInfo(state: TYPE_STUDENT_INFO) {
            this.userInfo = state;
        },
    },
});
