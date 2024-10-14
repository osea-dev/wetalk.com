<template>
    <div :class="$style['select-wrapper']">
        <div :class="$style['input-title']" v-if="title">
            <span class="text"> {{ title }} </span>
        </div>
        <div :class="$style['input-row']">
            <Multiselect
                :value="currentLabel"
                :options="prop.options"
                :searchable="true"
                :close-on-select="true"
                :show-labels="true"
                :custom-label="customLabel"
                placeholder=""
                @select="change"
                :max-height="150"
            >
                <span
                    class="multiselect__element multiselect__element__no_result"
                    slot="noResult"
                    >{{ $t("KEY_BASE.TIP_MSG.11") }}</span
                >
            </Multiselect>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import Multiselect from "vue-multiselect";
const prop = withDefaults(
    defineProps<{
        value: string;
        name: string;
        title?: string;
        options: { title: string; value: string | number }[];
    }>(),
    {
        title: "",
        name: "",
        value: "",
        options: () => [],
    }
);

const currentLabel = computed(() => {
    let result;
    prop.options.map((item) => {
        if (item.value === prop.value) {
            result = item;
        }
    });
    return result;
});

function customLabel({ title }: { title: string }) {
    return title;
}
const emit = defineEmits<{ (e: "input", value: string): void }>();
function change(value: any) {
    emit("input", value.value);
}
</script>
<style lang="scss" module>
.select-wrapper {
    .input-title {
        font-size: 13px;
        line-height: em(24px, 13px);

        margin-bottom: 6px;

        color: #777;
    }
    .input-row {
        font-size: 13px;
        font-weight: 400;
        line-height: em(24px, 13px);

        position: relative;

        color: #2d2b32;
    }
}
:global {
    .multiselect {
        position: relative;
        input {
            font-size: inherit;

            position: relative !important;

            width: 100% !important;
            padding: 10px 20px !important;

            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD7SURBVHgB7dW7DYMwEAZgG4mkZQRGYIRLE2WLiIkyQrJB2nQwAiMwQmpQuNiAFPEw9tl0ub9AYM6nj3OBEBwOh8P51wBcUgBIREB0D1tNZGuA2BWIceGLATg/dA8bRgoLQt2mwwpWUransizfgoQQ1/GxljJS+1/1Wu3GRLrbD9GbM8pkZggd9WGfu6l+A9Lk6lJN19wwKwgdNZE2N+0xHs3QEBLEgz6ebPpm/ZgG4PGJiLBENLq+Fj4QCmaoiws9NSrCCeKC6e8CEM4QG2Zs5Y0gQbYxi5AQZIgjhozwglgwXghviAHjjQiCzDBJCGKXaEzo35nD4XD2yBfwEatr1gd64QAAAABJRU5ErkJggg==");
            background-repeat: no-repeat;
            background-position-x: calc(100% - 14px);
            background-position-y: center;
            background-size: 17px;
            &:focus {
                z-index: 100;
            }
        }
        .multiselect__single {
            @include ab-cover;
            font-weight: 400;
            line-height: 24px;

            width: 100%;
            padding: 10px 20px;

            pointer-events: none;
        }
        .multiselect__content-wrapper {
            position: absolute;
            z-index: 1000;
            bottom: 100%;

            overflow: auto;

            width: 100%;
            padding: 10px 0;

            border: 1px solid #000;
            background-color: #fff;
        }
        .multiselect__element {
            line-height: 2;

            display: block;

            width: 100%;
        }
        .multiselect__option {
            display: block;

            padding: 0 20px;

            cursor: pointer;
            &:hover {
                color: #fff;
                background: #3b71fe;
            }
        }
        .multiselect__content {
            width: 100%;
        }
        .multiselect__element__no_result {
            opacity: 0.5;
        }
    }
}
</style>
