<template>
    <div class="wrap">
        <header>
            <h1 class="fs-24">管理求职意向</h1>
        </header>
        <main>
            <p class="fs-14">期望职位</p>
            <van-cell center title="WEB前端开发" :border="false" class="fs-16" is-link>

            </van-cell>

            <p class="fs-14">期望行业</p>
            <van-cell center :border="false" class="fs-16" @click="showindustry = true" is-link to="">
                <template #title>
                    <span class="custom-title">{{ industry }}</span>
                    <span v-show="industry.length == 0" class="custom-title fs-16 ">不限</span>
                </template>
            </van-cell>
            <!-- <van-action-sheet v-model:show="showindustry" title="">
                <div class="content">
                    <van-tree-select v-model:active-id="activeIdsIndustry" v-model:main-active-index="activeIndexIndustry"
                        :items="columnsIndustry" />
                </div>
            </van-action-sheet> -->

            <p class="fs-14">期望薪资</p>
            <van-cell center :border="false" class="fs-16" @click="showSalary = true" is-link>
                <template #title>
                    <span class="custom-title">{{ salary }}</span>
                    <span v-show="salary.length == 0" class="custom-title fs-16 c-a8a8a8">请选择期望薪资</span>
                </template>
            </van-cell>
            <van-action-sheet v-model:show="showSalary" title="">
                <div class="content">
                    <van-picker title="" :columns="columnsSalary" @confirm="onConfirmSalary" @cancel="onCancelSalary" />
                </div>
            </van-action-sheet>

            <p class="fs-14">工作性质</p>
            <van-cell center :border="false" class="fs-16" @click="showWorkNature = true" is-link>
                <template #title>
                    <span class="custom-title">{{ workNature }}</span>
                    <span v-show="workNature.length == 0" class="custom-title fs-16 c-a8a8a8">请选择工作性质</span>
                </template>
            </van-cell>
            <van-action-sheet v-model:show="showWorkNature" title="">
                <div class="content">
                    <van-picker title="" :columns="columnsWorkNature" @confirm="onConfirmWorkNature"
                        @cancel="onCancelWorkNature" />
                </div>
            </van-action-sheet>

            <p class="fs-14">期望工作地</p>
            <van-cell center class="fs-16" @click="showWorkplace = true" is-link>
                <template #title>
                    <span class="custom-title">{{ showArea.join('、') }}</span>
                    <span v-show="showArea.length == 0" class="custom-title fs-16 c-a8a8a8">请选择期望工作地<span
                            class="fs-14">（最多可选择3个）</span></span>
                </template>
            </van-cell>
            <van-action-sheet v-model:show="showWorkplace" title="期望工作地">
                <div class="content content-workplace">
                    <!-- 地区 -->
                    <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items"
                        max='3' @click-item="handlWorkplaceItem" @click-nav="handlWorkplaceNav" />
                    <div class="btn wrap">
                        <van-button type="default" @click="workplaceReset" color="#f4f6f8" class="btn-reset">重置
                        </van-button>
                        <van-button type="default" @click="showWorkplace = false" color="#3b80fb" class="btn-determine">
                            确定{{ workplace.length == 0 ? '' : workplace.length }}
                        </van-button>
                    </div>
                </div>
            </van-action-sheet>
        </main>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from "vue";
import { areaList } from '@vant/area-data';//地区
import { useJobStore } from "@/stores/job"//接口

let useJob = useJobStore()

