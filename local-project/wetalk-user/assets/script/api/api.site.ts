import { axiosInstances } from "./api.instance";

export function CheckStatus() {
    return axiosInstances.app.post<{
        userToken: string;
        firstName: string;
        lastName: string;
        // 0未完善资料，1正常
        status: 0 | 1;
    }>("/Api/V1/UserLogin/CheckStatus");
}

export function SendSms(data: { mobileCode: string; mobile: string }) {
    return axiosInstances.app.post("/Api/V1/UserLogin/SendSms", data);
}

export type TYPE_TIME_ZONE = {
    countryCode: string;
    countryName: string;
    timeZones: {
        timezoneName: string;
        timezoneid: number;
        utcSec: number;
    }[];
}[];
export function getTimezoneList() {
    return axiosInstances.app.post<TYPE_TIME_ZONE>(
        "/Api/V1/Common/TimezoneList"
    );
}

export type TYPE_COUNTRY_LIST = {
    countryid: number;
    code: string;
    number: number;
    country: string;
    countryEn: string;
}[];
export function getCountryList() {
    return axiosInstances.app.post<TYPE_COUNTRY_LIST>(
        "/Api/V1/Common/CountryList"
    );
}

export type TYPE_LANG_LIST = {
    languageid: number;
    title: string;
    lang: string;
}[];
export function getLangList() {
    return axiosInstances.app.post<TYPE_LANG_LIST>("/Api/V1/Common/LangList");
}

export function postLogout() {
    return axiosInstances.app.post("/Api/V1/UserLogin/Logout");
}

export type TYPE_CURRENCY_LIST = {
    currencyid: number;
    countryCode: string;
    currencyCode: string;
    country: string;
    ico: string;
    currency: string;
    isDefault: number;
}[];
export function getCurrencyList() {
    return axiosInstances.app.post<TYPE_CURRENCY_LIST>(
        "/Api/V1/Common/CurrencyList"
    );
}
