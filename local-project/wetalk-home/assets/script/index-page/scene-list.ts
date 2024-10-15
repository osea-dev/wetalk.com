import SceneFirst from "@/components/index/SceneFirst.vue";
import SceneSec from "@/components/index/SceneSec.vue";
import SceneThird from "@/components/index/SceneThird.vue";
import SceneFourth from "@/components/index/SceneFourth.vue";
import SceneFifth from "@/components/index/SceneFifth.vue";

export const SceneList = [
    {
        index: "01",
        component: SceneFirst,
        story: {
            title: "大禹治水",
            subtitle: "dà yǔ zhì shuǐ",
            body: "KEY_PAGE_INDEX.SCENE_FIRST.STORY_BODY",
        },
    },
    {
        index: "02",
        component: SceneSec,
        story: {
            title: "拱手礼",
            subtitle: "gǒng shǒu lǐ",
            body: "KEY_PAGE_INDEX.SCENE_SEC.STORY_BODY",
        },
    },
    {
        index: "03",
        component: SceneThird,
        story: {
            title: "鲲鹏",
            subtitle: "kūn péng",
            body: "KEY_PAGE_INDEX.SCENE_THIRD.STORY_BODY",
        },
    },
    {
        index: "04",
        component: SceneFourth,
        story: {
            title: "时间",
            subtitle: "shí jiān",
            body: "KEY_PAGE_INDEX.SCENE_FOURTH.STORY_BODY",
        },
    },
    {
        index: "05",
        component: SceneFifth,
        story: {
            title: "书世界",
            subtitle: "shū shì jiè",
            body: "KEY_PAGE_INDEX.SCENE_FIFTH.STORY_BODY",
        },
    },
];
