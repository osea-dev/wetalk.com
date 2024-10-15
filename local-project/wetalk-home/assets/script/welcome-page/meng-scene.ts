import RoleScene from "./role-scene";

export default class MengScene extends RoleScene {
    getMengSceneItem() {
        const roleBox = $("#roleStage");
        const mengRoleScene = $(".role--meng", roleBox);
        return {
            // 孔子图
            mengZiTu: mengRoleScene.find(".layer-renwu"),

            // 中
            zhong: mengRoleScene.find(".layer-zhong"),

            // 国
            guo: mengRoleScene.find(".layer-guo"),

            // 众语
            zhongYu: mengRoleScene.find(".layer-zhongyu"),

            // 孔子字
            yishuzu: mengRoleScene.find(".layer-yishuzu"),

            // 中庸
            zhongYong: mengRoleScene.find(".layer-v-text"),

            // 小字
            xiaoZi: mengRoleScene.find(".layer-r-text"),

            // 笔
            bi: mengRoleScene.find(".layer-bi"),

            // 山
            shan: mengRoleScene.find(".layer-shan"),

            // 白云
            baiyun: mengRoleScene.find(".layer-baiyun1"),

            // 白云2
            baiyun2: mengRoleScene.find(".layer-baiyun2"),
        };
    }
    sceneEnter() {
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.in",
            },
        });

        const {
            shan,
            mengZiTu,
            zhong,
            guo,
            zhongYu,
            yishuzu,
            zhongYong,
            xiaoZi,
            bi,
            baiyun,
            baiyun2,
        } = this.getMengSceneItem();

        const addDis = 9000;

        tl.fromTo(
            shan,
            { z: 4000 },
            { z: 8000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            shan.children(),
            { opacity: 0 },
            { opacity: 1, duration: 2000 },
            2000 * 0.5
        );

        tl.fromTo(
            mengZiTu,
            { z: -4000 },
            { z: 6000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            mengZiTu.children(),
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

        tl.fromTo(bi, { z: -5500 }, { z: 4500 + addDis, duration: 10000 }, "0");
        tl.fromTo(
            bi.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            5500 * 0.5
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
            baiyun.add(baiyun2),
            { z: -2000 },
            { z: 8000 + addDis, duration: 10000 },
            "0"
        );
        tl.fromTo(
            baiyun.add(baiyun2),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            4500
        );

        this.baiyun().timeScale(6000);

        return tl;
    }
    getScrollScene() {
        return gsap.timeline().add(this.sceneEnter());
    }
    baiyun() {
        const { baiyun, baiyun2 } = this.getMengSceneItem();
        const tl = gsap.timeline();
        const anima1 = gsap
            .timeline({ repeat: -1 })
            .fromTo(
                baiyun.children(),
                { opacity: 0 },
                { opacity: 1, duration: 30000 }
            )
            .fromTo(
                baiyun.children(),
                { x: 300 },
                { x: 0, duration: 100000 },
                "<"
            )
            .to(baiyun.children(), { opacity: 0, duration: 30000 }, "-=40000");
        tl.add(anima1);
        const anima2 = gsap
            .timeline({ repeat: -1 })
            .fromTo(
                baiyun2.children(),
                { opacity: 0 },
                { opacity: 1, duration: 30000 }
            )
            .fromTo(
                baiyun2.children(),
                { x: 300 },
                { x: 0, duration: 100000 },
                "<"
            )
            .to(baiyun2.children(), { opacity: 0, duration: 30000 }, "-=40000");
        tl.add(anima2, "-=40000");
        return tl;
    }
}
