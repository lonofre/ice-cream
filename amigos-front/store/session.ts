import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import {
    AuthStoredData,
    getTokenClaims,
    getTokenRole,
    getTokenUserID,
} from "~/models/auth";
import { SessionStoredData } from "~/models/session";

export const useSessionStore = defineStore("session", {
    state: () => {
        return useLocalStorage<SessionStoredData>("session", {
            sessionId: null,
        });
    },
    getters: {
        getSessionId: (state) => {
            return state.sessionId;
        },
    },
    actions: {
        hasSessionId() {
            return this.sessionId != null;
        },
        storeSessionId(sessionId: number) {
            this.sessionId = sessionId;
            const sessionCookie = useCookie("session", { sameSite: true });
            localStorage.setItem(
                "session",
                JSON.stringify({ sessionId: sessionId })
            );
            sessionCookie.value = sessionId.toString();
        },
        /**
         * To use in a middleware to keep track
         * of the token
         */
        initSession() {
            const sessionCookie = useCookie("session", { sameSite: true });
            if (sessionCookie.value) {
                this.sessionId = parseInt(sessionCookie.value);
            }
        },
        logout() {
            this.sessionId = null;
            const sessionCookie = useCookie("session", { sameSite: true });
            sessionCookie.value = null;
            localStorage.removeItem("session");
        },
    },
    hydrate(storeState, initialState) {
        const savedState = useLocalStorage<SessionStoredData>("session", {
            sessionId: null,
        });
        storeState.sessionId = savedState.value.sessionId;
    },
});
