import { defineStore } from 'pinia'
import Api from "@/assets/api/api";

export const useHomeStore = defineStore('home', () => {
  const selectLogo = (payload:{})=>{
      return Api.selectLogo(payload);
  }

  function login(payload:{phone: string,smsCode: string}){
         return Api.login(payload);
  }

  function getSms(payload:string){
    return Api.getSms(payload);
}

  return { selectLogo,login,getSms }
})
