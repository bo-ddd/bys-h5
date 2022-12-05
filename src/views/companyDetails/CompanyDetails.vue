<template>
  <div class="com-page">
    <van-nav-bar class title="公司主页" left-arrow @click-left="onClickLeft1" />
    <div class="content">
      <div class="info-head just-between">
        <div class="title">
          <h1>{{companyInfo.companyFullName}}</h1>
          <div class="desc mb-20">{{companyInfo.companyIndustry}}</div>
        </div>
        <div class="avater">
          <img :src="companyInfo.companyLogoUrl" />
        </div>
      </div>
      <div class="info-body">
        <van-tabs class="tab" v-model:active="active">
          <van-tab>
            <template #title>企业信息</template>
            <div class="info-title mt-10">基本信息</div>
            <div class="mt-20">企业全称：{{companyInfo.companyFullName}}</div>
            <div class="mt-10">企业性质：{{companyInfo.companyNature }}</div>
            <div class="mt-10">公司规模：{{companyInfo.companySize }}</div>
            <div class="mt-10">所属行业：{{companyInfo.companyIndustry }}</div>
            <div class="mt-10">企业官网：{{companyInfo.companyUrl }}</div>
            <div class="info-title mt-20">企业地址</div>
            <div class="mt-20">{{companyInfo.companyAddr }}</div>
            <div class="info-title mt-20">企业简介</div>
            <div class="mt-20">{{companyInfo.companyIntroducation }}</div>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="num-fa">
                在招职位
                <span class="num">{{positionLength}}</span>
              </div>
            </template>
            <div class="info-list">
              <div v-for="item in companyInfo.positionList" :key="item.positionId ">
                <div class="item just-between" @click="jump('/positionDetail')">
                  <div class="item-left">
                    <div class="title">{{item.positionName}}</div>
                    <div class="info mt-5">
                      北京市-朝阳区
                      <span>|</span>
                      Java工程师
                    </div>
                    <div class="type mt-5">{{item.positionEducation }}</div>
                  </div>
                  <div class="item-right">
                    <div class="num">{{item.positionMonthMoney}}</div>
                    <div class="btn mt-20">
                      <van-button type="primary" size="small">申请</van-button>
                    </div>
                  </div>
                </div>
                <van-divider :style="{ borderTop: '0.1rem solid #f4f4f4',marginTop:'2.5rem' }" />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <!-- </van-sticky> -->
      <div class="h-70"></div>
      <!-- </div> -->
    </div>
    <div class="foot-box">
      <div class="foot-left">
        <img :src="parseAssetFile('icon-share.png')" />
        <div>分享</div>
      </div>
      <div class="foot-right">
        <div
          @click="delStarPosition"
          class="border-l-gray flex-column h-50"
          v-if="companyInfo.isStar"
        >
          <van-icon name="star-o" size="2.5rem" color="#666666" />
          <span>已收藏</span>
        </div>
        <van-button v-else type="primary" block @click="starPosition">收藏</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Toast } from "vant";
import { onMounted, reactive, ref } from "vue";
import { parseAssetFile } from "@/assets/util";
import { useRouter, useRoute } from "vue-router";
import { useResumeStore } from "@/stores/resume"; //接口
let onClickLeft1 = () => history.back();
const active = ref(0);
const container = ref(null);
const use = useResumeStore();
let router = useRouter();
let route = useRoute();
let jump = (url: string) => {
  router.push({ path: url });
};
interface CompanyInfo {
  companyAddr: string;
  companyFullName: string;
  companyId: number;
  companyIndustry: string;
  companyIntroducation: string;
  companyLogoUrl: string;
  companyName: string;
  companyNature: string;
  companySize: string;
  companyUrl: string;
  isStar: boolean;
}
let companyInfo = reactive({}) as CompanyInfo;
const getComInfo = async function () {
  let companyId = Number(route.query.componyId);
  let res = await use.getCompany({
    companyId,
    userId:10000
  });
  if (res.code == 200 && res.data) {
    Object.assign(companyInfo, res.data);
    positionLength.value = res.data.positionList.length;
  }
};
let positionLength = ref(0); //企业在招职位数量
let position = ref(true);
onMounted(() => {
  getComInfo();
});

