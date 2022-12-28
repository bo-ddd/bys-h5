<script lang="ts" setup>
import Card from '@/components/card'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { areaList } from '@vant/area-data';
import { useJobStore } from "@/stores/job";
import { useFeedbackStore } from "@/stores/feedBack";
const useJob = useJobStore();
const feedbackStore = useFeedbackStore();

let router = useRouter();
let jump = (url: string) => {
    router.push({ path: url })
}

let cardList = ref();


/**
 * 职位
 */
const activeId = ref(0);  //右侧的id
const activeIndex = ref(0); //左侧的索引

let item3 = ref();
const positionSelect = () => {
    console.log(activeId.value);
    console.log(activeIndex.value);
    item3.value.toggle();
}

let items: any[] = reactive([]);
const getPositionList = async () => {
    let res: any = await useJob.getPositionList();
    let data = res.data;
    data.forEach((item: any) => {
        let children: any[] = [];
        item.positionDownList.forEach((item: any) => {
            children.push({
                text: item.positionName,
                id: item.sortId
            })
        });
        items.push({
            id: item.sortId,
            text: item.positionTypeName,
            children: children
        });
    })
}
getPositionList();

/***
 * 地区
 */
const item = ref();
let addressTitle = ref("地区");
const onConfirm = (e: { name: string, code: string }[]) => {
    e.forEach((item, index) => {
        if (item !== undefined) {
            if (item.name !== '') {
                addressTitle.value = item.name;
            } else if (index == 0) {
                addressTitle.value = '不限';
            }
        }
    })
    item.value.toggle();
};



/***
 * 工作性质
 */
interface Item { id: number, label: string, isClass?: boolean }

const natureArr = reactive([
    { id: 1, label: "不限", isClass: true },
    { id: 2, label: "实习", isClass: false },
    { id: 3, label: "全职", isClass: false },
])

const natureFn = (arr: any, item: Item) => {
    arr.forEach((item: Item) => item.isClass = false);
    item.isClass = true;
}


/**
 * 学历要求
 */
const educationSeleArr = ref();
const getEducation = async () => {
    let res: any = await feedbackStore.getEducationDrop({});
    if (res.code == 200) {
        educationSeleArr.value = res.data;
        educationSeleArr.value.forEach((item: Item) => {
            if (item.label == '不限') {
                item.isClass = true;
            } else {
                item.isClass = false;
            }
        })
    }
}
getEducation();
const educationFn = (item: Item) => {
    if (item.label == '不限') {
        educationSeleArr.value.forEach((item: Item) => item.isClass = false);
        item.isClass = true;
    } else {
        educationSeleArr.value.find((item: Item) => item.label == '不限')!.isClass = false;
        item.isClass = true;
    }
}


/*****
 * 薪资
 */
const wishMoneyArr = ref();
const getWishMoney = async () => {
    let res: any = await feedbackStore.getWishMoney({});
    if (res.code == 200) {
        wishMoneyArr.value = res.data;
        wishMoneyArr.value.forEach((item: Item) => {
            if (item.label == '不限') {
                item.isClass = true;
            } else {
                item.isClass = false;
            }
        })
    }
}
getWishMoney();

let item2 = ref();
const resetFilter = () => {
    wishMoneyArr.value.forEach((item: Item) => item.isClass = false);
    natureArr.forEach((item: Item) => item.isClass = false);
    educationSeleArr.value.forEach((item: Item) => item.isClass = false);

    educationSeleArr.value.find((item: Item) => item.label == '不限')!.isClass = true;
    natureArr.find((item: Item) => item.label == '不限')!.isClass = true;
    wishMoneyArr.value.find((item: Item) => item.label == '不限')!.isClass = true;
}



const submitFilter = ()=>{
    let checkNatur =  natureArr.find((item: Item) => item.isClass == true);
    let checkEduation =  educationSeleArr.value.filter((item: Item) => item.isClass == true);
    let checkwishMoney = wishMoneyArr.value.find((item: Item) => item.isClass == true);
    console.log(checkNatur);
    console.log(checkEduation);
    console.log(checkwishMoney);
    item2.value.toggle();
}


