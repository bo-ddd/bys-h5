<template>
    <div>
        <Drop.Wrap class="option-wrap">
            <Drop.Item class="item" title="互联网/IT">
                我是内容
            </Drop.Item>
            <Drop.Item title="区域">
                我是内容2
            </Drop.Item>
            <Drop.Item title="规模">

            </Drop.Item>
            <Drop.Item title="企业性质">
                
            </Drop.Item>
        </Drop.Wrap>
    </div>
</template>

<script lang="ts" setup>
 import Drop from "@/components/dropMenu/index";
 import { provide,ref } from "vue";
 let checkFn = (name: string) => {
    checkItem.value = name;
}
 let checkItem = ref('');
 provide('checkItem', checkItem);
provide('checkItemFn', checkFn);
</script>

<style lang="scss" scoped>
.option-wrap{
    height:4rem;
    display: flex;
    align-items: center;
    border-bottom: .1rem solid rgb(219, 219, 219);
}

</style>

