<template>
    <div class="deliveryfeedback">
        <van-tabs v-model:active="active" color="#3B80FB">
            <van-tab v-for="index in 8" :title="'标签 ' + index">
                <van-empty image="error" description="空空如也" />
            </van-tab>
        </van-tabs>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
let active = ref(0);
</script>
    
<style lang="scss" scoped>

</style>
    