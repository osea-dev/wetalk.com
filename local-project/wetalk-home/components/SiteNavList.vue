<template>
    <div class="flex" :class="$style['nav-list']" :data-theme="theme">
        <template v-for="(item, index) in siteNavList">
            <Link
                v-if="item.type === 'link'"
                :key="index"
                :data-type="item.type"
                :to="item.link"
                :data-active="activeNav === item.name"
                :class="$style['nav-item']"
            >
                <span class="text">{{ $t(item.title) }}</span>
            </Link>
            <div
                v-else-if="item.type === 'folder'"
                :key="index + 'folder'"
                :data-type="item.type"
                :data-active="testFolderActive(item, activeNav)"
                :class="$style['nav-item']"
            >
                <span class="text">{{ $t(item.title) }}</span>
                <i class="ic iconfont icon-arrow-down"></i>
                <div :class="$style['nav-subnav']">
                    <div :class="$style['subnav-list']">
                        <template v-for="(subitem, subindex) in item.subnav">
                            <Link
                                v-if="subitem.type === 'link'"
                                :key="subindex"
                                :class="$style['subnav-item']"
                                :to="subitem.link"
                                :data-active="activeNav === subitem.name"
                            >
                                <i
                                    v-if="subitem.icon"
                                    class="color-iconfont"
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
                            >
                                <i
                                    v-if="subitem.icon"
                                    class="color-iconfont"
                                    :class="[
                                        subitem.icon,
                                        $style['subnav-icon'],
                                    ]"
                                ></i>
                                <span class="text">{{
                                    $t(subitem.title)
                                }}</span>
                                <div
                                    :class="$style['subnav-level-2']"
                                    class="flex"
                                >
                                    <div
                                        :class="
                                            $style['subnav-level-2-wrapper']
                                        "
                                        class="w-full flex flex-col justify-center"
                                    >
                                        <template
                                            v-for="(
                                                subsubitem, subsubindex
                                            ) in subitem.subnav"
                                        >
                                            <div
                                                v-if="
                                                    subsubitem.type === 'link'
                                                "
                                                :key="subsubindex"
                                                :class="
                                                    $style['subsubnav-item']
                                                "
                                            >
                                                <Link
                                                    :to="subsubitem.link"
                                                    :data-active="
                                                        activeNav ===
                                                        subsubitem.name
                                                    "
                                                >
                                                    <span class="text">{{
                                                        $t(subsubitem.title)
                                                    }}</span>
                                                </Link>
                                            </div>
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
</template>
<script lang="ts" setup>
import type { TYPE_FOLDER_NAV } from "@/assets/script/local-data/site-nav-list";
import { siteNavList } from "@/assets/script/local-data/site-nav-list";

defineProps<{ activeNav: string; theme: string }>();

