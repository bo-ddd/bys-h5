<template>
    <div class="nav">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { toRefs, provide } from 'vue';

let props = defineProps<{
    modelValue: string;
}>();
let { modelValue } = toRefs(props);

// 设置v-model的值
let emit = defineEmits(['update:modelValue', 'tab']);

let handleTabClick = function (name: string): void {
    emit('tab', name)
    emit('update:modelValue', name);
};
provide('selected', modelValue);
// 把设置参数的方法提供给子组件
provide('handleTabClick', handleTabClick);


</script>


<style scoped>
.nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}
</style>