<template>
    <PublicSmartScrollBox
        ref="siteNavMini"
        :class="$style['site-nav--mini']"
        class="justify-end hidden"
    >
        <div
            ref="mask"
            :class="$style['mask']"
            @click.self="changeNavState(false)"
        ></div>
        <div
            ref="navWrapper"
            :class="$style['wrapper--site-nav']"
            :data-login="!!userAvatar"
        >
            <div :class="$style['panel-head']">
                <Link
                    v-if="userAvatar"
                    :to="linkManage.userIndex"
                    target="_blank"
                    :class="$style['user-avatar']"
                >
                    <img :src="userAvatar" alt="" />
                </Link>
                <div v-else></div>
                <div
                    :class="$style['btn--close']"
                    @click="changeNavState(false)"
                >
                    <i class="ic iconfont icon-close"></i>
                </div>
            </div>
            <div :class="$style['inner']" class="scroll-container">
                <div :class="$style['nav-list']">
                    <template v-for="(item, index) in siteNavList">
                        <Link
                            v-if="item.type === 'link'"
                            :key="index"
                            :class="$style['nav-item']"
                            class="block"
                            :data-is-home="
                                localePath(item.link) ===
                                localePath(linkManage.index)
                            "
                            :to="localePath(item.link)"
                        >
                            <span class="text">{{ $t(item.title) }}</span>
                        </Link>
                        <div
                            v-else-if="item.type === 'folder'"
                            :key="index + 'folder'"
                            :data-type="item.type"
                            :data-active="testFolderActive(item, activeNav)"
                            :data-open-state="
                                testFolderActive(item, activeNav)
                                    ? 'open'
                                    : 'close'
                            "
                            :class="$style['nav-item']"
                            @click="openFolder"
                        >
                            <span class="text">{{ $t(item.title) }}</span>
                            <i class="ic iconfont icon-arrow-down"></i>
                            <div
                                ref="subnav"
                                :class="$style['nav-subnav']"
                                @click.stop="subnavClick"
                            >
                                <div :class="$style['subnav-list']">
                                    <template
                                        v-for="(
                                            subitem, subindex
                                        ) in item.subnav"
                                    >
                                        <Link
                                            v-if="subitem.type === 'link'"
                                            :key="subindex"
                                            :class="$style['subnav-item']"
                                            :to="subitem.link"
                                            :data-active="
                                                activeNav === subitem.name
                                            "
                                        >
                                            <i
                                                v-if="subitem.icon"
                                                class="color-iconfont mr-1"
                                                :class="[
                                                    subitem.icon,
                                                    $style['subnav-icon'],
                                                ]"
                                            ></i>
                                            <span class="text">{{
                                                $t(subitem.title)
                                            }}</span>
                                        </Link>
                                        <div
                                            v-if="subitem.type === 'folder'"
                                            :key="subindex"
                                            :class="$style['subnav-item']"
                                            class="flex"
                                            data-type="folder"
                                            :data-active="
                                                testFolderActive(
                                                    subitem,
                                                    activeNav
                                                )
                                            "
                                            :data-open-state="
                                                testFolderActive(
                                                    subitem,
                                                    activeNav
                                                )
                                                    ? 'open'
                                                    : 'close'
                                            "
                                            @click="openLv2Folder"
                                        >
                                            <i
                                                v-if="subitem.icon"
                                                class="color-iconfont mr-1"
                                                :class="[
                                                    subitem.icon,
                                                    $style['subnav-icon'],
                                                ]"
                                            ></i>
                                            <span class="text">{{
                                                $t(subitem.title)
                                            }}</span>
                                            <i
                                                class="ic iconfont icon-arrow-down"
                                            ></i>
                                            <div
                                                ref="subnavLv2"
                                                :class="
                                                    $style['subnav-level-2']
                                                "
                                                @click.stop="subnavLv2Click"
                                            >
                                                <div
                                                    :class="
                                                        $style[
                                                            'subnav-level-2-wrapper'
                                                        ]
                                                    "
                                                    class="w-full flex flex-col justify-center"
                                                >
                                                    <template
                                                        v-for="(
                                                            subsubitem,
                                                            subsubindex
                                                        ) in subitem.subnav"
                                                    >
                                                        <Link
                                                            v-if="
                                                                subsubitem.type ===
                                                                'link'
                                                            "
                                                            :key="subsubindex"
                                                            :class="
                                                                $style[
                                                                    'subsubnav-item'
                                                                ]
                                                            "
                                                            :to="
                                                                subsubitem.link
                                                            "
                                                            :data-active="
                                                                activeNav ===
                                                                subsubitem.name
                                                            "
                                                        >
                                                            <span
                                                                class="text"
                                                                >{{
                                                                    $t(
                                                                        subsubitem.title
                                                                    )
                                                                }}</span
                                                            >
                                                        </Link>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div :class="$style['mini-nav-footer']">
                <div
                    :class="$style['switch-bar']"
                    :data-has-lang="langLength > 1"
                >
                    <div :class="$style['currency-switch']">
                        <select v-model="selectCurrency">
                            <option
                                v-for="(op, index) in currencyList"
                                :key="index"
                                :value="op.currencyCode"
                            >
                                {{ op.currency }}
                            </option>
                        </select>
                    </div>
                    <div v-if="langLength > 1" :class="$style['lang-switch']">
                        <select v-model="selectLang">
                            <option
                                v-for="(op, index) in langList"
                                :key="index"
                                :value="op.lang"
                            >
                                {{ op.title }}
                            </option>
                        </select>
                    </div>
                </div>
                <div v-if="!userAvatar" :class="$style['login-bar']">
                    <Link
                        :class="$style['login-btn']"
                        class="flex items-center justify-center"
                        target="_blank"
                        :to="linkManage.login"
                    >
                        <span class="text">{{ $t("KEY_OTHER.LOGIN") }}</span>
                    </Link>
                    <Link
                        :class="$style['register-btn']"
                        class="flex items-center justify-center"
                        target="_blank"
                        :to="linkManage.register"
                    >
                        <span class="text">{{ $t("KEY_OTHER.REGISTER") }}</span>
                    </Link>
                </div>

                <div v-else :class="$style['login-bar']">
                    <button :class="$style['btn--logout']" @click="logout">
                        <span class="text">{{ $t("KEY_NAV.EXIT") }}</span>
                        <i class="ic iconfont icon-exit"></i>
                    </button>
                </div>
            </div>
        </div>
    </PublicSmartScrollBox>
