<template>
  <div class="com-page">
    <van-nav-bar class title="公司主页" left-arrow @click-left="onClickLeft1" />
    <div class="content">
      <div class="info-head just-between">
        <div class="title">
          <h1>易点云</h1>
          <div class="desc mb-20">互联网/IT/计算机服务</div>
        </div>
        <div class="avater">
          <img :src="parseAssetFile('icon-com_avater.png')" />
        </div>
      </div>
      <div class="info-body">
        <van-tabs v-model:active="active">
          <van-tab>
            <template #title>企业信息</template>
            <div class="info-title mt-10">基本信息</div>
            <div class="mt-20">企业全称：北京字节跳动网络有限公司</div>
            <div class="mt-10">企业性质：民营/私营/个体企业</div>
            <div class="mt-10">公司规模：1000人以上</div>
            <div class="mt-10">所属行业：互联网/IT,在线教育</div>
            <div class="mt-10">企业官网：job.bytedance.com</div>
            <div class="info-title mt-20">企业地址</div>
            <div class="mt-20">北京市海淀区中航广场矮楼</div>
            <div class="info-title mt-20">企业简介</div>
            <div class="mt-20">
              字节跳动成立于2012年3月，公司使命为“InspireCreativity,Enrich Life（激发创造，丰富生活）”。公司业务覆盖150个国家和地区、75个语种，拥有近10万名员工。
              <br />字节跳动在全球推出了多款有影响的产品，包括今日头条、抖音、西瓜视频、飞书、TikTok、Lark、Helo等。截止2020年8月，字节跳动旗下产品全球月活跃用户数超过15亿。
            </div>
          </van-tab>
          <van-tab>
            <template #title>
              <div class>在招职位</div>
            </template>
            <div class="info-list">
              <div class="item just-between" @click="jump('/positionDetail')">
                <div class="item-left">
                  <div class="title">后台开发工程师</div>
                  <div class="info mt-5">
                    北京市-朝阳区
                    <span>|</span>
                    Java工程师
                  </div>
                  <div class="type mt-5 ">本科</div>
                </div>
                <div class="item-right">
                  <div class="num">16-24k</div>
                  <div class="btn mt-20">
                    <van-button type="primary" block>申请</van-button>
                  </div>
                </div>
              </div>
              <van-divider :style="{ borderTop: '0.1rem solid #f4f4f4',marginTop:'2.5rem' }" />
              <div class="item just-between">
                <div class="item-left">
                  <div class="title">后台开发工程师</div>
                  <div class="info mt-5">
                    北京市-朝阳区
                    <span>|</span>
                    Java工程师
                  </div>
                  <div class="type mt-5 ">本科</div>
                </div>
                <div class="item-right">
                  <div class="num">16-24k</div>
                  <div class="btn mt-20">
                    <van-button type="primary" block>申请</van-button>
                  </div>
                </div>
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
        <van-button type="primary" block>收藏</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { parseAssetFile } from "@/assets/util";
import { useRouter } from "vue-router";
let onClickLeft1 = () => history.back();
const active = ref(0);
const container = ref(null);

let router = useRouter();

let jump = (url: string) => {
  router.push({ path: url })
}
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
  height: 100%;
  overflow-y: scroll;
  .info-head {
    background-color: #edf0f9;
    padding: 2rem;
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
    // }
  }

  .info-body {
    font-size: 1.4rem;
    color: #666666;
    :deep(.van-tabs__content){
      min-height: calc(100vh - 31rem);
    }
    :deep(.van-tabs__wrap) {
      position: sticky;
      top: -0.1rem;
      z-index: 999;
      border-bottom: 0.2rem solid #f4f4f4;
      background-color: #ffff;
    }
    :deep(.van-tabs__nav){
      background-color: #ffff;
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
          width: 5.2rem;
          text-align: right;
          color: #ea5539;
          font-size: 1.4rem;
          font-weight: 700;
        }
        .btn {
          :deep(.van-button--block) {
            width: 100%;
            height: 100%;
            padding: 0.6rem 0;
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
    color: #707070;
    img {
      width: 2.5rem;
      height: 2.5rem;
      display: block;
    }
  }
}
.mb-10{
  margin-bottom: 1rem;
}
</style>