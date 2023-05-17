const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { Role, extractAuthPayload } from "../utils/auth";
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

export function loginAuth(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    const tokenPayload = extractAuthPayload(auth);
    if (tokenPayload != null) {
        next();
    } else {
        throw new APIError(
            "Incorrect authentication.",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }
}

export async function adminLoginAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // This also verifies login
    const auth = req.headers.authorization;
    const tokenPayload = extractAuthPayload(auth);
    const user =
        tokenPayload == null
            ? null
            : await db.user.findUnique({ where: { id: tokenPayload?.userID } });

    // TODO Change "admin" constant for a role enum
    if (user?.role !== "admin") {
        throw new APIError("Not authorized", HttpErrorCode.UNAUTHORIZED, null);
    } else {
        next();
    }
}

export async function tabletMasterLoginAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // This also verifies login
    const auth = req.headers.authorization;
    const tokenPayload = extractAuthPayload(auth);
    const user =
        tokenPayload == null
            ? null
            : await db.user.findUnique({ where: { id: tokenPayload?.userID } });

    if (user?.role !== Role[Role.tablet_master]) {
        throw new APIError("Not authorized", HttpErrorCode.UNAUTHORIZED, null);
    } else {
        next();
    }
}
