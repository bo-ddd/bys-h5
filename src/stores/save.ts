import { defineStore } from 'pinia'
import Api from "@/assets/api/hs-api";

export const useSaveStore = defineStore('home', () => {
  //获取收藏列表
  let getSaveList = (payload:any)=>{
      return Api.getSaveList(payload);
  }

  return { getSaveList }
})
