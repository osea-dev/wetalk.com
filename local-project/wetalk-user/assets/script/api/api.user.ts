import { axiosInstances } from "./api.instance";

export type TYPE_PERFECT_REG_DATA = {
    countryCode: string;
    mobileCode: string;
    mobile: string;
    smsCode: string;
    birthdate: string;
    native: string;
    timezoneid: string;
};

export function PerfectReg(data: TYPE_PERFECT_REG_DATA) {
    return axiosInstances.app.post("/Api/V1/UserLogin/PerfectReg", data);
}

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
        "/Api/V1/Student/StudentInfo"
    );
}
export interface TYPE_USER_LESSON {
    userLessonid: number;
    menkeName: string;
    img: string;
    menkeLessonName: string;
    menkeStarttime: number;
    menkeEndtime: number;
    isCancel: number;
    menkeTeacherName: string;
    classroomMin: number;
    menkeEntryurl: string;
    isScore: number;
    userLessonReportid: number;
    isReport: number;
    replayUrl: string;
}

export interface TRIAL_LESSON_REPORT {
    status: number;
    userLessonReportid: number;
    level: number;
}

export interface TYPE_STUDENT_HOME_PAGE {
    reportTotal: number;
    trialLessonReport: TRIAL_LESSON_REPORT;
    lastUserLesson: TYPE_USER_LESSON;
    userCourses: {
        userCourseid: number;
        courseName: string;
        classHour: number;
        classes: number;
        skuTypeid: number;
        type: string;
        icoFont: string;
    }[];
    endUserLessons: TYPE_USER_LESSON[];
}

/**
 * 学生主页
 */
export function getStudentHomePage() {
    return axiosInstances.app.post<TYPE_STUDENT_HOME_PAGE>(
        "/Api/V1/Student/StudentHomePage"
    );
}

/**
 * 试听课程申请
 */
export function TrialCourseApply(data: {
    courseName: string;
    mobileCode: string;
    mobile: string;
    email: string;
    birthdate: string;
    gender: number;
    isChinese: number;
}) {
    return axiosInstances.app.post("/Api/V1/Student/TrialCourseApply", data);
}

/**
 * 试听课程申请
 */
export function CourseApply(data: { userCourseid: number }) {
    return axiosInstances.app.post("/Api/V1/Student/CourseApply", data, {
        progress: false,
    });
}

/**
 * 推荐子课程（前三条）
 */
export interface TYPE_COURSE {
    courseid: number;
    img: string;
    title: string;
    message: string;
}
export function getRecommendCourse() {
    return axiosInstances.app.post<TYPE_COURSE[]>(
        "/Api/V1/Student/RecommendCourse"
    );
}

/**
 * 取消课节申请原因标签
 */
export function cancelLessonKeys() {
    return axiosInstances.app.post<string[]>(
        "/Api/V1/Student/CancelLessonKeys"
    );
}

/**
 * 申请取消课节
 */
export function applyCancelLesson(data: {
    userLessonid: number;
    keys: string[];
    message: string;
}) {
    return axiosInstances.app.post("/Api/V1/Student/ApplyCancelLesson", data);
}

/**
 * 学生对课节老师评价打分
 */
export function toTeacherSorce(data: { userLessonid: number; score: number }) {
    return axiosInstances.app.post("/Api/V1/Student/ToTeacherSorce", data);
}

/**
 * 修改学生基础信息(若不修改则不填)
 */
export function updateStudentInfo(
    data: Partial<{
        userpwd: string;
        headImg: string;
        firstName: string;
        lastName: string;
        birthdate: string;
        gender: number;
        native: string;
        timezoneid: string;
        countryCode: string;
        education: string;
        nativeLang: string;
        guardianName: string;
        guardianMobileCode: string;
        guardianMobile: string;
        guardianSmsCode: string;
        guardianshipFee: string;
        email: string;
        mobileCode: string;
        mobile: string;
        smsCode: string;
    }>
) {
    return axiosInstances.app.post("/Api/V1/Student/UpdateStudentInfo", data);
}

