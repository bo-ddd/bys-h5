import axios from "./axios";
import { postConfig } from "./config";

export default {
    //获取期望薪资
    getWishMoney:(params:any = {})=>{
        return axios.post(`drop/getWishMoney`,params,postConfig)
    },
    //  所属行业
    getCompanyIndustry:(params:any = {})=>{
        return axios.post(`drop/getCompanyIndustry`,params,postConfig)
    },
    //  职位类别
    getPosition:(params:any = {})=>{
        return axios.post(`/drop/getPosition`,params,postConfig)
    },
    //  职位推荐
    getSelectPosition:(params:any = {})=>{
        return axios.post(`/phone/selectPosition`,params,postConfig)
    },
    // 获取求职意向
    getJobIntent:(params:any = {})=>{
        return axios.post(`/phone/getJobIntent`,params,postConfig)
    },
    // 修改求职意向
    setModifyJobIntent:(params:any = {})=>{
        return axios.post(`/phone/modifyJobIntent`,params,postConfig)
    },
}