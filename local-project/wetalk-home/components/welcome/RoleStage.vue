<template>
    <main id="roleStage" class="role-stage" :class="$style['role-stage']">
        <div class="role-scene">
            <div class="role-container role--kong">
                <!-- 背景 -->
                <div class="layer layer-1">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/beijing.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 国 -->
                <div class="layer layer-2 layer-guo">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/guo.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 中 -->
                <div class="layer layer-3 layer-zhong">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/zhong.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 众语 -->
                <div class="layer layer-4 layer-zhongyu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/zhongyu.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 孔子 - 图 -->
                <div class="layer layer-5">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/kongzi.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 孔子 - 字 -->
                <div class="layer layer-6 layer-yishuzu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/kongzizi.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 云 -->
                <div class="layer layer-7">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/yun.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 中庸 -->
                <div class="layer layer-8 layer-v-text">
                    <div class="text-box">
                        <div class="text-inner">
                            <span class="text">【中庸之道</span>
                            <br />
                            <span class="text">己所不欲勿施于人</span>
                            <br />
                            <span class="text"
                                >学而不思则罔，思而不学则殆 】</span
                            >
                        </div>
                    </div>
                </div>
                <!-- xiaozi -->
                <div class="layer layer-9 layer-r-text">
                    <div class="text-box">
                        <div
                            class="text-inner"
                            v-html="$t('KEY_PAGE_WELCOME.KONGZI.INTRO')"
                        ></div>
                    </div>
                </div>
                <div class="layer layer-10 layer-baiyun">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/baiyun.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-11 layer-baiyun">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/baiyun.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="role-container role--meng">
                <!-- 国 -->
                <div class="layer layer-guo">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/guo.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 中 -->
                <div class="layer layer-zhong">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/zhong.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 众语 -->
                <div class="layer layer-zhongyu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/zhongyu.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-baiyun layer-baiyun1">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/baiyun.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-baiyun layer-baiyun2">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/baiyun.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-bi">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/meng/bi.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-renwu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/meng/renwu.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-shan">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/meng/shan.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-yishuzu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/meng/wenzi.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-v-text">
                    <div class="text-box">
                        <div class="text-inner">
                            <span class="text">【 诚者，天之道也</span>
                            <br />
                            <span class="text">穷则独善其身，达则兼善天下</span>
                            <br />
                            <span class="text">老吾老，以及人之老； </span>
                            <br />
                            <span class="text">幼吾幼，以及人之幼 】</span>
                        </div>
                    </div>
                </div>
                <div class="layer layer-r-text">
                    <div class="text-box">
                        <div
                            class="text-inner"
                            v-html="$t('KEY_PAGE_WELCOME.MENGZI.INTRO')"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="role-container role--lao">
                <!-- 国 -->
                <div class="layer layer-guo">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/guo.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 中 -->
                <div class="layer layer-zhong">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/zhong.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 众语 -->
                <div class="layer layer-zhongyu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/zhongyu.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-renwu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/lao/renwu.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-yishuzu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/lao/wenzi.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-hehua">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/lao/hehua.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-v-text">
                    <div class="text-box">
                        <div class="text-inner">
                            <span class="text">【 上善若水</span>
                            <br />
                            <span class="text"
                                >道生一。一生二。二生三。三生万物</span
                            >
                            <br />
                            <span class="text"
                                >人心惟危，道心惟危，惟精惟一，</span
                            >
                            <br />
                            <span class="text"> 允执厥中 】</span>
                        </div>
                    </div>
                </div>
                <div class="layer layer-r-text">
                    <div class="text-box">
                        <div
                            class="text-inner"
                            v-html="$t('KEY_PAGE_WELCOME.LAOZI.INTRO')"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="role-container role--zhuang">
                <div class="layer layer-beijing">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/zhuang/beijing.png"
                            alt=""
                        />
                    </div>
                </div>
                <!-- 众语 -->
                <div class="layer layer-zhongyu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/zhongyu.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-renwu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/zhuang/renwu.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-yishuzu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/zhuang/wenzi.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-shu">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/zhuang/shu.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-v-text">
                    <div class="text-box">
                        <div class="text-inner">
                            <span class="text">【 见笑于大方之家</span>
                            <br />
                            <span class="text">德有所长，形有所忘</span>
                            <br />
                            <span class="text"
                                >至人无己，神人无功，圣人无名 】</span
                            >
                        </div>
                    </div>
                </div>
                <div class="layer layer-r-text">
                    <div class="text-box">
                        <div
                            class="text-inner"
                            v-html="$t('KEY_PAGE_WELCOME.ZHUANGZI.INTRO')"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="role-container role--all">
                <div class="layer layer-logo">
                    <Link class="img-box" :to="linkManage.index">
                        <nuxt-img data-src="@/assets/images/logo.png" alt="" />
                    </Link>
                </div>
                <div class="layer layer-shan">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/meng/shan.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-role layer-role-1 grid grid-cols-4">
                    <div>
                        <div class="img-box img-kong">
                            <nuxt-img
                                data-src="@/assets/images/index/kong/kongzi.png"
                                alt=""
                            />
                            <div class="decoration-box">
                                <div class="text-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/kong/kongzizi.png"
                                        alt=""
                                    />
                                </div>
                                <div class="draw-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/all/decoration.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div><div class="img-box img-meng"></div></div>
                    <div><div class="img-box img-lao"></div></div>
                    <div><div class="img-box img-zhuang"></div></div>
                </div>
                <div class="layer layer-role layer-role-2 grid grid-cols-4">
                    <div><div class="img-box img-kong"></div></div>
                    <div>
                        <div class="img-box img-meng">
                            <nuxt-img
                                data-src="@/assets/images/index/meng/renwu.png"
                                alt=""
                            />
                            <div class="decoration-box">
                                <div class="text-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/meng/wenzi.png"
                                        alt=""
                                    />
                                </div>
                                <div class="draw-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/all/decoration.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div><div class="img-box img-lao"></div></div>
                    <div><div class="img-box img-zhuang"></div></div>
                </div>
                <div class="layer layer-role layer-role-3 grid grid-cols-4">
                    <div><div class="img-box img-kong"></div></div>
                    <div>
                        <div class="img-box img-meng"></div>
                    </div>
                    <div>
                        <div class="img-box img-lao">
                            <nuxt-img
                                data-src="@/assets/images/index/lao/renwu.png"
                                alt=""
                            />
                            <div class="decoration-box">
                                <div class="text-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/lao/wenzi.png"
                                        alt=""
                                    />
                                </div>
                                <div class="draw-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/all/decoration.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="img-box img-zhuang"></div>
                    </div>
                </div>
                <div class="layer layer-role layer-role-4 grid grid-cols-4">
                    <div>
                        <div class="img-box img-kong"></div>
                    </div>
                    <div>
                        <div class="img-box img-meng"></div>
                    </div>
                    <div>
                        <div class="img-box img-lao"></div>
                    </div>
                    <div>
                        <div class="img-box img-zhuang">
                            <nuxt-img
                                data-src="@/assets/images/index/zhuang/renwu.png"
                                alt=""
                            />
                            <div class="decoration-box">
                                <div class="text-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/zhuang/wenzi.png"
                                        alt=""
                                    />
                                </div>
                                <div class="draw-box">
                                    <nuxt-img
                                        data-src="@/assets/images/index/all/decoration.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layer layer-cloud">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/yun.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-cloud-left">
                    <div class="img-box">
                        <nuxt-img
                            data-src="@/assets/images/index/kong/yun.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="layer layer-btn">
                    <div class="img-box" @click="goToIndexPage">
                        <nuxt-img :data-src="TANSUO_IMG" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import { useContext, useRouter, computed } from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";

const zhImg = require("@/assets/images/index/all/btn-text.png");
const enImg = require("@/assets/images/index/all/btn-text-en.png");

const { $cookies, localePath, i18n } = useContext();
const router = useRouter();
function goToIndexPage() {
    $cookies.set("ignore-welcome", "1", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    router.push(localePath("/"));
}

const TANSUO_IMG = computed(() => {
    let result = zhImg;
    if (i18n.localeProperties.code === "en") {
        result = enImg;
    }
    return result;
});
</script>
<style lang="scss" module>
.role-stage {
    // init
}
</style>
