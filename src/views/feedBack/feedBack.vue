<template>
    <div class="feed-back">
        <van-nav-bar  left-text="返回" title="意见反馈" left-arrow @click-left="onClickLeft" />
          <div class="wrap">
               <div class="title">
                <h2>请选择反馈类型</h2>
               </div>
               <div class="main">
                <div class="main-item mt-28 color-180180">
                    向开发者反馈
                </div>
                <div class="main-item">
                    <h3 class="pt-8" @click="jump({
                        path:'/abnormalFunction',
                        params:{}
                    })">
                        功能异常
                    </h3>
                    <span class="color-180180">
                        请向开发者反馈小程序功能异常问题。
                    </span>
                </div>

                <div class="main-item" @click="jump({
                        path:'/feedBackSumbit',
                        params:{
                            title:'产品建议',
                        }
                    })">
                    <h3 class="pt-8">
                        产品建议
                    </h3>
                    <span class="color-180180">
                        请向开发者反馈你对产品的相关建议。
                    </span>
                </div>

                <div class="main-item mt-28 color-180180">
                    向微信平台投诉
                </div>

                <div class="main-item" @click="jump({
                        path:'/reportingViolations',
                        params:{
                            title:'',
                        }
                    })">
                    <h3 class="pt-8">
                       违规举报
                    </h3>
                    <span class="color-180180">
                        若遇色情、诱导、骚扰、欺诈、恶意营销、违法犯罪等情况，可向微信举报。
                    </span>
                </div>
               </div>
          </div>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFeedbackStore } from "@/stores/feedBack";
let useFeedBack = useFeedbackStore();
 let router = useRouter();
 const onClickLeft = () => history.back();
 let jump = (params:any)=>{
     router.push({path:params.path,query:params.params})
 }


</script>
    
<style lang="scss" scoped>
  
.feed-back{
    h3{
                font-weight: 500;
                color: black;
            }
    .pt-8{
        padding:.8rem 0;
    }
    .mt-28{
        margin-top: 2.8rem;
    }
    .color-180180{
        color: rgb(127, 127, 127);
    }
    padding:0 1.2rem;
    .wrap{ 
        .main-item{
            border-bottom: .1rem solid rgb(223, 223, 223);
            padding-bottom: 1.2rem;
            font-weight: none;
        }
        margin:14rem auto;
        .title{
            text-align: center;
        }
    }
}
</style>
    