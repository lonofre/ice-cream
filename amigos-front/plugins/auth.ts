import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  addRouteMiddleware('check-auth', () => {
    authStore.initAuth();
  })
  addRouteMiddleware('is-admin', (from, to) => {
    if(!authStore.hasToken()){
        return navigateTo('/login')
    }
  })
});