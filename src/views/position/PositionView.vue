<template>
  <div class="position">
    <header class=" wrap just-between" v-if="!isShow">
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

      <Card.Wrap class="card-bg" v-if="cardList.length">
        <Card.Item :resume="resInfo" :onlineResumeInfo="onlineResume" :class="index ? 'mt-5' : ''" v-for="item, index in cardList" :key="item.companyId"
          :options="item" @click="jump('/positionDetail', item.positionId)"></Card.Item>
      </Card.Wrap>

      <div v-show="!cardList.length">
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
import { useRouter } from 'vue-router';
import { useJobStore } from "@/stores/job";//接口
import type { JobInfo } from './types/jobInfo';
import type { CardItem } from './types/card';
import { Toast } from 'vant';
import { usePositionDetailStore } from "@/stores/positonDetail";
const positionDetailStore = usePositionDetailStore();
const router = useRouter();
const useJob = useJobStore();

const showCount = ref(false);
// 登录失效
const wxLogin = () => {
  Toast({
    message: '微信登录暂不支持,请用手机号码验证码登录。',
    position: 'top',
  });
}


const jump = (src: string, params?: number) => {
  if (src == '/jobIntention' && intention.value) {
    showCount.value = true;
  } else {
    if (params) {
      router.push({ path: src, query: { positionId: params } })
    } else {
      router.push({ path: src })
    };
  }

}

let isShow = ref(false)
let area: any = ref();//地区
let wishPositionRight = ref('');//职业右
let salary = ref('');//薪资

if (localStorage.getItem('jobIndustry')) {
  isShow.value = true;
}

// 获取求职意向
let intention = ref(false);
const getJobIntent = async () => {
  let res: any = await useJob.getJobIntentList({});
  if (res.code == 200) {
    if (res.data != "[]") {
      if (res.data.wishAddr.length) {
        isShow.value = true;
      }
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
      getSelectPosition({
        wishAddr: wishAddr,
        wishIndustryLeft: res.data.wishIndustryLeft,
        wishMoneyLeft: res.data.wishMoney.replace(/,\d+/, ''),
        wishMoneyRight: res.data.wishMoney.replace(/\d+,/, ''),
        wishPositionLeft: res.data.wishPositionTypeLeft,
      });
    } else {
      isShow.value = false
      getSelectPosition({});
    }
  } else {
    isShow.value = false;
    intention.value = true;
    getSelectPosition({});

  }
}
getJobIntent();
// 获取推荐职位列表
let cardList = ref([]) as Ref<CardItem[]>;
const getSelectPosition = async (params: any) => {
  let res: any = await useJob.getSelectPositionList(params);
  if (res.code == 200) {
    cardList.value = cardList.value.concat(res.data);
  }
}

// 获取在线简历的接口
let resInfo: any = ref();
async function getOnlineResume() {
  let res: any = await positionDetailStore.getOnlineResume({});
  resInfo.value = res
}
getOnlineResume();

//获取在线信息完成度
let onlineResume: any = ref();
const selectCompletion = async () => {
  let res: any = await positionDetailStore.selectCompletion({});
  onlineResume.value = res

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

    .btn {
      padding: 0 5rem !important;
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
</style>
