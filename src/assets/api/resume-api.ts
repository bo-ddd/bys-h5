import axios from './axios';
import { postConfig } from './config'

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
    * 专业下拉框
    * @returns 
    */
    getProfessionalDrop: (params: {}) => {
        return axios.post('/drop/getProfessional', params, postConfig)
    },
    // /**
    // * 性别下拉框
    // * @returns 
    // */
    // getSexDrop: (params: {}) => {
    //     return axios.post('/drop/getSex', params, postConfig)
    // },
}