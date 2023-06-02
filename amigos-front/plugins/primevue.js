import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.use(ConfirmationService)
    //other components that you need
});
