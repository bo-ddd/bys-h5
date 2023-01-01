<template>
    <div class="main">
        <div>
            <van-nav-bar  left-text="返回" left-arrow @click-left="onClickLeft" />
            <div class="proposal">
                <div class="proposal-header">
                    {{route.query.title}}
                </div>
                <div class="proposal-item">
                    <van-cell-group inset>
                        <van-field v-model="message" rows="3" autosize type="textarea" maxlength="50"
                            placeholder="请输入留言" show-word-limit />
                    </van-cell-group>
                </div>
                
                <div class="proposal-item ">
                    <van-cell-group inset>
                        <van-field v-model="phone" label="联系方式" placeholder="请输入用户名" />
                    </van-cell-group>
                </div>
            </div>
        </div>
        <div>
            <div class="footer">
             
            </div>
            <div class="submit-btn_box">
                <van-button class="submit-btn" type="success" @click="feedBack()">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFeedbackStore } from "@/stores/feedBack";
import { useRoute } from 'vue-router';
import { Toast } from 'vant';
let route = useRoute();
let useFeedBack = useFeedbackStore();
let phone  = ref("");
let message = ref("")
let feedBack = async ()=>{
     let res:any = await useFeedBack.feedback({
        opinion:message.value,
        phone:phone.value
     })
     if(res.code = 200){
        message.value = "";
        phone.value = "";
        Toast({
            message: "提交成功,会尽快处理",
            position: 'top',
        });
     }
  }

const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.main{
    display: grid;
    grid-template-rows:7fr 5fr;
}
.proposal {
    .pt2-l3 {
        padding: 2rem 3.2rem;
    }

    .ml-30 {
        margin-left: 3rem;
    }

    .proposal-header {
        border-top: .1rem solid rgb(240, 240, 240);
        border-bottom: .1rem solid rgb(240, 240, 240);
        padding: 2rem 3.2rem;
        font-size: 1.4rem;
        color: black;
    }

    .proposal-item {
        border-bottom: 1px solid rgb(240, 240, 240);
    }
}

.footer {
    display: flex;
    justify-content: center;
    margin-top: 50%;
}

.submit-btn_box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.submit-btn {
    margin: 0 auto;
    width: 16rem;
    height: 3.8rem;
}
</style>