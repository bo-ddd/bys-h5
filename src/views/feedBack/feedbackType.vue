<template>
 <div>
    <feedBackList>
        <template #title>
            请选择反馈内容
        </template>
        <template #item>
            <van-cell v-for="item in 8" title="单元格" is-link />
        </template>
    </feedBackList>
 </div>
</template>

<script setup lang="ts">
import feedBackList from "@/components/feedback/feedBackList.vue";
</script>

<style>

</style>