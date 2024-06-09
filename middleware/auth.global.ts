import useAppLinks from "~/composables/useAppLinks";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const appLinks = useAppLinks();
  const sessionAccessToken = useCookie('sessionAccessToken');
  const { authenticated } = storeToRefs(useAuthStore());

  if (sessionAccessToken.value) {
    authenticated.value = true;
  }

  if (sessionAccessToken.value && to?.name === 'login') {
    return navigateTo(appLinks.value.index.to);
  }

  if (!sessionAccessToken.value && to?.name !== 'login') {
    abortNavigation();

    return navigateTo(appLinks.value.login.to);
  }
});
