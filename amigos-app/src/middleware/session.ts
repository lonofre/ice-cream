import { Request, Response, NextFunction } from "express";
import { Role, extractAuthPayload } from "../utils/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { db } from "../utils/db.server";

export async function sessionCheck(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const sessionId = req.headers?.sessionId;
    if (sessionId != null && !Array.isArray(sessionId)) {
        const session = await db.session.findUnique({
            where: {
                id: parseInt(sessionId ?? ""),
            },
        });
        if (session != null) {
            return next();
        }
    }

    throw new APIError(
        "Missing session ID",
        HttpErrorCode.BAD_REQUEST,
        null
    );
}
