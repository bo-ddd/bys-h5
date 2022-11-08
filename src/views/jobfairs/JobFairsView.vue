<template>
  <div class="jobfairs">
    <div class="header">
      <div>招聘会</div>
    </div>

    <div class="main">
      <div class="banner-box"></div>

      <div class="data-statistics">
        <div class="filx-column_center">
          <div>503</div>
          <div>
            <div class="line"></div>
          </div>
          <div class="fs-12">招聘企业</div>
        </div>
        <div class="filx-column_center">
          <div>503</div>
          <div>
            <div class="line"></div>
          </div>
          <div class="fs-12">招聘企业</div>
        </div>
        <div class="filx-column_center">
          <div>503</div>
          <div>
            <div class="line"></div>
          </div>
          <div class="fs-12">招聘企业</div>
        </div>
        <div class="filx-column_center">
          <div>503</div>
          <div>
            <div class="line"></div>
          </div>
          <div class="fs-12">招聘企业</div>
        </div>
      </div>

      <div class="content">
        <JobFairsNav title="热门职位">
          <template #content>
            <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
              <van-swipe-item class="ptl-20">
                <div class="swipe-item_box">
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">1</p>
                  </div>
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">实习生</p>
                  </div>
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">实习生</p>
                  </div>
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">实习生</p>
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item class="ptl-20 ml-10">
                <div class="swipe-item_box">
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">实习生</p>
                  </div>
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">实习生</p>
                  </div>
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">实习生</p>
                  </div>
                  <div>
                    <img src="@/assets/images/icon-collection.png" alt="">
                    <p class="pt-6">实习生</p>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </template>
        </JobFairsNav>

        <JobFairsNav title="招聘企业" class="mt-38">
          <template #header>
            <span class="fs-14 c-747474">查看全部 ></span>
          </template>
          <template #content>
            <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
              <van-swipe-item class="ptl-20">
                <div class="swipe-enterprise_box">
                  <div class="just-between">
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                  <div class="just-between">
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item class="ptl-20">
                <div class="swipe-enterprise_box">
                  <div class="just-between">
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                  <div class="just-between">
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </template>
        </JobFairsNav>

        <JobFairsNav title="招聘职位" class="mt-38">
          <template #content>
            <div class="position-box">
              <div :class="isOpen ? 'is-item-box' : 'item-box'">
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
                <div class="item">淘宝职位</div>
              </div>
              <div class="is-open">
                <span  @click="isOpenFn">{{isOpen ? 'close' : "open"}}</span>
              </div>
            </div>
          </template>
        </JobFairsNav>

        <JobFairsNav title="专场招聘" class="mt-20">
          <template #content>
            <van-swipe :show-indicators="false" class="my-swipe" :autoplay="4000" indicator-color="white">
              <van-swipe-item class="ptl-20">
                <div class="swipe-enterprise_box">
                  <div class="just-between">
                    <div><img src="@/assets/images/banner1.png" alt=""></div>
                    <div><img src="@/assets/images/banner2.jpg" alt=""></div>
                    <div><img src="@/assets/images/banner3.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                  <div class="just-between">
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item class="ptl-20">
                <div class="swipe-enterprise_box">
                  <div class="just-between">
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                  <div class="just-between">
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                    <div><img src="@/assets/images/icon-invitation.png" alt=""></div>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </template>
        </JobFairsNav>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import JobFairsNav from "@/components/jobfairs/JobFairsNav.vue";
let isOpen = ref(false);

let isOpenFn = ()=>{
  isOpen.value =  isOpen.value == true ? false : true; 
}
</script>

<style lang="scss" scoped>
.jobfairs {
  height: 100%;

  .pt-6 {
    padding-top: .6rem;
  }

  .filx-column_center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: .5rem;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 6rem;
    background: #F8F8F8;
    font-size: 1.8rem;
    padding-bottom: 2rem;
  }

  .main {
    height: calc(100% - 7rem);
    overflow: auto;
    background: #ffffff;

    .content {
      margin-top: 7rem;
      padding: 0 2rem;

      .position-box {
        .is-open{
          text-align: center;
          margin-top: 2rem;
          font-size: 1.6rem;
          color: #acacac;
        }
       .is-item-box {
          margin-top:1.8rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap:1.4rem 2.8rem;
          .item {
            text-align: center;
            width: 6.2rem;
            font-size: 1.4rem;
          }
        }
        .item-box {
          margin-top:1.8rem;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          height:15rem;
          align-items: center;
          gap:1.4rem 2.8rem;
          .item {
            text-align: center;
            width: 6.2rem;
            font-size: 1.4rem;
          }
        }

      }

      .swipe-enterprise_box {
        margin: 0 auto;
        width: 95%;

        img {
          width: 7rem;
          height: 7rem;
        }
      }

      .my-swipe .van-swipe-item {
        font-size: 1.4rem;
        margin-top: 2rem;
        padding-bottom: 2rem;

        .swipe-item_box {
          img {
            width: 4rem;
            height: 4rem;
          }

          display: flex;
          gap: 2rem 0;
          justify-content: space-between;
          width: 90%;
          margin: 0 auto;
          text-align: center;
        }
      }
    }

    .banner-box {
      background-image: url('@/assets/images/banner.png');
      background-repeat: no-repeat;
      background-size: 100%;
      height: 15rem;
    }

    .line {
      border-bottom: .2rem solid rgb(50, 50, 236);
      width: 2rem;
    }

    .data-statistics {
      position: relative;
      background: red;
      width: 80%;
      background: rgb(255, 255, 255);
      margin: -4rem auto;
      border-radius: 1rem;
      display: flex;
      justify-content: space-between;
      padding: 1.6rem 2rem;
      font-size: 1.4rem;
      box-shadow: 0rem .4rem 0rem 0rem rgb(240, 240, 240);
      z-index: 999;
    }
  }
}

:deep(.van-swipe__indicators) {
  top: 95%;
}

:deep(.van-swipe__indicator) {
  background: rgb(154, 154, 154);

}

:deep(.van-swipe__indicator--active) {
  background: blue !important;
  width: 1.2rem;
  border-radius: 1rem;
}
</style>
