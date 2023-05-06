import { AxiosStatic } from "axios";
import { Category } from "~/models/category";



/**
 * Servie to fecth category data from the API
 */
export default class CategoryService {

  axios: AxiosStatic;

  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }

  async getAllCategories() {
    try {
      const { data: data, status } = await this.axios.get<Category[]>(
        '/category'
      )
      return { data, status }
    } catch (e: any) {
      const status = e.response.status;
      return { data: {}, status }
    }
  }

}