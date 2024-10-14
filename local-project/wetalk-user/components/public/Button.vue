<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-11-22 17:29:58
-->
<template>
    <button
        v-if="!to"
        :class="$style['button']"
        :data-state="state"
        :data-disable="disable"
        :data-active="active"
        @click="submit"
    >
        <slot />
    </button>
    <Link
        :to="to"
        :class="$style['button']"
        :data-state="state"
        :data-disable="disable"
        :data-active="active"
        :target="target"
        v-else
    >
        <slot />
    </Link>
</template>
<script lang="ts" setup>
const prop = withDefaults(
    defineProps<{
        active?: boolean;
        disable?: boolean;
        to?: string;
        target?: "_blank" | "_self";
        state?: "error" | "";
    }>(),
    {
        disable: false,
        active: false,
        state: "",
        target: "_self",
    }
);
const emit = defineEmits<{ (e: "submit"): void }>();
function submit() {
    if (prop.disable) return;
    emit("submit");
}
</script>
<script lang="ts">
export default {
    name: "PublicButton",
};
</script>
<style lang="scss" module>
.button {
    padding: 12px 34px;

    transition: 0.26s ease;

    color: #777;
    border-radius: 26px;
    box-shadow: inset 0 0 0 2px #e6e8ec;
    &[data-active],
    &:hover {
        color: #fff;
        background: #f8af00;
        box-shadow: inset 0 0 0 2px #f8af00;
    }
    &[data-disable] {
        cursor: not-allowed;

        background: #f5f6f9;
        box-shadow: inset 0 0 0 2px #f5f6f9;
        &:hover {
            color: #777;
            background: #f5f6f9;
            box-shadow: inset 0 0 0 2px #f5f6f9;
        }
    }
    &[data-state="error"] {
        cursor: default;

        color: #fc5555;
        background: #f5f6f9;
        box-shadow: inset 0 0 0 2px #f5f6f9;
        &:hover {
            color: #fc5555;
            box-shadow: inset 0 0 0 2px #f5f6f9;
        }
    }
}
</style>
