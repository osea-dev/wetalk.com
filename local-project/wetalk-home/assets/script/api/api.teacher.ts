/*
 * @Description: 教师相关接口
 * @Author: F-Stone
 * @LastEditTime: 2022-11-29 13:45:56
 */

import { axiosInstances } from "./api.instance";

export type TYPE_TEACHER_DETAIL = {
    teacherid: number;
    img: string;
    photo: string;
    name: string;
    comeFrom: string;
    keys: string[];
    edu: string;
    religion: string;
    desc: string;
    category: string;
    advantages: {
        value: string;
        sup: string;
        sub: string;
        title: string;
    }[];
    motto: string;
    philosophy: string;
};

/**
 * 老师详情
 */
export function getTeacherDetail(data: { teacherid: number }) {
    return axiosInstances.app.post<TYPE_TEACHER_DETAIL>(
        "/Api/V1/Teacher/TeacherDetail",
        data
    );
}

// new
export function getTeacherCategory() {
    return axiosInstances.app.post<any>("/Api/V1/Teacher/TeacherCategory");
}

export type TYPE_TEACHER_LIST = {
    teacherid: number;
    img: string;
    name: string;
    keys: string[];
}[];

export function getTeacherList(data: {
    teacherCategoryid?: number;
    page: number;
    pagesize: number;
}) {
    return axiosInstances.app.post<{
        total: number;
        list: TYPE_TEACHER_LIST;
    }>("/Api/V1/Teacher/TeacherList", data);
}
