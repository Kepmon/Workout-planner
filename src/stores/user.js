import { defineStore } from 'pinia'
import { supabase } from '../supabase'

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', {
  state: () => ({
    isSignedIn: false
  }),
  actions: {
    async signUp(email, password) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password
        })
  
        if (error) {
          throw new Error()
        } else {
          this.$router.push({ name: 'sign-in' })
        }
      } catch (error) {
        return false
      }
    },
    signOut() {
      this.isSignedIn = false
    }
  }
})
