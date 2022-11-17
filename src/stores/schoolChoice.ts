import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSchoolStore:any = defineStore('schoolChoice', () => {
    const selectSchool = ref<string>();
    const setSchool = (value:any) => {
        selectSchool.value = value
    }
    return {selectSchool,setSchool}
})
