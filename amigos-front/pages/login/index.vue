<script setup lang="ts">
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Message from "primevue/message";
import { LoginFormData, Role, getTokenRole } from "~/models/auth";
import LoginService from "~/services/login.service";

definePageMeta({
    middleware: ["check-auth"],
});

const router = useRouter();
const axios = useNuxtApp().$axios;
const loginService = new LoginService(axios);

const state = reactive<{
    loginForm: LoginFormData;
    errorStatus: { message: string; show: boolean };
    buttonIsActive: boolean;
    buttonIsLoading: boolean;
}>({
    loginForm: {
        username: "",
        password: "",
    },
    errorStatus: {
        message: "",
        show: false,
    },
    buttonIsActive: true,
    buttonIsLoading: false,
});

async function login() {
    state.buttonIsActive = false;
    state.buttonIsLoading = true;
    const loginResponse = await loginService.loginAndStoreCredentials(
        state.loginForm
    );
    if (loginResponse.error) {
        state.errorStatus.show = true;
        state.errorStatus.message = loginResponse.data.message;
    } else {
        state.errorStatus.show = false;
        const role = getTokenRole(loginResponse.data?.token);
        if (role == (Role.tablet_master as string)) {
            router.push("/login/session");
        } else if (role == (Role.admin as string)) {
            router.push("/admin");
        } else {
            state.errorStatus.show = true;
            state.errorStatus.message =
                "Unable to validate identity, please try again at a later time";
        }
    }
    state.buttonIsActive = true;
    state.buttonIsLoading = false;
}
</script>

<template>
    <div
        class="flex h-screen flex-row justify-content-center sm:col-8 sm:col-offset-2 lg:col-4 lg:col-offset-4"
    >
        <Card class="align-self-center w-full">
            <template #content>
                <h3 class="flex justify-content-center">50amigos</h3>
                <h2 class="flex justify-content-center">Iniciar sesión</h2>
                <InputText
                    id="username"
                    type="text"
                    class="flex align-items-center gap-2 w-full mt-2"
                    placeholder="Usuario"
                    v-model="state.loginForm.username"
                />
                <InputText
                    id="password"
                    type="password"
                    class="flex align-items-center gap-2 w-full mt-2"
                    placeholder="Contraseña"
                    v-model="state.loginForm.password"
                />
                <div class="flex flex-row justify-content-end">
                    <Button
                        label="Enviar"
                        :icon="
                            state.buttonIsLoading
                                ? 'pi pi-spin pi-spinner'
                                : 'pi pi-user'
                        "
                        class="w-4 mt-2"
                        :disabled="!state.buttonIsActive"
                        @click="login"
                    />
                </div>
                <div v-if="state.errorStatus.show">
                    <Message severity="error" :closable="false">{{
                        state.errorStatus.message
                    }}</Message>
                </div>
            </template>
        </Card>
    </div>
</template>
