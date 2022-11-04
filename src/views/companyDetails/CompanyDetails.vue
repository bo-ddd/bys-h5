<template>
  <div class="com-page">
    <van-nav-bar class title="公司主页" left-text left-arrow @click-left="onClickLeft1" />
    <div class="content">
      <div class="body-box">
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>8</p>
        <p>9</p>
        <div class="h-70">

        </div>
      </div>
      <div class="foot-box">
        <div class="foot-left">
          <img :src="parseAssetFile('icon-share.png')" alt />
          <div>分享</div>
        </div>
        <div class="foot-right">
          <van-button type="primary" block>收藏</van-button>
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
.com-page {
  height: 100vh;
  display: grid;
  position: relative;
  grid-template-rows: 4.6rem auto;
}
.content {
  height: 100%;
  overflow-y: scroll;
  .body-box {
    background-color: #edf0f9;
  }
  .foot-box {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    background-color: #fff;
    bottom: 0;
    padding: 1rem 1rem;
    display: grid;
    gap: 0 3rem;
    grid-template-columns: auto 60%;
    :deep(.van-button--block) {
      box-sizing: content-box;
      padding: 0.2rem 0;
    }
    .foot-left {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #707070;
      img {
        width: 2.5rem;
        height: 2.5rem;
        display: block;
      }
    }
  }
}
.h-70{
    height: 7rem;
}
</style>