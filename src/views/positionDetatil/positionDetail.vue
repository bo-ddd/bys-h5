<template>
      <van-popup v-model:show="show" v-if="showPopup"  closeable round :style="{ height: '25%', width: '80%' }">
        <div class="show-count_box">
        <div class="show-wrap">
            <div>
            <h1>登录榕树云</h1>
            </div>
            <div>
            <van-button type="primary" class="ft" @click="to('/login')">手机号码验证登录</van-button>
            </div>
            <div class="c-747474" @click="wxLogin()">微信账号快捷登录</div>
        </div>
        </div>
    </van-popup>
    <div class="position-detail">
        <van-nav-bar class="title" title="职位详情" left-arrow @click-left="back()" />
        <div class="container">
            <div class="position">
                <div class="title">
                    <h1 class="fs-24">{{ positionDetail?.positionName }}</h1>
                    <p class="fs-12 cl-red fw-700">{{ parseMoney(positionDetail?.positionMonthMoney as string) }}k</p>
                </div>
                <div class="company-detial fs-12">
                    <p>{{ parsePosition(positionDetail?.positionAddr as string) }}</p>
                    <div class="line mg-0_5"></div>
                    <p>{{ positionDetail?.positionName }}</p>
                </div>
                <div class="education">{{ positionDetail?.positionEducation }}</div>
            </div>
            <div class="position-desc">
                <h2 class="fs-20">职位描述</h2>
                <div class="desc fs-14 cl-grey">
                    {{ positionDetail?.positionDes }}
                </div>
            </div>
            <div class="work-address">
                <h2 class="fs-20">工作地址</h2>
                <div class="work">
                    <img src="@/assets/images/icon-lou.png" class="icon-16">
                    <div class="fs-14">{{ parsePosition(positionDetail?.positionAddr as string) }}</div>
                </div>
            </div>
            <div class="company-profile" @click="jump('/companyDetails',positionDetail?.companyId as number)">
                <h2 class="fs-20">企业简介</h2>
                <div class="msg mt-20">
                    <img :src="positionDetail?.companyLogoUrl" class="icon-40">
                    <div class="company  ml-15">
                        <p>{{ positionDetail?.companyName }}</p>
                        <div class="desc">
                            <p>{{ positionDetail?.companySize }}</p>
                            <div class="line mg-0_5"></div>
                            <p>{{ positionDetail?.companyIndustry }}</p>
                        </div>
                    </div>
                    <img src="@/assets/images/icon-arrow_right.png" class="icon-16">
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="options">
                <div class="option">
                    <img src="@/assets/images/icon-share.png" class="icon-20">
                    <p class="fs-14">分享</p>
                </div>
                <div class="option">
                    <img @click="setStarPosition"
                        :src="positionDetail?.isStar ? parseAssetFile('icon-star_active.png') : parseAssetFile('icon-star.png')"
                        class="icon-20">
                    <p class="fs-14">收藏</p>
                </div>
            </div>
            <div :class="['btn','cl-fff','fs-14',positionDetail?.isDelivery ? 'bg-low' : 'bg-hight']" @click="showResume">{{positionDetail?.isDelivery ? '已投递' : '投递简历'}}</div>
        </div>
        <!-- 弹出框 -->
        <van-popup v-model:show="show" round position="bottom" v-if="!positionDetail?.isDelivery && loginStatus">
            <div class="pop">
                <div class="container-resume">
                    <h3 class="pd-10_0 text-center">确认投递简历</h3>
                    <p class="text-center" v-if="!resumeList.length">还未填写简历,点击<span class="cl-blue" @click="toPage('createResume')">去填写</span></p>
                    <van-radio-group v-model="checked" v-if="resumeList.length">
                        <div class="resume-item mt-5 pd-20_0" v-for="item in resumeList" :key="item.resumeId">
                            <van-radio :name="item.resumeId" icon-size="2rem">
                                <img class="icon-30 ml-15" src="@/assets/images/icon-resume.png">
                                <div class="resume ml-10">
                                    <div class="top">
                                        <div class="fs-14">{{item.resumeName}}</div>
                                        <div class="fs-12 ml-40" v-if="item.isOnline">
                                            完成度:
                                            <span class="cl-blue">{{item.completion ? item.completion * 100 : ''}}%</span>
                                        </div>
                                    </div> 
                                    <div class="btm fs-12">
                                        {{item.modifyTime}}更新
                                    </div>
                                </div>
                            </van-radio>
                        </div>
                    </van-radio-group>
                </div>
                <div class="btn-wrap">
                    <div v-if="resumeList.length" class="btn cl-fff flex-center fs-14" @click="Delivery">确认投递</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, type Ref } from "vue";    
