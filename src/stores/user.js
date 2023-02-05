import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        isSignedIn: 'true'
    })
})