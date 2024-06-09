import useAppLinks from "~/composables/useAppLinks";

export default defineNuxtRouteMiddleware((to, from) => {
  const appLinks = useAppLinks();
  const user = useSupabaseUser();

  if (user.value && to?.name === 'login') {
    return navigateTo(appLinks.value.index.to);
  }

  if (!user.value && to?.name !== 'login') {
    abortNavigation();

    return navigateTo(appLinks.value.login.to);
  }
});
