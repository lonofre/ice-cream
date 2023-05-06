import { AxiosStatic, AxiosError } from "axios";
import { Product } from "~/models/product";
import { Category } from "~/models/category";



/**
 * Servie to fecth product data from the API
 */
export default class ProductService {

	axios: AxiosStatic;

	constructor(axios: AxiosStatic) {
		this.axios = axios;
	}

	async getOrdersByCategory(category: Category) {
		try {
			const { data, status } = await this.axios.get<Product[]>(
				'/product',
				{
					params: {
						category: category.name
					}
				}
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