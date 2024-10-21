<template>
    <div
        ref="dom"
        :class="$style['intro-module']"
        class="flex justify-between items-center lg:block"
    >
        <div :class="$style['state-pos-left']">
            <div :class="$style['title']" v-html="data.title"></div>
            <div :class="$style['desc']"></div>
            <div :class="$style['footer']" class="flex">
                <div
                    v-for="(item, index) in data.counter"
                    :key="index"
                    :class="$style['counter']"
                >
                    <div :class="$style['num']" v-html="item.num"></div>
                    <span class="text">{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div :class="$style['state-pos-right']" class="relative">
            <div ref="img1" :class="$style['layer-1']">
                <nuxt-img :src="data.img1" alt="" />
            </div>
            <div ref="img2" :class="$style['layer-2']">
                <nuxt-img :src="data.img2" alt="" />
            </div>
            <div ref="img3" :class="$style['layer-3']">
                <nuxt-img :src="data.img3" alt="" />
            </div>
            <div v-if="data.img4" ref="img4" :class="$style['layer-4']">
                <nuxt-img :src="data.img4" alt="" />
            </div>
            <StudyTag
                v-if="data.tag"
                ref="tag1"
                size="mini"
                :text="data.tag"
                :class="$style['tag']"
                @click.native="openDialog"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import StudyTag from "~/components/study-abroad/StudyTag.vue";
const prop = defineProps<{
    animate?: boolean;
    data: {
        title: string;
        desc: string;
        counter: { num: string; title: string }[];
        img1: string;
        img2: string;
        img3: string;
        img4?: string;
        tag?: string;
    };
}>();

// 打开客服
function openDialog() {
    $(".zhiCustomBtn").trigger("click");
}

const dom = ref<HTMLElement>();
const img1 = ref<HTMLElement>();
const img2 = ref<HTMLElement>();
const img3 = ref<HTMLElement>();
const img4 = ref<HTMLElement>();
const tag1 = ref<HTMLElement>();
onMounted(() => {
    if (!prop.animate) return;
    const tl = gsap.timeline({
        scrollTrigger: { scrub: true, trigger: dom.value! },
    });
    const depth = 200;
    if (img1.value) {
        tl.fromTo(img1.value, { y: depth * 1.5 }, { y: -depth * 1.5 }, 0);
    }
    if (img2.value) {
        tl.fromTo(img2.value, { y: depth * 1 }, { y: -depth * 1 }, 0);
    }
    if (img3.value) {
        tl.fromTo(img3.value, { y: depth * 0.5 }, { y: -depth * 0.5 }, 0);
    }
    if (img4.value) {
        tl.fromTo(img4.value, { y: depth * 2.2 }, { y: -depth * 2.2 }, 0);
    }
    if (tag1.value) {
        tl.fromTo(tag1.value, { y: depth * 1.5 }, { y: -depth * 1.5 }, 0);
    }
});
</script>
<style lang="scss" module>
.intro-module {
    position: relative;
    .title {
        font-size: 56px;
        font-weight: 700;
        line-height: 140%;

        margin-bottom: em(34px, 56px);

        color: #181a1e;
    }
    .desc {
        font-size: 16px;
        font-weight: 400;
        line-height: 200%;

        margin-bottom: em(60px, 16px);

        color: #2d2b32;
    }
    .counter {
        @include space-between(80px);
        font-size: 18px;
        font-weight: 400;
        line-height: em(30px, 18px);

        color: #4e545f;
        .num {
            font-family: "Inter";
            font-size: em(40px, 18px);
            font-weight: 700;
            line-height: em(54px, 40px);

            position: relative;
            z-index: 10;

            margin-bottom: em(6px, 40px);

            color: #181a1e;
            &::after {
                position: absolute;
                z-index: -1;
                bottom: 8px;
                left: 0;

                width: em(60px, 40px);
                height: em(10px, 40px);

                content: "";

                border-radius: 5px;
                background: #feb60d;
            }
        }
        &:last-child {
            .num {
                /* stylelint-disable-next-line selector-pseudo-element-colon-notation */
                &:after {
                    background: #9771ff;
                }
            }
        }
    }
    .state-pos-left {
        width: 509px;
    }
    .state-pos-right {
        font-size: 520px;

        margin-right: 82px;
    }
    .layer-1 {
        @include image-placeholder(240px, 240px);
        position: absolute;
        z-index: 20;
        top: percent(45px, 520px);
        left: percent(400px, 520px);

        width: em(240px, 520px);

        border-radius: em(30px, 520px);
    }
    .layer-2 {
        @include image-placeholder(520px, 520px);
        position: relative;
        z-index: 10;

        width: em(520px, 520px);

        border-radius: em(60px, 520px);
    }
    .layer-3 {
        @include image-placeholder(270px, 270px);
        position: absolute;
        z-index: 1;
        top: percent(354px, 520px);
        left: percent(422px, 520px);

        width: em(270px, 520px);

        border-radius: em(30px, 520px);
    }
    .layer-4 {
        @include image-placeholder(332px, 328px);
        position: absolute;
        z-index: 30;
        top: percent(356px, 520px);
        left: percent(210px, 520px);

        width: em(332px, 520px);

        border-radius: em(30px, 520px);
    }
    .tag {
        position: absolute;
        z-index: 30;
        top: percent(413px, 520px);
        left: percent(57px, 520px);

        cursor: pointer;
    }
    @include media-breakpoint-down(xxxl) {
        .title {
            font-size: 46px;
        }
        .state-pos-right {
            font-size: 450px;

            margin-right: 142px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .module-one {
            padding-bottom: 162px;
        }
        .title {
            font-size: 36px;
        }
        .counter {
            font-size: 15px;
        }
        .state-pos-right {
            font-size: 380px;

            margin-right: 130px;
        }
    }
    @include media-breakpoint-down(xl) {
        .state-pos-right {
            font-size: 350px;
        }
        .title {
            font-size: 34px;
        }
        .counter {
            font-size: 14px;
        }
    }
    @include media-breakpoint-down(lg) {
        .state-pos-left {
            width: 100%;
            margin-bottom: 140px;
        }
        .state-pos-right {
            font-size: 300px;

            width: 50%;
        }
        .desc {
            font-size: 16px;
        }
        .title {
            font-size: 34px;
        }
        .counter {
            font-size: 14px;
        }
    }
    @include media-breakpoint-down(md) {
        .state-pos-right {
            font-size: 260px;

            width: 60%;
        }
        .tag {
            top: percent(360px, 520px);
        }
    }
}
:global(.lang-en) {
    @include media-breakpoint-down(xxxl) {
        .intro-module .title {
            font-size: 38px;
        }
        .intro-module .counter {
            font-size: 16px;

            max-width: 170px;
        }
    }
    @include media-breakpoint-down(xxl) {
        .intro-module .title {
            font-size: 30px;
        }
        .intro-module .counter {
            font-size: 13px;

            max-width: 140px;
            margin-right: 30px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    @include media-breakpoint-down(xl) {
        .intro-module .title {
            padding-right: 30px;
        }
    }
}
</style>
