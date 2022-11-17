<template>
  <div class="edit-page">
    <van-nav-bar :title="title" left-text left-arrow @click-left="onClickLeft1" />
    <div>
      <div v-if="routeName=='education'">
        <van-cell title="学校" is-link to="schoolList">
          <template #value>
            请选择
          </template>
        </van-cell>
        <van-cell title="专业" is-link to="majorList">
          <template #value>
            请选择
          </template>
        </van-cell>
        <van-cell title="学位" is-link @click="show=true">
          <template #value>
            <div v-if="!education">请选择</div>
            <div v-else class="color-gray">{{education}}</div>
          </template>
        </van-cell>
        <van-cell title="入学时间" is-link>
          <template #value>
            请选择
          </template>
        </van-cell>
        <van-cell title="毕业时间" is-link>
          <template #value>
            请选择
          </template>
        </van-cell>
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
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useResumeStore } from "@/stores/resume";
const use=useResumeStore();
const route = useRoute();
console.log(route.query.editName);
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
//学历
const show=ref(false);
const education=ref('');
const educationValue=ref('')
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
//关闭弹层
const onCancel=()=>{
    show.value=false;
}
</script>
<style lang="scss" scoped>
.edit-page {
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
}
.color-gray{
    color: #6a6a6a;
}
</style>