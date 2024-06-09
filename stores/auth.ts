import { defineStore } from 'pinia';
import type { Credentials } from "~/types/types";

export const useAuthStore = defineStore('auth', () => {
  // const session = useSupabaseSession();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const authenticated = ref(false);
  const signInLoading = ref(false);

  const signIn = async ({ email, password }: Credentials) => {
    signInLoading.value = true;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    signInLoading.value = false;

    if (error) {
      console.error(error);
    }

    if (data.session) {
      console.log(data.session.access_token);
      const sessionAccessToken = useCookie('sessionAccessToken');
      sessionAccessToken.value = data.session.access_token;
      authenticated.value = true;
    }
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);

      return;
    }

    const sessionAccessToken = useCookie('sessionAccessToken');
    sessionAccessToken.value = null;
    authenticated.value = false;
  };

  return { authenticated, signIn, signInLoading, signOut, user };
});