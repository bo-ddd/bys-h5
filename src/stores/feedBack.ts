import { defineStore } from 'pinia'
import Api from "@/assets/api/api";

export const useFeedbackStore = defineStore('feedback', () => {
  let feedback = (payload:{userId:number,opinion:string})=>{
      return Api.feedback(payload);
  }

  return { feedback }
})