/***
 * 
 * 职位列表
 * 
 */

 const selectPositionList = async ()=>{
      let res:any = await useJob.selectPositionList({});
      if(res.code == 200){
        cardList.value = res.data;
        console.log(cardList.value);
        
      }
 }

 selectPositionList();


const onClickLeft = () => history.back();
</script>
<template>
    <van-nav-bar  left-text="返回" title="职位列表" left-arrow @click-left="onClickLeft" />
    <div class="position-list">
        <van-dropdown-menu>
            <van-dropdown-item title="职位" ref="item3">
                <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items" />
                <van-button type="primary" class="position-btn" @click="positionSelect()">确定</van-button>
            </van-dropdown-item>


            <van-dropdown-item :title="addressTitle" ref="item">
                <van-area :columns-placeholder="['不限', '不限', '不限']" @cancel="onConfirm" @confirm="onConfirm"
                    :area-list="areaList" />
            </van-dropdown-item>


            <van-dropdown-item title="筛选" ref="item2">
                <div class="screen">
                    <div class="screen-box">
                        <div class="screen-wrap">
                            <div class="screen-wrap_title">
                                <h2>工作性质</h2>
                            </div>
                            <div class="screen-wrap_countent">
                                <div v-for="item in natureArr" :class="item.isClass ? 'active' : 'item'"
                                    @click="natureFn(natureArr, item)">{{ item.label }}</div>
                            </div>
                        </div>

                        <div class="screen-wrap mt-10">
                            <div class="screen-wrap_title">
                                <h2>学历要求</h2>(复选)
                            </div>
                            <div class="screen-wrap_countent">
                                <div v-for="item in educationSeleArr" :class="item.isClass ? 'active' : 'item'"
                                    @click="educationFn(item)">{{ item.label }}</div>
                            </div>
                        </div>

                        <div class="screen-wrap mt-10">
                            <div class="screen-wrap_title">
                                <h2>薪资</h2>
                            </div>
                            <div class="screen-wrap_countent">
                                <div v-for="item in wishMoneyArr" :class="item.isClass ? 'active' : 'item'"
                                    @click="natureFn(wishMoneyArr, item)">{{ item.label }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="screen-btn">
                        <van-button class="screen-resu" type="default" @click="resetFilter()">重置</van-button>
                        <van-button class="screen-submit" type="primary" @click="submitFilter()">完成</van-button>
                    </div>
                </div>
            </van-dropdown-item>
        </van-dropdown-menu>


        <Card.Wrap>
            <Card.Item v-for="item in cardList"  :options="item"></Card.Item>
        </Card.Wrap>
    </div>
</template>
<style lang="scss" scoped>
.position-btn {
    width: 100%;
}

.screen {
    height: 68vh;
    background: #fff;

    .screen-btn {
        height: 15%;
        display: flex;
        align-items: center;
        padding: 0 2rem;

        .screen-resu {
            width: 30%;

        }

        .screen-submit {
            width: 70%;
            margin-left: 1rem;
        }
    }

    .screen-box {
        height: 85%;
        overflow: auto;

        .screen-wrap {
            .screen-wrap_title {
                padding: 1.8rem 1rem;
                display: flex;
                align-items: center;
                gap: 0 .8rem;
            }

            .screen-wrap_countent {
                display: flex;
                flex-wrap: wrap;
                gap: .7rem;
                width: 95%;
                margin: 0 auto;

                .item {
                    background-color: rgb(241, 241, 241);
                    padding: 1.1rem 1.85rem;
                    border-radius: .4rem;
                    font-size: 1.5rem;
                    border: .1rem solid rgb(241, 241, 241);
                    width: 7.5rem;
                    text-align: center;
                }

                .active {
                    background-color: rgb(241, 241, 241);
                    padding: 1.1rem 1.85rem;
                    border-radius: .4rem;
                    font-size: 1.5rem;
                    border: 1px solid rgb(241, 241, 241);
                    width: 7.5rem;
                    text-align: center;
                    border: .1rem solid rgb(227, 29, 55);
                    color: rgb(227, 29, 55);
                }
            }
        }
    }
}
</style>