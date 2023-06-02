import { AxiosInstance, AxiosError } from "axios";
import { User } from "~/models/user";

export default class UserService {

    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
	this.axios = axios;
    }

    async getUsersByRole(roleC: string) {
	try {
	    const { data, status } = await this.axios.get<User[]>(
		'/user',
		{
		    params: {
			role: roleC
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
		'/user',
	    )
	    return { data, status }
	} catch (e: any) {
	    if (e instanceof AxiosError) {
		const status = e?.response?.status
		return { data: null, status }
	    }
	}
    }

    async getActiveUsers() {
	try {
	    const { data, status } = await this.axios.get<User[]>(
		'/user',
	    )
	    return { data, status }
	} catch (e: any) {
	    if (e instanceof AxiosError) {
		const status = e?.response?.status
		return { data: null, status }
	    }
	}
    }
    
    async createUser(user: User) {
	try {
	    const { data, status } = await this.axios.post<User>('/user', user);
	    return { data, status };
	} catch (e: any) {
	    console.log(e.message);
	    if (e instanceof AxiosError) {
		const status = e?.response?.status;
		return { data: null, status };
	    }
	}
    }
    
    async updateUser(user: User) {
	try {
	    const { data, status } = await this.axios.put<User>(`/user/${user.id}`, user);
	    return { data, status };
	} catch (e: any) {
	    if (e instanceof AxiosError) {
		const status = e?.response?.status;
		return { data: null, status };
	    }
	}
    }
    

    async getUserById(id: number) {
	try {
	    const { data, status } = await this.axios.get<User[]>(
		`/user/${id}`,
	    )
	    return { data, status }
	} catch (e: any) {
	    if (e instanceof AxiosError) {
		const status = e?.response?.status
		return { data: null, status }
	    }
	}
    }



    async deleteUser(id: number) {
	try {
	    const { data, status } = await this.axios.delete<User[]>(
		`/user/${id}`,
	    );
	    return { data, status };
	} catch (e: any) {
	    if (e instanceof AxiosError) {
		const status = e?.response?.status;
		return { data: e.message, status };
	    }
	}
    }

    









































}
