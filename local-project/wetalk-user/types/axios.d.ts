import { AxiosRequestConfig } from "axios";
import "@nuxtjs/axios";

declare module "@nuxtjs/axios" {
    export interface NuxtAxiosInstance {
        post<T = any, R = Ajax.Response<T>, D = any>(
            url: string,
            data?: D,
            config?: AxiosRequestConfig & any
        ): Promise<R>;
    }
}

declare global {
    namespace Ajax {
        interface Response<T> {
            data: T;
            statusCode: number;
            timestamp: string;
            message: string;
        }
    }
}
