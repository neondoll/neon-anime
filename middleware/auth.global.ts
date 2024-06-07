export default defineNuxtRouteMiddleware((to) => {
  const appLinks = useAppLinks();
  const session = useSupabaseSession();
  const { authenticated } = storeToRefs(useAuthStore());

  if (session.value) {
    authenticated.value = true;
  }

  if (session.value && to?.name === 'login') {
    return navigateTo(appLinks.value.index.to);
  }

  if (!session.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo(appLinks.value.login.to);
  }
})