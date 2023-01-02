<template>
  <div class="position">
    <header class=" wrap just-between" v-if="!isShow && intention">
      <div class="container flex">
        <div class="icon">
          <img class="icon-invitation" src="@/assets/images/icon-invitation.png" alt="">
        </div>
        <div class="title">
          <p class="fs-16">填写求职意向</p>
          <span class="fs-14 c-747474">精准推荐更多高薪职位</span>
        </div>
      </div>
      <div class="btn">
        <van-button class="btn-plain" size="mini" color="#3b80fb" plain @click="jump('/jobIntention')">去填写</van-button>
      </div>
    </header>
    <header class=" wrap just-between" v-if="isShow">
      <p class="fs-16 fw-700 job">{{ wishPositionRight.replace(/、$/, '') }}</p>
      <p class="fs-14 c-747474 area"><span v-for="item, index in area" :key="index">{{ item }}</span></p>
      <p class="fs-14 c-5d5d5d money"><span>{{ salary }}</span> <img class="icon-fillin" @click="jump('/jobIntention')"
          src="@/assets/images/icon-fillin.png"></p>
    </header>
    <main class="container">

      <Card.Wrap class="card-bg">
        <Card.Item :class="index ? 'mt-5' : ''" v-for="item, index in cardList" :key="item.companyId" :options="item"
          @click="jump('/positionDetail', item.positionId)">
          <!-- 按钮 -->
          <template #button>
            <p class=" mt-14 c-fb5530 fs-14 fw-600 money">{{ !item.positionMoney ? '' :
    item.positionMoney.replace(/,/g, '-').replace(/0/g, '') + 'k'
}}</p>
            <p v-if="item.isDelivery" class="mt-30 fs-12 c-a8a8a8">已申请</p>
            <van-button v-if="!item.isDelivery" class="mt-20 btn fw-600 btn-apply" size="mini" type="primary"
              @click.stop="apply(item.positionId)">申请</van-button>
            <van-action-sheet @click.prevent.stop="" v-model:show="isResumeShow" title="确认投递简历">
              <div class="content" v-show="!(resumeInfo.length == 0)">
                <div class="pop">
                  <div class="container-resume">
                    <van-radio-group v-model="checked">
                      <div class="resume-item mt-5 pd-20_0" v-for="item in resumeInfo" :key="item.resumeId">
                        <van-radio :name="item.resumeId" icon-size="2rem">
                          <img class="icon-30 ml-15" src="@/assets/images/icon-resume.png">
                          <div class="resume ml-10">
                            <div class="top just-between mt-5">
                              <div class="fs-14">
                                {{ /在线简历/.test(item.resumeName) ? '在线简历' : item.resumeName }}</div>
                              <div class="fs-12 ml-40" v-if="item.isOnline">
                                <span class="c-5d5d5d">完成度:</span>
                                <span class="c-2979ff">{{ onlineResume ? onlineResume * 100
    : ''
}}%</span>
                              </div>
                            </div>
                            <div class="btm fs-12 c-5d5d5d">
                              {{ item.modifyTime }}{{ item.isOnline ? '更新' : '上传' }}
                            </div>
                          </div>
                        </van-radio>
                      </div>
                    </van-radio-group>
                  </div>
                  <div class="btn-wrap">
                    <div class="btn c-ffffff just-center fs-14" @click="delivery(item.positionId)">
                      确认投递</div>
                  </div>
                </div>
              </div>
              <div class="content" v-show="resumeInfo.length == 0">
                <div class="just-center flex sheet-content">
                  <p class="fs-14 c-747474">还未填写简历，点击<a href="" @click="jump('/createResume')" class="c-2979ff">去填写</a>
                  </p>
                </div>
              </div>
            </van-action-sheet>
            <van-popup v-model:show="showCount" closeable round :style="{ height: '25%', width: '80%' }">
              <div class="show-count_box">
                <div class="show-wrap">
                  <div>
                    <h1>登录毕业申</h1>
                  </div>
                  <div>
                    <van-button type="primary" class="ft" @click="jump('/login')">手机号码验证登录</van-button>
                  </div>
                  <div class="c-747474" @click="wxLogin()">微信账号快捷登录</div>
                </div>
              </div>
            </van-popup>


          </template>
        </Card.Item>
      </Card.Wrap>
      <div class="just-center fs-14 c-747474" v-if="!isCardList">
        <p class="none">没有更多职位了</p>
      </div>
      <div v-if="isCardList">
        <div class="just-center mt-150">
          <img class="icon-position" src="@/assets/images/icon-positionjob.png" alt="">
        </div>
        <p class="just-center fs-16 c-747474 mt-20">暂无适合您的职位</p>
        <div class="just-center">
          <van-button class="btn mt-30" type="primary" size="normal" @click="jump('/jobIntention')">调整求职意向</van-button>
        </div>
      </div>
    </main>
    <van-popup v-model:show="showCount" closeable round :style="{ height: '25%', width: '80%' }">
      <div class="show-count_box">
        <div class="show-wrap">
          <div>
            <h1>登录毕业申</h1>
          </div>
          <div>
            <van-button type="primary" class="ft" @click="jump('login')">手机号码验证登录</van-button>
          </div>
          <div class="c-747474" @click="wxLogin()">微信账号快捷登录</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, provide } from 'vue';
