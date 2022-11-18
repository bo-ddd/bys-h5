<template>
  <div class="upload-page">
    <van-nav-bar title="电脑端操作指引" left-arrow @click-left="onClickLeft1" />
    <div class="box">
      <div class="content">
        <div class="img-box mt-30">
          <img :src="parseAssetFile('icon-course3.png')" />
        </div>
        <div class="mt-20">
          <van-steps direction="vertical" :active="-1">
            <van-step>
              <div class="fs-18">使用电脑浏览器打开</div>
              <div class="ff-s mt-10 mb-10 fs-20 fw-700">biyeshen.cn/s</div>
            </van-step>
            <van-step>
              <div class="fs-18">扫描二维码登录</div>
            </van-step>
          </van-steps>
        </div>
        <div class="btn-box mt-50">
          <van-button type="primary" block>开始扫码</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { parseAssetFile } from "@/assets/util";
let onClickLeft1 = () => history.back();
</script>
<style lang="scss" scoped>
.upload-page{
    height: 100vh;
    display: grid;
    grid-template-rows: 4.6rem auto;
}
.box {
  box-sizing: border-box;
  background-color: #f3f7ff;
  padding: 1.5rem;
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    background-color: white;
    height: 100%;
    border-radius: 0.6rem;
    .img-box {
      img {
        width: 25rem;
        height: 18rem;
      }
    }
    .btn-box {
      box-sizing: border-box;
      width: 100%;
      padding: 0 2rem;
    }
  }
}
:deep(.van-step) {
  color: black;
}
:deep(.van-step--vertical) {
  padding-right: 0;
}
:deep(.van-step__circle) {
  width: 0.7rem;
  height: 0.7rem;
  background-color: #3683ff;
}
:deep(.van-step--vertical .van-step__line) {
  background-color: #567dbe;
  top: 1.7rem;
  left: -1.55rem;
}
.fw-700 {
  font-weight: 700;
}
.fs-18 {
  font-size: 1.8rem;
}
.fs-20 {
  font-size: 2rem;
}
.fs-16 {
  font-size: 1.6rem;
}
.mb-10 {
  margin-bottom: 1rem;
}
.ff-s {
  font-family: Georgia;
}
.w-100 {
  width: 100%;
}
.mt-50 {
  margin-top: 5rem;
}
.mt-30 {
  margin-top: 3rem;
}
</style>