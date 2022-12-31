<template>
  <div class="person-box">
    <van-nav-bar title="基本信息" left-arrow @click-left="onClickLeft1" />
    <div ref="scrollRef" class="overy-scoll">
      <van-cell-group>
        <UploadAvatar :avaterImg="avaterImg" @success="setAvater"></UploadAvatar>
        <van-cell class="all-width pb-20" center>
          <template #title>
            <div class="fs-16 color-gray">姓名</div>
          </template>
          <template #label>
            <van-field class="fs-16" clearable v-model="userName" label="文本" placeholder="请填写真实姓名" />
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center>
          <template #title>
            <div class="fs-16 color-gray">联系邮箱</div>
          </template>
          <template #label>
            <van-field class="fs-16" clearable v-model="userEmail" label="文本" placeholder="请输入邮箱" />
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show2 = true">
          <template #title>
            <div class="fs-16 color-gray">出生年月</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="userBirthday">{{userBirthday}}</span>
                <span class="color-gr" v-else>请填写出生日期</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show3 = true">
          <template #title>
            <div class="fs-16 color-gray">民族</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="userNational">{{userNational}}</span>
                <span class="color-gr" v-else>请填写民族</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>

        <SelectCom :select="userSex" :dataList="sexList" placeholder="请填写性别" @onSelect="setSex"></SelectCom>
        <van-cell class="all-width pb-20" center @click="show4 = true">
          <template #title>
            <div class="fs-16 color-gray">生源地</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="userAddr">{{userAddr}}</span>
                <span class="color-gr" v-else>请填写生源地</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="mt-10">
        <van-cell class="all-width pb-20" center @click="show5 = true">
          <template #title>
            <div class="fs-16 color-gray">最高学历</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="userEducation">{{userEducation}}</span>
                <span class="color-gr" v-else>请填写最高学历</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="to('/schoolList')">
          <template #title>
            <div class="fs-16 color-gray">最高学历的学校</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="userSchool">{{userSchool.name}}</span>
                <span class="color-gr" v-else>请填写最高学历的学校</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="to('/majorList')">
          <template #title>
            <div class="fs-16 color-gray">最高学历的专业</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="userProfessional">{{userProfessional.name}}</span>
                <span class="color-gr" v-else>请填写最高学历的专业</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show8 = true">
          <template #title>
            <div class="fs-16 color-gray">毕业年份</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="userYear">{{userYear}}</span>
                <span class="color-gr" v-else>选择毕业年份</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center></van-cell>
      </van-cell-group>
      <div class="h-30"></div>
    </div>

    <div class="foot-box">
      <div class="btn-box">
        <van-button type="primary" block @click="keepInfo">保存</van-button>
      </div>
    </div>
    <!-- 性别弹框 -->
    <!-- 生日 -->
    <van-popup v-model:show="show2" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :formatter="formatter"
        @confirm="setDay"
        @cancel="onCancel"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 民族 -->
    <van-popup v-model:show="show3" position="bottom" :style="{ height: '50%' }">
      <van-picker
        :columns="nationList"
        @confirm="setNation"
        @cancel="onCancel"
        :default-index="nationDefault"
        :columns-field-names="customFieldName"
      />
    </van-popup>
    <!-- 生源地 -->
    <van-popup v-model:show="show4" position="bottom" :style="{ height: '50%' }">
      <van-picker
        swipe-duration="100"
        :show-toolbar="true"
        :columns="areaList"
        @cancel="onCancel"
        @confirm="selectArea"
        :columns-field-names="areaRole"
      />
    </van-popup>
    <!-- 学历 -->
    <van-popup v-model:show="show5" position="bottom" :style="{ height: '50%' }">
      <van-picker
        :columns="educationList"
        @confirm="selectEducation"
        @cancel="onCancel"
        :columns-field-names="educationRole"
      />
    </van-popup>
    <!-- 毕业年份 -->
    <van-popup v-model:show="show8" position="bottom" :style="{ height: '50%' }">
      <van-picker :columns="yearList" @confirm="selectYear" @cancel="onCancel" />
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import areaList from "@/assets/json/city.json";
import { parseAssetFile } from "@/assets/util";
import {
  onMounted,
  reactive,
  ref,
  onDeactivated,
  onActivated,
  nextTick,
  computed,
} from "vue";
import {
  useRouter,
  useRoute,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
import { Toast } from "vant";
import { storeToRefs } from "pinia";
import { useSchoolStore } from "@/stores/schoolChoice";
import { useMajorStore } from "@/stores/majorChoice";
import { useResumeStore } from "@/stores/resume";
import { getScrollTop } from "vant/lib/utils";
import UploadAvatar from "@/components/upload/UploadAvatar.vue";
import SelectCom from "@/components/select/SelectCom.vue";
const { selectSchool } = storeToRefs(useSchoolStore());
const { setSchool, clearSchool } = useSchoolStore();
const { selectMajor } = storeToRefs(useMajorStore());
const { setMajor, clearMajor } = useMajorStore();

//首次进入页面获取下拉列表
onMounted(async () => {
  await getInfo();
  await gerSexList();
  await gerNationList();
  await getEducationrList();
});
onActivated(() => {
  getInfo();
  getSchoolInfo();
  getScrollValue();
});
onBeforeRouteLeave((to, from, next) => {
  if (to.name == "schoolList" || to.name == "majorList") {
    setScrollValue();
  } else {
    clearKeep();
    clearUserInfo();
  }
  next();
});
//民族
const nationDefault = ref(0);
const userNational: any = ref("");
const nationValue = ref("");
const nationList: any = ref([]);
const customFieldName = {
  text: "label",
  value: "value",
};
const gerNationList = async function () {
  let res = await use.getNationalDrop({});
  if (res.code == 200) {
    nationList.value = res.data;
  }
};
const setNation = (item: any, index: number) => {
  userNational.value = item.label;
  nationValue.value = item.value;
  nationDefault.value = index;
  show3.value = false;
};
//获取个人信息
const getInfo = async function () {
  let res = await use.getOnlineResume({});
  if (res.data) {
    userName.value = res.data.userName;
    userEmail.value = res.data.userEmail;
    userSex.value = res.data.userSex;
    sexValue.value = res.data.userSexId;
    avaterImg.value = res.data.userLogoUrl;
    userBirthday.value = res.data.userBirthday.slice(0, 10);
    userNational.value = res.data.userNationalName;
    nationValue.value = res.data.userNational;
    userEducation.value = res.data.userEducation;
    educationValue.value = res.data.userEducationId;
    userAddr.value = res.data.userAddr;
    userSchool.value = {
      name: res.data.userSchoolName,
      value: res.data.userSchool,
    };
    userProfessional.value = {
      name: res.data.userProfessionalName,
      value: res.data.userProfessionalId,
    };
    userYear.value = res.data.userYear;
  }
};
const clearUserInfo = function () {
  userName.value = "";
  userEmail.value = "";
  userSex.value = "";
  sexValue.value = "";
  avaterImg.value = "";
  userBirthday.value = "";
  userNational.value = "";
  nationValue.value = "";
  userEducation.value = "";
  educationValue.value = "";
  userAddr.value = "";
  userSchool.value = {
    name: "",
    value: "",
  };
  userProfessional.value = {
    name: "",
    value: "",
  };
  userYear.value = "";
};

const upload: any = ref(null);

const use = useResumeStore();
const route = useRoute();
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
  //清空滚轮的位置
  scrollTop.value = 0;
  //重新获取用户信息
  // getInfo();
  //清空stores
  clearSchool();
  clearMajor();
};
//姓名
const userName = ref("");
//邮箱
const userEmail = ref("");
//头像
const avaterImg = ref("");
const fileList = ref([]);
const setAvater = (img: string) => {
  avaterImg.value = img;
};
//性别
const sexList: any = reactive([]);
const userSex = ref("");
const sexValue = ref("");
const setSex = (item: { name: string; value: any }) => {
  sexValue.value = item.value;
  userSex.value = item.name;
};
const gerSexList = async function () {
  let res = await use.getSexDrop({});
  if (res.code == 200) {
    sexList.length = 0;
    Object.assign(
      sexList,
      res.data.map((item: any) => {
        return {
          name: item.label,
          value: item.value,
        };
      })
    );
  }
};
//生日
const minDate = new Date(1970, 0, 1);
const maxDate = new Date(2032, 11, 31);
const userBirthday = ref("");
const setDay = (value: any) => {
  userBirthday.value = formatDay(value);
  show2.value = false;
};
const formatDay = (value: any) => {
  const dayValue = value.toLocaleDateString().split("/");

  if (dayValue[1].length == 1) {
    dayValue[1] = 0 + dayValue[1];
  }
  if (dayValue[2].length == 1) {
    dayValue[2] = 0 + dayValue[2];
  }
  return dayValue.join("-");
};
const currentDate = ref(new Date());
const formatter = (type: any, val: any) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  if (type === "day") {
    return `${val}日`;
  }
  return val;
};
//生源地
const userAddr = ref("");
const areaDefault = ref(0);
const areaRole = {
  text: "label",
  // value: "label",
  children: "children",
};
const selectArea = (value: any, index: number) => {
  areaDefault.value = index;
  userAddr.value = value[0].label + "-" + value[1].label + "-" + value[2].label;
  show4.value = false;
};
//学历
const userEducation: any = ref("");
const educationValue: any = ref("");
const educationList: any = ref([]);
const educationRole = {
  text: "label",
  value: "value",
};
const getEducationrList = async function () {
  let res = await use.getEducationApi({});
  if (res.code == 200) {
    educationList.value = res.data;
  }
};
const selectEducation = (item: any) => {
  userEducation.value = item.label;
  educationValue.value = item.value;
  show5.value = false;
};
//年份
const userYear = ref("");
const yearList = [
  1990, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027,
  2028, 2029, 2030,
];
const selectYear = (value: any) => {
  show8.value = false;
  userYear.value = value;
};
//学校和专业
const userSchool: any = ref("");
const userProfessional: any = ref("");
const getSchoolInfo = () => {
  //获取学校
  userSchool.value = selectSchool.value ? selectSchool.value : userSchool.value;
  userProfessional.value = selectMajor.value
    ? selectMajor.value
    : userProfessional.value;
};
//保存信息
const keepInfo = function () {
  if (checkForm()) {
    updateUserInfo();
  }
};
//修改信息
const updateUserInfo = async () => {
  let res = await use.modifyBaseData({
    userLogoUrl: avaterImg.value,
    userName: userName.value,
    userEmail: userEmail.value,
    userSex: Number(sexValue.value),
    userBirthday: userBirthday.value,
    userNational: Number(nationValue.value),
    userAddr: userAddr.value,
    userSchool: Number(userSchool.value.value),
    userEducation: Number(educationValue.value),
    userProfessional: Number(userProfessional.value.value),
    userYear: Number(userYear.value),
  });
  if (res.code == 200) {
    Toast.success("更新成功");
    to("/resumeDetails");
  } else {
    Toast.fail(res.msg);
  }
};
//校验
const checkForm = function () {
  if (!userName.value) {
    Toast("请输入姓名");
    return;
  } else if (!userEmail.value) {
    Toast("请输入联系邮箱");
    return;
  } else if (!userSex.value) {
    Toast("请选择性别");
    return;
  } else if (!userBirthday.value) {
    Toast("请选择出生年月");
    return;
  } else if (!userNational.value) {
    Toast("请选择民族");
    return;
  } else if (!userAddr.value) {
    Toast("请选择生源地");
    return;
  } else if (!userEducation.value) {
    Toast("请选择最高学历");
    return;
  } else if (!userSchool.value) {
    Toast("请选择学校");
    return;
  } else if (!userProfessional.value) {
    Toast("请选择专业");
    return;
  } else if (!userYear.value) {
    Toast("请选择毕业年份");
    return;
  }
  return true;
};
const router = useRouter();
const show = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);
const show7 = ref(false);
const show8 = ref(false);
const value = ref("");
const onClickLeft1 = () => history.back();
const onCancel = () => {
  show2.value = false;
  show3.value = false;
  show4.value = false;
  show5.value = false;
  show6.value = false;
  show7.value = false;
  show8.value = false;
};
const to = (path: string) => {
  router.push(path);
};
</script>
<style lang="scss" scoped>
.person-box {
  position: relative;
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
  .overy-scoll {
    height: 100%;
    overflow-y: scroll;
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
  :deep(.van-field__label) {
    display: none;
  }
  :deep(.van-cell__title) {
    flex: none;
  }
  :deep(.van-cell) {
    justify-content: space-between;
  }
  .van-cell--center:after {
    right: 0;
    border-bottom: 0.4rem solid #ececec;
  }
  .overy-scoll {
    overflow-y: scroll;
  }
  .all-width {
    :deep(.van-cell__title) {
      width: 100%;
    }
  }
  :deep(.van-field) {
    padding: 0;
  }
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
.color-bl {
  color: #242424;
}
.fs-18 {
  font-size: 1.8rem;
}
.pb-20 {
  padding-bottom: 2rem;
}
.pb-25 {
  padding-bottom: 2.5rem;
}
.h-30 {
  width: 100%;
  height: 3.5rem;
}
</style>