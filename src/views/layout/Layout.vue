<template>
    <div class="layout">

        <div class="router-view">
            <RouterView></RouterView>
        </div>

        <div class="nav">
            <Tabbar.Warp v-model="select" @tab="nav">
                <Tabbar.Item v-for="item in tabbar" :key="item.id" :name="item.navigator" :src="url(item.iconUrl)"
                    :active-url="url(item.activeUrl)">
                    {{item.title}}
                </Tabbar.Item>
            </Tabbar.Warp>
        </div>
    </div>


</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Tabbar from '@/components/tabbar';
import useTabbar from './composables/useTabbar';
let { tabbar, select, nav } = useTabbar();
function url(url: string): string {
    return new URL(`../../assets/images/${url}`, import.meta.url).href;
}
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