<script lang="ts" setup>
import Card from '@/components/card'
import { ref, reactive } from 'vue'
import { useRouter,useRoute } from 'vue-router';
import { areaList } from '@vant/area-data';
import { useJobStore } from "@/stores/job";
import { useFeedbackStore } from "@/stores/feedBack";
import { usePositionDetailStore } from "@/stores/positonDetail";
import { Toast } from 'vant';
import type {Ref} from "vue";
const positionDetailStore = usePositionDetailStore();
const useJob = useJobStore();
const feedbackStore = useFeedbackStore();

let router = useRouter();
let route = useRoute();


const jump = (src: string, params?: number) => {
    if (params) {
        router.push({ path: src, query: { positionId: params } })
    } else {
        router.push({ path: src })
    }
}

let cardList = ref();

// 查询简历完成度
let resumeInfo = ref();
const getSelectCompletion = async () => {
    let res: any = await useJob.getSelectCompletion();
    if (res.code == 200) {
        if (res.data.companyId != null) {
            resumeInfo.value = res.data;
        } else {
            resumeInfo.value = {
                completion: 0,
                modifyTime: ''
            }
        }
    }
}
getSelectCompletion();


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


/**
 * 职位
 */
const activeId:any = ref("不限");  //右侧的id
const activeIndex = ref(0); //左侧的索引

let item3 = ref();
let posttionTitle = ref("职位");

////////职位params
let checkNatur:any = reactive({});
let wishIndustry:any = reactive({});
let wishPosition = reactive({});

let eduation = ref();
let wishMoneyLeft = ref();
let wishMoneyRight = ref();
let wishAddrStr = ref();
const positionSelect = async () => {
    if(items.length !== 0){
        wishIndustry = items[activeIndex.value];
        wishPosition = items[activeIndex.value].children.find((item: any) => item.id == activeId.value);
        posttionTitle.value = (wishPosition as {text:string}).text;
    }
    let res: any = await useJob.selectPositionList({
        wishNature: checkNatur?.label,
        wishEducation: eduation.value,
        wishMoneyLeft:wishMoneyLeft.value,
        wishMoneyRight:wishMoneyRight.value,

        wishIndustryLeft: Number((wishIndustry as {id:number}).id),
        wishPositionLeft:activeId.value,
        wishAddr: wishAddrStr.value || "不限",
    })
    if (res.code == 200) {
        cardList.value = res.data;
    }
    item3.value.toggle();
}



/*****
 * 
 * 跳过来查询
 * 
 */
 const position = async(positionId:number)=>{
    
    let res: any = await useJob.selectPositionList({
        wishIndustryLeft: Number(positionId),
        wishNature: checkNatur?.label,
        wishEducation: eduation.value,
        wishMoneyLeft:wishMoneyLeft.value,
        wishMoneyRight:wishMoneyRight.value,
        wishPositionLeft:activeId.value,
        wishAddr: wishAddrStr.value || "不限",
    })
    if (res.code == 200) {
        cardList.value = res.data;
    }
 }

 const selectPostitionList = async ()=>{
  let res: any = await useJob.selectPositionList({
        wishNature: checkNatur?.label,
        wishEducation: eduation.value,
        wishMoneyLeft:wishMoneyLeft.value,
        wishMoneyRight:wishMoneyRight.value,

        wishIndustryLeft: Number((wishIndustry as {id:number}).id),
        wishPositionLeft:activeId.value,
        wishAddr: wishAddrStr.value || "不限",
    })
    if (res.code == 200) {
        cardList.value = res.data;
    }
 }
  

if(route.query.positionId){
    wishIndustry.id = route.query.positionId;
    posttionTitle.value = route.query.positionName as string;
    position(route.query.positionId as any);
}





/***
 * 地区
 */

