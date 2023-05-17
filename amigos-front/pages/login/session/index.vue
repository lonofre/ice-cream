<script setup lang="ts">

definePageMeta({
    middleware: ['check-auth', 'is-tablet_master']
})

import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";
import Message from "primevue/message";
import { SessionFormData } from "~/models/session";
import { useAuthStore } from "~/store/auth";
import { getTokenUserID } from "~/models/auth";
import SessionService from "~/services/session.service";
import { useSessionStore } from "~/store/session";

const router = useRouter();
const axios = useNuxtApp().$axios;
const authStore = useAuthStore();
const sessionService = new SessionService(axios);
const sessionStore = useSessionStore();

const state = reactive<{
    buttonIsActive: boolean;
    buttonIsLoading: boolean;
    sessionForm: SessionFormData;
    errorStatus: { message: string; show: boolean };
}>({
    buttonIsActive: true,
    buttonIsLoading: false,
    sessionForm: {
        receptionistId: null,
        tableNumber: null,
        location: null,
    },
    errorStatus: {
        message: "",
        show: false,
    },
});

async function createSession() {
    state.buttonIsActive = false;
    state.buttonIsLoading = true;
    state.sessionForm.receptionistId = getTokenUserID(authStore.getToken);
    const sessionResponse = await sessionService.createAndStoreSession(
        state.sessionForm
    );
    if (sessionResponse.error) {
        state.errorStatus.show = true;
        state.errorStatus.message = sessionResponse.data.message;
    } else {
        state.errorStatus.show = false;
        router.push("/menu");
    }
    state.buttonIsActive = true;
    state.buttonIsLoading = false;
}
</script>

<template>
    <div class="flex flex-row justify-content-center">
        <Panel header="Asignación de mesa" class="w-6">
            <h4>Elige la ubicación</h4>
            <InputText
                id="location"
                type="text"
                class="flex align-items-center gap-2 w-full"
                placeholder="Ej. Terraza"
                v-model="state.sessionForm.location"
            />
            <h4>Número de mesa</h4>
            <InputNumber
                id="tableNumber"
                inputId="integeronly"
                class="flex align-items-center gap-2 w-full"
                placeholder="Ej. 15"
                v-model="state.sessionForm.tableNumber"
            />
            <div class="flex flex-row justify-content-end">
                <Button
                    label="Empezar"
                    :icon="
                        state.buttonIsLoading
                            ? 'pi pi-spin pi-spinner'
                            : 'pi pi-play'
                    "
                    class="w-4"
                    :disabled="!state.buttonIsActive"
                    @click="createSession()"
                />
            </div>
            <div v-if="state.errorStatus.show">
                <Message severity="error" :closable="false">{{
                    state.errorStatus.message
                }}</Message>
            </div>
        </Panel>
    </div>
</template>
