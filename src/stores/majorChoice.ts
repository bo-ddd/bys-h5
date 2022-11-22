import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
export const useMajorStore:any = defineStore('majorChoice', () => {
    const selectMajor = ref({});
    const setMajor = (value:any) => {
        
        selectMajor.value={};
        Object.assign(selectMajor.value,value)
    }
    return {selectMajor,setMajor}
})