/**
 * 上传头像
 */
export function uploadHeadImg(data: any) {
    return axiosInstances.app.post("/Api/V1/Student/UploadHeadImg", data);
}

export interface TYPE_MY_SCHEDULE {
    userLessonid: number;
    courseName: string;
    lessonName: string;
    menkeStarttime: number;
    menkeEndtime: number;
    type: string;
    istrial: number;
    menkeState: number;
    isCancel: number;
    menkeEntryurl: string;
    isScore: number;
    isHomeWork: number;
    userLessonReportid: number;
    isReport: number;
    recordUrl: string;
    teacherid: number;
    teacherName: string;
    teacherMessage: string;
    teacherTags: string;
    classroomHour: number;
}

/**
 * 我的课表列表
 */
export function getMySchedule(data: {
    begintime: number;
    endtime: number;
    menkeState?: number;
}) {
    return axiosInstances.app.post<TYPE_MY_SCHEDULE[]>(
        "/Api/V1/Student/MySchedule",
        data,
        { progress: false }
    );
}

export interface TYPE_MESSAGE_LIST {
    total: number;
    list: {
        messageid: number;
        sendUserid: number;
        sendName: string;
        headImg: string;
        message: string;
        sendtime: string;
        isRead: number;
    }[];
}

/**
 * 我的消息列表
 */
export function getMessageList(data: { page: number; pageSize: number }) {
    return axiosInstances.app.post<TYPE_MESSAGE_LIST>(
        "/Api/V1/Student/MessageList",
        data
    );
}
export interface TYPE_MESSAGE_DETAIL {
    total: number;
    list: {
        messageid: number;
        sendUserid: number;
        sendName: string;
        headImg: string;
        message: string;
        sendtime: string;
        isRead: number;
    }[];
}

/**
 * 我的消息详情
 */
