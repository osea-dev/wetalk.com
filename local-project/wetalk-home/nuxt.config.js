import { ProvidePlugin } from "webpack";
import { defaultGetLocalIdent } from "./css-loader";

const ENV = {
    // DOMAIN: "http://localhost:5001",
    DOMAIN: "https://www.wetalk.com",
    // DOMAIN: "http://0.0.0.0",
};

export default {
    alias: {
        // rootPath
        "~": __dirname,
        // srcPath
        "@": __dirname,
    },
    server: {
        host: "0.0.0.0",
        port: "30000",
    },
    env: ENV,
    // Global page headers: https://go.nuxtjs.dev/config-head
    head() {
        const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
        return {
            title: this.$i18n.t("KEY_META_TITLE"),
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
                },
                { hid: "description", name: "description", content: "" },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: this.$i18n.t("KEY_META_TITLE"),
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: this.$i18n.t("KEY_META_TITLE"),
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: process.env.DOMAIN + "/facebook140.jpg",
                },
                {
                    hid: "og:site_name",
                    property: "og:site_name",
                    content: this.$i18n.t("KEY_META_TITLE"),
                },
                { hid: "og:type", property: "og:type", content: "website" },
                { name: "format-detection", content: "telephone=no" },
                ...i18nHead.meta,
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "/wetalk.svg" },
                ...i18nHead.link,
            ],
            script: [
                {
                    // src: "https://hm.baidu.com/hm.js?7ca2b7fc4f0d4a617afcd2045f73cd32",
                },
            ],
        };
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "@wetalk/wetalk-assets/assets/style/fonts.scss",
        "@wetalk/wetalk-assets/assets/style/reset.scss",
        "@/assets/style/fonts.scss",
        "@/assets/style/reset.scss",
        "@/assets/style/global.scss",
        "@/assets/style/entry.scss",
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "@/plugins/vue-dialog.client.ts",
        "@/plugins/enter-anime.client.ts",
        "@/plugins/vue-plugin.client.ts",
        "@/plugins/axios.ts",
        "@/plugins/scroll.client.ts",
        "@/plugins/swiper.client.ts",
        "@/plugins/gsap.client.ts",
        "@/plugins/notification.client",
        "@/plugins/breakpoint.client.ts",
        "@/plugins/client-service.client.ts",
        "@/plugins/dvh.client.ts",
        // "@/plugins/baidu.client.ts",
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://composition-api.nuxtjs.org/getting-started/setup
        "@nuxtjs/composition-api/module",
        "@nuxtjs/style-resources",
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/stylelint
        "@nuxtjs/stylelint-module",
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "cookie-universal-nuxt",
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "@nuxtjs/i18n",
    ],

    i18n: {
        lazy: true,
        langDir: "i18n/",
        locales: [
            {
                code: "zh-cn",
                iso: "zh-CN",
                file: "zh-CN.js",
                name: "简体中文",
            },
            {
                code: "zh-tw",
                iso: "zh-TW",
                file: "zh-TW.js",
                name: "繁体中文",
            },
            {
                code: "en",
                iso: "en-US",
                file: "en.js",
                name: "English",
            },
        ],
        defaultLocale: "zh-cn",
        detectBrowserLanguage: {
            alwaysRedirect: true,
            fallbackLocale: "",
            redirectOn: "all",
            useCookie: true,
            cookieAge: 365,
            cookieCrossOrigin: false,
            cookieDomain: null,
            cookieKey: "Accept-Language",
            cookieSecure: false,
        },
        vueI18n: {
            fallbackLocale: "zh-cn",
            silentFallbackWarn: true,
            silentTranslationWarn: true,
        },
        vueI18nLoader: true,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        proxy: true,
    },
    publicRuntimeConfig: {
        axios: {
            browserBaseURL: process.env.BASE_URL,
        },
    },
    privateRuntimeConfig: {
        axios: {
            baseURL: process.env.API_BASE_URL,
        },
    },

    proxy: {
        "/Upfile": {
            target: process.env.API_BASE_URL,
            changeOrigin: true,
            secure: true,
        },
        "/Api/V1": {
            target: process.env.API_BASE_URL,
            changeOrigin: true,
            secure: true,
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        publicPath: "/wetalk-home-oss",
        postcss: {
            plugins: {
                "postcss-sass-unicode": true,
            },
        },
        transpile: ["gsap/ScrollTrigger"],
        plugins: [
            new ProvidePlugin({
                $: "jquery",
                gsap: ["gsap", "gsap"],
            }),
        ],
        extend(config) {
            config.module.rules.push({
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: [
                        { globalName: "$", override: true },
                        {
                            globalName: "jQuery",
                            override: true,
                        },
                    ],
                },
            });
        },
        loaders: {
            cssModules: {
                modules: {
                    // localIdentName: "[local]_[hash:base62]",
                    getLocalIdent: defaultGetLocalIdent,
                },
            },
            vue: {
                transformAssetUrls: {
                    source: "src",
                    object: "src",
                    embed: "src",
                    video: ["src", "poster"],
                    img: ["src", "data-src"],
                    image: ["xlink:href", "href"],
                    use: ["xlink:href", "href"],
                },
            },
        },
    },

    // module configuration: https://www.npmjs.com/package/@nuxtjs/style-resources
    styleResources: {
        scss: [
            "@wetalk/wetalk-assets/assets/style/abstracts/_mixins.scss",
            "@wetalk/wetalk-assets/assets/style/vars/*.scss",
            "~assets/style/abstracts/_mixins.scss",
            "~assets/style/vars/*.scss",
        ],
    },

    tailwindcss: {
        cssPath: "~/assets/style/tailwind.css",
        viewer: true,
    },
};
