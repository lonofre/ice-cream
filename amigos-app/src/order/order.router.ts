import express, { Request, Response } from "express";
import { Session } from "@prisma/client";
import { Product } from "@prisma/client";
import {
    adminLoginAuth,
    loginAuth,
    tabletMasterLoginAuth,
} from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { handleLogin } from "../login/login.service";
import { body, validationResult } from "express-validator";

import * as OrderService from "./order.service";
import * as SessionService from "../session/session.service"
import * as OrderItemService from "../order-item/order-item.service"


export const orderRouter = express.Router();

// Returns a list of the items ordered
orderRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const order = await OrderService.getOrderById(id);
    console.log("Orden : \n " + JSON.stringify(order));
    if (order) {
        return response.status(200).json(order);
    }

    throw new APIError(
        "Order not found",
        HttpErrorCode.NOT_FOUND,
        null
    );
});

orderRouter.post("/",
    // Validates sessionId exists 
    // ! When user service is merged. Uncomment this
    /* body("seesionId").custom(async (sessionId) => {
        const session: Session | null = await SessionService.validateSessionId(sessionId)
        if (session) {
            return true;
        }
        return false;
    }), */
    // Validates every OrderItem is valid
    body("orderItems").custom(async (orderItems) => {
        for (let i = 0; i < orderItems.length; i++) {
            let productId: number = orderItems[i].productId
            let product: Product | null = await OrderItemService.validateOrderItem(productId)
            if (product == null) {
                return false;
            }
        }
        return true;
    }),
    // Creates the order
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new APIError(
                "Verify the data and try again",
                HttpErrorCode.BAD_REQUEST,
                null
            );
        }

        const { sessionId, orderItems } = request.body;

        
        const savedOrder = await OrderService.createOrder({
            sessionId,
        }, orderItems);

        return response.status(201).json(savedOrder);
    });


orderRouter.put("/:id",
    // Validates every OrderItem is valid
    body("orderItems").custom(async (orderItems) => {
        for (let i = 0; i < orderItems.length; i++) {
            let productId: number = orderItems[i].productId
            let product: Product | null = await OrderItemService.validateOrderItem(productId)
            if (product == null) {
                return false;
            }
        }
        return true;
    }),
    // Adds the new items to the order
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new APIError(
                "Verify the data and try again",
                HttpErrorCode.BAD_REQUEST,
                null
            );
        }
        const orderId = parseInt(request.params.id, 10);
        const order = await OrderService.getOrderById(orderId);

        if (order == null) {
            throw new APIError(
                "Order not found",
                HttpErrorCode.NOT_FOUND,
                null
            );
        }

        const {orderItems} = request.body;

        for(let i = 0; i < orderItems.length; i++){
            let productId: number = parseInt(orderItems[i].productId, 10);
            let quantity: number = parseInt(orderItems[i].quantity, 10);
            OrderItemService.createOrderItem({
                orderId,
                productId,
                quantity,
                "comments": ""
            })
        }

        return response.status(201).json({
            "msg":"Items added succesfully"
        })

    });