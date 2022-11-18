<template>
  <div class="edit-page">
    <van-nav-bar title="编辑简历" left-arrow @click-left="onClickLeft1" />
    <div class="edit-body overy-scoll">
      <van-cell-group>
        <van-field
          class="textArea"
          v-model="message"
          rows="1"
          autosize
          :label="titleName"
          type="textarea"
          maxlength="500"
          :placeholder="'请填写'+titleName"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="foot-box">
      <div class="btn-box">
        <van-button type="primary" block>保存</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const titleName = ref("");
const message = ref("");
onMounted(() => {
  console.log(route);

  const routeName = route.query.editName;
  if (routeName == "campus") {
    titleName.value = "校园实践";
  } else if (routeName == "skill") {
    titleName.value = "专业技能";
  } else if (routeName == "prize") {
    titleName.value = "获奖情况";
  } else if (routeName == "interest") {
    titleName.value = "兴趣爱好";
  }
});
const onClickLeft1 = () => history.back();
</script>
<style lang="scss" scoped>
.edit-page {
  height: 100vh;
  background-color: #f7f8fa;
  display: grid;
  grid-template-rows: 4.6rem auto;
  .overy-scoll {
    overflow-y: scroll;
  }
  .edit-body {
    background-color: #fff;
  }
  .textArea {
    flex-direction: column;
    :deep(.van-field__control)::placeholder {
      font-size: 1.2rem;
    }
    :deep(.van-field__control) {
    }
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
}
</style>