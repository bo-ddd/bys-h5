<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, provide, reactive } from "vue";
import Drop from "@/components/dropMenu/index";
import { areaList } from '@vant/area-data';

let router = useRouter();
let checkItem = ref('');
let back = () => {
    router.go(-1);
}
let checkFn = (name: string) => {
    checkItem.value = name;
}
let company = reactive({
    label:'企业性质',
    value:null,
});
let area = reactive({
    label:'区域',
    value:null,
})
let guiMo = reactive<Array<{ id:number,
    label:string,
    value:number,}>>([
    {
        id:1,
        label:'不限',
        value:1,
    },
    {
        id:1,
        label:'1-19人',
        value:2,
    },
    {
        id:1,
        label:'20-99人',
        value:3,
    },
])
let guimo = reactive({
    label:'规模',
    value:null,
})
let handleCompanyChange = (item:any)=>{
    company.label = item.label;
    company.value = item.value;
    console.log(company);
}
let  handleGuiMoChange = (item:any)=>{
    guimo.label = item.label;
    guimo.value = item.value;
    console.log(guimo);
}
let handleAreaChange = (e:any)=>{
    let targetArr = e;
    area.label = targetArr[e.length-1].name;
    area.value = targetArr[e.length-1].code;
    
}
const activeId = ref(1);
const activeIndex = ref(0);
const items = [
    {
        text: '浙江',
        children: [
            { text: '杭州', id: 1 },
            { text: '温州', id: 2 },
        ],
    },
    {
        text: '江苏',
        children: [
            { text: '南京', id: 5 },
            { text: '无锡', id: 6 },
        ],
    },
];

let companyType = reactive<Array<{
    id:number,
    label:string,
    value:number,
}>>([
    {
        id:1,
        label:'不限',
        value:1,
    },
    {
        id:1,
        label:'不限',
        value:1,
    },
    {
        id:1,
        label:'不限',
        value:1,
    },
]);

provide('checkItem', checkItem);
provide('checkItemFn', checkFn);
</script>
<template>
    <div class="enterprise">
        <van-nav-bar title="企业列表" left-arrow @click-left="back" />
        <div class="banner">
            <img src="@/assets/images/banner-1.png">
        </div>
        <div class="search-wrap">
            <div class="search">
                <img src="@/assets/images/icon-search.png" class="icon-16 mr-5">
                <input type="text" placeholder="搜索企业">
            </div>
        </div>
        <Drop.Wrap class="option-wrap">
            <Drop.Item title="互联网/IT">
                <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items" />
            </Drop.Item>
            <Drop.Item :title="area.label">
                <van-area  :area-list="areaList" :columns-num="2"  @confirm="handleAreaChange"/>
            </Drop.Item>
            <Drop.Item :title="guimo.label">
                <div v-for="item in guiMo" :key="item.id" class="option fs-14" @click="handleGuiMoChange(item)">
                    {{item.label}}
                </div>
            </Drop.Item>
            <Drop.Item :title="company.label">
                <div v-for="item in companyType" :key="item.id" class="option fs-14" @click="handleCompanyChange(item)">
                    {{item.label}}
                </div>
            </Drop.Item>
        </Drop.Wrap>
        <div class="list mask">
            <div class="item mb-5">
                <div class="left">
                    <img src="@/assets/images/company.png" class="icon-40">
                </div>
                <div class="right">
                    <div class="top">
                        <p class="fs-16">人保科技</p>
                        <div class="desc fs-14">
                            <p>上海市</p>
                            <div class="line mg-0_5"></div>
                            <p>10000人以上</p>
                            <div class="line mg-0_5"></div>
                            <p>电子商务</p>
                        </div>
                    </div>
                    <div class="btm just-between">
                        <div class="desc align-center fs-12">
                            <p>热招</p>
                            <p class="mg-0_5 cl-blue">数据中心 灾备岗</p>
                            <p>等42个职位</p>
                        </div>
                        <img src="@/assets/images/icon-arrow_right.png" class="icon-16">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <img src="@/assets/images/company.png" class="icon-40">
                </div>
                <div class="right">
                    <div class="top">
                        <p class="fs-16">人保科技</p>
                        <div class="desc fs-14">
                            <p>上海市</p>
                            <div class="line mg-0_5"></div>
                            <p>10000人以上</p>
                            <div class="line mg-0_5"></div>
                            <p>电子商务</p>
                        </div>
                    </div>
                    <div class="btm just-between">
                        <div class="desc align-center fs-12">
                            <p>热招</p>
                            <p class="mg-0_5 cl-blue">数据中心 灾备岗</p>
                            <p>等42个职位</p>
                        </div>
                        <img src="@/assets/images/icon-arrow_right.png" class="icon-16">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.enterprise {
    min-height: 100vh;

    :deep(.van-nav-bar__content) {
        height: 4rem;
    }
    :deep(.van-tree-select){
        z-index: 2;
        background: #fff;
    }

    :deep(.van-nav-bar__title) {
        font-size: 1.4rem;
        font-weight: 800;
    }

    :deep(.van-nav-bar__arrow) {
        color: #000;
        font-size: 2rem;
    }

    &>.banner {
        font-size: 0;
    }

    &>.search-wrap {
        padding: 1rem 1.5rem;
        background: #f8f8f8;

        &>.search {
            display: grid;
            grid-template-columns: 2.5rem auto;
            border: 1px solid #ccc;
            border-radius: .5rem;
            background: #fff;
            align-items: center;

            &>img {
                justify-self: end;
            }

            &>input {
                text-indent: .5rem;
                height: 3.6rem;
                font-size: 1.4rem;
            }
        }
    }

    &>.option-wrap {
        padding: 1.5rem 0;
    }

    &>.list {
        background: #f6f6f6;
        &>.item {
            background: #fff;
            padding: 1.2rem 0 1.2rem 2rem;
            display: grid;
            grid-template-columns: 4.2rem auto;

            &>.right {
                margin-left: .5rem;

                &>.top {
                    &>.desc {
                        display: flex;
                        align-items: center;
                        padding: 1rem 0;
                        border-bottom: 1px solid #ccc;
                    }
                }

                &>.btm {
                    padding: .5rem 2rem .5rem 0;
                }
            }
        }
    }

    .option{
        padding: 2rem 1.5rem;
        background: #fff;
        border-bottom: 1px solid #f6f7f9;
    }

    .icon-16 {
        width: 1.6rem;
    }

    .icon-40 {
        width: 4rem;
    }

    .icon-8 {
        width: .8rem;
    }

    .mg-0_5 {
        margin: 0 .5rem;
    }

    .mb-5 {
        margin-bottom: .5rem;
    }

    .line {
        height: .8rem;
        width: .1rem;
        background: #ccc;
    }

    .icon-16 {
        width: 1.6rem;
    }

    .cl-blue {
        color: #6a9efc;
    }
}
</style>