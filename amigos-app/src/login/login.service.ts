import { Request, Response } from "express";
import { generateAccessToken, passwordIsValid } from "../utils/auth";
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

export async function loginHandler(req: Request, res: Response): Promise<void> {
    const username = req.body.username;
    if (typeof username !== "string") {
        throw new APIError(
            "No username provided",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }
    const user = await db.user.findUnique({
        where: { username: username },
    });

    const password = req.body.password;
    if (typeof password == null) {
        throw new APIError(
            "No password provided",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }

    if (user == null || !(await passwordIsValid(user, password))) {
        throw new APIError(
            "Incorrect username or password",
            HttpErrorCode.UNAUTHORIZED,
            null
        );
    }

    const token = generateAccessToken(user.id);
    res.send({ token: token });
}