import { usePositionDetailStore } from "@/stores/positonDetail";
import { parseAssetFile } from "@/assets/util";
import { Toast } from 'vant';
const positionDetailStore = usePositionDetailStore();
let router = useRouter();
let route = useRoute();
let positionId:Ref<any> = ref();
if (route.query.positionId) {
    positionId.value = route.query.positionId;
}
const loginStatus = ref(false);
loginStatus.value = sessionStorage.getItem("token") ? true : false;
const showPopup = ref(!loginStatus.value);
let back = () => {
    router.go(-1);
}
let jump = (url: string,componyId:number) => {
    router.push({ 
        path: url,
        query:{
            componyId:componyId,
        }
    })
}
let toPage = (url:string)=>{
    router.push(url);
}
interface Resume{
    createTime: string,
    modifyTime: string,
    resumeId: number,
    resumeName: string,
    resumeUrl:string,
    isOnline:boolean,
    completion?:number,
}
interface PositionDetail {
    companyId: number;
    companyIndustry: string;
    companyName: string;
    companySize: string;
    positionAddr: string;
    positionDay: any;
    positionDayMoeny: any;
    positionDes: string;
    positionEducation: string;
    positionId: string;
    positionMonth: any;
    positionMonthMoney: string;
    positionName: string;
    positionPositive: any;
    companyLogoUrl: string;
    isStar: boolean;
    isDelivery:boolean;    
}
interface Res<T> {
    code: number,
    msg: string,
    data: T,
}
let positionDetail: Ref<PositionDetail | null | undefined> = ref();//职位详情
let show: Ref<boolean> = ref(false);//是否显示简历弹窗
let checked:Ref<number | null> = ref(null);//这个是选中简历id
let resumeList:Ref<Resume[]> = ref([]);
// 获取职位详情的接口
async function getPositionDetail() {
    let res: Res<any> = await positionDetailStore.getPositionDetail({
        positionId: positionId.value,
    });
    if (res.code == 200) {
        positionDetail.value = res.data;
    }
}   
getPositionDetail();
// 收藏职位的接口
async function setStarPosition() {
    if(loginStatus.value == false){
        show.value = true;
        return;
    } 
    let res: Res<any> = await positionDetailStore.setStarPosition({
        positionId: positionId.value,
    });
    if (res.code == 200) {
        getPositionDetail();
        if (positionDetail.value?.isStar) {
            Toast.success('取消收藏');
        } else {
            Toast.success('收藏成功');
        }
    }
}

