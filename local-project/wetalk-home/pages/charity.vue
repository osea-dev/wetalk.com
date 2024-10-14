<template>
    <main :class="$style['charity-page']">
        <div
            class="p-module"
            :class="$style['banner-module']"
            ref="bannerModule"
        >
            <div :class="$style['module-body']">
                <div :class="$style['module-bg']">
                    <img src="@/assets/images/charity/banner-bg-2.png" alt="" />
                </div>
                <div class="wrapper--limit-width relative z-10">
                    <div class="wrapper--limit-width-mini">
                        <div :class="$style['module-title']">
                            <img
                                src="@/assets/images/charity/banner-title-1.png"
                                alt=""
                            />
                            <img
                                src="@/assets/images/charity/banner-title-2.png"
                                alt=""
                            />
                            <img
                                src="@/assets/images/charity/banner-title-3.png"
                                alt=""
                            />
                            <img
                                src="@/assets/images/charity/banner-title-4.png"
                                alt=""
                            />
                        </div>
                        <div :class="$style['module-info']" class="grid">
                            <div :class="$style['line']"></div>
                            <p
                                v-html="
                                    $t(
                                        'KEY_PAGE_CHARITY.MODULE_BANNER.INTRO[0]'
                                    )
                                "
                            ></p>
                            <p
                                v-html="
                                    $t(
                                        'KEY_PAGE_CHARITY.MODULE_BANNER.INTRO[1]'
                                    )
                                "
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-module" :class="$style['charity-category-module']">
            <div class="wrapper--limit-width">
                <div class="wrapper--limit-width-mini">
                    <div :class="$style['module-head']">
                        <h2 :class="$style['module-title']">
                            {{ $t("KEY_PAGE_CHARITY.MODULE_CATEGORY.TITLE") }}
                        </h2>
                    </div>
                    <div :class="$style['module-body']">
                        <div
                            :class="$style['category-list']"
                            class="grid grid-cols-2 wow wow-group-2"
                        >
                            <div
                                :class="$style['category-item']"
                                class="wow animate__fadeInUp-30_percent"
                                v-for="(item, index) in categoryList"
                                :key="index"
                            >
                                <div :class="$style['item-thumb']">
                                    <img :src="item.thumb" alt="" />
                                </div>
                                <div :class="$style['item-info']">
                                    <div :class="$style['item-title']">
                                        {{ $t(item.title) }}
                                    </div>
                                    <div :class="$style['item-desc']">
                                        {{ $t(item.desc) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="p-module relative overflow-hidden"
            :class="$style['charity-intro-module']"
        >
            <div class="wrapper--limit-width">
                <div
                    class="wrapper--limit-width-mini flex justify-between xl:block"
                >
                    <div
                        :class="$style['module-bg']"
                        class="wow animate__fadeInLeft-50"
                    ></div>
                    <div :class="$style['module-head']">
                        <h2
                            :class="$style['module-title']"
                            v-html="$t('KEY_PAGE_CHARITY.MODULE_INTRO.TITLE')"
                        ></h2>
                    </div>
                    <div :class="$style['module-body']">
                        <div
                            :class="$style['intro-list']"
                            class="grid grid-cols-2 wow wow-group-2 md:grid-cols-1"
                        >
                            <div
                                :class="$style['intro-item']"
                                class="wow animate__fadeInUp-30_percent"
                                v-for="(item, index) in introList"
                                :key="index"
                            >
                                <div :class="$style['item-thumb']">
                                    <img :src="item.thumb" alt="" />
                                </div>
                                <div :class="$style['item-info']">
                                    <div :class="$style['item-title']">
                                        {{ $t(item.title) }}
                                    </div>
                                    <div :class="$style['item-desc']">
                                        {{ $t(item.desc) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-module" :class="$style['charity-event-module']">
            <div class="wrapper--limit-width">
                <div class="wrapper--limit-width-mini">
                    <div
                        :class="$style['module-body']"
                        class="grid grid-cols-2 md:grid-cols-1"
                    >
                        <div
                            :class="$style['left']"
                            class="grid grid-flow-dense wow wow-group-3"
                        >
                            <div
                                :class="$style['module-head']"
                                class="wow animate__fadeInLeft-50"
                            >
                                <h2
                                    :class="$style['module-title']"
                                    v-html="
                                        $t(
                                            'KEY_PAGE_CHARITY.MODULE_EVENT.TITLE'
                                        )
                                    "
                                ></h2>
                            </div>
                            <div
                                :class="$style['event-item']"
                                class="wow animate__fadeInLeft-50"
                                v-for="(item, index) in eventListLeft"
                                :key="index"
                            >
                                <div :class="$style['item-bg']">
                                    <img :src="item.thumb" alt="" />
                                </div>
                                <div :class="$style['item-info']">
                                    <div :class="$style['item-title']">
                                        {{ $t(item.title) }}
                                    </div>
                                    <div :class="$style['item-desc']">
                                        {{ $t(item.desc) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            :class="$style['right']"
                            class="grid wow wow-group-3"
                        >
                            <div
                                :class="$style['event-item']"
                                class="wow animate__fadeInRight-50"
                                v-for="(item, index) in eventListRight"
                                :key="index"
                            >
                                <div :class="$style['item-bg']">
                                    <img :src="item.thumb" alt="" />
                                </div>
                                <div :class="$style['item-info']">
                                    <div :class="$style['item-title']">
                                        {{ $t(item.title) }}
                                    </div>
                                    <div :class="$style['item-desc']">
                                        {{ $t(item.desc) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MessageBoard class="p-module" />
    </main>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { onMounted, ref, useCssModule } from "vue";

export default defineComponent({
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.CHARITY.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.CHARITY.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.CHARITY.DESC"),
                },
            ],
        };
    },
    setup() {
        const categoryList = [
            {
                thumb: require("@/assets/images/charity/c-0.png"),
                title: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[0].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[0].DESC",
            },
            {
                thumb: require("@/assets/images/charity/c-1.png"),
                title: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[1].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[1].DESC",
            },
            {
                thumb: require("@/assets/images/charity/c-2.png"),
                title: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[2].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[2].DESC",
            },
            {
                thumb: require("@/assets/images/charity/c-3.png"),
                title: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[3].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_CATEGORY.LIST[3].DESC",
            },
        ];
        const introList = [
            {
                thumb: require("@/assets/images/charity/intro-0.png"),
                title: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[0].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[0].DESC",
            },
            {
                thumb: require("@/assets/images/charity/intro-1.png"),
                title: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[1].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[1].DESC",
            },
            {
                thumb: require("@/assets/images/charity/intro-2.png"),
                title: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[2].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[2].DESC",
            },
            {
                thumb: require("@/assets/images/charity/intro-3.png"),
                title: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[3].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_INTRO.LIST[3].DESC",
            },
        ];
        const eventListLeft = [
            {
                thumb: require("@/assets/images/charity/e-0.png"),
                title: "KEY_PAGE_CHARITY.MODULE_EVENT.LEFT_LIST[0].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_EVENT.LEFT_LIST[0].DESC",
            },
            {
                thumb: require("@/assets/images/charity/e-1.png"),
                title: "KEY_PAGE_CHARITY.MODULE_EVENT.LEFT_LIST[1].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_EVENT.LEFT_LIST[1].DESC",
            },
        ];
        const eventListRight = [
            {
                thumb: require("@/assets/images/charity/e-2.png"),
                title: "KEY_PAGE_CHARITY.MODULE_EVENT.RIGHT_LIST[0].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_EVENT.RIGHT_LIST[0].DESC",
            },
            {
                thumb: require("@/assets/images/charity/e-3.png"),
                title: "KEY_PAGE_CHARITY.MODULE_EVENT.RIGHT_LIST[1].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_EVENT.RIGHT_LIST[1].DESC",
            },
            {
                thumb: require("@/assets/images/charity/e-4.png"),
                title: "KEY_PAGE_CHARITY.MODULE_EVENT.RIGHT_LIST[2].TITLE",
                desc: "KEY_PAGE_CHARITY.MODULE_EVENT.RIGHT_LIST[2].DESC",
            },
        ];

        const bannerModule = ref<HTMLElement>();
        const $sn = useCssModule();
        function bannerModuleEnter() {
            if (!bannerModule.value) return;
            const bgDom = $(bannerModule.value).find("." + $sn["module-bg"]);
            const titleDom = $(bannerModule.value).find(
                "." + $sn["module-title"]
            );
            const infoDom = $(bannerModule.value).find(
                "." + $sn["module-info"]
            );
            const tl = gsap.timeline();
            tl.fromTo(
                bgDom,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.6 }
            );
            tl.fromTo(
                bgDom,
                { scaleY: 0.8, transformOrigin: "bottom" },
                { scaleY: 1, duration: 1 },
                "<"
            );
            tl.fromTo(
                titleDom.find("img").eq(0),
                {
                    yPercent: 20,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                },
                "-=0.46"
            );
            tl.fromTo(
                titleDom.find("img").eq(1),
                {
                    yPercent: 20,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                },
                "-=0.46"
            );
            tl.fromTo(
                titleDom.find("img").eq(2),
                {
                    opacity: 0,
                    rotateY: 75,
                    y: 20,
                },
                {
                    opacity: 1,
                    rotateY: 0,
                    duration: 3,
                    y: 0,
                    ease: "elastic.out(1, 0.3)",
                },
                "-=0.2"
            );
            tl.fromTo(
                titleDom.find("img").eq(3),
                { opacity: 0 },
                { opacity: 1, duration: 2 },
                "<"
            );
            tl.fromTo(
                infoDom,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "<<"
            );
        }
        onMounted(() => {
            bannerModuleEnter();
        });
        return {
            categoryList,
            introList,
            eventListLeft,
            eventListRight,
            bannerModule,
        };
    },
});
</script>
<style lang="scss" module>
.charity-page {
    :global(.wrapper--limit-width-mini) {
        width: 1200px;
    }
}
.banner-module {
    background: linear-gradient(180deg, #f5f6fb 0%, rgb(245 246 251 / 0) 100%);
    .module-title {
        @include image-placeholder(630px, 274px);
        position: relative;

        overflow: visible;

        width: 631px;
        margin-bottom: 40px;

        perspective: 3000px;
        perspective-origin: top right;
        perspective-origin: 85% 10%;
        & > img {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;

            transform-origin: 85% 10%;

            transform-style: preserve-3d;
        }
    }
    .module-body {
        min-height: 800px;
        padding: min(210px, 11vw) 0 60px;

        background-image: linear-gradient(
                180deg,
                #fef6e0 0%,
                rgb(254 246 224 / 0) 100%
            ),
            url("@/assets/images/charity/banner-bg.png");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .module-bg {
        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        overflow: hidden;

        width: 100%;

        justify-content: center;
        img {
            display: inline-block;

            min-width: 1680px;
            max-width: initial;
        }
    }
    .module-info {
        font-size: 14px;
        font-weight: 500;
        line-height: em(32px, 14px);

        padding: 60px 70px;

        color: #2d2b32;
        border-radius: 10px;
        background-color: #fff;

        gap: 55px;
        grid-template-columns: 2px 1fr 1fr;
        .line {
            position: relative;
            &::after {
                position: absolute;
                top: 10px;
                bottom: 10px;
                left: 0;

                display: block;

                width: 2px;

                content: "";

                background-color: #000;
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        .module-body {
            padding: min(180px, 11vw) 0 60px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-body {
            min-height: auto;
            padding: min(220px, 12vw) 0 60px;
        }
        .module-title {
            width: min(631px, 49%);
            margin-bottom: 80px;
        }
        .module-info {
            padding: 50px 60px;

            box-shadow: 0 20px 40px rgb(0 0 0 / 2%);

            gap: 15px 45px;
        }
        .module-bg {
            img {
                min-width: 1560px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .module-body {
            padding: min(180px, 20vw) 0 60px;
        }
        .module-bg {
            top: 130px;
            img {
                min-width: 1140px;
            }
        }
        .module-title {
            width: min(500px, 56%);
            margin-bottom: 100px;
        }
        .module-info {
            box-shadow: 0 20px 40px rgb(0 0 0 / 2%);

            grid-template-columns: 2px 1fr;
            .line {
                grid-area: 1 / 1 / 3 / 2;
                &::after {
                    width: 3px;
                }
            }
            p:last-child {
                grid-area: 2 / 2 / 3 / 3;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .module-bg {
            img {
                min-width: 880px;
            }
        }
        .module-title {
            width: min(440px, 80%);
            margin: 0 auto;
            margin-bottom: 60px;
        }
        .module-info {
            font-size: 13px;

            padding: 40px;

            gap: 10px 30px;
        }
    }
    @include media-breakpoint-down(md) {
        .module-bg {
            top: 60px;
        }
        .module-body {
            padding: 120px 0 40px;
        }
        .module-title {
            margin-bottom: 50px;
        }
    }
    @include media-breakpoint-down(sm) {
        .module-bg {
            img {
                min-width: 600px;
            }
        }
        .module-info {
            padding: 20px;

            grid-template-columns: 1fr;
            .line {
                display: none;
            }
            p:last-child {
                grid-area: initial;
            }
        }
        .module-title {
            width: 80%;
            margin-bottom: 30px;
        }
    }
}
:global(.lang-en) .banner-module {
    .module-info {
        line-height: 2em;
    }
}
.charity-category-module {
    padding: 60px 0 200px;
    .module-head {
        margin-bottom: 50px;
    }
    .module-title {
        font-size: 40px;
        font-weight: 700;
        line-height: 60px;

        color: #000;
    }
    .category-list {
        gap: 40px 100px;
    }
    .category-item {
        .item-thumb {
            @include image-placeholder(550px, 300px);
            width: 100%;
            margin-bottom: 30px;

            border-radius: 10px;
        }
        .item-title {
            font-size: 20px;
            font-weight: 700;
            line-height: 200%;

            margin-bottom: 14px;

            color: #2d2b32;
        }
        .item-desc {
            font-size: 15px;
            font-weight: 500;
            line-height: 200%;

            max-width: 500px;
            padding-bottom: 30px;

            color: #777;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .category-list {
            gap: 40px 50px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-head {
            margin-bottom: 40px;
        }
        .module-title {
            font-size: 32px;
        }
        .category-list {
            gap: 30px 50px;
        }
    }
    @include media-breakpoint-down(xl) {
        padding: 60px 0 120px;
        .category-list {
            gap: 30px 40px;
        }
        .module-title {
            font-size: 28px;
        }
        .category-item {
            .item-thumb {
                margin-bottom: 20px;
            }
            .item-title {
                font-size: 18px;

                margin-bottom: 0;
            }
            .item-desc {
                font-size: 14px;

                padding-bottom: 10px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        padding: 40px 0 120px;
        .category-list {
            gap: 20px 20px;
        }
        .category-item {
            .item-thumb {
                margin-bottom: 16px;
            }
            .item-title {
                font-size: 16px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .category-list {
            gap: 40px;
            grid-template-columns: 1fr;
        }
        .category-item {
            .item-thumb {
                margin-bottom: 20px;
            }
            .item-title {
                font-size: 18px;
            }
            .item-desc {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        padding: 20px 0 100px;
        .category-list {
            gap: 30px;
        }
        .module-head {
            margin-bottom: 30px;
        }
        .module-title {
            font-size: 24px;
        }
        .category-item {
            .item-title {
                font-size: 16px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
}
:global(.lang-en) .charity-category-module {
    .module-info {
        line-height: 2em;
    }
}
.charity-intro-module {
    padding: 110px 0;

    background: #fef6e1;
    .module-bg {
        @include space-placeholder(2050px, 1203px);
        position: absolute;
        bottom: 0;
        left: 0;

        width: 1025px;

        background-image: url("@/assets/images/charity/intro-bg.png");
        background-repeat: no-repeat;
        background-size: contain;
    }
    .module-head {
        padding-top: 100px;
    }
    .module-title {
        font-size: 50px;
        font-weight: 700;
        line-height: 160%;

        color: #000;
    }
    .module-body {
        //
    }
    .intro-list {
        gap: 20px;
    }
    .intro-item {
        width: 368px;
        padding: 56px 50px 50px;

        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 45px 100px -10px rgb(0 0 0 / 0.02);
        .item-thumb {
            height: 80px;
            margin-bottom: 32px;
            img {
                height: 100%;
            }
        }
        .item-title {
            font-size: 20px;
            font-weight: 700;
            line-height: 200%;

            margin-bottom: 18px;

            color: #1e1f21;
        }
        .item-desc {
            font-size: 14px;
            font-weight: 500;
            line-height: 200%;

            color: #777;
        }
    }
    @include media-breakpoint-down(xxxl) {
        .intro-item {
            width: 328px;
            padding: 46px 40px 42px;
            .item-thumb {
                height: 70px;
                margin-bottom: 26px;
            }
            .item-title {
                margin-bottom: 14px;
            }
        }
        .module-bg {
            left: -8%;

            width: 925px;
        }
        .module-head {
            padding-top: 70px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .intro-item {
            width: 280px;
            padding: 36px 40px 34px;
            .item-thumb {
                height: 60px;
                margin-bottom: 22px;
            }
            .item-title {
                margin-bottom: 8px;
            }
        }
        .module-title {
            font-size: 40px;
        }
        .module-bg {
            left: -8%;

            width: 815px;
        }
        .module-head {
            padding-top: 58px;
        }
    }
    @include media-breakpoint-down(xl) {
        padding: 100px 0;
        .intro-item {
            width: 100%;
            padding: 50px 60px 55px;
            .item-thumb {
                height: 70px;
                margin-bottom: 22px;
            }
            .item-title {
                margin-bottom: 8px;
            }
        }
        .module-bg {
            top: 0;
            right: -16%;
            bottom: auto;
            left: auto;

            width: 715px;
        }
        .module-head {
            margin-bottom: 110px;
            padding-top: 40px;
        }
    }
    @include media-breakpoint-down(lg) {
        padding: 100px 0;
        .intro-item {
            width: 100%;
            padding: 46px 40px 50px;
            .item-thumb {
                height: 60px;
                margin-bottom: 22px;
            }
            .item-title {
                margin-bottom: 8px;
            }
        }
        .module-bg {
            top: 0;
            bottom: auto;
            left: auto;

            width: 615px;
        }
        .module-head {
            margin-bottom: 80px;
            padding-top: 0;
        }
        .module-title {
            font-size: 32px;
        }
    }
    @include media-breakpoint-down(md) {
        padding: 60px 0;
        .intro-item {
            width: 100%;
            padding: 46px 40px;
            .item-thumb {
                height: 60px;
                margin-bottom: 22px;
            }
            .item-title {
                margin-bottom: 8px;
            }
        }
        .module-bg {
            display: none;
        }
        .module-head {
            margin-bottom: 40px;
        }
    }
    @include media-breakpoint-down(sm) {
        .intro-item {
            .item-thumb {
                height: 60px;
            }
            .item-title {
                font-size: 16px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
        .module-head {
            margin-bottom: 40px;
        }
        .module-title {
            font-size: 24px;
        }
    }
}
:global(.lang-en) .charity-intro-module {
    .module-title {
        max-width: 420px;
    }
    .intro-item {
        .item-title {
            line-height: 1.6;
        }
    }
}
.charity-event-module {
    overflow: hidden;

    padding: 200px 0;
    .module-head {
        padding-top: 20px;
        padding-bottom: 75px;
    }
    .module-title {
        font-size: 50px;
        font-weight: 700;
        line-height: 160%;

        color: #000;
    }
    .module-body {
        gap: 100px;
    }
    .left,
    .right {
        gap: 50px;
        grid-template-columns: auto;
    }
    .left {
        align-self: flex-start;
        grid-template-rows: auto;
        .event-item {
            &:nth-child(2) {
                background-color: #e8f4fe;
            }
            &:nth-child(3) {
                background-color: #fef6e1;
            }
        }
    }
    .right {
        .event-item {
            &:nth-child(1) {
                background-color: #e8f8f1;
            }
            &:nth-child(2) {
                background-color: #ffece6;
            }
            &:nth-child(3) {
                background-color: #e5e5fe;
            }
        }
    }
    .event-item {
        position: relative;

        overflow: hidden;

        border-radius: 20px;
        box-shadow: 0 28.9474px 57.8947px rgb(203 203 203 / 0.05);
        .item-bg {
            @include image-placeholder(1100px, 1340px);
            max-width: 100%;
        }
        .item-info {
            position: absolute;
            right: 0;
            bottom: 78px;
            left: 0;

            width: 400px;
            max-width: 80%;
            margin: 0 auto;

            text-align: center;
        }
        .item-title {
            font-size: 28px;
            font-weight: 700;
            line-height: 200%;

            margin-bottom: 20px;

            color: #2d2b32;
        }
        .item-desc {
            font-size: 15px;
            font-weight: 500;
            line-height: 200%;

            height: 6em;

            color: #777;
        }
    }
    @include media-breakpoint-down(xxl) {
        padding: 140px 0;
        .module-title {
            font-size: 40px;
        }
        .module-body {
            gap: 50px;
        }
        .event-item {
            .item-info {
                bottom: 7%;
            }
            .item-title {
                font-size: 26px;

                margin-bottom: 10px;
            }
            .item-desc {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        padding: 120px 0;
        .module-body {
            gap: 20px;
        }
        .left,
        .right {
            gap: 20px;
        }
        .event-item {
            .item-info {
                bottom: 10%;
            }
            .item-title {
                font-size: 22px;

                margin-bottom: 4px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .module-head {
            padding-bottom: 30px;
        }
        .module-title {
            font-size: 32px;
        }
        .event-item {
            border-radius: 10px;
            .item-info {
                bottom: 13%;
            }
            .item-title {
                font-size: 18px;
            }
            .item-desc {
                font-size: 13px;
            }
            .item-bg {
                @include image-placeholder(1100px, 1440px);
            }
        }
    }
    @include media-breakpoint-down(md) {
        padding: 60px 0;
        .module-head {
            margin-bottom: 0;
            padding: 0;
        }
        .left,
        .right {
            gap: 40px;
        }
        .event-item {
            .item-bg {
                @include image-placeholder(1100px, 1340px);
            }
            .item-info {
                bottom: 10%;
            }
            .item-title {
                font-size: 26px;

                margin-bottom: 4px;
            }
            .item-desc {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        padding: 60px 0;
        .module-head {
            margin-bottom: 0;
            padding: 0;
        }
        .module-title {
            font-size: 24px;
        }
        .left,
        .right {
            gap: 40px;
        }
        .event-item {
            .item-bg {
                @include image-placeholder(1100px, 1440px);
            }
            .item-info {
                bottom: 14%;
            }
            .item-title {
                font-size: 18px;

                margin-bottom: 4px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
}
:global(.lang-en) .charity-event-module {
    .event-item {
        padding-bottom: 80px;
        .item-title {
            line-height: 1.6;
        }
        .item-desc {
            height: auto;
            min-height: 8em;
        }
        .item-info {
            width: 450px;
        }
    }
    @include media-breakpoint-down(lg) {
        .event-item {
            padding-bottom: 140px;
            .item-info {
                bottom: 8%;

                min-height: 18em;
            }
        }
    }
}
</style>
