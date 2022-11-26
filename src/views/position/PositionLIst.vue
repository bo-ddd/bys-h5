<script lang="ts" setup>
import Card from '@/components/card'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { areaList } from '@vant/area-data';

let router = useRouter();
let jump = (url: string) => {
    router.push({ path: url })
}

let cardList = [
    {
        id: 1,
        title: '机械工程师1',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k',
    },
    {
        id: 2,
        title: '机械工程师2',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k'
    },
    {
        id: 3,
        title: '机械工程师3',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k'
    },
    {
        id: 4,
        title: '机械工程师1',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k',
    },
    {
        id: 5,
        title: '机械工程师2',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k'
    },
    {
        id: 6,
        title: '机械工程师3',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k'
    },
    {
        id: 7,
        title: '机械工程师1',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k',
    },
    {
        id: 8,
        title: '机械工程师2',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k'
    },
    {
        id: 9,
        title: '机械工程师3',
        region: '上海市',
        position: '研发工程师',
        education: '硕士',
        url: 'company.png',
        companyName: '中国移动',
        count: '100-499',
        typeWork: '工程施工',
        wages: '12k-24k'
    },
]

const item = ref();
const value = ref(0);
const switch1 = ref(false);
const switch2 = ref(false);

const onConfirm = () => {
    console.log(item.value);

    item.value.toggle();
};
</script>
<template>
    <div class="position-list">
        <van-dropdown-menu>
            <!-- <van-dropdown-item v-model="value" :options="options" /> -->
            <van-dropdown-item title="职位" ref="item">

            </van-dropdown-item>

            <van-dropdown-item title="地区" ref="item">
                <van-area @cancel="onConfirm()" @confirm="onConfirm" :area-list="areaList" />
            </van-dropdown-item>

            <van-dropdown-item title="筛选" ref="item">
                <div class="mt-16">
                    <h2>工作性质</h2>
                </div>
            </van-dropdown-item>
        </van-dropdown-menu>


        <Card.Wrap @click="jump('/positionDetail')">
            <Card.Item v-for="item in cardList" :key="item.id" :options="item"></Card.Item>
        </Card.Wrap>
    </div>
</template>
<style lang="scss" scoped>
.position-list {}
</style>