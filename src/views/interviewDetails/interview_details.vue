<template>
    <div class="interview_details">
        <div class="nav-bar">
            <van-nav-bar title="我的面试" left-arrow @click-left="onClickLeft" />
        </div>
        <div class="interview_details">
            <div>
                <div class="interview_details_box align-center">
                    <div class="companyLogo ml-23">
                        <img :src="interviewData.companyLogoUrl" alt="">
                    </div>
                    <div class="just-between interview_details_box-center" @click="log">
                        <div>
                            <div>
                                <div class="fs-14">{{ interviewData.companyName }}</div>
                                <h2>{{ interviewData.positionName }}</h2>
                            </div>
                            <div class="fs-1">{{ interviewData.interviewAddr }} | {{ interviewData.positionMoney }}
                            </div>
                        </div>
                        <div class="icon_arrow">
                            <van-icon name="arrow" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="container wrap">
                <h4>面试信息</h4>
                <ul class="container_ul mt-24">
                    <li>
                        <label class="mr-1">联系人</label>
                        <span>
                            {{ interviewData.interviewPhone }}
                            <van-icon class="c2471fb" name="phone-o" />
                        </span>
                    </li>
                    <li>
                        <label class="mr-1">面试时间</label>
                        <span>
                            {{ interviewData.interviewTime }}
                        </span>
                    </li>
                    <li>
                        <label class="mr-1">面试形式</label>
                        <span>
                            线下面试
                        </span>
                    </li>
                    <li>
                        <label class="mr-1">面试地址</label>
                        <span>
                            {{ interviewData.interviewAddr }}
                        </span>
                    </li>
                    <li>
                        <label class="mr-1">备注信息</label>
                        <span>
                            无
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMineStore } from '@/stores/mineStores';
import { ref } from "vue";
import { reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";


interface Res {
    code: Number,
    msg: string,
    data: any,
}
interface interviewDataType {
    companyId: number,//: 企业id,
    companyName: string,//: 企业名称,
    interviewAddr: string,//: 面试地点,
    interviewName: string,//: 联系人,
    interviewNote: string,//: 面试备注,
    interviewPhone: string,//: 联系电话,
    interviewTime: string,//: 面试时间,
    positionId: number,//: 职位id,
    positionMoney: string,//: 职位薪资,
    positionName: string,//: 职位名称
    companyLogoUrl: string,// LOGOurl
}

const router = useRouter();
const axios = useMineStore();
const route = useRoute();
let interviewData = reactive({}) as interviewDataType;
getUserInterview();
// 我的面试页面传过来的id
let companyId = ref(Number(route.query.companyId))



// 获取用户面试
async function getUserInterview() {
    const res: Res | any = await axios.getUserInterviewApi({
        userId: 10000,
    });
    if (res.data) {
        res.data.forEach((item: any) => {
            if (item.companyId == companyId.value) {
                Object.assign(interviewData, item);
            }
        });
        console.log(interviewData);
    }
};

function log() {
    console.log(111)
}

// 返回上一级
function onClickLeft() {
    router.go(-1)
};
</script>

<style scoped lang="scss">
:deep(.van-nav-bar .van-icon) {
    color: #000;
}

:deep(.van-nav-bar) {
    background-color: #5893fc;
    border: none;
}

.ml-23 {
    margin-left: 2.3rem;
}

.fs-14 {
    font-size: 1.4rem;
}

.fs-1 {
    font-size: 1rem;
}

.mt-24 {
    margin-top: 2.4rem;
}

.mr-1 {
    margin-right: 1rem;
}

.c2471fb {
    color: #2471fb;
}

.interview_details {
    .interview_details {
        width: 100vw;
        height: 100vh;
        background-color: #5893fc;

        .interview_details_box {
            height: 11.7rem;
            ;

            .companyLogo,
            img {
                width: 4.6rem;
                height: 4.6rem;
                border: .1rem solid #ccc;
            }

            .interview_details_box-center {
                color: #fff;
                width: 100%;
                padding-left: .7rem;

                h2 {
                    padding: .5rem 0;
                    font-size: 1.7rem;
                }
            }

            .icon_arrow {
                padding-right: 2.4rem;
            }
        }
    }

    .container {
        box-sizing: border-box;
        width: 100%;
        height: calc(100vh - 11.7rem);
        border-radius: 2rem 2rem 0 0;
        background-color: #fff;
        padding-top: 3.2rem;

        h4 {
            font-size: 1.6rem;
            color: #444444;
        }

        .container_ul {
            li {
                padding: 1rem 0;
                font-size: 1.4rem;

                label {
                    display: inline-block;
                    width: 5.6rem;
                    text-align-last: justify;
                    color: #000000;
                }

                span {
                    color: #6e6b6b;
                }
            }
        }
    }
}
</style>