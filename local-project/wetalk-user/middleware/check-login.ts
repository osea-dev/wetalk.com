import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { CheckIsLogin } from "@/assets/script/api/api";

export default defineNuxtMiddleware(({ redirect, app }) => {
    return CheckIsLogin().then((res) => {
        if (res && res.statusCode === 0) {
            if (res.data.status == 1) {
                return redirect(app.localePath("/"));
            }
        }
    });
});
