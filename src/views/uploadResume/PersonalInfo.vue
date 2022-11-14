<template>
  <div class="person-box">
    <van-nav-bar title="基本信息" left-text left-arrow @click-left="onClickLeft1" />
    <div class="overy-scoll">
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
              <div class="fs-16 color-black">{{sex}}</div>
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
              <div class="fs-16 color-bl">{{day}}</div>
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
              <div class="fs-16 color-bl">{{ming}}</div>
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
              <div class="fs-16 color-bl">{{area}}</div>
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
              <div class="fs-16 color-bl">{{education}}</div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show6 = true">
          <template #title>
            <div class="fs-16 color-gray">最高学历的学校</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">{{education}}</div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
        <van-cell class="all-width pb-20" center @click="show7 = true">
          <template #title>
            <div class="fs-16 color-gray">最高学历的专业</div>
          </template>
          <template #label>
            <div class="just-between">
              <div class="fs-16 color-bl">{{education}}</div>
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
              <div class="fs-16 color-bl">2020</div>
              <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="selectSex"
    />

    <van-popup v-model:show="show2" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :formatter="formatter"
        @confirm="setDay"
        @cancel="cancelDay"
      />
    </van-popup>

    <van-popup v-model:show="show3" position="bottom" :style="{ height: '50%' }">
      <van-picker
        v-model="ming"
        title="标题"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="indexs"
      />
    </van-popup>

    <van-popup v-model:show="show4" position="bottom" :style="{ height: '50%' }">
      <van-picker
        swipe-duration="100"
        :show-toolbar="true"
        :columns="cityList"
        @cancel="onCancel"
        @confirm="selectArea"
        :columns-field-names="customFieldName"
      />
    </van-popup>

    <van-popup v-model:show="show5" position="bottom" :style="{ height: '50%' }">
      <van-picker
        :columns="columns"
        :default-index="indexs2"
        @confirm="selectEducation"
        @cancel="onCancel"
      />
    </van-popup>
    <van-popup v-model:show="show8" position="bottom" :style="{ height: '50%' }">
      <van-picker
        :columns="yearList"
        :default-index="indexs3"
        @confirm="selectYear"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import { parseAssetFile } from "@/assets/util";
import { ref } from "vue";
import { Toast } from "vant";
const show = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);
const show7 = ref(false);
const show8 = ref(false);
const sex = ref("男");
const day = ref("2020-11-1");
const ming = ref("汉族");
const area = ref("山西省-临汾市-洪洞县");
const education = ref("博士");
const actions = [{ name: "男" }, { name: "女" }];
const value = ref("");
const onClickLeft1 = () => history.back();
const selectSex = (item: { name: string }) => {
  sex.value = item.name;
};
const setDay = (value: any) => {
  day.value = value.toLocaleDateString().replace(/\//g, "-");
  show2.value = false;
};
const cancelDay = () => {
  show2.value = false;
};
const selectEducation=(value:any)=>{
    education.value=value;
    show5.value=false
}
const currentDate = ref(new Date(2021, 0, 17));
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
const educationList = [
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
const yearList=[
    2000,2001,2002
]
const selectYear=(value:any)=>{
    show8.value=false
}
const selectArea=(value:any)=>{

}
const customFieldName = {
  text: "cityName",
  children: "cities",
};
const indexs = ref(0);
const indexs2 = ref(0);
const indexs3 = ref(0);
const onConfirm = (value: any, index: any) => {
  Toast(`当前值: ${value}, 当前索引: ${index}`);
  ming.value = value;
  show3.value = false;
  indexs.value = index;
};
const onCancel2 = () => Toast("取消");
const onCancel=()=>{
    show2.value=false
    show3.value=false
    show4.value=false
    show5.value=false
    show6.value=false
    show7.value=false
    show8.value=false
}
</script>
<style lang="scss" scoped>
.person-box {
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
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
</style>