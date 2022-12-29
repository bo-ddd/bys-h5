<template>
  <van-cell class="all-width pb-20" center @click="show = true">
    <template #title>
      <div class="fs-16 color-gray">性别</div>
    </template>
    <template #label>
      <div class="just-between">
        <div class="fs-16 color-black">
          <span v-if="select">{{select}}</span>
          <span class="color-gr" v-else>{{placeholder}}</span>
        </div>
        <van-icon name="arrow" class="search-icon mt-10" size="1.8rem" color="#c9c9c9" />
      </div>
    </template>
  </van-cell>
  <van-action-sheet
    v-model:show="show"
    :actions="dataList"
    cancel-text="取消"
    close-on-click-action
    @select="onSelect"
    @cancel="onCancel"
  />
</template>
<script lang="ts" setup>
import { ref, toRef } from "vue";
import {  Toast } from "vant";
import type { ActionSheetAction } from "vant";
const show = ref(false);
const props = defineProps<{
  dataList: ActionSheetAction[];
  select: string;
  placeholder:string
}>();

interface sex{
  name:'男'|'女',
  value:number
}

const { dataList,placeholder } = props;
const select = toRef(props, "select");
console.log(props);
const emit  = defineEmits(['onSelect']);

const onSelect = (item:sex) => {
  show.value = false;
  emit('onSelect',item)
};
const onCancel = () => {
  show.value = false;
};
</script>
<style scoped lang="scss">
.all-width {
  :deep(.van-cell__title) {
    width: 100%;
  }
}
.van-cell--center:after {
  right: 0;
  border-bottom: 0.4rem solid #ececec;
}
.pb-20 {
  padding-bottom: 2rem;
}
.color-black{
  color: black;
}
.color-gray {
  color: #666666;
}
.color-gr {
  color: #c9c9c9;
}
</style>