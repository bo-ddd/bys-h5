import axios from "./axios";
import { postConfig } from "./config";

export default {
    /**
     * @description 这个是获取收藏列表的接口
     * @param params 
     * @returns 
     */
    getSaveList:(params:any)=>{
        return axios.post('/phone/selectStar',params,postConfig)
    },
    /**
     * @description 这个是获取企业规模的下拉框
     * @param params 
     * @returns 
     */
    getCompanySize:(params:any)=>{
        return axios.post('/drop/getCompanySize',params,postConfig);
    },
    /**
     * @description 这个是获取企业性质下拉框
     * @param params 
     * @returns 
     */
    getCompanyNature:(params:any)=>{
        return axios.post('/drop/getCompanyNature',params,postConfig);
    },
    /**
     * @decription 获取所属行业下拉框
     * @param params 
     * @returns 
     */
    getCompanyIndustry:(params:any)=>{
        return axios.post('/drop/getCompanyIndustry',params,postConfig);
    }
}