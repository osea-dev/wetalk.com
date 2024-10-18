import link from "@/assets/script/local-data/link-manage";

export type TYPE_LINK_NAV = {
    type: "link";
    link: string;
    title: string;
    name: string;
    icon?: string;
};
export type TYPE_FOLDER_NAV = {
    type: "folder";
    title: string;
    icon?: string;
    subnav: (TYPE_LINK_NAV | TYPE_FOLDER_NAV)[];
};

export const siteNavList: (TYPE_LINK_NAV | TYPE_FOLDER_NAV)[] = [
    { type: "link", link: link.index, title: "KEY_NAV.首页", name: "index" },
    // {
    //     type: "folder",
    //     title: "Courses",
    //     subnav: [
    //         {
    //             type: "link",
    //             link: "",
    //             title: "Philippines",
    //             name: "philippines",
    //         },
    //         {
    //             type: "link",
    //             link: "",
    //             title: "Singapore",
    //             name: "singapore",
    //         },
    //     ],
    // },
    // {
    //     type: "folder",
    //     title: "About WeTalk",
    //     subnav: [
    //         {
    //             type: "link",
    //             link: "",
    //             title: "History",
    //             name: "history",
    //         },
    //         {
    //             type: "link",
    //             link: "",
    //             title: "Campus",
    //             name: "campus",
    //         },
    //         {
    //             type: "link",
    //             link: link.charity,
    //             title: "Charity",
    //             name: "charity",
    //         },
    //     ],
    // },
    // {
    //     type: "link",
    //     link: "",
    //     title: "Educational Tours",
    //     name: "educationalTours",
    // },
    // {
    //     type: "link",
    //     link: "",
    //     title: "News",
    //     name: "news",
    // },
    // {
    //     type: "link",
    //     link: "",
    //     title: "Resources",
    //     name: "resources",
    // },
    {
        type: "folder",
        title: "KEY_NAV.众语集",
        subnav: [
            {
                type: "link",
                link: link.shortVideo,
                title: "KEY_NAV.短视频",
                name: "shortVideo",
                icon: "color-icon-short-video",
            },
            {
                type: "link",
                link: link.recordedCourses,
                title: "KEY_NAV.录播课",
                name: "recordedCourses",
                icon: "color-icon-record-video",
            },
            {
                type: "folder",
                title: "KEY_NAV.直播课",
                icon: "color-icon-online-video",
                subnav: [
                    {
                        type: "link",
                        title: "KEY_NAV.语言学",
                        link: link.onlineLiveCourse1,
                        name: "onlineLiveCourse1",
                    },
                    {
                        type: "link",
                        title: "KEY_NAV.潮国学",
                        link: link.onlineLiveCourse2,
                        name: "onlineLiveCourse2",
                    },
                    {
                        type: "link",
                        title: "KEY_NAV.真科学",
                        link: link.onlineLiveCourse3,
                        name: "onlineLiveCourse3",
                    },
                ],
            },
            {
                type: "link",
                link: link.offlineCourse,
                title: "KEY_NAV.线下课",
                name: "offlineCourse",
                icon: "color-icon-offline-video",
            },
            {
                type: "folder",
                title: "KEY_NAV.课程介绍",
                icon: "color-icon-course",
                subnav: [
                    {
                        type: "link",
                        link: link.chinese,
                        title: "KEY_NAV.语言学",
                        name: "chinese",
                    },
                    {
                        type: "link",
                        link: link.sinology,
                        title: "KEY_NAV.潮国学",
                        name: "sinology",
                    },
                    {
                        type: "link",
                        link: link.science,
                        title: "KEY_NAV.真科学",
                        name: "science",
                    },
                ],
            },
        ],
    },
    {
        type: "folder",
        title: "KEY_NAV.众语学",
        subnav: [
            {
                type: "link",
                link: link.chinese,
                title: "KEY_NAV.语言学",
                name: "chinese",
            },
            {
                type: "link",
                link: link.sinology,
                title: "KEY_NAV.潮国学",
                name: "sinology",
            },
            {
                type: "link",
                link: link.science,
                title: "KEY_NAV.真科学",
                name: "science",
            },
        ],
    },
    {
        type: "link",
        link: link.education,
        title: "KEY_NAV.语言学",
        name: "education",
    },
    {
        type: "link",
        link: link.teacher,
        title: "KEY_NAV.进贤进能",
        name: "teacher",
    },
    { type: "link", link: link.news, title: "KEY_NAV.温故知新", name: "news" },
    {
        type: "link",
        link: link.studyAbroad,
        // title: "KEY_NAV.游学留学",
        title: "KEY_NAV.游学留学",
        name: "studyAbroad",
    },
    {
        type: "folder",
        title: "KEY_NAV.公司介绍",
        subnav: [
            {
                type: "link",
                link: link.charity,
                title: "KEY_NAV.公益慈善",
                name: "charityy",
            },
            {
                type: "link",
                link: link.aboutUs,
                title: "KEY_NAV.关于我们",
                name: "aboutUs",
            },
        ],
    },
];
