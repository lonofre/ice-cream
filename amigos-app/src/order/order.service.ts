import { Order, OrderItem } from "@prisma/client";
import { Session } from "@prisma/client";
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";
import * as OrderItemService from "../order-item/order-item.service"
type OrderData = {
    id: number,
    sessionId: number,
    // orderItems[]
}

type orderInfo = {
    productId: number,
    quantity: number
}
export const createOrder = async(
    order:Omit<OrderData, "id">,
    orderItems: orderInfo[]
): Promise<OrderData> => {
    try{

        // ! For testing
        // Create user
        const user = await db.user.create({
            data: {
                "username":"user",
                "passwordHash":"pass",
                "role":"rol"
            }
        });

        const userId = user.id;

        const session = await db.session.create({
            data: {
                "receptionistId" : userId,
                "table": 2,
                "location":"No se",
                "startTime": new Date("01/03/2023"),
                "endTime": new Date("01/03/2023")
            }
        });

        const tempSessionId = session.id;
        const {sessionId} = order;
        // Create the order first
        const savedOrder = await db.order.create(
            {
                data: {
                    "sessionId": tempSessionId
                }
            }
        );

        // Create each OrderItem with the new orderId
        const orderId = savedOrder.id;
        for(let i = 0; i < orderItems.length; i++){
            let {productId, quantity} = orderItems[i];
            OrderItemService.createOrderItem({
                productId,
                orderId,
                quantity,
                "comments" : "No se"
            });
        }

        return savedOrder;
    }catch(err){
        console.log("Error: ", err);
        throw new APIError(
            "Failed to create order",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};

export const getOrderById = async (
    id: number
): Promise<OrderItem[] | null> => {
    try{
        return await OrderItemService.getItemsbyOrderId(id);
    }catch(err){
        throw new APIError(
            "Failed to get order by Id",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
}

export const updateOrderById = async(
    order: Omit<OrderData, "id">,
    id: number
) : Promise<OrderData> => {
    try{
        const {sessionId} = order
        return await db.order.update({
            where : {
                id,
            },
            data : {
                sessionId,
                // OrderItems
            },
            select : {
                id: true,
                sessionId : true,
                // OrderItems
            }
        });
    }catch(err){
        throw new APIError(
            "Failed to update order",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
}