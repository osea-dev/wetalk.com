<template>
    <div
        class="w-body w-module overflow-hidden"
        :class="$style['study-abroad-sg']"
    >
        <OrbCanvas :color="['#32C1FF', '#14FF8E']" />
        <div class="wrapper--limit-width relative z-10">
            <div class="wrapper--limit-width-1200 relative z-10">
                <div :class="$style['module-one']">
                    <DotTitle
                        :text="$t('KEY_STUDY_ABROAD.S.新加坡留学')"
                        :class="$style['module-head']"
                    />
                    <Intro :data="introData" :animate="true" />
                </div>
                <div :class="$style['module-two']">
                    <div :class="$style['module-head']">
                        <StudyTag
                            :text="$t('KEY_STUDY_ABROAD.S.新加坡留学五大优势')"
                        />
                    </div>
                    <NormalList :data="adList1" />
                </div>
                <div :class="$style['module-three']">
                    <div :class="$style['module-head']">
                        <StudyTag
                            :text="$t('KEY_STUDY_ABROAD.S.新加坡优质高校')"
                        />
                    </div>
                    <NormalList :data="adList2" theme="two" />
                </div>
                <div :class="$style['module-four']">
                    <DotTitle
                        :text="$t('KEY_STUDY_ABROAD.S.新加坡游学')"
                        :class="$style['module-head']"
                    />
                    <Intro :data="introData2" />
                </div>
                <div :class="$style['module-five']">
                    <div :class="$style['module-head']">
                        <StudyTag
                            :text="$t('KEY_STUDY_ABROAD.S.新加坡游学五大优势')"
                        />
                    </div>
                    <NormalList :data="adList3" />
                </div>
            </div>
        </div>
        <MessageBoard class="p-module relative z-10 bg-white" />
    </div>
</template>
<script lang="ts" setup>
import MessageBoard from "@/components/MessageBoard.vue";
import NormalList from "~/components/study-abroad/NormalList.vue";
import StudyTag from "~/components/study-abroad/StudyTag.vue";
import DotTitle from "~/components/study-abroad/DotTitle.vue";
import Intro from "~/components/study-abroad/Intro.vue";
import OrbCanvas from "~/components/study-abroad/OrbCanvas.vue";
import { useContext } from "@nuxtjs/composition-api";

const { i18n } = useContext();

const adList1 = [
    {
        thumb: require("@/assets/images/study-abroad/service-sg-1-1.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD1[0].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD1[0].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-1-2.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD1[1].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD1[1].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-1-3.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD1[2].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD1[2].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-1-4.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD1[3].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD1[3].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-1-5.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD1[4].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD1[4].desc"),
    },
];

const adList2 = [
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-1.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[0].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[0].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-2.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[1].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[1].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-3.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[2].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[2].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-4.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[3].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[3].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-5.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[4].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[4].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-6.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[5].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[5].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-7.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[6].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[6].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-8.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[7].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[7].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-2-9.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD2[8].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD2[8].desc"),
    },
];

const adList3 = [
    {
        thumb: require("@/assets/images/study-abroad/service-sg-3-1.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD3[0].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD3[0].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-3-2.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD3[1].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD3[1].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-3-3.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD3[2].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD3[2].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-3-4.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD3[3].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD3[3].desc"),
    },
    {
        thumb: require("@/assets/images/study-abroad/service-sg-3-5.png"),
        title: i18n.t("KEY_STUDY_ABROAD.S.AD3[4].title"),
        desc: i18n.t("KEY_STUDY_ABROAD.S.AD3[4].desc"),
    },
];

const introData = {
    title: i18n.t("KEY_STUDY_ABROAD.S.INTRO1.title"),
    desc: i18n.t("KEY_STUDY_ABROAD.S.INTRO1.desc"),
    counter: [
        { num: "77%", title: i18n.t("KEY_STUDY_ABROAD.S.INTRO1.counter[0]") },
        {
            num: "TOP<sup>+</sup>",
            title: i18n.t("KEY_STUDY_ABROAD.S.INTRO1.counter[1]"),
        },
    ],
    img1: require("@/assets/images/study-abroad/module-1-1.png"),
    img2: require("@/assets/images/study-abroad/module-1-2.png"),
    img3: require("@/assets/images/study-abroad/module-1-3.png"),
    img4: require("@/assets/images/study-abroad/module-1-4.png"),
};

const introData2 = {
    title: i18n.t("KEY_STUDY_ABROAD.S.INTRO2.title"),
    desc: i18n.t("KEY_STUDY_ABROAD.S.INTRO2.desc"),
    counter: [
        { num: "77%", title: i18n.t("KEY_STUDY_ABROAD.S.INTRO2.counter[0]") },
        {
            num: "TOP<sup>+</sup>",
            title: i18n.t("KEY_STUDY_ABROAD.S.INTRO2.counter[1]"),
        },
    ],
    img1: require("@/assets/images/study-abroad/module-4-1.png"),
    img2: require("@/assets/images/study-abroad/module-4-2.png"),
    img3: require("@/assets/images/study-abroad/module-4-3.png"),
    tag: i18n.t("KEY_STUDY_ABROAD.S.INTRO2.tag"),
};
</script>
<style lang="scss" module>
.study-abroad-sg {
    // init
}
.module-one {
    padding-top: 165px;
    padding-bottom: 262px;
    .module-head {
        margin-bottom: 80px;
    }
}
.module-two {
    margin-bottom: 150px;
    .module-head {
        margin-bottom: 60px;
    }
}
.module-three {
    margin-bottom: 117px;
    .module-head {
        margin-bottom: 60px;
    }
}
.module-four {
    margin-bottom: 175px;
    .module-head {
        margin-bottom: 106px;
    }
}
.module-five {
    margin-bottom: 140px;
    .module-head {
        margin-bottom: 60px;
    }
}
@include media-breakpoint-down(xxl) {
    .module-one {
        padding-bottom: 162px;
    }
    .module-two {
        margin-bottom: 100px;
    }
}
@include media-breakpoint-down(xl) {
    .module-one {
        padding-bottom: 132px;
    }
    .module-two {
        margin-bottom: px;
    }
}
@include media-breakpoint-down(md) {
    .module-one {
        padding-bottom: 80px;
    }
    .module-two {
        margin-bottom: 70px;
    }
}
</style>
