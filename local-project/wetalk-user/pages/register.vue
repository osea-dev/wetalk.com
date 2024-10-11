<!--
 * @Description: 用户注册
 * @Author: F-Stone
 * @LastEditTime: 2022-12-27 14:54:01
-->
<template>
    <main :class="$style['register-body']" class="flex">
        <div class="state-pos--left w-1/2 xl:w-full">
            <div
                :class="$style['preview-pic']"
                class="flex items-center justify-center"
            >
                <img src="@/assets/images/login/picture.png" alt="" />
            </div>
        </div>
        <div
            class="state-pos--right w-1/2 flex justify-center items-center xl:w-auto"
            :class="$style['wrapper--register-panel']"
        >
            <RegisterPanel
                :class="$style['register-panel']"
                @submit="registerSuc"
            />
        </div>
    </main>
</template>
<script lang="ts">
import {
    defineComponent,
    useContext,
    useRouter,
} from "@nuxtjs/composition-api";
import linkManage from "~/assets/script/local-data/link-manage";

export default defineComponent({
    layout: "simple",
    setup() {
        const router = useRouter();
        const { app } = useContext();
        function registerSuc() {
            router.push({
                path: app.localePath(linkManage.index),
            });
        }
        return {
            registerSuc,
        };
    },
});
</script>
<style lang="scss" module>
.register-body {
    height: w-h(100);
    .preview-pic {
        overflow: hidden;

        height: 100%;
        img {
            width: 100%;
            height: 100%;

            object-fit: cover;
        }
    }
}
@include media-breakpoint-down(xl) {
    .wrapper--register-panel {
        @include move-center;
        overflow: hidden;

        max-width: 92%;

        border-radius: 10px;
        background-color: #fff;
        box-shadow: 20px 20px 50px rgb(0 0 0 / 0.2);
    }
}
</style>
