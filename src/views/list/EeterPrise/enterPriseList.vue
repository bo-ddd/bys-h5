<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, provide, reactive,type Ref ,watch,onMounted,nextTick} from "vue";
import Drop from "@/components/dropMenu/index";
import { areaList } from '@vant/area-data';
import { useCompanyListStore } from "@/stores/companyList";
let router = useRouter();
let Company = useCompanyListStore();
let maxCount:Ref<number> = ref() as Ref<number>;
interface Res<T> {
    code?: number;
    msg?: string;
    data: T;
}
interface Form {
    label: string;
    value: number | string | null;
}
interface TypeCompany {
    label: string,
    value: number,
    createTime: null | Date,
    modifyTime: null | Date,
}
interface GuiMo {
    label: string,
    value: number,
    createTime: Date | null,
    modifyTime: Date | null,
}
interface Child {
    id: string;
    industryTypeId: string;
    label: string;
    sortId: number;
    text: string;
    value: string;
}
interface Position {
    children: Child[];
    id: string | number;
    label: string;
    sortId: number;
    text: string;
    value: string;
}
interface CompanyDate{
    companyAddr?: string,
    companyFullName?:string,
    companyId?: number,
    companyIndustry?: string,
    companyIntroducation?:string,
    companyLogoUrl?: string,
    companyName?:string,
    companyNature?: string,
    companySize?: string,
    companyUrl?: string,
    isStar?: boolean,
    positionList?:Array<{
        positionDay: any
        positionDayMoeny:string,
        positionEducation: string,
        positionId: number,
        positionMonth: any,
        positionMonthMoney: string,
        positionName: string,
        positionPositive: any,
    }>
}
interface CompanyPayload {
  companyAddr: string,
  companyIndustryLeft: string,
  companyIndustryRight: string,
  companyName: string,
  companyNature: number,
  companySize: number,
  pageIndex: number,
  pageSize: number,
}
let jump = (url: string,companyId:number) => {
    router.push({
         path: url,
         query:{
            companyId:companyId
         }
     })
}

let checkItem = ref('');
let CompanyList : Ref<CompanyDate[]>  = ref([]);
let back = () => {
    router.go(-1);
}
let checkFn = (name: string) => {
    checkItem.value = name;
}
let company: Form = reactive({
    label: '企业性质',
    value: null,
});
let area: Form = reactive({
    label: '区域',
    value: null,
})
let position: Form = reactive({
    label: '互联网/IT',
    value: null,
})
let guiMo: GuiMo[] = reactive([]);
let guimo: Form = reactive({
    label: '规模',
    value: null,
})
const cmopanyPayload : CompanyPayload = reactive({
    pageIndex:1,
    pageSize:5,
    companyName:'',
}) as CompanyPayload;
// 公司性质的选择
const handleCompanyChange = (item: any) => {
    company.label = item.label;
    company.value = item.value;
    cmopanyPayload.companyNature = item.value;
    getCompanyList();
}
// 公司规模的选择
const handleGuiMoChange = (item: any) => {
    guimo.label = item.label;
    guimo.value = item.value;
    cmopanyPayload.companySize = item.value;
    getCompanyList();
}
// 选中地址
const handleAreaChange = (e: any[]) => {
    let targetArr = e;
    area.label = targetArr[e.length - 1].name;
    area.value = targetArr[e.length - 1].code;
    cmopanyPayload.companyAddr = targetArr[e.length - 1].name;
    getCompanyList();
}

// 选中右侧职位
const handlePositionChange = (item: any) => {
    position.label = item.label;
    position.value = item.value;
    let res;
    for(let i = 0 ; i < positoinList.length; i++){
        let resValue = positoinList[i].children.find(child=>{
            return child.label == item.label;
        })
        if(resValue){
            cmopanyPayload.companyIndustryLeft = positoinList[i].value;
            break;
        };
    }    
    cmopanyPayload.companyIndustryRight = item.value;
    getCompanyList();
}


const activeId = ref(1);
const activeIndex = ref(0);
const positoinList:Position[] = reactive([]);

let companyType: Array<TypeCompany> = reactive([]);

// 组件中传入的方法
provide('checkItem', checkItem);
provide('checkItemFn', checkFn);

// 这一部分是调用的接口

// 这个是获取企业规模的接口
const getGuiMoList = async () => {
    const res: Res<GuiMo[]> = await Company.getCompanySize();
    if (res.code !== 200) return;
    guiMo.push(...(res.data));
}
getGuiMoList();

// 这个是获取企业性质
const getCompanyNature = async () => {
    const res:Res<TypeCompany[]> = await Company.getCompanyNature();
    if (res.code !== 200) return;
    companyType.push(...(res.data));
}
getCompanyNature();

