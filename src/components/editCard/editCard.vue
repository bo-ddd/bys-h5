<template>
  <div class="infocard-box">
    <van-cell class="cell-bottom pad-25-15">
      <template #title>
        <div class="fs-20 color-black">{{title}}</div>
      </template>

      <template #right-icon>
        <img class="block wh-20" :src="parseAssetFile('icon-edit.png')" @click="to(path)"/>
      </template>
    </van-cell>
    <div class="pad-15">
      <div class="fs-16 hidden-font color-gray">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, toRefs } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{
  title: string;
  toPath?:any
}>();
const { title,toPath } = toRefs(props);
const to = function (toPath: any) {
  router.push({
    path: toPath.path,
    query: {
      editName:toPath.name
    }
    });
};
</script>
<style lang="scss" scoped>
.infocard-box {
  background-color: white;
  .cell-bottom:after {
    right: 0;
    border-bottom: 0.4rem solid #ececec;
  }
}
.line-1 {
  line-height: 1;
}
.mr-5 {
  margin-right: 0.5rem;
}
.plr-15 {
  padding: 0 1.5rem;
}
.pb-20 {
  padding-bottom: 2rem;
}
.pb-15 {
  padding-bottom: 1.5rem;
}
.pad-25-15 {
  padding: 2.5rem 1.5rem;
}
.fs-22 {
  font-size: 2.2rem;
}
.fs-20 {
  font-size: 2rem;
}
.fs-16 {
  font-size: 1.6rem;
}
.fs-18 {
  font-size: 1.8rem;
}
.fs-14 {
  font-size: 1.4rem;
}
.plr-15 {
  padding: 0 1.5rem;
}
.ptb-10 {
  padding: 1rem 0;
}
.pb-15 {
  padding-bottom: 1.5rem;
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
.wh-20 {
  width: 2rem;
  height: 2rem;
}
.block {
  display: block;
}
.pad-15 {
  padding: 1.5rem;
}
.hidden-font {
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分省略号 */
  word-break: break-all; /* break-all(允许在单词内换行。) */
  display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-line-clamp: 2; /* 显示的行数 */
  min-height: 2rem;
  max-height: 5rem; /* 设置最大高度，根据行高，要几行乘以几倍 */
}
</style>