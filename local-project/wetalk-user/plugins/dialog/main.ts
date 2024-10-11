/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-06 16:12:48
 */
import "./style.scss";
import { gsap } from "gsap";
import Vue from "vue";
import DialogLayer from "./DialogLayer.vue";
import type { VNode } from "vue";

const DialogConstructor = Vue.extend(DialogLayer);

type MessageOption =
    | {
          type: "video";
          poster: string;
          src: string;
      }
    | {
          type: "image";
          src: string;
          title?: string;
      }
    | {
          type: "iframe";
          src: string;
          title?: string;
      }
    | {
          type: "custom";
          container: string | VNode;
          parent?: any;
          propsData?: Record<string, any>;
      };
//   InstanceType

const Dialog = function (options: MessageOption) {
    let dialogBody = "";
    if (options.type === "custom") {
        let vContainer: VNode | null = null;
        const propsData = options.propsData || {};

        if (typeof options.container != "string") {
            vContainer = options.container;
            propsData.container = "";
        }
        const instance = new DialogConstructor({
            parent: options.parent,
            propsData: {
                onDestroy: () => {
                    instance.$destroy();
                    instance.$el.remove();
                },
                ...propsData,
            },
        });

        if (vContainer) {
            instance.$slots.default = [vContainer];
        }

        instance.$mount();
        document.body.appendChild(instance.$el);
        return {
            instance,
            close: () => {
                (instance as any).close();
            },
        };
    }

    switch (options.type) {
        case "video":
            dialogBody = `
                <video
                    src="${options.src}"
					controlslist="nodownload"
                    controls
                ></video>
            `;
            break;
        case "iframe":
            dialogBody = `
                <iframe src="${options.src}" frameborder="0"></iframe>
                `;
            break;
        case "image":
            dialogBody = `
                    <img src="${options.src}" />
                `;
            if (options.title) {
                dialogBody += `<p>${options.title}</p>`;
            }
            break;

        default:
            break;
    }
    const $dialogDom = $(`
        <div data-type="${options.type}" class="dialog-component flex items-center justify-center">
            <div class="dialog-body">
                ${dialogBody}
            </div>
        </div>
    `);

    const openAnime = gsap
        .timeline({
            paused: true,
            onStart: onOpen,
            onReverseComplete() {
                $dialogDom.remove();
            },
        })
        .to($dialogDom[0], {
            background: "rgba(0,0,0,0.76)",
            duration: 0.16,
        })
        .fromTo(
            $dialogDom.find(" .dialog-body"),
            { opacity: 0, yPercent: 20 },
            { opacity: 1, yPercent: 0, duration: 0.36 },
            "-=0.1"
        );
    function onOpen() {
        $dialogDom.appendTo("body");
        switch (options.type) {
            case "video":
                {
                    const video = $dialogDom.find("video")[0];
                    video.play();
                    video.volume = 0.5;
                }
                break;

            default:
                break;
        }
    }

    function onClose() {
        switch (options.type) {
            case "video":
                {
                    const video = $dialogDom.find("video")[0];
                    video.pause();
                    video.volume = 0.5;
                }
                break;

            default:
                break;
        }
    }
    $dialogDom.on("click", (ev: Event) => {
        if (ev.target === $dialogDom[0]) {
            onClose();
            openAnime.reverse();
        }
    });
    requestAnimationFrame(() => {
        openAnime.play();
    });
    return {
        close: () => {
            onClose();
        },
    };
};

export default Dialog;
