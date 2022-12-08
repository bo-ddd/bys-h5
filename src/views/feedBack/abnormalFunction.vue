<template>
    <div>
        <van-nav-bar  left-text="返回" left-arrow @click-left="onClickLeft" />
       <FeedBackList>
           <template #title>
               请选择反馈内容
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
   let list =  ["无法打开小程序","小程序闪退","卡顿","黑屏白屏","死机","界面错位","界面加载慢","其他异常"];
   let feedBackSumbit = (item:string)=>{
    router.push({path:"/feedBackSumbit",query:{title:item}})
   }
   </script>
   
   <style>
   
   </style>