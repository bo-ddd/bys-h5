import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
export const useMajorStore:any = defineStore('majorChoice', () => {
    const selectMajor = ref();
    const setMajor = (value:any) => {
        
        selectMajor.value={};
        Object.assign(selectMajor.value,value)
    }
    const clearMajor=()=>{
        selectMajor.value=undefined
    }
    return {selectMajor,setMajor,clearMajor}
})
