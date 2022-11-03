<template>
  <div class="">
    <!-- 头部 -->
    <header class="wrap header c-ffffff">
      <div class="container just-between ">
        <div class="title">
          <p class="fs-22 fw-600">请创建简历</p>
          <span class="fs-12">点击头像可编辑</span>
        </div>
        <div class="upload flex-ja-center">
          <img class="icon-camera" src="@/assets/images/icon-camera.png" alt="">
        </div>
      </div>
    </header>
    <!-- list -->
    <main>
      <van-cell center :border="false" class="mt-20" v-for="item in list"
       :key="item.id" :value="item.value" is-link :to="item.link">
        <template #title>
          <van-icon :name="parseAssetFile(item.icon)" />
          <span class="custom-title">{{item.title}}</span>
        </template>
      </van-cell>
    </main>
    <footer>
      <div class="container">
        <p class="fs-14 ">不想错过面试邀请和投递反馈</p>
        <p class="fs-16 fw-600 ">请关注公众号</p>
        <van-button class="btn mt-10" round color="#3472e1"  size="mini" type="success">去关注</van-button>
      </div>
      <div class="footer pd-tb_43 flex-ja-center">
        <van-button class="btn fs-14 " size="mini" >退出登录</van-button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { parseAssetFile } from '@/assets/util';

let list = [
  {
    id:1,
    title:'请创建简历',
    value:'',
    link:'/createResume',
    icon:'icon-resume.png',
  },
  {
    id:2,
    title:'附件简历',
    value:'上传附件简历/作品集',
    link:'/appendixResume',
    icon:'icon-file.png',
  },
  {
    id:3,
    title:'职业测评',
    value:'',
    link:'/evaluation',
    icon:'icon-occupation.png',
  },
  {
    id:4,
    title:'投递反馈',
    value:'',
    link:'/deliveryfeedback',
    icon:'icon-delivery.png',
  },
  {
    id:5,
    title:'我的收藏',
    value:'',
    link:'/collection',
    icon:'icon-collection.png',
  },
  {
    id:6,
    title:'我的面试',
    value:'',
    link:'/inter',
    icon:'icon-interview.png',
  },
  {
    id:7,
    title:'求职状态',
    value:'',
    link:'/jobStatus',
    icon:'icon-job.png',
  },
  {
    id:8,
    title:'意见反馈',
    value:'',
    link:'/feedBack',
    icon:'icon-opinion.png',
  },
  {
    id:9,
    title:'站点设置',
    value:'',
    link:'/siteSettings',
    icon:'icon-site.png',
  },
]

</script>
  
<style lang="scss" scoped>

:deep(.van-cell__title){
  display: flex;
  align-items: center;
  gap: 1.8rem;
}
.header {
  background-color: #3472e1;

  .container {
    padding: 2.8rem 0;
  }

  .upload {
    $size: 5.6rem;
    background-color: #ffffff;
    width: $size;
    height: $size;
    border-radius: $size;

    .icon-camera {
      width: 2.6rem;
    }
  }
}
footer{
  .container{
    padding: 2.4rem;
    background: url(@/assets/images/banner-mine.png) no-repeat;
    background-size: 100%;
    .btn{
      padding: .5rem 1rem;
    }
  }
  .footer{
    .btn{
      border: 0;
    }
  }
}
</style>
  