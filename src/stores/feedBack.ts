import { defineStore } from 'pinia'
import Api from "@/assets/api/api";

export const useFeedbackStore = defineStore('feedback', () => {
  let feedback = (payload:{userId:number,opinion:string})=>{
      return Api.feedback(payload);
  }

  //查询投递反馈
  let selectDelivery = (payload:{deliveryStatus:number,userId:number}) =>{     
    return Api.selectDelivery(payload);
}

  //查询投递反馈
  let getStage = (payload:{}) =>{     
    return Api.getStage(payload);
}

  const getEducationDrop = (payload:{})=>{
    return Api.getEducationDrop(payload);
  }

  const getWishMoney = (payload:{})=>{
    return Api.getWishMoney(payload);
  }

  return { feedback,selectDelivery,getStage,getEducationDrop,getWishMoney }
})
