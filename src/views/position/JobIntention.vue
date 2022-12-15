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
                                确定{{ showArea.length == 0 ? '' : showArea.length }}
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
import type { Ref } from "vue";
import type { JobInfo } from "./types/jobInfo"
import { reactive, ref, toRefs } from 'vue';
import { areaList } from '@vant/area-data';//地区
import { useJobStore } from "@/stores/job"//接口
import { Toast } from 'vant';

let useJob = useJobStore();


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
        jobInfo[key] = jobInfo[key]
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
        industryInfo[key] = industryInfo[key]
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
console.log(industryInfo)
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
    salary.value = handleMoney(value);
    console.log(value);
};
const handleMoney = function (value: any): string {
    return ((value[0].text) / 1000) + '-' + ((value[1].text) / 1000) + 'k'
}
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
let activeId = ref([]) as any;
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
console.log(items);

let navCity = ref(items[activeIndex.value]);
console.log('nav', navCity.value)
// 选择地区的事件

let workplace: any[] = reactive([]);
// 右侧
let handlWorkplaceItem = function (item: any): void {
    let index = workplace.indexOf(item);
    showArea.value.forEach((areaItem: any, index: number) => {
        if (areaItem.split('-')[1] == item.text) {
            workplace.splice(index, 1);
            console.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                log(workplace.splice(index, 1));
            showArea.value.splice(index, 1);
            console.log(showArea.value.splice(index, 1));
        }
    })
    console.log('----------------------')
    console.log([...new Set(showArea.value)]);
    console.log('wo',workplace)
    console.log('item',item);
    console.log('index',index);
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
}
// 重置地区
let workplaceReset = () => {
    workplace.length = 0;
    activeId.value.length = 0;
    showArea.value.length = 0;
}

// 保存
const submit = (): void => {
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

        // 修改
        const setModifyJobIntent = async (params: JobInfo) => {
            let res = await useJob.setModifyJobIntentInfo(params);
            console.log(res);
        }

        setModifyJobIntent({
            userId: 10000,
            wishAddr: [...new Set(showArea.value)].join(','),
            wishIndustryLeft: wishIndustryLeft.replace(/,$/, ''),
            wishIndustryRight: wishIndustryRight.replace(/,$/, ''),
            wishMoneyLeft: wishMoneyLeft,
            wishMoneyRight: wishMoneyRight,
            wishNature: wishNature,
            wishPositionLeft: wishPositionLeft.replace(/,$/, ''),
            wishPositionRight: wishPositionRight.replace(/,$/, ''),
        });

        localStorage.setItem('jobIndustry', JSON.stringify({
            job: jobInfo,
            industry: industryInfo,
            salary: salary.value,
            workNature: workNature.value,
            area: showArea.value
        }));
        // 返回
        history.back();
    }
}
let wishIndustryLeft: string = '';
let wishIndustryRight: string = '';
let wishPositionLeft: string = '';
let wishPositionRight: string = '';
let wishMoneyLeft: string = '';
let wishMoneyRight: string = '';
let wishNature: string = '';
const getJobIntent = async () => {
    let res: any = await useJob.getJobIntentList({ userId: 10000 });
    console.log('res', res);
    if (res.code == 200) {
        // 清空原来的 避免重复
        jobInfo.activeId.length = 0;
        jobInfo.columnsJob.length = 0;
        jobInfo.job.length = 0;
        industryInfo.activeId.length = 0;
        industryInfo.columnsIndustry.length = 0;
        industryInfo.industry.length = 0;
        //地区
        showArea.value = showArea.value.concat(res.data.wishAddr);
        workplace = res.data.wishAddr;
        console.log('workplace',workplace)
        console.log('showArea', showArea.value)
        items.forEach((items: JobInfo, index: number) => {
            res.data.wishAddr.forEach((item: JobInfo) => {
                if (item.split('-')[0] == items.text) {
                    console.log('items', items, index);
                    items.children.forEach((itemChildren: JobInfo, indexChildren: number) => {
                        if (item.split('-')[1] == itemChildren.text) {
                            // activeId.value.push(length-indexChildren+1)
                            console.log(indexChildren);
                            let length: number = index * (items.children.length) - (indexChildren + 1);
                            activeId.value.push(length == -1 ? 1 : length);
                        }
                    })
                }
            });
        });
        activeId.value = [...new Set(activeId.value)];
        console.log(activeId.value);
        // 薪资
        salary.value = res.data.wishMoney.replace(/000/g, '').split(',').join('-') + 'k';
        console.log(res.data.wishMoney);
        wishMoneyLeft = res.data.wishMoney.split(',')[0];
        wishMoneyRight = res.data.wishMoney.split(',')[1];
        // 工作性质
        workNature.value = res.data.wishNatureName;
        if (workNature.value = '全职和实习') {
            wishNature = '0';
        } else if (workNature.value = '实习') {
            wishNature = '1';
        } else {
            wishNature = '2';
        }
        // 职位
        let jobId = 0;
        res.data.wishPosition.forEach((item: JobInfo) => {
            // 修改求职意向 期望职位
            wishPositionLeft += item.positionIdOn + ',';
            wishPositionRight += item.positionIdDown + ',';

            jobId += Number(item.positionIdDown) * Number(item.positionIdOn);
            jobInfo.activeId.push(jobId);
            jobInfo.activeId = [...new Set(jobInfo.activeId)];
            jobInfo.columnsJob.push({ text: item.positionNameDown, id: jobId });
            jobInfo.job.push({ parent: item.positionNameOn, children: item.positionNameDown });
        })
        console.log('job', jobInfo.job);
        let industryId = 0;
        res.data.wishIndustry.forEach((item: JobInfo) => {
            console.log(item);
            // 修改求职意向 期望行业
            wishIndustryLeft += item.industryIdOn + ',';
            wishIndustryRight += item.industryIdDown + ',';

            industryId += Number(item.industryIdDown) * Number(item.industryIdOn)
            industryInfo.activeId.push(industryId);
            console.log(industryInfo.activeId)
            industryInfo.activeId = [...new Set(industryInfo.activeId)];
            industryInfo.columnsIndustry.push({ text: item.industryNameDown, id: industryId });
            industryInfo.industry.push({ parent: item.industryNameOn, children: item.industryNameDown });
        });
        console.log('industry', industryInfo.industry);
        localStorage.setItem('jobInfo', JSON.stringify(jobInfo));
        localStorage.setItem('industryInfo', JSON.stringify(industryInfo));
        console.log(jobInfo);
        console.log(res.data.wishPosition);
    }
}
getJobIntent()
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