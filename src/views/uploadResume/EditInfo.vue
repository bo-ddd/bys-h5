<template>
  <div class="edit-page">
    <van-nav-bar :title="title" left-text left-arrow @click-left="onClickLeft1" />
    <div class="edit-body overy-scoll">
      <div v-if="routeName=='education'">
        <van-cell title="学校" is-link to="schoolList">
          <template #value>
            <div v-if="!school">请选择</div>
            <div v-else class="color-gray">{{school}}</div></template>
        </van-cell>
        <van-cell title="专业" is-link to="majorList">
          <template #value>
            <div v-if="!major">请选择</div>
            <div v-else class="color-gray">{{major}}</div></template>
        </van-cell>
        <van-cell title="学位" is-link @click="show=true">
          <template #value>
            <div v-if="!education">请选择</div>
            <div v-else class="color-gray">{{education}}</div>
          </template>
        </van-cell>
        <van-cell title="入学时间" is-link @click="show2=true">
          <template #value>
            <div v-if="!day">请选择</div>
            <div v-else class="color-gray">{{day}}</div>
          </template>
        </van-cell>
        <van-cell title="毕业时间" is-link @click="show3=true">
          <template #value>
            <div v-if="!dayOver">请选择</div>
            <div v-else class="color-gray">{{dayOver}}</div>
          </template>
        </van-cell>
        <van-field
          class="textArea"
          v-model="message"
          rows="8"
          autosize
          label="在校经历"
          type="textarea"
          maxlength="500"
          placeholder="请填写主修课程，GPA等"
          show-word-limit
        />
        <div class="h-55">

        </div>
      </div>
    </div>
    <div class="foot-box">
      <div class="btn-box">
        <van-button type="primary" block>保存</van-button>
      </div>
    </div>
    <!-- 学历 -->
    <van-popup v-model:show="show" position="bottom" :style="{ height: '50%' }">
      <van-picker
        :columns="educationList"
        @confirm="selectEducation"
        @cancel="onCancel"
        :columns-field-names="educationRole"
      />
    </van-popup>
    <!-- 入学时间 -->
    <van-popup v-model:show="show2" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :formatter="formatter"
        @confirm="setDay"
        @cancel="onCancel"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 毕业时间 -->
    <van-popup v-model:show="show3" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :formatter="formatter"
        @confirm="setDay2"
        @cancel="onCancel"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useResumeStore } from "@/stores/resume";
import { storeToRefs } from "pinia";
import { useSchoolStore } from "@/stores/schoolChoice";
import { useMajorStore } from "@/stores/majorChoice";
const { selectSchool } = storeToRefs(useSchoolStore());
const { selectMajor } = storeToRefs(useMajorStore());
const use = useResumeStore();
const route = useRoute();
console.log(route.query.editName);
const message = ref("");

const title = ref("");
const routeName = route.query.editName;
onMounted(() => {
  if (routeName == "education") {
    title.value = "教育经历";
  } else if (routeName == "internship") {
    title.value = "实习经历";
  } else if (routeName == "project") {
    title.value = "项目经历";
  }
  getEducationrList();
});
const onClickLeft1 = () => history.back();
//学校
const school: any = ref("");
const major = ref("");
const getSchoolInfo=()=>{
  //获取学校
  school.value = selectSchool.value;
  //获取专业
  major.value = selectMajor.value;
}
//专业

//学历
const show = ref(false);
const education = ref("");
const educationValue = ref("");
const educationList: any = ref([]);
const getEducationrList = async function () {
  let res = await use.getEducationApi({});
  if (res.code == 200) {
    educationList.value = res.data;
  }
};
const selectEducation = (item: any) => {
  education.value = item.label;
  educationValue.value = item.value;
  show.value = false;
};
const educationRole = {
  text: "label",
  value: "value",
};
//毕业时间
const show2 = ref(false);
const show3 = ref(false);
const day = ref("");
const dayOver = ref("");
const currentDate = ref(new Date());
const formatter = (type: any, val: any) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  return val;
};
const setDayFormat = function (value) {
  const dayValue = value.toLocaleDateString().split("/");
  dayValue.pop();
  if (dayValue[1].length == 1) {
    dayValue[1] = 0 + dayValue[1];
  }
  return dayValue.join("-");
};
const setDay = (value: any) => {
  day.value = setDayFormat(value);
  show2.value = false;
};
const setDay2 = (value: any) => {
  dayOver.value = setDayFormat(value);
  show3.value = false;
};
const minDate = new Date(1970, 0);
const maxDate = new Date(new Date().getFullYear() + 10, 11);
//关闭弹层
const onCancel = () => {
  show.value = false;
  show2.value = false;
};
</script>
<style lang="scss" scoped>
.edit-page {
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
  .textArea {
    flex-direction: column;
    font-size: 0.8rem;
  }
  .overy-scoll {
    height: 100%;
    overflow-y: scroll;
  }
  .edit-body{
    background-color: #ffffff;
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
.color-gray {
  color: #6a6a6a;
}
.h-55{
    width: 100%;
    height: 5.5rem;
}
</style>