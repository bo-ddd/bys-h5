import { defineStore } from 'pinia'
import Api from "@/assets/api/api";

export const useHomeStore = defineStore('home', () => {
  let selectLogo = (payload:{})=>{
      return Api.selectLogo(payload);
  }

  return { selectLogo }
})
