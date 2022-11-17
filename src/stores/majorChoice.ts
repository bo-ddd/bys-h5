import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMajorStore:any = defineStore('majorChoice', () => {
    const selectMajor = ref<string>();
    const setMajor = (value:any) => {
        selectMajor.value = value
    }
    return {selectMajor,setMajor}
})
