<template>
  <div class="news-page">
    <div class="news-box">
      <img :src="parseAssetFile('icon-nomessage.png')" alt />
      <div class="text-title mt-20">暂无企业的邀请</div>
      <div class="text-tip mt-10">您的在线简历完善度只有45分，低于平均分82.8。在线简历完善后，就能吸引更多企业</div>
      <div class="btn-box mt-20">
        <van-button type="primary" block @click="to('/createResume')">完善简历</van-button>
        <!-- <van-button type="primary" block>完善简历</van-button> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { parseAssetFile } from "@/assets/util";
const to = function (path: any) {
  router.push(path);
};
</script>
  
<style lang="scss" scoped>
.news-page {
  height: 100%;
  .news-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 13rem;
      height: 11rem;
    }
    .text-title{
      font-size: 1.6rem;
    }
    .text-tip{
      font-size: 1.4rem;
      color: #5f5f5f;
      text-align: center;
      padding: 0 2rem;
    }
    .btn-box{
      box-sizing: border-box;
      width: 100%;
      padding: 0 10rem;
    }
  }
}
</style>
  