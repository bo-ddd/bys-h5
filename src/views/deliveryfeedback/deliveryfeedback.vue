<template>
    <div class="deliveryfeedback">
        <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
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
const onClickLeft = () => history.back();
</script>
    
<style lang="scss" scoped>

</style>
    