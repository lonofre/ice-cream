import { OrderItem } from "@prisma/client";
import { Product } from "@prisma/client"
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

type OrderItemData = {
    id: number,
    productId: number,
    orderId: number,
    quantity: number,
    comments: string
}

export const validateOrderItem = async (
    productId: number
) : Promise<Product | null> => {
    try{
        return await db.product.findUnique({
            where : {
                "id" : productId,
            }
        })
    }catch(err){
        throw new APIError(
            "Internal server error",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
}

export const createOrderItem = async(
    orderItem: Omit<OrderItemData, "id">
) : Promise<OrderItemData> => {
    try{
        const {productId, orderId, quantity, comments} = orderItem;

        const savedOrderItem = await db.orderItem.create({
            data : {
                productId, 
                orderId,
                quantity,
                comments
            }
        });
        return savedOrderItem;
    }catch(err){
        throw new APIError(
            "Internal server error",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
}

// Returns all Order Items related to the given orderId
export const getItemsbyOrderId = async(
    orderId:number
) : Promise<OrderItemData[] | null> => {
    try{
        return await db.orderItem.findMany({
            where : {
                orderId
            }
        });
    }catch(err){
        throw new APIError(
            "Internal server error",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
}