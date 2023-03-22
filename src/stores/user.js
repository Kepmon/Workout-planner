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
    },
    async updateProfile(username) {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        const updates = {
          user_id: user.id,
          username,
          created_at: new Date()
        }

        const { error } = await supabase.from('profiles').upsert(updates)
        if (error) {
          throw error
        }

        return true
      } catch (error) {
        return false
      }
    }
  }
})
