<template>
    <div class="layout">

        <div class="router-view">
            <RouterView></RouterView>
        </div>

        <div class="nav">
            <van-tabbar v-model="active">
                <van-tabbar-item v-for="item, index in tabbar" :key="index" :name="item.navigator" :to="item.navigator">
                   <span class="fs-12"> {{ item.title }}</span>
                    <template #icon="props">
                        <img :src="props.active ? parseAssetFile(item.activeUrl) : parseAssetFile(item.iconUrl)" />
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>


</template>


<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router';
import { ref } from 'vue'
import { parseAssetFile } from '@/assets/util';
let active = ref("/jobfairs");
let router = useRouter();
let route = useRoute();
if(route.path == '/'){
    router.push({ path: "/jobfairs" });
}else{
    active.value = route.path;
}

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
        iconUrl: "icon-position-recommend.png",
        activeUrl: "icon-position-recommend_hover.png",
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
</script>
<style scoped>
:deep(.van-tabbar-item__icon img){
    width: 2rem;
    height: 2rem;
}
.active {
    color: red;
}
.layout {
    height: 100vh;
}
.nav{
    height: 6rem;
}
.router-view{
    height: calc(100vh - 6rem);
}
</style>