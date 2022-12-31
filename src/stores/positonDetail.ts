import { defineStore } from 'pinia'
import Api from "@/assets/api/hs-api";
interface Save {
    companyId?: number,
    positionId?: number,
}
interface PositionDetail {
    positionId: number;
}
interface DeliveryPosition {
    positionId: number,
    resumeId: number,
}
export const usePositionDetailStore = defineStore('positionDetail', () => {
    interface CompanyPayload {
        companyAddr: string,
        companyIndustryLeft: string,
        companyIndustryRight: string,
        companyName: string,
        companyNature: number,
        companySize: number,
        pageIndex: number,
        pageSize: number,
      }
    // 收藏职位
    let setStarPosition = (payload: Save) => {
        return Api.setStarPosition(payload) as any;
    }
    // 职位详情
    let getPositionDetail = (payload: PositionDetail) => {
        return Api.getPositionDetail(payload) as any;
    }
    // 申请职位
    let deliveryPosition = (payload:DeliveryPosition) => {
        return Api.deliveryPosition(payload) as any;
    }
    //获取在线简历
    let getOnlineResume = (payload?:any)=>{
        return Api.getOnlineResume(payload) as any;
    }
    //获取在线简历信息完成度
    let selectCompletion = (payload?:CompanyPayload | {})=>{
        return Api.selectCompletion(payload) as any;
    }
    return { setStarPosition, getPositionDetail, deliveryPosition ,getOnlineResume,selectCompletion}
})
