import {OrderProduct} from "./product";

export interface Order{
    id: number,
    sessionId: number,
    orderItems: OrderProduct[]
}