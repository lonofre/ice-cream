import { AxiosInstance, AxiosError } from "axios";
import { SessionFormData, SessionLocation, SessionStoredData } from "~/models/session";
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
        params.append("location", sessionForm.location ?? "");
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
            useSessionStore().storeSessionData(data);
        }
        return { data, error };
    }

    async postSessionClosingAttempt(){
        let responseData: any;
        let error = false;
        try {
            // The session Id should be automatically be added to the request headers via axios interceptor
            const axiosResponse = await this.axios.post<{endTime: Date}>("/session/close");
            responseData = axiosResponse.data
        }catch (e){
            if (e instanceof AxiosError) {
                responseData = e.response!.data;
                error = true;
            } else {
                throw e;
            }
        }
        return { data: responseData, error };
    }
}
