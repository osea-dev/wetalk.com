import type { NuxtAxiosInstance } from "@nuxtjs/axios";

export const axiosInstances: { [name: string]: NuxtAxiosInstance } = {
    // default: let axiosInstance: NuxtAxiosInstance
    // app: axiosInstances,
};

export function setAxiosInstance(axios: NuxtAxiosInstance) {
    axiosInstances.app = axios;
}
