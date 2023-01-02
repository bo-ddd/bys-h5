<template>
  <div class="resume-page">
    <van-nav-bar title="简历详情" left-arrow @click-left="onClickLeft1" />
    <div class="overy-scoll" ref="scrollRef">
      <van-cell to="/personalInfo" is-link class="cell-bottom pad-25-15">
        <template #title>
          <div class="gap-10 align-start">
            <img
              class="img-15 bord-rad-100"
              :src="userLogoUrl?userLogoUrl:parseAssetFile('icon-avater1.png')"
            />
            <div class="color-gray">
              <div class="fs-22 color-black mt-5">{{userName}}</div>
              <div class="fs-14 mt-10">{{userSchoolName}}</div>
              <div class="fs-14">
                {{userProfessional}}
                <span v-if="userProfessional&&userEducation">|</span>
                {{userEducation}}
              </div>
            </div>
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <img class="img-10 mt-5" :src="parseAssetFile('icon-pen.png')" />
        </template>
      </van-cell>
      <van-cell to="/jobIntention" is-link class="pad-25-15">
        <template #title>
          <div class="intention">
            <div class="fs-20 color-black">求职意向</div>
            <div v-if="!jobStatus" class="mt-20">
              <span class="color-gray">填写完求职意向，我们会推荐你期望的相关职位哦 ~</span>
            </div>
            <div v-else>
              <div class="align-center mt-10">
                <img class="mr-10" :src="parseAssetFile('icon-job.png')" />
                <span>{{jobIntent.wishIndustry}}</span>
              </div>
              <div class="align-center mt-10">
                <img class="mr-10" :src="parseAssetFile('icon-industry.png')" />
                <span>{{jobIntent.wishPosition}}</span>
              </div>
              <div class="align-center mt-10">
                <img class="mr-10" :src="parseAssetFile('icon-salary.png')" />
                <span>{{jobIntent.wishMoney}}元</span>
                <span class="plr-15">|</span>
                <img class="mr-10" :src="parseAssetFile('icon-square.png')" />
                <span>{{jobIntent.wishNature}}</span>
              </div>
              <div class="align-center mt-10">
                <img class="mr-10" :src="parseAssetFile('icon-position.png')" />
                <span class="line-h-18">{{jobIntent.wishAddr}}</span>
              </div>
            </div>
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <img class="img-10 mt-5" :src="parseAssetFile('icon-pen.png')" />
        </template>
      </van-cell>

      <InfoCard
        class="mt-10"
        title="教育经历"
        :maxLength="4"
        :params="{name:'education',data:educationData}"
      ></InfoCard>
      <InfoCard
        class="mt-10"
        title="实习经历"
        :maxLength="5"
        :params="{name:'internship',data:internShipData}"
      ></InfoCard>
      <InfoCard
        class="mt-10"
        title="项目经历"
        :maxLength="5"
        :params="{name:'project',data:projectnData}"
      ></InfoCard>
      <EditCard
        class="mt-10"
        title="校园实践"
        :params="{name:'campus',text:userSchoolPractice}"
      >{{userSchoolPractice}}</EditCard>
      <EditCard
        class="mt-10"
        title="专业技能"
        :params="{name:'skill',text:userProfessionalSkill}"
      >{{userProfessionalSkill}}</EditCard>
      <EditCard class="mt-10" title="获奖情况" :params="{name:'prize',text:userStar}">{{userStar}}</EditCard>
      <EditCard class="mt-10" title="兴趣爱好" :params="{name:'interest',text:userHobby}">{{userHobby}}</EditCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InfoCard from "@/components/infoCard/InfoCard.vue";
import EditCard from "@/components/editCard/editCard.vue";
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { parseAssetFile } from "@/assets/util";
import { onActivated, onMounted, ref } from "vue";
import type { Ref } from "vue";
import { useResumeStore } from "@/stores/resume";
import { useJobStore } from "@/stores/job"; //接口
const use = useResumeStore();
const useJob = useJobStore();
const jobStatus = ref(false);
const jobIntent = ref({});
const onClickLeft1 = () =>
  router.push({
    path: "/mine",
  });
const router = useRouter();
const to = function (path: any) {
  router.push(path);
};
const onClickLeft = () => {
  router.push({
    path: "/mine",
  });
};
onMounted(() => {});
onActivated(() => {
  getJobList();
  getExperience();
  getScrollValue();
  getJobList()
});
onBeforeRouteLeave((to:any, from, next) => {
  let toArr=['personalInfo','editInfo','editDescribe']
  if (toArr.indexOf(to.name)) {
    setScrollValue();
  } else {
    clearKeep();
    clearJobIntent();
    clearCard()
  }
  
  next();
});
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
const userName = ref("");
const userLogoUrl = ref("");
const userSchool = ref("");
const userSchoolName = ref("");
const userProfessional = ref("");
const userEducation = ref("");
const userSchoolPractice: Ref<string> = ref("");
const userProfessionalSkill = ref("");
const userStar = ref("");
const userHobby = ref("");
const educationData: any = ref([]);
const internShipData: any = ref([]);
const projectnData: any = ref([]);
const clearJobIntent=()=>{
  jobIntent.value={}
}
const clearCard=()=>{
  educationData.value=[];
  internShipData.value=[];
  projectnData.value=[];
  userSchoolPractice.value='';
  userProfessionalSkill.value='';
  userStar.value='';
  userHobby.value=''
}
//获取求职状态
const getJobList = async () => {
  let res: any = await useJob.getJobIntentList({});
  if (res.data !== "[]") {
    jobStatus.value = true;
    jobIntent.value = getJobIntent(res.data);
  }
};
//获取求职状态
const getJobIntent = (data: any) => {
  let obj: any = {};
  obj.wishIndustry = data.wishIndustry.map((item: any) => {
    return item.industryNameDown;
  }).join('、');
  obj.wishPosition = data.wishPosition.map((item: any) => {
    return item.positionNameDown;
  }).join('、');
  obj.wishMoney = data.wishMoney.split(",").join("-");
  obj.wishNature = getJobNature(data.wishNature);
  obj.wishAddr = data.wishAddr.join("、");
  return obj
};
const getJobNature = (num: string) => {
  switch (num) {
    case '0':
      return "全职";
      break;
    case '1':
      return "实习";
      break;
    case '2':
      return "全职和实习";
  }
};
//获取个人信息
const getExperience = async () => {
  let res = await use.getOnlineResume({});
  if (res.code == 200) {
    userName.value = res.data.userName;
    userLogoUrl.value = res.data.userLogoUrl;
    userSchool.value = res.data.userSchool;
    userSchoolName.value = res.data.userSchoolName;
    userProfessional.value = res.data.userProfessionalName;
    userEducation.value = res.data.userEducation;
    userSchoolPractice.value = res.data.userSchoolPractice;
    userProfessionalSkill.value = res.data.userProfessionalSkill;
    userStar.value = res.data.userStar;
    userHobby.value = res.data.userHobby;
  }
  let res1 = await use.getEducation({});
  let res2 = await use.getInternShip({});
  let res3 = await use.getProject({});
  if (res1.code == 200) {
    educationData.value = res1.data;
  }
  if (res2.code == 200) {
    internShipData.value = res2.data;
  }
  if (res3.code == 200) {
    projectnData.value = res3.data;
  }
};
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
.bord-rad-100 {
  border-radius: 100%;
}
.line-h-18 {
  line-height: 1.8rem;
}
</style>