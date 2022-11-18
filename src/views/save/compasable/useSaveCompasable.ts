import { useSaveStore } from "@/stores/save";
import { reactive, ref } from "vue";
import { Toast } from 'vant';
export default function () {
    interface Res{
        code:number;
        msg:string;
        data:{
            company:Company[];
            position:Position[];
        }
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
        companyId:number | null;
        companyName:string | null;
        companyPositionCount:number | null;
        companySize:number | string | null;
    }
    interface UserId{
        userId:number;
    }
    const userId:UserId= {
        userId: 10000,
    }
    let SaveStore: any = useSaveStore();
    let active = ref();
    let count = ref(1);
    const loading = ref(false);
    let companyList :Company[]= reactive([]);//公司列表
    let positionList: Position[] = reactive([]);//职位列表
    const onRefresh = async () => {
        Toast('刷新成功');
        loading.value = false;
        getSaveList();
    }
    const getSaveList = async () => {
        const res:Res = await SaveStore.getSaveList(userId);
        if (res.code == 200) {
            console.log(res);
            companyList.push(...((res.data).company));
            positionList.push(...((res.data).position));
            companyList = [...new Set(...[companyList])];
            positionList = [...new Set(...[positionList])];
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
    return { active, count, loading, companyList, positionList, onRefresh, getSaveList,parseStr,parseCompanyDesc}
}