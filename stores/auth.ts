import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  // const session = useSupabaseSession();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const signInLoading = ref(false);

  const signIn = async ({ email, password }: UserPayloadInterface) => {
    signInLoading.value = true;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error(error);
    }

    signInLoading.value = false;
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    await navigateTo('/login');
  };

  return { signIn, signInLoading, signOut, user };
});