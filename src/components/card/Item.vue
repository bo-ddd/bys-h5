<template>
    <div class="wrap item just-center">
        <div class="container">
            <div class="header">
                <p class="fs-16">{{ options.positionName }}</p>
                <div class="align-center  mt-14">
                    <span class="fs-14 c-747474">{{ options.positionAddr }}</span>
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
            <van-button class="mt-20 btn fw-600" size="mini" type="primary" @click.stop="isShow = true">申请</van-button>
            <van-action-sheet v-model:show="isShow" title="确认投递简历">
                <div class="content">
                    <div class="flex">
                        <van-icon name="checked" size="2.5rem" color="#2979ff" />
                        <div class="title">
                            <p class="fs-16">在线投递简历</p>
                            <span class="fs-12 c-747474">2022-11-10 17:49 更新</span>
                        </div>
                        <p class="fs-14 c-747474">完成度：<span class="c-2979ff">60%</span></p>
                    </div>
                    <van-button class="btn-confirm fs-14" type="primary" @click="isShow = false">确认投递</van-button>
                </div>
            </van-action-sheet>
        </div>
    </div>
</template>

<script setup lang="ts">
import useUtil from '@/assets/util';
import { ref, toRefs } from 'vue'
import type { CardItem } from '../../views/position/types/card';

let { parseAssetFile } = useUtil()

let props = defineProps<{
    options: CardItem
}>();
let { options } = toRefs(props);
let isShow = ref(false);

</script>

<style lang="scss" scoped>
.item {
    // border-bottom: .4rem solid #f5f5f5;
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