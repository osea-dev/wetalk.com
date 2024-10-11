import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, ScrollToPlugin, ScrollTrigger);
CustomEase.create("cloud-wave", "0.455, 0.03, 0.515, 0.955");
CustomEase.create("better-elastic", "0.9, 0, 0.3, 0.8");