const getCompanyIndustry = async () => {
    const res: Res<Position[]> = await Company.getCompanyIndustry();
    if (res.code !== 200) return;
    let targetArr: Position[] = (res.data).slice();
    targetArr.forEach(item => {
        item.id = item.value;
        item.text = item.label;
        (item.children).forEach(child => {
            child.id = child.value;
            child.text = child.label;
        });
    });
    positoinList.push(...(targetArr));
}
getCompanyIndustry();
// 这个是获取企业的列表
const getCompanyList =async ()=>{
    let obj:{[propName : string] : any} = {};
    let key : keyof CompanyPayload;
    for (key in cmopanyPayload) {
        if(cmopanyPayload[key]){
            if(key){
                obj[key] = cmopanyPayload[key];
            }
        }
    }
    let res:Res<{
        data:{
            data:CompanyDate[],
        },
        maxCount:number,
    }> = await Company.getCompanyList(obj);
    if(res.code == 200){
        CompanyList.value = [];
        CompanyList.value.push(...res.data.data as any);
        CompanyList.value = [...new Set(CompanyList.value.map(t=>JSON.stringify(t)))].map(s=>JSON.parse(s));
        maxCount.value = res.data.maxCount;
    }
}
getCompanyList();
//监听公司名称的改变
watch(
  () => cmopanyPayload.companyName,
  (companyName) => {
    getCompanyList();
  }
)
const handleCancel = ()=>{
    area.value = null;
    area.label = '区域';
    cmopanyPayload.companyAddr = '';
    getCompanyList();
}
// 页面滚动到底部
onMounted(()=>{
    nextTick(()=>{
        window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
            if(cmopanyPayload.pageIndex*cmopanyPayload.pageSize<maxCount.value){
                cmopanyPayload.pageSize += 2;
                getCompanyList();
            }
          //写后台加载数据的函数
        }  
      }
    })
})
</script>
<template>
    <div class="enterprise">
        <van-nav-bar title="企业列表" :left-arrow="true" @click-left="back" />
        <div class="banner">
            <img src="@/assets/images/banner-1.png">
        </div>
        <div class="search-wrap">
            <div class="search">
                <img src="@/assets/images/icon-search.png" class="icon-16 mr-5">
                <input type="text" v-model.lazy="cmopanyPayload.companyName"  placeholder="搜索企业">
            </div>
        </div>
        <!-- 这个是模糊查询企业 -->
        <Drop.Wrap class="option-wrap">
            <!-- 行业的列表 -->
            <Drop.Item :title="position.label">
                <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="positoinList" @click-item="handlePositionChange" />
            </Drop.Item>
            <!-- 地址的列表 -->
            <Drop.Item :title="area.label">
                <van-area :area-list="areaList" :columns-num="2" @cancel="handleCancel"	 @confirm="handleAreaChange" />
            </Drop.Item>
            <!-- 规模的列表 -->
            <Drop.Item :title="guimo.label">
                <div v-for="item in guiMo" :key="item.label" class="option fs-14" @click="handleGuiMoChange(item)">
                    {{ item.label }}
                </div>
            </Drop.Item>
            <!-- 企业性质的列表 -->
            <Drop.Item :title="company.label">
                <div v-for="item in companyType" :key="item.label" class="option fs-14"
                    @click="handleCompanyChange(item)">
                    {{ item.label }}
                </div>
            </Drop.Item>
        </Drop.Wrap>
        <!-- 这个是企业的数据 -->
        <div class="list mask">
            <div class="item mb-5" @click="jump('/companyDetails',item?.companyId as number)" v-for="item in CompanyList" :key="item?.companyId">
                <div class="left">
                    <img :src="item?.companyLogoUrl" class="icon-40">
                </div>
                <div class="right">
                    <div class="top">
                        <p class="fs-16">{{item?.companyFullName}}</p>
                        <div class="desc fs-14">
                            <p>{{item?.companyAddr}}</p>
                            <div class="line mg-0_5"></div>
                            <p>{{item?.companySize}}人以上</p>
                            <div class="line mg-0_5"></div>
                            <p>{{item?.companyIndustry}}</p>
                        </div>
                    </div>
                    <div class="btm just-between">
                        <div class="desc align-center fs-12">
                            <p>热招</p>
                            <p class="mg-0_5 cl-blue">{{ item?.positionList?.length ? item.positionList[0].positionName : '' }}</p>
                            <p>等{{item?.positionList ? item.positionList.length : ''}}个职位</p>
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

    :deep(.van-tree-select) {
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

    .option {
        padding: 2rem 1.5rem;
        background: #fff;
        border-bottom: 1px solid #f6f7f9;
    }

    .icon-16 {
        width: 1.6rem;
    }

    .icon-40 {
        width: 4rem;
        height: 4rem;
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