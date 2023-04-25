const jwt = require("jsonwebtoken");
import { Express, Request, Response, NextFunction } from "express";
import { getUserIDFromUsername } from "../user/user.service";

export function loginAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            throw "No authorization token provided";
        }
        const token = auth.split(" ")[1]; // Remove 'Bearer' keyword
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const tokenUserID = decodedToken.userID;
        const reqUserID = getUserIDFromUsername(req.body.username);

        if (reqUserID == null || reqUserID !== tokenUserID) {
            throw Error;
        } else {
            next();
        }
    } catch (e) {
        var errorMessage: string | null = null;
        if (typeof e === "string") {
            errorMessage = e;
        }else{
            errorMessage = "Invalid token"
        }
        res.status(401).json({
            error: "Invalid request" + `: ${errorMessage}.` ?? ".",
        });
    }
}

export function isAdminAuth(req: Request, res: Response, next: NextFunction) {
    // Enforces authentication before checking if the user is an admin
    loginAuth(req, res, () => {
        try {
            const userID = req.body.userId;
            if (!userID) {
                throw "No user ID";
            }

            // TODO: Check if the user ID is belongs to an admin
            const isAdmin: boolean = true; // FIXME Use real data
            if (!isAdmin) {
                throw "Not authorized";
            } else {
                next();
            }
        } catch (e) {
            var errorMessage: string | null = null;
            if (typeof e === "string") {
                errorMessage = e;
            }
            res.status(401).json({
                error: "Invalid request" + `: ${errorMessage}.` ?? ".",
            });
        }
    });
}

export function isReceptionistAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Enforces authentication before checking if the user is a receptionist
    loginAuth(req, res, () => {
        try {
            const userID = req.body.userId;
            if (!userID) {
                throw "No user ID";
            }

            // TODO: Check if the user ID belongs to a receptionist
            const isReceptionist: boolean = true; // FIXME use real data
            if (!isReceptionist) {
                throw "Not authorized";
            } else {
                next();
            }
        } catch (e) {
            var errorMessage: string | null = null;
            if (typeof e === "string") {
                errorMessage = e;
            }
            res.status(401).json({
                error: "Invalid request" + `: ${errorMessage}.` ?? ".",
            });
        }
    });
}
