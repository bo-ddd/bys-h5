<template>
    <div class="wrap item just-center">
        <div class="container">
            <div class="header">
                <p class="fs-16">{{ options.title }}</p>
                <div class="align-center  mt-14">
                    <span class="fs-14 c-747474">{{ options.region }}</span>
                    <span class="fs-12 c-747474 gang">|</span>
                    <span class="fs-14 c-747474">{{ options.position }}</span>
                </div>
                <p class="fs-12  c-747474 education flex-ja-center mt-5">{{ options.education }}</p>
            </div>
            <div class="footer mt-14 align-center ">
                <img class="icon" :src="parseAssetFile(options.url)" alt="">
                <div class="">
                    <p class="fs-14">{{ options.companyName }}</p>
                    <span class="fs-12 c-747474">{{ options.count }}</span>
                    <span class=" gang c-747474">|</span>
                    <span class="fs-12 c-747474">{{ options.typeWork }}</span>
                </div>
            </div>
        </div>
        <div class="operation">
            <p class=" mt-14 c-fb5530 fs-14 fw-600">{{ options.wages }}</p>
            <van-button class="mt-20 btn " size="mini" type="primary" @click="isShow = true">申请</van-button>
            <van-action-sheet v-model:show="isShow" title="确认投递简历">
                <div class="content flex">
                    <van-icon name="checked" size="2.5rem" color="#2979ff"/>
                    <div class="title">
                        <p class="fs-16">在线投递简历</p>
                        <span class="fs-12 c-747474">2022-11-10 17:49 更新</span>
                    </div>
                    <p class="fs-14 c-747474">完成度：<span class="c-2979ff">60%</span></p>
                </div>
            </van-action-sheet>
        </div>
    </div>
</template>

<script setup lang="ts">
import useUtil from '@/assets/util';
import { ref,toRefs } from 'vue'


let { parseAssetFile } = useUtil()

interface Options {
    id: number,
    title: string,
    region: string,
    position: string,
    education: string,
    url: string,
    companyName: string,
    count: string,
    typeWork: string,
    wages: string,
}
let props = defineProps<{
    options: Options
}>();
let { options } = toRefs(props);
let isShow = ref(false);

</script>

<style lang="scss" scoped>
.item {
    border-bottom: .4rem solid #f5f5f5;
    justify-content: space-between;

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
            }
        }
    }

    .operation {
        .content{
            height: 61vh;
            padding: 2rem;
            gap: 1rem;
            .title{
                line-height: 2.5rem;
            }
        }
        .btn {
            margin-top: 2rem;
            border-radius: .5rem;
            padding: .5rem 1rem;
        }
    }
}
</style>