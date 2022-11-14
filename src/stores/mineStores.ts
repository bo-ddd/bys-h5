import { defineStore } from 'pinia'
import Api from "@/assets/api/mine";

export const useMineStore = defineStore('mine', () => {
    /**
   * 修改求职状态
   * @describe status:Number 求职状态
   * @describe userId:Number 用户id
   */
    let ModifyJobWantedStatus = (payload: {}) => {
        return Api.ModifyJobWantedStatus(payload);
    }
    /**
   * 修改站点
   * @describe site : string 站点
   * @describe userId : Number 用户id
   */
    let setSite = (payload: {}) => {
        return Api.setSite(payload);
    }

    return { ModifyJobWantedStatus, setSite }
})
