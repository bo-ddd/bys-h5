import { defineStore } from 'pinia'
import Api from "@/assets/api/z-api";

export const useJobStore = defineStore('job', () => {
  //获取收藏列表
  const getWishMoneyList = (payload:any = {})=>{
      return Api.getWishMoney(payload);
  };
  const getCompanyIndustryList = (payload:any = {})=>{
      return Api.getCompanyIndustry(payload);
  };

  return { getWishMoneyList,getCompanyIndustryList }
})
