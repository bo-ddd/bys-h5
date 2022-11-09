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
    }
}