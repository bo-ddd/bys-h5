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
                    <span class="fs-12 c-747474">{{ options.companyIndustry }}</span>
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
                <div class="content" v-show="!show">
                    <div class="flex">
                        <van-icon name="checked" size="2.5rem" color="#2979ff" />
                        <div class="title">
                            <p class="fs-16">在线投递简历</p>
                            <span class="fs-12 c-747474">{{ resumeInfo.modifyTime }}更新</span>
                        </div>
                        <p class="fs-14 c-747474">完成度：<span class="c-2979ff">{{ Number(resumeInfo.completion) * 100
}}%</span></p>
                    </div>
                    <van-button class="btn-confirm fs-14" type="primary"
                        @click="delivery(options.positionId)">确认投递</van-button>
                </div>
                <div class="content" v-show="show">
                    <div class="just-center flex">
                        <p class="fs-14 c-747474">还未填写简历，点击<a href="" @click="jump('/createResume')" class="c-2979ff">去填写</a></p>
                    </div>
                </div>
            </van-action-sheet>
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
const router = useRouter();
const useJob = useJobStore();

let props = defineProps<{
    options: CardItem,
    resumeInfo: ResumeInfo
}>();

let { options, resumeInfo = {} } = toRefs(props);

let isShow = ref(false);
let show = ref(false);

const jump = (src: string, params?: number) => {
  if (params) {
    router.push({ path: src, query: { positionId: params } })
  } else {
    router.push({ path: src })
  }
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

interface ResumeInfo {
    completion: number,
    modifyTime: string
}

//申请职位 
const apply = function () {
    isShow.value = true;
    if ((resumeInfo as ResumeInfo).modifyTime == undefined) {
        show.value = true;
    } else {
    }
}


</script>

<style lang="scss" scoped>
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

}
</style>