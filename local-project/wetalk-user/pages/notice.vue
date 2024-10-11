<!--
 * @Description: 消息
 * @Author: F-Stone
 * @LastEditTime: 2023-01-09 16:21:58
-->
<template>
    <div :class="$style['notice-page']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['notice-panel']" class="flex relative">
                    <template v-if="userList.length">
                        <div
                            :class="$style['panel-role']"
                            class="flex flex-col"
                        >
                            <div
                                :class="$style['panel-head']"
                                class="flex justify-between items-center"
                            >
                                <div :class="$style['panel-title']">
                                    <span class="text">{{
                                        $t("KEY_BASE.MESSAGE")
                                    }}</span>
                                </div>
                                <button
                                    :class="$style['btn-refresh']"
                                    @click="refresh"
                                >
                                    <span class="text">{{
                                        $t("KEY_BASE.REFRESH")
                                    }}</span>
                                </button>
                            </div>
                            <div
                                :class="$style['user-list-box']"
                                class="scroll-container"
                            >
                                <div
                                    :class="$style['list-item']"
                                    class="flex items-center"
                                    v-for="(item, index) in userList"
                                    :key="index"
                                    :data-active="
                                        currentUserId === item.sendUserid
                                    "
                                    @click="currentUserId = item.sendUserid"
                                >
                                    <UserAvatar
                                        :class="$style['item-avatar']"
                                        :avatar="item?.headImg"
                                    />
                                    <div :class="$style['item-intro']">
                                        <div
                                            :class="$style['name']"
                                            class="flex justify-between"
                                        >
                                            <span
                                                class="text"
                                                :class="$style['user-name']"
                                                >{{ item.sendName }}</span
                                            >
                                            <span
                                                class="text"
                                                :class="$style['time']"
                                                :data-is-read="item.isRead"
                                            >
                                                {{ item.sendtime }}
                                            </span>
                                        </div>
                                        <div :class="$style['info']">
                                            {{ item.message }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- TODO 手机端未做分页形式 -->
                            <div
                                :class="$style['user-tab-bar']"
                                class="flex text-center"
                                v-if="userTotal > userPageSize"
                            >
                                <div
                                    :class="$style['tab-prev']"
                                    class="w-1/2"
                                    @click="tabUserPrev"
                                    :data-disable="disableUserPrev"
                                >
                                    <i class="ic iconfont icon-arrow-left"></i>
                                </div>
                                <div
                                    :class="$style['tab-next']"
                                    class="w-1/2"
                                    @click="tabUserNext"
                                    :data-disable="disableUserNext"
                                >
                                    <i class="ic iconfont icon-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                        <PublicSmartScrollBox :class="$style['panel-msg']">
                            <div
                                :class="$style['panel-msg--inner']"
                                class="relative"
                                :style="{
                                    padding:
                                        detailTotal <= detailPageSize ? 0 : '',
                                }"
                            >
                                <div
                                    :class="$style['msg-group']"
                                    class="scroll-container"
                                >
                                    <div
                                        :class="$style['msg-item']"
                                        v-for="(item, index) in userDetailList"
                                        :key="index"
                                    >
                                        <div :class="$style['time']">
                                            {{ item.sendtime }}
                                        </div>
                                        <div
                                            :class="$style['content']"
                                            v-html="item.message"
                                        ></div>
                                    </div>
                                </div>
                                <PageTab
                                    class="absolute bottom-0 w-full"
                                    v-if="detailTotal > 1"
                                    :total="detailTotal"
                                    :layout-size="2"
                                    :page-size="detailPageSize"
                                    @changePage="changeDetailPage"
                                    :current-index="detailCurrentPage"
                                />
                            </div>
                        </PublicSmartScrollBox>
                    </template>
                    <template v-else>
                        <div :class="$style['empty-panel']">
                            <span class="text">{{
                                $t("KEY_BASE.EMPTY3")
                            }}</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    TYPE_MESSAGE_LIST,
    TYPE_MESSAGE_DETAIL,
} from "@/assets/script/api/api";

import { computed, onMounted, ref, watch } from "vue";
import { getMessageList, getMessageDetail } from "@/assets/script/api/api";
import { useSiteStore } from "@/store/site";
import { distanceToToday, formateDate } from "@/assets/script/util/date";

const siteStore = useSiteStore();

const userPageSize = 12;
const currentUserId = ref<number>();
const userTotal = ref<number>(1);
const userCurrentPage = ref<number>(1);
const userList = ref<TYPE_MESSAGE_LIST["list"]>([]);
function updateMessageList() {
    return getMessageList({
        page: userCurrentPage.value,
        pageSize: userPageSize,
    }).then((res) => {
        siteStore.updateNoticeState(res.data.list[0]?.isRead === 0);
        userTotal.value = res.data.total;
        userList.value = res.data.list.map((item) => {
            const sendDate = Number(item.sendtime);
            const diffDay = distanceToToday(sendDate);
            if (diffDay > 1) {
                item.sendtime = formateDate(sendDate, "yyyy-MM-dd");
            } else {
                item.sendtime = formateDate(sendDate, "HH:mm");
            }
            return item;
        });
    });
}

watch(userCurrentPage, () => {
    updateMessageList();
});

const disableUserPrev = computed(() => {
    return userCurrentPage.value <= 1;
});

const disableUserNext = computed(() => {
    return userCurrentPage.value >= Math.ceil(userTotal.value / userPageSize);
});

function tabUserPrev() {
    if (disableUserPrev.value) return;
    userCurrentPage.value -= 1;
}
function tabUserNext() {
    if (disableUserNext.value) return;
    userCurrentPage.value += 1;
}

