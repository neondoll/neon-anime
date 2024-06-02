import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  const appLinks = useAppLinks();
  const token = useCookie('token');
  const { authenticated } = storeToRefs(useAuthStore());

  console.log('middleware/auth', to, token.value);

  if (token.value) {
    authenticated.value = true;
  }

  if (token.value && to?.name === 'login') {
    return navigateTo(appLinks.value.index.to);
  }

  if (!token.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo(appLinks.value.login.to);
  }
})