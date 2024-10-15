/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2022-01-19 15:52:33
 * @LastEditTime: 2023-03-23 18:49:30
 * @LastEditors: Please set LastEditors
 */

import $ from "jquery";
import SimplexNoise from "simplex-noise";
import type PIXI from "pixi.js";
// @ts-expect-error: 暂无需定义其类型
import debounce from "debounce";
import { fsAnimationFrame } from "./fps-animate";

export async function loadPixi() {
    if (!process.browser) return Promise.reject("not in browser");
    const PIXI = await import("pixi.js");
    const { KawaseBlurFilter } = await import("@pixi/filter-kawase-blur");

    // return a random number within a range
    function random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    // map a number from 1 range to another
    function map(
        n: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    }

    // Create a new simplex noise instance
    const simplex = new SimplexNoise();

    // ColorPalette class
    class ColorPalette {
        constructor(public colorChoices = ["#0BBC7C"]) {
            this.colorChoices = colorChoices;
            this.setCustomProperties();
        }

        setColors(colorChoices: string[]) {
            // store the color choices in an array so that a random one can be picked later
            this.colorChoices = colorChoices;
        }

        randomColor(i: number) {
            // pick a random color
            return this.colorChoices[i].replace("#", "0x") as unknown as number;
        }

        setCustomProperties() {
            // set CSS custom properties so that the colors defined here can be used throughout the UI
        }
    }

    type OrbPos = { x: number; y: number };
    type OrbParam = {
        getOrigin: () => OrbPos;
        scaleRange?: [min: number, max: number];
        radius?: number;
    };
    // Orb class
    class Orb {
        public x: number;
        public y: number;

        // how large the orb is vs it's original radius (this will modulate over time)
        public scale = 1;
        public fill: number;
        public radius: number;

        // starting points in "time" for the noise/self similar random values
        public xOff = random(0, 1000);
        public yOff = random(0, 1000);
        public inc: number;
        public bounds: ReturnType<Orb["setBounds"]>;
        public graphics: PIXI.Graphics;
        // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
        constructor(fill = 0x000000, public param: OrbParam) {
            this.param = Object.assign(
                {
                    radius: Math.min(
                        window.innerHeight * 0.2,
                        window.innerWidth * 0.2,
                        592
                    ),
                    scaleRange: [0.5, 1],
                },
                param
            );
            // bounds = the area an orb is "allowed" to move within
            this.bounds = this.setBounds();

            const { x, y } = this.param.getOrigin() || {
                x: this.bounds.originX,
                y: this.bounds.originY,
            };
            // initialise the orb's { x, y } values to a random point within it's bounds
            this.x = random(x + this.bounds["x"].min, x + this.bounds["x"].max);
            this.y = random(y + this.bounds["y"].min, y + this.bounds["y"].max);

            // what color is the orb?
            this.fill = fill;

            // the original radius of the orb, set relative to window height
            this.radius = this.param.radius!;
            // how quickly the noise/self similar random values step through time
            this.inc = 0.002;

            // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
            this.graphics = new PIXI.Graphics();
            this.graphics.alpha = 0.25;

            // 250ms after the last window resize event, recalculate orb positions.
            window.addEventListener(
                "resize",
                debounce(() => {
                    this.bounds = this.setBounds();
                }, 250)
            );
        }
        setBounds() {
            // how far from the { x, y } origin can each orb move
            const maxDist =
                window.innerWidth < 1000
                    ? window.innerWidth / 3
                    : window.innerWidth / 5;
            // the { x, y } origin for each orb (the bottom right of the screen)
            const originX = window.innerWidth / 1.25;
            const originY =
                window.innerWidth < 1000
                    ? window.innerHeight
                    : window.innerHeight / 1.375;

            // allow each orb to move x distance away from it's x / y origin
            return {
                originX,
                originY,
                x: {
                    min: -maxDist,
                    max: +maxDist,
                },
                y: {
                    min: -maxDist,
                    max: +maxDist,
                },
            };
        }

        update() {
            const { x, y } = this.param.getOrigin() || {
                x: this.bounds.originX,
                y: this.bounds.originY,
            };

            // self similar "psuedo-random" or noise values at a given point in "time"
            const xNoise = simplex.noise2D(this.xOff, this.xOff);
            const yNoise = simplex.noise2D(this.yOff, this.yOff);
            const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

            // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
            this.x = map(
                xNoise,
                -1,
                1,
                x + this.bounds["x"].min,
                x + this.bounds["x"].max
            );
            this.y = map(
                yNoise,
                -1,
                1,
                y + this.bounds["y"].min,
                y + this.bounds["y"].max
            );
            // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
            this.scale = map(scaleNoise, -1, 1, 0.5, 1);

            // step through "time"
            this.xOff += this.inc;
            this.yOff += this.inc;
        }

        render() {
            // update the PIXI.Graphics position and scale values
            this.graphics.x = this.x;
            this.graphics.y = this.y;
            this.graphics.scale.set(this.scale);

            // clear anything currently drawn to graphics
            this.graphics.clear();

            // tell graphics to fill any shapes drawn after this with the orb's fill color
            this.graphics.beginFill(this.fill);
            // draw a circle at { 0, 0 } with it's size set by this.radius
            this.graphics.drawCircle(0, 0, this.radius);
            // let graphics know we won't be filling in any more shapes
            this.graphics.endFill();
        }
    }

    type CreateOrbEffectParam = {
        container: HTMLCanvasElement;
        followPointer: boolean;
        colorChoices: string[];
        originPointer: {
            x: number;
            y: number;
        };
        orbParam: Partial<OrbParam>;
    };
    type PickRequired<T, K extends keyof T> = Partial<T> & Pick<Required<T>, K>;

    class createOrbEffect {
        protected orbs: Orb[] = [];
        protected renderFrame = fsAnimationFrame(60);
        public pixiApp!: PIXI.Application;
        protected originPointer: CreateOrbEffectParam["originPointer"];
        public circleState = {
            catch: false,
            position: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            },
        };
        protected colorPalette!: ColorPalette;
        constructor(
            protected param: PickRequired<
                Partial<CreateOrbEffectParam>,
                "container"
            >
        ) {
            this.param = Object.assign(
                {
                    followPointer: true,
                    colorChoices: ["#3af6de", "#00c0ff"],
                    originPointer: {
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                    },
                    orbPram: {},
                },
                param
            );
            this.originPointer = this.param.originPointer!;
        }
        init() {
            this.pixiApp = new PIXI.Application({
                view: this.param.container,
                backgroundAlpha: 0,
            });
            const resize = () => {
                this.pixiApp.renderer.resize(
                    window.innerWidth,
                    window.innerHeight
                );
            };
            resize();

            this.createColorPalette();
            this.initOrb();

            if (this.param.followPointer) {
                this.followPointerHand();
            }
            $(window).on("resize.colorPalette", debounce(resize, 250));
            return this;
        }
        createColorPalette() {
            this.colorPalette = new ColorPalette(this.param.colorChoices);
            this.pixiApp.stage.filters = [new KawaseBlurFilter(45, 15, true)];
        }
        initOrb() {
            for (let i = 0; i < this.colorPalette.colorChoices.length; i++) {
                const orb = new Orb(this.colorPalette.randomColor(i), {
                    getOrigin: () => {
                        return this.originPointer;
                    },
                    ...this.param.orbParam,
                });

                this.pixiApp.stage.addChild(orb.graphics);

                this.orbs.push(orb);
            }
        }
        followPointerHand() {
            $("body").on({
                "pointermove.colorPalette": (ev) => {
                    const pos = this.circleState.catch
                        ? this.circleState.position
                        : {
                              x: ev.clientX,
                              y: ev.clientY,
                          };
                    gsap.to(this.originPointer, {
                        overwrite: true,
                        ...pos,
                        duration: this.circleState.catch ? 2 : 14,
                        ease: "Power3.out",
                    });
                },
            });
        }
        stop = false;
        start() {
            this.renderFrame(() => {
                if (this.stop === true) return true;
                this.orbs.forEach((orb) => {
                    orb.update();
                    orb.render();
                });
                return false;
            });
        }
        destroy() {
            this.stop = true;
            this.pixiApp.destroy();
            this.orbs = [];
            $("body").off("pointermove.colorPalette");
            $(window).off("resize.colorPalette");
        }
    }

    return createOrbEffect;
}