import type { Ref } from 'vue'
import Card from '@/components/card';
import { useRouter,useRoute } from 'vue-router';
import { useJobStore } from "@/stores/job";//接口
import type { JobInfo } from './types/jobInfo';
import type { CardItem } from './types/card';
import { Toast } from 'vant';
import { usePositionDetailStore } from "@/stores/positonDetail";
const positionDetailStore = usePositionDetailStore();
const router = useRouter();
const route = useRoute();
const useJob = useJobStore();
const showCount = ref(false);
let positionId = ref();

const jump = (src: string, params?: number) => {
  if (src == '/jobIntention' && !sessionStorage.getItem('token')) {
    showCount.value = true;
  } else {
    if (src=='/jobIntention') {
      router.push({ path: src, query: { route: '/position' } })
    }else if(params){
      router.push({ path: src, query: { positionId: params } })
    }
     else {
      router.push({ path: src })
    };
  }

}
// 登录失效
const wxLogin = () => {
  Toast({
    message: '微信登录暂不支持,请用手机号码验证码登录。',
    position: 'top',
  });
}
//申请职位 
const token = sessionStorage.getItem("token");
let show = ref(false);
let isResumeShow = ref(false);
const apply = function (id: number) {
  positionId.value = id;
  if (!token) {
    showCount.value = true
  } else {
    isResumeShow.value = true;
    if (resumeInfo.value.length == 0) {
      show.value = true;
    }
  }
}
// 申请职位接口
const deliveryJob = async (params: any) => {
  let res: any = await useJob.deliveryPosition(params);
  if (res.code == 200) {
    isResumeShow.value = false;
  }
}
// 确认投递
const delivery = function (id: number) {
  deliveryJob({
    resumeId: checked.value as number,
    positionId: positionId.value
  });
  isResumeShow.value = false;
  Toast('投递成功')
  getSelectPosition(getJobIndustry.value);
}

let isShow = ref(false)
let area: any = ref();//地区
let wishPositionRight = ref('');//职业右
let salary = ref('');//薪资

if (localStorage.getItem('jobIndustry')) {
  isShow.value = true;
}

// 获取求职意向
let getJobIndustry: any = ref();
let intention = ref(false);
const getJobIntent = async () => {
  let res: any = await useJob.getJobIntentList({});
  if (res.code == 200) {
    if (res.data.length!=0) {
        isShow.value = true;
      // 地区
      area.value = (res.data.wishAddr);
      // 职位
      res.data.wishPosition.forEach((item: any) => {
        wishPositionRight.value += item.positionNameDown + '、';
      });
      // 薪资
      salary.value = res.data.wishMoney.replace(/000/g, 'k').replace(/,/, '-').replace(/k/, '');
      // 职位
      let jobId = 0;
      let modifyjobInfo = { activeId: [], columnsJob: [], job: [] } as JobInfo;
      res.data.wishPosition.forEach((item: JobInfo) => {
        if (item != null) {
          jobId = Number(item.positionIdDown) * Number(item.positionIdOn);
          modifyjobInfo.activeId!.push(jobId);
          modifyjobInfo.activeId = [...new Set(modifyjobInfo.activeId)];
          modifyjobInfo.columnsJob.push({ text: item.positionNameDown, id: jobId });
          modifyjobInfo.job.push({ parent: item.positionNameOn, children: item.positionNameDown });
        }
      })
      localStorage.setItem('jobInfo', JSON.stringify(modifyjobInfo));
      let industryId = 0;
      let modifyindustry = { activeId: [], columnsIndustry: [], industry: [] } as JobInfo;
      res.data.wishIndustry.forEach((item: JobInfo) => {
        if (item != null) {
          industryId = Number(item.industryIdDown) * Number(item.industryIdOn)
          modifyindustry.activeId.push(industryId);
          modifyindustry.activeId = [...new Set(modifyindustry.activeId)];
          modifyindustry.columnsIndustry.push({ text: item.industryNameDown, id: industryId });
          modifyindustry.industry.push({ parent: item.industryNameOn, children: item.industryNameDown });
        }
      });
      localStorage.setItem('industryInfo', JSON.stringify(modifyindustry));

      localStorage.setItem('modifyIndustryInfo', JSON.stringify({
        wishIndustryLeft: res.data.wishIndustryLeft,
        wishIndustryRight: res.data.wishIndustryRight,
      }))
      localStorage.setItem('modifyJobInfo', JSON.stringify({
        wishPositionLeft: res.data.wishPositionTypeLeft,
        wishPositionRight: res.data.wishPositionTypeRight,
      }));
      // 处理获取推荐职位的入参
      let wishAddr = '';
      area.value.forEach((item: any) => {
        wishAddr += item.replace(/\S+-/, '') + ',';
      });
      getJobIndustry.value = {
        wishAddr: wishAddr,
        wishIndustryLeft: res.data.wishIndustryLeft,
        wishMoneyLeft: res.data.wishMoney.replace(/,\d+/, ''),
        wishMoneyRight: res.data.wishMoney.replace(/\d+,/, ''),
        wishPositionLeft: res.data.wishPositionTypeLeft,
      }
      getSelectPosition({
        wishAddr: wishAddr,
        wishIndustryLeft: res.data.wishIndustryLeft,
        wishMoneyLeft: res.data.wishMoney.replace(/,\d+/, ''),
        wishMoneyRight: res.data.wishMoney.replace(/\d+,/, ''),
        wishPositionLeft: res.data.wishPositionTypeLeft,
      });
    } else {
      intention.value = true;
      isShow.value = false;
      // isShow.value = true;
      getSelectPosition({});
    }
  } else {
    isShow.value = false;
    showCount.value = false;
    intention.value = true;
    getSelectPosition({});

  }
}
getJobIntent();
// 获取推荐职位列表
let cardList = ref();
let isCardList = ref(false);
const getSelectPosition = async (params: any) => {
  let res: any = await useJob.getSelectPositionList(params);
  if (res.code == 200) {
    cardList.value = res.data;
    if (res.data.length) {
      isCardList.value = false;
    } else {
      isCardList.value = true;
    }
  }
}

