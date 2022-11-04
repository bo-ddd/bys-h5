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
        </div>
    </div>
</template>

<script setup lang="ts">
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.mt-16 {
    margin-top: 1.6rem;
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

.siteSettings {
    position: relative;

    &>.nav-bar {
        position: absolute;
        top: 0;
        width: 100%;
    }

    &>.bgd {
        width: 100%;
        height: 35rem;
        background-image: url('@/assets/images/site-settings-bgd.png');
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
    }
}
</style>