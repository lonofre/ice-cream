import { AxiosInstance, AxiosError } from "axios";
import { Category } from "~/models/category";



/**
 * Servie to fecth category data from the API
 */
export default class CategoryService {

  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAllCategories() {
    try {
      const { data: data, status } = await this.axios.get<Category[]>(
        '/category'
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