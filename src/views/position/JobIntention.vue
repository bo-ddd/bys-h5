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
            <van-cell center title="WEB前端开发" :border="false" class="fs-16" 
                @click="showWorkplace = true">
            </van-cell>
            <van-action-sheet v-model:show="showWorkplace" title="标题">
                <div class="content">内容</div>
            </van-action-sheet>
        </main>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
let showWorkplace = ref(false);
</script>

<style lang="scss" scoped>
:deep(.van-cell) {
    padding: 10px 16px 10px 0;
}

.wrap {
    padding: 0 2rem;
}

header {
    padding: 3rem 0;
}
</style>