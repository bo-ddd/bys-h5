<template>
  <div class="edit-page">
    <van-nav-bar title="编辑简历" left-arrow @click-left="onClickLeft1" />
    <div class="edit-body overy-scoll">
      <van-cell-group>
        <van-field
          class="textArea"
          v-model="message"
          rows="1"
          autosize
          :label="titleName"
          type="textarea"
          maxlength="500"
          :placeholder="'请填写'+titleName"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="foot-box">
      <div class="btn-box">
        <van-button type="primary" block @click="reviseDesc">保存</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { Toast } from "vant";
import { storeToRefs } from "pinia";
import { useDescStore } from "@/stores/descChoice";
import { useResumeStore } from "@/stores/resume";
import { useRoute, useRouter } from "vue-router";
const { descData } = storeToRefs(useDescStore());
const { setDesc } = useDescStore();
const route = useRoute();
const router = useRouter();
const use = useResumeStore();
const titleName = ref("");
const infoData: any = reactive({});
const message = ref("dsf");
const userHobby: any = ref(""); //用户兴趣爱好 ,
const userProfessionalSkill: any = ref(""); //用户专业技能 ,
const userSchoolPractice: any = ref(""); //用户校园实践 ,
const userStar: any = ref(""); //用户获奖情况
onMounted(async () => {
  console.log(route);
  let res = await getDescInfo();
  infoData.value = res.data;
  let res2 = await getTitle();
});
const getTitle = function () {
  const routeName = route.query.editName;
  console.log(infoData);
  if (routeName == "campus") {
    titleName.value = "校园实践";
    message.value = infoData.value.userSchoolPractice;
    console.log(infoData.value.userSchoolPractice);
    userSchoolPractice.value = computed(() => {
      return message;
    }).value;
  } else if (routeName == "skill") {
    titleName.value = "专业技能";
    message.value = infoData.value.userProfessionalSkill;
    userProfessionalSkill.value = computed(() => {
      return message;
    }).value;
  } else if (routeName == "prize") {
    titleName.value = "获奖情况";
    message.value = infoData.value.userStar;
    userStar.value = computed(() => {
      return message;
    }).value;
  } else if (routeName == "interest") {
    titleName.value = "兴趣爱好";
    message.value = infoData.value.userHobby;
    userHobby.value = computed(() => {
      return message;
    }).value;
  }
};
const getDescInfo = function () {
  return use.getOnlineResume({
    userId: 10000,
  });
};
const reviseDesc = async function () {
  console.log(userSchoolPractice);
  console.log(userSchoolPractice.value);
  console.log(userSchoolPractice.value.value);
  let res = await use.modifyUserStar({
    userHobby: userHobby.value.value,
    userId: 10000,
    userProfessionalSkill: userProfessionalSkill.value.value,
    userSchool: userSchoolPractice.value.value,
    userStar: userStar.value.value,
  });
  console.log(res);
  if (res.code == 200) {
    Toast.success("更新成功");
    to("/resumeDetails");
  }
};
const onClickLeft1 = () => history.back();
const to = (path: string) => {
  router.push({
    path,
  });
};
</script>
<style lang="scss" scoped>
.edit-page {
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
  .overy-scoll {
    overflow-y: scroll;
  }
  .edit-body {
    background-color: #fff;
  }
  .textArea {
    flex-direction: column;
    :deep(.van-field__control)::placeholder {
      font-size: 1.2rem;
    }
    :deep(.van-field__control) {
    }
  }
  .foot-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    .btn-box {
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      padding: 0 1rem 1rem 1rem;
    }
  }
}
</style>