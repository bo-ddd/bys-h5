<template>
  <div class="">
    <!-- 头部 -->
    <header class="wrap header c-ffffff" @click="token ? jump('personalInfo') : showCount = true">
      <div class="container just-between ">
        <div class="title" v-if="token && !isUserInfoData">
          <p class="fs-22 fw-600"><span>请创建简历</span></p>
          <span class="fs-12"><span>点击头像可编辑</span></span>
        </div>
        <div class="title" v-else-if="!token">
          <p class="fs-22 fw-600"><span>未登录/注册</span></p>
          <span class="fs-12"><span>点击头像可进行登录/注册</span></span>
        </div>
        <div class="title" v-else-if="token && isUserInfoData">
          <p class="fs-22 fw-600"><span>{{ userInfo.userName }}</span></p>
          <span class="fs-12"><span>{{ userInfo.userSchoolName }}/{{ userInfo.userEducation }}/{{
    userInfo.userProfessionalName
}}</span></span>
        </div>
        <div class="upload flex-ja-center">
          <img v-if="!token || !isUserInfoData" class="icon-camera" src="@/assets/images/icon-camera.png" alt="">
          <img v-else class="icon-user" :src="userInfo.userLogoUrl" alt="">
        </div>
      </div>
    </header>

    <van-popup v-model:show="showCount" closeable round :style="{ height: '25%', width: '80%' }">
      <div class="show-count_box">
        <div class="show-wrap">
          <div>
            <h1>登录毕业申</h1>
          </div>
          <div>
            <van-button type="primary" class="ft" @click="jump('login')">手机号码验证登录</van-button>
          </div>
          <div class="c-747474" @click="wxLogin()">微信账号快捷登录</div>
        </div>
      </div>
    </van-popup>
    <!-- list -->
    <main>
      <van-cell center :border="false" class="mt-20 fs-16" v-for="item in list" :key="item.id" :value="item.value"
        @click="isLogin(item)">

        <template #title v-if="item.id == 1">
          <van-icon :name="parseAssetFile(item.icon)" />
          <span v-if="!token" class="custom-title">在线简历</span>
          <span v-else-if="token && !isUserInfoData" class="custom-title">请创建简历</span>
          <span v-else-if="token && isUserInfoData" class="custom-title">在线简历</span>
        </template>


        <!-- 正常跳转页面的模板 -->
        <template #title v-if="!item.ispopup">
          <van-icon :name="parseAssetFile(item.icon)" />
          <span class="custom-title">{{ item.title }}</span>
        </template>

        <!-- 点击求职状态弹层的模板-------------------------- -->
        <template #title v-show="item.id == 7">
          <div class="van-cell__title">
            <van-icon :name="parseAssetFile(item.icon)" />
            <span class="custom-title" @click="showPopup">{{ item.title }}</span>
          </div>
        </template>


        <template #value v-if="token && isUserInfoData && (item.id == 1)">
          <span>完成度：<span class="perfection-title">{{ perfectionNum * 100 }}%</span></span>
        </template>

        <!-- 动态修改求职状态value -->
        <template #value v-if="item.id == 7">
          <span @click="showPopup">{{ userStatusName }}</span>
        </template>
        <!-- 求职状态结束------------------------- -->

        <!-- 动态修改 站点设置的value -->
        <template #value v-if="item.id == 9">
          <span>{{ userSite }}</span>
        </template>
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
        <van-button class="btn fs-14 " v-if="token" size="mini" @click="logOut()">退出登录</van-button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { parseAssetFile } from '@/assets/util';
