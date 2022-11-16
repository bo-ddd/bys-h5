import axios from "./axios";
import { postConfig } from "./config";

const drop:string = '/drop';
export default {
    getWishMoney:(params:any = {})=>{
        return axios.post(`${drop}/getWishMoney`,params,postConfig)
    },
    getCompanyIndustry:(params:any = {})=>{
        return axios.post(`${drop}/getCompanyIndustry`,params,postConfig)
    },
}