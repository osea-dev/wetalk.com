<template>
    <div class="w-footer w-module">
        <div class="wrapper--limit-width">
            <div class="module-body flex items-center justify-between">
                <div class="state-pos--left">
                    <div class="copyright">
                        <span class="text">{{
                            $t("KEY_OTHER.COPYRIGHT", [fullYear])
                        }}</span>
                    </div>
                </div>
                <div class="state-pos--right flex sm:block">
                    <div class="nav-list flex">
                        <Link
                            :to="item.link"
                            class="nav-item"
                            v-for="(item, index) in navList"
                            :key="index"
                        >
                            <span class="text">{{ $t(item.title) }}</span>
                        </Link>
                    </div>
                    <div class="legist-list flex items-center">
                        <Link
                            target="_blank"
                            :to="localePath(link.service)"
                            class="legist-item"
                            >{{ $t("KEY_OTHER.TERMS_OF_SERVICE") }}</Link
                        >
                        <i class="divide-line"></i>
                        <Link
                            target="_blank"
                            :to="localePath(link.policy)"
                            class="legist-item"
                            >{{ $t("KEY_OTHER.PRIVACY_POLICY") }}</Link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import link from "~/assets/script/local-data/link-manage";
const fullYear = new Date().getUTCFullYear();
const navList = [
    { link: link.index, title: "KEY_NAV.首页", name: "home" },
    { link: link.chinese, title: "KEY_NAV.语言学", name: "chinese" },
    { link: link.education, title: "KEY_NAV.众语集", name: "lesson" },
    { link: link.teacher, title: "KEY_NAV.进贤进能", name: "teacher" },
    { link: link.science, title: "KEY_NAV.真科学", name: "science" },
    { link: link.sinology, title: "KEY_NAV.潮国学", name: "sinology" },
];
</script>
<style lang="scss">
//
/* ---------------------------------- */
/*               底部版权信息               */
/* ---------------------------------- */
.w-footer {
    color: #bdbdbd;
    background-color: #fff;
    .module-body {
        height: var(--footer-h);
    }
    .copyright {
        font-size: 12px;
    }
    .nav-item {
        @include space-between(46px);
        font-size: 13px;
        font-weight: normal;

        transition: 0.26s ease;
        &:hover {
            color: var(--t-c-deep);
        }
    }
    .legist-list {
        font-size: 13px;

        margin-left: 134px;
        .divide-line {
            display: block;

            width: 1px;
            height: 9px;
            margin: 0 16px;

            background-color: var(--l-c-divide);
        }
        .legist-item {
            &:hover {
                color: var(--t-c-deep);
            }
        }
    }
    @include media-breakpoint-down(xxl) {
        .nav-item {
            @include space-between(28px);
        }
        .legist-list {
            margin-left: 58px;
        }
        .w-footer .copyright {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(xl) {
        .nav-item {
            @include space-between(20px);
            font-size: 12px;
        }
        .legist-list {
            font-size: 12px;

            margin-left: 30px;
            .divide-line {
                margin: 0 10px;
            }
        }
        .copyright {
            font-size: 12px;
        }
    }
    @include media-breakpoint-down(lg) {
        .module-body {
            flex-direction: column-reverse;

            align-items: flex-start;

            justify-content: center;
            .copyright {
                padding-top: 4px;
            }
            .state-pos--right {
                width: 100%;

                justify-content: space-between;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .legist-list {
            margin: 10px 0;
        }
    }
}
.lang-en {
    .w-footer {
        .module-body {
            flex-direction: column-reverse;

            padding: 20px 0;

            align-items: flex-start;
        }
        .state-pos--right {
            width: 100%;

            justify-content: space-between;
        }
    }
    @include media-breakpoint-down(lg) {
        .w-footer {
            .state-pos--right {
                display: block;
            }
            .legist-list {
                margin: 1em 0;
            }
        }
    }
    @include media-breakpoint-down(md) {
        .w-footer {
            padding-top: 30px;
            .state-pos--right {
                display: flex;

                margin-bottom: 30px;

                align-items: flex-start;
            }
            .legist-list {
                display: grid;

                margin: 0;

                gap: 10px;

                grid-template-columns: 1fr;
                .divide-line {
                    display: none;
                }
            }
            .nav-list {
                display: grid;

                gap: 10px;

                grid-template-columns: 1fr 1fr;
            }
        }
    }
}
</style>
