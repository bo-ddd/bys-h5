<template>
  <div class="person-box">
    <van-nav-bar title="基本信息" left-text left-arrow @click-left="onClickLeft1" />
    <div ref="scrollRef" class="overy-scoll">
      <van-cell-group>
        <van-cell center title="单元格" label="描述信息">
          <template #title>
            <div class="fs-18">头像</div>
          </template>
          <template #label>
            <div class="fs-14 mt-10">上传真实头像通过Hr初筛率更高</div>
          </template>
          <template #value>
            <img class="img-10" :src="parseAssetFile('icon-avater1.png')" alt />
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center>
          <template #title>
            <div class="fs-16 color-gray">姓名</div>
          </template>
          <template #label>
            <van-field class="fs-16" clearable v-model="value" label="文本" placeholder="请填写真实姓名" />
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center>
          <template #title>
            <div class="fs-16 color-gray">联系邮箱</div>
          </template>
          <template #label>
            <van-field class="fs-16" clearable v-model="value" label="文本" placeholder="请输入邮箱" />
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show = true">
          <template #title>
            <div class="fs-16 color-gray">性别</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-black">
                <span v-if="sex">{{sex}}</span>
                <span class="color-gr" v-else>请填写性别</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show2 = true">
          <template #title>
            <div class="fs-16 color-gray">出生年月</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="day">{{day}}</span>
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
                <span v-if="nation">{{nation}}</span>
                <span class="color-gr" v-else>请填写民族</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show4 = true">
          <template #title>
            <div class="fs-16 color-gray">生源地</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">
                <span v-if="area">{{area}}</span>
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
                <span v-if="education">{{education}}</span>
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
                <span v-if="school">{{school}}</span>
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
                <span v-if="major">{{major}}</span>
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
                <span v-if="year">{{year}}</span>
                <span class="color-gr" v-else>选择毕业年份</span>
              </div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center >
        </van-cell>
      </van-cell-group>
      <div class="h-30">
      </div>
    </div>

    <div class="foot-box">
      <div class="btn-box">
      <van-button type="primary" block>保存</van-button>
      </div>
    </div>
    <!-- 性别弹框 -->
    <van-action-sheet
      v-model:show="show"
      :actions="sexList"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="selectSex"
    />
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
        v-model="nation"
        :columns="nationList"
        @confirm="setNation"
        @cancel="onCancel"
        :default-index="indexs"
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
import { onMounted, reactive, ref,onDeactivated,onActivated,nextTick } from "vue";
import { useRouter,useRoute,onBeforeRouteLeave,onBeforeRouteUpdate } from "vue-router";
import { Toast } from "vant";
import { storeToRefs } from "pinia";
import { useSchoolStore } from "@/stores/schoolChoice";
import { useMajorStore } from "@/stores/majorChoice";
import { useResumeStore } from "@/stores/resume";
const use = useResumeStore();

const route = useRoute();
const scrollRef:any = ref(null);
const scrollTop = ref(0);

onActivated(()=>{
  console.log('回啦');
  
  // nextTick(()=>{
  //   console.log('上次的值'+scrollTop.value);
    
  //   scrollRef.value.scrollTop = scrollTop.value;
  //   console.log('进入位置'+scrollRef.value.scrollTop);
    
  // })
})
onBeforeRouteUpdate((to,from,next)=>{
//   if(from.name!='resumeDetails'){
//     to.meta.isKeepAlive=true
//   }else{
//     to.meta.isKeepAlive=false
//   }

  next()
})
onBeforeRouteLeave((to, from, next)=>{
  // scrollTop.value = scrollRef.value.scrollTop;
  // console.log('离开时位置：'+scrollRef.value.scrollTop);
  // console.log(from);
  // if(to.name=="resumeDetails"){
  //   to.meta.isKeepAlive=true;
  //   console.log(to.meta.isKeepAlive);
  // }
  // from.meta.isKeepAlive=false;

  // if(true){
    next()
  // }
})
onMounted(() => {
  console.log(route);
  
  if(route.meta.isKeepAlive) return
  gerSexList();
  gerNationList();
  getEducationrList();
});
onActivated(()=>{
  // console.log('回啦');
})
// 性别
const sexList = reactive([]);
const sex = ref("");
const sexValue = ref("");
const selectSex = (item: { name: string; value: any }) => {
  sex.value = item.name;
  sexValue.value = item.value;
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
const day = ref("");
const setDay = (value: any) => {
  day.value = value.toLocaleDateString().replace(/\//g, "-");
  show2.value = false;
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
//民族
const nation = ref("");
const nationValue = ref("");
const nationList = ref([]);
const customFieldName = {
  text: "label",
  value: "value",
};
const gerNationList = async function () {
  let res = await use.getNationalDrop({});
  if (res.code == 200) {
    console.log(res);
    nationList.value = res.data;
  }
};
const setNation = (item: any) => {
  console.log(value);
  nation.value = item.label;
  nationValue.value = item.value;
  show3.value = false;
};
//生源地
const area = ref("山西省-临汾市-洪洞县");
const areaRole = {
  text: "label",
  // value: "label",
  children: "children",
};
const selectArea = (value: any) => {
  console.log(value);

  area.value = value[0].label + "-" + value[1].label + "-" + value[2].label;
  show4.value = false;
};
//学历
const education: any = ref("");
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
  education.value = item.label;
  educationValue.value = item.value;
  show5.value = false;
};
//年份
const year = ref("");
const major = ref("");
const yearList = [
  1990, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027,
  2028, 2029, 2030,
];
const selectYear = (value: any) => {
  show8.value = false;
  year.value = value;
};
const { selectSchool } = storeToRefs(useSchoolStore());
const { selectMajor } = storeToRefs(useMajorStore());
const router = useRouter();
const show = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);
const show7 = ref(false);
const show8 = ref(false);
// const education = ref("博士");
// const actions = [{ name: "男" }, { name: "女" }];
const school: any = ref("");

school.value = selectSchool.value;
// major.value = selectMajor.value;
const value = ref("");
const onClickLeft1 = () => history.back();

const columns = [
  "杭州",
  "宁波",
  "温州",
  "绍兴",
  "湖州",
  "嘉兴",
  "金华",
  "汉族",
];
const cityList = [
  {
    cityName: "浙江",
    cities: [
      {
        cityName: "杭州",
        cities: [{ cityName: "西湖区" }, { cityName: "余杭区" }],
      },
      {
        cityName: "温州",
        cities: [{ cityName: "鹿城区" }, { cityName: "瓯海区" }],
      },
    ],
  },
  {
    cityName: "福建",
    cities: [
      {
        cityName: "福州",
        cities: [{ cityName: "鼓楼区" }, { cityName: "台江区" }],
      },
      {
        cityName: "厦门",
        cities: [{ cityName: "思明区" }, { cityName: "海沧区" }],
      },
    ],
  },
];

const indexs = ref(0);
const indexs2 = ref(0);
const indexs3 = ref(0);
const onConfirm = (value: any, index: any) => {
  Toast(`当前值: ${value}, 当前索引: ${index}`);
  nation.value = value;
  show3.value = false;
  indexs.value = index;
};
const onCancel2 = () => Toast("取消");
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
  .overy-scoll{
    height: 100%;
    overflow-y: scroll;
  }
  .foot-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    .btn-box{
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      padding:0 1rem 1rem 1rem;
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
.img-10 {
  width: 8rem;
  height: 8rem;
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
.h-30{  
  width: 100%;
  height: 3.5rem;
}
</style>