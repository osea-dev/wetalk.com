import { axiosInstances } from "./api.instance";

export interface TYPE_TEACHER_LESSON_REPORT {
    menkeLessonId: number;
    menkeLessonName: string;
    menkeCourseName: string;
    menkeStarttime: number;
    menkeEndtime: number;
    isTrial: number;
    studentReports: {
        userLessonReportid: number;
        userLessonid: number;
        firstName: string;
        lastName: string;
        headImg: string;
        homework: number;
        attention: number;
        enthusiasm: number;
        hear: number;
        say: number;
        read: number;
        write: number;
        thinking: number;
        emotionalQuotient: number;
        loveQuotient: number;
        inverseQuotient: number;
        performance: number;
        message: string;
        level: number;
    }[];
}

/**
 * 老师读取课堂报告
 */
export function TeacherLessonReport(data: {
    menkeLessonId: number;
    code: string;
}) {
    return axiosInstances.app.post<TYPE_TEACHER_LESSON_REPORT>(
        "/Api/V1/Teacher/LessonReport",
        data
    );
}

export interface TYPE_SUBMIT_REPORT_PARAM {
    menkeLessonId: number;
    code: string;
    studentReports: {
        userLessonReportid: number;
        userLessonid: number;
        homework: number;
        attention: number;
        enthusiasm: number;
        hear: number;
        say: number;
        read: number;
        write: number;
        thinking: number;
        emotionalQuotient: number;
        loveQuotient: number;
        inverseQuotient: number;
        performance: number;
        message: string;
        level: number;
    }[];
}
export function TeacherSubmitLessonReport(data: TYPE_SUBMIT_REPORT_PARAM) {
    return axiosInstances.app.post("/Api/V1/Teacher/SubmitLessonReport", data);
}
