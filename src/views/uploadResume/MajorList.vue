<template>
  <div class="list-box">
    <van-nav-bar title="选择专业" left-arrow @click-left="onClickLeft" />
    <div>
      <van-search @update:model-value="search"  v-model="majorName" placeholder="搜索专业" />
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in majorList" :key="item.professionalId" :title="item.professionalName" @click="checkMajor(item)" />
      </van-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useMajorStore } from "@/stores/majorChoice";
import { useResumeStore } from "@/stores/resume";
const use = useResumeStore();
const { setMajor } = useMajorStore();
const onClickLeft = () => history.back();

//搜索专业-------------------
const majorName = ref("");
const search = async function (value:string) {

  let res = await use.seachProfessinal({
    str: value,
  });
  if (res.code == 200) {
    majorList.value = res.data;
    
  }
};

const loading = ref(false);
const finished = ref(false);
const majorList:any=ref([])
const getMajorList = function () {
  return use.getProfessionalDrop({});
};
const onLoad = async() => { 
  loading.value = false;
  const res = await getMajorList();
  if (res.code == 200) {
    finished.value = true;
    majorList.value=res.data;
  }
};
const checkMajor = (item: any) => {
  setMajor({
    name:item.professionalName,
    value:item.professionalId
  });
  history.back()
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