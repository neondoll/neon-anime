import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, _) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    await authStore.getCurrentUser();
  }

  if (!authStore.user) {
    if (to?.name !== 'login') {
      abortNavigation();

      return navigateTo({ name: 'login', query: { from: to.fullPath } });
    }
  }

  if (to?.name === 'login' && authStore.user) {
    return navigateTo(to.query.from ? to.query.from as string : { name: 'index' });
  }
});
