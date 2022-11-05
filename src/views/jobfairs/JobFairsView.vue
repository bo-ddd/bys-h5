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
        <div class="popularPositions">
          <div class="popularPositions-header">
            <div>
              <div class="beam"></div>
            </div>
            <div>热门职位</div>
          </div>
          <div class="swiper-box">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.jobfairs {
  height: 100%;

  .pt-6 {
    padding-top: .6rem;
  }

  .swipe-item_box {
    display: flex;
    gap: 2rem 0;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;

    img {
      width: 4rem;
      height: 4rem;
    }
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
    background: #F8F8F8;

    .content {
      margin-top: 7rem;
      padding: 0 2rem;
    }

    .popularPositions {
      .popularPositions-header {
        display: flex;
        font-size: 1.9rem;
        align-items: center;
        gap: 0 .6rem;

        .beam {
          width: .4rem;
          background: blue;
          height: 1.9rem;
        }
      }

      .my-swipe .van-swipe-item {
        font-size: 1.4rem;
        margin-top: 2rem;
        padding-bottom: 2rem;
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
