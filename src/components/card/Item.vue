<template>
    <div class="wrap item just-center">
        <div class="container">
            <div class="header">
                <p class="fs-16">{{ options.positionName }}</p>
                <div class="align-center  mt-14">
                    <span class="fs-14 c-747474">{{ options.positionAddr.split(',').splice(1,).join('-') }}</span>
                    <span class="fs-12 c-747474 gang">|</span>
                    <span class="fs-14 c-747474">{{ options.positionIndustry }}</span>
                </div>
                <p class="fs-12  c-747474 education flex-ja-center mt-5">{{ options.positionEducationName }}</p>
            </div>
            <div class="footer mt-14 align-center ">
                <img class="icon" :src="options.companyLogoUrl" alt="">
                <div class="">
                    <p class="fs-14">{{ options.companyName }}</p>
                    <span class="fs-12 c-747474">{{ options.companySize }}人</span>
                    <span class=" gang c-747474">|</span>
                    <span class="fs-12 c-747474">{{ options.companyIndustry?options.companyIndustry:'不限' }}</span>
                </div>
            </div>
        </div>
        <div class="operation" @click.stop="">
            <p class=" mt-14 c-fb5530 fs-14 fw-600 money">{{ !options.positionMoney ? '' :
        options.positionMoney.replace(/,/g, '-').replace(/0/g, '') + 'k'
}}</p>
            <p v-if="options.isDelivery" class="mt-30 fs-12 c-a8a8a8">已申请</p>
            <van-button v-if="!options.isDelivery" class="mt-20 btn fw-600" size="mini" type="primary"
                @click.stop="apply()">申请</van-button>
            <van-action-sheet @click.prevent.stop="" v-model:show="isShow" title="确认投递简历">
                <div class="content" v-show="!(resumeList.length ==0)">
                    <div class="pop">
                <div class="container-resume">
                    <h3 class="pd-10_0">确认投递简历</h3>
                    <van-radio-group v-model="checked">
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
                    <div class="btn cl-fff flex-center fs-14" @click="delivery(options.positionId)">确认投递</div>
                </div>
            </div>
                </div>
                <div class="content" v-show="resumeList.length == 0">
                    <div class="just-center flex">
                        <p class="fs-14 c-747474">还未填写简历，点击<a href="" @click="jump('/createResume')"
                                class="c-2979ff">去填写</a></p>
                    </div>
                </div>
            </van-action-sheet>
            <van-popup v-model:show="showCount" closeable round :style="{ height: '25%', width: '80%' }">
                <div class="show-count_box">
                    <div class="show-wrap">
                        <div>
                            <h1>登录毕业申</h1>
                        </div>
                        <div>
                            <van-button type="primary" class="ft" @click="jump('/login')">手机号码验证登录</van-button>
                        </div>
                        <div class="c-747474" @click="wxLogin()">微信账号快捷登录</div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script setup lang="ts">
import useUtil from '@/assets/util';
import { ref, toRefs, provide, inject } from 'vue';
import type { Ref } from 'vue';
import type { CardItem } from '../../views/position/types/card';
import { useJobStore } from "@/stores/job";//接口
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { usePositionDetailStore } from "@/stores/positonDetail";
const positionDetailStore = usePositionDetailStore();
const router = useRouter();
const useJob = useJobStore();

let props = defineProps<{
    options: CardItem,
}>();

let { options, } = toRefs(props);

const token = sessionStorage.getItem("token");
let isShow = ref(false);
let show = ref(false);
const showCount = ref(false);

const jump = (src: string, params?: number) => {
    if (params) {
        router.push({ path: src, query: { positionId: params } })
    } else {
        router.push({ path: src })
    }
}
// 微信号登录
const wxLogin = () => {
    Toast({
        message: '微信登录暂不支持,请用手机号码验证码登录。',
        position: 'top',
    });
}


// 申请职位接口
const deliveryJob = async (params: number) => {
    let res: any = await useJob.deliveryPosition({ positionId: params });
    console.log(res);
    if (res.code == 200) {
        isShow.value = false;
    }
}
// 确认投递
const delivery = function (id: number) {
    deliveryJob(id);
    window.location.href = '/position'
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
interface Res<T> {
    code: number,
    msg: string,
    data: T,
}
let checked:Ref<number | null> = ref(null);//这个是选中简历id
let resumeList:Ref<Resume[]> = ref([]);

// 获取在线简历的接口
async function getOnlineResume() {
    let res: Res<Resume[]> = await positionDetailStore.getOnlineResume({});
    console.log(res)
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
getOnlineResume();

//申请职位 
const apply = function () {
    if (!token) {
        showCount.value = true
    } else {
        isShow.value = true;
        if (resumeList.value.length == 0) {
            show.value = true;
        }
    }
}
</script>

<style lang="scss" scoped>
 .pop {
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
    .icon-30{
        width: 3rem;
        height: 3rem;
    }
.item {
    justify-content: space-between;
    background-color: #ffffff;

    .gang {
        margin: 0 .3rem;
    }

    .container {
        .header {
            padding-top: 1.5rem;

            .education {
                width: 3.2rem;
                height: 2rem;
                background-color: #f2f3f5;
            }
        }

        .footer {
            padding-bottom: 1.5rem;
            gap: 1rem;

            .icon {
                width: 3.2rem;
                height: 3.2rem;
            }
        }
    }

    .operation {
        .content {
            padding: 2rem;

            .flex {
                height: 61vh;
                gap: 1rem;

                .title {
                    line-height: 2.5rem;
                }
            }

            .btn-confirm {
                width: 100%;
            }

            .to-resume {
                min-height: 55vh;
            }
        }

        .btn {
            margin-top: 3rem;
            border-radius: .5rem;
            padding: 1.4rem 1rem;
            background-color: #3b7dff;

        }
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
}
</style>