<template>
    <div class="siteSettings">
        <div class="nav-bar">
            <van-nav-bar title="站点设置" left-text="返回" left-arrow @click-left="onClickLeft" />
        </div>
        <div class="bgd ">
            <div class="title just-between">
                <div>
                    <h1>毕业申</h1>
                    <div class="test mt-16">校园招聘平台/让校招更简单</div>
                </div>
                <div>
                    <img src="@/assets/images/icon-zdsz-logo.png">
                </div>
            </div>

            <div class="mt-18 subject">
                <div class="test">请填写您的学校</div>
                <van-cell @click="showPopup" class="border_button">
                    <div v-if="popupValue">{{ popupValue }}</div>
                    <div v-else>
                        <span class="placeholder">请输入</span>
                    </div>
                </van-cell>
                <van-popup position="bottom" :style="{ height: '75%' }" v-model:show="popupShow">
                    <div class="popup-header just-between">
                        <div class="dialog">
                            <van-icon @click="cancel" class="van-icon_cross" name="cross" />
                        </div>
                        <div class="popupIsok" @click="hindPopup">确定</div>
                    </div>
                    <van-cell-group inset>
                        <div class="tips">请填写您的学校</div>
                        <van-field v-model="text" class="field-srk" clearable placeholder="请输入" />
                    </van-cell-group>
                </van-popup>
            </div>
        </div>
        <div class="footer">
            <div class="footer-test">
                十万企业 | 百万岗位 | 职等你来
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog } from 'vant';
const onClickLeft = () => history.back();
// popupShow 弹层打开与否
const popupShow = ref(false);
const popupValue = ref('');
let text = ref('');
// showPopup 打开遮罩层
const showPopup = () => {
    popupShow.value = true;
};
// hindPopup 关闭遮罩层
const hindPopup = () => {
    popupShow.value = false;
    popupValue.value = text.value;
}
// 弹层
function cancel() {
    Dialog.confirm({
        confirmButtonColor:'#3687f2',
        message:
            '名称尚未保存,确认要退出吗?',
    })
        .then(() => {
            // on confirm
            popupShow.value = false;
        })
        .catch(() => {
            // on cancel
        });
}
</script>

<style lang="scss" scoped>
.mt-16 {
    margin-top: 1.6rem;
}

.mt-18 {
    margin-top: 1.8rem;
}

:deep(.nav-bar .van-nav-bar) {
    background-color: rgba(0, 0, 0, 0);

    i {
        color: #fff;
    }

    span {
        color: #fff;
    }

    .van-ellipsis {
        color: #fff;
    }
}

:deep(.field-srk) {
    border-bottom: 1px solid #317aed;
    padding-left: .5rem;

    i {
        display: inline-block;
        box-sizing: border-box;
        padding: 0 .5rem;
    }
}

.siteSettings {
    position: relative;
    height: 100vh;

    .footer {
        width: 100%;
        position: absolute;
        bottom: 5rem;

        .footer-test {
            color: #8f8f8f;
            text-align: center;
        }
    }

    &>.nav-bar {
        position: absolute;
        top: 0;
        width: 100%;
    }

    &>.bgd {
        width: 100%;
        background-image: url('@/assets/images/site-settings-bgd.png');
        background-repeat: no-repeat;
        background-size: 37.5rem 35rem;
        box-sizing: border-box;
        padding: 8.4rem 1.2rem 0 1.2rem;

        &>.title {
            box-sizing: border-box;
            padding: 0 1.2rem;

            h1 {
                color: #feffff;
                font-size: 2.2rem;
            }

            .test {
                color: #fefcf2;
                font-size: 1.2rem;
                padding: .4rem;
                border: 1px solid #68c2fa;
                border-radius: 0 .6rem 0 .6rem;
            }
        }

        &>.subject {
            background-color: #fff;
            box-sizing: border-box;
            border-radius: .8rem .8rem 0 0;
            padding: 6rem 0rem 7rem 0;

            .popup-header {
                padding: 1rem 1.4rem 3rem 1.4rem;

                &>.dialog {
                    color: #cccccc;
                    font-size: 1.5rem;
                }

                &>.popupIsok {
                    color: #427de3;
                    font-size: 1.5rem;
                }
            }

            .border_button::after {
                content: '';
                width: 91%;
                display: block;
                margin: 0 auto;
                border-bottom: 1px solid #f0f1f2;
            }

            .placeholder {
                color: #c8c9cc;
            }

            .tips {
                padding-left: .5rem;
            }

            &>.test {
                padding: 0 1.5rem;
                margin-bottom: 1.4rem;
                font-size: 1.2rem;
            }
        }
    }
}
</style>