<script lang="ts" setup>
import { computed, toRefs , onMounted,ref,inject} from "vue";
import type { Ref } from "vue";
import {  parseAssetFile } from "@/assets/util/index"
    let props = defineProps<{
        title:string,
    }>();
    let heigt = ref('');
    let data = toRefs(props);
    let container = ref(null);
    let { title } = data;
    let checkItem = ref(inject('checkItem'));
    let showImg = computed(()=>{
        return checkItem?.value == title.value ? 'icon-arrow-top_active.png' : 'icon-arrow_btm.png';
    })
    let checkFn = inject('checkItemFn') as (name:string)=>any;
    onMounted(()=>{
        heigt.value = `100vh - ${((container.value) as Element).getBoundingClientRect().top}px`;
    })
    let handleShowChange = ()=>{
        if(checkItem.value == title.value){
            checkFn('');
        }else{
            checkFn(title.value as string);
        }
    }
</script>
<template>
    <div class="drop-menu-item">
        <div class="title" @click="handleShowChange">
            <p :class="[checkItem == title ? 'cl-active' : '','fs-16']">{{title}}</p>
            <img :src="parseAssetFile(showImg)" class="icon-8 mg-0_5">
        </div>
        <div  ref="container">
            <div v-show="checkItem == title" class="container">
                <slot></slot>
            </div> 
        </div>
    </div>
</template>

<style lang="scss" scoped>
.drop-menu-item{
    &>.title{
        display: flex;
        align-items: center;
    }
    & .container{
        position: absolute;
        background: #d2d2d2;
        opacity: .3;
        height: calc(v-bind(heigt));
        width: 100vw;
        left: 0;
    }
    .fs-16{
        font-size: 1.6rem;
    }
    .cl-active{
        color: #458aff;
    }
    .icon-8{
        width: .8rem;
    }
    .mg-0_5{
        margin: 0 .5rem;
    }
}
</style>