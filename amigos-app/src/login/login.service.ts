import { Request, Response } from "express";
import { Role, getNewAccessToken, passwordIsValid } from "../utils/auth";
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

export async function handleLogin(
    providedUsername: string,
    providedPassword: string,
): Promise<string> {
    const user = await db.user.findUnique({
        where: { username: providedUsername },
    });
    if (user == null || !(await passwordIsValid(user, providedPassword))) {
        throw new APIError(
            "Wrong username or password",
            HttpErrorCode.UNAUTHORIZED,
            null
        );
    }

    return getNewAccessToken({
        userID: user.id,
        role: user.role,
    });
}
