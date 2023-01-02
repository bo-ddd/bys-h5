import { defineStore } from 'pinia'
import Api from "@/assets/api/hs-api";

export const useCompanyListStore = defineStore('companyListStore', () => {
    /**
    * @description 这个是获取收藏列表的接口
    * @param params 
    * @returns 
    */
    function getSaveList(params?: any) {
        return Api.getSaveList(params) as any;
    }
    /**
     * @description 这个是获取企业规模的下拉框
     * @param params 
     * @returns 
     */
    function getCompanySize(params?: any) {
        return Api.getCompanySize(params) as any;
    }
    /**
     * @description 这个是获取企业性质下拉框
     * @param params 
     * @returns 
     */
    function getCompanyNature(params?: any) {
        return Api.getCompanyNature(params) as any;
    }
    /**
     * @decription 获取所属行业下拉框
     * @param params 
     * @returns 
     */
    function getCompanyIndustry(params?: any) {
        return Api.getCompanyIndustry(params) as any;
    }
    /**
     * @description 这个是获取企业列表的接口
     */
    function getCompanyList(params?:any){
        return Api.getCompanyList(params) as any;
    }
    return { getSaveList,getCompanySize,getCompanyNature,getCompanyIndustry,getCompanyList}
})
