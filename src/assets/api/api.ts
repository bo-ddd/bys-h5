import axios from './axios';
import { postConfig, getConfig } from './config'

export default {
    /**
     * 查询主页图标
     * @returns 
     */
    selectLogo: (params: {}) => {
        return axios.post('/phone/selectLogo', params, postConfig)
    },

    //feedback     
    feedback: (params: { opinion: string,phone?:string }) => {
        return axios.post('/phone/feedback', params, postConfig)
    },

    //查询投递反馈
    selectDelivery: (params: { deliveryStatus: number }) => {
        return axios.post("/phone/selectDelivery", params, postConfig)
    },
    getStage: (params: {}) => {
        return axios.post("/drop/getStage", params, postConfig)
    },
    login: (params: { phone: string, smsCode: string }) => {
        return axios.post("/phone/login", params, postConfig);
    },
    getSms: (iphone: string) => {
        return axios.get(`/testsms?iphone=${iphone}`, getConfig)
    },
    /**
    * 学历下拉框
    * @returns 
     */
    getEducationDrop: (params: {}) => {
        return axios.post('/drop/getEducation', params, postConfig)
    },
    getWishMoney:(params:{})=>{
        return axios.post('/drop/getMoney',params,postConfig)
    }
}