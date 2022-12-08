<template>
    <div>
        <van-nav-bar title="期望行业" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items" max='3'
            @click-item="handlIndustryItem" @click-nav="handlIndustryNav" />
        <div class="btn">
            <div class="choice">
                <span class="fs-14 just-center">已选</span>
                <div class="align-center check">
                    <p v-for="item, index in showIndustry" :key="index">
                        <span class="check-industry c-2979ff">{{ item.parent }}:{{ item.children }}
                            <span class="c-747474"  @click="deliet(index)">
                                <van-icon name="cross" />
                            </span></span>
                    </p>
                </div>
            </div>
            <van-button type="default" @click="goBack" color="#3b80fb" class="btn-determine fs-16">
                确认({{ showIndustry.length }}/3)
            </van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
//接口
import { useJobStore } from "@/stores/job";
import { ref, reactive } from "vue";
import { Toast } from "vant";
import type { TreeSelectChild } from "vant"

const useJob = useJobStore();

let items: any[] = reactive([]);
let getCompanyIndustry = async () => {
    let res = await useJob.getCompanyIndustryList({});
    let data = res.data;
    data.forEach((item: any) => {
        let children: any[] = [];
        item.children.forEach((item: any) => {
            children.push({
                text: item.label,
                id: item.sortId
            })
        });
        items.push({
            id: item.sortId,
            text: item.label,
            children: children
        });
    })
}

let activeId = ref([]);
let showIndustry: any = ref([]);
let columnsIndustry: any[] = reactive([]);
let industryInfo = JSON.parse(localStorage.getItem('industryInfo')!);
interface Key {
    [propsName: string]: any
}
let key: keyof Key;
if (industryInfo) {
    for (key in industryInfo) {
        industryInfo[key] = JSON.parse(industryInfo[key])
    }
    activeId.value = industryInfo.activeId;
    showIndustry.value =industryInfo.industry
    columnsIndustry =industryInfo.columnsIndustry
}
let activeIndex = ref(0);
let navCity = ref(items[activeIndex.value]);
(async function () {
    await getCompanyIndustry();
    navCity.value = items[activeIndex.value]
})()
// 返回
const onClickLeft = () => history.back();

// 右侧
let handlIndustryItem = function (item: TreeSelectChild): void {
    let bool = true;
    for (let i = 0; i < columnsIndustry.length; i++) {
        if (item.text == columnsIndustry[i].text) {
            columnsIndustry.splice(i, 1);
            showIndustry.value.splice(i, 1);
            bool = false;
        }
    }
    if (columnsIndustry.length == 3) {
        Toast('期望行业只能选择三项')
    }
    if (columnsIndustry.length < 3 && bool && showIndustry.value.length < 3) {
        columnsIndustry.push(item);
        if (navCity) {
            let children = (navCity.value).children;
            if (children) {
                if (children.includes(item)) {
                    showIndustry.value.push({ parent: navCity.value.text, children: item.text })
                }
            }
        }
    }

}
// 左侧
let handlIndustryNav = function (index: number): void {
    navCity.value = items[index];
}

//删除
let deliet:(index:number)=>void = (index:number) : void => {
    showIndustry.value = showIndustry.value.filter((item:any,cIndex:number)=>{return index!=cIndex})
    activeId.value = activeId.value.filter((item:any,cIndex:number)=>{return index!=cIndex})
}

// 点击确定返回上一级
const goBack = () => {
    window.localStorage.setItem('industryInfo', JSON.stringify({
        industry: JSON.stringify(showIndustry.value),
        activeId: JSON.stringify(activeId.value),
        columnsIndustry: JSON.stringify(columnsIndustry),
    }));
    history.back();
};
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar .van-icon) {
    color: #000000 !important;
}

:deep(.van-nav-bar__text) {
    color: #000000 !important;
}

:deep(.van-cell) {
    padding: 1rem 1.6rem 1rem 0;
}

:deep(.van-tree-select) {
    height: calc(100vh - 20.5vh) !important;
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

.btn-determine {
    width: 100%;
    border-radius: 0;
}

.choice {
    height: 4.6rem;
    display: grid;
    grid-template-columns: 20vw 80vw;
    align-items: center;

    .check {
        gap: .4rem;
        width: 100%;
        overflow: scroll;

        &>p {
            white-space: nowrap;
            padding: .2rem;
            border-radius: 3rem;
            background-color: #ecf2fd;
        }
    }
}
</style>