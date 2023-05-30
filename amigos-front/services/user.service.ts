import { AxiosInstance, AxiosError } from "axios";
import { User } from "~/models/user"

export default class UserService {

    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
	this.axios = axios;
    }

    async getUsersByRole(roleReq: string) {
	try {
	    const { data, status } = await this.axios.get<User[]>(
		'/user',
		{
		    params: {
			role: roleReq
		    }
		}
	    )
	    return { data, status }
	} catch (e: any) {
	    if (e instanceof AxiosError) {
		const status = e?.response?.status
		return { data: null, status }
	    }
	}
    }

    async getAllUsers() {
	try {
	    const { data, status } = await this.axios.get<User[]>(
		'/user'
	    )
	    return { data, status }
	} catch (e: any) {
	    if (e instanceof AxiosError) {
		const status = e?.response?.status
		return { data: null, status }
	    }
	}
    }
}
