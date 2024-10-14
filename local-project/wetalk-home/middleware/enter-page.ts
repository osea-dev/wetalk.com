/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-12-29 15:05:20
 */
import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import MobileDetect from "mobile-detect";
import linkManage from "~/assets/script/local-data/link-manage";

export default defineNuxtMiddleware(
    ({ req, app, route, $cookies, redirect }) => {
        const userAgent = req
            ? req.headers["user-agent"] || ""
            : navigator.userAgent || "";

        const md = new MobileDetect(userAgent);

        /**
         * 更新 ignore-welcome
         */
        if (String($cookies.get("ignore-welcome")) === "1") {
            $cookies.set("ignore-welcome", "1", {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        if (md.mobile()) {
            if (route.path === app.localePath(linkManage.welcome)) {
                return redirect(app.localePath(linkManage.index));
            }
        } else if (
            route.path === app.localePath(linkManage.index) &&
            String($cookies.get("ignore-welcome")) != "1"
        ) {
            return redirect(app.localePath(linkManage.welcome));
        }
    }
);
