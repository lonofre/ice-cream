import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const defaultUrl = runtimeConfig.API_BASE_URL;
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });
  return {
    provide: {
      api: api,
    },
  };
});