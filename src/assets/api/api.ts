import axios from './axios';
import { postConfig } from './config'

export default {
    //feedback     
    feedback : (params:{userId:number,opinion:string})=>{
        return axios.post('/phone/feedback',params,postConfig)
    }
}