</template>
<script lang="ts" setup>
import type { TYPE_FOLDER_NAV } from "@/assets/script/local-data/site-nav-list";

import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useSiteStore } from "@/store/site";
import SmartScrollBox from "@/components/public/SmartScrollBox.vue";
import { siteNavList } from "@/assets/script/local-data/site-nav-list";
import linkManage from "~/assets/script/local-data/link-manage";
import { useContext, useRoute } from "@nuxtjs/composition-api";
import { useUserStore } from "@/store/user";
import { postLogout } from "@/assets/script/api/api";

const siteStore = useSiteStore();
const siteNavMini = ref<InstanceType<typeof SmartScrollBox>>();
const mask = ref<HTMLElement>();
const navWrapper = ref<HTMLElement>();
const route = useRoute();

function testFolderActive(folder: TYPE_FOLDER_NAV, targetName: string) {
    return folder.subnav.some((item) => {
        if ("name" in item) {
            return item.name === targetName;
        } else {
            return item.subnav.some((item) => {
                if ("name" in item) {
                    return item.name === targetName;
                }
            });
        }
    });
}

const activeNav = computed(() => {
    let result = "";

    Object.entries(linkManage).some(([key, val]) => {
        if (val === route.value.path) {
            result = key;
        }
    });

    return result;
});

watch(
    () => siteStore.minNavIsOpen,
    (isOpen) => {
        isOpen ? open() : close();
    }
);

watch(
    () => route.value.fullPath,
    () => {
        siteStore.changeMinNavIsOpen(false);
    }
);

watch(
    () => {
        let result = "";
        Object.entries(siteStore.mediaMatch).some(([k, v]) => {
            if (v === true) {
                result = k;
                return true;
            }
        });
        return result;
    },
    () => {
        siteStore.changeMinNavIsOpen(false);
    }
);

function open() {
    if (!siteNavMini.value?.container) return;
    const containerDom = siteNavMini.value.container;
    gsap.timeline({
        onStart() {
            gsap.set(containerDom, { display: "flex" });
            gsap.set(navWrapper.value!, { x: "100%" });
        },
    })
        .to(mask.value!, { opacity: 1, duration: 0.6 })
        .to(
            navWrapper.value!,
            { x: 0, ease: "better-elastic", duration: 0.6 },
            0
        );
}

function close() {
    if (!siteNavMini.value?.container) return;
    const containerDom = siteNavMini.value.container;
    gsap.timeline({
        onComplete() {
            gsap.set(containerDom, { display: "" });
            gsap.set(navWrapper.value!, { x: "100%" });
        },
    })
        .to(mask.value!, { opacity: 0, duration: 0.6 })
        .to(
            navWrapper.value!,
            { x: "100%", ease: "better-elastic", duration: 0.6 },
            0
        );
}

