<template>
    <div class="position-detail">
        <van-nav-bar class="title" title="职位详情"  left-arrow @click-left="back()" />
        <div class="container">
            <div class="position">
                <div class="title">
                   <h1 class="fs-24">{{positionDetail?.positionName}}</h1>
                    <p class="fs-12 cl-red fw-700">{{parseMoney(positionDetail?.positionMonthMoney as string)}}k</p>
                </div>
                <div class="company-detial fs-12">
                    <p>{{parsePosition(positionDetail?.positionAddr as string)}}</p>
                    <div class="line mg-0_5"></div>
                    <p>{{positionDetail?.positionName}}</p>
                </div>
                <div class="education">{{positionDetail?.positionEducation}}</div>
            </div>
            <div class="position-desc">
                <h2 class="fs-20">职位描述</h2>
                <div class="desc fs-14 cl-grey">
                    {{positionDetail?.positionDes}}
                </div>
            </div>
            <div class="work-address">
                <h2 class="fs-20">工作地址</h2>
                <div class="work">
                    <img src="@/assets/images/icon-lou.png" class="icon-16">
                    <div class="fs-14">{{parsePosition(positionDetail?.positionAddr as string)}}</div>
                </div>
            </div>
            <div class="company-profile" @click="jump('/companyDetails')">
                <h2 class="fs-20">企业简介</h2>
                <div class="msg mt-20">
                    <img src="@/assets/images/company.png" class="icon-40">
                    <div class="company  ml-15">
                        <p>{{positionDetail?.companyName}}</p>
                        <div class="desc">
                            <p>{{positionDetail?.companySize}}</p>
                            <div class="line mg-0_5"></div>
                            <p>{{positionDetail?.companyIndustry}}</p>
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
                    <img src="@/assets/images/icon-star_active.png" class="icon-20">
                    <p class="fs-14">收藏</p>
                </div>
            </div>
            <div class="btn cl-fff fs-14">投递简历</div>
        </div> 
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref,type Ref} from "vue";
import { usePositionDetailStore } from "@/stores/positonDetail";
const positionDetailStore = usePositionDetailStore();
let router = useRouter();
let back = ()=>{
    router.go(-1);
}  
let jump = (url: string) => {
  router.push({ path: url })
}
interface PositionDetail{
    companyId: number;
    companyIndustry: string;
    companyName: string;
    companySize: string;
    positionAddr: string;
    positionDay: any;
    positionDayMoeny: any;
    positionDes: string;
    positionEducation:string;
    positionId: string;
    positionMonth: any;
    positionMonthMoney: string;
    positionName: string;
    positionPositive: any;
}
let positionDetail:Ref<PositionDetail | null | undefined> = ref();
async function getPositionDetail(){
    let res = await positionDetailStore.getPositionDetail({
        positionId:10003,
    });
    positionDetail.value = res.data;
}
getPositionDetail();
// 转换钱的方法
const parseMoney = (str:string):string=>{
    try {
        let moneyArray = str.split(",");
        let targetArray=moneyArray.map((item)=>{
            return item.substring(0,item.length-3);
        })
        return targetArray.join("-");
    } catch (error) {
        return "";
    }
}
// 转换地址的方法           
const parsePosition = (str:string):string=>{
    try {
       return str.split(",").join('-');
    } catch (error) {
        return str;
    }
}
</script>
<style lang="scss" scoped>
.position-detail{
    :deep(.van-nav-bar__content){
        height: 4rem;
    }
    :deep(.van-nav-bar__title){
        font-size: 1.4rem;
        font-weight: 800;
    }
    :deep(.van-nav-bar__arrow){
        color: #000;
        font-size: 2rem;
    }
    &>.container{
        padding: 0 2rem;
        height: calc(100vh - 11rem);
        overflow-y: scroll;
        &>.position{
            padding: 2rem 0;
            border-bottom: 1px solid #eff1f3;
            &>.title{
                display: flex;
                padding: .5rem 0;
                justify-content: space-between;
            }
            &>.company-detial{
                display: flex;
                padding: .5rem 0;
                align-items: center;
            }
            &>.education{
                display: inline-block;
                padding: .5rem;
                background: #f2f3f5;
                color: #87878a;
            }
        }
        &>.position-desc{
            padding: 2.5rem 0;
            &>h2{
                padding: 1.5rem 0;
            }
        }
        &>.work-address{
            padding: 2.5rem 0;
            &>h2{
                padding:1.5rem 0;
            }
            &>.work{
                display: grid;
                grid-template-columns: 2rem auto;
            }
        }
        &>.company-profile{
            padding: 2rem 0 0 0;
            &>.msg{
                display: grid;
                grid-template-columns: 4rem auto 2rem;
                align-items: center;
                &>.company{
                    &>.desc{
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
    }
    &>.bottom{
        height: 7rem;
        box-sizing: border-box;
        padding: 1rem 1.5rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        &>.options{
            display: flex;
            flex: 1;
            justify-content: space-around;
            align-items: center;
            &>.option{
                text-align: center;
            }
        }
        &>.btn{
            display: inline-block;
            padding: 1.5rem 8rem;
            border-radius: .5rem;
            background: #1989fa;
        }
    }
    .cl-red{
        color: #fb6342;
    }
    .line{
        height: .8rem;
        width: .1rem;
        background: #ccc;
    }
    .mg-0_5{
        margin: 0 .5rem;
    }
    .fs-24{
        font-size: 2.4rem;
    }
    .fw-700{
        font-weight: 700;
    }
    .fs-20{
        font-size: 2rem;
    }
    .cl-grey{
        color: #cececf;
    }
    .icon-16{
        width: 1.6rem;
    }
    .icon-40{
        width: 4rem;
    }
    .ml-15{
        margin-left: 1.5rem;
    }
    .cl-fff{
        color: #fff;
    }
    .icon-20{
        width: 2rem;
    }
}
</style>