import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/errors";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    handleError(err, res);
}
