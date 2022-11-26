import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSchoolStore:any = defineStore('schoolChoice', () => {
    const selectSchool = ref({});
    const setSchool = (value:any) => {
        selectSchool.value={};
        Object.assign(selectSchool.value,value)
    }
    return {selectSchool,setSchool}
})