export function getMessageDetail(data: {
    sendUserid: number;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<TYPE_MESSAGE_DETAIL>(
        "/Api/V1/Student/MessageDetail",
        data
    );
}

/**
 * 删除指定发送方所有消息
 */
export function delUserMessage(data: { sendUserid: number }) {
    return axiosInstances.app.post("/Api/V1/Student/DelUserMessage", data);
}

/**
 * 删除指定发送方所有消息
 */
export function delMessage(data: { messageid: number }) {
    return axiosInstances.app.post("/Api/V1/Student/DelMessage", data);
}

/**
 * 取消课节申请原因标签
 */
export function CancelLessonKeys() {
    return axiosInstances.app.post<string[]>(
        "/Api/V1/Student/CancelLessonKeys"
    );
}

/**
 * 申请取消课节
 */
export function ApplyCancelLesson(data: {
    userLessonid: number;
    keys: string[];
    message: string;
}) {
    return axiosInstances.app.post("/Api/V1/Student/ApplyCancelLesson", data);
}

export function ToTeacherSorce(data: { userLessonid: number; score: number }) {
    return axiosInstances.app.post("/Api/V1/Student/ToTeacherSorce", data);
}

export type TYPE_LESSON_SCORE = {
    score: number;
    isScore: number;
    teacherHeadImg: string;
    teacherName: string;
    studentScoreDays: number;
};

export function LessonScore(data: { userLessonid: number }) {
    return axiosInstances.app.post<TYPE_LESSON_SCORE>(
        "/Api/V1/Student/LessonScore",
        data
    );
}

export interface TYPE_USER_COURSE_LIST {
    userCourseid: number;
    courseid: number;
    img: string;
    title: string;
    type: string;
    skuTypeid: number;
    classHour: number;
    classes: number;
    status: number;
    keys: string[];
}

/**
 * 正式课列表
 */
export function UserCourseList() {
    return axiosInstances.app.post<TYPE_USER_COURSE_LIST[]>(
        "/Api/V1/Student/UserCourseList"
    );
}

export interface TYPE_USER_COURSE {
    userCourseid: number;
    courseid: number;
    img: string;
    title: string;
    message: string;
    type: string;
    skuTypeid: number;
    classHour: number;
    classes: number;
    status: number;
    keys: string[];
}

/**
 * 正式课信息
 */
export function UserCourse(data: { userCourseid: number }) {
    return axiosInstances.app.post<TYPE_USER_COURSE>(
        "/Api/V1/Student/UserCourse",
        data
    );
}

export interface TYPE_TRIAL_USER_LESSON {
    userLessonid: number;
    lessonName: string;
    menkeStarttime: number;
    menkeEndtime: number;
    type: string;
    menkeState: number;
}

/**
 * 试听课列表
 */
export function TrialUserLessonList() {
    return axiosInstances.app.post<TYPE_TRIAL_USER_LESSON[]>(
        "/Api/V1/Student/TrialUserLessonList"
    );
}

export type TYPE_USER_LESSON_LIST = {
    total: number;
    list: {
        userLessonid: number;
        courseName: string;
        lessonName: string;
        menkeStarttime: number;
        menkeEndtime: number;
        type: string;
        istrial: number;
        menkeState: number;
        isCancel: number;
        classroomMin: number;
        menkeEntryurl: string;
        isScore: number;
        isHomeWork: number;
        userLessonReportid: number;
        isReport: number;
        recordUrl: string;
        teacherid: number;
        teacherName: string;
        teacherMessage: string;
        teacherTags: string;
        classroomHour: number;
    }[];
};

/**
 * 正式课课节列表
 */
export function UserLessonList(data: {
    startStatus: number;
    userCourseid: number;
    endStatus?: number;
    page?: number;
    pageSize?: number;
}) {
    return axiosInstances.app.post<TYPE_USER_LESSON_LIST>(
        "/Api/V1/Student/UserLessonList",
        data
    );
}

// SECTION - 课节相关接口
export interface TYPE_USER_LESSON_DETAIL {
    userLessonid: number;
    courseName: string;
    lessonName: string;
    menkeStarttime: number;
    menkeEndtime: number;
    type: string;
    istrial: number;
    menkeState: number;
    isCancel: number;
    menkeEntryurl: string;
    classroomMin: number;
    isScore: number;
    isHomeWork: number;
    userLessonReportid: number;
    isReport: number;
    recordUrl: string;
    teacherid: number;
    teacherName: string;
    teacherHeadImg: string;
    teacherMessage: string;
    teacherKeys: string[];
}

/**
 * 课节详情
 */
export function UserLessonDetail(data: { userLessonid: number }) {
    return axiosInstances.app.post<TYPE_USER_LESSON_DETAIL>(
        "/Api/V1/Student/UserLessonDetail",
        data
    );
}

export interface TYPE_HOMEWORK_DETAIL {
    homeworkid: number;
    courseName: string;
    lessonName: string;
    menkeStarttime: number;
    menkeEndtime: number;
    title: string;
    content: string;
    resources: TYPE_REMARK_FILE[];
    submitWay: number;
    endDate: number;
    recordUrl: string;
    isSubmit: number;
    submitHomeworks: TYPE_SUBMIT_HOMEWORK[];
}

export interface TYPE_REMARK_FILE {
    attachmentId: number;
    attachmentType: string;
    attachmentUrl: string;
    attachmentPreviewUrl: string;
    size: number;
    duration: number;
}

export interface TYPE_SUBMIT_HOMEWORK {
    submitContent: string;
    submitTime: number;
    submitFiles: TYPE_REMARK_FILE[];
    teacherid: number;
    teacherName: string;
    teacherHeadImg: string;
    teacherKeys: string[];
    isRemark: number;
    remarkContent: string;
    remarkFiles: TYPE_REMARK_FILE[];
    remarkIsPass: number;
    remarkRank: number;
}

/**
 * 家庭作业详情
 */
export function HomeworkDetail(data: { userLessonid: number }) {
    return axiosInstances.app.post<TYPE_HOMEWORK_DETAIL>(
        "/Api/V1/Student/HomeworkDetail",
        data
    );
}
// !SECTION

// SECTION - 报告页面
export type TYPE_LEVEL_REPORT_LIST = {
    userLessonReportid: number;
    userLessonid: number;
    menkeLessonName: string;
    level: number;
    istrial: number;
    dtime: number;
}[];

/**
 * 我的定级报告(仅针对试听课)
 */
export function LevelReportList() {
    return axiosInstances.app.post<TYPE_LEVEL_REPORT_LIST>(
        "/Api/V1/Student/LevelReportList"
    );
}

export type TYPE_LESSON_REPORT_LIST = {
    userCourseid: number;
    courseName: string;
    classHour: number;
    skuTypeid: number;
    type: string;
    icoFont: string;
    lessonReports: {
        userLessonReportid: number;
        menkeStarttime: number;
        menkeEndtime: number;
        lessonName: string;
        dtime: number;
        isScore: number;
        recordUrl: string;
    }[];
}[];

/**
 * 我的课节报告(针对正价课)
 */
export function LessonReportList() {
    return axiosInstances.app.post<TYPE_LESSON_REPORT_LIST>(
        "/Api/V1/Student/LessonReportList"
    );
}
export interface TYPE_LESSON_REPORT {
    userLessonReportid: number;
    menkeStarttime: number;
    menkeEndtime: number;
    lessonName: string;
    teacherid: number;
    teacherHeadImg: string;
    teacherName: string;
    message: string;
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
    recordUrl: string;
    isTrial: number;
    level: number;
    dtime: number;
}

/**
 * 我的课节报告详情
 */
export function LessonReport(data: { userLessonReportid: number }) {
    return axiosInstances.app.post<TYPE_LESSON_REPORT>(
        "/Api/V1/Student/LessonReport",
        data
    );
}
// !SECTION

// #region 录播课
export type TYPE_MY_RECORD_COURSE_DETAIL = {
    orderid: number;
    recordCourseid: number;
    img: string;
    title: string;
    message: string;
    lessonCount: number;
    studentCount: number;
    teacherid: number;
    teacherName: string;
    keys: string[];
    videos: {
        recordCourseid: number;
        title: string;
        video: string;
        duration: string;
        viewCount: number;
    }[];
};

export function getMyRecordCourse(data: { orderid: string }) {
    return axiosInstances.app.post<TYPE_MY_RECORD_COURSE_DETAIL>(
        "/Api/V1/Student/MyRecordCourse",
        data
    );
}

export type TYPE_RECORD_COURSE_LIST = {
    orderid: number;
    recordCourseid: number;
    img: string;
    title: string;
    message: string;
    lessonCount: number;
    studentCount: number;
    teacherid: number;
    teacherName: string;
    keys: string[];
    videos: {
        recordCourseid: number;
        title: string;
        video: string;
        duration: string;
        viewCount: number;
    }[];
};

export function getMyRecordCourseList() {
    return axiosInstances.app.post<TYPE_RECORD_COURSE_LIST[]>(
        "/Api/V1/Student/MyRecordCourseList"
    );
}

export type TYPE_ONLINE_COURSE_ITEM = {
    userCourseid: number;
    onlineCourseid: number;
    img: string;
    title: string;
    message: string;
    lessonCount: number;
    studentCount: number;
    lessonStart: string;
    status: number;
};

export function getMyOnlineCourseList() {
    return axiosInstances.app.post<TYPE_ONLINE_COURSE_ITEM[]>(
        "/Api/V1/Student/MyOnlineCourseList"
    );
}

export type TYPE_OFFLINE_COURSE_ITEM = {
    offlineCourseid: number;
    img: string;
    title: string;
    message: string;
    lessonCount: number;
    studentCount: number;
    lessonStart: string;
    teacherid: number;
    teacherName: string;
};

export function getMyOfflineCourseList() {
    return axiosInstances.app.post<TYPE_OFFLINE_COURSE_ITEM[]>(
        "/Api/V1/Student/MyOfflineCourseList"
    );
}
// #endregion
