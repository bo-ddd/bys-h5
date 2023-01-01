import { reactive, ref,type Ref } from "vue";
import { Toast } from 'vant';
import { useSaveStore } from "@/stores/save";
export default function () {
    interface Res<T>{
        code:number;
        msg:string;
        data:T
    }
    interface Position {
        companyIndustry: string;
        companyLogoUrl: string;
        companyName: string | null;
        companySize: string | null;
        positionAddr: string | null;
        positionEducation: string | null;
        positionId: number;
        positionIndustry: string;
        positionMoney: string | null;
        positionName: string | null;
        positionStatus: string | null;
        isDelivery:boolean,
    }
    interface Company {
        companyAddr: string | null;
        companyId:number;
        companyName:string | null;
        companyPositionCount:number | null;
        companySize:number | string | null;
        positionNameList:Array<any>,
        companyLogoUrl:string,
    }
    interface PositionPayload{
        bool?:boolean;
        pageSize:number;
        pageIndex:number;
    }
    const positionPayload:PositionPayload= reactive({ 
        bool:false,
        pageSize:3,
        pageIndex:1,
    })
    const companyPayload:PositionPayload = reactive({
        bool:true,
        pageSize:3,
        pageIndex:1,
    })
    let SaveStore = useSaveStore();
    let active = ref();
    let count = ref(1);
    const loading = ref(false);
    const companyLoading = ref(false);
    let companyList :Ref<Company[]>= ref([]);//公司列表
    let positionList: Ref<Position[]> = ref([]);//职位列表
    let companyCount : Ref<number> =ref() as Ref<number>;//公司总条数
    let positionCount : Ref<number> = ref() as Ref<number>;//职位总条数
    const onRefresh = async () => {
        Toast('刷新成功');
        loading.value = false;
        if(positionPayload.pageIndex*positionPayload.pageSize < positionCount.value){
            positionPayload.pageIndex++;
            getSaveList();
        }
    }
    const onRefreshCompany = async () => {
        Toast('刷新成功');
        companyLoading.value = false;
        if(companyPayload.pageIndex*companyPayload.pageSize < companyCount.value){
            companyPayload.pageIndex++;
            getCompanyList();
        }
    }
    //获取职位的列表
    const getSaveList = async () => {
        const res:Res<{data:any,maxCount:number}> = await SaveStore.getSaveList(positionPayload);
        if (res.code == 200) {
            positionList.value.push(...((res.data).data));
            positionCount.value = res.data.maxCount;
            positionList.value = [...new Set(...[positionList.value])];
        }
    }
    //获取公司的列表
    const getCompanyList = async () => {
        const res:Res<{data:any,maxCount:number}> = await SaveStore.getSaveList(companyPayload);
        console.log('---------我是公司列表--------------');
        if(res.code == 200){
            companyList.value.push(...((res.data).data));
            companyCount.value = res.data.maxCount;
            companyList.value = [...new Set(...[companyList.value])];
        }
    }
    const parseStr:(str:string)=>string=(str:string)=>{
        try {
            const res:string[] = (str as string).split("-");
            return res[1].replace(/\s/,'');
        } catch (e) {
            return str;
        }
    }
    //转换地址的方法
    const parseAddr:(str:string)=>string=(str:string)=>{
        try {
           return str.split(',').join('-');
        } catch (error) {
            return str;
        }
    }
    //转换
    const parseMoney:(str:string)=>string = (str:string)=>{
        try {
            return str.split(',').map(item=>{
                return item.substring(0,item.length-3);
            }).join('-');
        } catch (error) {
            return str;
        }
    }
    //转换公司描述
    const parseCompanyDesc:(str:string)=>string=(str:string)=>{
        return str.replace(/\s*\-\s*/,'/');
    }
    return { active, count, loading, companyList, positionList, onRefresh, getSaveList,parseStr,parseCompanyDesc,getCompanyList,onRefreshCompany,companyLoading,parseAddr,companyCount,positionCount,parseMoney}
}