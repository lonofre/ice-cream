// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeflex/primeflex.css",
    "~/assets/css/global.scss"
  ],
  build: {
    transpile: ["primevue"]
  },
  modules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: true,
          prefetch: true,
          preconnect: true,
          preload: true
        }
      }
    ]
  ]
})