import { ref, reactive } from 'vue';
import { Toast, Dialog } from 'vant';
import { useRouter } from 'vue-router';
import { useMineStore } from '@/stores/mineStores';
import { useResumeStore } from "@/stores/resume";
const token = sessionStorage.getItem("token");
const use = useMineStore();
const useResume = useResumeStore();
const router = useRouter();
const showCount = ref(false);
const userInfo: any = ref({});
const perfectionNum = ref(0);
getUnsrInfo();
const isUserInfoData = ref(false);
// 求职状态 选择的值
const userStatusName = ref('');
// 站点设置 选择的值
const userSite = ref('')
let list = reactive([
  {
    id: 1,
    title: '请创建简历',
    value: '',
    link: '/createResume',
    icon: 'icon-resume.png',
    ispopup: false,
    isLogin: false
  },
  {
    id: 2,
    title: '附件简历',
    value: '上传附件简历/作品集',
    link: '/appendixResume',
    icon: 'icon-file.png',
    ispopup: false,
    isLogin: false
  },
  {
    id: 3,
    title: '职业测评',
    value: '',
    link: '/evaluation',
    icon: 'icon-occupation.png',
    ispopup: false,
    isLogin: false
  },
  {
    id: 4,
    title: '投递反馈',
    value: '',
    link: '/deliveryfeedback',
    icon: 'icon-delivery.png',
    ispopup: false,
    isLogin: false
  },
  {
    id: 5,
    title: '我的收藏',
    value: '',
    link: '/collection',
    icon: 'icon-collection.png',
    ispopup: false,
    isLogin: false
  },
  {
    id: 6,
    title: '我的面试',
    value: '',
    link: '/inter',
    icon: 'icon-interview.png',
    ispopup: false,
    isLogin: false
  },
  {
    id: 7,
    title: '求职状态',
    value: '',
    link: '',
    icon: 'icon-job.png',
    ispopup: true,
    isLogin: false
  },
  {
    id: 8,
    title: '意见反馈',
    value: '',
    link: '/feedBack',
    icon: 'icon-opinion.png',
    ispopup: false,
    isLogin: true
  },
  {
    id: 9,
    title: '站点设置',
    value: '',
    link: '/siteSettings',
    icon: 'icon-site.png',
    ispopup: false,
    isLogin: false
  },
])

const wxLogin = () => {
  Toast({
    message: '微信登录暂不支持,请用手机号码验证码登录。',
    position: 'top',
  });
}
// popup 逻辑
const show = ref(false);
function showPopup() {
  let token = window.sessionStorage.getItem('token');
  if (token == null || token == '') {
    show.value = false;
  } else {
    show.value = true;
  }
}
// popup 数据
let popupData = ['积极求职中', '已有offer,停止求职', '没有offer,暂不求职']
// popup 左上角 x 号事件
const cancel = () => {
  show.value = false;
};
// popup 右上角确定事件
const onConfirm = async (value: any) => {
  // 掉接口
  let status: null | Number = null;
  if (value == '积极求职中') {
    status = 0
  } else if (value == '已有offer,停止求职') {
    status = 1
  } else if (value == '没有offer,暂不求职') {
    status = 2
  }
  // 修改求职状态接口
  let res: any = await use.ModifyJobWantedStatus({
    status: status,
  })
  if (res.code == 200) {
    Toast('求职状态修改成功');
    getUnsrInfo();
    show.value = false;
  }
};


/***
 * 
 * 退出登录
 */
const logOut = () => {
  Dialog.confirm({
    title: '退出登录',
    message:
      '确定要退出登录嘛',
  })
    .then(() => {
      sessionStorage.removeItem("token");
      localStorage.clear();
      router.push({ path: "/" })
    })
    .catch(() => {
      // on cancel
    });

}

const isLogin = (item: any) => {
  if (item.isLogin) {
    router.push({ path: item.link })
  } else if (item.id == 1 && isUserInfoData.value) {
    router.push({ path: '/personalInfo' })

  } else {
    if (token) {
      item.ispopup = true;
      router.push({ path: item.link })
    } else {
      item.ispopup = false;
      showCount.value = true;
    }
  }
}

// 获取用户信息接口
async function getUnsrInfo() {
  let res: any = await use.getUserInfo({})
  if (res.data) {
    getPerfectionNum()
    userStatusName.value = res.data.userStatusName;
    userSite.value = res.data.userSite;
    isUserInfoData.value = true;
    userInfo.value = res.data;
  }
}
//获取完成度
const getPerfectionNum = async () => {
  let res = await useResume.selectCompletion({
  });
  if (res.code == 200) {
    perfectionNum.value = res.data.completion;
  }
};
const jump = (src: string) => {
  router.push({ path: src })
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

  .show-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    h1 {
      font-weight: 500;
    }

    .ft {
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

    .icon-user {
      width: $size;
      height: $size;
      border-radius: $size;
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

.perfection-title {
  color: rgb(58, 144, 252);
  font-size: 1.6rem;
}
</style>
  