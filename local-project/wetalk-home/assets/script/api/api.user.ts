import { axiosInstances } from "./api.instance";

export type TYPE_STUDENT_INFO = {
    userid: number;
    headImg: string;
    regtime: number;
    firstName: string;
    lastName: string;
    birthdate: string;
    gender: number;
    timezone: {
        timezoneid: number;
        country: string;
        timezoneName: string;
        utc: string;
        utcSec: number;
    };
    education: string;
    native: string;
    guardianName: string;
    guardianMobileCode: string;
    guardianMobile: string;
    guardianshipFee: string;
    email: string;
    mobileCode: string;
    mobile: string;
};

/**
 * 学生基础信息
 */
export function getStudentInfo() {
    return axiosInstances.app.post<TYPE_STUDENT_INFO>(
        "/Api/V1/Student/StudentInfo",
        {},
        { progress: false }
    );
}
