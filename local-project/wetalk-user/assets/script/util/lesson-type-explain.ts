/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-09 15:19:22
 */

export function lessonTypeExplain(type: string) {
    const explain: Record<string, { title: string; icon: string }> = {
        直播课: {
            title: "直播课",
            icon: "iconfont icon-video",
        },
        录播课: {
            title: "录播课",
            icon: "iconfont icon-tv",
        },
        中心课: {
            title: "中心课",
            icon: "iconfont icon-earth",
        },
    };
    return (
        explain[type] || {
            title: "",
            icon: "",
        }
    );
}
