import { useSaveStore } from "@/stores/save";
import { reactive, ref } from "vue";
import { Toast } from 'vant';
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
    }
    interface Company {
        companyAddr: string | null;
        companyId:number;
        companyName:string | null;
        companyPositionCount:number | null;
        companySize:number | string | null;
    }
    interface PositionPayload{
        userId:number;
        bool?:boolean;
        pageSize:number;
        pageIndex:number;
    }
    const positionPayload:PositionPayload= reactive({ 
        userId: 10000,
        bool:false,
        pageSize:10,
        pageIndex:1,
    })
    const companyPayload:PositionPayload = reactive({
        userId: 10000,
        bool:true,
        pageSize:10,
        pageIndex:1,
    })
    let SaveStore: any = useSaveStore();
    let active = ref();
    let count = ref(1);
    const loading = ref(false);
    const companyLoading = ref(false);
    let companyList :Company[]= reactive([]);//公司列表
    let positionList: Position[] = reactive([]);//职位列表
    const onRefresh = async () => {
        Toast('刷新成功');
        loading.value = false;
        getSaveList();
    }
    const onRefreshCompany = async () => {
        Toast('刷新成功');
        companyLoading.value = false;
        getCompanyList();
    }
    //获取职位的列表
    const getSaveList = async () => {
        const res:Res<{data:any}> = await SaveStore.getSaveList(positionPayload);
        if (res.code == 200) {
            console.log('-----------------我是收藏职位的列表-----------------');
            console.log(res);
            positionList.push(...((res.data).data));
            positionList = [...new Set(...[positionList])];
        }
    }
    //获取公司的列表
    const getCompanyList = async () => {
        const res:Res<{data:any}> = await SaveStore.getSaveList(companyPayload);
        if(res.code == 200){
            console.log('--------------我是收藏企业的列表---------------');
            console.log(res);
            companyList.push(...((res.data).data));
            companyList = [...new Set(...[companyList])];
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
    const parseCompanyDesc:(str:string)=>string=(str:string)=>{
        return str.replace(/\s*\-\s*/,'/');
    }
    return { active, count, loading, companyList, positionList, onRefresh, getSaveList,parseStr,parseCompanyDesc,getCompanyList,onRefreshCompany,companyLoading}
}