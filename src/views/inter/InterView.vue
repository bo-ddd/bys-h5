<template>
    <div class="nav-bar">
        <van-nav-bar title="我的面试" left-arrow @click-left="onClickLeft" />
    </div>

    <!-- 如果没有面试 则展示该模板 -->
    <div v-if="!isok" class="empty_state flex-ja-center">
        <img class="icon-kzt" src="@/assets/images/icon-kzt.png" alt="">
        <div class="empty_state-test">
            <p>您还没有收到面试邀请</p>
            <p>试试投递更多职位吧</p>
        </div>
    </div>

    <!-- 如果有面试 就展示一下模板 -->
    <div v-if="isok" class="inter">
        <div v-for="item in interviewData" :key="item.companyId">
            <div @click="toInterview_details(item)">
                <div class="date_time flex">
                    {{ item.interviewTime }}
                </div>

                <div class="just-between">
                    <div class="title">
                        <h2>{{ item.companyName }}</h2>
                        <span>线下面试</span>
                    </div>

                    <div class="icon-head_portrait">
                        <img :src="item.companyLogoUrl" alt="">
                    </div>
                </div>

                <div class="brief_introduction align-center">
                    <div>{{ item.positionName }}</div>
                    <div class="ml-5">{{ item.positionMoney }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useMineStore } from '@/stores/mineStores';
import { reactive } from 'vue';




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




const axios = useMineStore();
const router = useRouter();
// isok 是切换是否展示空状态的
let isok = ref(true);
let interviewData = reactive([]) as interviewDataType[]

getUserInterview();





// 获取用户面试
async function getUserInterview() {
    const res: Res | any = await axios.getUserInterviewApi({
        userId: 10000,
    });
    if (res.data) {
        isok.value = true;
        Object.assign(interviewData, res.data);
        console.log(interviewData);
        console.log(Array(interviewData).length);
    } else {
        isok.value = false;
    }
};
// 返回上一级
function onClickLeft() {
    router.go(-1)
};
// 点击跳转改面试的详情页面
function toInterview_details(params: any): void {
    console.log(params);
    router.push({
        name: 'interview_details',
        query: params,
    })
}
</script>

<style scoped lang="scss">
:deep(.van-nav-bar .van-icon) {
    color: #000;
}

.ml-5 {
    margin-left: .5rem;
}

.empty_state {
    width: 100vw;
    height: calc(100vh - 4.6rem);
    flex-direction: column;

    .icon-kzt {
        width: 10rem;
        height: 10rem;
    }

    .empty_state-test {
        margin: 2.2rem;

        p {
            padding: .2rem 0;
            color: #a3a3a3;
        }
    }
}

.inter {
    padding: 0 2rem;

    .date_time {
        padding: .5rem 0;
        color: #606060;
    }

    .title {
        &>h2 {
            padding: .5rem 0;
            font-size: 1.7rem;
        }

        &>span {
            display: inline-block;
            padding: .5rem 0;
            font-size: 1.2rem;
            color: #606060;
        }
    }

    .icon-head_portrait {
        border: .1rem solid #ccc;
        border-radius: .3rem;
    }

    .icon-head_portrait,
    img {
        width: 4.5rem;
        height: 4.5rem;
    }

    .brief_introduction {
        padding: 1rem 0;
        font-size: 1.2rem;
        border-bottom: .1rem solid #f3f3f3;
        color: #646464;
    }
}
</style>