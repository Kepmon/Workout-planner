import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { ref } from "vue";
import { UserResponse } from "../api/types";

export const useUserStore = defineStore("user", () => {
  const isSignedIn = ref(false);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error();
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error();
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const signOut = () => {
    isSignedIn.value = false;
  };

  const updateProfile = async (username: string) => {
    try {
      const {
        data: { user },
      }: { data: UserResponse["data"] } =
        (await supabase.auth.getUser()) as UserResponse;
      const updates = {
        user_id: user.id,
        username,
        created_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    isSignedIn,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };
});