const subnav = ref<HTMLElement[]>([]);

function openFolder(ev: MouseEvent) {
    const clickDom = ev.currentTarget;
    if (!clickDom) return;

    const openDom = $(clickDom).find($(subnav.value));
    const dom = openDom.children()[0];
    const height = gsap.getProperty(dom, "height");

    if ($(clickDom).attr("data-open-state") === "close") {
        gsap.to(openDom, {
            height,
            duration: 0.26,
            onStart() {
                $(clickDom).attr("data-open-state", "open");
            },
            onComplete() {
                gsap.set(openDom, { height: "auto" });
            },
        });
    } else {
        gsap.to(openDom, {
            height: 0,
            duration: 0.26,
            onStart() {
                $(clickDom).attr("data-open-state", "close");
            },
        });
    }
}

const subnavLv2 = ref<HTMLElement[]>([]);
function openLv2Folder(ev: MouseEvent) {
    const clickDom = ev.currentTarget;
    if (!clickDom) return;

    const openDom = $(clickDom).find($(subnavLv2.value));
    const dom = openDom.children()[0];
    const height = gsap.getProperty(dom, "height");

    if ($(clickDom).attr("data-open-state") === "close") {
        gsap.to(openDom, {
            height,
            duration: 0.26,
            onStart() {
                $(clickDom).attr("data-open-state", "open");
            },
            onComplete() {
                gsap.set(openDom, { height: "auto" });
            },
        });
    } else {
        gsap.to(openDom, {
            height: 0,
            duration: 0.26,
            onStart() {
                $(clickDom).attr("data-open-state", "close");
            },
        });
    }
}

function changeNavState(isOpen: boolean) {
    siteStore.changeMinNavIsOpen(isOpen);
}

function subnavClick(ev: MouseEvent) {
    ev.stopPropagation();
}

function subnavLv2Click(ev: MouseEvent) {
    ev.stopPropagation();
}

onBeforeUnmount(() => {
    changeNavState(false);
});

const { $cookies, i18n } = useContext();
const selectCurrency = ref<string>(siteStore.currency);
const selectLang = ref<string>(siteStore.lang);

const langLength = computed(() => {
    return i18n.locales.length;
});

watch(
    () => siteStore.currency,
    (newCurrency) => {
        if (selectCurrency.value != newCurrency) {
            selectCurrency.value = newCurrency;
        }
    }
);

const currencyList = computed(() => {
    return siteStore.currencyList;
});
const langList = computed(() => {
    return siteStore.langList;
});

