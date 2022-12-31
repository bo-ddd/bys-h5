<template>
    <div class="deliveryfeedback">
        <van-nav-bar title="投递反馈" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-tabs v-model:active="active" @click="selectDelivery()" color="#3B80FB">
            <van-tab  v-for="item in stageTitl"  :title="item.label" @click="selectDelivery()">
                <van-empty v-if="!list.length" image="error" description="空空如也" />
              <div v-else>
               <div class="cord-box" v-for="item in list">
                  <div class="header">
                     <div class=""><h3>{{ item.companyName }}</h3></div>
                     <div class="red-ft">{{ item.positionMoney.split(",")[0] }}-{{item.positionMoney.split(",")[1]  }}</div>
                  </div>
                  <div class="count">
                     <div class="count-gs">
                        <div><img :src="item.companyLogoUrl" alt=""></div>
                        <div> 
                           {{ item.companyName }}
                         <br>{{ item.companyAddr }}
                        </div>
                       </div>
                     <div class="d0-ft">{{ item.interviewTime }}</div>
                  </div>
              </div>
            </div>
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

let list:any = ref([]);

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
  .cord-box{
     border-bottom: .1rem solid rgb(247, 247, 247);
     border-top: .5rem solid rgb(247, 247, 247);
     .header{
      display: flex;
      justify-content: space-between;
      padding: 1rem;
       .red-ft{
          color: red;
          font-weight: 600;
       }
     }
     .count{
      display: flex;
      justify-content: space-between;
      padding:0 1rem;
      .count-gs{
         display: flex;
         align-items: center;
         gap: 0 .5rem;
         img{
            width: 4rem;
            height:4rem;
            align-items: center;
            gap: 0 1rem;
         }
      }
      .d0-ft{
         color: #a5a5a5;
         font-size: 1rem;
       }
     }
  }
</style>
    