<template>
    <van-popup v-model:show="showCount" closeable round :style="{ height: '25%', width: '80%' }">
      <div class="show-count_box">
        <div class="show-wrap">
          <div>
            <h1>登录毕业申</h1>
          </div>
          <div>
            <van-button type="primary" class="ft">微信账号快捷登录</van-button>
          </div>
          <div class="c-747474" @click="to('/login')">手机号码验证登录</div>
        </div>
      </div>
    </van-popup>
  <div class="news-page">
    <van-nav-bar class="back-gray" title="消息" />
    <!-- <div class="news-box">
      <img :src="parseAssetFile('icon-nomessage.png')" />
      <div class="text-title mt-20">暂无企业的邀请</div>
      <div class="text-tip mt-10">您的在线简历完善度只有45分，低于平均分82.8。在线简历完善后，就能吸引更多企业</div>
      <div class="btn-box mt-20">
        <van-button type="primary" block @click="to('/createResume')">完善简历</van-button>
      </div>
    </div> -->
    <div class="news-box">
      <img class="img2" :src="parseAssetFile('icon-news2.png')" />
      <div class="text-tip mt-20">登录后可查看</div>
      <div class="text-title mt-20">企业向我发出的邀请</div>
      <div class="text-title">学校就业老师向我推荐的招聘信息</div>
      <!-- <div class="text-tip mt-10">您的在线简历完善度只有45分，低于平均分82.8。在线简历完善后，就能吸引更多企业</div>
      -->
      <div class="btn-box mt-30">
        <van-button type="primary" block @click="to('/login')">登录</van-button>
      </div> 
    </div>
    <!-- <div class="news-box2">
      <van-cell-group>
        <van-cell class="align-center">
          <template #title>
            <div class="new-item">
              <div class="new-date">11-21 11:46</div>
              <div class="new-title">中科百谷</div>
              <div class="new-desc mt-10">Java开发工程师 | 8-15K</div>
            </div>
          </template>
          <template #value>
            <van-button type="primary" size="small">投递</van-button>
          </template>
        </van-cell>
        <van-cell class="align-center">
          <template #title>
            <div class="new-item">
              <div class="new-date">11-21 11:46</div>
              <div class="new-title">中科百谷</div>
              <div class="new-desc mt-10">Java开发工程师 | 8-15K</div>
            </div>
          </template>
          <template #value>
            <van-button type="primary" size="small">投递</van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import { parseAssetFile } from "@/assets/util";
const router = useRouter();
const to = function (path: any) {
  router.push(path);
};
let showCount=ref(true)
</script>
  
<style lang="scss" scoped>
.back-gray {  background-color: #f8f8f8;
}
.news-page {
  display: grid;
  grid-template-rows: 4.6rem auto;
  height: 100%;
  .news-box2 {
    overflow: scroll;
  }
  .news-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 13rem;
      height: 11rem;
    }
    .img2{
      width: 18rem;
      height: 18rem;
    }
    .text-title {
      font-size: 1.6rem;
    }
    .text-tip {
      font-size: 1.4rem;
      color: #5f5f5f;
      text-align: center;
      padding: 0 2rem;
    }
    .btn-box {
      box-sizing: border-box;
      width: 100%;
      padding: 0 10rem;
    }
  }
  .new-item {
    // padding: 1rem;
    .new-date {
      font-size: 1.2rem;
    }
    .new-title {
      font-weight: 700;
    }
    .new-desc {
      font-size: 1rem;
      color: #5f5f5f;
    }
  }
}

.show-count_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .show-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    h1 {
      font-weight: 500;
    }

    .ft {
      font-size: 1.8rem;
    }
  }
}
.h-50 {
  width: 100%;
  height: 5rem;
}
</style>
  