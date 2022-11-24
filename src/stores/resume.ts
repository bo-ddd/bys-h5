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
  const searchSchool = (payload:{})=>{
      return Api.searchSchool(payload) as any;
  }
  const getProfessionalDrop = (payload:{})=>{
      return Api.getProfessionalDrop(payload) as any;
  }
  const updateLogo = (payload:{})=>{
      return Api.updateLogo(payload) as any;
  }
  const getInternShip = (payload:{})=>{
      return Api.getInternShip(payload) as any;
  }
  const getEducation = (payload:{})=>{
      return Api.getEducation(payload) as any;
  }
  const getOnlineResume = (payload:{})=>{
      return Api.getOnlineResume(payload) as any;
  }
  const getProject = (payload:{})=>{
      return Api.getProject(payload) as any;
  }
  const seachProfessinal = (payload:{})=>{
      return Api.seachProfessinal(payload) as any;
  }
  const modifyBaseData = (payload:{})=>{
      return Api.modifyBaseData(payload) as any;
  }
  const modifyUserStar = (payload:{})=>{
      return Api.modifyUserStar(payload) as any;
  }
  const addInternShip = (payload:{})=>{
      return Api.addInternShip(payload) as any;
  }
  const addEducation = (payload:{})=>{
      return Api.addEducation(payload) as any;
  }
  const addProject = (payload:{})=>{
      return Api.addEducation(payload) as any;
  }

  return {addInternShip,addEducation,addProject,modifyUserStar, modifyBaseData,getSexDrop,getEducationApi,getNationalDrop,getSchoolDrop,getProfessionalDrop,updateLogo,searchSchool,seachProfessinal,getInternShip,getEducation,getOnlineResume,getProject }
})
