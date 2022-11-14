<template>
  <div class="">
    <!-- 头部 -->
    <header class="wrap header c-ffffff" @click="showCount = true">
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

    <van-popup v-model:show="showCount" closeable  round :style="{ height: '25%', width: '80%' }">
      <div class="show-count_box">
        <div class="show-wrap">
          <div>
            <h1>登录毕业申</h1>
          </div>
          <div>
            <van-button type="primary" class="ft">微信账号快捷登录</van-button>
          </div>
          <div class="c-747474" @click="jump('login')">手机号码验证登录</div>
        </div>
      </div>
    </van-popup>
    <!-- list -->
    <main>
      <van-cell center :border="false" class="mt-20 fs-16" v-for="item in list" :key="item.id" :value="item.value" is-link
        :to="item.link">
        <!-- 正常跳转页面的模板 -->
        <template #title v-if="!item.ispopup">
          <van-icon :name="parseAssetFile(item.icon)" />
          <span class="custom-title">{{ item.title }}</span>
        </template>
        <!-- 点击求职状态弹层的模板-------------------------- -->
        <template #title v-else>
          <div @click="showPopup">
            <div class="van-cell__title">
              <van-icon :name="parseAssetFile(item.icon)" />
              <span class="custom-title">{{ item.title }}</span>
            </div>
          </div>
        </template>
        <!-- 动态修改value描述的模板 -->
        <template #value v-if="item.ispopup">
          <span @click="showPopup">{{ popupText }}</span>
        </template>
        <!-- 求职状态结束------------------------- -->
      </van-cell>
      <!-- 弹层组件 -->
      <van-popup position="bottom" :style="{ height: '50%' }" v-model:show="show">
        <van-picker :columns="popupData" @cancel="cancel" @confirm="onConfirm" />
      </van-popup>
    </main>
    <footer>
      <div class="container">
        <p class="fs-14 ">不想错过面试邀请和投递反馈</p>
        <p class="fs-16 fw-600 ">请关注公众号</p>
        <van-button class="btn mt-10" round color="#3472e1" size="mini" type="success">去关注</van-button>
      </div>
      <div class="footer flex-ja-center">
        <van-button class="btn fs-14 " size="mini">退出登录</van-button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { parseAssetFile } from '@/assets/util';
import { ref } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
let router = useRouter();
const showCount = ref(false);
let list = [
  {
    id: 1,
    title: '请创建简历',
    value: '',
    link: '/createResume',
    icon: 'icon-resume.png',
    ispopup: false,
  },
  {
    id: 2,
    title: '附件简历',
    value: '上传附件简历/作品集',
    link: '/appendixResume',
    icon: 'icon-file.png',
    ispopup: false,
  },
  {
    id: 3,
    title: '职业测评',
    value: '',
    link: '/evaluation',
    icon: 'icon-occupation.png',
    ispopup: false,
  },
  {
    id: 4,
    title: '投递反馈',
    value: '',
    link: '/deliveryfeedback',
    icon: 'icon-delivery.png',
    ispopup: false,
  },
  {
    id: 5,
    title: '我的收藏',
    value: '',
    link: '/collection',
    icon: 'icon-collection.png',
    ispopup: false,
  },
  {
    id: 6,
    title: '我的面试',
    value: '',
    link: '/inter',
    icon: 'icon-interview.png',
    ispopup: false,
  },
  {
    id: 7,
    title: '求职状态',
    value: '',
    // link:'/jobStatus',
    icon: 'icon-job.png',
    ispopup: true,
  },
  {
    id: 8,
    title: '意见反馈',
    value: '',
    link: '/feedBack',
    icon: 'icon-opinion.png',
    ispopup: false,
  },
  {
    id: 9,
    title: '站点设置',
    value: '',
    link: '/siteSettings',
    icon: 'icon-site.png',
    ispopup: false,
  },
]

// popup 逻辑
const show = ref(false);
// popup 选择的值
const popupText = ref('');
const showPopup = () => show.value = true;
// popup 数据
let popupData = ['积极求职中', '已有Offer，停止求职', '没有Offer，暂不求职']
// popup 左上角 x 号事件
const cancel = () => {
  show.value = false;
};
// popup 右上角确定事件
const onConfirm = (value: any) => {
  Toast('求职状态修改成功');
  popupText.value = value;
  show.value = false;
};

let jump = (src:string)=>{
  router.push({path:src})
}
</script>
  
<style lang="scss" scoped>
:deep(.van-cell__title) {
  display: flex;
  align-items: center;
  gap: 1.8rem;
}

.show-count_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .show-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    h1{
      font-weight: 500;
    }
    .ft{
      font-size: 1.8rem;
    }
  }
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

footer {
  .container {
    padding: 2.4rem;
    background: url(@/assets/images/banner-mine.png) no-repeat;
    background-size: 100%;

    .btn {
      padding: .5rem 1rem;
    }
  }

  .footer {
    padding: 20px 0 80px;

    .btn {
      border: 0;
    }
  }
}

.popup-header {
  padding: 1rem 1.4rem 3rem 1.4rem;

  &>.dialog {
    color: #cccccc;
    font-size: 1.5rem;
  }

  &>.popupIsok {
    color: #427de3;
    font-size: 1.5rem;
  }
}
</style>
  