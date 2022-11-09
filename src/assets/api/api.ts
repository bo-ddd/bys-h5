import axios from './axios';
import { postConfig } from './config'

export default {
    /**
     * 查询主页图标
     * @returns 
     */
    selectLogo: (params: {}) => {
        return axios.post('/phone/selectLogo', params, postConfig)
    },

    //feedback     
    feedback: (params: { userId: number, opinion: string }) => {
        return axios.post('/phone/feedback', params, postConfig)
    },

  //查询投递反馈
    selectDelivery:(params:{deliveryStatus:number,userId:number}) =>{
        return axios.post("/phone/selectDelivery",params,postConfig)
    },

 
      getStage:(params:{}) =>{
        return axios.post("/drop/getStage",params,postConfig)
    }
}