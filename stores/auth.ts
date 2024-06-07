import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient();

  const authenticated = ref(false);
  const loading = ref(false);

  const signInWithPassword = async ({ email, password }: UserPayloadInterface) => {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    loading.value = false;

    if (error) {
      console.log(error);
    } else {
      authenticated.value = true;
    }
  };
  const signOut = async () => {
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    } else {
      authenticated.value = false;
    }
  };

  return { authenticated, loading, signInWithPassword, signOut };
});