import express, { Request, Response } from "express";
import { generateAccessToken, passwordIsValid } from "../utils/auth";
import { db } from "../utils/db.server";

export async function loginHandler(req: Request, res: Response): Promise<void> {
    try {
        const username = req.body.username;
        if (typeof username !== "string") {
            throw "No username provided";
        }
        const user = await db.user.findUnique({
            where: { username: username },
        });

        const password = req.body.password;
        if (typeof password !== "string") {
            throw "No password provided";
        }

        if (
            password == null ||
            user?.id == null ||
            !passwordIsValid(user.id, password)
        ) {
            throw "Incorrect username or password";
        }

        const token = generateAccessToken(user.id);
        res.send({ token: token });
    } catch (e) {
        var errorMessage: string | null = null;
        if (typeof e === "string") {
            errorMessage = e;
        }else{
            errorMessage = "An error ocurred while processing request."
        }
        res.status(401).json({
            error: "Invalid request" + `: ${errorMessage}.`,
        });
    }
}
