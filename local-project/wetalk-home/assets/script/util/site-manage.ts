/*
 * @Description: site-manage
 * @Author: F-Stone
 * @LastEditTime: 2022-09-07 16:52:21
 */
interface TYPE_EVENT_CALLBACK {
    _once?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}
interface TYPE_EVENT {
    name: string;
    desc: string;
    detail: Map<string, (TYPE_EVENT_CALLBACK | undefined)[]>;
}

class Emitter {
    events: Map<string, TYPE_EVENT> = new Map();
    once(name: string, callback: TYPE_EVENT_CALLBACK): void {
        callback._once = true;
        this.on(name, callback);
    }
    on(name: string, callback: TYPE_EVENT_CALLBACK): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (this.events.has(eventName)) {
            const originEmit = this.events.get(eventName);
            const detail = originEmit?.detail.get(name);
            if (detail) {
                detail.push(callback);
            } else {
                originEmit?.detail.set(name, [callback]);
            }
        } else {
            const newEvent: TYPE_EVENT = {
                name: eventName,
                desc: "",
                detail: new Map().set(name, [callback]),
            };
            this.events.set(eventName, newEvent);
        }
    }
    off(name?: string, callback?: TYPE_EVENT_CALLBACK): void {
        if (!name) {
            this.events.forEach((item) => {
                item.detail.clear();
            });
            this.events.clear();
            return;
        }
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (this.events.has(eventName)) {
            const originEmit = this.events.get(eventName);
            if (!originEmit) return;
            if (callback) {
                const originCallbacks = originEmit.detail.get(name);
                if (originCallbacks) {
                    originCallbacks.forEach((fn, i) => {
                        if (fn == callback) {
                            originCallbacks[i] = undefined;
                        }
                    });
                }
            } else if (eventName == name) {
                originEmit.detail.clear();
            } else {
                originEmit.detail.delete(eventName);
            }
        }
    }

    emit(name: string, data?: any[]): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (!this.events.has(eventName)) return;
        const event = this.events.get(eventName);
        if (name == eventName) {
            event?.detail.forEach((taskGroup) => {
                taskGroup.forEach((fn) => {
                    if (fn?._once) {
                        this.off(name, fn);
                    }
                    fn?.apply(this || window, data as []);
                });
            });
        } else {
            if (!event?.detail.has(name)) return;
            event?.detail.get(name)?.forEach((fn) => {
                if (fn?._once) {
                    this.off(name, fn);
                }
                fn?.apply(this || window, data as []);
            });
        }
    }
}

const getType = (b: unknown) =>
    Object.prototype.toString.call(b).slice(8, -1).toLowerCase();
export default class SiteManageBase {
    name = "";
    initEnd = false;

    static PAGE_NAME?: string;
    static SITE_NAME?: string;
    readonly events = new Emitter();
    readonly preTask: string[] = [];
    readonly defaultTask: string[] = [];
    readonly disableTask: string[] = [];
    readonly currentTask: string[] = [];

    getTask(taskName: any, disableTask: string[] = []): () => Promise<unknown> {
        if (
            !(taskName in this) ||
            typeof this[taskName as keyof this] != "function"
        ) {
            throw new Error(`不存在 ${taskName} 方法`);
        }
        if ([...this.disableTask, ...disableTask].includes(taskName)) {
            return () => Promise.resolve(undefined);
        }
        return (
            this[taskName as keyof this] as unknown as () => Promise<unknown>
        ).bind(this);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(...arg: unknown[]): void {
        this.events.emit("initEnd");
        return;
    }

    init(param?: {
        preTask?: string[];
        disableTask?: (string | (() => void))[];
        currentTask?: (string | (() => void))[];
    }): this {
        if (this.initEnd) return this;
        const _param = Object.assign(
            {
                preTask: [],
                disableTask: [],
                currentTask: [],
            },
            param || {}
        );
        const preTaskList: Promise<unknown>[] = [];
        const preTasks: (string | (() => any))[] = [
            ...this.preTask,
            ..._param.preTask,
        ];
        preTasks.forEach((task) => {
            try {
                let taskResult;
                if (typeof task === "string") {
                    taskResult = this.getTask(task)();
                } else {
                    taskResult = task.call(this);
                }
                if (getType(taskResult) == "promise") {
                    preTaskList.push(taskResult);
                } else {
                    preTaskList.push(Promise.resolve(taskResult));
                }
            } catch (error) {
                preTaskList.push(Promise.reject(error));
            }
        });

        const defaultTasks: (string | (() => any))[] = [
            ...this.defaultTask,
            ...this.currentTask,
            ..._param.currentTask,
        ];
        const currentTaskList: Promise<unknown>[] = [];
        defaultTasks.forEach((task) => {
            try {
                let taskResult;
                if (typeof task === "string") {
                    if (task in this) {
                        taskResult = this.getTask(task)();
                    }
                } else {
                    taskResult = task.call(this);
                }
                if (getType(taskResult) == "promise") {
                    currentTaskList.push(taskResult);
                } else {
                    currentTaskList.push(Promise.resolve(taskResult));
                }
            } catch (error) {
                preTaskList.push(Promise.reject(error));
            }
        });
        Promise.all(defaultTasks)
            .then((...res) => {
                this.initEnd = true;
                return this.afterInit(res);
            })
            .catch((err) => {
                console.log("err:", err);
            });
        return this;
    }

    destroy(): void {
        this.events.off();
    }
}
