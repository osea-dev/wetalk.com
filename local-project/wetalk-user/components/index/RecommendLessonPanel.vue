<template>
    <div :class="$style['recommend-lesson-panel']">
        <div :class="$style['lesson-group']">
            <div :class="$style['group-head']">
                <div :class="$style['group-title']">
                    <span class="text">{{
                        $t("KEY_RECOMMEND_PANEL.TITLE")
                    }}</span>
                </div>
                <!-- <div :class="$style['group-subtitle']">
                    <span class="text">根据你的学习偏好推荐，</span
                    ><button>修改学习偏好</button>
                </div> -->
            </div>
            <div :class="$style['lesson-list']">
                <a
                    :href="'/education/' + item.courseid"
                    target="_blank"
                    :class="$style['list-item']"
                    class="flex items-center sm:block"
                    v-for="(item, index) in lessonList"
                    :key="index"
                >
                    <div :class="$style['item-thumb']">
                        <img :src="item.img" alt="" />
                    </div>
                    <div :class="$style['item-info']">
                        <h3 :class="$style['item-title']">
                            {{ item.title }}
                        </h3>
                        <p :class="$style['item-desc']">
                            {{ item.message }}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import type { TYPE_COURSE } from "@/assets/script/api/api";

import { defineComponent, ref } from "vue";
import { getRecommendCourse } from "@/assets/script/api/api";
import { useFetch } from "@nuxtjs/composition-api";

export default defineComponent({
    setup() {
        const lessonList = ref<TYPE_COURSE[]>([]);
        useFetch(async () => {
            await getRecommendCourse().then((res) => {
                if (res.statusCode === 0) {
                    lessonList.value = res.data.map((item) => {
                        if (item.message?.length > 42) {
                            item.message = item.message.slice(0, 40) + "...";
                        }
                        return item;
                    });
                }
            });
        });
        return {
            lessonList,
        };
    },
});
</script>
<style lang="scss" module>
.lesson-group {
    padding: calc(var(--p-normal) * 3.4) calc(var(--p-normal) * 4)
        calc(var(--p-normal) * 4);

    border-radius: $panel-radius;
    background-color: #fff;
    .group-head {
        margin-bottom: 26px;
    }
    .group-title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(30px, 20px);

        margin-bottom: 7px;

        color: #2d2b32;
    }
    .group-subtitle {
        font-size: 13px;
        line-height: em(20px, 13px);

        color: #777;
        button {
            text-decoration: underline;
        }
    }
    .list-item {
        @include space-between(25px, "y");
    }
    .item-thumb {
        @include image-placeholder(220px, 134px);
        flex: 0 0 auto;

        margin-right: 30px;

        border-radius: 6px;
    }
    .item-title {
        font-size: 18px;
        font-weight: 700;
        line-height: em(27px, 18px);

        margin-bottom: 12px;

        color: #2d2b32;
    }
    .item-desc {
        padding-bottom: 8px;

        color: #777;
    }
    @include media-breakpoint-down(sm) {
        .group-head {
            margin-bottom: var(--y-space-normal);
        }
        .item-thumb {
            width: 100%;
            margin: 0;
            margin-bottom: 21px;
        }
    }
}
</style>
