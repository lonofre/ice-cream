import {OrderProduct} from "./product";

export interface OrderItem{
    productId: number,
    quantity: number
}

export interface OrderResponse {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
}