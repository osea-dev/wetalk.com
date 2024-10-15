/*
 * @Description: 众语集页面数据
 * @Author: F-Stone
 * @LastEditTime: 2022-09-09 15:01:18
 */

const educationLesson = "/";
export type TYPE_LESSON = {
    id: string;
    thumb: string;
    link: string;
    title: string;
    type: "直播课" | "录播课" | "中心课";
    time: string;
    count: string;
    teacher: string;
    price: string;
    sales: string;
};

export const lessonList: TYPE_LESSON[] = [
    {
        id: "0",
        thumb: "/images/education/education-lesson-0.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "直播课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "1",
        thumb: "/images/education/education-lesson-1.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "直播课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "2",
        thumb: "/images/education/education-lesson-2.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "直播课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "3",
        thumb: "/images/education/education-lesson-3.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "录播课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "4",
        thumb: "/images/education/education-lesson-1.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "录播课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "5",
        thumb: "/images/education/education-lesson-2.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "录播课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "6",
        thumb: "/images/education/education-lesson-3.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "中心课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "7",
        thumb: "/images/education/education-lesson-1.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "中心课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
    {
        id: "8",
        thumb: "/images/education/education-lesson-2.png",
        link: educationLesson,
        title: "国学启蒙基础班",
        type: "中心课",
        time: "2022-6-18 20:00:00",
        count: "16课时",
        teacher: "师培",
        price: "1999",
        sales: "260",
    },
];

export const lesson = {
    list: lessonList,
    pages: {
        total: 5,
        current: 1,
        prev: "./",
        next: "./",
        list: [
            {
                index: 1,
                href: "",
            },
        ],
    },
};
