<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref , provide, watch} from "vue";
import Drop from "@/components/dropMenu/index";
let router = useRouter();
let checkItem = ref('');
let back = ()=>{
    router.go(-1);
}
let checkFn = (name:string)=>{
    checkItem.value = name;
}
provide('checkItem',checkItem);
provide('checkItemFn',checkFn);
</script>
<template>
    <div class="enterprise">
        <van-nav-bar title="企业列表" left-arrow @click-left="back" />
        <div class="banner">
            <img src="@/assets/images/banner-1.png">
        </div>
        <div class="search-wrap">
            <div class="search">
                <img src="@/assets/images/icon-search.png" class="icon-16 mr-5">
                <input type="text" placeholder="搜索企业">
            </div>
        </div>
        <Drop.Wrap class="option-wrap">
            <Drop.Item title="互联网/IT">
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
        <div class="list mask">
            <div class="item mb-5">
                <div class="left">
                    <img src="@/assets/images/company.png" class="icon-40">
                </div>
                <div class="right">
                    <div class="top">
                        <p class="fs-16">人保科技</p>
                        <div class="desc fs-14">
                            <p>上海市</p>
                            <div class="line mg-0_5"></div>
                            <p>10000人以上</p>
                            <div class="line mg-0_5"></div>
                            <p>电子商务</p>
                        </div>
                    </div>
                    <div class="btm just-between">
                        <div class="desc align-center fs-12">
                            <p>热招</p>
                            <p class="mg-0_5 cl-blue">数据中心 灾备岗</p>
                            <p>等42个职位</p>
                        </div>
                        <img src="@/assets/images/icon-arrow_right.png" class="icon-16">
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <img src="@/assets/images/company.png" class="icon-40">
                </div>
                <div class="right">
                    <div class="top">
                        <p class="fs-16">人保科技</p>
                        <div class="desc fs-14">
                            <p>上海市</p>
                            <div class="line mg-0_5"></div>
                            <p>10000人以上</p>
                            <div class="line mg-0_5"></div>
                            <p>电子商务</p>
                        </div>
                    </div>
                    <div class="btm just-between">
                        <div class="desc align-center fs-12">
                            <p>热招</p>
                            <p class="mg-0_5 cl-blue">数据中心 灾备岗</p>
                            <p>等42个职位</p>
                        </div>
                        <img src="@/assets/images/icon-arrow_right.png" class="icon-16">
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>
<style lang="scss" scoped>
.enterprise {
    min-height: 100vh;
    :deep(.van-nav-bar__content){
        height: 4rem;
    }
    :deep(.van-nav-bar__title){
        font-size: 1.4rem;
        font-weight: 800;
    }
    :deep(.van-nav-bar__arrow){
        color: #000;
        font-size: 2rem;
    }
    &>.banner{
        font-size: 0;
    }
    &>.search-wrap{
        padding: 1rem 1.5rem;
        background: #f8f8f8;
        &>.search{
            display: grid;
            grid-template-columns: 2.5rem auto;
            border: 1px solid #ccc;
            border-radius: .5rem;
            background: #fff;
            align-items: center;
            &>img{
                justify-self: end;
            }
            &>input{
                text-indent: .5rem;
                height: 3.6rem;
                font-size: 1.4rem;
            }
        }
    }
    &>.option-wrap{
        padding: 1.5rem 0;
    }
    &>.list{
        background: #f6f6f6;
        &>.item{
           background: #fff;
           padding: 1.2rem 0 1.2rem 2rem;
           display: grid;
           grid-template-columns: 4.2rem auto;
           &>.right{
                margin-left: .5rem;
               &>.top{
                    &>.desc{
                        display: flex;
                        align-items: center;
                        padding: 1rem 0;
                        border-bottom: 1px solid #ccc;
                    }
                }
                &>.btm{
                    padding: .5rem  2rem .5rem 0;
                    &>.desc{

                    }
                }
           }
        }
    }
    .icon-16{
        width: 1.6rem;
    }
    .icon-40{
        width: 4rem;
    }
    .icon-8{
        width: .8rem;
    }
    .mg-0_5{
        margin: 0 .5rem;
    }
    .mb-5{
        margin-bottom: .5rem;
    }
    .line{
        height: .8rem;
        width: .1rem;
        background: #ccc;
    }
    .icon-16{
        width: 1.6rem;
    }
    .cl-blue{
        color: #6a9efc;
    }
}
</style>