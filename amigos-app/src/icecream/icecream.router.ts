import express, { Request, Response, NextFunction } from "express";
import { adminLoginAuth, loginAuth } from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { body, validationResult } from "express-validator";
import * as IcecreamService from "./icecream.service";

export const icecreamRouter = express.Router();


icecreamRouter.get('/',
  async (request: Request, response: Response) => {
    const icecreams = await IcecreamService.getAllIcecreams();
    return response.status(200).json(icecreams);
  });


/**
 * Saves an icecream order
 * - request:
 *    - icecreamId
 *    - quantity
 *    - sessionId
 */
icecreamRouter.post('/order',
  async (request: Request, response: Response) => {
    const sessionId = parseInt(request.headers.session_id as string, 10);
    const iceCreamId : number = parseInt(request.body.icecreamId, 10);
    const quantity : number = parseInt(request.body.quantity);
    const data = {
      sessionId,
      quantity,
      iceCreamCatalogId: iceCreamId
    }

    const newIceCreamOrder = await IcecreamService.createIcecreamOrder(data);
    return response.status(201).json(newIceCreamOrder);
  });

icecreamRouter.post('/',
  body('flavor').isString(),
  body('image').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new APIError(
        "Verify the data and try again",
        HttpErrorCode.BAD_REQUEST,
        null
      );
    }

    const { flavor, image } = request.body;
    const data = { flavor, image};

    const newIcecream = await IcecreamService.createIcecream(data);
    return response.status(201).json(newIcecream);
  });

icecreamRouter.put(
  "/:id",
  body('flavor').isString(),
  body('image').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new APIError(
        "Verify the data and try again",
        HttpErrorCode.BAD_REQUEST,
        null
      );
    }

    const id: number = parseInt(request.params.id, 10);
    const { flavor, image } = request.body;

    const data = {
      id,
      flavor,
      image
    };

    const updatedIcecream = await IcecreamService.updateIcecream(data);
    return response.status(201).json(updatedIcecream);
  }
);

icecreamRouter.delete(
  "/:id",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const deletedIcecream = await IcecreamService.deleteIcecream(id);
    const flavor = deletedIcecream.flavor;
    const message = `The icecream ${flavor} was deleted successfully`;
    return response.status(200).json({ message });
  }
);