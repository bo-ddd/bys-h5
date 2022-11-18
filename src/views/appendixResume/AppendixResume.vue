<template>
  <div class="append-page">
    <van-nav-bar title="附件简历" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <img class="mt-80 img" :src="parseAssetFile('file-tip.png')" />
      <div class="mt-20 text-center fs-16 fw-700">您还没有附件简历,请点击下方按钮上传</div>
      <div class="mt-10 text-center fs-14 color-gray">最多可上传3份简历</div>
      <van-button class="upload-btn" type="primary" @click="to('/uploadResumeChoice')">上传附件简历</van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { parseAssetFile } from "@/assets/util";
const router = useRouter();
const onClickLeft = () => history.back();
const to = function (path: any) {
  router.push(path);
};
</script>
<style lang="scss" scoped>
.append-page{
    height: 100vh;
    display: grid;
    grid-template-rows: 4.6rem auto;
}
.flex-noshrink {
  flex-shrink: 0;
  height: 100%;
}
.content {
  background-color: #f2f3f6;
//   height: calc(100vh - 4.7rem);
  box-sizing: border-box;
  padding: 2rem;
  position: relative;
  .ellipse-border {
    display: inline-block;
    // height: 1rem;
    box-sizing: border-box;
    border: 0.1rem solid #3b80fb;
    color: #3b80fb;
    border-radius: 1.2rem;
    padding: 0 0.8rem;
    font-size: 1.2rem;
  }
  .circle-border {
    width: 4rem;
    height: 4rem;
    box-sizing: border-box;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
      display: block;
    }
  }
  .blue-border {
    border: 0.1rem solid #347cfe;
  }
  .green-border {
    border: 0.1rem solid #4cba42;
  }
  .img {
    width: 15rem;
    height: 13rem;
    display: block;
    margin: 0 auto;
  }
  .fw-700 {
    font-weight: 700;
  }
  .color-gray {
    color: gray;
  }
  .text-center {
    text-align: center;
  }
  .upload-btn {
    position: absolute;
    bottom: 2rem;
    width: calc(100% - 4rem);
  }
  .fs-14 {
    font-size: 1.4rem;
  }
  .fs-20 {
    font-size: 2rem;
  }
  .mt-20 {
    margin-top: 2rem;
  }
  .mt-30 {
    margin-top: 3rem;
  }
  .mt-80 {
    margin-top: 8rem;
  }
  .fs-18 {
    font-size: 1.8rem;
  }
  .mr-10 {
    margin-right: 1rem;
  }
}
</style>