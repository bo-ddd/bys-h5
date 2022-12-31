<template>
  <van-popup v-model:show="showPopup" closeable round :style="{ height: '25%', width: '80%' }">
    <div class="show-count_box">
      <div class="show-wrap">
        <div>
          <h1>登录毕业申</h1>
        </div>
        <div>
          <van-button type="primary" class="ft" @click="to('/login')">手机号码验证登录</van-button>
        </div>
        <div class="c-747474" @click="wxLogin()">微信账号快捷登录</div>
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
        <van-button class="btn1" type="primary" @click="to('/login')">登录</van-button>
      </div>
    </div>
    <div v-if="loginStatus&&newsList.length==0" class="news-box">
      <img :src="parseAssetFile('icon-nomessage.png')" />
      <div class="text-title mt-20">暂无企业的邀请</div>
      <div class="text-tip mt-10">
        <span v-if="perfectionNum==0">请先填写个人基本信息，企业才能向您抛出橄榄枝</span>
        <span
          v-else-if="perfectionNum<averageScore"
        >您的在线简历完善度只有{{perfectionNum*100}}分，低于平均分{{averageScore*100}}。在线简历完善后，就能吸引更多企业</span>
        <span v-else>建议您主动出击，寻找合适机会</span>
      </div>
      <div class="btn-box mt-20">
        <van-button class="btn2" type="primary" @click="to('/personalInfo')">
          <span v-if="perfectionNum==0">去填写</span>
          <span v-else>完善简历</span>
        </van-button>
      </div>
    </div>
    <div v-if="loginStatus&&newsList.length!=0" class="news-box2">
      <van-cell-group>
        <van-cell class="just-between" v-for="item in newsList" :key="item.companyId">
          <template #title>
            <div class="new-item">
              <div
                class="new-date"
              >{{item.createTime.split(' ')[0]+' '+item.createTime.split(' ')[1].slice(0,5)}}</div>
              <div class="flex mt-10">
                <img class="com-img" :src="item.companyLogoUrl" />
                <div>
                  <div class="new-title">{{item.companyName}}</div>
                  <div class="new-desc">{{item.positionName}} | {{item.positionMoney}}K</div>
                </div>
              </div>
            </div>
          </template>
          <template #value>
            <van-button type="primary" size="small" @click="showResume=true">投递</van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-action-sheet @click.prevent.stop v-model:show="showResume" title="确认投递简历">
      <div class="sheet-content" v-show="!(resumeList.length == 0)">
        <div class="pop">
          <div class="container-resume">
            <van-radio-group v-model="checkedResume">
              <div class="resume-item mt-5 pd-20_0" v-for="item in resumeList" :key="item.resumeId">
                <van-radio :name="item.resumeId" icon-size="2rem">
                  <img class="icon-30 ml-15" src="@/assets/images/icon-resume.png" />
                  <div class="resume ml-10">
                    <div class="top just-between mt-5">
                      <div
                        class="fs-14"
                      >{{ /在线简历/.test(item.resumeName) ? '在线简历' : item.resumeName }}</div>
                      <div class="fs-12 ml-40" v-if="item.isOnline">
                        <span class="c-5d5d5d">完成度:</span>
                        <!-- <span class="c-2979ff">{{ onlineResume ? onlineResume * 100 :''}}%</span> -->
                      </div>
                    </div>
                    <div class="btm fs-12 c-5d5d5d">{{ item.modifyTime }}{{item.isOnline?'更新':'上传'}}</div>
                  </div>
                </van-radio>
              </div>
            </van-radio-group>
          </div>
          <div class="btn-wrap">
            <!-- <div class="btn c-ffffff just-center fs-14" @click="delivery(options.positionId)">确认投递</div> -->
          </div>
        </div>
      </div>
      <div class="sheet-content" v-show="resumeList.length == 0">
        <div class="just-center flex">
          <p class="fs-14 c-747474">
            还未填写简历，点击
            <a @click="to('/createResume')" class="c-2979ff">去填写</a>
          </p>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { parseAssetFile } from "@/assets/util";
import { useResumeStore } from "@/stores/resume";
import { Toast } from "vant";
const use = useResumeStore();
const router = useRouter();
const loginStatus = ref(false);
const resumeList: any = ref({});
const showResume = ref(false);
const checkedResume = ref(null);
loginStatus.value = sessionStorage.getItem("token") ? true : false;
const showPopup = ref(!loginStatus.value);
const to = function (path: any) {
  router.push(path);
};
let newsList: any = ref([]);
let perfectionNum = ref(0);
let averageScore = ref(0);
let getResumeList = async function () {
  let res = await use.selectResume({});
  if (res.code == 200 && res.data.length > 0) {
    resumeList.value = res.data.sort((a: any, b: any) => {
      return b.isOnline - a.isOnline;
    });
    checkedResume.value = resumeList.value[0].resumeId;
  }
};
const getNewsList = async () => {
  let res = await use.selectInvitation({});
  if (res.code == 200) {
    newsList.value = res.data;
  }
};
const getPerfectionNum = async () => {
  let res = await use.selectCompletion({});
  if (res.code == 200) {
    perfectionNum.value = res.data.completion;
    averageScore.value = res.data.averageScore;
  }
};
onMounted(() => {
  getNewsList();
  getPerfectionNum();
  getResumeList();
});

/***
 * 微信登录的提示信息
 */
const wxLogin = () => {
  Toast({
    message: "微信登录暂不支持,请用手机号码验证码登录。",
    position: "top",
  });
};
</script>
<style lang="scss" scoped>
.back-gray {
  background-color: #f8f8f8;
}
.news-page {
  display: grid;
  grid-template-rows: 4.6rem auto;
  height: 100%;
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
      display: flex;
      justify-content: center;
      .van-button {
        border-radius: 0.5rem;
      }
      .btn1 {
        padding: 1rem 9rem;
      }
      .btn2 {
        padding: 1rem 5rem;
      }
    }
  }
  .new-item {
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
      width: 4.5rem;
      height: 4.5rem;
      display: block;
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

.sheet-content {
  padding: 2rem;

  .flex {
    height: 61vh;
    gap: 1rem;

    .title {
      line-height: 2.5rem;
    }
  }

  .btn-confirm {
    width: 100%;
  }

  .to-resume {
    min-height: 55vh;
  }
}

.pop {
  height: 44rem;
  padding: 0 2rem;

  & > .container-resume {
    height: calc(42rem - 7rem);
    overflow-y: scroll;

    .resume-item {
      display: flex;
      align-items: center;
      border-bottom: 0.2px solid #d8dbe3;

      :deep(.van-radio__label) {
        display: flex;
        align-items: center;
      }

      .resume {
        flex: 1;
        height: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
          width: 20rem;
          display: flex;
        }
      }
    }
  }
}
.btn {
  margin-top: 3rem;
  border-radius: 0.5rem;
  padding: 1.4rem 1rem;
  background-color: #3b7dff;
}
.h-50 {
  width: 100%;
  height: 5rem;
}
.icon-30 {
  width: 3rem;
  height: 3rem;
}

.pd-20_0 {
  padding: 2rem 0;
}
</style>
  