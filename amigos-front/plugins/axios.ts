import axios from "axios";
import { useAuthStore } from "~/store/auth";
import { useSessionStore } from "~/store/session";

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    const defaultUrl = runtimeConfig.API_BASE_URL || "http://localhost:8000";
    let api = axios.create({
        baseURL: defaultUrl,
        headers: {
            common: {},
        },
    });
    api.interceptors.request.use((config) => {
        // Adds the authentication token, if available
        const token = useAuthStore().getToken;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        const sessionId = useSessionStore().getSessionId;
        config.headers["session_id"] = sessionId;
        return config;
    });
    return {
        provide: {
            axios: api,
        },
    };
});
