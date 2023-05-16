<script setup lang="ts">
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";
import Message from "primevue/message";
import { LoginFormData } from "~/models/auth";
import LoginService from "~/services/login.service";

const axios = useNuxtApp().$axios;
const loginService = new LoginService(axios);

const state = reactive<{
    loginForm: LoginFormData;
    loginErrorStatus: { message: string; show: boolean };
    buttonIsActive: boolean;
}>({
    loginForm: {
        username: "",
        password: "",
    },
    loginErrorStatus: {
        message: "",
        show: false,
    },
    buttonIsActive: true,
});

async function login() {
    state.buttonIsActive = false;
    const loginResponse = await loginService.loginAndStoreCredentials(
        state.loginForm
    );
    if (loginResponse.error) {
        state.loginErrorStatus.show = true;
        state.loginErrorStatus.message = loginResponse.data.message;
    } else {
        state.loginErrorStatus.show = false;
        // router.push("/");
    }
    state.buttonIsActive = true;
}
</script>

<template>
    <div class="flex flex-row justify-content-center">
        <Panel header="Iniciar Sesión" class="w-6">
            <InputText
                id="username"
                type="text"
                class="flex align-items-center gap-2 w-full"
                placeholder="Usuario"
                v-model="state.loginForm.username"
            />
            <InputText
                id="password"
                type="password"
                class="flex align-items-center gap-2 w-full"
                placeholder="Contraseña"
                v-model="state.loginForm.password"
            />
            <div class="flex flex-row justify-content-end">
                <Button
                    label="Enviar"
                    icon="pi pi-user"
                    class="w-4"
                    :disabled="!state.buttonIsActive"
                    @click="login"
                />
            </div>
            <div v-if="state.loginErrorStatus.show">
                <Message severity="error" :closable="false">{{
                    state.loginErrorStatus.message
                }}</Message>
            </div>
        </Panel>
    </div>
</template>
