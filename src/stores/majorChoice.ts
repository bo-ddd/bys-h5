import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSaveStore:any = defineStore('majorChoice', () => {
    const selectMajor = ref('');
    const setMajor = (value:string) => {
        selectMajor.value = value
    }
    return {selectMajor,setMajor}
})
