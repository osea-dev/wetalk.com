/*
 * @Description: Object.entries
 * @Author: F-Stone
 * @LastEditTime: 2022-08-25 18:21:31
 */
type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

export function entries<T>(obj: T): Entries<T> {
    return Object.entries(obj) as any;
}
