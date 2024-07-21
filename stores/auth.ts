import { defineStore } from 'pinia';
import type { Credentials } from "~/types/types";

export const useAuthStore = defineStore(
  'auth',
  () => {
    const supabase = useSupabaseClient();

    const signInLoading = ref(false);
    const user = ref(undefined);

    const getCurrentUser = async () => {
      const { data } = await useFetch('/api/auth/user', { headers: useRequestHeaders(['cookie']) });

      console.log(data);

      user.value = data;

      return user.value;
    };
    const signIn = async ({ email, password }: Credentials) => {
      const route = useRoute();

      signInLoading.value = true;

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      signInLoading.value = false;

      if (error) {
        console.error(error);
      } else {
        user.value = data.user;
        navigateTo(route.query.from ? route.query.from as string : { name: 'index' });
        await getCurrentUser();
      }
    };
    const signOut = async () => {
      const route = useRoute();

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(error);
      } else {
        user.value = undefined;

        if (route.name !== 'login') {
          navigateTo({ name: 'login', query: { from: route.fullPath } });
          console.log('logout...');
        }
      }
    };

    return { getCurrentUser, signIn, signInLoading, signOut, user };
  }
);