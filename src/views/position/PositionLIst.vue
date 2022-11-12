<script lang="ts" setup>
import Card from '@/components/card'
import { ref } from 'vue'


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

const options = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
];

const item = ref();
const value = ref(0);
const switch1 = ref(false);
const switch2 = ref(false);

const onConfirm = () => {
      item.value.toggle();
    };
</script>
<template>
    <div class="position-list">
        <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="options" />
            <van-dropdown-item title="筛选" ref="item">
                <van-cell center title="包邮">
                    <template #right-icon>
                        <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
                    </template>
                </van-cell>
                <van-cell center title="团购">
                    <template #right-icon>
                        <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
                    </template>
                </van-cell>
                <div style="padding: 5px 16px;">
                    <van-button type="danger" block round @click="onConfirm">
                        确认
                    </van-button>
                </div>
            </van-dropdown-item>
        </van-dropdown-menu>
        <Card.Wrap>
            <Card.Item v-for="item in cardList" :key="item.id" :options="item"></Card.Item>
        </Card.Wrap>
    </div>
</template>
<style lang="scss" scoped>
.position-list {}
</style>