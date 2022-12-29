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
    },
    /**
     * @description 收藏职位
     * @param params
     */
    setStarPosition:(params:any)=>{
        return axios.post('/phone/starPosition',params,postConfig);
    },
    /**
     * @description 这个是获取职位详情
     * @param params 
     * @returns 
     */
    getPositionDetail:(params:any)=>{
        return axios.post('/phone/getPosition',params,postConfig);
    },
    /**
     * @description 这个是申请职位的接口
     */
    deliveryPosition:(params:any)=>{
        return axios.post('/phone/deliveryPosition',params,postConfig);
    },
    /**
     * @description 这个是获取简历列表
     */
    getOnlineResume:(params:any)=>{
        return axios.post('/phone/selectResume',params,postConfig);
    },
    /**
     * @description 这个是获取企业列表的接口.
     */
    getCompanyList:(params:any)=>{
        return axios.post('/phone/selectCompanyList',params,postConfig);
    }
}