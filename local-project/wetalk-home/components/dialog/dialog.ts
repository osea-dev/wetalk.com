/*
 * @Description: 弹窗
 * @Author: F-Stone
 * @LastEditTime: 2022-09-06 11:22:02
 */
import Vue from "vue";
import DialogLayer from "./DialogLayer.vue";
import type { VNode } from "vue";

const DialogConstructor = Vue.extend(DialogLayer);

let instance: Vue;
const Dialog = function (options: {
    propsData: {
        _container_props?: Record<string, any>;
        container: string | VNode;
    };
}) {
    let vContainer: VNode | null = null;
    if (typeof options.propsData.container != "string") {
        vContainer = options.propsData.container;
        options.propsData.container = "";
    }
    instance = new DialogConstructor({
        propsData: {
            onDestroy: () => {
                instance.$destroy();
                instance.$el.remove();
            },
            ...options.propsData,
        },
    });

    if (vContainer) {
        instance.$slots.default = [vContainer];
    }

    instance.$mount();
    document.body.appendChild(instance.$el);
    return instance;
};

export default Dialog;
