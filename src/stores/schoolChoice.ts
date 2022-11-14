import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSaveStore:any = defineStore('schoolChoice', () => {
    const selectSchool = ref('');
    const setSchool = (value:string) => {
        selectSchool.value = value
    }
    return {selectSchool,setSchool}
})
