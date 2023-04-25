import express, { Request, Response } from "express";
import { getUserIDFromUsername } from "../user/user.service";
import { generateAccessToken, passwordIsValid } from "../utils/auth";

export function loginHandler(req: Request, res: Response): void {
    try {
        const username = req.body.username;
        if (typeof username !== "string") {
            throw "No username provided";
        }
        const userID = getUserIDFromUsername(username);

        const password = req.body.password;
        if (typeof password !== "string") {
            throw "No password provided";
        }

        if (userID === null || !passwordIsValid(userID, password)) {
            throw "Incorrect username or password";
        }

        const token = generateAccessToken(userID);
        res.send({ token: token });
    } catch (e) {
        var errorMessage: string | null = null;
        if (typeof e === "string") {
            errorMessage = e;
        }
        res.status(401).json({
            error: "Invalid request" + `: ${errorMessage}.` ?? ".",
        });
    }
}