// 获取在线简历的接口
interface Resume {
  createTime: string,
  modifyTime: string,
  resumeId: number,
  resumeName: string,
  resumeUrl: string,
  isOnline: boolean,
  completion?: number,
}

let checked: Ref<number | null> = ref(null);//这个是选中简历id
let resumeList: Ref<Resume[]> = ref([]);

let resumeInfo: any = ref();
async function getOnlineResume() {
  let res: any = await positionDetailStore.getOnlineResume({});
  if (res.code == 200) {
    resumeInfo.value = res.data;
    let check = resumeInfo.value.find((item: any) => {
      return item.isOnline == true;
    })
    if (check) {
      checked.value = check.resumeId;
    } else {
      if (resumeInfo.value.length) {
        checked.value = resumeInfo.value[0].resumeId;
      }
    }
    resumeInfo.value.sort((a: any, b: any) => {
      return b.isOnline - a.isOnline;
    });
  }
}
getOnlineResume();

//获取在线信息完成度
let onlineResume: any = ref();
const selectCompletion = async () => {
  let res: any = await positionDetailStore.selectCompletion({});
  if (res.code == 200) {
    let check = resumeList.value.find((item) => {
      return item.isOnline == true;
    })
    if (check) {
      check.completion = res.data.completion;
    }
    onlineResume.value = res.data.completion
  }

}
selectCompletion();

</script>

<style lang="scss" scoped>
.position {
  height: 100%;

  header {
    height: 5.2rem;
    border-bottom: .1rem solid #e7e7e7;

    .job,
    .area {
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; // 默认不换行；

    }

    .job {
      font-weight: 700;
      width: 15rem;
    }

    .area {
      width: 5rem;
    }


    .container {
      padding: 1.6rem 0;
      justify-content: left;
      gap: 1rem;

      .icon {
        border-radius: 2rem;
        background-color: #f5f9ff;
        padding: .8rem;

        .icon-invitation {
          width: 2.2rem;
        }
      }

    }

    .btn {
      .btn-plain {
        background-color: #eef4ff;
        border-radius: 2rem;
        padding: .4rem .8rem;
      }
    }

    .icon-fillin {
      width: 1.4rem;
    }
  }

  main {
    height: calc(100% - 7.2rem);
    overflow: auto;

    .none {
      padding: 2rem 0 6rem;
    }

    .text {
      padding: 2rem 0 4rem;
      margin: 0;
    }

    .card-bg {
      background-color: #f5f5f5;

    }

    .icon-position {
      width: 13rem;
      height: 13rem;
    }

    // .btn {
    //   padding: 0 5rem !important;
    // }
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
  height: 44vh;
}

.pop {
  height: 44rem;
  padding: 0 2rem;

  &>.container-resume {
    height: calc(42rem - 7rem);
    overflow-y: scroll;

    .resume-item {
      display: flex;
      align-items: center;
      border-bottom: .2px solid #d8dbe3;

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

  &>.btn-wrap {
    &>.btn {
      padding: 1.5rem 0;
      background: #1989fa;
    }
  }

}

.pd-20_0 {
  padding: 2rem 0;
}

.icon-30 {
  width: 3rem;
  height: 3rem;
}

.btn-confirm {
  width: 100%;
}

.to-resume {
  min-height: 55vh;
}

.btn-apply {
  margin-top: 3rem;
  border-radius: .5rem;
  padding: 1.4rem 1rem;
  background-color: #3b7dff;

}


:deep(.van-overlay) {
  background-color: #0000000e !important;
}
</style>
