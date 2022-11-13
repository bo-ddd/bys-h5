<template>
    <div class="position-detail">
        <van-nav-bar class="title" title="职位详情"  left-arrow @click-left="back()" />
        <div class="container">
            <div class="position">
                <div class="title">
                    <h1 class="fs-24">传感器研发工程师</h1>
                    <p class="fs-12 cl-red fw-700">12-25k</p>
                </div>
                <div class="company-detial fs-12">
                    <p>上海市-青浦区</p>
                    <div class="line mg-0_5"></div>
                    <p>机电工程师</p>
                </div>
                <div class="education">硕士</div>
            </div>
            <div class="position-desc">
                <h2 class="fs-20">职位描述</h2>
                <div class="desc fs-14 cl-grey">
                    岗位职责:
                    <br>
                    1、负责航空/汽车压力传感器、转速传感器、温度传感器、振动传感器、开发;
                    <br>
                    2、和客户进行技术交流,明确客户需求,制定技术方案;
                    <br>
                    3、按照项目计划完成产品详细设计(3D、2D图纸、产品规范等技术文件);
                    <br>
                    4、支持电子工程师完成传感器电路设计
                    <br>
                    5、产品设计认可,向客户递交认可报告。
                    <br>
                    任职要求:
                    <br>
                    1、研究生及以上学历,机械、机电一体化、测控技术与仪器、电子技术与科学等相关专业;
                    <br>
                    2、可熟练使用一种三维设计软件进行结构设计;
                    <br>
                    3、掌握常用金属和工程塑料材料知识及加工工艺知识;
                    <br>
                    4、英语能力CET-4以上;
                    <br>
                    5、优秀者可适当放宽;
                </div>
            </div>
            <div class="work-address">
                <h2 class="fs-20">工作地址</h2>
                <div class="work">
                    <img src="@/assets/images/icon-lou.png" class="icon-16">
                    <div class="fs-14">上海市青浦区华纺路99弄(张江工业园青浦分园)99号6幢3楼</div>
                </div>
            </div>
            <div class="company-profile" @click="jump('/companyDetails')">
                <h2 class="fs-20">企业简介</h2>
                <div class="msg mt-20">
                    <img src="@/assets/images/company.png" class="icon-40">
                    <div class="company  ml-15">
                        <p>慧石(上海)测控科技</p>
                        <div class="desc">
                            <p>100-499人</p>
                            <div class="line"></div>
                            <p>机械/制造,仪器仪表/工业自动化</p>
                        </div>
                    </div>
                    <img src="@/assets/images/icon-arrow_right.png" class="icon-16">
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="options">
                <div class="option">
                    <img src="@/assets/images/company.png" class="icon-20">
                    <p class="fs-14">分享</p>
                </div>
                <div class="option">
                    <img src="@/assets/images/company.png" class="icon-20">
                    <p class="fs-14">收藏</p>
                </div>
            </div>
            <div class="btn cl-fff fs-14">投递简历</div>
        </div> 
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
let router = useRouter();
let back = ()=>{
    router.go(-1);
}  
let jump = (url: string) => {
  router.push({ path: url })
}
</script>
<style lang="scss" scoped>
.position-detail{
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
    &>.container{
        padding: 0 2rem;
        &>.position{
            padding: 2rem 0;
            border-bottom: 1px solid #eff1f3;
            &>.title{
                display: flex;
                padding: .5rem 0;
                justify-content: space-between;
            }
            &>.company-detial{
                display: flex;
                padding: .5rem 0;
                align-items: center;
            }
            &>.education{
                display: inline-block;
                padding: .5rem;
                background: #f2f3f5;
                color: #87878a;
            }
        }
        &>.position-desc{
            padding: 2.5rem 0;
            &>h2{
                padding: 1.5rem 0;
            }
        }
        &>.work-address{
            padding: 2.5rem 0;
            &>h2{
                padding:1.5rem 0;
            }
            &>.work{
                display: grid;
                grid-template-columns: 2rem auto;
            }
        }
        &>.company-profile{
            padding: 2rem 0 8rem 0;
            &>.msg{
                display: grid;
                grid-template-columns: 4rem auto 2rem;
                align-items: center;
                &>.company{
                    &>.desc{
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
    }
    &>.bottom{
        bottom: 0;
        width: 100vw;
        box-sizing: border-box;
        position: fixed;
        padding: 1rem 1.5rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        &>.options{
            display: flex;
            flex: 1;
            justify-content: space-around;
            align-items: center;
            &>.option{
                text-align: center;
            }
        }
        &>.btn{
            display: inline-block;
            padding: 1.5rem 8rem;
            border-radius: .5rem;
            background: #1989fa;
        }
    }
    .cl-red{
        color: #fb6342;
    }
    .line{
        height: .8rem;
        width: .1rem;
        background: #ccc;
    }
    .mg-0_5{
        margin: 0 .5rem;
    }
    .fs-24{
        font-size: 2.4rem;
    }
    .fw-700{
        font-weight: 700;
    }
    .fs-20{
        font-size: 2rem;
    }
    .cl-grey{
        color: #cececf;
    }
    .icon-16{
        width: 1.6rem;
    }
    .icon-40{
        width: 4rem;
    }
    .ml-15{
        margin-left: 1.5rem;
    }
    .cl-fff{
        color: #fff;
    }
    .icon-20{
        width: 2rem;
    }
}
</style>