import RoleScene from "./role-scene";

export default class LaoScene extends RoleScene {
    getLaoSceneItem() {
        const roleBox = $("#roleStage");
        const laoRoleScene = $(".role--lao", roleBox);
        return {
            laoZiTu: laoRoleScene.find(".layer-renwu"),
            zhong: laoRoleScene.find(".layer-zhong"),
            guo: laoRoleScene.find(".layer-guo"),
            zhongYu: laoRoleScene.find(".layer-zhongyu"),
            yishuzu: laoRoleScene.find(".layer-yishuzu"),
            zhongYong: laoRoleScene.find(".layer-v-text"),
            xiaoZi: laoRoleScene.find(".layer-r-text"),
            heHua: laoRoleScene.find(".layer-hehua"),
        };
    }
    sceneEnter() {
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.in",
            },
        });

        const {
            laoZiTu,
            zhong,
            guo,
            zhongYu,
            yishuzu,
            zhongYong,
            xiaoZi,
            heHua,
        } = this.getLaoSceneItem();

        const addDis = 9000;

        tl.fromTo(
            laoZiTu,
            { z: -3000 },
            { z: 7000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            laoZiTu.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            4000 * 0.5
        );

        tl.fromTo(
            zhong.add(guo).add(zhongYu),
            { z: -6000 },
            { z: 4000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            zhong.add(guo).add(zhongYu).children(),
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
            heHua,
            { z: -3000 },
            { z: 3000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            heHua.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            9000 * 0.2
        );

        return tl;
    }
    getScrollScene() {
        return gsap.timeline().add(this.sceneEnter());
    }
}
