<template>
  <div class="list-box">
    <van-nav-bar title="选择专业" left-text left-arrow @click-left="onClickLeft" />
    <div>
      <van-search v-model="value" placeholder="搜索专业" />
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" @click="checkMajor(item)" />
      </van-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useSaveStore } from "@/stores/majorChoice";
import { storeToRefs } from "pinia";
const { setMajor } = useSaveStore();
const onClickLeft = () => history.back();
const value = ref("");
const list: any = ref([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};
const checkMajor = (item: any) => {
  setMajor(item);
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