<template>
    <div class="item" @click=handleTabItemClick>
        <img class="icon" :src="url" alt="">
        <span :style="style">
            <slot></slot>
        </span>
    </div>
</template>
<script setup lang="ts">
import { inject, type Ref, computed } from 'vue';
let props = defineProps<{
    src: string;
    activeUrl: string;
    name: string;
}>();

let { src, activeUrl, name } = props;
let selected = inject('selected') as Ref<string>;
let url = computed(() => selected.value == name ? activeUrl : src)
let style = computed(() => selected.value == name ? 'color:#1468cc' : ' ')

let handleTabClick = inject('handleTabClick') as (name: string) => void;

let handleTabItemClick = function () {
    handleTabClick(name);
}

</script>

<style scoped>
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
}

.icon {
    width: 2.4rem;
}
</style>