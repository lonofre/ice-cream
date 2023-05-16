import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { AuthStoredData } from "~/models/auth";
// import Cookies from "universal-cookie";
// const cookies = new Cookies()

export const useAuthStore = defineStore("auth", {
    state: () => {
        return useLocalStorage<AuthStoredData>("auth", {
            token: null,
        });
    },
    getters: {
        getToken: (state) => {
            return state.token;
        },
    },
    actions: {
        hasToken() {
            return this.token != null;
        },
        storeToken(token: string) {
            this.token = token;
            // Save in local storage
            localStorage.setItem("auth", JSON.stringify({ token: token }));
        },
        logout() {
            this.token = null;
            localStorage.removeItem("auth");
        },
    },
    hydrate(storeState, initialState) {
        const savedState = useLocalStorage<AuthStoredData>("auth", {
            token: null,
        });
        storeState.token = savedState.value.token;
    },
});