// 期望行业
let columnsIndustry: any[] = reactive([]);
let activeIdsIndustry =  ref([]);
const activeIndexIndustry = ref(0);
let showindustry = ref(false);
let industry: Ref<string> = ref('');
let getCompanyIndustry = async () => {
    let res = await useJob.getCompanyIndustryList({});
    let data = JSON.stringify(res.data);
    data = data.replace(/(\"sortId\"\:[1-9]+\,)/g,'');
    data = data.replace(/label/g, 'text');
    data = data.replace(/industryTypeId/g, 'id');
    data = data.replace(/(\"value\"\:\"[1-9]\"+\,)/g,' ');
    columnsIndustry = JSON.parse(data);
    console.log(columnsIndustry);
}
getCompanyIndustry()
// 期望薪资
let columnsSalary: any[] = reactive([]);
let showSalary = ref(false);
let salary: Ref<string> = ref('');
let getWishMoney = async () => {
    let res = await useJob.getWishMoneyList({});
    res.data.wishMoenyLeftList.forEach((item: any, index: number) => {
        let right = res.data.wishMoenyRightList.slice(index + 1, res.data.wishMoenyRightList.length)
        right = right.map((item: any) => { return { text: item.label } })
        columnsSalary.push({
            text: item.label,
            children: right
        })
    })
}
getWishMoney();
const onConfirmSalary = (value: any) => {//确认
    showSalary.value = false;
    console.log(value)
    salary.value = ((value[0].text) / 1000) + '-' + ((value[1].text) / 1000) + 'k'
};
const onCancelSalary = () => {//取消
    showSalary.value = false
};

// 工作性质-----------------------------------------
const columnsWorkNature = ['全职和实习', '实习', '全职',];
let showWorkNature = ref(false);
let workNature: Ref<string> = ref('');
const onConfirmWorkNature = (value: string) => {//确认
    showWorkNature.value = false
    workNature.value = value
};
const onCancelWorkNature = () => {//取消
    showWorkNature.value = false
};

// 期望工作地---------------------------------------------
let activeId = ref([]);
let activeIndex = ref(0);
let showWorkplace = ref(false);
let items: any = [];
let showArea: Ref<string[]> = ref([]);
interface Area {
    [propsName: number]: string;
}
// 省
let provinceList: Area = areaList.province_list
// 市
let cityList: Area = areaList.city_list
let index = 1;
//处理数据变成组件需要的数据
for (const provinceKey in provinceList) {
    let childrenArr = [];
    for (const cityKey in cityList) {
        if (provinceKey.toString().slice(0, 2) == cityKey.toString().slice(0, 2)) {
            childrenArr.push({
                text: cityList[cityKey],
                id: index++
            })
        }
    }
    items.push({
        text: provinceList[provinceKey],
        children: childrenArr
    })
}

let navCity = ref(items[activeIndex.value]);
console.log(navCity)
// 选择地区的事件
interface Workplace {
    text: string,
    id: string
}
let workplace: Workplace[] = reactive([]);
// 右侧
let handlWorkplaceItem = function (item: any): void {
    let index = workplace.indexOf(item);
    if (index !== -1) {
        workplace.splice(index, 1);
        showArea.value.splice(index, 1);
    }
    if (workplace.length < 3 && index == -1) {
        workplace.push(item);
        if (navCity) {
            let children = (navCity.value).children;
            if (children) {
                if (children.includes(item)) {
                    showArea.value.push(`${navCity.value.text}-${item.text}`);
                }
            }
        }
    }
}
// 左侧
let handlWorkplaceNav = function (index: number): void {
    navCity.value = items[index];
    console.log(items[index])
}
// 重置地区
let workplaceReset = () => {
    workplace.length = 0;
    activeId.value.length = 0;
    showArea.value.length = 0;
}


</script>

<style lang="scss" scoped>
:deep(.van-cell) {
    padding: 1rem 1.6rem 1rem 0;
}

:deep(.van-tree-select) {
    height: 44rem !important;
}

:deep(.van-tree-select__nav-item) {
    border-right: .1rem solid #e5e5e5;
    background-color: #ffffff;
}

:deep(.van-tree-select__nav-item:hover) {
    color: #3b80fb;
}

:deep(.van-tree-select__item--active) {
    color: #3b80fb;
}

:deep(.van-tree-select__nav) {
    flex: 2;
}

:deep(.van-sidebar-item--select:before) {
    $size: .8rem;
    left: 85%;
    width: $size;
    height: $size;
    background-color: #3b80fb;
    border-radius: 1rem;
}

.wrap {
    padding: 0 2rem;

    header {
        padding: 3rem 0;
    }

    .content-workplace {
        height: 80vh;
        display: grid;
        grid-template-rows: 44rem auto;

        .btn {
            display: grid;
            grid-template-columns: 30% 67%;
            gap: 1rem;

            :deep(.van-button--normal) {
                font-size: 1.6rem !important;
            }

            .btn-reset {
                color: #000000 !important;
            }
        }
    }
}
</style>