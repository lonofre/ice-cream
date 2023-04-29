const jwt = require("jsonwebtoken");
import { Express, Request, Response, NextFunction } from "express";
import { db } from "../utils/db.server";
import { APIError } from "../utils/errors";

export async function loginAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            throw "No authorization token provided";
        }
        const token = auth.split(" ")[1]; // Remove 'Bearer' keyword
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const tokenUserID = decodedToken.userID;
        const reqUser = await db.user.findUnique({
            where: { username: req.body.username },
        });

        if (reqUser?.id == null || reqUser.id !== tokenUserID) {
            throw "Invalid token";
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

export async function isAdminAuth(req: Request, res: Response, next: NextFunction) {
    // Enforces authentication before checking if the user is an admin
    loginAuth(req, res, async () => {
        try {
            const userID = req.body.userId;
            if (!userID) {
                throw "No user ID";
            }
            const user =  await db.user.findUnique({where: {id: userID}})

            if (!(user?.role==="admin")) { // TODO Make a role enum
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

export function isTabletMasterAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Enforces authentication before checking if the user is a receptionist
    loginAuth(req, res, async () => {
        try {
            const userID = req.body.userId;
            if (!userID) {
                throw "No user ID";
            }
            const user = await db.user.findUnique({where: {id: userID}})

            if (!(user?.role==="tablet_master")) {
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
