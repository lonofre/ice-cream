import { AxiosInstance, AxiosError } from "axios";
import { SessionFormData, SessionStoredData } from "~/models/session";
import { useAuthStore } from "~/store/auth";
import { useSessionStore } from "~/store/session";

/**
 * Service to make login requests to the API
 */
export default class SessionService {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async postSessionCreationAttempt(sessionForm: SessionFormData) {
        let responseData: any;
        let error = false;
        const params = new URLSearchParams();
        params.append(
            "receptionistId",
            sessionForm.receptionistId?.toString() ?? ""
        );
        params.append("tableNumber", sessionForm.tableNumber?.toString() ?? "");
        params.append("location", sessionForm.location ?? "location");
        try {
            const axiosResponse = await this.axios.post<SessionStoredData>(
                "/session",
                params
            );
            responseData = axiosResponse.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                responseData = e.response!.data;
                error = true;
            } else {
                throw e;
            }
        }
        return { data: responseData, error };
    }

    async createAndStoreSession(sessionForm: SessionFormData) {
        const { data, error } = await this.postSessionCreationAttempt(
            sessionForm
        );

        if (data != null && !error) {
            useSessionStore().storeSessionId(data.sessionId);
        }
        return { data, error };
    }
}
