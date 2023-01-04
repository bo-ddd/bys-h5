<script setup lang="ts">
import { ref } from "vue";
import { useHomeStore } from "@/stores/home";
import { useMineStore } from '@/stores/mineStores';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
const router = useRouter();
let userHome = useHomeStore();
let userMine = useMineStore();
let phoneInput = ref();
let smsCode = ref();
const regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const pattern = regPhone;
const submitLogin = async () => {
    if (!regPhone.test(phoneInput.value)) return;
    const res: any = await userHome.login({
        phone: phoneInput.value,
        smsCode: smsCode.value
    })
    if (res.code == 200) {
        let userSite = localStorage.getItem('userSite') ? localStorage.getItem('userSite') : '';
        if (userSite == null || userSite == '') {
            Toast({
                message: '请先设置站点设置',
                position: 'top',
            });
            jump('/siteSettings');
        } else {
            setSite(userSite)
            Toast({
                message: '登录成功',
                position: 'top',
            });
            let loginTime = setTimeout(() => {
                sessionStorage.setItem('token', res.data);
                clearTimeout(loginTime);
                jump('/');
            }, 1000);
        }
    } else {
        Toast({
            message: res.msg,
            position: 'top',
        });
    }
}

// 修改站点
async function setSite(payload: string) {
    const res: any = await userMine.setSite({ site: payload })
    if (res.code == 200) {
        window.localStorage.setItem('userSite', payload);
    }
}

const getSmsFn = async () => {
    if (!regPhone.test(phoneInput.value)) {
        Toast({
            message: "请输入手机号",
            position: 'top',
        });
        return;
    };
    const res: any = await userHome.getSms({ iphone: phoneInput.value, smsType: 1 });
    if (res.code == 200) {
        isSecond.value = true;
        smCode();
    }
}

const jump = (url: string) => {
    router.push({ path: url })
}


/*****
 * 
 * 验证码按钮的实现
 * 
 */
let second = ref(60);
let isSecond = ref(false);
const smCode = () => {
    second.value = 60;
    let codeInterVal = setInterval(() => {
        if (second.value == 0) {
            isSecond.value = false;
            clearInterval(codeInterVal)
        } else {
            second.value--;
        }
    }, 1000)
}

</script>

<template>
    <div class="login">
        <div class="login-wrap">
            <div>
                <h1>毕业申网络招聘平台</h1>
                <span class="c-747474">学生求职火热进行中</span>
            </div>

            <van-form>
                <van-cell-group inset>
                    <van-field clearable label-width="2rem" left-icon="phone-o" v-model="phoneInput" name="validator"
                        placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确手机号' }]" />

                    <van-field center clearable v-model="smsCode" left-icon="closed-eye" placeholder="请输入短信验证码">
                        <template #button>
                            <van-button size="small" class="" type="primary" v-if="!isSecond"
                                @click="getSmsFn()">发送验证码</van-button>
                            <van-button size="small" class="btn" type="primary" disabled v-show="isSecond">{{ second
}}s后重试</van-button>
                        </template>
                    </van-field>

                    <div class="c-747474 mt-10">使用手机验证码即可登录</div>
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit" @click="submitLogin()">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.van-cell) {
    padding: 1.8rem 0;
}

.btn {
    width: 8rem;
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
        gap: 2.4rem 0;
    }
}
</style>