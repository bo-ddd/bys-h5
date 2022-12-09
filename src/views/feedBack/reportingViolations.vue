<template>
    <div>
        <van-nav-bar  left-text="返回" left-arrow @click-left="onClickLeft" />
       <FeedBackList>
           <template #title>
               请选择投诉原因
           </template>
           <template #item>
               <van-cell  v-for="(item,index) in list" :title="item" is-link  :key="index"  @click="feedBackSumbit(item)"/>
           </template>
       </FeedBackList>
    </div>
   </template>
   
   <script setup lang="ts">
   import FeedBackList from "@/components/feedback/feedBackList.vue";
   import { useRouter } from 'vue-router';
   let router = useRouter();
   const onClickLeft = () => history.back();
   let list = ["欺诈","色情低俗","诱导","传播不实信息","违法犯罪","骚扰","侵权","混淆他人投诉","恶意营销","与服务类目不符","隐私信息收集","其他"];
   let feedBackSumbit = (item:string)=>{
    router.push({path:"/feedBackSumbit",query:{title:item}})
   }
   </script>
   
   <style>
   
   </style>