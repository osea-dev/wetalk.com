import { axiosInstances } from "./api.instance";

export interface TYPE_PAY_TYPE {
    paytypeid: number;
    ico: string;
    payName: string;
    isScan: number;
    isWeb: number;
}

export interface TYPE_ORDER {
    courseSkuid: number;
    img: string;
    ico: string;
    title: string;
    message: string;
    type: string;
    classHour: number;
    currencyCode: string;
    marketPrice: number;
    price: number;
    skuTypeid: number;
    payTypes: TYPE_PAY_TYPE[];
}

export function ConfirmOrder(data: { courseSkuid: string }) {
    return axiosInstances.app.post<TYPE_ORDER>(
        "/Api/V1/Order/ConfirmOrder",
        data
    );
}

export function CreateOrder(data: { courseSkuid: string }) {
    return axiosInstances.app.post<{
        orderid: number;
        orderSn: string;
    }>("/Api/V1/Order/CreateOrder", data);
}

export interface TYPE_ORDER_PAY {
    payWay: string;
    orderid: string;
    orderSn: string;
    qrcode: string;
    apiUrl: string;
    amount: number;
    expire: number;
    ico: string;
    currencyCode: string;
    payType: TYPE_PAY_TYPE;
}

export function OrderPay(data: {
    orderid: number;
    payTypeid: number;
    type: number;
}) {
    return axiosInstances.app.post<TYPE_ORDER_PAY>(
        "/Api/V1/Order/OrderPay",
        data
    );
}

export function GetOrderStatus(data: { orderid?: number; orderSn?: string }) {
    return axiosInstances.app.post<{
        status: -1 | 0 | 1 | 2;
    }>("/Api/V1/Order/GetOrderStatus", data, { progress: false });
}

export interface TYPE_ORDER_LIST {
    total: number;
    list: {
        orderid: number;
        orderSn: string;
        status: number;
        img: string;
        title: string;
        message: string;
        type: string;
        classHour: number;
        marketPrice: number;
        price: number;
        paytime: number;
        skuTypeid: number;
        paytypeid: number;
        ico: string;
        lessonCount?: number;
        payName: string;
        isScan: number;
        isWeb: number;
    }[];
}

export function OrderList(data: {
    payStatus: number;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<TYPE_ORDER_LIST>(
        "/Api/V1/Order/OrderList",
        data
    );
}
export function RecordOrderList(data: {
    payStatus: number;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<TYPE_ORDER_LIST>(
        "/Api/V1/Order/RecordOrderList",
        data
    );
}

export function OnlineOrderList(data: {
    payStatus: number;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<TYPE_ORDER_LIST>(
        "/Api/V1/Order/OnlineOrderList",
        data
    );
}

export function OfflineOrderList(data: {
    payStatus: number;
    page: number;
    pageSize: number;
}) {
    return axiosInstances.app.post<TYPE_ORDER_LIST>(
        "/Api/V1/Order/OfflineOrderList",
        data
    );
}

export function CancelOrderKeys() {
    return axiosInstances.app.post<string[]>("/Api/V1/Order/CancelOrderKeys");
}

export function CancelOrder(data: {
    orderid: number;
    keys?: string[];
    message: string;
}) {
    return axiosInstances.app.post<string[]>("/Api/V1/Order/CancelOrder", data);
}

export interface TYPE_ORDER_DETAIL {
    orderid: number;
    orderSn: string;
    status: -1 | 0 | 1 | 2;
    img: string;
    title: string;
    message: string;
    type: string;
    skuTypeid: number;
    classHour: number;
    ico: string;
    marketPrice: number;
    price: number;
    paytime: number | string;
    payType: TYPE_PAY_TYPE;
}

export function OrderDetail(data: { orderid: string }) {
    return axiosInstances.app.post<TYPE_ORDER_DETAIL>(
        "/Api/V1/Order/OrderDetail",
        data
    );
}

export function PayTypes() {
    return axiosInstances.app.post<TYPE_PAY_TYPE[]>("/Api/V1/Order/PayTypes");
}

//#region 录播课

// 创建录播课订单
export function RecordCourseCreateOrder(data: { recordCourseid: string }) {
    return axiosInstances.app.post<{
        orderid: number;
        orderSn: string;
    }>("/Api/V1/RecordCourse/CreateOrder", data);
}

// 加载确认录播课订单信息

export type TYPE_RECORD_COURSE_ORDER = {
    recordCourseid: number;
    img: string;
    title: string;
    message: string;
    introUp: string;
    introLow: string;
    lessonCount: number;
    studentCount: number;
    currencyCode: string;
    ico: string;
    marketPrice: number;
    price: number;
    payTypes: {
        paytypeid: number;
        ico: string;
        payName: string;
        isScan: number;
        isWeb: number;
    }[];
    videos: {
        title: string;
        duration: string;
        viewCount: number;
    }[];
};
export function RecordCourseConfirmOrder(data: { recordCourseid: string }) {
    return axiosInstances.app.post<TYPE_RECORD_COURSE_ORDER>(
        "/Api/V1/RecordCourse/ConfirmOrder",
        data
    );
}

//#endregion

// #region  加载确认线下课订单信息

export function OfflineCourseCreateOrder(data: { offlineCourseid: string }) {
    return axiosInstances.app.post<{
        orderid: number;
        orderSn: string;
    }>("/Api/V1/OfflineCourse/CreateOrder", data);
}

export type TYPE_OFFLINE_COURSE_ORDER = {
    offlineCourseid: number;
    img: string;
    title: string;
    message: string;
    intro: string;
    lessonCount: number;
    lessonStart: string;
    studentCount: number;
    currencyCode: string;
    ico: string;
    marketPrice: number;
    price: number;
    payTypes: {
        paytypeid: number;
        ico: string;
        payName: string;
        isScan: number;
        isWeb: number;
    }[];
};

export function OfflineCourseConfirmOrder(data: { offlineCourseid: string }) {
    return axiosInstances.app.post<TYPE_OFFLINE_COURSE_ORDER>(
        "/Api/V1/OfflineCourse/ConfirmOrder",
        data
    );
}
// #endregion

// #region  加载确认线下课订单信息

export function OnlineCourseCreateOrder(data: { onlineCourseid: string }) {
    return axiosInstances.app.post<{
        orderid: number;
        orderSn: string;
    }>("/Api/V1/OnlineCourse/CreateOrder", data);
}

export type TYPE_ONLINE_COURSE_ORDER = {
    onlineCourseid: number;
    img: string;
    title: string;
    message: string;
    intro: string;
    lessonCount: number;
    lessonStart: string;
    studentCount: number;
    currencyCode: string;
    ico: string;
    marketPrice: number;
    price: number;
    payTypes: {
        paytypeid: number;
        ico: string;
        payName: string;
        isScan: number;
        isWeb: number;
    }[];
};

export function OnlineCourseConfirmOrder(data: { onlineCourseid: string }) {
    return axiosInstances.app.post<TYPE_ONLINE_COURSE_ORDER>(
        "/Api/V1/OnlineCourse/ConfirmOrder",
        data
    );
}
// #endregion
