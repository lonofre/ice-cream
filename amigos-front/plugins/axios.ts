import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const defaultUrl = runtimeConfig.API_BASE_URL || 'http://localhost:8000';
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });
  return {
    provide: {
      axios: api,
    },
  };
});