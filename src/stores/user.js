import { defineStore } from 'pinia'
import { supabase } from '../supabase'

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', {
  state: () => ({
    isSignedIn: true
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
        }
        
        return true
      } catch (error) {
        return false
      }
    },
    async signIn(email, password) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
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
