<template>
  <div class="position">
    <header class=" wrap just-between" v-show="!jobIndustry">
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
    <header class=" wrap just-between" v-show="jobIndustry">
      <p class="fs-16 fw-700"><span v-for="item, index in jobIndustry.job.job" :key="index">{{ item.children }}<span>{{
          jobIndustry.job.job.length - index - 1 == 0 ? '' : '、'
      }}</span></span></p>
      <p class="fs-14 c-747474"><span v-for="item, index in jobIndustry.area" :key="index">{{ item }}</span></p>
      <p class="fs-14 c-747474"><span v-for="item, index in jobIndustry.salary" :key="index">{{ item }}</span> <img
          class="icon-fillin" @click="jump('/jobIntention')" src="@/assets/images/icon-fillin.png"></p>
    </header>
    <main class="container">
      <!-- <Card.Wrap>
        <Card.Item v-for="item in cardList" :key="item.id" :options="item" ></Card.Item>
      </Card.Wrap> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/card'
import { useRouter } from 'vue-router';
import { useJobStore } from "@/stores/job"//接口
const router = useRouter();
const useJob = useJobStore();

const jump = (src: string) => {
  router.push({ path: src })
}

let jobIndustry = (JSON.parse(localStorage.getItem('jobIndustry')!));
console.log(jobIndustry)

let cardList = ref([])
let area: string = '';//地区
jobIndustry.area.forEach((item: any) => {
  area += item;
});
let wishIndustryLeft: string = '';//行业左
jobIndustry.industry.industry.forEach((item: any) => {
  wishIndustryLeft += item.parent;
});
let wishIndustryRight: string = '';//行业右
jobIndustry.industry.industry.forEach((item: any) => {
  wishIndustryRight += item.children;
});
let wishMoneyLeft : string = '';//薪资左
wishMoneyLeft = jobIndustry.salary.replace('k','').slice('-')[0]+'000';
let wishMoneyRight : string = '';//薪资右
wishMoneyRight = jobIndustry.salary.replace('k','').slice('-')[2]+'000';
let wishPositionLeft: string = '';//职业左
jobIndustry.job.job.forEach((item: any) => {
  wishPositionLeft += item.parent;
});
let wishPositionRight: string = '';//职业右
jobIndustry.job.job.forEach((item: any) => {
  wishPositionRight += item.children;
});

const getSelectPosition = async () => {
  let res = await useJob.getSelectPositionList({
  "userId": 100000,
  "wishMoneyLeft": 1,

});
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
  }
}
</style>
