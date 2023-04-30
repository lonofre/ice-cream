import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(PrimeVue, { ripple: true });
	nuxtApp.vueApp.component("Button", Button);
	nuxtApp.vueApp.use(ToastService)
	//other components that you need
});
