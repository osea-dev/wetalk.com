<template>
    <section :class="$style['culture-intro-module']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['intro-groups']">
                    <div :class="$style['group']">
                        <div class="state-pos--left">
                            <div class="flex-auto">
                                <h3 :class="$style['group-title']">
                                    {{ $t("KEY_PAGE_ABOUT.CULTURE[0].TITLE") }}
                                </h3>
                                <div :class="$style['group-info']">
                                    <h4 class="text" :class="$style['hanzi']">
                                        上善若水
                                    </h4>
                                    <p class="text" :class="$style['pinyin']">
                                        shàng shàn ruò shuǐ
                                    </p>
                                </div>
                            </div>
                            <div :class="$style['group-icon']">
                                <nuxt-img
                                    src="@/assets/images/about-us/icon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="state-pos--right">
                            <div
                                :class="$style['intro-list']"
                                class="wow wow-group-5"
                            >
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                >
                                    <p class="text">
                                        {{
                                            $t(
                                                "KEY_PAGE_ABOUT.CULTURE[0].LIST[0]"
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                >
                                    <p class="text">
                                        {{
                                            $t(
                                                "KEY_PAGE_ABOUT.CULTURE[0].LIST[1]"
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                >
                                    <p class="text">
                                        {{
                                            $t(
                                                "KEY_PAGE_ABOUT.CULTURE[0].LIST[2]"
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                >
                                    <p class="text">
                                        {{
                                            $t(
                                                "KEY_PAGE_ABOUT.CULTURE[0].LIST[3]"
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                >
                                    <p class="text">
                                        {{
                                            $t(
                                                "KEY_PAGE_ABOUT.CULTURE[0].LIST[4]"
                                            )
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['group']">
                        <div class="state-pos--left">
                            <div class="flex-auto">
                                <h3 :class="$style['group-title']">
                                    {{ $t("KEY_PAGE_ABOUT.CULTURE[1].TITLE") }}
                                </h3>
                                <div :class="$style['group-info']"></div>
                            </div>
                            <div :class="$style['group-icon']">
                                <nuxt-img
                                    src="@/assets/images/about-us/icon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="state-pos--right">
                            <div :class="$style['intro-list']">
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t('KEY_PAGE_ABOUT.CULTURE[1].LIST[0]')
                                    "
                                ></div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t('KEY_PAGE_ABOUT.CULTURE[1].LIST[1]')
                                    "
                                ></div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t('KEY_PAGE_ABOUT.CULTURE[1].LIST[2]')
                                    "
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['group']">
                        <div class="state-pos--left">
                            <div class="flex-auto">
                                <h3 :class="$style['group-title']">
                                    {{ $t("KEY_PAGE_ABOUT.CULTURE[2].TITLE") }}
                                </h3>
                                <div :class="$style['group-info']">
                                    <h4 class="text" :class="$style['hanzi']">
                                        教之道，<br />
                                        贵以专
                                    </h4>
                                    <p class="text" :class="$style['pinyin']">
                                        jiào zhī dào guì yǐ zhuān
                                    </p>
                                </div>
                            </div>
                            <div :class="$style['group-icon']">
                                <nuxt-img
                                    src="@/assets/images/about-us/icon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="state-pos--right">
                            <div :class="$style['intro-list']">
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                >
                                    <p
                                        class="text"
                                        style="text-indent: -0.5em"
                                        v-html="
                                            $t('KEY_PAGE_ABOUT.CULTURE[2].DESC')
                                        "
                                    ></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['group']">
                        <div class="state-pos--left">
                            <div class="flex-auto">
                                <h3 :class="$style['group-title']">
                                    {{ $t("KEY_PAGE_ABOUT.CULTURE[3].TITLE") }}
                                </h3>
                                <div :class="$style['group-info']">
                                    <h4 class="text" :class="$style['hanzi']">
                                        上善若水，<br />
                                        厚德载物
                                    </h4>
                                    <p class="text" :class="$style['pinyin']">
                                        shàng shàn ruò shuǐ hòu dé zài wù
                                    </p>
                                </div>
                            </div>
                            <div :class="$style['group-icon']">
                                <nuxt-img
                                    src="@/assets/images/about-us/icon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="state-pos--right">
                            <div :class="$style['intro-list']">
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t('KEY_PAGE_ABOUT.CULTURE[3].LIST[0]')
                                    "
                                ></div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t('KEY_PAGE_ABOUT.CULTURE[3].LIST[1]')
                                    "
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['group']">
                        <div class="state-pos--left">
                            <h3 :class="$style['group-title']">
                                {{ $t("KEY_PAGE_ABOUT.CULTURE[4].TITLE") }}
                            </h3>
                            <div :class="$style['group-info']"></div>
                            <div :class="$style['group-icon']">
                                <nuxt-img
                                    src="@/assets/images/about-us/icon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="state-pos--right">
                            <div :class="$style['intro-list']">
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t('KEY_PAGE_ABOUT.CULTURE[4].LIST[0]')
                                    "
                                ></div>
                                <div
                                    :class="$style['list-item']"
                                    class="wow animate__fadeInUp-50"
                                    v-html="
                                        $t('KEY_PAGE_ABOUT.CULTURE[4].LIST[1]')
                                    "
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup></script>
<style lang="scss" module>
.culture-intro-module {
    padding-top: 128px;
    padding-bottom: 175px;
    .group {
        display: flex;
        :global(.state-pos--left) {
            display: flex;
            flex-direction: column;

            width: 570px;

            justify-content: space-between;
        }
        // :global(.state-pos--right) {
        // }
        :global(.state-pos--right) {
            flex: 0 0 auto;

            width: max(calc(100% - 570px), 680px);
        }
        &:nth-child(1) {
            margin-bottom: 91px;
            :global(.state-pos--left) {
                padding-top: 10px;
                padding-bottom: 30px;
            }
            .intro-list {
                width: 680px;
                max-width: 100%;
            }
            .list-item {
                font-size: 18px;

                position: relative;

                display: flex;

                padding: 27px 0;

                border-bottom: 1px solid var(--l-c-divide);

                align-items: center;
                &:last-child {
                    border-bottom-width: 0;
                }
                &::before {
                    @include circle(10px);
                    display: block;

                    margin: 0 10px;

                    content: "";

                    border: 2px solid #bb0201;
                }
            }
        }
        &:nth-child(2) {
            margin-bottom: 80px;
            :global(.state-pos--left) {
                padding-top: 38px;
                padding-bottom: 50px;
            }
            .intro-list {
                font-size: 16px;
                line-height: 240%;

                width: 786px;
                max-width: 100%;
            }
            .list-item {
                padding: 38px 0;

                border-bottom: 1px solid var(--l-c-divide);
            }
        }
        &:nth-child(3) {
            margin-bottom: 40px;

            align-items: center;
            .list-item {
                font-size: 16px;
                line-height: 200%;
            }
            .group-icon {
                display: none;
            }
        }
        &:nth-child(4) {
            margin-bottom: 142px;

            align-items: center;
            .intro-list {
                padding-top: 160px;
            }
            .list-item {
                margin-bottom: 63px;
                p {
                    font-size: 14px;
                    line-height: 200%;
                    /* stylelint-disable-next-line max-nesting-depth */
                    &:first-child {
                        font-size: 18px;
                        line-height: 200%;

                        margin-bottom: 17px;
                    }
                }
                span {
                    display: inline-block;

                    text-indent: -0.5em;
                }
            }
            .group-icon {
                display: none;
            }
        }
        &:nth-child(5) {
            .list-item {
                font-size: 24px;
                line-height: 200%;

                margin-bottom: 107px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .group-icon {
                display: none;
            }
        }
    }
    .group-title {
        font-size: 24px;
        line-height: 200%;

        margin-bottom: 15px;
    }
    .group-info {
        font-family: var(--SourceHanSerif);
        font-weight: 700;
        line-height: 1;
        .hanzi {
            font-size: 56px;
            font-weight: 700;
            line-height: 140%;

            margin-bottom: 11px;
        }
        .pinyin {
            font-size: 18px;
            font-weight: 700;
            line-height: 200%;

            color: #bb0201;
        }
    }
    .group-icon {
        @include image-placeholder(136px, 39px);
    }
    @include media-breakpoint-down(xxxl) {
        padding-top: 100px;
        padding-bottom: 150px;
    }
    @include media-breakpoint-down(xxl) {
        .group {
            :global(.state-pos--right) {
                flex: 0 0 auto;

                width: 533px;
            }
        }
        .group-title {
            font-size: 22px;

            margin-bottom: 8px;
        }
        .group-info {
            .hanzi {
                font-size: 42px;
                line-height: 140%;
            }
            .pinyin {
                font-size: 16px;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .group {
            :global(.state-pos--right) {
                width: 490px;
            }
            &:nth-child(1) {
                margin-bottom: 80px;
                .list-item {
                    font-size: 16px;

                    padding: 20px 0;
                }
            }
            &:nth-child(2) {
                margin-bottom: 90px;
                :global(.state-pos--left) {
                    padding-top: 30px;
                }
                .intro-list {
                    font-size: 14px;
                }
                .list-item {
                    padding: 30px 0;
                }
            }
            &:nth-child(3) {
                .list-item {
                    font-size: 14px;
                }
            }
            &:nth-child(4) {
                margin-bottom: 100px;
                .intro-list {
                    padding-top: 90px;
                }
                .list-item {
                    margin-bottom: 50px;
                    /* stylelint-disable-next-line max-nesting-depth */
                    p {
                        font-size: 14px;
                        /* stylelint-disable-next-line max-nesting-depth */
                        &:first-child {
                            font-size: 16px;

                            margin-bottom: 14px;
                        }
                    }
                }
            }
            &:nth-child(5) {
                .list-item {
                    font-size: 19px;

                    margin-bottom: 80px;
                }
            }
        }
        .group-title {
            font-size: 18px;
        }
        .group-info {
            .hanzi {
                font-size: 38px;
                line-height: 140%;

                margin-bottom: 6px;
            }
            .pinyin {
                font-size: 14px;
            }
        }
        .group-icon {
            width: 120px;
        }
    }
    @include media-breakpoint-down(lg) {
        .group {
            display: block;
            :global(.state-pos--left) {
                display: flex;
                flex-direction: row;

                width: 100%;

                align-items: center;

                justify-content: space-between;
            }
            :global(.state-pos--right) {
                width: 100%;
            }
            &:nth-child(1) {
                margin-bottom: 50px;
            }
            &:nth-child(3) {
                margin-bottom: 90px;
                .group-info {
                    margin-bottom: 50px;
                }
            }
            &:nth-child(4) {
                .intro-list {
                    padding-top: 50px;
                }
            }
            &:nth-child(5) {
                :global(.state-pos--left) {
                    margin-bottom: 50px;
                }
                .list-item {
                    @include space-between(40px, y);
                }
            }
        }
        .group-title {
            font-size: 16px;

            margin-bottom: 4px;
        }
        .group-info {
            br {
                display: none;
            }
            .hanzi {
                font-size: 30px;
            }
            .pinyin {
                font-size: 13px;
            }
        }
    }
    @include media-breakpoint-down(md) {
        padding-top: 80px;
        padding-bottom: 120px;
        .group {
            &:nth-child(1) {
                margin-bottom: 30px;
                :global(.state-pos--left) {
                    padding-bottom: 20px;
                }
                .list-item {
                    font-size: 15px;

                    padding: 16px 0;
                    /* stylelint-disable-next-line max-nesting-depth */
                    &::before {
                        width: 8px;
                        height: 8px;
                        margin: 0 8px 0 2px;
                    }
                }
            }
            &:nth-child(2) {
                margin-bottom: 70px;
                .list-item {
                    padding: 20px 0;
                }
            }
            &:nth-child(3) {
                margin-bottom: 70px;
                .group-info {
                    margin-bottom: 30px;
                }
            }
            &:nth-child(4) {
                margin-bottom: 60px;
                .intro-list {
                    padding-top: 30px;
                }
            }
            &:nth-child(5) {
                :global(.state-pos--left) {
                    margin-bottom: 30px;
                }
                .list-item {
                    @include space-between(30px, y);
                    font-size: 18px;
                }
            }
        }
        .group-title {
            font-size: 15px;

            margin-bottom: 2px;
        }
        .group-info {
            .hanzi {
                font-size: 28px;

                margin-bottom: 2px;
            }
            .pinyin {
                font-size: 13px;
            }
        }
        .group-icon {
            width: 110px;
        }
    }
    @include media-breakpoint-down(sm) {
        padding-top: 60px;
        padding-bottom: 60px;
        .group {
            &:nth-child(5) {
                .list-item {
                    font-size: 17px;

                    margin-bottom: 20px;
                }
            }
        }
        .group-info {
            .pinyin {
                font-size: 14px;
            }
        }
    }
}
:global(.lang-en) {
    .culture-intro-module {
        span,
        p {
            text-indent: 0 !important;
        }
        .group-title {
            font-size: 20px;
            font-weight: bold;

            margin-bottom: 5px;
        }
        .group {
            &:nth-child(4) {
                .list-item {
                    /* stylelint-disable-next-line selector-max-compound-selectors */
                    p:first-child {
                        font-weight: bold;
                    }
                }
            }
            &:nth-child(5) {
                .group-title,
                .list-item {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
        @include media-breakpoint-down(xxl) {
            .group {
                &:nth-child(5) {
                    .group-title,
                    .list-item {
                        font-size: 18px;
                    }
                }
            }
        }
        @include media-breakpoint-down(xl) {
            .group-title {
                font-size: 18px;
            }
            .group {
                &:nth-child(5) {
                    .group-title,
                    .list-item {
                        font-size: 16px;
                    }
                }
            }
        }
        @include media-breakpoint-down(lg) {
            .group-title {
                font-size: 15px;

                margin-bottom: 2px;
            }
        }
        @include media-breakpoint-down(md) {
            .group-title {
                font-size: 15px;

                margin-bottom: 2px;
            }
        }
    }
}
</style>
