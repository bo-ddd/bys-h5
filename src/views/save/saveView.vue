<script lang="ts" setup>
import { useRouter } from "vue-router";
import useSaveCompasable from "./compasable/useSaveCompasable";
let {active, count,loading,companyList,positionList,onRefresh,getSaveList,parseStr,parseCompanyDesc,getCompanyList,onRefreshCompany,companyLoading} = useSaveCompasable();
let router = useRouter();
let back = ()=>{
    router.go(-1);
}    
getSaveList();
getCompanyList();
</script>
<template>
    <div class="save">
        <!-- 导航栏 -->
        <van-nav-bar class="title" title="我的收藏"  :left-arrow="true" @click-left="back()" /> 
        <!-- 这个是选择 -->
        <van-tabs v-model:active="active" color="#75a5fd" title-active-color="#75a5fd">
            <van-tab title="职位" class="position">
                <div class="container" v-show="!positionList.length">
                    <div class="none-content">
                        <img src="@/assets/images/icon-save.png">
                        <p>暂无收藏职位</p>
                    </div>
                </div>
                <van-pull-refresh
                    v-model="loading"
                    success-text="刷新成功"
                    @refresh="onRefresh"
                    class="refresh"
                    >
                    <!-- 这个是内容每一项 -->
                    <div class="position-item mb-5" v-for="item in positionList" :key="item.positionId">
                        <div class="title">
                            <p>{{parseStr(item.companyIndustry)}}</p>
                            <p class="cl-red fs-16">10-30k</p>
                        </div>
                        <div class="desc">
                            <div class="left">
                                <div class="msg">
                                    <p>上海市-浦东新区</p>
                                    <div class="line mg-0_5"></div>
                                    <p>{{parseStr(item.positionIndustry)}}</p>
                                </div>
                                <div class="btn fs-12 cl-ccc">硕士</div>
                            </div>
                            <div class="right">
                                <div class="btn c-ffffff fs-14 mt-10">申请</div>
                            </div>
                        </div>
                        <div class="company mt-20">
                            <img :src="item.companyLogoUrl" class="icon">
                            <div class="right">
                                <p class="fw-700 fs-14">{{item.companyName}}</p>
                                <div class="desc mt-5">
                                    <p class="fs-12">{{item.companySize}}</p>
                                    <div class="line mg-0_5"></div>
                                    <p class="fs-12">{{parseCompanyDesc(item.companyIndustry)}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-pull-refresh>
                <div class="bottom fs-14">没有更多数据了</div>
            </van-tab>
            <van-tab title="企业">
                <div class="container" v-if="!companyList.length">
                    <div class="none-content" >
                        <img src="@/assets/images/icon-save.png">
                        <p>暂无收藏企业</p>
                    </div>
                </div>
                <van-pull-refresh
                    v-model="companyLoading"
                    success-text="刷新成功"
                    @refresh="onRefreshCompany"
                    class="refresh"
                    >
                    <!-- 这个是内容每一项 -->
                    <div class="enterprise-item mb-5" v-for="item in companyList" :key="item.companyId">
                        <div class="left">
                            <img src="@/assets/images/icon-collection.png" class="icon">
                        </div>
                        <div class="right ml-5">
                            <div class="top">
                                <p class="fs-14 fw-700">{{item.companyName}}</p>
                                <div class="desc fs-12">
                                    <p>上海市</p>
                                    <div class="line mg-0_5"></div>
                                    <p>1000人以上</p>
                                    <div class="line mg-0_5"></div>
                                </div>
                            </div>
                            <div class="btm">
                                <div class="left fs-12">
                                    <p class="mr-5">热招</p>
                                    <p class="cl-blue"> 数据中心 灾备岗</p>
                                    <p>等{{item.companyPositionCount}}个职位</p>
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
    </div>
</template>
<style lang="scss" scoped>
.save{
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
    :deep(.van-tabs__wrap){
        border-bottom: 2px solid #ccc;
    }
    & .container{
        height: calc(100vh - 8.4rem);
        display: flex;
        align-items: center;
        justify-content: center;
        &>.none-content{
            text-align: center;
            &>p{
                font-size: 1.4rem;
                padding: 1rem 0;
            }
        }
    }
    & .position-item{
        padding: 1rem 2rem;
        background: #fff;
        &>.title{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &>.desc{
            display: flex;
            justify-content: space-between;
            &>.left{
                &>.msg{
                    padding: .5rem 0;
                    display: flex;
                    align-items: center;
                }
                &>.btn{
                    display: inline-block;
                    padding: .5rem;
                    background: #f2f3f5;
                }
            }
            &>.right{
                &>.btn{
                    padding: .5rem 2rem;
                    background: #3b80fb;
                    border-radius: .5rem;
                }
            }
        }
        &>.company{
            display: flex;
            align-items: center;
            &>.right{
                flex: 1;
                padding: 0 1rem;
                &>.desc{
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    & .enterprise-item{
       padding: 1.5rem 0 1.5rem 2.2rem;
       display: flex;
       background: #fff;
       &>.left{
         &>img{
            border: 1px solid #f3f3f3;
         }
       }
       &>.right{
            flex: 1;
        &>.top{
            &>.desc{
                display: flex;
                align-items: center;
                padding: 1rem 0;
                border-bottom: 1px solid #f6f6f6;
            }
        }
        &>.btm{
            display: flex;
            padding-top: 1.5rem;
            padding-right: 2.2rem;
            justify-content: space-between;
            &>.left{
                display: flex;
            }
        }
       }
    }
    & .bottom{
        padding: 1rem 0;
        text-align: center;
        background: #fff;
    }
    :deep(.position .van-pull-refresh){
        min-height: 100vh;
    }
    :deep(.van-pull-refresh){
        background: #f6f6f6;
    }
    .mt-10{
        margin-top:1rem;
    }
    .mt-20{
        margin-top: 2rem;
    }
    .line{
        height: .8rem;
        width: .1rem;
        background: #ccc;
    }
    .cl-ccc{
        color: #ccc;
    }
    .mg-0_5{
        margin: 0 .5rem;
    }
    .mt-5{
        margin-top: .5rem;
    }
    .icon{
        width: 3.5rem;
    }
    .fw-700{
        font-weight: 700;
    }
    .mb-5{
        margin-bottom: .5rem;
    }
    .cl-red{
        color: #fb6443;
    }
    .cl-777{
        color: #777777;
    }
    .ml-5{
        margin-left: .5rem;
    }
    .mr-5{
        margin-right: .5rem;
    }
    .cl-blue{
        color:#79a8fc;
    }
    .icon-16{
        width: 1.6rem;
    }
}
</style>