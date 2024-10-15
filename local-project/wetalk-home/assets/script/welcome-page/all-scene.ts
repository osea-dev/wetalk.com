/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-20 19:26:03
 */

import RoleScene from "./role-scene";

export default class RolesScene extends RoleScene {
    getRolesSceneItem() {
        const roleBox = $("#roleStage");
        const rolesScene = $(".role--all", roleBox);
        return {
            kong: rolesScene.find(".layer-role-1"),
            meng: rolesScene.find(".layer-role-2"),
            lao: rolesScene.find(".layer-role-3"),
            zhuang: rolesScene.find(".layer-role-4"),
            shan: rolesScene.find(".layer-shan"),
            cloud: rolesScene.find(".layer-cloud"),
            cloudLeft: rolesScene.find(".layer-cloud-left"),
            layerLogo: rolesScene.find(".layer-logo"),
            layerBtn: rolesScene.find(".layer-btn"),
        };
    }
    public animateTl = gsap.timeline({
        defaults: {
            ease: "power1.out",
        },
    });

    addAnime(
        dom: Element,
        {
            startPos,
            endPos,
            startTime,
        }: { startPos: number; endPos: number; startTime: string | number }
    ) {
        this.animateTl
            .fromTo(
                dom,
                { z: startPos },
                { z: endPos, duration: endPos - startPos },
                startTime
            )
            .fromTo(
                $(dom).children(),
                { opacity: 0 },
                { opacity: 1, duration: 4000 },
                startTime + "+=1000"
            );
    }

    sceneEnter() {
        const {
            shan,
            kong,
            meng,
            lao,
            zhuang,
            cloud,
            cloudLeft,
            layerBtn,
            layerLogo,
        } = this.getRolesSceneItem();

        const roleStage = 1000;

        this.addAnime(kong[0], {
            startPos: -5000,
            endPos: 5000,
            startTime: roleStage * 1,
        });

        this.addAnime(meng[0], {
            startPos: -5000,
            endPos: 5000,
            startTime: roleStage * 2,
        });

        this.addAnime(lao[0], {
            startPos: -5000,
            endPos: 5000,
            startTime: roleStage * 3,
        });

        this.addAnime(zhuang[0], {
            startPos: -5000,
            endPos: 5000,
            startTime: roleStage * 4,
        });

        this.addAnime(shan[0], {
            startPos: -7000,
            endPos: 3000,
            startTime: "<",
        });

        this.animateTl.fromTo(
            shan.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            "<"
        );

        this.addAnime(cloud[0], {
            startPos: -4000,
            endPos: 6000,
            startTime: "0",
        });

        this.animateTl.fromTo(
            cloud.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            "<+=1000"
        );

        this.addAnime(cloudLeft[0], {
            startPos: -1000,
            endPos: 9000,
            startTime: "0",
        });

        this.animateTl.fromTo(
            cloudLeft.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            "<"
        );

        this.animateTl.fromTo(
            layerBtn.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            "+=0"
        );

        this.animateTl.fromTo(
            layerLogo.children(),
            { opacity: 0 },
            { opacity: 1, duration: 4000 },
            "<"
        );

        return this.animateTl;
    }
    getScrollScene() {
        return gsap.timeline().add(this.sceneEnter());
    }
}
