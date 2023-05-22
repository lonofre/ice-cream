import { Role, getTokenClaims, getTokenRole } from "~/models/auth";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();
    addRouteMiddleware("check-auth", (to, from) => {
        authStore.initAuth();
        const toLogin = to.path == "/login" || to.path == "/login/";
        if (toLogin && authStore.hasToken()) {
            const role = getTokenRole(authStore.getToken);
            
            if (role == Role.tablet_master) {
                return navigateTo("/menu");
            } else if (role == Role.admin) {
                return navigateTo("/admin");
            }
        } else if (!toLogin && !authStore.hasToken()) {
            return navigateTo("/login");
        }
    });
    addRouteMiddleware("is-admin", (to, from) => {
        const toLogin = to.path == "/login" || to.path == "/login/";
        if (
            !authStore.hasToken() ||
            getTokenRole(authStore.getToken) != (Role.admin as string)
        ) {
            return navigateTo("/login");
        } else if (toLogin) {
            return navigateTo("/menu");
        }
    });
    addRouteMiddleware("is-tablet_master", (to, from) => {
        const toLogin = to.path == "/login" || to.path == "/login/";
        if (
            !authStore.hasToken() ||
            getTokenRole(authStore.getToken) != (Role.tablet_master as string)
        ) {
            return navigateTo("/login");
        } else if (toLogin) {
            return navigateTo("/admin");
        }
    });
});
