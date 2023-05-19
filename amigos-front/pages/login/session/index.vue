<script setup lang="ts">
definePageMeta({
    middleware: ["check-auth", "is-tablet_master", "check-session"],
});

import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Card from "primevue/card";
import Message from "primevue/message";
import { SessionFormData, SessionLocation } from "~/models/session";
import { useAuthStore } from "~/store/auth";
import { getTokenUserID } from "~/models/auth";
import SessionService from "~/services/session.service";
import { useSessionStore } from "~/store/session";

const router = useRouter();
const axios = useNuxtApp().$axios;
const authStore = useAuthStore();
const sessionService = new SessionService(axios);
const sessionStore = useSessionStore();
const locationOptions = Object.values(SessionLocation).map((l) => {
    return { optionLabel: l, optionValue: l };
});

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
    <div
        class="flex h-screen flex-row justify-content-center sm:col-8 sm:col-offset-2 lg:col-4 lg:col-offset-4"
    >
        <Card class="align-self-center w-full">
            <template #content>
                <h3 class="flex justify-content-center">50amigos</h3>
                <h2 class="flex justify-content-center">Asignación de mesa</h2>
                <h4>Elige la ubicación</h4>
                <Dropdown
                    id="location"
                    class="flex align-items-center gap-2 w-full"
                    v-model="state.sessionForm.location"
                    :options="locationOptions"
                    optionValue="optionValue"
                    optionLabel="optionLabel"
                    placeholder="Selecciona una ubicación"
                />
                <h4>Número de mesa</h4>
                <InputNumber
                    id="tableNumber"
                    inputId="minmax"
                    :useGrouping="false"
                    :min="0"
                    :max="200"
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
                        class="w-4 mt-2"
                        :disabled="!state.buttonIsActive"
                        @click="createSession()"
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
