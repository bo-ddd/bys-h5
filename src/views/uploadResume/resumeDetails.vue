<template>
  <div class="resume-page">
    <van-nav-bar title="简历详情" left-arrow @click-left="onClickLeft1" />
    <div class="overy-scoll" ref="scrollRef">
      <van-cell to="/personalInfo" is-link class="cell-bottom pad-25-15">
        <template #title>
          <div class="gap-10 align-start">
            <img class="img-15" :src="parseAssetFile('icon-avater1.png')"   />
            <div class="color-gray">
              <div class="fs-22 color-black mt-5">李萌</div>
              <div class="fs-16 mt-5">北京航空航天大学</div>
              <div class="fs-16">海警执法 | 大专</div>
            </div>
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <img class="img-10 mt-5" :src="parseAssetFile('icon-pen.png')"   />
        </template>
      </van-cell>
      <van-cell is-link class="pad-25-15">
        <template #title>
          <div class="intention">
            <div class="fs-20 color-black">求职意向</div>
            <div class="align-center mt-10">
              <img class="mr-10" :src="parseAssetFile('icon-job.png')"   /> web前端开发
            </div>
            <div class="align-center mt-10">
              <img class="mr-10" :src="parseAssetFile('icon-industry.png')"   />不限
            </div>
            <div class="align-center mt-10">
              <img class="mr-10" :src="parseAssetFile('icon-salary.png')"   />3000-50000元
              <span class="plr-15">|</span>
              <img class="mr-10" :src="parseAssetFile('icon-square.png')"   />全职和实习
            </div>
            <div class="align-center mt-10">
              <img class="mr-10" :src="parseAssetFile('icon-position.png')"   />山西省-临汾市、北京-北京市
            </div>
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <img class="img-10 mt-5" :src="parseAssetFile('icon-pen.png')"   />
        </template>
      </van-cell>

      <InfoCard class="mt-10" title="教育经历" :toPath="{path:'editInfo',name:'education'}"></InfoCard>
      <InfoCard class="mt-10" title="实习经历" :toPath="{path:'editInfo',name:'internship'}"></InfoCard>
      <InfoCard class="mt-10" title="项目经历" :toPath="{path:'editInfo',name:'project'}"></InfoCard>
      <EditCard class="mt-10" title="校园实践" :toPath="{path:'editDescribe',name:'campus'}"></EditCard> 
      <EditCard class="mt-10" title="专业技能" :toPath="{path:'editDescribe',name:'skill'}">不用二维</EditCard> 
      <EditCard class="mt-10" title="获奖情况" :toPath="{path:'editDescribe',name:'prize'}">去去去去</EditCard> 
      <EditCard class="mt-10" title="兴趣爱好" :toPath="{path:'editDescribe',name:'interest'}">哈哈哈</EditCard> 
    </div>
  </div>
</template>
<script lang="ts" setup>
import InfoCard from "@/components/infoCard/InfoCard.vue";
import EditCard from "@/components/editCard/editCard.vue";
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { parseAssetFile } from "@/assets/util";
import {onActivated,ref} from 'vue'
const onClickLeft1 = () => history.back();
const router = useRouter();
const to = function (path: any) {
  // router.push(path);
  console.log(path);
};
const onClickLeft = () => history.back();
const scrollRef: any = ref(null); //父级盒子
const scrollTop = ref(0); //滚轮值
//获取存的scroll值
const getScrollValue = function () {
  scrollRef.value.scrollTop = scrollTop.value;
};
//存scroll值
const setScrollValue = function () {
  scrollTop.value = scrollRef.value.scrollTop;
};
//清空keep状态
const clearKeep = function () {
  scrollTop.value = 0;
};
onActivated(()=>{
  getScrollValue();
  console.log("回来的位置" + scrollRef.value.scrollTop);
});
onBeforeRouteLeave((to, from, next) => {
  if (to.name == "createResume"||to.name=="mine") {
    clearKeep();
    console.log("清空了");
  } else {
    setScrollValue();
    console.log("保留");
  }
  next();
});
</script>
<style lang="scss" scoped>
.resume-page {
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
  .cell-bottom:after {
    right: 0;
    border-bottom: 0.4rem solid #ececec;
  }
  .overy-scoll {
    overflow-y: scroll;
  }
  .intention {
    font-size: 1.4rem;
    color: #666666;
    img {
      width: 2rem;
      height: 2rem;
      display: block;
    }
  }
}

.img-15 {
  width: 8rem;
  height: 8rem;
}
.gap-10 {
  gap: 0 1rem;
}
.fs-22 {
  font-size: 2.2rem;
}
.fs-20 {
  font-size: 2rem;
}
.fs-16 {
  font-size: 1.6rem;
}
.fs-18 {
  font-size: 1.8rem;
}
.fs-14 {
  font-size: 1.4rem;
}
.color-gray {
  color: #666666;
}
.color-gr {
  color: #c9c9c9;
}
.color-black {
  color: #000;
}
.mt-5 {
  margin-top: 0.5rem;
}
.align-start {
  display: flex;
  align-items: flex-start;
}
.img-10 {
  width: 2rem;
  height: 2rem;
}
.pad-25-15 {
  padding: 2.5rem 1.5rem;
}
.mr-10 {
  margin-right: 1rem;
}
.plr-15 {
  padding: 0 1.5rem;
}
.plr-10 {
  padding: 0 1rem;
}
.ptb-10 {
  padding: 1rem 0;
}
.line-1 {
  line-height: 1;
}
.mr-5 {
  margin-right: 0.5rem;
}
.plr-15 {
  padding: 0 1.5rem;
}
.pb-20 {
  padding-bottom: 2rem;
}
.pb-15 {
  padding-bottom: 1.5rem;
}
.mt-15 {
  margin-top: 1.5rem;
}
</style>