const item = ref();
let addressTitle = ref("地区");
const onConfirm = async (e: { name: string, code: string }[]) => {
    let wishAddress: { name: string; code: string; }[] = [];
    e.forEach((item, index) => {
        if (item !== undefined) {
            if (item.name !== '') {
                wishAddress.push(item);
                addressTitle.value = item.name;
            } else if (index == 0) {
                addressTitle.value = '不限';
            }
        }
    })
     wishAddrStr.value = wishAddress.map(item => item.name).toString();
    let res: any = await useJob.selectPositionList({
        wishNature: checkNatur?.label,
        wishEducation: eduation.value,
        wishMoneyLeft:wishMoneyLeft.value,
        wishMoneyRight:wishMoneyRight.value,

        wishIndustryLeft: Number((wishIndustry as {id:number}).id),
        wishPositionLeft:activeId.value,
        wishAddr: wishAddrStr.value || "不限",
    })
    if (res.code == 200) {
        cardList.value = res.data;
    }

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




const submitFilter = async () => {
     checkNatur = natureArr.find((item: Item) => item.isClass == true);
    let checkEduation = educationSeleArr.value.filter((item: Item) => item.isClass == true);
    let checkwishMoney = wishMoneyArr.value.find((item: Item) => item.isClass == true);
     eduation.value = checkEduation.map((item: any) => item.label).toString();
    if (checkwishMoney.label == "不限") {
        wishMoneyLeft.value = "不限";
        wishMoneyRight.value = "不限"
    } else if (checkwishMoney.label == "30K以上") {
        wishMoneyLeft.value = "30000";
        wishMoneyRight.value = "不限"
    } else {
        let wishMoney = checkwishMoney.label.split("-");
        let regMoney = /[0-9]+/;
        wishMoneyLeft.value = wishMoney[0].replace(regMoney, (val: string) => val + "000");
        wishMoney[1].replace(regMoney, (val: string) => {
            wishMoneyRight.value = val + "000";
        });
    }

    let res: any = await useJob.selectPositionList({
        wishNature: checkNatur?.label,
        wishEducation: eduation.value,
        wishMoneyLeft:wishMoneyLeft.value,
        wishMoneyRight:wishMoneyRight.value,

        wishIndustryLeft: Number((wishIndustry as {id:number}).id),
        wishPositionLeft:activeId.value,
        wishAddr: wishAddrStr.value || "不限",
    })

    if (res.code == 200) {
        cardList.value = res.data;
    }

    item2.value.toggle();
}


let positionId = ref();
const showCount = ref(false);
//申请职位 
const token = sessionStorage.getItem("token");
let show = ref(false);
let isResumeShow = ref(false);
const apply = function (id: number) {
  positionId.value = id;
  if (!token) {
    showCount.value = true
  } else {
    isResumeShow.value = true;
    if (resumeInfo.value.length == 0) {
      show.value = true;
    }
  }
}
// 申请职位接口
const deliveryJob = async (params: any) => {
  let res: any = await useJob.deliveryPosition(params);
  if (res.code == 200) {
    isResumeShow.value = false;
    selectPostitionList();
  }
}
// 确认投递
const delivery = function () {
  deliveryJob({
    resumeId: checked.value as number,
    positionId: positionId.value
  });
  isResumeShow.value = false;
  Toast('投递成功')
}


// 获取在线简历的接口
interface Resume {
  createTime: string,
  modifyTime: string,
  resumeId: number,
  resumeName: string,
  resumeUrl: string,
  isOnline: boolean,
  completion?: number,
}

let checked: Ref<number | null> = ref(null);//这个是选中简历id
let resumeList: Ref<Resume[]> = ref([]);

// let resumeInfo: any = ref();
async function getOnlineResume() {
  let res: any = await positionDetailStore.getOnlineResume({});
  if (res.code == 200) {
    resumeInfo.value = res.data;
    let check = resumeInfo.value.find((item: any) => {
      return item.isOnline == true;
    })
    if (check) {
      checked.value = check.resumeId;
    } else {
      if (resumeInfo.value.length) {
        checked.value = resumeInfo.value[0].resumeId;
      }
    }
    resumeInfo.value.sort((a: any, b: any) => {
      return b.isOnline - a.isOnline;
    });
  }
}
getOnlineResume();

//获取在线信息完成度
let onlineResume: any = ref();
const selectCompletion = async () => {
  let res: any = await positionDetailStore.selectCompletion({});
  if (res.code == 200) {
    let check = resumeList.value.find((item) => {
      return item.isOnline == true;
    })
    if (check) {
      check.completion = res.data.completion;
    }
    onlineResume.value = res.data.completion
  }

}
selectCompletion();
// 登录失效
const wxLogin = () => {
  Toast({
    message: '微信登录暂不支持,请用手机号码验证码登录。',
    position: 'top',
  });
}

const onClickLeft = () => history.back();
</script>
<template>
    <van-nav-bar left-text="返回" title="职位列表" left-arrow @click-left="onClickLeft" />
    <div class="position-list">
        <van-dropdown-menu>
            <van-dropdown-item :title="posttionTitle" ref="item3">
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
            <Card.Item  v-for="item in cardList" :key="item.companyId" class="mt-5" @click="jump('/positionDetail', item.positionId)"
                :options="item">
               <!-- 按钮 -->
          <template #button>
            <p class=" mt-14 c-fb5530 fs-14 fw-600 money">{{ !item.positionMoney ? '' :
    item.positionMoney.replace(/,/g, '-').replace(/0/g, '') + 'k'
}}</p>
            <p v-if="item.isDelivery" class="mt-30 fs-12 c-a8a8a8">已申请</p>
            <van-button v-if="!item.isDelivery" class="mt-20 btn fw-600 btn-apply" size="mini" type="primary"
              @click.stop="apply(item.positionId)">申请</van-button>
            <van-action-sheet @click.prevent.stop="" v-model:show="isResumeShow" title="确认投递简历">
              <div class="content" v-show="!(resumeInfo.length == 0)">
                <div class="pop">
                  <div class="container-resume">
                    <van-radio-group v-model="checked">
                      <div class="resume-item mt-5 pd-20_0" v-for="item in resumeInfo" :key="item.resumeId">
                        <van-radio :name="item.resumeId" icon-size="2rem">
                          <img class="icon-30 ml-15" src="@/assets/images/icon-resume.png">
                          <div class="resume ml-10">
                            <div class="top just-between mt-5">
                              <div class="fs-14">
                                {{ /在线简历/.test(item.resumeName) ? '在线简历' : item.resumeName }}</div>
                              <div class="fs-12 ml-40" v-if="item.isOnline">
                                <span class="c-5d5d5d">完成度:</span>
                                <span class="c-2979ff">{{ onlineResume ? onlineResume * 100
    : ''
}}%</span>
                              </div>
                            </div>
                            <div class="btm fs-12 c-5d5d5d">
                              {{ item.modifyTime }}{{ item.isOnline ? '更新' : '上传' }}
                            </div>
                          </div>
                        </van-radio>
                      </div>
                    </van-radio-group>
                  </div>
                  <div class="btn-wrap">
                    <div class="btn c-ffffff just-center fs-14" @click="delivery()">
                      确认投递</div>
                  </div>
                </div>
              </div>
              <div class="content" v-show="resumeInfo.length == 0">
                <div class="just-center flex sheet-content">
                  <p class="fs-14 c-747474">还未填写简历，点击<a href="" @click="jump('/createResume')" class="c-2979ff">去填写</a>
                  </p>
                </div>
              </div>
            </van-action-sheet>
            <van-popup v-model:show="showCount" closeable round :style="{ height: '25%', width: '80%' }">
              <div class="show-count_box">
                <div class="show-wrap">
                  <div>
                    <h1>登录毕业申</h1>
                  </div>
                  <div>
                    <van-button type="primary" class="ft" @click="jump('/login')">手机号码验证登录</van-button>
                  </div>
                  <div class="c-747474" @click="wxLogin()">微信账号快捷登录</div>
                </div>
              </div>
            </van-popup>


          </template>
            </Card.Item>
        </Card.Wrap>

        <van-empty v-if="!cardList" description="还没有职位" />

    </div>
</template>
<style lang="scss" scoped>
.position-btn {
    width: 100%;
}

.position-list {
    background: rgb(246, 246, 246);
    min-height: calc(100vh - 4.6rem);
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

.show-count_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .show-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    h1 {
      font-weight: 500;
    }

    .ft {
      font-size: 1.8rem;
    }
  }
}
.sheet-content{
  height: 44vh;
}
.pop {
  height: 44rem;
  padding: 0 2rem;

  &>.container-resume {
    height: calc(42rem - 7rem);
    overflow-y: scroll;

    .resume-item {
      display: flex;
      align-items: center;
      border-bottom: .2px solid #d8dbe3;

      :deep(.van-radio__label) {
        display: flex;
        align-items: center;
      }

      .resume {
        flex: 1;
        height: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top {
          width: 20rem;
          display: flex;
        }
      }
    }
  }

  &>.btn-wrap {
    &>.btn {
      padding: 1.5rem 0;
      background: #1989fa;
    }
  }

}

.pd-20_0 {
  padding: 2rem 0;
}

.icon-30 {
  width: 3rem;
  height: 3rem;
}

.btn-confirm {
  width: 100%;
}

.to-resume {
  min-height: 55vh;
}

.btn-apply {
  margin-top: 3rem;
  border-radius: .5rem;
  padding: 1.4rem 1rem;
  background-color: #3b7dff;

}


:deep(.van-overlay) {
  background-color: #0000000e !important;
}
</style>