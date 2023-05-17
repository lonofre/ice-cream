import { useSessionStore } from "~/store/session";

export default defineNuxtPlugin(() => {
    const sessionStore = useSessionStore();
    addRouteMiddleware("check-session", () => {
        sessionStore.initSession();
        if (!sessionStore.hasSessionId()) {
            return navigateTo("/login/session");
        }
    });
});
