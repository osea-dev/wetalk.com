import Vue from "vue";
import sha1 from "crypto-js/sha1";
import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import { setAxiosInstance } from "@/assets/script/api/api.instance";

export default defineNuxtPlugin(
    ({ app, $axios, $cookies, req, error: nuxtError }) => {
        setAxiosInstance($axios);

        $axios.interceptors.request.use((config) => {
            if (config.method) {
                if (process.server) {
                    config.headers["X-Real-Ip"] =
                        req.headers["X-Real-Ip"] || "";
                }
                config.headers["X-CurrencyCode"] =
                    $cookies.get("CurrencyCode") || "";
                config.headers["X-UserToken"] = $cookies.get("UserToken") || "";
                config.headers["X-UtcSec"] = new Date().getTimezoneOffset();
                config.headers["X-Utc"] =
                    Intl.DateTimeFormat().resolvedOptions().timeZone;
                config.headers["Accept-Language"] =
                    app.i18n.locale || $cookies.get("Accept-Language") || "";
                const t = +new Date();
                let info = "5c8a0c67bcafe3c9" + t + config.url;

                if (config.data) {
                    info += JSON.stringify(config.data || "");
                }
                const Sign = sha1(info.toLowerCase()).toString();
                config.url += `?Timestamp=${t}&Sign=${Sign}`;
            }
            return Promise.resolve(config);
        });

        $axios.interceptors.response.use(
            function (response) {
                const statusCode = response.data?.statusCode;
                switch (statusCode) {
                    case 0:
                        break;
                    case 4001:
                        break;
                    case 4012:
                        console.error(response.data?.message);
                        break;
                    default:
                        {
                            if (process.client) {
                                Vue.notify?.({
                                    group: "form-notice",
                                    title: response.data?.message || "",
                                    type: "error",
                                    duration: 3000,
                                });
                            }
                        }
                        break;
                }
                return Promise.resolve(response.data || { data: {} });
            },
            function (error) {
                // if (process.client) {
                //     alert("出现未知问题，请稍后重试，或联系客服。");
                // }
                return Promise.reject(error);
            }
        );

        $axios.onError((err) => {
            console.log("err:", err);
            nuxtError({
                statusCode: 500,
            });
            return Promise.resolve({});
        });
    }
);
