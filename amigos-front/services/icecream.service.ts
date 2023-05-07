import { AxiosStatic, AxiosError } from "axios";
import { Icecream } from "~/models/icecream";


/**
 * Servie to fecth icecream data from the API
 */
export default class IcecreamService {

  axios: AxiosStatic;

  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }

  async getAll() {
    try {
      const { data: data, status } = await this.axios.get<Icecream[]>(
        '/icecream'
      )
      return { data, status }
    } catch (e: any) {
      if (e instanceof AxiosError) {
        const status = e?.response?.status
        return { data: {}, status }
      }
    }
  }

}