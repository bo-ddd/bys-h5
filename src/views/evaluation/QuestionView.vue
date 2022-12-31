<script lang="ts" setup>
import { ref, watch , computed} from "vue";
let checked = ref(1);
const currentRate = ref(0);


watch(checked, () => {
  
})

let text = computed(()=>{
    return currentRate.value + '%';
})
</script>
<template>
    <div class="evaluation">
        <div class="evaluation-question-wrap">
            <p class="title fs-14 cl-grey">以下共28道选择题,大约5分钟可以完成,所有题目都是必答题。</p>
            <div class="problem-item mt-40">
                <p class="problem fs-16 fw-500">1.你是否</p>
                <van-radio-group v-model="checked">
                    <van-radio icon-size="15px" class="check-item" name="1" shape="square">单选框 1</van-radio>
                    <van-radio icon-size="15px" class="check-item" name="2" shape="square">单选框 2</van-radio>
                </van-radio-group>
            </div>
            <div class="problem-item mt-40">
                <p class="problem fs-16 fw-500">1.你是否</p>
                <van-radio-group v-model="checked">
                    <van-radio icon-size="15px" class="check-item" name="1" shape="square">单选框 1</van-radio>
                    <van-radio icon-size="15px" class="check-item" name="2" shape="square">单选框 2</van-radio>
                </van-radio-group>
            </div>
            <div class="problem-item mt-40">
                <p class="problem fs-16 fw-500">1.你是否</p>
                <van-radio-group v-model="checked">
                    <van-radio icon-size="15px" class="check-item" name="1" shape="square">单选框 1</van-radio>
                    <van-radio icon-size="15px" class="check-item" name="2" shape="square">单选框 2</van-radio>
                </van-radio-group>
            </div>
            <div class="problem-item mt-40">
                <p class="problem fs-16 fw-500">1.你是否</p>
                <van-radio-group v-model="checked">
                    <van-radio icon-size="15px" class="check-item" name="1" shape="square">单选框 1</van-radio>
                    <van-radio icon-size="15px" class="check-item" name="2" shape="square">单选框 2</van-radio>
                </van-radio-group>
            </div>
            <div class="problem-item mt-40">
                <p class="problem fs-16 fw-500">1.你是否</p>
                <van-radio-group v-model="checked">
                    <van-radio icon-size="15px" class="check-item" name="1" shape="square">单选框 1</van-radio>
                    <van-radio icon-size="15px" class="check-item" name="2" shape="square">单选框 2</van-radio>
                </van-radio-group>
            </div>
            <div class="btn fs-16 cl-fff mt-40">提交</div>
        </div>
        <van-circle class="round" size="50" v-model:current-rate="currentRate" :rate="currentRate" layer-color="#ccc"	 :speed="100" :text="text" />
    </div>
</template>

<style lang="scss" scoped>
.evaluation {
    position: relative;
    &>.evaluation-question-wrap {
        padding: 2rem;

        &>.problem-item {
            &>.problem {
                padding: .5rem 0;
            }

            :deep(.check-item) {
                padding: 1.6rem 0;
                font-size: 1.8rem;
            }
        }

        &>.btn {
            text-align: center;
            background: #3b80fb;
            padding: 1.2rem 0;
            border-radius: .5rem;
        }
    }
    .round{
        position: fixed;
        right: 20px;
        bottom: 100px;
    }

    .fs-16 {
        font-size: 1.6rem;
    }

    .fs-14 {
        font-size: 1.4rem;
    }

    .cl-fff {
        color: #ffff;
    }

    .cl-grey {
        color: #9d9d9d;
    }

    .mt-36 {
        margin-top: 3.6rem;
    }

    .pd-10_0 {
        padding: 1rem 0;
    }

    .mt-40 {
        margin-top: 4rem;
    }

    .fw-700 {
        font-weight: 700;
    }

    .fw-500 {
        font-weight: 500;
    }
}
</style>