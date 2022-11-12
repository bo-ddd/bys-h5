<template>
    <div class="login">
        <div class="login-wrap">
            <div>
                <h1>毕业申网络招聘平台</h1>
                <span class="c-747474">学生求职火热进行中</span>
            </div>
            <van-field clearable label-width="2rem" left-icon="phone-o" placeholder="请输入手机号" />
            <van-field  center clearable  left-icon="closed-eye" placeholder="请输入短信验证码">
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>
            <span class="c-747474">使用手机验证码即可登录</span>
            <van-button type="primary" round >主要按钮</van-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.van-cell){
    padding:1.8rem 0;
}
.login {
    .login-wrap {
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        gap:2.8rem 0;
    }
}
</style>