<template>
  <div class="list-box">
    <van-nav-bar title="选择学校" left-arrow @click-left="onClickLeft" />
    <div>
      <van-search v-model="value" placeholder="搜索学校" />
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in schoolList" :key="item.schoolId" :title="item.schoolName" @click="checkSchool(item)" />
      </van-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useSchoolStore } from "@/stores/schoolChoice";
import { storeToRefs } from "pinia";
import { useResumeStore } from "@/stores/resume";
const use = useResumeStore();
const { setSchool } = useSchoolStore();
const onClickLeft = () => history.back();
const value = ref("");
const schoolList:any = ref([]);
const loading = ref(false);
const finished = ref(false);
const getSchoolList = function () {
  return use.getSchoolDrop({});
};
const onLoad = async () => {
  loading.value = false;
  let res = await getSchoolList();
  if (res.code == 200) {
    console.log(res);
    finished.value = true;
    schoolList.value=res.data;
  }
};
const checkSchool = (item: any) => {
  setSchool(item);
  history.back();
};
</script>
<style lang="scss" scoped>
.list-page {
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
}
</style>