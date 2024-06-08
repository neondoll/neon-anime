export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useAuthStore());

  if (user.value && to?.name === 'login') {
    return navigateTo('/');
  }

  if (!user.value && to?.name !== 'login') {
    abortNavigation();

    return navigateTo('/login');
  }
})