<template>
    <div class="wrap">
        <header>
            <h1 class="fs-24">管理求职意向</h1>
        </header>
        <main>
            <p class="fs-14">期望职位</p>
            <van-cell center title="WEB前端开发" :border="false" class="fs-16" is-link to="">

            </van-cell>
            <p class="fs-14">期望行业</p>
            <van-cell center title="WEB前端开发" :border="false" class="fs-16" is-link to="">

            </van-cell>
            <p class="fs-14">期望薪资</p>
            <van-cell center title="WEB前端开发" :border="false" class="fs-16" is-link to="">

            </van-cell>
            <p class="fs-14">工作性质</p>
            <van-cell center title="WEB前端开发" :border="false" class="fs-16" is-link to="">

            </van-cell>
            <p class="fs-14">期望工作地</p>
            <van-cell center title="WEB前端开发" :border="false" class="fs-16" @click="showWorkplace = true">
            </van-cell>
            <van-action-sheet v-model:show="showWorkplace" title="期望工作地">
                <div class="content content-workplace">
                    <!-- 地区 -->
                    <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex"
                        :items="items" />
                </div>
            </van-action-sheet>
        </main>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { areaList } from '@vant/area-data';

console.log(areaList);
// 地区
let activeId = ref([1]);
let activeIndex = ref(0);
let showWorkplace = ref(false);
let items: any = [];

interface Provice {
    [propsName: number]: string;
}
// 省
let provinceList: Provice = areaList.province_list
console.log(areaList.province_list)
for (const provinceKey in provinceList) {
    items.push({ text: provinceList[provinceKey] })
}
// 市

console.log(items)
</script>

<style lang="scss" scoped>
:deep(.van-cell) {
    padding: 10px 16px 10px 0;
}

:deep(.van-tree-select) {
    height: 80vh !important;
}

:deep(.van-tree-select__nav-item) {
    border-right: 1px solid #e5e5e5;
}

:deep(.van-tree-select__nav) {
    flex: 2;
}

.wrap {
    padding: 0 2rem;

    header {
        padding: 3rem 0;
    }

    .content-workplace {
        height: 80vh;



    }
}
</style>