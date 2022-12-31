import { defineStore } from 'pinia'
import Api from "@/assets/api/resume-api";

export const useResumeStore = defineStore('resume', () => {
    const getSexDrop = (payload: {}) => {
        return Api.getSexDrop(payload) as any;
    }
    const getEducationApi = (payload: {}) => {
        return Api.getEducationDrop(payload) as any;
    }
    const getNationalDrop = (payload: {}) => {
        return Api.getNationalDrop(payload) as any;
    }
    const getSchoolDrop = (payload: {}) => {
        return Api.getSchoolDrop(payload) as any;
    }
    const searchSchool = (payload: {}) => {
        return Api.searchSchool(payload) as any;
    }
    const getProfessionalDrop = (payload: {}) => {
        return Api.getProfessionalDrop(payload) as any;
    }
    const updateLogo = (payload: {}) => {
        return Api.updateLogo(payload) as any;
    }
    const getOnlineResume = (payload: {}) => {
        return Api.getOnlineResume(payload) as any;
    }
    //搜索学历
    const seachProfessinal = (payload: {}) => {
        return Api.seachProfessinal(payload) as any;
    }
    //修改个人信息
    const modifyBaseData = (payload: {}) => {
        return Api.modifyBaseData(payload) as any;
    }
    //修改个人情况信息
    const modifyUserStar = (payload: {}) => {
        return Api.modifyUserStar(payload) as any;
    }
    //获取教育经历
    const getEducation = (payload: {}) => {
        return Api.getEducation(payload) as any;
    }
    //新增教育经历
    const addEducation = (payload: {}) => {
        return Api.addEducation(payload) as any;
    }
    //删除教育经历
    const delEducation = (payload: {}) => {
        return Api.delEducation(payload) as any;
    }
    //修改教育经历
    const modifyEducation = (payload: {}) => {
        return Api.modifyEducation(payload) as any;
    }

    //获取项目经历
    const getProject = (payload: {}) => {
        return Api.getProject(payload) as any;
    }
    //新增项目经历
    const addProject = (payload: {}) => {
        return Api.addProject(payload) as any;
    }
    //删除项目经历
    const delProject = (payload: {}) => {
        return Api.delProject(payload) as any;
    }
    //修改项目经历
    const modifyProject = (payload: {}) => {
        return Api.modifyProject(payload) as any;
    }

    //获取实习经历
    const getInternShip = (payload: {}) => {
        return Api.getInternShip(payload) as any;
    }
    //新增实习经历
    const addInternShip = (payload: {}) => {
        return Api.addInternShip(payload) as any;
    }
    //修改实习经历
    const modifyInternShip = (payload: {}) => {
        return Api.modifyInternShip(payload) as any;
    }
    //删除实习经历
    const delInternShip = (payload: {}) => {
        return Api.delInternShip(payload) as any;
    }
    //删除实习经历
    const getCompany = (payload: {}) => {
        return Api.getCompany(payload) as any;
    }
    //收藏企业
    const starPosition = (payload: {}) => {
        return Api.starPosition(payload) as any
    }
    //取消收藏企业
    const delStarPosition = (payload: {}) => {
        return Api.delStarPosition(payload) as any
    }
    //获取企业邀请
    const selectInvitation = (payload: {}) => {
        return Api.selectInvitation(payload) as any
    }
    //获取信息完成度
    const selectCompletion = (payload: {}) => {
        return Api.selectCompletion(payload) as any
    }
    //上传简历
    const addResume = (payload: {}) => {
        return Api.addResume(payload) as any
    }
    //获取简历列表
    const selectResume = (payload: {}) => {
        return Api.selectResume(payload) as any
    }
    //申请职位
    const deliveryPosition = (payload: {}) => {
        return Api.deliveryPosition(payload) as any
    }
    //删除简历
    const delResume = (payload: {}) => {
        return Api.delResume(payload) as any
    }
    return {delResume,deliveryPosition,selectResume, addResume,selectCompletion,selectInvitation,delStarPosition,starPosition,getCompany, delProject, modifyProject, modifyInternShip, delInternShip, modifyEducation, delEducation, addInternShip, addEducation, addProject, modifyUserStar, modifyBaseData, getSexDrop, getEducationApi, getNationalDrop, getSchoolDrop, getProfessionalDrop, updateLogo, searchSchool, seachProfessinal, getInternShip, getEducation, getOnlineResume, getProject }
})
