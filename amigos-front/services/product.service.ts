import { AxiosInstance, AxiosError } from "axios";
import { Product } from "~/models/product";
import { Category } from "~/models/category";



/**
 * Servie to fecth product data from the API
 */
export default class ProductService {

	axios: AxiosInstance;

	constructor(axios: AxiosInstance) {
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
				return { data: null, status }
			}
		}
	}

	async getAllProducts() {
		try {
			const { data, status } = await this.axios.get<Product[]>(
				'/product',
			)
			return { data, status }
		} catch (e: any) {
			if (e instanceof AxiosError) {
				const status = e?.response?.status
				return { data: null, status }
			}
		}
	}

	async deleteProduct(id: number) {
		try {
		  	const { data, status } = await this.axios.delete<Product[]>(
				`/product/${id}`,
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