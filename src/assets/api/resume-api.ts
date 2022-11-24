import axios from './axios';
import { postConfig } from './config'
let serveUrl = '/api';
const PostFormConfig = {
    url: "",
    baseURL: serveUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest"
    },
    timeout: 5000
};
export default {
    /**
    * 性别下拉框
    * @returns 
    */
    getSexDrop: (params: {}) => {
        return axios.post('/drop/getSex', params, postConfig)
    },
    /**
    * 民族下拉框
    * @returns 
    */
    getNationalDrop: (params: {}) => {
        return axios.post('/drop/getNational', params, postConfig)
    },
    /**
    * 学历下拉框
    * @returns 
    */
    getEducationDrop: (params: {}) => {
        return axios.post('/drop/getEducation', params, postConfig)
    },
    /**
    * 学校下拉框
    * @returns 
    */
    getSchoolDrop: (params: {}) => {
        return axios.post('/drop/getSchool', params, postConfig)
    },
    /**
    * 搜索学校
    * @returns 
    */
    searchSchool: (params: {}) => {
        return axios.post('/phone/selectSchool', params, postConfig)
    },
    /**
    * 专业下拉框
    * @returns 
    */
    getProfessionalDrop: (params: {}) => {
        return axios.post('/drop/getProfessional', params, postConfig)
    },
    /**
    * 搜索学历
    * @returns 
    */
    seachProfessinal: (params: {}) => {
        return axios.post('/phone/selectProfessional', params, postConfig)
    },
    /**
    * 上传图片
    * @returns 
    */
    updateLogo: (params: {}) => {
        return axios.post('/phone/uploadLogo', params, PostFormConfig)
    },
    /**
    * 获取实习经历
    * @returns 
    */
     getInternShip: (params: {}) => {
        return axios.post('/phone/getInternShip', params, postConfig)
    },
    /**
    * 新增实习经历
    * @returns 
    */
     addInternShip: (params: {}) => {
        return axios.post('/phone/addInternShip', params, postConfig)
    },
    /**
    * 获取教育经历
    * @returns 
    */
     getEducation: (params: {}) => {
        return axios.post('/phone/getEducation', params, postConfig)
    },
    /**
    * 新增教育经历
    * @returns 
    */
     addEducation: (params: {}) => {
        return axios.post('/phone/addEducation', params, postConfig)
    },
    /**
    * 获取在线简历
    * @returns 
    */
     getOnlineResume: (params: {}) => {
        return axios.post('/phone/getOnlineResume', params, postConfig)
    },
    /**
    * 获取项目经历
    * @returns 
    */
     getProject: (params: {}) => {
        return axios.post('/phone/getProject', params, postConfig)
    },
    /**
    * 新增项目经历
    * @returns 
    */
     addProject: (params: {}) => {
        return axios.post('/phone/addProject', params, postConfig)
    },
    /**
    * 修改个人信息
    * @returns 
    */
     modifyBaseData: (params: {}) => {
        return axios.post('/phone/modifyBaseData', params, postConfig)
    },
    /**
    * 修改个人情况信息
    * @returns 
    */
     modifyUserStar: (params: {}) => {
        return axios.post('/phone/modifyUserStar', params, postConfig)
    },
}