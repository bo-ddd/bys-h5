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
          v-model="message"
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
          v-model="message"
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
      <div class="btn-box">
        <van-button type="primary" block @click="preservaInfo">保存</van-button>
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
import { useRoute,useRouter,onBeforeRouteLeave } from "vue-router";
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
const route = useRoute();
const router = useRouter();
const schoolDesc = ref("");
const message = ref("");
const title = ref("");
const routeName = ref(route.query.editName);
const setTitle = function () {
  if (routeName.value == "education") {
    title.value = "教育经历";
  } else if (routeName.value == "internship") {
    title.value = "实习经历";
  } else if (routeName.value == "project") {
    title.value = "项目经历";
  }
};
onMounted(() => {
  getEducationrList();
});
onActivated(() => {
  nextTick(() => {
    routeName.value = route.query.editName;
    setTitle();
    getSchoolInfo();
  });
});
// onBeforeRouteLeave((to, from, next) => {
//   if (to.name == "resumeDetails") {
//     // clearKeep();
//     console.log("清空了");
//   }
//   next();
// });
const onClickLeft1 = () => history.back();
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
const dayValue = ref("");
const dayOver = ref("");
const dayOverValue = ref("");
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
    dayValue.value = value;
  } else if (routeName.value == "internship") {
    beginTime.value = setDayFormat(value);
    beginTimeValue.value = value;
  }
  show2.value = false;
};
const setDay2 = (value: any) => {
  if (routeName.value == "education") {
    dayOver.value = setDayFormat(value);
    dayOverValue.value = value;
  } else if (routeName.value == "internship") {
    overTime.value = setDayFormat(value);
    overTimeValue.value = value;
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
const beginTimeValue = ref("");
const overTime = ref("");
const overTimeValue = ref("");
//职位描述
const positonDesc=ref('')

//上传
const preservaInfo = () => {
  if (checkForm()) {
    console.log("sub");
    addEducationApi()
  }
};

//确认添加教育
const addEducationApi = async function () {
  let res = await use.addEducation({
    endTime: '2022-11-11', //用户教育经历结束时间 ,
    professionalId:Number(major.value.value), //专业id ,
    schoolExp: schoolDesc.value, //用户教育经历经验 ,
    schoolId: school.value.value, //学校id ,
    startTime: '2022-11-10', //用户教育经历开始时间 ,
    userEducationId: educationValue.value, //用户教育经历id ,
    userId: "10000", //用户id
  });
  if(res.code==200){
    Toast.success('更新成功');
    setSchool({})
    setMajor({})
    router.push({
      path:'/resumeDetails'
    });

  }
};
//确认添加实习
const addInternShipApi = async function () {
  let res = await use.addInternShip({
    companyName:companyName.value,//公司名称 ,
    endTime: overTimeValue.value, //结束时间 ,
    internShipDes:positonDesc,// 职位描述 ,
    positionName : positionName.value, //职位名称 ,
    startTime: beginTimeValue.value, //开始时间 ,
    userId: "10000", //用户id
  });
  if(res.code==200){
    Toast.success('更新成功');
    router.push({
      path:'/resumeDetails'
    })
    
  }
};
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
  } else if (dayValue.value > dayOverValue.value) {
    Toast("入学开始时间不能高于结束时间");
    return;
  }
  return true;
};
//清空
const clearKeep=()=>{
}
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
</style>