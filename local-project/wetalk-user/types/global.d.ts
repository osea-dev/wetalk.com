/*
 * @Description: WeTalk 数据类型
 * @Author: F-Stone
 * @LastEditTime: 2023-01-05 19:40:35
 */

declare namespace TYPE_WETALK {
    interface USER_LESSON_BASE {
        id: number;
        title: string;
        subtitle: string;
        time: string;
        day: string;
        /**
         * 判断是否能够进入教室
         *
         * @type {(0 | 1)} - 0 不能 | 1 能
         * @memberof USER_LESSON_BASE
         */
        ready: 0 | 1;
        /**
         * 课节状态
         *
         * @type {(0 | 1 | 2 | 3 | 4)} - 0 未开始 | 1 正在进行 | 2 已完成 | 3 已取消 | 4 学生缺席
         * @memberof USER_LESSON_BASE
         */
        state: 0 | 1 | 2 | 3 | 4;
    }
    interface USER_COURSE_BASE {
        id: number;
        thumb: string;
        type: string;
        title: string;
        subtitle: string;
        count: number;
        total: number;
        list: USER_LESSON_BASE[];
    }
}
