<template>
    <div>
        <van-nav-bar title="求职意向" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="wrap">
            <header>
                <h1 class="fs-24">管理求职意向</h1>
            </header>
            <main>
                <p class="fs-14">期望职位</p>
                <van-cell center :border="false" class="fs-16" is-link to="/job">
                    <template #title>
                        <span class="custom-title"><span v-for="item, index in job" :key="index">{{ item.children }}
                                <span>{{ job.length - index - 1 == 0 ? '' : '、' }}</span> </span></span>
                        <span v-show="job.length == 0" class="custom-title fs-16 c-a8a8a8">请选择期望职位</span>
                    </template>
                </van-cell>

                <p class="fs-14">期望行业</p>
                <van-cell center :border="false" class="fs-16" @click="showindustry = true" is-link to="/industry">
                    <template #title>
                        <span class="custom-title"><span v-for="item, index in industry" :key="index">{{ item.children
                        }}
                                <span>{{ industry.length - index - 1 == 0 ? '' : '、' }}</span> </span></span>
                        <span v-show="industry.length == 0" class="custom-title fs-16 ">不限</span>
                    </template>
                </van-cell>

                <p class="fs-14">期望薪资</p>
                <van-cell center :border="false" class="fs-16" @click="showSalary = true" is-link>
                    <template #title>
                        <span class="custom-title">{{ salary }}</span>
                        <span v-show="salary.length == 0" class="custom-title fs-16 c-a8a8a8">请选择期望薪资</span>
                    </template>
                </van-cell>
                <van-action-sheet v-model:show="showSalary" title="">
                    <div class="content">
                        <van-picker title="" :columns="columnsSalary" @confirm="onConfirmSalary"
                            @cancel="onCancelSalary" />
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
                        <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex"
                            :items="items" max='3' @click-item="handlWorkplaceItem" @click-nav="handlWorkplaceNav" />
                        <div class="btn wrap">
                            <van-button type="default" @click="workplaceReset" color="#f4f6f8" class="btn-reset">重置
                            </van-button>
                            <van-button type="default" @click="showWorkplace = false" color="#3b80fb"
                                class="btn-determine">
                                确定{{ workplace.length == 0 ? '' : workplace.length }}
                            </van-button>
                        </div>
                    </div>
                </van-action-sheet>
            </main>
            <van-button type="primary" class="btn mt-150" @click="submit()">保存</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import type { Ref } from "vue";
import { areaList } from '@vant/area-data';//地区
import { useJobStore } from "@/stores/job"//接口
import { Toast } from 'vant';

let useJob = useJobStore();

const getJobIntent = async () => {
    let res = await useJob.getJobIntentList({userId:10000});
    console.log('res', res);
}
getJobIntent()
let jobIndustry = JSON.parse(localStorage.getItem('jobIndustry')!);
if (jobIndustry) {
    let { job: jobInfo,
        industry,
        salary,
        workNature,
        showArea } = toRefs(jobIndustry)
}

// 返回
const onClickLeft = () => history.back();
// 期望职位
let columnsJob: any[] = reactive([]);
let columnJob: any[] = reactive([]);
const activeIdsJob: Ref<any[]> = ref([]);
const activeIndexJob = ref(0);
let showJob = ref(false);
let job: any = ref([]);
let jobInfo = JSON.parse(localStorage.getItem('jobInfo')!);
interface Key {
    [propsName: string]: any
}
let key: keyof Key;
if (jobInfo) {
    for (key in jobInfo) {
        jobInfo[key] = JSON.parse(jobInfo[key])
    }
    console.log(jobInfo)
    if (jobInfo.job) {
        job.value = jobInfo.job;
    }
    if (jobInfo.activeId) {
        activeIdsJob.value = jobInfo.activeId;
    }
    if (jobInfo.columnsJob) {
        columnJob = jobInfo.columnsJob;
    }
}
// 期望行业
let columnsIndustry: any[] = reactive([]);
let columnIndustry: any[] = reactive([]);
const activeIdsIndustry: Ref<any[]> = ref([]);
let showindustry = ref(false);
let industry: any = ref([]);
let industryInfo = JSON.parse(localStorage.getItem('industryInfo')!);
if (industryInfo) {
    for (key in industryInfo) {
        industryInfo[key] = JSON.parse(industryInfo[key])
    }
    if (industryInfo.industry) {
        industry.value = industryInfo.industry;
    }
    if (industryInfo.activeId) {
        activeIdsIndustry.value = industryInfo.activeId;
    }
    if (industryInfo.columnsIndustry) {
        columnIndustry = industryInfo.columnsIndustry;
    }

}
// 期望薪资
let columnsSalary: any[] = reactive([]);
let showSalary = ref(false);
let salary: Ref<string> = ref('');
const getWishMoney = async () => {
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

// 保存
const submit = (): void => {
    console.log('job', jobInfo.job.length)
    if (!jobInfo.job.length) {
        Toast('请输入期望职位');
    }
    else if (salary.value.length == 0) {
        Toast('请输入期望薪资');
    }
    else if (workNature.value.length == 0) {
        Toast('请选择工作性质');
    }
    else if (showArea.value.length == 0) {
        Toast('请选择期望工作地');
    }
    else {
        Toast({
            message: '更新成功！',
            icon: 'success',
        });
        localStorage.setItem('jobIndustry', JSON.stringify({
            job: jobInfo,
            industry: industryInfo,
            salary: salary.value,
            workNature: workNature.value,
            area: showArea.value
        }));
        history.back();
    }
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

:deep(.van-nav-bar .van-icon) {
    color: #000000 !important;
}

:deep(.van-nav-bar__text) {
    color: #000000 !important;
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

    &>.btn {
        width: 100%;

    }
}
</style>