<template>
 <div>
    <FeedBackList>
        <template #title>
            请选择反馈内容
        </template>
        <template #item>
            <van-cell v-for="(item,index) in 8" title="单元格" is-link  :key="index"/>
        </template>
    </FeedBackList>
 </div>
</template>

<script setup lang="ts">
import FeedBackList from "@/components/feedback/FeedBackList.vue";
</script>

<style>

</style>