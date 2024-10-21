<!--
 * @Description: 留学列表页
 * @Author: F-Stone
 * @LastEditTime: 2023-03-31 19:01:31
-->
<template>
    <main ref="Dom" class="w-body w-module" :class="$style['study-abroad']">
        <OrbCanvas :color="['#54EDB6']" />
        <div :class="$style['page-banner']" class="relative z-10">
            <nuxt-img
                class="w-full absolute top-0 left-0 ring-0 mx-auto"
                src="@/assets/images/study-abroad/banner.png"
                alt=""
            />
            <div :class="$style['banner-body']">
                <div class="wrapper--limit-width relative z-10">
                    <div :class="$style['banner-inner']" class="text-center">
                        <div
                            :class="$style['link-group']"
                            class="inline-grid grid-cols-2"
                        >
                            <Link
                                :class="$style['link']"
                                class="flex items-center"
                                :to="linkManage.studyAbroadSG"
                            >
                                <span class="text">{{
                                    $t(
                                        "KEY_STUDY_ABROAD.LIST.BANNER.新加坡留学"
                                    )
                                }}</span>
                                <i
                                    class="ic iconfont icon-long-arrow--right"
                                ></i>
                            </Link>
                            <Link
                                :class="$style['link']"
                                class="flex items-center"
                                :to="linkManage.studyAbroadPH"
                            >
                                <span class="text">{{
                                    $t(
                                        "KEY_STUDY_ABROAD.LIST.BANNER.菲律宾留学"
                                    )
                                }}</span>
                                <i
                                    class="ic iconfont icon-long-arrow--right"
                                ></i>
                            </Link>
                        </div>
                        <!-- class="wow animate__fadeInUp-50" -->
                        <div :class="$style['page-slogan']">
                            <div
                                class="wrapper--limit-width-1200 relative z-10"
                            >
                                <DotTitle
                                    :text="
                                        $t(
                                            'KEY_STUDY_ABROAD.LIST.BANNER.SLOGAN'
                                        )
                                    "
                                />
                                <div :class="$style['slogan-body']">
                                    <StudyTag
                                        :text="
                                            $t(
                                                'KEY_STUDY_ABROAD.LIST.BANNER.TAG'
                                            )
                                        "
                                    />
                                    <div
                                        :class="$style['intro-list']"
                                        class="grid grid-cols-3 wow-group-3 lg:grid-cols-2 md:block"
                                    >
                                        <div
                                            v-for="(item, index) in sloganData"
                                            :key="index"
                                            :class="$style['intro-item']"
                                            class="wow animate__fadeInUp-50_percent"
                                        >
                                            <div :class="$style['item-bg']">
                                                <nuxt-img
                                                    :src="item.bg"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="relative z-10">
                                                <div
                                                    :class="
                                                        $style['item-title']
                                                    "
                                                >
                                                    {{ item.title }}
                                                </div>
                                                <div
                                                    :class="$style['item-desc']"
                                                >
                                                    {{ item.desc }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style['study-abroad-intro']" class="relative z-10">
            <div class="wrapper--limit-width relative z-10">
                <div class="wrapper--limit-width-1200">
                    <DotTitle
                        :text="$t('KEY_STUDY_ABROAD.LIST.INTRO.TITLE')"
                        :class="$style['module-head']"
                    />
                    <div :class="$style['module-body']">
                        <div
                            :class="[
                                $style['group'],
                                $style['group-consultation'],
                            ]"
                        >
                            <div :class="$style['group-title']">
                                <span class="text">{{
                                    $t(
                                        "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].TITLE"
                                    )
                                }}</span>
                            </div>
                            <div :class="$style['group-body']">
                                <div
                                    class="grid lg:block"
                                    :class="$style['row-1']"
                                >
                                    <div
                                        :class="$style['col']"
                                        class="flex items-center justify-center wow animate__fadeInLeft-30"
                                    >
                                        <div class="flex-auto">
                                            <div
                                                v-html="
                                                    $t(
                                                        'KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].DESC'
                                                    )
                                                "
                                            ></div>
                                            <button @click="openDialog">
                                                {{
                                                    $t(
                                                        "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].BTN"
                                                    )
                                                }}
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        ref="imageThumb"
                                        :class="[
                                            $style['col'],
                                            $style['col-2'],
                                        ]"
                                        class="wow animate__fadeInRight-30"
                                    >
                                        <nuxt-img
                                            class="w-full"
                                            src="@/assets/images/study-abroad/group-2.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div :class="$style['row-2']">
                                    <div :class="$style['row-head']">
                                        <span>{{
                                            $t(
                                                "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].TITLE_2"
                                            )
                                        }}</span>
                                    </div>
                                    <div
                                        ref="tagList"
                                        :class="$style['tag-list']"
                                    >
                                        <div
                                            v-for="(
                                                item, index
                                            ) in consultationTags"
                                            :key="index"
                                            :class="$style['tag-row']"
                                            class="flex justify-center"
                                        >
                                            <div
                                                v-for="(tag, tagIndex) in item"
                                                :key="tagIndex"
                                                ref="tags"
                                                :class="$style['tag']"
                                                class="flex items-center"
                                            >
                                                <i
                                                    class="ic iconfont flex justify-center items-center flex-shrink-0"
                                                >
                                                    <nuxt-img
                                                        style="width: 32.5%"
                                                        src="@/assets/images/study-abroad/right.png"
                                                        alt=""
                                                    />
                                                </i>

                                                <span class="text">
                                                    {{ tag }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="$style['card-list']">
                                        <div
                                            :class="[
                                                $style['card-1'],
                                                $style['card'],
                                            ]"
                                        >
                                            <div
                                                :class="$style['card-desc']"
                                                v-html="
                                                    $t(
                                                        'KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].DESC_2'
                                                    )
                                                "
                                            ></div>
                                            <div
                                                :class="$style['card-footer']"
                                                class="grid grid-cols-2 xl:grid-cols-1 xl:gap-y-3 lg:grid-cols-2 lg:gap-y-0"
                                            >
                                                <div :class="$style['col']">
                                                    <div
                                                        :class="$style['num']"
                                                        data-color="yellow"
                                                    >
                                                        <span>1000</span
                                                        ><sup>+</sup>
                                                    </div>
                                                    <span class="text">
                                                        {{
                                                            $t(
                                                                "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].TAG_2[0]"
                                                            )
                                                        }}
                                                    </span>
                                                </div>
                                                <div :class="$style['col']">
                                                    <div :class="$style['num']">
                                                        <span>100</span
                                                        ><sup>+</sup>
                                                    </div>
                                                    <span class="text">
                                                        {{
                                                            $t(
                                                                "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].TAG_2[1]"
                                                            )
                                                        }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            v-for="(item, index) in cards"
                                            :key="index"
                                            :class="[$style['card']]"
                                        >
                                            <div :class="$style['icon']">
                                                <nuxt-img
                                                    :src="item.icon"
                                                    alt=""
                                                />
                                            </div>
                                            <div :class="$style['title']">
                                                {{ item.title }}
                                            </div>
                                            <div :class="$style['desc']">
                                                {{ item.desc }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div :class="$style['row-3']">
                                    <div
                                        ref="adCard"
                                        :class="$style['ad-card']"
                                        class="flex items-center justify-between lg:block"
                                    >
                                        <div :class="$style['state-pos--left']">
                                            <div
                                                :class="$style['head']"
                                                v-html="
                                                    $t(
                                                        'KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].TITLE_3'
                                                    )
                                                "
                                            ></div>
                                            <div
                                                :class="$style['footer']"
                                                v-html="
                                                    $t(
                                                        'KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].FOOTER_3'
                                                    )
                                                "
                                            ></div>
                                        </div>
                                        <div
                                            :class="$style['state-pos--right']"
                                            class="relative"
                                        >
                                            <div
                                                :class="$style['ad-card-img-1']"
                                            >
                                                <nuxt-img
                                                    class="parallax-layer"
                                                    data-depth="-0.3"
                                                    src="@/assets/images/study-abroad/ad-card-1.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                :class="$style['ad-card-img-2']"
                                                class="wow animate__fadeInRight-50"
                                            >
                                                <nuxt-img
                                                    src="@/assets/images/study-abroad/ad-card-2.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                :class="$style['ad-card-img-3']"
                                            >
                                                <section
                                                    class="parallax-layer"
                                                    data-depth="0.2"
                                                >
                                                    <nuxt-img
                                                        src="@/assets/images/study-abroad/ad-card-3.png"
                                                        alt=""
                                                    />
                                                    <div>
                                                        90,608<sup>+</sup>
                                                    </div>
                                                    <p>
                                                        {{
                                                            $t(
                                                                "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[0].TAG_3[0]"
                                                            )
                                                        }}
                                                    </p>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            :class="[$style['group'], $style['group-process']]"
                        >
                            <div :class="$style['group-title']">
                                <span class="text">{{
                                    $t(
                                        "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[1].TITLE"
                                    )
                                }}</span>
                            </div>
                            <div :class="$style['group-body']">
                                <div
                                    v-for="(item, index) in process"
                                    :key="index"
                                    :class="$style['process-item']"
                                    class="flex items-center"
                                >
                                    <div
                                        :class="$style['index']"
                                        class="flex items-center justify-center flex-shrink-0"
                                    >
                                        {{ index + 1 }}
                                    </div>
                                    <div :class="$style['info']">
                                        <div :class="$style['title']">
                                            {{ item.title }}
                                        </div>
                                        <div :class="$style['subtitle']">
                                            {{ item.subtitle }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            :class="[$style['group'], $style['group-service']]"
                        >
                            <div :class="$style['group-title']">
                                <span class="text">{{
                                    $t(
                                        "KEY_STUDY_ABROAD.LIST.INTRO.GROUP[2].TITLE"
                                    )
                                }}</span>
                            </div>
                            <div :class="$style['group-body']">
                                <NormalList :data="service" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MessageBoard class="p-module relative z-10 bg-white" />
    </main>
</template>
<script lang="ts">
import { defineComponent, useContext } from "@nuxtjs/composition-api";
import MessageBoard from "@/components/MessageBoard.vue";
import linkManage from "~/assets/script/local-data/link-manage";
import NormalList from "~/components/study-abroad/NormalList.vue";
import StudyTag from "~/components/study-abroad/StudyTag.vue";
import DotTitle from "~/components/study-abroad/DotTitle.vue";
import OrbCanvas from "~/components/study-abroad/OrbCanvas.vue";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Parallax from "parallax-js";

export default defineComponent({
    components: {
        MessageBoard,
        NormalList,
        StudyTag,
        DotTitle,
        OrbCanvas,
    },
    setup() {
        const { i18n } = useContext();
        const sloganData = [
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[0].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[0].desc"),
                bg: require("@/assets/images/study-abroad/1.png"),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[1].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[1].desc"),
                bg: require("@/assets/images/study-abroad/2.png"),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[2].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[2].desc"),
                bg: require("@/assets/images/study-abroad/3.png"),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[3].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[3].desc"),
                bg: require("@/assets/images/study-abroad/4.png"),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[4].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[4].desc"),
                bg: require("@/assets/images/study-abroad/5.png"),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[5].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SLOGAN[5].desc"),
                bg: require("@/assets/images/study-abroad/6.png"),
            },
        ];
        const consultationTags = [
            [
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[0][0]"),
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[0][1]"),
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[0][2]"),
            ],
            [
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[1][0]"),
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[1][1]"),
            ],
            [
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[2][0]"),
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[2][1]"),
                i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CONSULTATION_TAGS[2][2]"),
            ],
        ];
        const cards = [
            {
                icon: require("@/assets/images/study-abroad/card-2.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[0].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[0].desc"),
            },
            {
                icon: require("@/assets/images/study-abroad/card-3.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[1].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[1].desc"),
            },
            {
                icon: require("@/assets/images/study-abroad/card-4.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[2].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[2].desc"),
            },
            {
                icon: require("@/assets/images/study-abroad/card-5.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[3].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.CARDS[3].desc"),
            },
        ];
        const process = [
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[0].title"),
                subtitle: i18n.t(
                    "KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[0].subtitle"
                ),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[1].title"),
                subtitle: i18n.t(
                    "KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[1].subtitle"
                ),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[2].title"),
                subtitle: i18n.t(
                    "KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[2].subtitle"
                ),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[3].title"),
                subtitle: i18n.t(
                    "KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[3].subtitle"
                ),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[4].title"),
                subtitle: i18n.t(
                    "KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[4].subtitle"
                ),
            },
            {
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[5].title"),
                subtitle: i18n.t(
                    "KEY_STUDY_ABROAD.LIST.INTRO.PROCESS[5].subtitle"
                ),
            },
        ];
        const service = [
            {
                thumb: require("@/assets/images/study-abroad/service-1.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[0].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[0].desc"),
            },
            {
                thumb: require("@/assets/images/study-abroad/service-2.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[1].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[1].desc"),
            },
            {
                thumb: require("@/assets/images/study-abroad/service-3.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[2].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[2].desc"),
            },
            {
                thumb: require("@/assets/images/study-abroad/service-4.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[3].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[3].desc"),
            },
            {
                thumb: require("@/assets/images/study-abroad/service-5.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[4].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[4].desc"),
            },
            {
                thumb: require("@/assets/images/study-abroad/service-6.png"),
                title: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[5].title"),
                desc: i18n.t("KEY_STUDY_ABROAD.LIST.INTRO.SERVICE[5].desc"),
            },
        ];

        // 打开客服
        function openDialog() {
            $(".zhiCustomBtn").trigger("click");
        }

        const imageThumb = ref<HTMLElement | null>(null);
        const tagList = ref<HTMLElement | null>(null);
        const adCard = ref<HTMLElement | null>(null);
        const tags = ref<HTMLElement[]>();

        onMounted(() => {
            const animateDom = imageThumb.value!;
            gsap.timeline({
                scrollTrigger: { scrub: true, trigger: animateDom },
            }).to(animateDom, {
                ease: "none",
                backgroundPositionY: "0%",
            });

            ScrollTrigger.create({
                trigger: tagList.value,
                onEnter() {
                    gsap.fromTo(
                        tags.value!,
                        { opacity: 0 },
                        {
                            duration: 0.6,
                            opacity: 1,
                            ease: "power1.easeIn",
                            stagger: {
                                from: "random",
                                amount: 0.8,
                            },
                        }
                    );
                },
            });

            const px = new Parallax(adCard.value!, {
                selector: ".parallax-layer",
                scalarX: 5,
                scalarY: 2,
                hoverOnly: true,
            });

            onBeforeUnmount(() => {
                px.destroy();
            });
        });

        return {
            linkManage,
            sloganData,
            consultationTags,
            cards,
            process,
            service,
            imageThumb,
            tagList,
            tags,
            adCard,
            openDialog,
        };
    },
    head() {
        return {
            title: this.$i18n.t("KEY_SEO.SINOLOGY.TITLE"),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$i18n.t("KEY_SEO.SINOLOGY.KEYWORDS"),
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$i18n.t("KEY_SEO.SINOLOGY.DESC"),
                },
            ],
        };
    },
});
</script>
<style lang="scss" module>
.page-banner {
    overflow: hidden;
    .banner-body {
        // @include ab-cover;
    }
    .banner-inner {
        // @include ab-cover;
        padding-top: 365px;
    }
    .link-group {
        margin-bottom: 70px;

        gap: 10px;
        .link {
            font-size: 18px;
            line-height: em(24px, 18px);

            padding: em(20px, 18px) em(43px, 18px);

            color: #2d2b32;
            border-radius: em(8px, 18px);
            background-color: #fff;
            &:first-child {
                color: #fff;
                background: #0aca91;
            }
            :global(.ic) {
                font-size: em(14px, 18px);

                margin-left: em(9px, 18px);

                transition: 0.26s ease;
            }
            &:hover {
                :global(.ic) {
                    transform: translateX(30%);
                }
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .banner-inner {
            // @include ab-cover;
            padding-top: 265px;
        }
        .link-group {
            .link {
                font-size: 15px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        & > img {
            transform: scale(1.5);
            transform-origin: top center;
        }
    }
    @include media-breakpoint-down(md) {
        & > img {
            transform: scale(2);
            transform-origin: top center;
        }
    }
    @include media-breakpoint-down(sm) {
        .banner-inner {
            padding-top: 165px;
        }
        .link-group {
            margin-bottom: 50px;
            .link {
                font-size: 12px;
            }
        }
    }
}
.page-slogan {
    position: relative;

    width: 1440px;
    max-width: 100%;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 122px;

    text-align: left;

    border-radius: 18px;
    &::after {
        position: absolute;
        top: 0;
        left: 50%;

        width: 1440px;
        height: 100%;

        content: "";
        transform: translateX(-50%);

        border-radius: 18px;
        background-color: #fff;
    }
    .slogan-body {
        padding: 40px 0;
    }
    .intro-list {
        margin-top: 10px;

        gap: 40px 90px;
    }
    .intro-item {
        position: relative;

        padding-top: 102px;
        .item-bg {
            @include image-placeholder(120px, 150px);
            position: absolute;
            top: 50px;
            right: -18px;
        }
        .item-title {
            @include ellipse();
            font-size: 22px;
            line-height: 200%;

            margin-bottom: em(10px, 22px);

            color: #2d2b32;
        }
        .item-desc {
            font-size: 13px;
            line-height: 200%;

            min-height: 8em;

            color: #777;
        }
    }
    @include media-breakpoint-down(xxxl) {
        &::after {
            width: calc(1200px + 100px);
        }
    }
    @include media-breakpoint-down(xxl) {
        &::after {
            width: 94vw;
        }
        .intro-list {
            gap: 30px 70px;
        }
    }
    @include media-breakpoint-down(xl) {
        padding-bottom: 90px;
        .intro-list {
            margin-top: 10px;

            gap: 30px 50px;
        }
        .intro-item {
            padding-top: 82px;
            .item-bg {
                top: 50px;
                right: -18px;

                width: 100px;
            }
            .item-title {
                font-size: 18px;
            }
            .item-desc {
                font-size: 12px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 60px;
        padding-bottom: 30px;
        .intro-list {
            gap: 0 50px;
        }
    }
    @include media-breakpoint-down(md) {
        padding-top: 30px;
        .intro-item {
            .item-desc {
                min-height: 0;
            }
        }
        .slogan-body {
            padding: 20px 0;
        }
    }
    @include media-breakpoint-down(sm) {
        .intro-item {
            .item-bg {
                right: 10px;
            }
            .item-title {
                font-size: 18px;
            }
            .item-desc {
                font-size: 13px;
            }
        }
    }
}
.study-abroad-intro {
    .module-head {
        margin-bottom: 60px;
    }
    .group-title {
        font-size: 32px;
        font-weight: 700;
        line-height: 140%;

        margin-bottom: em(50px, 32px);

        color: #181a1e;
    }
    @include media-breakpoint-down(xxl) {
        .module-head {
            margin-bottom: 50px;
        }
        .group-title {
            font-size: 28px;
        }
    }
    @include media-breakpoint-down(xl) {
        .group-title {
            font-size: 24px;
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 50px;
        .intro-list {
            gap: 0 50px;
        }
    }
    @include media-breakpoint-down(md) {
        .group-title {
            font-size: 20px;
        }
    }
}
.group-consultation {
    margin-bottom: 100px;
    .row-1 {
        margin-bottom: 53px;

        gap: 15px;
        grid-template-columns: 435px 1fr;
        .col {
            overflow: hidden;

            color: #fff;
            border-radius: 24px;
            background-repeat: no-repeat;
            background-position: top center;
            background-size: cover;
            &:first-child {
                width: 435px;
                padding: 54px 45px;

                background: #0aca91;
            }
        }
        .col-2 {
            background-image: url("@/assets/images/study-abroad/group-1.png");
            background-repeat: no-repeat;
            background-position-y: 120%;
            background-size: cover;
        }
        p {
            font-size: 26px;
            font-weight: 700;
            line-height: 160%;
            &:first-child {
                font-size: em(22px, 26px);
                font-weight: 500;
                line-height: 180%;

                margin-bottom: 4px;
            }
            &:last-of-type {
                margin-bottom: em(40px, 26px);
                padding-bottom: em(40px, 26px);

                border-bottom: 1px solid rgba(#fff, 0.3);
            }
        }
        button {
            font-size: 16px;
            line-height: em(24px, 16px);

            padding: em(20px, 16px) em(40px, 16px);

            color: #0aca91;
            border-radius: em(32px, 16px);
            background: #fff;
        }
    }
    .row-2 {
        padding-top: 80px;
        .row-head {
            font-size: 46px;
            font-weight: 700;
            line-height: em(69px, 46px);

            margin-bottom: em(72px, 46px);

            text-align: center;

            color: #18181b;
        }
        .tag-list {
            margin-bottom: 132px;
        }
        .tag-row {
            @include space-between(25px, y);
        }
        .tag {
            @include space-between(25px);
            font-size: 19px;
            line-height: em(28px, 19px);

            padding: em(17px, 19px) em(28px, 19px);

            border: 1px solid #eae9f2;
            border-radius: 6px;
            background-color: #fff;
            i {
                @include circle(em(40px, 19px), rgba(#e4f0ff, 0.5));
                margin-right: em(20px, 19px);
            }
        }
    }
    .card-list {
        display: grid;

        margin-bottom: 122px;

        grid-column-gap: 10px;
        grid-row-gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        .card:nth-child(1) {
            grid-area: 1 / 1 / 3 / 2;
        }
        .card:nth-child(2) {
            grid-area: 1 / 2 / 2 / 3;
        }
        .card:nth-child(3) {
            grid-area: 1 / 3 / 2 / 4;
        }
        .card:nth-child(4) {
            grid-area: 2 / 2 / 3 / 3;
        }
        .card:nth-child(5) {
            grid-area: 2 / 3 / 3 / 4;
        }
    }
    .card:not(.card-1) {
        padding: 35px;

        border: 1px solid #e9ebed;
        border-radius: 20px;
        background: #fff;
        .icon {
            @include image-placeholder(38px, 38px);
        }
        .title {
            font-size: 20px;
            font-weight: 500;
            line-height: em(28px, 20px);

            margin-top: 32px;
            margin-bottom: 14px;

            color: #18181b;
        }
        .desc {
            font-size: 13px;
            line-height: 200%;

            color: #5e5d65;
        }
    }
    .card-1 {
        padding: 60px 55px;

        color: #fff;
        border-radius: 20px;
        background: #8b75ff;
        .card-desc {
            font-size: 16px;
            font-weight: 500;
            line-height: 200%;
        }
        .card-footer {
            font-size: 14px;
            line-height: em(24px, 14px);

            margin-top: 76px;
            padding-top: 32px;

            color: #fff;
            border-top: 1px solid rgba(#fff, 0.3);
        }
        .num {
            font-family: "Inter";
            font-size: 32px;
            font-weight: 700;
            font-style: normal;
            line-height: em(43px, 32px);

            position: relative;

            margin-bottom: 4px;
            &[data-color="yellow"] {
                &::after {
                    background: #feb60d;
                }
            }
            &::after {
                position: absolute;
                bottom: 8px;
                left: 0;

                width: 50px;
                height: 8px;

                content: "";

                border-radius: 4px;
                background: #0aca91;
            }
            & > * {
                position: relative;
                z-index: 10;
            }
        }
    }
    .row-3 {
        //
    }
    .ad-card {
        overflow: hidden;

        border-radius: 25px;
        background: linear-gradient(296.05deg, #ffe38d 27.4%, #ffecb1 96.65%);
        .state-pos--left {
            padding-left: 92px;
            .head {
                font-size: 38px;
                font-weight: 700;
                line-height: 150%;

                margin-bottom: 136px;

                color: #2d2b32;
                /* stylelint-disable-next-line selector-max-compound-selectors */
                p:first-of-type {
                    font-size: 32px;
                    font-weight: 400;
                }
            }
            .footer {
                font-size: 20px;
                font-weight: 500;
                line-height: 200%;

                color: #2d2b32;
            }
        }
        .state-pos--right {
            padding-top: 10px;
            padding-right: 200px;
        }
        .ad-card-img-1 {
            @include image-placeholder(542px, 406px);
            position: absolute;
            right: 0;
            bottom: 0;

            overflow: visible;
            img {
                position: absolute !important;
            }
        }
        .ad-card-img-2 {
            @include image-placeholder(456px, 470px);
            position: relative;
            z-index: 10;

            overflow: visible;
        }
        .ad-card-img-3 {
            position: absolute;
            z-index: 20;
            right: 50px;
            bottom: 47px;

            text-align: center;
            img {
                width: 28px;
                margin: 0 auto;
                margin-bottom: 10px;
            }
            section {
                position: relative !important;

                padding: 20px 22px;

                border-radius: 16px;
                background: linear-gradient(
                    130.4deg,
                    #fff -2.18%,
                    rgb(255 255 255 / 0.56) 118.15%
                );
                box-shadow: 56px 56px 80px rgb(255 199 98 / 0.2);

                backdrop-filter: blur(10px);
            }
            div {
                font-family: "Inter";
                font-size: 20px;
                font-weight: 700;
                line-height: em(28px, 20px);

                color: #2d2b32;
            }
            p {
                font-size: 12px;
                line-height: em(22px, 12px);

                color: #777;
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .row-1 {
            margin-bottom: 40px;

            grid-template-columns: 385px 1fr;
            .col {
                &:first-child {
                    width: 385px;
                    padding: 44px 35px;
                }
            }
            p {
                font-size: 22px;
                &:first-child {
                    font-size: 14px;
                }
            }
            button {
                font-size: 13px;
            }
        }
        .row-2 {
            .row-head {
                font-size: 36px;
            }
            .tag-list {
                margin-bottom: 132px;
            }
            // .tag-row {
            //     @include space-between(25px, y);
            // }
            .tag {
                font-size: 17px;
            }
        }
        .card-1 {
            padding: 50px 40px;
        }
        .ad-card {
            .state-pos--left {
                padding-left: 62px;
                .head {
                    font-size: 32px;

                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    p:first-of-type {
                        font-size: 28px;
                    }
                }
                .footer {
                    font-size: 18px;
                }
            }
            .state-pos--right {
                padding-right: 100px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .row-1 {
            grid-template-columns: 345px 1fr;
            .col {
                &:first-child {
                    width: 345px;
                }
            }
        }
        .row-2 {
            .row-head {
                font-size: 28px;
            }
            .tag-list {
                margin-bottom: 112px;
            }
            .tag {
                font-size: 14px;
            }
        }
        .card-1 {
            padding: 40px 30px;
            .card-desc {
                font-size: 14px;
            }
        }
        .ad-card {
            .state-pos--left {
                padding-left: 42px;
                .head {
                    font-size: 26px;

                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    p:first-of-type {
                        font-size: 24px;
                    }
                }
                .footer {
                    font-size: 16px;
                }
            }
            .state-pos--right {
                padding-right: 80px;
            }
            .ad-card-img-1 {
                width: 479px;
            }
            .ad-card-img-2 {
                width: 386px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .row-1 {
            margin-bottom: 53px;
            .col:first-child {
                width: 100%;
                margin-bottom: 20px;
            }
        }
        .row-2 {
            padding-top: 30px;
            .tag {
                font-size: 12px;
            }
            .tag-row {
                margin-bottom: 15px;
            }
            .tag-list {
                margin-bottom: 72px;
            }
        }
        .card-list {
            margin-bottom: 100px;

            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            .card-1 {
                margin-top: 36px;
                margin-bottom: 20px;
                padding: 35px;
            }
            .card:nth-child(1) {
                grid-area: 1 / 1 / 2 / 3;
            }
            .card:nth-child(2) {
                grid-area: 2 / 1 / 3 / 2;
            }
            .card:nth-child(3) {
                grid-area: 2 / 2 / 3 / 3;
            }
            .card:nth-child(4) {
                grid-area: 3 / 1 / 4 / 2;
            }
            .card:nth-child(5) {
                grid-area: 3 / 2 / 4 / 3;
            }
            .card-footer {
                margin-top: 46px;
            }
        }
        .ad-card {
            .state-pos--left {
                padding: 70px 50px 20px;
                .head {
                    margin: 0;
                }
                .footer {
                    margin: 20px 0;
                }
            }
            .state-pos--right {
                display: flex;

                padding: 0;

                justify-content: center;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .row-2 {
            padding-top: 30px;
            .tag {
                @include space-between(10px);
                margin-bottom: 10px !important;

                white-space: nowrap;
            }
            .tag-row {
                margin: 0;

                flex-wrap: wrap;
            }
            .tag-list {
                margin-bottom: 72px;
            }
        }
        .card-list {
            display: block;
            .card {
                @include space-between(20px, y);
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .row-2 {
            .tag-row {
                justify-content: start;
            }
        }
        .ad-card {
            .state-pos--left {
                padding: 30px;
                padding-bottom: 0;
                .head {
                    font-size: 24px;

                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    p:first-of-type {
                        font-size: 18px;
                    }
                }
            }
            .ad-card-img-1 {
                width: 100%;
            }
            .ad-card-img-2 {
                width: 90%;
            }
            .ad-card-img-3 {
                right: 20px;
                bottom: 27px;
                div {
                    font-size: 16px;
                }
                section {
                    padding: 14px 22px;
                }
            }
            // .ad-card-img-3 {
            //     position: absolute;
            //     z-index: 20;
            //     right: 50px;
            //     bottom: 47px;

            //     text-align: center;
            //     img {
            //         width: 28px;
            //         margin: 0 auto;
            //         margin-bottom: 10px;
            //     }
            //     section {
            //         position: relative !important;

            //         padding: 20px 22px;

            //         border-radius: 16px;
            //         background: linear-gradient(
            //             130.4deg,
            //             #fff -2.18%,
            //             rgb(255 255 255 / 0.56) 118.15%
            //         );
            //         box-shadow: 56px 56px 80px rgb(255 199 98 / 0.2);

            //         backdrop-filter: blur(10px);
            //     }
            //     div {
            //         font-family: "Inter";
            //         font-size: 20px;
            //         font-weight: 700;
            //         line-height: em(28px, 20px);

            //         color: #2d2b32;
            //     }
            //     p {
            //         font-size: 12px;
            //         line-height: em(22px, 12px);

            //         color: #777;
            //     }
            // }
        }
    }
}
.group-process {
    margin-bottom: 157px;
    .group-body {
        position: relative;
        &::after {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 32px;

            width: 1px;

            content: "";

            background: #e9ebed;
        }
    }
    .process-item {
        @include space-between(90px, y);
        position: relative;
        z-index: 10;
    }
    .title {
        font-size: 24px;
        font-weight: 700;
        line-height: 1em;

        color: #2d2b32;
    }
    .subtitle {
        font-size: 14px;
        font-weight: 400;
        line-height: em(24px, 14px);

        color: #777;
    }
    .index {
        @include circle(em(64px, 26px));

        font-family: "Inter";
        font-size: 26px;
        font-weight: 700;
        line-height: em(48px, 26px);

        margin-right: em(20px, 26px);

        color: #0aca91;
        border: 1.8px dashed #0aca91;
        background: #fff;
    }
    @include media-breakpoint-down(xxl) {
        .process-item {
            @include space-between(60px, y);
        }
        .title {
            font-size: 22px;

            margin-bottom: 2px;
        }
    }
    @include media-breakpoint-down(xl) {
        margin-bottom: 100px;
        .group-body {
            &::after {
                left: 30px;
            }
        }
        .process-item {
            @include space-between(50px, y);
        }
        .title {
            font-size: 20px;
        }
        .index {
            font-size: 24px;
        }
    }
    @include media-breakpoint-down(lg) {
        margin-bottom: 80px;
        .group-body {
            &::after {
                left: 27px;
            }
        }
        .process-item {
            @include space-between(40px, y);
        }
        .title {
            font-size: 18px;
        }
        .subtitle {
            font-size: 13px;
        }
        .index {
            font-size: 22px;
        }
    }
    @include media-breakpoint-down(sm) {
        .group-body {
            &::after {
                left: 25px;
            }
        }
        .title {
            font-size: 16px;

            margin-bottom: 6px;
        }
        .index {
            font-size: 20px;
        }
    }
}
.group-service {
    margin-bottom: 144px;
    @include media-breakpoint-down(xl) {
        margin-bottom: 120px;
    }
}
:global(.lang-en) {
    .page-slogan .intro-item .item-title {
        @include ellipse(2, 1.6em, 1);
        font-weight: bold;
        line-height: 1.6em;
    }
    .group-consultation .ad-card .state-pos--left {
        /* stylelint-disable-next-line selector-max-compound-selectors */
        .head {
            font-size: 26px;

            margin-bottom: 100px;
            /* stylelint-disable-next-line selector-max-compound-selectors */
            p:first-child {
                font-size: em(18px, 26px);
            }
        }
        /* stylelint-disable-next-line selector-max-compound-selectors */
        .footer {
            font-size: 17px;
        }
    }
    .group-process .title {
        margin-bottom: 10px;
    }
    .group-consultation .card:not(.card-1) .title {
        font-weight: bold;
    }
    @include media-breakpoint-down(xxl) {
        .page-slogan .intro-item .item-title {
            font-size: 19px;
        }
        .group-consultation .row .tag {
            font-size: 15px;
        }
    }
    @include media-breakpoint-down(xl) {
        .page-slogan .intro-item .item-title {
            @include ellipse(3, 1.6em, 1);
        }
        .group-consultation .row p {
            font-size: 18px;
        }
        .group-consultation .row .tag {
            margin-right: 14px;
            &::after {
                margin-right: 0;
            }
        }
        .group-consultation .ad-card .state-pos--left {
            /* stylelint-disable-next-line selector-max-compound-selectors */
            .head {
                font-size: 22px;

                margin-bottom: 70px;
            }
            /* stylelint-disable-next-line selector-max-compound-selectors */
            .footer {
                font-size: 14px;
            }
        }
    }
    @include media-breakpoint-down(lg) {
        .page-slogan .intro-item .item-title {
            @include ellipse(2, 1.6em, 1);
        }
        .group-consultation .ad-card .state-pos--left {
            /* stylelint-disable-next-line selector-max-compound-selectors */
            .head {
                margin-bottom: 0;
            }
        }
        .group-process .title {
            margin-bottom: 4px;
        }
    }
    @include media-breakpoint-down(md) {
        .page-slogan .intro-item .item-title {
            @include ellipse(1);
            height: auto;

            -webkit-line-clamp: 1;
        }
    }
    @include media-breakpoint-down(sm) {
        .page-slogan .intro-item .item-title {
            @include ellipse(2, 1.6em, 1);
        }
        .group-consultation .row-2 .tag {
            white-space: initial;
        }
        .group-consultation .row-1 p:first-child {
            font-size: 14px;
        }
        .group-consultation .row-1 p {
            font-size: 20px;
        }
        .group-process .info {
            align-items: start;
            .group-body {
                margin-top: 14px;
            }
        }
    }
}
</style>
