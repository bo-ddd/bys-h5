<template>
  <van-uploader class="upload" accept="image/png, image/jpeg" :after-read="afterRead">
    <van-cell class="upload-cell" center>
      <template #title>
        <div class="fs-18">头像</div>
      </template>
      <template #label>
        <div class="fs-14 mt-10">上传真实头像通过Hr初筛率更高</div>
      </template>
      <template #value>
        <img class="img-8 bord-rad-100" :src="avaterImg||parseAssetFile('icon-avater1.png')" />
      </template>
    </van-cell>
  </van-uploader>
</template>
<script lang="ts" setup>
import { useResumeStore } from "@/stores/resume";
import { parseAssetFile } from "@/assets/util";
import { toRef } from "vue";
import { Toast } from "vant";
let props = defineProps<{
  avaterImg: string;
}>();
const use = useResumeStore();
const avaterImg = toRef(props, "avaterImg");
const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  if(file.file.type=='image/jpeg'||file.file.type=='image/png'){
    uploadAvater(file.file);
  }else{
    Toast('图片格式不正确')
  }
};
const uploadAvater = async function (file: any) {
  let formData = new FormData();
  formData.append("userId", "10000");
  formData.append("userLogo", file);
  console.log(formData);

  const res = await use.updateLogo(formData);
  if (res.code == 200) {
    success(res.data);
  }
};
const emit  = defineEmits(['success']);

const success=(img:string)=>{
  //传递给父组件
  emit('success',img)
}
</script>
<style scoped lang="scss">
.upload {
  display: block;
  :deep(.van-uploader__wrapper) {
    display: block;
  }
  .upload-cell {
    padding: 1.4rem 1.6rem;
    :deep(.van-uploader__upload) {
      margin: 0;
      border-radius: 100%;
      overflow: hidden;
    }
    :deep(.van-uploader__preview) {
      margin: 0;
      border-radius: 100%;
      overflow: hidden;
    }
    :deep(.van-cell__value) {
      line-height: 0;
    }
  }
}
.van-cell--center:after {
  right: 0;
  border-bottom: 0.4rem solid #ececec;
}
.fs-18 {
  font-size: 1.8rem;
}

.img-8 {
  width: 8rem;
  height: 8rem;
}
.bord-rad-100 {
  border-radius: 100%;
}
</style>
