<!--
 * @Description: 弹窗信息
 * @Author: F-Stone
 * @LastEditTime: 2022-11-20 17:27:00
-->

<template>
    <div :class="$style['notification']">
        <div
            :class="$style['notification-box']"
            :data-type="type"
            class="flex items-center"
        >
            <div
                class="ic"
                :class="$style['icon']"
                v-html="theme[type].icon"
            ></div>
            <p class="text">{{ msg }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
const theme = {
    warn: {
        icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.7 1.70005C4.66832 1.70005 1.4 4.96837 1.4 9.00005C1.4 13.0317 4.66832 16.3 8.7 16.3C12.7317 16.3 16 13.0317 16 9.00005C16 4.96837 12.7317 1.70005 8.7 1.70005ZM0 9.00005C0 4.19517 3.89512 0.300049 8.7 0.300049C13.5049 0.300049 17.4 4.19517 17.4 9.00005C17.4 13.8049 13.5049 17.7001 8.7 17.7001C3.89512 17.7001 0 13.8049 0 9.00005ZM5.80503 6.10507C6.07839 5.83171 6.52161 5.83171 6.79497 6.10507L8.7 8.0101L10.605 6.10507C10.8784 5.83171 11.3216 5.83171 11.595 6.10507C11.8683 6.37844 11.8683 6.82166 11.595 7.09502L9.68995 9.00005L11.595 10.9051C11.8683 11.1784 11.8683 11.6217 11.595 11.895C11.3216 12.1684 10.8784 12.1684 10.605 11.895L8.7 9.99L6.79497 11.895C6.52161 12.1684 6.07839 12.1684 5.80503 11.895C5.53166 11.6217 5.53166 11.1784 5.80503 10.9051L7.71005 9.00005L5.80503 7.09502C5.53166 6.82166 5.53166 6.37844 5.80503 6.10507Z" fill="white"/>
                </svg>
            `,
    },
    error: {
        icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8 16.2C4.82355 16.2 1.6 12.9765 1.6 9.00005C1.6 5.0236 4.82355 1.80005 8.8 1.80005C12.7765 1.80005 16 5.0236 16 9.00005C16 12.9765 12.7765 16.2 8.8 16.2ZM0 9.00005C0 13.8602 3.93989 17.8 8.8 17.8C13.6601 17.8 17.6 13.8602 17.6 9.00005C17.6 4.13994 13.6601 0.20005 8.8 0.20005C3.93989 0.20005 0 4.13994 0 9.00005ZM8 12.2C8 12.6419 8.35817 13 8.8 13H8.808C9.24983 13 9.608 12.6419 9.608 12.2C9.608 11.7582 9.24983 11.4 8.808 11.4H8.8C8.35817 11.4 8 11.7582 8 12.2ZM8.8 9.80005C9.24183 9.80005 9.6 9.44188 9.6 9.00005V5.80005C9.6 5.35822 9.24183 5.00005 8.8 5.00005C8.35817 5.00005 8 5.35822 8 5.80005V9.00005C8 9.44188 8.35817 9.80005 8.8 9.80005Z" fill="white"/>
                </svg>
            `,
        color: "#FF3D3D",
    },
};
defineProps<{
    type: "warn" | "error";
    msg: string;
}>();
</script>
<style lang="scss" module>
.notification {
    // init
}
.notification-box {
    font-size: 13px;
    line-height: em(20px, 13px);

    padding: 18px 25px;

    color: #fff;
    .icon {
        width: 18px;
        height: 18px;
        margin-right: 6px;

        border-radius: 10px;
        svg {
            width: 100%;
        }
    }
    &[data-type="warn"] {
        background-color: #ffc823;
    }
    &[data-type="error"] {
        background-color: #ff3d3d;
    }
}
</style>
