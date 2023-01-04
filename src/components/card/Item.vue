<template>
    <div class="wrap item just-center">
        <div class="container">
            <div class="header">
                <p class="fs-16">{{ options.positionName }}</p>
                <div class="align-center  mt-10 pt-8">
                    <span class="fs-14 c-747474">{{ options.positionAddr.split(',').splice(1,).join('-') }}</span>
                    <span class="fs-12 c-747474 gang">|</span>
                    <span class="fs-14 c-747474 ">{{ options.positionIndustry }}</span>
                </div>
                <p class="fs-12  c-747474 education  flex-ja-center">{{ options.positionEducationName }}</p>
            </div>
            <div class="footer mt-14 align-center ">
                <img class="icon" :src="options.companyLogoUrl" alt="">
                <div class="">
                    <p class="fs-14">{{ options.companyName }}</p>
                    <span class="fs-12 c-747474">{{ options.companySize }}人</span>
                    <span class=" gang c-747474">|</span>
                    <span class="fs-12 c-747474">{{ options.companyIndustry ? options.companyIndustry : '不限' }}</span>
                </div>
            </div>
        </div>
        <div class="operation" @click.stop="">
        <slot name="button" ></slot>
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
interface ResInfo {
    code: number,
    msg: string,
    data: any
}

let props = defineProps<{
    options: CardItem,
    resume?: ResInfo,
    onlineResumeInfo?: ResInfo
}>();

let { options, resume, onlineResumeInfo } = toRefs(props);

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




// // 获取在线简历的接口
// if (resume?.value) {
   
// }

// //获取在线信息完成度
// let onlineResume = ref() as Ref<number>;
// if (onlineResumeInfo?.value) {
  

// }
// //申请职位 
// const apply = function () {
//     if (!token) {
//         showCount.value = true
//     } else {
//         isShow.value = true;
//         if (resumeList.value.length == 0) {
//             show.value = true;
//         }
//     }
// }
</script>

<style lang="scss" scoped>
.pop {
    height: 44rem;
    padding: 0 2rem;

    &>.container-resume {
        height: calc(42rem - 7rem);
        overflow-y: scroll;

        .resume-item {
            display: flex;
            align-items: center;
            border-bottom: .2px solid #d8dbe3;

            :deep(.van-radio__label) {
                display: flex;
                align-items: center;
            }

            .resume {
                flex: 1;
                height: 5rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .top {
                    width: 20rem;
                    display: flex;
                }
            }
        }
    }
}

.pd-20_0 {
    padding: 2rem 0;
}

.icon-30 {
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
                // max-width: 6rem;
                display: inline ;
                padding: .2rem .5rem;
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