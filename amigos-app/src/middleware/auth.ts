const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { authIsValid } from "../utils/auth";
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

export async function loginAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const auth = req.headers.authorization;
    if (!auth) {
        throw new APIError(
            "No authorization token provided.",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }

    if (authIsValid(auth)) {
        next();
    } else {
        throw new APIError("Incorrect authentication.", HttpErrorCode.BAD_REQUEST, null);
    }
}

export async function isAdminAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Enforces login authentication before checking if the user is an admin
    loginAuth(req, res, async () => {
        const userID = req.body.userId;
        if (!userID) {
            throw new APIError(
                "No user ID provided",
                HttpErrorCode.BAD_REQUEST,
                null
            );
        }
        const user = await db.user.findUnique({ where: { id: userID } });

        // TODO Use a role enum
        if (user?.role !== "admin") {
            throw new APIError(
                "Not authorized",
                HttpErrorCode.UNAUTHORIZED,
                null
            );
        } else {
            next();
        }
    });
}

export function isTabletMasterAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Enforces login authentication before checking if the user is a receptionist
    loginAuth(req, res, async () => {
        const userID = req.body.userId;
        if (!userID) {
            throw new APIError(
                "No user ID provided",
                HttpErrorCode.BAD_REQUEST,
                null
            );
        }
        const user = await db.user.findUnique({ where: { id: userID } });

        // TODO Use a role enum
        if (user?.role !== "tablet_master") {
            throw new APIError(
                "Not authorized",
                HttpErrorCode.UNAUTHORIZED,
                null
            );
        } else {
            next();
        }
    });
}
