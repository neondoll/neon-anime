import { defineStore } from 'pinia';
import type { Credentials } from "~/types/types";

export const useAuthStore = defineStore('auth', () => {
  // const session = useSupabaseSession();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const signInLoading = ref(false);

  const signIn = async ({ email, password }: Credentials) => {
    signInLoading.value = true;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    signInLoading.value = false;

    if (error) {
      console.error(error);
    }
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);

      return;
    }

    navigateTo('/login');
  };

  return { signIn, signInLoading, signOut, user };
});