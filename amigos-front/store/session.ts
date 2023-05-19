import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { SessionLocation, SessionStoredData } from "~/models/session";
import { toRaw } from "vue";

const defaultData: SessionStoredData = {
    sessionId: null,
    tableNumber: null,
    location: null,
};

export const useSessionStore = defineStore("session", {
    state: () => {
        return useLocalStorage<SessionStoredData>("session", defaultData);
    },
    getters: {
        getSessionId: (state) => {
            return state.sessionId;
        },
        getSessionTableNumber: (state) => {
            return state.tableNumber;
        },
        getSessionLocation: (state) => {
            return state.location;
        },
    },
    actions: {
        hasValidSession() {
            return (
                this.sessionId != null &&
                this.tableNumber != null &&
                this.location != null
            );
        },
        storeSessionData(sessionData: SessionStoredData) {
            this.sessionId = sessionData.sessionId;
            this.tableNumber = sessionData.tableNumber;
            this.location = sessionData.location;
            const sessionCookie = useCookie("session", { sameSite: true });
            localStorage.setItem("session", JSON.stringify(sessionData));
            sessionCookie.value = JSON.stringify(sessionData);
        },
        /**
         * To use in a middleware to keep track
         * of the token
         */
        initSession() {
            const sessionCookie = useCookie("session", { sameSite: true });
            if (sessionCookie.value) {
                const cookieSessionData = toRaw<SessionStoredData>(
                    // @ts-expect-error Typescript thinks sessionCookie.value is a string
                    sessionCookie.value
                );
                this.sessionId = cookieSessionData.sessionId;
                this.tableNumber = cookieSessionData.tableNumber;
                this.location = cookieSessionData.location as SessionLocation;
            }
        },
        logout() {
            this.sessionId = null;
            this.tableNumber = null;
            this.location = null;
            const sessionCookie = useCookie("session", { sameSite: true });
            sessionCookie.value = null;
            localStorage.removeItem("session");
        },
    },
    hydrate(storeState, initialState) {
        const savedState = useLocalStorage<SessionStoredData>(
            "session",
            defaultData
        );
        storeState.sessionId = savedState.value.sessionId;
        storeState.tableNumber = savedState.value.tableNumber;
        storeState.location = savedState.value.location;
    },
});
