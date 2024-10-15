/*
 * @Description: 课程接口
 * @Author: F-Stone
 * @LastEditTime: 2023-01-31 19:03:57
 */

// import axios from "axios";
// const axiosInstance = axios.create();

import { axiosInstances } from "./api.instance";

/**
 * 获取课程列表
 * @returns
 */
export interface TYPE_COURSE {
    courseid: number;
    img: string;
    title: string;
    message?: string;
    minPrice: number;
    keys?: string[];
    ico: string;
    skuTypes: {
        skuTypeid: 1 | 2;
        type: string;
    };
}
export function getCourseList(data: {
    key: string;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<{
        total: number;
        list: TYPE_COURSE[];
    }>("/Api/V1/Course/CourseList", data);
}

export interface TYPE_COURSE_SKU {
    courseSkuid: number;
    skuTypeid: number;
    type: string;
    classHour: number;
    marketPrice: number;
    price: number;
    discount: string;
}
export interface TYPE_COURSE_DETAIL {
    courseid: number;
    banner: string;
    bannerH5: string;
    title: string;
    message: string;
    curricula: string;
    keys: string[];
    currencyCode: string;
    currencyIco: string;
    skus: TYPE_COURSE_SKU[];
    groups: {
        courseGroupid: number;
        groupName: string;
        groupInfos: {
            level: number;
            courseGroupInfoid: number;
            courseGroupid: number;
            title: string;
            img: string;
            message: string;
            keys: string[];
        }[];
    }[];
}

export function getCourse(data: { courseid: string }) {
    return axiosInstances.app.post<TYPE_COURSE_DETAIL>(
        "/Api/V1/Course/CourseDetail",
        data
    );
}
export interface TYPE_SUB_COURSE_DETAIL {
    courseGroupInfoid: number;
    courseid: number;
    img: string;
    title: string;
    message: string;
    keys: string[];
    intro: string;
    objectives: string;
    crowd: string;
    merit: string;
    begintime: string;
    catalog: string;
}

/**
 * 获取子课程详情
 *
 * @export
 * @param {{ courseGroupInfoid: string }} data
 * @return {*}
 */
export function getSubCourseDetail(data: { courseGroupInfoid: string }) {
    return axiosInstances.app.post<TYPE_SUB_COURSE_DETAIL>(
        "/Api/V1/Course/SubCourseDetail",
        data
    );
}

export function postTrialCourseApply(data: {
    courseName: string;
    mobileCode: string;
    mobile: string;
    email: string;
}) {
    return axiosInstances.app.post("/Api/V1/Course/TrialCourseApply", data);
}

export function postCourseMessage(data: {
    courseGroupInfoid: number;
    mobileCode: string;
    mobile: string;
    email: string;
}) {
    return axiosInstances.app.post("/Api/V1/Course/CourseMessage", data);
}
