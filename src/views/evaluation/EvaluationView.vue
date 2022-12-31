<script lang="ts" setup>
import { ref , watch} from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
let checked = ref(1);

watch(checked,()=>{

})

let toQuestion = ()=>{
    router.push({
        name:'question'
    });
}
</script>
<template>
    <div class="evaluation">
        <div class="un-evaluation">
            <img src="@/assets/images/ydd-1.png">
            <p class="fs-16 mt-36 fw-700">您未完成职业测评</p>
            <p class="pd-10_0 cl-grey">请点击下方按钮测评</p>
            <div class="btn fs-16 cl-fff mt-40" @click="toQuestion()">开始测评</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .evaluation{
        &>.un-evaluation{
            box-sizing: border-box;
            padding: 9.3rem 2rem;
            height: 100vh;
            text-align: center;
            &>img{
                width: 18rem;
            }
            &>.btn{
                background: #3b80fb;
                padding: 1.2rem 0;
                border-radius: .5rem;
            }
        }
        .fs-16{
            font-size: 1.6rem;
        }
        .fs-14{
            font-size: 1.4rem;
        }
        .cl-fff{
            color: #ffff;
        }
        .cl-grey{
            color: #9d9d9d;
        }
        .mt-36{
            margin-top: 3.6rem;
        }
        .pd-10_0{
            padding: 1rem 0;
        }
        .mt-40{
            margin-top: 4rem;
        }
        .fw-700{
            font-weight: 700;
        }
        .fw-500{
            font-weight: 500;
        }
    }
</style>