<template>
    <div :class="$style['lesson-report']">
        <div class="wrapper--limit-width">
            <div class="wrapper--limit-width-mini">
                <div :class="$style['module-body']">
                    <ReportPanel />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ReportPanel from "@/components/report/ReportPanel.vue";
</script>
<style lang="scss" module>
//
</style>
