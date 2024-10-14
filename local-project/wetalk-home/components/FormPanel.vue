<template>
    <div :class="$style['message-form--box']">
        <form action="/" :class="$style['message-form']" autocomplete="off">
            <div :class="$style['message-form--head']">
                {{ title }}
            </div>
            <div :class="$style['message-form--body']">
                <slot />
            </div>
            <div :class="$style['message-form--footer']">
                <button :class="$style['btn--submit']" @click="submit">
                    {{ $t("KEY_OTHER.SUBMIT") }}
                </button>
            </div>
        </form>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    title: string;
}>();

const emit = defineEmits<{ (e: "submit"): void }>();

function submit(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
    emit("submit");
}
</script>
<style lang="scss" module>
.message-form--box {
    box-sizing: content-box;
    width: 385px;
    max-width: 100%;
    padding: 55px 46px;

    border-radius: 8px;
    background-color: #fff;
}
.message-form {
    width: 100%;
}
.message-form--head {
    font-size: 22px;
    font-weight: 700;

    margin-bottom: em(30px, 22px);

    text-align: center;

    color: #333;
}
.message-form--footer {
    font-size: 16px;

    margin-top: em(23px, 16px);
    .btn--submit {
        font-weight: 700;
        line-height: em(54px, 16px);

        display: block;

        width: 100%;

        text-align: center;

        color: #fff;
        border-radius: em(8px, 16px);
        background-color: #14b082;
    }
}
@include media-breakpoint-down(xxl) {
    .message-form--box {
        width: 365px;
        padding: 44px 36.8px;
    }
    .message-form--head {
        font-size: 22px;
    }
    .message-form--body {
        .form-row {
            @include space-between(18px, "y");
        }
        .value {
            font-size: 14px;
        }
    }
    .message-form--footer {
        font-size: 15px;
    }
}
@include media-breakpoint-down(xl) {
    .message-form--box {
        width: 320px;
        padding: 38px 36.8px;
    }
    .message-form--head {
        font-size: 20px;

        margin-bottom: em(24px, 22px);
    }
    .message-form--footer {
        font-size: 13px;
    }
}
</style>