// 获取在线简历的接口
async function getOnlineResume() {
    let res: Res<Resume[]> = await positionDetailStore.getOnlineResume({});
    if (res.code == 200) { 
        resumeList.value = res.data;
        let check = resumeList.value.find((item)=>{
            return item.isOnline == true;
        })
        if(check){
            checked.value = check.resumeId;
        }else{
            if(resumeList.value.length){
                checked.value = resumeList.value[0].resumeId;
            }
        }
        resumeList.value.sort((a : any,b :any)=>{
            return b.isOnline - a.isOnline;
        });
    }
    if(res.code == 401){
        Toast('请登录');
    }
}
getOnlineResume();
// 转换钱的方法
const parseMoney = (str: string): string => {
    try {
        let moneyArray = str.split(",");
        let targetArray = moneyArray.map((item) => {
            return item.substring(0, item.length - 3);
        })
        return targetArray.join("-");
    } catch (error) {
        return "";
    }
}
// 转换地址的方法           
const parsePosition = (str: string): string => {
    try {
        return str.split(",").join('-');
    } catch (error) {
        return str;
    }
}
//投递简历的方法
const Delivery = ()=>{
    show.value = false;
    deliveryPosition();
}
// 弹出简历方法
const showResume = ()=>{
    show.value = !show.value;
}
// 投递职位的方法
const deliveryPosition = async ()=>{
    let res:Res<any> = await positionDetailStore.deliveryPosition({
        resumeId:checked.value as number,
        positionId:positionId.value,
    });
    if(res.code == 200){
        getPositionDetail();
    }
}
//获取在线信息完成度
const selectCompletion = async ()=>{
    let res :Res<any> = await positionDetailStore.selectCompletion({});
        if(res.code == 200){
            let check = resumeList.value.find((item)=>{
                return item.isOnline == true;
            })
            if(check){
                check.completion = res.data.completion;
            }
        }
}
selectCompletion();

 const wxLogin = ()=>{
  Toast({
    message: '微信登录暂不支持,请用手机号码验证码登录。',
    position: 'top',
  });
}
const to = function (path: any) {
  router.push(path);
};
</script>
<style lang="scss" scoped>
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
.position-detail {
    :deep(.van-nav-bar__content) {
        height: 4rem;
    }

    :deep(.van-nav-bar__title) {
        font-size: 1.4rem;
        font-weight: 800;
    }

    :deep(.van-nav-bar__arrow) {
        color: #000;
        font-size: 2rem;
    }

    &>.container {
        padding: 0 2rem;
        height: calc(100vh - 11rem);
        overflow-y: scroll;

        &>.position {
            padding: 2rem 0;
            border-bottom: 1px solid #eff1f3;

            &>.title {
                display: flex;
                padding: .5rem 0;
                justify-content: space-between;
            }

            &>.company-detial {
                display: flex;
                padding: .5rem 0;
                align-items: center;
            }

            &>.education {
                display: inline-block;
                padding: .5rem;
                background: #f2f3f5;
                color: #87878a;
            }
        }

        &>.position-desc {
            padding: 2.5rem 0;

            &>h2 {
                padding: 1.5rem 0;
            }
        }

        &>.work-address {
            padding: 2.5rem 0;

            &>h2 {
                padding: 1.5rem 0;
            }

            &>.work {
                display: grid;
                grid-template-columns: 2rem auto;
            }
        }

        &>.company-profile {
            padding: 2rem 0 0 0;

            &>.msg {
                display: grid;
                grid-template-columns: 4rem auto 2rem;
                align-items: center;

                &>.company {
                    &>.desc {
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
    }

    &>.bottom {
        height: 7rem;
        box-sizing: border-box;
        padding: 1rem 1.5rem;
        background: #fff;
        display: flex;
        justify-content: space-between;

        &>.options {
            display: flex;
            flex: 1;
            justify-content: space-around;
            align-items: center;

            &>.option {
                text-align: center;
            }
        }

        &>.btn {
            display: inline-block;
            padding: 1.5rem 8rem;
            border-radius: .5rem;
        }
    }

    & .pop {
        height: 50rem;
        padding: 0 2rem;

        &>.container-resume {
            height: calc(50rem - 7rem);
            overflow-y: scroll;

            &>h3 {
                font-size: 1.6rem;
            }

            & .resume-item {
                display: flex;
                align-items: center;
                border-bottom: .2px solid #d8dbe3;
                & :deep(.van-radio__label){
                    display: flex;
                    align-items: center;
                }
                & .resume{
                    flex: 1;
                    height: 5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    &>.top{
                        display: flex;
                    }
                }
            }
        }
        &>.btn-wrap {
            &>.btn {
                padding: 1.5rem 0;
                background: #1989fa;
            }
        }
    }

    .pd-10_0 {
        padding: 1rem 0;
    }

    .cl-red {
        color: #fb6342;
    }

    .line {
        height: .8rem;
        width: .1rem;
        background: #ccc;
    }
    .mg-0_5 {
        margin: 0 .5rem;
    }

    .fs-24 {
        font-size: 2.4rem;
    }

    .fw-700 {
        font-weight: 700;
    }
    .icon-30{
        width: 3rem;
    }

    .fs-20 {
        font-size: 2rem;
    }
    .pd-20_0{
        padding: 2rem 0;
    }

    .cl-grey {
        color: #cececf;
    }

    .icon-16 {
        width: 1.6rem;
    }

    .icon-40 {
        width: 4rem;
    }
    .ml-40{
        margin-left: 4rem;
    }
    .cl-blue{
        color: #81aefc;
    }

    .ml-15 {
        margin-left: 1.5rem;
    }

    .cl-fff {
        color: #fff;
    }

    .icon-20 {
        width: 2rem;
    }
    .ml-10{
        margin-left: 1rem;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bg-low{
        background: #84b4fe;
    }
    .bg-hight{
        background: #1989fa;
    }
    .text-center{
        text-align: center;
    }
}
</style>