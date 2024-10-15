import { axiosInstances } from "./api.instance";
import type { TYPE_NEWS_LIST, TYPE_COURSE } from "@/assets/script/api/api";

export type TYPE_LANG_LIST = {
    languageid: number;
    title: string;
    lang: string;
}[];
export function getLangList() {
    return axiosInstances.app.post<TYPE_LANG_LIST>("/Api/V1/Common/LangList");
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

type TYPE_SEARCH_RESULT = {
    courses: TYPE_COURSE[];
    newss: TYPE_NEWS_LIST["list"];
};

export function getSearchList(data: { key: string }) {
    return axiosInstances.app.post<TYPE_SEARCH_RESULT>(
        "/Api/V1/News/SearchList",
        data
    );
}

export function postLogout() {
    return axiosInstances.app.post("/Api/V1/UserLogin/Logout");
}

export type TYPE_BANNER = {
    adid: number;
    img: string;
    url: string;
    title: string;
}[];

export function getBanner(data: { type: "teachers_banner" }) {
    return axiosInstances.app.post<TYPE_BANNER>("/Api/V1/AD/BannerList", data);
}

export type TYPE_SINGLE_AD = {
    adid: number;
    img: string;
    url: string;
    title: string;
};

export function getSingleAD(data: { type: "teachers_img" }) {
    return axiosInstances.app.post<TYPE_SINGLE_AD>("/Api/V1/AD/SingleAD", data);
}

/**
 * 获取标签
 *
 * @export
 * @param {{ type: "teachers_img" }} data
    sty*	integer($int32)
    标签类型:0关键词，1课程标签，2课节取消原因，3订单取消原因，4短视频标签，5录播课标签，6直播课标签，7线下课标签
 * @return {*}
 */
export function getTagsList(data: { sty: number }) {
    return axiosInstances.app.post<TYPE_TAGS[]>(
        "/Api/V1/Common/TagsList",
        data
    );
}
export type TYPE_TAGS = {
    tag: string;
};
