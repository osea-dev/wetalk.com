import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { CheckStatus, getStudentInfo } from "@/assets/script/api/api";
import { useUserStore } from "@/store/user";

export default defineNuxtMiddleware(({ $pinia, route, redirect, app }) => {
    const userStore = useUserStore($pinia);
    function checkUserInfo() {
        if (
            userStore.userInfoStatus === 0 &&
            route.path !== app.localePath("/")
        ) {
            return redirect(app.localePath("/"));
        } else if (userStore.userInfoStatus === 1) {
            return getStudentInfo().then((res) => {
                userStore.updateUserInfo(res.data);
            });
        }
    }
    if (userStore.userInfoStatus === -1) {
        return CheckStatus().then((res) => {
            if (res && res.statusCode === 0) {
                userStore.updateUserInfoStatus(res.data.status);
                return checkUserInfo();
            }
        });
    } else {
        return checkUserInfo();
    }
});