const starPosition = async () => {
  let companyId = Number(route.query.componyId);
  let res = await use.starPosition({ companyId, userId: 10000 });
  if (res.code == 200) {
    Toast.success("收藏成功");
    companyInfo.isStar = true;
  } else {
    Toast.fail("收藏失败");
  }
};
const delStarPosition = async () => {
  let companyId = Number(route.query.componyId);
  let res = await use.delStarPosition({ companyId, userId: 10000 });
  if (res.code == 200) {
    Toast.success("取消收藏");
    companyInfo.isStar = false;
  } else {
    Toast.fail("取消失败");
  }
};
</script>
<style lang="scss" scoped>
:deep(.van-tabs__content) {
  padding: 2rem;
  background-color: white;
}

.com-page {
  height: 100vh;
  display: grid;
  position: relative;
  grid-template-rows: 4.6rem auto;
}
.content {
  // display: grid;
  // grid-template-rows: 10rem auto;
  height: 100%;
  overflow-y: scroll;
  .info-head {
    background-color: #edf0f9;
    padding: 2rem;
    box-sizing: border-box;
    .title {
      h1 {
        font-size: 3rem;
      }
      .desc {
        font-size: 1.4rem;
        color: #666666;
      }
    }
    .avater {
      img {
        width: 7rem;
        height: 7rem;
      }
    }
  }

  .info-body {
    font-size: 1.4rem;
    color: #666666;
    // :deep(.van-tabs__content) {
      // min-height: calc(100vh - 31rem);
    // }
    :deep(.van-tabs__wrap) {
      position: sticky;
      top: -0.1rem;
      z-index: 999;
      border-bottom: 0.2rem solid #f4f4f4;
      background-color: #ffff;
    }
    :deep(.van-tabs__nav) {
      background-color: #ffff;
    }
    :deep(.van-tab) {
      font-size: 1.6rem;
      font-weight: 700;
      color: black;
    }
    .tab {
      .num-fa {
        position: relative;
        .num {
          position: absolute;
          top: -0.8rem;
          right: -1.4rem;
          font-size: 1.2rem;
          color: gray;
        }
      }
      :deep(.van-tab--active) {
        color: #1989fa;
        .num {
          color: #1989fa;
        }
      }
      :deep(.van-tabs__line) {
        background-color: #1989fa;
      }
      :deep(.van-tab__text--ellipsis) {
        overflow: visible;
      }
    }
    .info-title {
      font-size: 1.8rem;
      color: black;
    }
    .info-list {
      padding: 0 0.4rem;
      font-size: 1.4rem;
      color: #666666;
      .item {
        .title {
          font-size: 1.8rem;
          color: black;
        }
        .type {
          display: inline-block;
          padding: 0.2rem 0.4rem;
          font-size: 1.2rem;
          background-color: #f0f1f3;
        }
        .num {
          // width: 5.2rem;
          text-align: right;
          color: #ea5539;
          font-size: 1.4rem;
          font-weight: 700;
        }
        .btn {
          text-align: right;
          :deep(.van-button) {
            // width: 100%;
            // height: 100%;
            font-size: 1.4rem;
            padding: 0.6rem 1rem;
            font-weight: 700;
          }
        }
      }
    }
  }
}
.h-70 {
  height: 7rem;
}
.mt-5 {
  margin-top: 0.5rem;
}
.foot-box {
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  background-color: #fff;
  color: #707070;
  bottom: 0;
  padding: 1rem 1rem;
  display: grid;
  gap: 0 3rem;
  grid-template-columns: auto 58%;
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
    img {
      width: 2.5rem;
      height: 2.5rem;
      display: block;
    }
  }
  // .foot-right {
  // }
}
.mb-10 {
  margin-bottom: 1rem;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.border-l-gray {
  border-left: 1px solid #66666629;
}
.h-50 {
  height: 5rem;
}
</style>