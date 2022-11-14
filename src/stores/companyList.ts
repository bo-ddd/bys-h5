import { defineStore } from 'pinia'
import Api from "@/assets/api/hs-api";

export const useCompanyListStore = defineStore('feedback', () => {
    /**
    * @description 这个是获取收藏列表的接口
    * @param params 
    * @returns 
    */
    function getSaveList(params: any) {
        return Api.getSaveList(params);
    }
    /**
     * @description 这个是获取企业规模的下拉框
     * @param params 
     * @returns 
     */
    function getCompanySize(params: any) {
        return Api.getCompanySize(params);
    }
    /**
     * @description 这个是获取企业性质下拉框
     * @param params 
     * @returns 
     */
    function getCompanyNature(params: any) {
        return Api.getCompanyNature(params);
    }
    /**
     * @decription 获取所属行业下拉框
     * @param params 
     * @returns 
     */
    function getCompanyIndustry(params: any) {
        return Api.getCompanyIndustry(params)
    }
    return { getSaveList,getCompanySize,getCompanyNature,getCompanyIndustry}
})
