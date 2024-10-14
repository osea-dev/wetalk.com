import type { AxiosRequestConfig } from "axios";
import "@nuxtjs/axios";

declare module "axios" {
    interface AxiosRequestConfig<D = any> {
        customError?: boolean;
    }
}

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
            statusCode: 0 | 4000 | 4001 | 4002 | 4003 | 4004;
            timestamp: string;
            message: string;
        }
    }
}
