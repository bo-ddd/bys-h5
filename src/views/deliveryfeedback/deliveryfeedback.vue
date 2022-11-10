<template>
    <div class="deliveryfeedback">
        <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-tabs v-model:active="active" @click="selectDelivery()" color="#3B80FB">
            <van-tab  v-for="item in stageTitl"  :title="item.label" @click="selectDelivery()">
                <van-empty v-if="!list.length" image="error" description="空空如也" />
              <div v-else>{{list}}</div>
            </van-tab>
        </van-tabs>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { useFeedbackStore } from "@/stores/feedBack";
let active = ref(0);
const onClickLeft = () => history.back();
let useFeedBack = useFeedbackStore();
let stageTitl:any = ref([]);

let list = ref([]);

 let getStage = async ()=>{
    let res = await useFeedBack.getStage({});
    stageTitl.value = res.data;
 }
    getStage();
  
 let selectDelivery = async ()=>{
    let res:any = await useFeedBack.selectDelivery({deliveryStatus:active.value,userId:10000});
    if(res.code == 200){
       list.value = res.data;
    }
 }
 selectDelivery();

</script>
    
<style lang="scss" scoped>

</style>
    