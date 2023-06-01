import { AxiosInstance, AxiosError } from "axios";
import { AuthStoredData, LoginFormData } from "~/models/auth";
import { useAuthStore } from "~/store/auth";

/**
 * Service to make login requests to the API
 */
export default class LoginService {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async postLoginAttempt(loginForm: LoginFormData) {
        let responseData: any;
        let error = false;
        const params = new URLSearchParams();
        params.append("username", loginForm.username ?? "");
        params.append("password", loginForm.password ?? "");
        try {
            const axiosResponse = await this.axios.post<AuthStoredData>(
                "/login",
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

    async loginAndStoreCredentials(loginForm: LoginFormData) {
        const { data, error } = await this.postLoginAttempt(loginForm);

        if (data != null && !error) {
            useAuthStore().storeToken(data.token);
        }
        return { data, error };
    }
}
