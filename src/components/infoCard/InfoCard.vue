<template>
  <div class="infocard-box">
    <van-cell class="cell-bottom pad-25-15">
      <template #title>
        <div class="fs-20 color-black">{{title}}</div>
      </template>

      <template #right-icon>
        <!-- <van-icon name="search"/> -->
        <van-icon @click="to(toPath)" name="add-o" class="search-icon" size="2rem" />
      </template>
    </van-cell>
    <div class="plr-15">
      <van-cell class="ptb-10" is-link>
        <template #title>
          <div class="fs-18">北京航空航天大学</div>
          <div class="fs-14 color-gray">大专-海警执法</div>
        </template>

        <template #right-icon>
          <!-- <van-icon name="search"/> -->
          <div class="align-start">
            <div class="align-center">
              <div class="fs-14 color-gr mr-5">2018.09-2021.06</div>
              <van-icon name="arrow" class="search-icon" size="1.6rem" color="#979797" />
            </div>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="plr-15 pb-15 fs-16 color-gray">发到你</div>
    <div class="plr-15 pb-15 fs-16 color-gray">发到你</div>
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
</style>