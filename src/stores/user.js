import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', {
  state: () => ({
    isSignedIn: false
  }),
  actions: {
    signOut() {
      this.isSignedIn = false
    }
  }
})
