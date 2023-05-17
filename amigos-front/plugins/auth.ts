import { Role, getTokenClaims, getTokenRole } from "~/models/auth";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();
    addRouteMiddleware("check-auth", () => {
        authStore.initAuth();
        if (!authStore.hasToken) {
            return navigateTo("/login");
        }
    });
    addRouteMiddleware("is-admin", () => {
        if (
            !authStore.hasToken() ||
            getTokenRole(authStore.getToken) != Role[Role.admin]
        ) {
            return navigateTo("/login");
        }
    });
    addRouteMiddleware("is-tablet_master", () => {
        if (
            !authStore.hasToken() ||
            getTokenRole(authStore.getToken) != Role[Role.tablet_master]
        ) {
            return navigateTo("/login");
        }
    });
});
