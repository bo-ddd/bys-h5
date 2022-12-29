import { defineStore } from 'pinia'
import Api from "@/assets/api/mine";

export const useMineStore = defineStore('mine', () => {
    /**
   * 修改求职状态
   * @describe status:Number 求职状态
   * @describe userId:Number 用户id
   */
    const ModifyJobWantedStatus = (payload: {}) => {
        return Api.ModifyJobWantedStatus(payload);
    }
    /**
   * 获取用户信息
   * @describe userId:Number 用户id
   */
    const getUserInfo = (payload: {}) => {
        return Api.getUserInfoApi(payload);
    }
    /**
   * 修改站点
   * @describe site : string 站点
   * @describe userId : Number 用户id
   */
    const setSite = (payload: {}) => {
        return Api.setSite(payload);
    }
    /**
   * 查询用户面试
   * @describe userId : Number 用户id
   */
    const getUserInterviewApi = (payload: {}) => {
        return Api.getUserInterview(payload);
    }

    return {
        ModifyJobWantedStatus,
        setSite,
        getUserInterviewApi,
        getUserInfo
    }
})
