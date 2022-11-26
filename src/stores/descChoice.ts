import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDescStore:any = defineStore('descChoice', () => {
    const descData = ref<string>();
    const setDesc = (value:any) => {
        descData.value = value
    }
    return {descData,setDesc}
})
