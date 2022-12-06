import { defineStore } from 'pinia'
import Api from "@/assets/api/z-api";

export const useJobStore = defineStore('job', () => {
    //获取收藏列表
    const getWishMoneyList = (payload: any = {}) => {
        return Api.getWishMoney(payload);
    };
    const getCompanyIndustryList = (payload: any = {}) => {
        return Api.getCompanyIndustry(payload);
    };
    const getPositionList = (payload: any = {}) => {
        return Api.getPosition(payload);
    };
    const getSelectPositionList = (payload: any = {}) => {
        return Api.getSelectPosition(payload);
    };
    const getJobIntentList = (payload: any = {})=>{
        return Api.getJobIntent(payload);
    }

  return { getWishMoneyList, getCompanyIndustryList, getPositionList, getSelectPositionList, getJobIntentList,}
})
