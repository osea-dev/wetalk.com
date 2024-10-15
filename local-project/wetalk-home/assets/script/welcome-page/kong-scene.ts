import RoleScene from "./role-scene";

export default class KongScene extends RoleScene {
    getKongSceneItem() {
        const roleBox = $("#roleStage");
        const kongRoleScene = $(".role--kong", roleBox);
        return {
            // 云
            yun: kongRoleScene.find(".layer-7"),

            // 孔子图
            kongZiTu: kongRoleScene.find(".layer-5"),

            // 中
            zhong: kongRoleScene.find(".layer-3"),

            // 国
            guo: kongRoleScene.find(".layer-2"),

            // 众语
            zhongYu: kongRoleScene.find(".layer-4"),

            // 孔子字
            kongZiZi: kongRoleScene.find(".layer-6"),

            // 中庸
            zhongYong: kongRoleScene.find(".layer-8"),

            // 小字
            xiaoZi: kongRoleScene.find(".layer-9"),

            // 背景
            shan: kongRoleScene.find(".layer-1"),

            // 白云
            baiyun: kongRoleScene.find(".layer-10"),

            // 白云2
            baiyun2: kongRoleScene.find(".layer-11"),
        };
    }
    sceneEnter(enterEnd: () => void) {
        const tl = gsap.timeline({
            paused: true,
            defaults: {
                ease: "power3.out",
            },
        });

        const {
            yun,
            kongZiTu,
            zhong,
            guo,
            zhongYu,
            kongZiZi,
            zhongYong,
            xiaoZi,
            shan,
        } = this.getKongSceneItem();

        tl.fromTo(yun, { z: -2000 }, { z: 8000, duration: 10000 }, "0");
        tl.fromTo(
            yun.children(),
            { opacity: 0 },
            { opacity: 1, duration: 2000 },
            2000 * 0.5
        );

        tl.fromTo(kongZiTu, { z: -4000 }, { z: 6000, duration: 10000 }, "0");
        tl.fromTo(
            kongZiTu.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            4000 * 0.5
        );

        tl.fromTo(
            zhong.add(guo).add(zhongYu),
            { z: -6000 },
            { z: 4000, duration: 10000 },
            "0"
        );
        tl.fromTo(
            zhong.add(guo).add(zhongYu).children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            6000 * 0.5
        );

        tl.fromTo(kongZiZi, { z: -5000 }, { z: 5000, duration: 10000 }, "0");
        tl.fromTo(
            kongZiZi.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            5000 * 0.5
        );

        tl.fromTo(zhongYong, { z: -7000 }, { z: 3000, duration: 10000 }, "0");
        tl.fromTo(
            zhongYong.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            7000 * 0.5
        );

        tl.fromTo(xiaoZi, { z: -8000 }, { z: 2000, duration: 10000 }, "0");
        tl.fromTo(
            xiaoZi.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            8000 * 0.5
        );

        tl.fromTo(shan, { z: -9000 }, { z: 1000, duration: 10000 }, "0");
        tl.fromTo(
            shan.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            9000 * 0.5
        );

        tl.add(() => {
            enterEnd();
        });

        tl.add(this.baiyun(), "-=5000");

        return tl;
    }
    initScene() {
        const tl = gsap.timeline();

        const {
            yun,
            kongZiTu,
            zhong,
            guo,
            zhongYu,
            kongZiZi,
            zhongYong,
            xiaoZi,
            shan,
            baiyun,
            baiyun2,
        } = this.getKongSceneItem();

        tl.to(yun, { z: "+=9000" }, "0");
        tl.to(kongZiTu, { z: "+=9000" }, "0");
        tl.to(zhong, { z: "+=9000" }, "0");
        tl.to(guo, { z: "+=9000" }, "0");
        tl.to(zhongYu, { z: "+=9000" }, "0");
        tl.to(kongZiZi, { z: "+=9000" }, "0");
        tl.to(zhongYong, { z: "+=9000" }, "0");
        tl.to(xiaoZi, { z: "+=9000" }, "0");
        tl.to(shan, { z: "+=9000" }, "0");
        tl.to(baiyun, { z: "+=9000" }, "0");
        tl.to(baiyun2, { z: "+=9000" }, "0");

        return tl;
    }
    baiyun() {
        const { baiyun, baiyun2 } = this.getKongSceneItem();
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
    getScrollScene() {
        return this.initScene();
    }
}
