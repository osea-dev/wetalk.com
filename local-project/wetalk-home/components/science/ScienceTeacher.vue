<template>
    <div :class="$style['science-teacher']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <ModuleHeader :title="$t('KEY_PAGE_SCIENCE.TEACHER.TITLE')" />
            </div>
        </div>
        <div :class="$style['module-body']">
            <div class="wrapper--limit-width">
                <div
                    class="wrapper--limit-width-mini flex items-center justify-between sm:block"
                >
                    <div :class="$style['module-info']">
                        <div
                            :class="$style['info-list']"
                            class="wow animate__fadeInRight-50"
                        >
                            <div
                                v-for="(item, index) in infoList"
                                :key="index"
                                :class="$style['info-item']"
                                class="flex items-center"
                            >
                                <i
                                    class="ic iconfont icon-circle-right-strock flex items-center justify-center"
                                ></i>
                                <span class="text">{{ $t(item) }}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        :class="$style['teacher-thumb-list']"
                        class="flex items-end"
                    >
                        <div :class="$style['teacher-thumb']">
                            <img
                                src="@/assets/images/science/teacher-1.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const infoList = [
    "KEY_PAGE_SCIENCE.TEACHER.LIST[0]",
    "KEY_PAGE_SCIENCE.TEACHER.LIST[1]",
    "KEY_PAGE_SCIENCE.TEACHER.LIST[2]",
];
</script>
<style lang="scss" module>
.science-teacher {
    position: relative;

    overflow: hidden;
    .module-body {
        margin-top: -52px;

        background-image: linear-gradient(
            0deg,
            #e4f0ff 0%,
            rgb(228 240 255 / 0) 100%
        );
    }
    .info-list {
        font-size: 16px;
        font-weight: 500;
        line-height: em(30px, 16px);

        padding: 43px 70px 43px 55px;

        color: #333;
        border-radius: 16px;
        background-color: #fff;

        backdrop-filter: blur(10px);
    }
    .info-item {
        @include space-between(em(33px, 16px), "y");
        font-size: 16px;
        :global(.ic) {
            @include circle(em(36px, 20px));

            font-size: em(20px, 16px);

            margin-right: em(15px, 20px);

            color: #fff;
            background: #0aca91;
        }
    }
    .module-info {
        flex: 0 0 auto;
    }
    .teacher-thumb-list {
        position: relative;

        padding-top: 114px;
    }
    .teacher-thumb {
        @include image-placeholder(2085px, 1108px);

        width: min(1042.5px, 70vw);
    }
    @include media-breakpoint-down(xxl) {
        .module-info {
            //
        }
        .info-list {
            font-size: 14px;
        }
    }
    @include media-breakpoint-down(xl) {
        .info-list {
            padding: 40px 50px;
        }
        .info-item {
            font-size: 13px;
        }
    }
    @include media-breakpoint-down(lg) {
        .info-list {
            padding: 40px 30px;
            .info-item {
                @include space-between(20px, y);
            }
        }
    }
    @include media-breakpoint-down(md) {
        .module-body {
            padding-top: 70px;
        }
        .info-list {
            position: absolute;
            z-index: 10;
            top: 30%;

            padding: 30px 20px;
            .info-item {
                @include space-between(20px, y);
            }
        }
    }
    @include media-breakpoint-down(sm) {
        .module-body {
            padding-top: 70px;
        }
        .info-list {
            position: relative;

            margin-bottom: 30px;
            padding: 30px 20px;
            .info-item {
                @include space-between(20px, y);
            }
        }
        .teacher-thumb-list {
            padding-top: 30px;
        }
        .teacher-thumb {
            width: 90%;
            max-width: 500px;
            margin: 0 auto;
        }
    }
}
</style>
