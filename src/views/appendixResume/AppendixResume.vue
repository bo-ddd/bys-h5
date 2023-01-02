<template>
  <div class="append-page">
    <van-nav-bar title="附件简历" left-arrow @click-left="onClickLeft" />
    <div class="content overy-scoll">
      <div v-if="resumeList.length==0">
        <img class="mt-80 img" :src="parseAssetFile('file-tip.png')" />
        <div class="mt-20 text-center fs-16 fw-700">您还没有附件简历,请点击下方按钮上传</div>
        <div class="mt-10 text-center fs-14 color-gray">最多可上传3份简历</div>
      </div>
      <div v-else>
        <div class="head-tip">最多可以上传3份简历 ( pdf,doc,docx类型 )</div>
        <div class="list mt-10">
          <div
            class="item ptb-20 bord-bottom-gray just-between"
            v-for="item in resumeList"
            :key="item.resumeId"
          >
            <div class="align-center gap-10">
              <div>
                <img v-if="item.resumeType=='pdf'" src="@/assets/images/icon-pdf.png" />
                <img v-else-if="item.resumeType=='doc'" src="@/assets/images/icon-doc.png" />
                <img v-else-if="item.resumeType=='docx'" src="@/assets/images/icon-doc.png" />
                <img v-else src="@/assets/images/icon-doc.png" />
              </div>
              <div>
                <div class="title fs-16">{{item.resumeName}}</div>
                <div class="tip">{{item.modifyTime}}</div>
              </div>
            </div>
            <div>
              <van-icon name="ellipsis" size="1.6rem" @click="showDeleteOption(item.resumeId)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-box">
      <van-uploader
        v-if="resumeList.length<3"
        class="upload-btn"
        :after-read="afterRead"
        accept=".pdf, .doc, .docx"
      >
        <van-button type="primary">上传附件简历</van-button>
      </van-uploader>
      <van-button v-else class="upload-btn" @click="updateResume" type="primary">上传附件简历</van-button>
    </div>
    <van-action-sheet
      v-model:show="deleteShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="deleteRemuse"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Dialog, Toast } from "vant";
import { useRouter } from "vue-router";
import { parseAssetFile } from "@/assets/util";
import { useResumeStore } from "@/stores/resume";
const use = useResumeStore();
const router = useRouter();
const resumeList: any = ref([]);
const resumeId = ref(0);
const deleteShow = ref(false);
const actions = [{ name: "删除简历", color: "#ee0a24" }];

const onClickLeft = () => {
  to("/mine");
};
const to = function (path: any) {
  router.push(path);
};
const getResumeList = async function () {
  let res = await use.selectResume({});
  if (res.code == 200) {
    resumeList.value = res.data.filter((item: any) => item.isOnline == false);
  }
};
const showDeleteOption = function (id: number) {
  deleteShow.value = true;
  resumeId.value = id;
};

const afterRead = async (file: any) => {
  if (
    file.file.type !== "application/pdf" ||
    file.file.type !== "application/msword" ||
    file.file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    Toast("文件格式不正确");
  } else if (file.file.size > 20 * 1024 * 1024) {
    Toast("文件不能超过20MB");
  } else {
    let formData = new FormData();
    formData.append("resumeName", file.file.name);
    formData.append("resume", file.file);
    let res = await use.addResume(formData);
    if (res.code == 200) {
      Toast.success("上传成功");
      getResumeList();
    } else {
      Toast.fail(res.msg);
    }
  }
};
const deleteRemuse = function () {
  Dialog.confirm({
    title: "提示",
    message: "确认删除此份附件简历？",
    confirmButtonColor: "#3b81fb",
  })
    .then(async () => {
      deleteRemuseApi();
    })
    .catch(() => {});
};
const deleteRemuseApi = async function () {
  let res = await use.delResume({
    resumeId: resumeId.value,
  });
  if (res.code == 200) {
    getResumeList();
    Toast.success("删除成功");
  } else {
    Toast.fail("删除失败");
  }
};
const updateResume = function () {
  Dialog.alert({
    title: "提示",
    message: "最多只能保留3份附件简历。如需删除简历请点击右侧···",
    confirmButtonColor: "#3b81fb",
  }).then(() => {});
  return false;
};
getResumeList();
</script>
<style lang="scss" scoped>
.append-page {
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: 4.6rem auto;
  .overy-scoll {
    height: 100%;
    overflow-y: scroll;
  }

  .foot-box {
    width: 100%;
    position: fixed;
    bottom: 2rem;
    padding: 0 2rem;
    // }
    .upload-btn {
      width: calc(100% - 4rem);
      .van-uploader__wrapper {
        width: 100%;
      }
      :deep(.van-uploader__input-wrapper) {
        width: 100%;
      }
      :deep(.van-button--normal) {
        width: 100%;
      }
    }
  }
}
.flex-noshrink {
  flex-shrink: 0;
  height: 100%;
}
.content {
  box-sizing: border-box;
  padding: 2rem;
  height: calc(100vh - 4.6rem);
  .head-tip {
    color: #a9a9ab;
  }
  .list {
    .item {
      border-bottom: 0.2rem solid #e7e9ee;
      img {
        width: 3rem;
        object-fit: cover;
      }
      .title {
        font-size: 1.6rem;
        font-weight: 600;
      }
      .tip {
        font-size: 0.8rem;
        color: #7d7e80;
      }
    }
  }
  .ellipse-border {
    display: inline-block;
    // height: 1rem;
    box-sizing: border-box;
    border: 0.1rem solid #3b80fb;
    color: #3b80fb;
    border-radius: 1.2rem;
    padding: 0 0.8rem;
    font-size: 1.2rem;
  }
  .circle-border {
    width: 4rem;
    height: 4rem;
    box-sizing: border-box;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
      display: block;
    }
  }
  .blue-border {
    border: 0.1rem solid #347cfe;
  }
  .green-border {
    border: 0.1rem solid #4cba42;
  }
  .img {
    width: 15rem;
    height: 13rem;
    display: block;
    margin: 0 auto;
  }
  .fw-700 {
    font-weight: 700;
  }
  .color-gray {
    color: gray;
  }
  .text-center {
    text-align: center;
  }

  .fs-14 {
    font-size: 1.4rem;
  }
  .fs-20 {
    font-size: 2rem;
  }
  .mt-20 {
    margin-top: 2rem;
  }
  .mt-30 {
    margin-top: 3rem;
  }
  .mt-80 {
    margin-top: 8rem;
  }
  .fs-18 {
    font-size: 1.8rem;
  }
  .mr-10 {
    margin-right: 1rem;
  }
  .ptb-20 {
    padding: 2rem 0;
  }
  .gap-10 {
    gap: 1rem;
  }
}
</style>