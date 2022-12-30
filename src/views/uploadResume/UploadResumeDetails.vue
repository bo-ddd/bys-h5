<template>
  <div class="upload-page">
    <van-nav-bar title="上传简历" left-arrow @click-left="onClickLeft2" />
    <div class="content">
      <div class="content-head">支持pdf、doc、docx格式附件，大小不超过20M</div>
      <div class="content-body">
        <van-steps direction="vertical" :active="-1">
          <van-step>
            <h3>1.先将简历发送给文件传输助手或好友</h3>
            <div class="back back-img1 mt-10"></div>
          </van-step>
          <van-step>
            <h3 class="linheight-20">
              2.点击下方
              <span class="fw-700">立即上传</span>。找到刚才发送的对象，选择上传的简历。
            </h3>
            <div class="back back-img2 mt-10"></div>
          </van-step>
        </van-steps>
        <van-uploader class="upload-btn" accept=".pdf, .doc, .docx" :after-read="afterRead">
          <van-button type="primary" block>立即上传</van-button>
        </van-uploader>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { parseAssetFile } from "@/assets/util";
import { useResumeStore } from "@/stores/resume";
const use = useResumeStore();
const router = useRouter();
let onClickLeft2 = () => history.back();
const to = function (path: any) {
  router.push(path);
};
const afterRead = async (file: any) => {
  if (
    file.file.type == "application/pdf" ||
    file.file.type == "application/msword" ||
    file.file.type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    let formData = new FormData();
    formData.append("resumeName", file.file.name);
    formData.append("resume", file.file);

    let res = await use.addResume(formData);
    if (res.code == 200) {
      Toast.success("上传成功");
      to("/appendixResume");
    }
  } else {
    Toast("文件格式不正确");
  }
};
// const
</script>
<style lang="scss" scoped>
.upload-page {
  height: 100vh;
  display: grid;
  grid-template-rows: 4.6rem auto;
}
.content {
  height: calc(100vh - 4.6rem);
  box-sizing: border-box;
  &-head {
    background-color: #f2f3f6;
    font-size: 1.4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-body {
    height: calc(100% - 4rem);
    position: relative;
    box-sizing: border-box;
    padding: 2rem;
    .linheight-20 {
      line-height: 2rem;
    }
  }
  h3 {
    font-size: 1.8rem;
    font-weight: normal;
  }
  .back {
    height: 18rem;
    background-color: #f9fafe;
    background-repeat: no-repeat;
    background-size: 18rem 16rem;
    background-position: 50% 100%;
  }
  .back-img1 {
    background-image: url("@/assets/images/icon-course1.png");
  }
  .back-img2 {
    background-image: url("@/assets/images/icon-course2.png");
  }
  .upload-btn {
    position: absolute;
    bottom: 2rem;
    width: calc(100% - 4rem);
    :deep(.van-uploader__input-wrapper) {
      width: 100%;
    }
  }
}
:deep(.van-step) {
  color: black;
}
:deep(.van-step--vertical) {
  padding-right: 0;
}
:deep(.van-step--vertical .van-step__line) {
  width: 0.1rem;
}
.fw-700 {
  font-weight: 700;
}
</style>