import { defineStore } from 'pinia'
import Api from "@/assets/api/hs-api";
interface Save {
    companyId?: number,
    positionId?: number,
    userId: number,
}
export const usePositionDetailStore = defineStore('positionDetail', () => {
    let setStarPosition = (payload:Save) => {
        return Api.setStarPosition(payload);
    }

    return { setStarPosition }
})
