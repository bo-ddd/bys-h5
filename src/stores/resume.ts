import { defineStore } from 'pinia'
import Api from "@/assets/api/resume-api";

export const useResumeStore = defineStore('resume', () => {
  const getSexDrop = (payload:{})=>{
      return Api.getSexDrop(payload) as any;
  }
  const getEducationApi = (payload:{})=>{
      return Api.getEducationDrop(payload) as any;
  }
  const getNationalDrop = (payload:{})=>{
      return Api.getNationalDrop(payload) as any;
  }
  const getSchoolDrop = (payload:{})=>{
      return Api.getSchoolDrop(payload) as any;
  }
  const getProfessionalDrop = (payload:{})=>{
      return Api.getProfessionalDrop(payload) as any;
  }

  return { getSexDrop,getEducationApi,getNationalDrop,getSchoolDrop,getProfessionalDrop }
})
