import { defineStore } from 'pinia'
import Api from "@/assets/api/hs-api";
interface Save {
    companyId?: number,
    positionId?: number,
    userId: number,
}
interface PositionDetail{
    positionId:number;
}
export const usePositionDetailStore = defineStore('positionDetail', () => {
    // 收藏职位
    let setStarPosition = (payload:Save) => {
        return Api.setStarPosition(payload);
    }
    // 职位详情
    let getPositionDetail = (payload:PositionDetail)=>{
        return Api.getPositionDetail(payload);
    }

    return { setStarPosition,getPositionDetail }
})
