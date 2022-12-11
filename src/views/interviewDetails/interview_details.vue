<template>
    <div class="interview_details">
        <div class="header">
            <div>
                <div><img src="@/assets/images/icon-avater1.png" alt=""></div>
                <div>
                    <div>中科百谷</div>
                    <h2>软件测试工程师</h2>
                </div>
                <div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div>北京-北京市-昌平区 | 8-12k</div>
        </div>
        <div class="container"></div>
        <div class="footer"></div>
    </div>
</template>

<script setup lang="ts">
import { useMineStore } from '@/stores/mineStores';
import { ref } from "vue";
import { reactive } from 'vue';
import { useRoute } from "vue-router";



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
const route = useRoute();
let interviewData = reactive([]) as interviewDataType[]
getUserInterview();
// 我的面试页面传过来的id
let companyId = ref(Number(route.query.companyId))



// 获取用户面试
async function getUserInterview() {
    const res: Res | any = await axios.getUserInterviewApi({
        userId: 10000,
    });
    if (res.data) {
        Object.assign(interviewData, res.data);
    }
};
</script>

<style scoped lang="scss">
.interview_details {
    .header {
        width: 100vw;
        height: 11.7rem;
        background-color: #5893fc;
    }
}
</style>