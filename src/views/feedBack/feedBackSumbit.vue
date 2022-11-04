<template>
    <div class="main">
        <div>
            <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
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

                <div class="pt2-l3">
                    相关截图
                </div>
                <div class="proposal-item">
                    <van-uploader class="ml-30" v-model="fileList" multiple />
                </div>

                
                <div class="proposal-item ">
                    <van-cell-group inset>
                        <van-field label="联系方式" placeholder="请输入用户名" />
                    </van-cell-group>
                </div>
            </div>
        </div>
        <div>
            <div class="footer">
                <van-checkbox v-model="checked" checked-color="#24ff80" icon-size="1.4rem">允许开发者在48小时内通过客服消息联系我
                </van-checkbox>
            </div>
            <div class="submit-btn_box">
                <van-button class="submit-btn" type="success">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from 'vue-router';
const onClickLeft = () => history.back();
let route = useRoute();
let message = ref("")
const checked = ref('');
const fileList = ref([
    { url: 'https://unpkg.com/@vant/assets/leaf.jpeg' },
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    { url: '', isImage: true },
]);
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