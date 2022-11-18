<template>
  <div class="box">
    <van-nav-bar title="创建简历" left-arrow @click-left="onClickLeft" />
    <div class="body">
      <div class="item back-green">
        <div class="align-center">
          <img class="mr-10" src="@/assets/images/icon-upload.png" />
          <div class>
            <div class="font-gray">已有简历</div>
            <div>直接上传</div>
          </div>
        </div>
        <div>
          <van-button
            plain
            type="primary"
            color="#2471fa"
            block
            @click="to('/uploadResumeChoice')"
          >上传</van-button>
        </div>
      </div>
      <div class="item back-yellow">
        <div class="align-center">
          <img class="mr-10" src="@/assets/images/icon-write.png" />
          <div class>
            <div class="font-gray">已有简历</div>
            <div>直接上传</div>
          </div>
        </div>
        <div>
          <van-button
            plain
            type="primary"
            color="#f9350b"
            block
            @click="to('/resumeDetails')"
          >创建</van-button>
        </div>
      </div>
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
.box {
  height: 100vh;
  display: grid;
  grid-template-rows: 4.6rem auto;
  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem;
    gap: 3.5rem 0;
    .item {
      font-size: 1.4rem;
      display: flex;
      justify-content: space-between;
      padding: 2rem 1.4rem;
      align-items: center;
      img {
        width: 6.5rem;
        height: 4.5rem;
      }
      :deep(.van-button) {
        height: 100%;
        padding: 0.2rem 0.6rem;
        background-color: transparent;
      }
    }
    .back-green {
      background-color: #f7fdff;
    }
    .back-yellow {
      background-color: #fffaf3;
    }
  }
}
.mr-10 {
  margin-right: 1rem;
}
.font-gray {
  font-size: 1.2rem;
  color: #606061;
}
</style>