watch(selectCurrency, (currency) => {
    siteStore.updateCurrency(currency);
    $cookies.set("CurrencyCode", currency, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    siteStore.changeMinNavIsOpen(false);
});

watch(selectLang, (lang) => {
    i18n.setLocale(lang);
});

// 登录状态
const userStore = useUserStore();
const userAvatar = computed(() => {
    return userStore.userInfo?.headImg || "";
});

function logout() {
    postLogout()
        .then(() => {
            console.log("console", "removeToken");
            $cookies.remove("UserToken");
        })
        .then(() => {
            window.location.reload();
        });
}
</script>
<style lang="scss" module>
.site-nav--mini {
    font-family: var(--SourceHanSerif);
    font-weight: 700;

    position: fixed;
    z-index: $zindex-fixed;
    top: 0;
    left: 0;

    overflow: hidden;

    width: 100%;
    height: calc(var(--screen-h) * 100);
    .mask {
        @include ab-cover;
        opacity: 0;
        background-color: rgb(0 0 0 / 0.3);
    }
    .user-avatar {
        width: 36px;
        height: 36px;
        img {
            height: 100%;

            object-fit: cover;
        }
    }
}
.wrapper--site-nav {
    position: relative;
    z-index: 10;

    width: 390px;
    max-width: 100vw;

    background-color: #fff;
    &[data-login] {
        .inner {
            padding-bottom: calc(150px + min(90px, w-h(5)));
        }
        .mini-nav-footer {
            bottom: min(90px, w-h(5));
        }
    }
    .panel-head {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 70px;
        padding: 24px min(40px, 10%);

        background-color: #fff;

        align-items: center;
        justify-content: space-between;
    }
    .btn--close {
        @include flex(c, c);
        font-size: 18px;

        width: 40px;
        height: 40px;

        cursor: pointer;
    }
    .inner {
        overflow: auto;

        height: w-h(100);
        padding-top: 80px;
        padding-bottom: calc(220px + 10px);
        padding-bottom: calc(220px + constant(safe-area-inset-bottom) + 10px);
        padding-bottom: calc(220px + env(safe-area-inset-bottom) + 10px);

        overscroll-behavior: none;
    }
    .nav-list {
        font-size: 16px;
        line-height: em(24px, 16px);

        padding: 0 min(40px, 10%);
    }
    .mini-nav-footer {
        font-family: var(--SourceHanSans);

        position: absolute;
        bottom: 0;
        bottom: calc(env(safe-area-inset-bottom) + 0px);
        bottom: calc(constant(safe-area-inset-bottom) + 0px);

        width: 100%;
        padding: 20px min(40px, 10%) 30px;

        background-color: #fff;
    }
    .switch-bar {
        &[data-has-lang] {
            display: grid;

            gap: 0 18px;
            grid-template-columns: 1fr 1fr;
        }
    }
    .login-bar {
        margin-top: 18px;
    }
    .btn--logout,
    .login-btn {
        font-size: 16px;
        line-height: em(42px, 16px);

        width: 100%;

        text-align: center;

        color: #666;
        border: 2px solid #888;
        border-radius: 23px;
    }
    .register-btn {
        margin-top: 15px;

        text-align: center;
        text-decoration: underline;

        color: #666;
    }
    .nav-item {
        font-size: 16px;

        position: relative;

        width: 100%;
        margin-bottom: 7px;
        padding: 18px 0%;

        cursor: pointer;
        transition: 0.26s ease;

        color: #666;
        :global(.text) {
            margin-right: 8px;
        }
        :global(.ic) {
            font-size: 14px;

            display: inline-block;

            transition: 0.26s ease;
        }
        :global(.color-iconfont) {
            font-size: 16px;

            display: inline-block;

            width: 22px;

            transition: 0.26s ease;
            text-align: center;
        }
        &:last-child {
            margin-bottom: 0;
        }
        &[data-active],
        &:hover {
            color: #2d2b32;
        }
        &[data-open-state="open"] {
            & > :global(.ic) {
                transform: rotate(-180deg);
            }
        }
        &[data-active] {
            .nav-subnav {
                height: auto;
            }
        }
        &[data-is-home]:global(.nuxt-link-exact-active),
        &:not([data-is-home]):global(.nuxt-link-active) {
            color: $t-c-default;
            &::after {
                width: em(46px, 16px);
            }
        }
        &::after {
            position: absolute;
            bottom: 6px;
            left: 0%;

            display: block;

            width: 0;
            height: em(9px, 16px);

            content: "";
            transition: 0.26s ease;

            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAJCAYAAABNEB65AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHJSURBVHgB7VNLThtBEH3Vg1GkEGlukFlajiM6WWU5OUGSE4QbJDewuUG4gY8wPgHjXXZ0grCsrPoGGYOwER5XUQ22NSAbD0sk3mZ6qqrrvfo08ExBmxzN5qekYa5TAd4SKAFJoV9nGvOBc85jC5b3lWEfQgmRWD3HIoiV1GvePGrwYd1cy/No9NvfEx6cuzvXX4QpJSNpIMD6Sn0p/G04dG5ps9bGV1ev4sV9qyJDwQm2QvLTs5PPq0JpZoVkPzQq5FgWWokv9D83ZDJqtz92SChVY4r6+DWb7x6thBr5uqnQB0I9JFRPycJQ6DTy9Y2S4Ct00p6FfESUn1/O+8HjvSvo/bsPx5oprUFaaFwNcRWRTJlE7JkxmEyUTwnbLW0UobtOpHYZLCiMjlVEuqWQm05lHO49zL4DI0dKkG4iBnF+McHgzWvTUeNPPCZVJGNIX0Vm68huY4jHEOMMScygwgDxnVhRs3Qxw/jvyOXYgtsdb7XsQQTqhJ1SsT2eS+/s38mfamCzafWx0XFlzFiM3mmnsvNL9DeJrSK8h7LED8OGtEjdZ+lxSd5EdHAx5cM6OVbC6yJJbLy3h+86+nEE/D8duj5e8DTcABWS86b76wePAAAAAElFTkSuQmCC");
            background-repeat: no-repeat;
            background-size: auto em(9px, 16px);
        }
    }
    .nav-subnav {
        overflow: hidden;

        height: 0;
    }
    .subnav-list {
        padding: 15px 30px 0;
    }
    .subnav-item {
        @include space-between(11px, y);
        position: relative;

        display: block;

        padding: 10px 0;

        transition: 0.26s ease;

        color: #666;
        &:hover {
            color: #2d2b32;
        }
        &[data-is-home]:global(.nuxt-link-exact-active),
        &:not([data-is-home]):global(.nuxt-link-active) {
            color: $t-c-default;
            &::after {
                width: em(46px, 16px);
            }
        }
        &::after {
            position: absolute;
            bottom: 0;
            left: 0%;

            display: block;

            width: 0;
            height: em(9px, 16px);

            content: "";
            transition: 0.26s ease;

            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAJCAYAAABNEB65AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHJSURBVHgB7VNLThtBEH3Vg1GkEGlukFlajiM6WWU5OUGSE4QbJDewuUG4gY8wPgHjXXZ0grCsrPoGGYOwER5XUQ22NSAbD0sk3mZ6qqrrvfo08ExBmxzN5qekYa5TAd4SKAFJoV9nGvOBc85jC5b3lWEfQgmRWD3HIoiV1GvePGrwYd1cy/No9NvfEx6cuzvXX4QpJSNpIMD6Sn0p/G04dG5ps9bGV1ev4sV9qyJDwQm2QvLTs5PPq0JpZoVkPzQq5FgWWokv9D83ZDJqtz92SChVY4r6+DWb7x6thBr5uqnQB0I9JFRPycJQ6DTy9Y2S4Ct00p6FfESUn1/O+8HjvSvo/bsPx5oprUFaaFwNcRWRTJlE7JkxmEyUTwnbLW0UobtOpHYZLCiMjlVEuqWQm05lHO49zL4DI0dKkG4iBnF+McHgzWvTUeNPPCZVJGNIX0Vm68huY4jHEOMMScygwgDxnVhRs3Qxw/jvyOXYgtsdb7XsQQTqhJ1SsT2eS+/s38mfamCzafWx0XFlzFiM3mmnsvNL9DeJrSK8h7LED8OGtEjdZ+lxSd5EdHAx5cM6OVbC6yJJbLy3h+86+nEE/D8duj5e8DTcABWS86b76wePAAAAAElFTkSuQmCC");
            background-repeat: no-repeat;
            background-size: auto em(9px, 16px);
        }
        &[data-type="folder"] {
            position: relative;
            &[data-open-state="open"] {
                & > :global(.ic) {
                    transform: rotate(-180deg);
                }
            }
            .subnav-level-2 {
                overflow: hidden;

                height: 0;
            }
            .subnav-level-2-wrapper {
                padding: 15px 30px 0;
            }
            &[data-active] {
                .subnav-level-2 {
                    height: auto;
                }
            }
        }
    }
    .subsubnav-item {
        @include space-between(11px, y);
        position: relative;

        display: block;

        padding: 10px 0;

        transition: 0.26s ease;
        white-space: nowrap;

        color: #666;
        &:hover {
            color: #2d2b32;
        }
        &::after {
            position: absolute;
            bottom: 0;
            left: 0%;

            display: block;

            width: 0;
            height: em(9px, 16px);

            content: "";
            transition: 0.26s ease;

            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAJCAYAAABNEB65AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHJSURBVHgB7VNLThtBEH3Vg1GkEGlukFlajiM6WWU5OUGSE4QbJDewuUG4gY8wPgHjXXZ0grCsrPoGGYOwER5XUQ22NSAbD0sk3mZ6qqrrvfo08ExBmxzN5qekYa5TAd4SKAFJoV9nGvOBc85jC5b3lWEfQgmRWD3HIoiV1GvePGrwYd1cy/No9NvfEx6cuzvXX4QpJSNpIMD6Sn0p/G04dG5ps9bGV1ev4sV9qyJDwQm2QvLTs5PPq0JpZoVkPzQq5FgWWokv9D83ZDJqtz92SChVY4r6+DWb7x6thBr5uqnQB0I9JFRPycJQ6DTy9Y2S4Ct00p6FfESUn1/O+8HjvSvo/bsPx5oprUFaaFwNcRWRTJlE7JkxmEyUTwnbLW0UobtOpHYZLCiMjlVEuqWQm05lHO49zL4DI0dKkG4iBnF+McHgzWvTUeNPPCZVJGNIX0Vm68huY4jHEOMMScygwgDxnVhRs3Qxw/jvyOXYgtsdb7XsQQTqhJ1SsT2eS+/s38mfamCzafWx0XFlzFiM3mmnsvNL9DeJrSK8h7LED8OGtEjdZ+lxSd5EdHAx5cM6OVbC6yJJbLy3h+86+nEE/D8duj5e8DTcABWS86b76wePAAAAAElFTkSuQmCC");
            background-repeat: no-repeat;
            background-size: auto em(9px, 16px);
        }
        &:global(.nuxt-link-active) {
            color: $t-c-default;
            &::after {
                width: em(46px, 16px);
            }
        }
    }
}
</style>
