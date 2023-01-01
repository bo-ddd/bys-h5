<template>
  <van-uploader class="upload" accept="image/png, image/jpeg" :after-read="afterRead">
    <van-cell class="upload-cell" center>
      <template #title>
        <div class="fs-18">头像{{a}}</div>
      </template>
      <template #label>
        <div class="fs-14 mt-10">{{b}}</div>
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
import { toRef, ref } from "vue";
import { Toast } from "vant";
let props = defineProps<{
  avaterImg: string;
}>();
const a = ref("");
const b = ref("");
const use = useResumeStore();
const avaterImg = toRef(props, "avaterImg");
const afterRead = (file: any) => {
  Toast(file.file.type);
  a.value = file.file.size;
  // 此时可以自行将文件上传至服务器
  const imageformat = /image\/(png|jpg|jpeg)$/;
  if (imageformat.test(file.file.type)) {
    console.log(file.file);
    compressImage(file.file).then((res) => {
      console.log(res);
      b.value = res.compressFile.size;

      uploadAvater(res.compressFile);
    });
  } else {
    Toast("图片格式不正确");
  }
};
const uploadAvater = async function (file: any) {
  let formData = new FormData();
  formData.append("userLogo", file);
  const res = await use.updateLogo(formData);

  if (res.code == 200) {
    success(res.data);
  }
};
const emit = defineEmits(["success"]);

const success = (img: string) => {
  //传递给父组件
  emit("success", img);
};
const compressImage = (file) => {
  // 参数file,是通过input 选择本地文件获取的
  return new Promise((resolve, reject) => {
    const { type, name, size } = file;
    let img = new Image();
    let reader = new FileReader();

    // 读取拿到的文件
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // 文件加载成功后去转成Img对象，为了拿到图片的原始宽高
      img.src = e.target.result;
      img.onload = () => {
        // 创建画布canvas
        let canvas = document.createElement("canvas");
        let content = canvas.getContext("2d");

        // 设置画布的宽高
        canvas.width = img.width; // 需要压缩到的图片宽度
        canvas.height = img.width * (img.height / img.width);

        // 将图片画在画布上
        content.drawImage(img, 0, 0, canvas.width, canvas.height);

        //画布转成blob格式的图片
        canvas.toBlob(
          (blob) => {
            // blob 格式的图片 转成file对象，这里主要看接口支不支持blob格式的文件上传，如果支持就没有必要转
            let file = new File([blob], name, { type: type, size: size });
            resolve({ type: type, compressFile: file });
          },
          `image/${type.split("/")[1]}`,
          0.5
        ); // 0.7 是文件压缩程度
      };
    };
  });
};
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
