import { defineStore } from 'pinia'
import Api from "@/assets/api/z-api";

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

    return {
        getWishMoneyList,
        getCompanyIndustryList,
        getPositionList,
        getSelectPositionList, 
        getJobIntentList,
        setModifyJobIntentInfo,
    }
})
