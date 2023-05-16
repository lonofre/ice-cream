import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { AuthStoredData } from "~/models/auth";


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
      const authCookie = useCookie('auth', { sameSite: true });
      localStorage.setItem("auth", JSON.stringify({ token: token }));
      authCookie.value = token;
    },
    /**
     * To use in a middleware to keep track
     * of the token
     */
    initAuth() {
      const authCookie = useCookie('auth', { sameSite: true });
      if(authCookie.value) {
        this.token = authCookie.value
      }
    },
    logout() {
      this.token = null;
      const authCookie = useCookie('auth', { sameSite: true });
      authCookie.value = null;
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
