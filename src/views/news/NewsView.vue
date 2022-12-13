<template>
  <van-popup v-model:show="showPopup" closeable round :style="{ height: '25%', width: '80%' }">
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
    <div v-if="!loginStatus" class="news-box">
      <img class="img2" :src="parseAssetFile('icon-news2.png')" />
      <div class="text-tip mt-20">登录后可查看</div>
      <div class="text-title mt-20">企业向我发出的邀请</div>
      <div class="text-title">学校就业老师向我推荐的招聘信息</div>
      <div class="btn-box mt-30">
        <van-button type="primary" @click="to('/login')">登录</van-button>
      </div>
    </div>
    <div v-if="loginStatus&&newsList.length==0" class="news-box">
      <img :src="parseAssetFile('icon-nomessage.png')" />
      <div class="text-title mt-20">暂无企业的邀请</div>
      <div class="text-tip mt-10">您的在线简历完善度只有45分，低于平均分82.8。在线简历完善后，就能吸引更多企业</div>
      <div class="btn-box mt-20">
        <van-button type="primary" @click="to('/createResume')">完善简历</van-button>
      </div>
    </div>
    <div v-if="loginStatus&&newsList.length!=0" class="news-box2">
      <van-cell-group>
        <van-cell class="just-between" v-for="item in newsList" :key="item.companyId">
          <template #title>
            <div class="new-item">
              <div class="new-date">{{item.createTime.split(' ')[0]+' '+item.createTime.split(' ')[1].slice(0,5)}}</div>
              <div class="flex mt-10">
                <img class="com-img" :src="item.companyLogoUrl" alt />
                <div>
                  <div class="new-title">{{item.companyName}}</div>
                  <div
                    class="new-desc"
                  >{{item.positionName}} | {{item.positionMoney.split(',')[0].slice(0,-3)+'-'+item.positionMoney.split(',')[1].slice(0,-3)}}K</div>
                </div>
              </div>
            </div>
          </template>
          <template #value>
            <van-button type="primary" size="small">投递</van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { parseAssetFile } from "@/assets/util";
import { useResumeStore } from "@/stores/resume";
const use = useResumeStore();
const router = useRouter();
const loginStatus = ref(false);
loginStatus.value = sessionStorage.getItem("token") ? true : false;
const showPopup = ref(!loginStatus.value);
const to = function (path: any) {
  router.push(path);
};
let newsList = ref([]);
const getNewsList = async () => {
  let res = await use.selectInvitation({
    userId: 10000,
  });
  console.log(res);
  if (res.code == 200) {
    newsList.value = res.data;
    console.log(newsList.value);
  }
};
onMounted(() => {
  getNewsList();
});
</script>
<style lang="scss" scoped>
.back-gray {
  background-color: #f8f8f8;
}
.news-page {
  display: grid;
  grid-template-rows: 4.6rem auto;
  height: 100%;
  // .van-button {
  //   height: auto;
  //   padding: 1rem 2rem;
  // }
  .news-box2 {
    overflow: scroll;
    :deep(.van-cell__title) {
      flex: none;
    }
    :deep(.van-cell__value) {
      flex: none;
    }
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
    .img2 {
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
      // padding: 0 8rem;
      display: flex;
      justify-content: center;
      .van-button {
        padding: 1rem 10rem;
        border-radius: 0.5rem;
      }
    }
  }
  .new-item {
    // padding: 1rem;
    .flex {
      gap: 1rem;
    }
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
    .com-img {
      // img{
      width: 4.5rem;
      height: 4.5rem;
      display: block;
      // }
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
  