import RoleScene from "./role-scene";

export default class ZhuangScene extends RoleScene {
    getZhuangSceneItem() {
        const roleBox = $("#roleStage");
        const zhuangRoleScene = $(".role--zhuang", roleBox);
        return {
            zhuangZiTu: zhuangRoleScene.find(".layer-renwu"),
            zhongYu: zhuangRoleScene.find(".layer-zhongyu"),
            yishuzu: zhuangRoleScene.find(".layer-yishuzu"),
            zhongYong: zhuangRoleScene.find(".layer-v-text"),
            xiaoZi: zhuangRoleScene.find(".layer-r-text"),
            beijing: zhuangRoleScene.find(".layer-beijing"),
            shu: zhuangRoleScene.find(".layer-shu"),
        };
    }
    sceneEnter() {
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.in",
            },
        });

        const {
            zhuangZiTu,
            zhongYu,
            yishuzu,
            zhongYong,
            xiaoZi,
            beijing,
            shu,
        } = this.getZhuangSceneItem();

        const addDis = 9000;

        tl.fromTo(
            zhuangZiTu,
            { z: -4000 },
            { z: 6000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            zhuangZiTu.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            4000 * 0.5
        );

        tl.fromTo(
            zhongYu,
            { z: -6000 },
            { z: 4000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            zhongYu.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            6000 * 0.5
        );

        tl.fromTo(
            yishuzu,
            { z: -5000 },
            { z: 5000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            yishuzu.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            5000 * 0.5
        );

        tl.fromTo(
            zhongYong,
            { z: -7000 },
            { z: 3000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            zhongYong.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            7000 * 0.5
        );

        tl.fromTo(
            xiaoZi,
            { z: -8000 },
            { z: 2000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            xiaoZi.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            8000 * 0.5
        );

        tl.fromTo(
            beijing,
            { z: -7000 },
            { z: 3000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            beijing.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            7000 * 0.6
        );

        tl.fromTo(
            shu,
            { z: -2000 },
            { z: 9000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            shu.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            3000 * 0.5
        );

        return tl;
    }
    getScrollScene() {
        return gsap.timeline().add(this.sceneEnter());
    }
}
