import axios from './axios';
import { postConfig } from './config'

export default {
    /**
    * 修改求职状态
    * @returns 
    */
    ModifyJobWantedStatus: (params: {}) => {
        return axios.post('/phone/modifyStatus', params, postConfig)
    },
    /**
    * 修改站点
    * @returns 
    */
    setSite: (params: {}) => {
        return axios.post('/phone/modifySite', params, postConfig)
    },
    /**
    * 查询用户面试
    * @returns 
    */
    getUserInterview: (params: {}) => {
        return axios.post('/phone/selectUserInterview', params, postConfig)
    },
}