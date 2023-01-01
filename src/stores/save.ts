import { defineStore , acceptHMRUpdate} from 'pinia'
import Api from "@/assets/api/hs-api";

export const useSaveStore = defineStore('save', () => {
  //获取收藏列表
  let getSaveList = (payload:any)=>{
      return Api.getSaveList(payload) as any;
  }

  return { getSaveList }
})
