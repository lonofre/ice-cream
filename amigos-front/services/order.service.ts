import { AxiosInstance, AxiosError } from "axios";
import { OrderItem } from "../models/order";

/**
 * Service to get the order items from an order
 */
export default class OrderService{
    axios: AxiosInstance;

    constructor(axios: AxiosInstance){
        this.axios = axios;
    }

    async getOrderItems(orderId: number){
        try{
            const items = await this.axios.get<OrderItem[]>(
                `http://localhost:8000/order/${orderId}`);

            return items
        }catch(e: any){
            console.log(e);
            if(e instanceof AxiosError){
                const status = e?.response?.status;
                return {data: null, status};
            }
        }
    }
}