export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value && to?.name === 'login') {
    return navigateTo('/');
  }

  if (!user.value && to?.name !== 'login') {
    abortNavigation();

    return navigateTo('/login');
  }
})