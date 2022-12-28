<template>
    <div>
        <van-nav-bar title="期望职位" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items" max='3'
            @click-item="handlJobItem" @click-nav="handlJobNav" />
        <div class="btn">
            <div class="choice">
                <span class="fs-14 just-center">已选</span>
                <div class="align-center check">
                    <p v-for="item, index in showJob" :key="index">
                        <span class="check-job c-2979ff">{{ item.parent }}:{{ item.children }}
                            <span class="c-747474" @click="deliet(index, item)">
                                <van-icon name="cross" />
                            </span></span>
                    </p>
                </div>
            </div>
            <van-button type="default" @click="goBack" color="#3b80fb" class="btn-determine fs-16">
                确认({{ showJob.length }}/3)
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
import { useRouter } from 'vue-router';
const router = useRouter();
const useJob = useJobStore();

let items: any[] = reactive([]);
let getPosition = async () => {
    let res = await useJob.getPositionList({});
    let data = res.data;
    data.forEach((item: any) => {
        let children: any[] = [];
        item.positionDownList.forEach((item: any) => {
            children.push({
                text: item.positionName,
                id: item.sortId
            })
        });
        items.push({
            id: item.sortId,
            text: item.positionTypeName,
            children: children
        });
    })
}
console.log(items)
let activeId = ref([]);
let showJob: any = ref([]);
let columnsJob: any[] = reactive([]);
let jobInfo = JSON.parse(localStorage.getItem('jobInfo')!);

if (jobInfo) {
    console.log(jobInfo)
    activeId.value = Array.from(jobInfo.activeId);
    showJob.value = jobInfo.job
    columnsJob = jobInfo.columnsJob
}
let activeIndex = ref(0);
let navCity = ref(items[activeIndex.value]);
(async function () {
    await getPosition();
    navCity.value = items[activeIndex.value]
})()
// 返回
const onClickLeft = () => history.back();

// 右侧
let handlJobItem = function (item: TreeSelectChild): void {
    let bool = true;
    for (let i = 0; i < columnsJob.length; i++) {
        if (item.text == columnsJob[i].text) {
            columnsJob.splice(i, 1);
            showJob.value.splice(i, 1);
            bool = false;
        }
    }
    if (columnsJob.length == 3) {
        Toast('期望行业只能选择三项')
    }
    if (columnsJob.length < 3 && bool && showJob.value.length < 3) {
        columnsJob.push(item);
        if (navCity) {
            let children = (navCity.value).children;
            if (children) {
                if (children.includes(item)) {
                    showJob.value.push({ parent: navCity.value.text, children: item.text })
                }
            }
        }
    }

}
// 左侧
let handlJobNav = function (index: number): void {
    navCity.value = items[index];
}

//删除
let deliet: (index: number, el: any) => void = (index: number, el: any): void => {
    showJob.value = showJob.value.filter((item: any, cIndex: number) => { return index != cIndex })
    activeId.value = activeId.value.filter((item: any, cIndex: number) => { return index != cIndex })
    columnsJob = columnsJob.filter((item: any) => el.children != item.text)
}

// 点击确定返回上一级
const goBack = () => {
    let wishPositionLeft = ref('');
    let wishPositionRight = ref('');
    // 左
    items.forEach((item: any) => {
        showJob.value.forEach((items: any) => {
            wishPositionLeft.value += items.parent == item.text ? item.id + ',' : '';
        });
    })
    // 右
    columnsJob.forEach((item: any) => {
        wishPositionRight.value += item.id + ','
    })
    let wishPositionRighta = '';
    items.forEach((item: any) => {
        item.children.forEach((itemChildren: any) => {
            wishPositionRight.value.split(',').forEach(items => {
                if (itemChildren.id == Number(items)) {
                    if (item.id != 1) {
                        console.log(Number(items));
                        console.log(item.children.length)
                        console.log('----', Number(items) - item.children.length)
                        wishPositionRighta += (Number(items) - item.children.length) + ','
                    } else {
                        wishPositionRighta += items+','
                    }
                }
            });
        }); 
    });
    console.log('showJob.value', showJob.value);
    console.log('columnsJob', columnsJob)

    window.localStorage.setItem('jobInfo', JSON.stringify({
        job: showJob.value,
        activeId: activeId.value,
        columnsJob: columnsJob,
    }));
    window.localStorage.setItem('modifyJobInfo',
        JSON.stringify({
            wishPositionLeft: wishPositionLeft.value,
            wishPositionRight: wishPositionRighta,
        })
    );
    
    router.push({ path: "/jobIntention" });
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
    grid-template-columns: 20vw 72vw;
    align-items: center;

    .check {
        gap: .2rem;
        padding-left: 8vw;
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