function testFolderActive(folder: TYPE_FOLDER_NAV, targetName: string) {
    return folder.subnav.some((item) => {
        if (item.type === "folder") return false;
        return item.name === targetName;
    });
}
</script>
<style lang="scss" module>
.nav-list {
    font-size: em(16px, $t-s-default);

    color: var(--t-c-lighter);
    .nav-item {
        @include space-between(em(50px, 16px));

        line-height: em(24px, 16px);

        position: relative;

        cursor: pointer;
        transition: 0.26s ease;
        :global(.ic) {
            font-size: 12px;
            line-height: em(24px, 12px);

            position: absolute;
            top: 0;
            left: calc(100% + 8px);

            display: block;
        }
        &::after {
            position: absolute;
            top: 100%;
            left: 50%;

            display: block;

            width: 0;
            height: em(9px, 16px);
            margin-left: em(-23px, 16px);

            content: "";
            transition: 0.26s ease;

            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAJCAYAAABNEB65AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHJSURBVHgB7VNLThtBEH3Vg1GkEGlukFlajiM6WWU5OUGSE4QbJDewuUG4gY8wPgHjXXZ0grCsrPoGGYOwER5XUQ22NSAbD0sk3mZ6qqrrvfo08ExBmxzN5qekYa5TAd4SKAFJoV9nGvOBc85jC5b3lWEfQgmRWD3HIoiV1GvePGrwYd1cy/No9NvfEx6cuzvXX4QpJSNpIMD6Sn0p/G04dG5ps9bGV1ev4sV9qyJDwQm2QvLTs5PPq0JpZoVkPzQq5FgWWokv9D83ZDJqtz92SChVY4r6+DWb7x6thBr5uqnQB0I9JFRPycJQ6DTy9Y2S4Ct00p6FfESUn1/O+8HjvSvo/bsPx5oprUFaaFwNcRWRTJlE7JkxmEyUTwnbLW0UobtOpHYZLCiMjlVEuqWQm05lHO49zL4DI0dKkG4iBnF+McHgzWvTUeNPPCZVJGNIX0Vm68huY4jHEOMMScygwgDxnVhRs3Qxw/jvyOXYgtsdb7XsQQTqhJ1SsT2eS+/s38mfamCzafWx0XFlzFiM3mmnsvNL9DeJrSK8h7LED8OGtEjdZ+lxSd5EdHAx5cM6OVbC6yJJbLy3h+86+nEE/D8duj5e8DTcABWS86b76wePAAAAAElFTkSuQmCC");
            background-repeat: no-repeat;
            background-size: auto em(9px, 16px);
        }
        &[data-type="folder"] {
            padding-right: 7px;
        }
        &[data-active],
        &:hover {
            color: $t-c-default;
            &::after {
                width: em(46px, 16px);
            }
        }
        &:hover {
            .nav-subnav {
                visibility: visible;

                opacity: 1;
            }
            .subnav-list {
                transform: translateY(0);
            }
        }
    }
    .nav-subnav {
        position: absolute;
        z-index: 100;
        top: 100%;
        left: 50%;

        visibility: hidden;

        width: em(176px, 16px);
        margin-left: em(-80px, 16px);
        padding-top: em(17px, 16px);

        transition: 0.36s ease;

        opacity: 0;
    }
    .subnav-list {
        padding: em(14px, 16px) em(10px, 16px);

        transition: 0.36s ease;
        transform: translateY(em(16px, 16px));

        border-radius: em(12px, 16px);
        background-color: #fff;
        box-shadow: 0 10px 80px rgb(187 193 201 / 0.4);
    }
    .subnav-item {
        @include space-between(em(5px, 15px), "y");
        font-size: em(15px, 16px);
        line-height: em(40px, 15px);

        display: flex;

        padding-right: em(7px, 15px);

        transition: 0.36s ease;
        text-align: center;

        color: var(--t-c-lighter);

        align-items: center;

        justify-content: center;
        .subnav-icon {
            font-size: em(17px, 15px);

            flex: 0 0 auto;

            width: em(22px, 17px);
            margin-right: 10px;

            text-align: center;
        }
        &[data-type="folder"] {
            &:hover {
                .subnav-level-2 {
                    visibility: visible;

                    opacity: 1;
                }
            }
            & > span {
                position: relative;
                &::after {
                    font-family: "iconfont" !important;
                    font-size: em(13px, 15px);
                    font-style: normal;

                    position: absolute;
                    top: 0;
                    left: calc(100% + em(11px, 13px));

                    content: "\e696";
                    transform: rotate(270deg);

                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            }
        }
        &:global(.nuxt-link-active),
        &[data-active],
        &:hover {
            // color: var(--t-c-default);
            color: #000;
            border-radius: 4px;
            background: #f7f9fa;
        }
    }
    .subnav-level-2 {
        position: absolute;
        top: 0;
        left: 100%;

        visibility: hidden;

        width: em(140px, 15px);
        height: 100%;
        padding: 10px;

        transition: 0.26s ease;

        opacity: 0;
        border-radius: em(12px, 16px);
        background: #fff;
        &::after {
            position: absolute;
            top: 0;
            bottom: 0;
            left: em(-10px, 15px);

            width: em(20px, 15px);

            content: "";

            background-color: #fff;
        }
    }
    .subnav-level-2-wrapper {
        border-radius: 4px;
        background: #f7f9fa;
    }
    .subsubnav-item {
        transition: 0.26s ease;

        color: #777;
        &:hover {
            color: #2d2b32;
        }
    }
}
.nav-list[data-theme="white"] {
    color: #fff;
    .nav-item {
        &[data-active],
        &:hover {
            color: #fff;
            &::after {
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAQCAYAAACbdRhPAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJqSURBVHgB7ViLUeQwDH2eoYBcBaSDy1Vw6YBQwZVwRwV3VwF0wG4FQAWECthUsKYC6GCRsES0YT/52DAw+2be2GS8kp4iOTbAAQd8ZThEwGq1ymhQPjGdc094J5D/nIaCeCxjYeLJZNmC6Ilziu0aH4RBCZfEspjvMpZYF2XhiTXxPwn0iARJbmli0OQOgSf+o7jmmAhTbIwcoeBeCw+d4nM9jLGgE4wXx5gRz8ZUvSRY/ZcIomLhtE+1dzooF9ou2gfuLtZeuw3G2cAvYoXxCd6ECxJ3tmsB+S5k+hMhuWVE/5twTTGddmLI0XZQPiEGrfAaIeHMxpmW4CqqxEEKcGt96z7sVHCFtAl+ExORi2DK9sTwHZuaaGaztqWQ4CsEoe8B9vOA9BXMAr3MubI0mTHsqm27b9fih7enh11b5xHW305qpDgdeIQkzGR+x4K5c1U4zZcYDv7twvydmeceQcsdPxjybUqRcK2oVNB2fRG87QRkks2x5D1s6octM6PV4RFe6s2UU5fu4UuMb+3asBE7YypqGzzalp0PPemQvpKGW/NIXxijm9wMbeK9sDHr4SbeL46k/fjDcdnzNx6huphNNwCyBbQixsKL/Rn27Ik9sBA7Co6rxNv4PEJiC5mHU4VzNSLi9VhIifpDw29sbj8WfIHQTos9NtXWOfpDP0azvj6GQE5CfDjwaIshlzl/xB9l6Q1CN/C6H/wg6Y2ZAyNeEu+Jj8Rb4olsO0Nt/V3tBvtYEs+J1RgfA2LJ1L74KnirIR7Ly7Brc3MfiI4o/0vZBhFTIVyktLI8woVjbk8SB0RC6or5bHgGTWhQRRRD2Q4AAAAASUVORK5CYII=");
            }
        }
    }
}
body[data-nav-size="mini"] {
    .nav-list {
        font-size: em(14px, $t-s-default);
    }
    @include media-breakpoint-down(xl) {
        .nav-list {
            .nav-item {
                font-size: 14px;
                :global(.ic) {
                    left: calc(100% + 0px);
                }
                &[data-type="folder"] {
                    padding-right: 4px;
                }
            }
        }
    }
}
:global(.lang-en) {
    .nav-item {
        @include space-between(em(40px, 16px));
        &[data-type="folder"] {
            :global(.ic) {
                line-height: 1;

                position: static;

                display: inline;

                vertical-align: -1px;
            }
        }
        &::after {
            margin-left: -19px;
        }
    }
    .nav-list {
        .nav-item {
            .nav-subnav {
                width: 17em;
                margin-left: -7.5em;
            }
        }
        .subnav-item {
            padding: 0 1.5em;

            justify-content: start;
            &[data-type="folder"] {
                & > span {
                    position: relative;

                    flex: 1 1 auto;

                    text-align: left;
                    &::after {
                        right: -0.5em;
                        left: auto;
                    }
                }
            }
        }
        .subnav-level-2 {
            width: auto;

            text-align: left;
            white-space: nowrap;
            .subsubnav-item {
                padding: 0 1.5em;
            }
        }
    }
    @include media-breakpoint-down(xxxl) {
        .nav-list {
            font-size: em(15px, $t-s-default);
        }
    }
    @include media-breakpoint-down(xxl) {
        .nav-list {
            font-size: em(13px, $t-s-default);
        }
    }
    @include media-breakpoint-down(xl) {
        .nav-list {
            font-size: em(12px, $t-s-default);
            .nav-item {
                .nav-subnav {
                    width: 17em;
                    margin-left: -8em;
                }
            }
        }
        .nav-item {
            @include space-between(em(30px, 16px));
            vertical-align: middle;
            span {
                vertical-align: middle;
            }
        }
    }
}
/* stylelint-disable-next-line no-duplicate-selectors */
body[data-nav-size="mini"] {
    :global(.lang-en) {
        @include media-breakpoint-down(xxl) {
            .nav-list {
                font-size: em(13px, $t-s-default);
                .nav-item {
                    font-size: 12px;
                    &[data-type="folder"] {
                        padding-right: 0;
                    }
                }
            }
        }
        @include media-breakpoint-down(xl) {
            .nav-list {
                font-size: em(12px, $t-s-default);
            }
        }
    }
}
// @include media-breakpoint-down(xxxl) {
//     .nav-list {
//         font-size: 15px;
//         .nav-item {
//             @include space-between(em(40px, 16px));
//             &::after {
//                 margin-left: -19px;

//                 background-size: auto 7px;
//             }
//             &.state-active,
//             &:hover {
//                 &::after {
//                     width: 38px;
//                 }
//             }
//         }
//     }
// }
@include media-breakpoint-down(xxxl) {
    .nav-list {
        .nav-item {
            @include space-between(em(40px, 16px));
            &[data-type="folder"] {
                padding-right: 0;
            }
            &::after {
                margin-left: -19px;

                background-size: auto 7px;
            }
            &.state-active,
            &:hover {
                &::after {
                    width: 38px;
                }
            }
        }
    }
}
@include media-breakpoint-down(xxl) {
    .nav-list {
        font-size: 15px;
        .nav-item {
            @include space-between(em(34px, 16px));
        }
    }
}
@include media-breakpoint-down(xl) {
    .nav-list {
        font-size: 14px;
        .nav-item {
            @include space-between(em(26px, 16px));
            :global(.ic) {
                font-size: 12px;

                left: calc(100% + 3px);

                transform: scale(0.8);
            }
            &::after {
                margin-left: -15px;

                background-size: auto 6px;
            }
            &.state-active,
            &:hover {
                &::after {
                    width: 30px;
                }
            }
        }
    }
}
</style>
