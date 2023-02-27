import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', {
  state: () => ({
    isSignedIn: false
  }),
  actions: {
    async authenticateUser(email, password, method) {
      try {
        const { error } = await method({
          email,
          password
        })
  
        if (error) {
          throw new Error()
        }
        
        return true
      } catch (error) {
        return false
      }
    },
    signOut() {
      this.isSignedIn = false
    }
  }
})
