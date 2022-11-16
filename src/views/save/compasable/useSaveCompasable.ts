import { useSaveStore } from "@/stores/save";
import { reactive, ref } from "vue";
import { Toast } from 'vant';
export default function () {
    let userId = {
        userId:10000,
    }
    let SaveStore: any = useSaveStore();
    let active = ref();
    let count = ref(1);
    const loading = ref(false);
    let companyList = reactive([]);//公司列表
    let positionList = reactive([]);//职位列表
    let onRefresh = async () => {
        Toast('刷新成功');
        loading.value = false;
        getSaveList();
    }
    let getSaveList = async () => {
        let res = await SaveStore.getSaveList(userId);
        if (res.code == 200) {
            console.log(res);
            companyList.push(...((res.data).company));
            positionList.push(...((res.data).position));
            companyList = [...new Set(...[companyList])];
            positionList = [...new Set(...[positionList])];
        }
    }
    return {active, count,loading,companyList,positionList,onRefresh,getSaveList}
}