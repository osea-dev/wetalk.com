<template>
    <main :class="$style['login-body']" class="flex">
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
            :class="$style['wrapper--login-panel']"
        >
            <LoginPanel :class="$style['login-panel']" />
        </div>
    </main>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    name: "LoginPage",
    layout: "simple",
    middleware: ["check-login"],
    setup() {
        //
    },
});
</script>
<style lang="scss" module>
.login-body {
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
    .wrapper--login-panel {
        @include move-center;
        overflow: hidden;

        max-width: 92%;

        border-radius: 10px;
        background-color: #fff;
        box-shadow: 20px 20px 50px rgb(0 0 0 / 0.2);
    }
}
</style>
