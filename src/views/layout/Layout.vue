<template>
    <div class="layout">

        <div class="router-view">
            <RouterView></RouterView>
        </div>

        <div class="nav">
            <van-tabbar v-model="active" route>
                <van-tabbar-item v-for="item in tabbar " :key="item.id" :to="item.navigator">
                    {{ item.title }}
                    <template #icon="props">
                        <img :src="props.active ? parseAssetFile(item.activeUrl) : parseAssetFile(item.iconUrl)" />
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>


</template>


<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref } from 'vue'
import { parseAssetFile } from '@/assets/util';

let tabbar = [
    {
        id: 1,
        title: "招聘会",
        iconUrl: "icon-jobfairs.png",
        activeUrl: "icon-jobfairs_hover.png",
        navigator: "/jobfairs"
    },
    {
        id: 2,
        title: "职位推荐",
        iconUrl: "icon-position.png",
        activeUrl: "icon-position_hover.png",
        navigator: "/position"
    },
    {
        id: 3,
        title: "消息",
        iconUrl: "icon-news.png",
        activeUrl: "icon-news_hover.png",
        navigator: "/news"
    },
    {
        id: 4,
        title: "我的",
        iconUrl: "icon-mine.png",
        activeUrl: "icon-mine_hover.png",
        navigator: "/mine"
    }
];

const active = ref(0);
    // const onChange = (index) =>{
    //     console.log(index)
    // }
</script>
<style scoped>
.active {
    color: red;
}

.layout {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 5.5rem;
}

.router-view {
    overflow: auto;
}

.nav {
    padding: 0 0.8rem;
}
</style>