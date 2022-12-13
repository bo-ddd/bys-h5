<template>
    <div class="interview_details">
        <div class="header">
            <div>
                <div class="header_box align-center">
                    <div class="companyLogo ml-23">
                        <img src="@/assets/images/icon-avater1.png" alt="">
                    </div>
                    <div class="just-between header_box-center">
                        <div>
                            <div>
                                <div class="fs-14">中科百谷</div>
                                <h2>软件测试工程师</h2>
                            </div>
                            <div class="fs-1">北京-北京市-昌平区 | 8-12k</div>
                        </div>
                        <div class="icon_arrow">
                            <van-icon name="arrow" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">

            </div>
        </div>
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
        res.data.forEach((item: any) => {
            if (item.companyId == companyId.value) {
                Object.assign(interviewData, item);
            }
        });
        console.log(interviewData);
    }
};
</script>

<style scoped lang="scss">
.ml-23 {
    margin-left: 2.3rem;
}

.fs-14 {
    font-size: 1.4rem;
}

.fs-1 {
    font-size: 1rem;
}

.interview_details {
    .header {
        width: 100vw;
        height: 100vh;
        background-color: #5893fc;

        .header_box {
            height: 11.7rem;
            ;

            .companyLogo,
            img {
                width: 4.6rem;
                height: 4.6rem;
                border: .1rem solid #ccc;
            }

            .header_box-center {
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
        width: 100%;
        height: calc(100vh - 11.7rem);
        border-radius: 2rem 2rem 0 0;
        background-color: #fff;
    }
}
</style>