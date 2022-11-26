<template>
  <div class="edit-page">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft1" />
    <div class="edit-body overy-scoll">
      <div v-if="routeName=='education'">
        <van-cell title="学校" is-link to="schoolList">
          <template #value>
            <div v-if="!school.name">请选择</div>
            <div v-else class="color-gray">{{school.name}}</div>
          </template>
        </van-cell>
        <van-cell title="专业" is-link to="majorList">
          <template #value>
            <div v-if="!major.name">请选择</div>
            <div v-else class="color-gray">{{major.name}}</div>
          </template>
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
          v-model="schoolDesc"
          rows="8"
          autosize
          label="在校经历"
          type="textarea"
          maxlength="500"
          placeholder="请填写主修课程，GPA等"
          show-word-limit
        />
      </div>
      <div v-if="routeName=='internship'">
        <van-field v-model="companyName" label="公司名" placeholder="请输入公司名称" input-align="right" />
        <van-field v-model="positionName" label="担任职位" placeholder="请输入担任职位" input-align="right" />
        <van-cell title="开始时间" is-link @click="show2=true">
          <template #value>
            <div v-if="!beginTime">请选择</div>
            <div v-else class="color-gray">{{beginTime}}</div>
          </template>
        </van-cell>
        <van-cell title="结束时间" is-link @click="show3=true">
          <template #value>
            <div v-if="!overTime">请选择</div>
            <div v-else class="color-gray">{{overTime}}</div>
          </template>
        </van-cell>

        <van-field
          class="textArea"
          v-model="positonDesc"
          rows="8"
          autosize
          label="工作描述"
          type="textarea"
          maxlength="500"
          placeholder="请填写工作描述"
          show-word-limit
        />
      </div>
      <div v-if="routeName=='project'">
        <van-field v-model="companyName" label="项目名称" placeholder="请输入项目名称" input-align="right" />
        <van-field v-model="positionName" label="项目职位" placeholder="请输入项目职位" input-align="right" />
        <van-cell title="开始时间" is-link @click="show2=true">
          <template #value>
            <div v-if="!beginTime">请选择</div>
            <div v-else class="color-gray">{{beginTime}}</div>
          </template>
        </van-cell>
        <van-cell title="结束时间" is-link @click="show3=true">
          <template #value>
            <div v-if="!overTime">请选择</div>
            <div v-else class="color-gray">{{overTime}}</div>
          </template>
        </van-cell>
        <van-field
          class="textArea"
          v-model="projectDes"
          rows="8"
          autosize
          label="项目描述"
          type="textarea"
          maxlength="500"
          placeholder="请填写项目描述"
          show-word-limit
        />

        <van-field
          class="textArea"
          v-model="projectStar"
          rows="8"
          autosize
          label="取得成就"
          type="textarea"
          maxlength="500"
          placeholder="请填写取得成就"
          show-word-limit
        />
      </div>
      <div class="h-55"></div>
    </div>
    <div class="foot-box">
      <div class="btn-box" v-if="!route.query.infoId">
        <van-button type="primary" block @click="preservaInfo">保存</van-button>
      </div>
      <div class="btn-box flex-bet" v-else>
        <van-button type="primary" plain block @click="deleteInfo">删除</van-button>
        <van-button type="primary" block @click="editInfo">保存</van-button>
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
import { nextTick, onActivated, onMounted, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { Dialog } from "vant";
import { Toast } from "vant";
import { useResumeStore } from "@/stores/resume";
import { storeToRefs } from "pinia";
import { useSchoolStore } from "@/stores/schoolChoice";
import { useMajorStore } from "@/stores/majorChoice";
const { selectSchool } = storeToRefs(useSchoolStore());
const { selectMajor } = storeToRefs(useMajorStore());
const { setSchool } = useSchoolStore();
const { setMajor } = useMajorStore();
const use = useResumeStore();
const route: any = useRoute();
const router = useRouter();
const schoolDesc = ref("");
const title = ref("");
const routeName = ref(route.query.editName);
const setTitle = function () {
  routeName.value = route.query.editName;
  if (routeName.value == "education") {
    title.value = "教育经历";
  } else if (routeName.value == "internship") {
    title.value = "实习经历";
  } else if (routeName.value == "project") {
    title.value = "项目经历";
  }
};
onMounted(() => {
  getSchoolInfo();
  if (route.query.infoId) {
    getEditInfo(route.query.infoId);
  }
  getEducationrList();
  setTitle();
});
const onClickLeft1 = () => {
  history.back();
  clearKeep();
};
//删除经历
const deleteInfo = () => {
  Dialog.confirm({
    title: "提示",
    message: "是否确认删除？",
  })
    .then(async () => {
      let res;
      let deleteApi: ((payload: {}) => any) | any;
      if (routeName.value == "education") {
        deleteApi = use.delEducation;
      } else if (routeName.value == "internship") {
        deleteApi = use.delInternShip;
      } else if (routeName.value == "project") {
        deleteApi = use.delProject;
      }
      res = await deleteApi({
        userId: 10000,
        userEducationId: Number(route.query.infoId),
      });
      if (res.code == 200) {
        Toast.success({
          message: "更新成功666!",
          duration: 500,
        });
        router.push("/resumeDetails");
        clearKeep();
      }
    })
    .catch(() => {});
};
//获取教育信息(复现)
const getEditInfo = async (id: number) => {
  console.log(2);

  if (routeName.value == "education") {
    let res = await use.getEducation({
      educationId: Number(id),
      userId: 10000,
    });
    if (res.code == 200) {
      let infoData = res.data[0];
      console.log(infoData);
      day.value = infoData.startTime.slice(0, 10);
      dayOver.value = infoData.endTime.slice(0, 10);
      school.value = {
        name: infoData.schoolName,
        value: infoData.schoolId,
      };
      major.value = {
        name: infoData.professional,
        value: infoData.professionalId,
      };
      education.value = infoData.education;
      educationValue;
      schoolDesc.value = infoData.schoolExp;
    }
  } else if (routeName.value == "internship") {
    let res = await use.getInternShip({
      internShipId: Number(id),
      userId: 10000,
    });
    if (res.code == 200) {
      let infoData = res.data[0];
      companyName.value = infoData.companyName;
      beginTime.value = infoData.startTime.slice(0, 10);
      overTime.value = infoData.endTime.slice(0, 10);
      positonDesc.value = infoData.internShipDes;
      positionName.value = infoData.positionName;
    }
  } else if (routeName.value == "project") {
    let res = await use.getProject({
      projectId: Number(id),
      userId: 10000,
    });
    if (res.code == 200) {
      let infoData = res.data[0];
      companyName.value = infoData.projectDes;
      beginTime.value = infoData.startTime.slice(0, 10);
      overTime.value = infoData.endTime.slice(0, 10);
      positionName.value = infoData.positionName;
      projectDes.value = infoData.projectDes;
      projectStar.value = infoData.projectStar;
    }
  }
};
//修改
const editInfo = async () => {
  let res;
  if (routeName.value == "education") {
    res = await use.modifyEducation({
      educationId: education.value,
      endTime: day.value, //用户教育经历结束时间 ,
      professionalId: Number(major.value.value), //专业id ,
      schoolExp: schoolDesc.value, //用户教育经历经验 ,
      schoolId: school.value.value, //学校id ,
      startTime: dayOver.value, //用户教育经历开始时间 ,
      userEducationId: route.query.infoId, //用户教育经历id ,
      userId: 10000,
    });
  } else if (routeName.value == "internship") {
    res = await use.modifyInternShip({
      companyName: companyName.value, //公司名称 ,
      endTime: "2020-11-22", //结束时间 ,
      internShipDes: positonDesc.value, // 职位描述 ,
      positionName: positionName.value, //职位名称 ,
      startTime: "2020-11-22", //开始时间 ,
      userId: 10000, //用户id
      internShipId: route.query.infoId, //用户教育经历id ,
    });
  } else if (routeName.value == "project") {
    res = await use.modifyProject({
      endTime: overTime.value,
      positionName: positionName.value,
      projectDes: projectDes.value,
      projectName: companyName.value,
      projectStar: projectStar.value,
      startTime: beginTime.value,
      userId: 10000,
      projectId: route.query.infoId,
    });
  }

  if (res.code == 200) {
    clearData();
  }
};
//学校
//专业
const school: any = ref("");
const major: any = ref("");
const getSchoolInfo = () => {
  //获取学校
  school.value = selectSchool.value;
  //获取专业
  major.value = selectMajor.value;
};
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
const setDayFormat = function (value: any) {
  const dayValue = value.toLocaleDateString().split("/");
  dayValue.pop();
  if (dayValue[1].length == 1) {
    dayValue[1] = 0 + dayValue[1];
  }
  return dayValue.join("-");
};
const setDay = (value: any) => {
  if (routeName.value == "education") {
    day.value = setDayFormat(value);
  } else if (routeName.value == "internship") {
    beginTime.value = setDayFormat(value);
  }
  show2.value = false;
};
const setDay2 = (value: any) => {
  if (routeName.value == "education") {
    dayOver.value = setDayFormat(value);
  } else if (routeName.value == "internship") {
    overTime.value = setDayFormat(value);
  }
  show3.value = false;
};
const minDate = new Date(1970, 0);
const maxDate = new Date(new Date().getFullYear() + 10, 11);
//关闭弹层
const onCancel = () => {
  show.value = false;
  show2.value = false;
  show3.value = false;
};
//公司
const companyName = ref("");
//职位
const positionName = ref("");
//时间
const beginTime = ref("");
const overTime = ref("");
//职位描述
const positonDesc = ref("");
const projectDes = ref("");
const projectStar = ref("");
//上传
const preservaInfo = () => {
  console.log(routeName.value);

  if (routeName.value == "education" && checkForm()) {
    addEducationApi();
  } else if (routeName.value == "internship" && checkForm2()) {
    addInternShipApi();
  } else if (routeName.value == "project" && checkForm3()) {
    addProjectApi();
  }
};

//确认添加教育
const addEducationApi = async function () {
  let res = await use.addEducation({
    endTime: day.value, //用户教育经历结束时间 ,
    professionalId: Number(major.value.value), //专业id ,
    schoolExp: schoolDesc.value, //用户教育经历经验 ,
    schoolId: school.value.value, //学校id ,
    startTime: dayOver.value, //用户教育经历开始时间 ,
    educationId: educationValue.value, //用户教育经历id ,
    userId: 10000, //用户id
  });
  if (res.code == 200) {
    clearData();
  }
};
//确认添加实习
const addInternShipApi = async function () {
  let res = await use.addInternShip({
    companyName: companyName.value, //公司名称 ,
    endTime: "2020-11-22", //结束时间 ,
    internShipDes: positonDesc.value, // 职位描述 ,
    positionName: positionName.value, //职位名称 ,
    startTime: "2020-11-22", //开始时间 ,
    userId: 10000, //用户id
  });
  if (res.code == 200) {
    clearData();
  }
};
//确认添加项目经历
const addProjectApi = async function () {
  let res = await use.addProject({
    endTime: overTime.value,
    positionName: positionName.value,
    projectDes: projectDes.value,
    projectName: companyName.value,
    projectStar: projectStar.value,
    startTime: beginTime.value,
    userId: 10000,
  });
  if (res.code == 200) {
    clearData();
  }
};

//清空学校和专业数据
const clearData = () => {
  Toast.success({
    message: "更新成功666!",
    duration: 500,
  });
  setSchool({});
  setMajor({});
  router.push({
    path: "/resumeDetails",
  });
};
//校验
const checkForm = () => {
  if (!school.value) {
    Toast("请选择学校");
    return;
  } else if (!major.value) {
    Toast("请选择专业");
    return;
  } else if (!education.value) {
    Toast("请选择学历");
    return;
  } else if (!day.value) {
    Toast("请选择入学时间");
    return;
  } else if (!dayOver.value) {
    Toast("请选择毕业时间");
    return;
  } else if (!schoolDesc.value) {
    Toast("请填写在校经历");
    return;
  } else if (day.value > dayOver.value) {
    Toast("入学开始时间不能高于结束时间");
    return;
  }
  return true;
};
const checkForm2 = () => {
  if (!companyName.value) {
    Toast("请输入公司名称");
    return;
  } else if (!positionName.value) {
    Toast("请输入担任职位");
    return;
  } else if (!beginTime.value) {
    Toast("请选择开始时间");
    return;
  } else if (!overTime.value) {
    Toast("请选择结束时间");
    return;
  } else if (!positonDesc.value) {
    Toast("请填写工作描述");
    return;
  } else if (beginTime.value > overTime.value) {
    Toast("实习开始时间不能高于结束时间");
    return;
  }
  return true;
};
const checkForm3 = () => {
  if (!companyName.value) {
    Toast("请输入项目名称");
    return;
  } else if (!positionName.value) {
    Toast("请输入项目职位");
    return;
  } else if (!beginTime.value) {
    Toast("请选择开始时间");
    return;
  } else if (!overTime.value) {
    Toast("请选择结束时间");
    return;
  } else if (!projectDes.value) {
    Toast("请填写项目描述");
    return;
  } else if (!projectStar.value) {
    Toast("请填写取得成就");
    return;
  } else if (beginTime.value > overTime.value) {
    Toast("实习开始时间不能高于结束时间");
    return;
  }
  return true;
};
//清空
const clearKeep = () => {
  setSchool({});
  setMajor({});
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
    :deep(.van-field__control)::placeholder {
      font-size: 1.2rem;
    }
    :deep(.van-field__control) {
      font-size: 1.2rem;
      color: gray;
    }
  }
  .textArea::after {
    display: none;
  }
  .overy-scoll {
    height: 100%;
    overflow-y: scroll;
  }
  .edit-body {
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
.h-55 {
  width: 100%;
  height: 5.5rem;
}
.flex-bet {
  display: flex;
  gap: 3rem;
  // justify-content:;
}
</style>