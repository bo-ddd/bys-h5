<template>
  <div class="position">
    <header class=" wrap just-between" v-show="!isShow">
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
    <header class=" wrap just-between" v-show="isShow">
      <p class="fs-16 fw-700 job">{{ wishPositionRight.replace(/、$/, '') }}</p>
      <p class="fs-14 c-747474 area"><span v-for="item, index in area" :key="index">{{ item }}</span></p>
      <p class="fs-14 c-5d5d5d money"><span>{{ salary }}</span> <img class="icon-fillin" @click="jump('/jobIntention')"
          src="@/assets/images/icon-fillin.png"></p>
    </header>
    <main class="container">
      <Card.Wrap>
        <Card.Item v-for="item in cardList" :key="item.companyId" :options="item" @click="jump('/positionDetail',item.positionId)"></Card.Item>
      </Card.Wrap>
      <div class=" text">
        <p class="c-5d5d5d fs-14  just-center">没有更多数据了</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue'
import Card from '@/components/card';
import { useRouter } from 'vue-router';
import { useJobStore } from "@/stores/job";//接口
import type { JobInfo } from './types/jobInfo';
import type { CardItem } from './types/card';
const router = useRouter();
const useJob = useJobStore();


const jump = (src: string, params?: number) => {
  if (params) {
    router.push({ path: src, query: { positionId: params } })
  } else {
    router.push({ path: src })
  }
}

let isShow = ref(false)
let area: any = ref();//地区
let wishPositionRight = ref('');//职业右
let salary = ref('');//薪资
// 获取求职意向
const getJobIntent = async () => {
  let res: any = await useJob.getJobIntentList({ userId: 10000 });
  if (res.code == 200) {
    if (res.data.wishAddr.length) {
      isShow.value = true
    }
    // 地区
    area.value = (res.data.wishAddr);
    // 职位
    res.data.wishPosition.forEach((item: any) => {
      wishPositionRight.value += item.positionNameDown + '、'
    });
    // 薪资
    salary.value = res.data.wishMoney.replace(/000/g, 'k').replace(/,/, '-').replace(/k/, '')
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
        industryId += Number(item.industryIdDown) * Number(item.industryIdOn)
        modifyindustry.activeId.push(industryId);
        modifyindustry.activeId = [...new Set(modifyindustry.activeId)];
        modifyindustry.columnsIndustry.push({ text: item.industryNameDown, id: industryId });
        modifyindustry.industry.push({ parent: item.industryNameOn, children: item.industryNameDown });
      }
    });
    localStorage.setItem('industryInfo', JSON.stringify(modifyindustry));
  }
}
getJobIntent()

// 获取推荐职位列表
let cardList = ref([]) as Ref<CardItem[]>;
const getSelectPosition = async () => {
  let res: any = await useJob.getSelectPositionList({
  });
  if (res.code == 200) {
    cardList.value = cardList.value.concat(res.data);
    console.log(cardList.value)
  }
  console.log(res);
}
getSelectPosition();



// let cardList = [
//   {
//     id: 1,
//     title: '机械工程师1',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k',
//   },
//   {
//     id: 2,
//     title: '机械工程师2',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k'
//   },
//   {
//     id: 3,
//     title: '机械工程师3',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k'
//   },
//   {
//     id: 4,
//     title: '机械工程师1',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k',
//   },
//   {
//     id: 5,
//     title: '机械工程师2',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k'
//   },
//   {
//     id: 6,
//     title: '机械工程师3',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k'
//   },
//   {
//     id: 7,
//     title: '机械工程师1',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k',
//   },
//   {
//     id: 8,
//     title: '机械工程师2',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k'
//   },
//   {
//     id: 9,
//     title: '机械工程师3',
//     region: '上海市',
//     position: '研发工程师',
//     education: '硕士',
//     url: 'company.png',
//     companyName: '中国移动',
//     count: '100-499',
//     typeWork: '工程施工',
//     wages: '12k-24k'
//   },
// ]
</script>

<style lang="scss" scoped>
.position {
  height: 100%;

  header {
    height: 7.2rem;

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

    // .money {
    //   font-family: STLiti !important;
    // }

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

      .text {
        padding: 2rem 0 4rem;
        margin: 0;
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
  }
}
</style>
