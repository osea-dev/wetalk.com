/*
 * @Description: 新闻模块相关接口
 * @Author: F-Stone
 * @LastEditTime: 2022-11-28 17:11:21
 */
import { axiosInstances } from "./api.instance";

export type TYPE_CATEGORY_LIST = {
    newsCategoryid: number;
    title: string;
    total: number;
}[];

export function getNewsCategoryList() {
    return axiosInstances.app.post<TYPE_CATEGORY_LIST>(
        "/Api/V1/News/NewsCategoryList"
    );
}

export type TYPE_NEWS_LIST = {
    total: number;
    list: {
        video?: string;
        newsid: number;
        img: string;
        title: string;
        url: string;
        message: string;
        sendtime: number;
    }[];
};
export function getNewsList(
    data: Partial<{
        newsCategoryid: number;
        key: string;
        page: number;
        pageSize: number;
    }>
) {
    return axiosInstances.app.post<TYPE_NEWS_LIST>(
        "/Api/V1/News/NewsList",
        data
    );
}

export type TYPE_NEW_DETAIL = {
    newsid: number;
    title: string;
    video: string;
    source: string;
    intro: string;
    sendtime: number;
    keys: string[];
    backNews?: {
        newsid: number;
        title: string;
        url: string;
    };
    nextNews?: {
        newsid: number;
        title: string;
        url: string;
    };
    relations: {
        video?: string;
        newsid: number;
        title: string;
        url: string;
        img: string;
        message: string;
        sendtime: number;
    }[];
};

export function getNewsDetail(data: { newsid: string }) {
    return axiosInstances.app.post<TYPE_NEW_DETAIL>(
        "/Api/V1/News/NewsDetail",
        data
    );
}
