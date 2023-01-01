<script lang="ts" setup>
import { useRouter } from "vue-router";
import useSaveCompasable from "./compasable/useSaveCompasable";
import { usePositionDetailStore } from "@/stores/positonDetail";
import type { Ref } from "vue";
import { ref } from "vue";

let { active, count, loading, companyList, positionList, onRefresh, getSaveList, parseStr, parseCompanyDesc, getCompanyList, onRefreshCompany, companyLoading, parseAddr,companyCount,positionCount,parseMoney} = useSaveCompasable();
let router = useRouter();
const positionDetailStore = usePositionDetailStore();
interface Res<T> {
    code: number,
    msg: string,
    data: T,
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
    isDelivery: boolean;
}
let show: Ref<boolean> = ref(false);//是否显示简历弹窗
let positionId:Ref<any> = ref();//职位id
let positionDetail: Ref<PositionDetail> = ref({} as PositionDetail);//职位详情
if(positionDetail.value){
    positionDetail.value.isDelivery = true;
}
let checked: Ref<number> = ref(0);
let resumeList:Ref<Resume[]> = ref([]);//简历列表
let back = () => {
    router.go(-1);
}
const jump = (url: string, query:any) => {
    router.push({
        name: url,
        query:query,
    })
}
const showResume = (PositionId:number) => {
    show.value = !show.value;
    positionId.value = PositionId;
    if(positionDetail.value){
        positionDetail.value.isDelivery = true;
    }
    getPositionDetail();
}
// 获取职位详情的接口
async function getPositionDetail() {
    let res: Res<any> = await positionDetailStore.getPositionDetail({
        positionId: positionId.value,
    });
    if (res.code == 200) {
        positionDetail.value = res.data;
    }
}   
//投递简历的方法
const Delivery = ()=>{
    show.value = false;
    deliveryPosition();
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
}
// 投递职位的方法
const deliveryPosition = async ()=>{
    let res:Res<any> = await positionDetailStore.deliveryPosition({
        resumeId:checked.value as number,
        positionId:positionId.value,
    });
    if(res.code == 200){
        getPositionDetail();
        getSaveList();
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
getOnlineResume();
selectCompletion();
getSaveList();
getCompanyList();
</script>
<template>
    <div class="save">
        <!-- 导航栏 -->
        <van-nav-bar class="title" title="我的收藏" :left-arrow="true" @click-left="back()" />
        <!-- 这个是选择 -->
        <van-tabs v-model:active="active" color="#75a5fd" title-active-color="#75a5fd">
            <van-tab title="职位" class="position">
                <div class="container" v-if="!positionList.length">
                    <div class="none-content">
                        <img src="@/assets/images/icon-save.png">
                        <p>暂无收藏职位</p>
                    </div>
                </div>
                <van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh" class="refresh">
                    <!-- 这个是内容每一项 -->
                    <div class="position-item mb-5" v-for="item in positionList" :key="item.positionId"
                        @click="jump('positionDetail',{positionId:item.positionId} as any)">
                        <div class="title">
                            <p>{{ parseStr(item.companyIndustry) }}</p>
                            <p class="cl-red fs-16">{{parseMoney(item.positionMoney as string)}}k</p>
                        </div>
                        <div class="desc">
                            <div class="left">
                                <div class="msg">
                                    <p>{{ parseAddr(item.positionAddr as string) }}</p>
                                    <div class="line mg-0_5"></div>
                                    <p>{{ item.positionName }}</p>
                                </div>
                                <div class="btn fs-12 cl-ccc">硕士</div>
                            </div>
                            <div class="right">
                                <div class="btn c-ffffff fs-14 mt-10" @click.stop="showResume(item.positionId)" v-if="!item.isDelivery">申请</div>
                                <div class="fs-14 c-a8a8a8 mt-10" v-else>已申请</div>
                            </div>
                        </div>
                        <div class="company mt-20">
                            <img :src="item.companyLogoUrl" class="icon">
                            <div class="right">
                                <p class="fw-700 fs-14">{{ item.companyName }}</p>
                                <div class="desc mt-5">
                                    <p class="fs-12">{{ item.companySize }}</p>
                                    <div class="line mg-0_5"></div>
                                    <p class="fs-12">{{ parseCompanyDesc(item.companyIndustry) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-pull-refresh>
                <div class="bottom fs-14">没有更多数据了</div>
            </van-tab>
            <van-tab title="企业">
                <div class="container" v-if="!companyList.length">
                    <div class="none-content">
                        <img src="@/assets/images/icon-save.png">
                        <p>暂无收藏企业</p>
                    </div>
                </div>
                <van-pull-refresh v-model="companyLoading" success-text="刷新成功" @refresh="onRefreshCompany"
                    class="refresh">
                    <!-- 这个是内容每一项 -->
                    <div class="enterprise-item mb-5" v-for="item in companyList" :key="item.companyId" @click="jump('companyDetails',{componyId:item.companyId})">
                        <div class="left">
                            <img :src="item.companyLogoUrl" class="icon">
                        </div>
                        <div class="right ml-5">
                            <div class="top">
                                <p class="fs-14 fw-700">{{ item.companyName }}</p>
                                <div class="desc fs-12">
                                    <p>{{ item.companyAddr }}</p>
                                    <div class="line mg-0_5"></div>
                                    <p>{{ item.companySize }}人以上</p>
                                    <div class="line mg-0_5"></div>
                                </div>
                            </div>
                            <div class="btm">
                                <div class="left fs-12">
                                    <p class="mr-5">热招</p>
                                    <p class="cl-blue"> {{ item.positionNameList.splice(0, 2).join(" ") }}</p>
                                    <p>等{{ item.companyPositionCount }}个职位</p>
                                </div>
                                <img src="@/assets/images/icon-arrow_right.png" class="icon-16">
                            </div>
                        </div>
                    </div>
                    <!-- 这个是底部 -->
                    <div class="bottom fs-14 cl-777">没有更多数据了</div>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
        <!-- 弹出框 -->
        <van-popup v-model:show="show" round position="bottom"  v-if="!positionDetail?.isDelivery">
            <div class="pop">
                <div class="container-resume">
                    <h3 class="pd-10_0">确认投递简历</h3>
                    <van-radio-group v-model="checked">
                        <div class="resume-item mt-5 pd-20_0" v-for="item in resumeList" :key="item.resumeId">
                            <van-radio :name="item.resumeId" icon-size="2rem">
                                <img class="icon-30 ml-15" src="@/assets/images/icon-resume.png">
                                <div class="resume ml-10">
                                    <div class="top">
                                        <div class="fs-14">{{ item.resumeName }}</div>
                                        <div class="fs-12 ml-40" v-if="item.isOnline">
                                            完成度:
                                            <span class="cl-blue">{{item.completion ? item.completion * 100 : ''}}%</span>
                                        </div>
                                    </div>
                                    <div class="btm fs-12">
                                        {{ item.modifyTime }}更新
                                    </div>
                                </div>
                            </van-radio>
                        </div>
                    </van-radio-group>
                </div>
                <div class="btn-wrap">
                    <div class="btn cl-fff flex-center fs-14" @click="Delivery">确认投递</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<style lang="scss" scoped>
.save {
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

    :deep(.van-tabs__wrap) {
        border-bottom: 2px solid #ccc;
    }

    & .container {
        height: calc(100vh - 8.4rem);
        display: flex;
        align-items: center;
        justify-content: center;

        &>.none-content {
            text-align: center;

            &>p {
                font-size: 1.4rem;
                padding: 1rem 0;
            }
        }
    }

    & .position-item {
        padding: 1rem 2rem;
        background: #fff;

        &>.title {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &>.desc {
            display: flex;
            justify-content: space-between;

            &>.left {
                &>.msg {
                    padding: .5rem 0;
                    display: flex;
                    align-items: center;
                }

                &>.btn {
                    display: inline-block;
                    padding: .5rem;
                    background: #f2f3f5;
                }
            }

            &>.right {
                &>.btn {
                    padding: .5rem 2rem;
                    background: #3b80fb;
                    border-radius: .5rem;
                }
            }
        }

        &>.company {
            display: flex;
            align-items: center;

            &>.right {
                flex: 1;
                padding: 0 1rem;

                &>.desc {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    & .enterprise-item {
        padding: 1.5rem 0 1.5rem 2.2rem;
        display: flex;
        background: #fff;

        &>.left {
            &>img {
                border: 1px solid #f3f3f3;
            }
        }

        &>.right {
            flex: 1;

            &>.top {
                &>.desc {
                    display: flex;
                    align-items: center;
                    padding: 1rem 0;
                    border-bottom: 1px solid #f6f6f6;
                }
            }

            &>.btm {
                display: flex;
                padding-top: 1.5rem;
                padding-right: 2.2rem;
                justify-content: space-between;

                &>.left {
                    display: flex;
                }
            }
        }
    }

    & .bottom {
        padding: 1rem 0;
        text-align: center;
        background: #fff;
    }

    :deep(.position .van-pull-refresh) {
        min-height: 100vh;
    }

    :deep(.van-pull-refresh) {
        background: #f6f6f6;
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

                & :deep(.van-radio__label) {
                    display: flex;
                    align-items: center;
                }

                & .resume {
                    width: 100vw;
                    height: 5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    &>.top {
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

    .mt-10 {
        margin-top: 1rem;
    }

    .mt-20 {
        margin-top: 2rem;
    }

    .line {
        height: .8rem;
        width: .1rem;
        background: #ccc;
    }

    .cl-ccc {
        color: #ccc;
    }

    .mg-0_5 {
        margin: 0 .5rem;
    }

    .mt-5 {
        margin-top: .5rem;
    }

    .icon {
        width: 3.5rem;
    }

    .fw-700 {
        font-weight: 700;
    }

    .mb-5 {
        margin-bottom: .5rem;
    }

    .cl-red {
        color: #fb6443;
    }

    .cl-777 {
        color: #777777;
    }

    .ml-5 {
        margin-left: .5rem;
    }

    .mr-5 {
        margin-right: .5rem;
    }

    .cl-blue {
        color: #79a8fc;
    }

    .icon-16 {
        width: 1.6rem;
    }

    .pd-10_0 {
        padding: 1rem 0;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-30 {
        width: 3rem;
    }

    .ml-10 {
        margin-left: 1rem;
    }

    .ml-15 {
        margin-left: 1.5rem;
    }

    .bg-low {
        background: #84b4fe;
    }

    .bg-hight {
        background: #1989fa;
    }

    .cl-fff {
        color: #fff;
    }

    .pd-20_0 {
        padding: 2rem 0;
    }
    .ml-40{
        margin-left: 4rem;
    }
}
</style>