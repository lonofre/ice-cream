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
            if(e instanceof AxiosError){
                const status = e?.response?.status;
                return {data: null, status};
            }
        }
    }

    async createOrder(orderItems: OrderItem[], sessionId: number){
        try{
           const order = await this.axios.post(
            "http://localhost:8000/order",
            {
                sessionId,
                orderItems
            }
           );
           return order;
        }catch(e: any){
            if(e instanceof AxiosError){
                const status = e?.response?.status;
                return {data: null, status};
            }
        }
    }

    async updateOrder(orderId: number, orderItems: OrderItem[]){
        try{
            const updatedOrder = await this.axios.put(
                `http://localhost:8000/order/${orderId}`,
                {
                    orderItems
                }
            );
            return updatedOrder;
        }catch(e:any){
            if(e instanceof AxiosError){
                const status = e?.response?.status;
                return {data: null, status};
            }
        }
    }
}