import { useSessionStore } from "~/store/session";

export default defineNuxtPlugin(() => {
    const sessionStore = useSessionStore();
    addRouteMiddleware("check-session", (to, from) => {
        sessionStore.initSession();

        const toSession =
            to.path == "/login/session" || to.path == "/login/session/";

        if (toSession && sessionStore.hasValidSession()) {
            return navigateTo("/menu");
        } else if (!toSession && !sessionStore.hasValidSession()) {
            return navigateTo("/login/session");
        }
    });
});
