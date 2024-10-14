import { axiosInstances } from "./api.instance";

export function RegUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    userpwd: string;
}) {
    return axiosInstances.app.post<{
        userToken: string;
        firstName: string;
        lastName: string;
        status: number;
    }>("/Api/V1/UserLogin/Reg", data);
}

export function CheckIsLogin() {
    return axiosInstances.app.post<{
        status: 0 | 1;
    }>("/Api/V1/UserLogin/CheckIsLogin");
}

export function UserLoginEmail(data: {
    email: string;
    userpwd: string;
    isLong: 0 | 1;
}) {
    return axiosInstances.app.post<{
        userToken: string;
        firstName: string;
        lastName: string;
        status: number;
    }>("/Api/V1/UserLogin/UserLoginEmail", data);
}
export function UserLoginMobile(data: {
    userpwd: string;
    mobileCode: string;
    mobile: string;
    isLong: 0 | 1;
}) {
    return axiosInstances.app.post<{
        userToken: string;
        firstName: string;
        lastName: string;
        status: number;
    }>("/Api/V1/UserLogin/UserLoginMobile", data);
}

export function ForgetPwd(data: { email: string }) {
    return axiosInstances.app.post("/Api/V1/UserLogin/ForgetPwd", data);
}

export function ResetPwd(data: { code: string; pwd: string; pwd1: string }) {
    return axiosInstances.app.post("/Api/V1/UserLogin/ResetPwd", data);
}

export function Email(data: { code: string }) {
    return axiosInstances.app.post<{ email: string }>(
        "/Api/V1/UserLogin/Email",
        data
    );
}
