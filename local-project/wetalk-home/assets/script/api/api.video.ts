/*
 * @Description: 视频接口管理
 * @Author: F-Stone
 * @LastEditTime: 2023-03-20 18:21:25
 */

import { axiosInstances } from "./api.instance";

export type TYPE_VIDEO_ITEM = {
    shortVideoid: number;
    img: string;
    title: string;
    message: string;
    keys: string[];
};

export function getShortVideoList(data: {
    sortType: "hot" | "views" | "";
    key: string;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<{
        total: number;
        list: TYPE_VIDEO_ITEM[];
    }>("/Api/V1/ShortVideo/VideoList", data);
}

export type TYPE_VIDEO_DETAIL = {
    shortVideoid: number;
    img: string;
    title: string;
    message: string;
    keys: string[];
    video: string;
    hits: number;
    backShortVideoid: number;
    nextShortVideoid: number;
};

export function getShortVideoDetail(data: { shortVideoid: number }) {
    return axiosInstances.app.post<TYPE_VIDEO_DETAIL>(
        "/Api/V1/ShortVideo/VideoDetail",
        data
    );
}
// 录播课相关接口
export type TYPE_RECORD_COURSE_ITEM = {
    recordCourseid: number;
    img: string;
    title: string;
    message: string;
    ico: string;
    marketPrice: number;
    price: number;
    keys: string[];
    lessonCount: number;
    studentCount: number;
};

/**
 * 获取录播课列表
 * @param data
 * @returns
 */
export function getRecordCourseList(data: {
    key: string;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<{
        total: number;
        list: TYPE_VIDEO_ITEM[];
    }>("/Api/V1/RecordCourse/CourseList", data);
}

export type TYPE_RECORD_COURSE_DETAIL = {
    recordCourseid: number;
    banner: string;
    bannerH5: string;
    img: string;
    title: string;
    message: string;
    keys: string[];
    currencyCode: string;
    currencyIco: string;
    marketPrice: number;
    price: number;
    discount: string;
    studentCount: number;
    lessonCount: number;
    introUp: string;
    introLow: string;
    videos: {
        title: string;
        duration: string;
        viewCount: number;
    }[];
};

export function getRecordCourseDetail(data: { recordCourseid: string }) {
    return axiosInstances.app.post<TYPE_RECORD_COURSE_DETAIL>(
        "/Api/V1/RecordCourse/CourseDetail",
        data
    );
}

// 直播课
export type TYPE_ONLINE_COURSE_ITEM = {
    onlineCourseid: number;
    img: string;
    title: string;
    message: string;
    ico: string;
    marketPrice: number;
    price: number;
    keys: string[];
    lessonCount: number;
    lessonStart: string;
    studentCount: number;
};

export function getOnlineCourseList(data: {
    onlineCategoryid: number | string;
    key: string;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<{
        total: number;
        list: TYPE_ONLINE_COURSE_ITEM[];
    }>("/Api/V1/OnlineCourse/CourseList", data);
}

export type TYPE_ONLINE_COURSE_DETAIL = {
    onlineCourseid: number;
    banner: string;
    bannerH5: string;
    img: string;
    title: string;
    message: string;
    keys: string[];
    currencyCode: string;
    currencyIco: string;
    marketPrice: number;
    price: number;
    discount: string;
    lessonStart: string;
    lessonCount: number;
    studentCount: number;
    intro: string;
};

export function getOnlineCourseDetail(data: { onlineCourseid: string }) {
    return axiosInstances.app.post<TYPE_ONLINE_COURSE_DETAIL>(
        "/Api/V1/OnlineCourse/CourseDetail",
        data
    );
}

// 线下课
export type TYPE_OFFLINE_COURSE_ITEM = {
    offlineCourseid: number;
    img: string;
    title: string;
    message: string;
    ico: string;
    marketPrice: number;
    price: number;
    keys: string[];
    lessonCount: number;
    lessonStart: string;
    studentCount: number;
};

export function getOfflineCourseList(data: {
    key: string;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<{
        total: number;
        list: TYPE_OFFLINE_COURSE_ITEM[];
    }>("/Api/V1/OfflineCourse/CourseList", data);
}

export type TYPE_OFFLINE_COURSE_DETAIL = {
    offlineCourseid: number;
    banner: string;
    bannerH5: string;
    img: string;
    title: string;
    message: string;
    keys: string[];
    currencyCode: string;
    currencyIco: string;
    marketPrice: number;
    price: number;
    discount: string;
    lessonStart: string;
    lessonCount: number;
    address: string;
    studentCount: number;
    intro: string;
};

export function getOfflineCourseDetail(data: { offlineCourseid: string }) {
    return axiosInstances.app.post<TYPE_OFFLINE_COURSE_DETAIL>(
        "/Api/V1/OfflineCourse/CourseDetail",
        data
    );
}
