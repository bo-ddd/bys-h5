import { defineStore } from 'pinia'
import Api from "@/assets/api/z-api";

interface PositionParams{
    wishAddr?:string,
    wishEducation?:string,
    wishIndustryLeft?:string,
    wishMoneyLeft?:string,
    wishMoneyRight?:string,
    wishNature?:string,
    wishPositionLeft?:string
}
interface DeliveryPosition{
    positionId:number 
}
export const useJobStore = defineStore('job', () => {
    //获取期望薪资
    const getWishMoneyList = (payload: any = {}) => {
        return Api.getWishMoney(payload);
    };
    //  所属行业
    const getCompanyIndustryList = (payload: any = {}) => {
        return Api.getCompanyIndustry(payload);
    };
    //  职位类别
    const getPositionList = (payload: any = {}) => {
        return Api.getPosition(payload);
    };
    //  职位推荐
    const getSelectPositionList = (payload: any = {}) => {
        return Api.getSelectPosition(payload);
    };
    // 获取求职意向
    const getJobIntentList = (payload: any = {}) => {
        return Api.getJobIntent(payload);
    };
    // 修改求职意向
    const setModifyJobIntentInfo = (payload: any = {}) => {
        return Api.setModifyJobIntent(payload);
    };
    // 职位列表
    const selectPositionList = (payload:PositionParams)=>{
        return Api.selectPositionList(payload);
    };
    // 申请职位
    const deliveryPosition = (payload:DeliveryPosition)=>{
        return Api.deliveryPosition(payload);
    };
    // 查询简历完成度
    const getSelectCompletion = (payload:{}={})=>{
        return Api.selectCompletion(payload);
    };
    

    return {
        getWishMoneyList,
        getCompanyIndustryList,
        getPositionList,
        getSelectPositionList, 
        getJobIntentList,
        setModifyJobIntentInfo,
        selectPositionList,
        deliveryPosition,
        getSelectCompletion
    }
})
