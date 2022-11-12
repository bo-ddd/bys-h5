import axios from "./axios";
import { postConfig } from "./config";

export default {
    getSaveList:(params:any)=>{
        return axios.post('/phone/selectStar',params,postConfig)
    }
}