const detailPageSize = 12;
const detailTotal = ref<number>(1);
const detailCurrentPage = ref<number>(1);
const userDetailList = ref<TYPE_MESSAGE_DETAIL["list"]>([]);
function updateMessageDetail() {
    if (typeof currentUserId.value === "undefined") return;
    getMessageDetail({
        sendUserid: currentUserId.value,
        page: detailCurrentPage.value,
        pageSize: detailPageSize,
    }).then((res) => {
        detailTotal.value = res.data.total;
        userDetailList.value = res.data.list.map((item) => {
            const sendDate = Number(item.sendtime);
            const diffDay = distanceToToday(sendDate);
            if (diffDay > 1) {
                item.sendtime = formateDate(sendDate, "yyyy-MM-dd HH:mm");
            } else {
                item.sendtime = formateDate(sendDate, "HH:mm");
            }
            return item;
        });
    });
}

watch(currentUserId, (id) => {
    updateMessageDetail();
    userList.value.forEach((item) => {
        if (item.sendUserid === id) {
            item.isRead = 1;
        }
    });
});

function refresh() {
    updateMessageList().then(() => {
        currentUserId.value = userList.value[0]?.sendUserid;
    });
}

function changeDetailPage(pageIndex: number) {
    if (typeof pageIndex === "undefined") return;
    detailCurrentPage.value = pageIndex;
}

onMounted(() => {
    refresh();
});
</script>
<style lang="scss" module>
.notice-page {
    // init
}
.notice-panel {
    position: relative;

    overflow: hidden;

    // height: calc(100vh - 220px);
    height: calc(w-h(100) - min(220px, w-h(23)));
    min-height: 400px;

    border-radius: $panel-radius;
    background: #f5f6f9;
    box-shadow: 0 20px 40px rgb(0 0 0 / 0.08);
    .empty-panel {
        @include ab-cover;
        @include flex(c, c);
        font-size: 20px;

        background: #fff;
    }
    .panel-title {
        font-size: 20px;
        font-weight: 700;
        line-height: em(30px, 20px);

        color: #2d2b32;
    }
    .btn-refresh {
        font-size: 12px;

        padding: 3px 12px;

        color: #777;
        border-radius: 4px;
        background-color: #f5f6f9;
    }
    .user-tab-bar {
        line-height: 60px;

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;

        transition: 0.26s ease;

        color: #6f767e;
        border-top: 1px solid #eaeaea;
        .tab-prev,
        .tab-next {
            position: relative;

            cursor: pointer;
            transition: 0.26s ease;
            &:hover {
                color: #333;
                background-color: rgb(0 0 0 / 0.05);
            }
            &[data-disable] {
                cursor: not-allowed;

                opacity: 0.5;
            }
        }
    }
    @include media-breakpoint-down(sm) {
        flex-direction: column;
        .panel-title {
            font-size: 18px;
        }
    }
}
.panel-role {
    position: relative;

    width: 340px;
    padding-bottom: 70px;

    background-color: #fff;
    .panel-head {
        margin-bottom: 19px;
        padding: 30px 30px 0;
    }
    .user-list-box {
        overflow: auto;

        padding: 0 30px;
    }
    .list-item {
        @include space-between(8px, "y");
        overflow: hidden;

        padding: 10px 12px;

        cursor: pointer;
        transition: 0.26s ease;

        border-radius: 10px;
        &[data-active],
        &:hover {
            background-color: #f5f6f9;
        }
    }
    .item-intro {
        flex: 1 1 auto;
    }
    .item-avatar {
        flex: 0 0 auto;

        width: 46px;
        margin-right: 10px;
    }
    .name {
        font-family: "Inter";
        font-size: 13px;
        font-weight: 700;
        font-style: normal;
        line-height: em(20px, 13px);

        color: #1a1d1f;
    }
    .user-name {
        @include ellipse(1);
        display: block;

        min-width: 1px;
        max-width: 160px;
    }
    .time {
        display: inline-block;

        transform: scale(0.8);
        transform-origin: right;

        color: #b1b5c4;
        &[data-is-read="0"] {
            &::after {
                display: inline-block;

                width: 8px;
                height: 8px;
                margin-left: 4px;

                content: "";

                border-radius: 50%;
                background-color: #ff7a34;
            }
        }
    }
    .info {
        @include ellipse(1);
        font-size: 12px;
        font-weight: 400;

        min-width: 1px;
        max-width: 200px;
        margin-top: 4px;

        color: #6f767e;
    }
    @include media-breakpoint-down(lg) {
        width: 280px;
        .user-list-box {
            padding: 0 10px;
        }
    }
    @include media-breakpoint-down(md) {
        width: 200px;
        .info {
            display: none;
        }
        .name {
            display: block;

            text-align: left;
        }
        .time {
            transform-origin: left;
        }
        .list-item {
            padding: 8px;
        }
    }
    @include media-breakpoint-down(sm) {
        width: 100%;
        padding-bottom: 10px;
        .user-list-box {
            white-space: nowrap;
        }
        .list-item {
            @include space-between(10px);
            display: inline-flex;

            width: 200px;
        }
    }
}
.panel-msg {
    flex: 1 1 auto;

    min-height: 0;
    padding: 0 c-space(3) 20px;
    .msg-group {
        overflow: auto;

        height: 100%;
    }
    .panel-msg--inner {
        height: 100%;
        padding-bottom: 60px;
    }
}
.msg-item {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    .time {
        font-family: "Inter";
        font-size: 12px;
        font-weight: 500;
        line-height: em(13px, 12px);

        margin: c-space(3.8) 0 c-space(2.6);

        text-align: center;

        color: #777;
    }
    .content {
        padding: c-space(3);

        border-radius: 10px;
        background-color: #fff;
    }
}
</style>
