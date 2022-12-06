import axios from "./axios";
import { postConfig } from "./config";

export default {
    getWishMoney:(params:any = {})=>{
        return axios.post(`drop/getWishMoney`,params,postConfig)
    },
    getCompanyIndustry:(params:any = {})=>{
        return axios.post(`drop/getCompanyIndustry`,params,postConfig)
    },
    getPosition:(params:any = {})=>{
        return axios.post(`/drop/getPosition`,params,postConfig)
    },
    getSelectPosition:(params:any = {})=>{
        return axios.post(`/phone/selectPosition`,params,postConfig)
    },
}