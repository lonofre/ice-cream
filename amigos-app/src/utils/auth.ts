const jwt = require("jsonwebtoken");
import bcrypt, { hashSync } from "bcryptjs";
import { db } from "./db.server";

const SALT_LENGTH = 16;
export async function hashPassword(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, SALT_LENGTH);
}

export async function passwordIsValid(
    userID: number,
    rawPassword: string
): Promise<boolean> {
    const user = await db.user.findUnique({ where: { id: userID } });
    if (user == null) {
        throw "Invalid user ID";
    }

    return bcrypt.compareSync(rawPassword, user.passwordHash);
}

export function generateAccessToken(userID: number): string {
    const token = jwt.sign({ userID: userID }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.SESSION_DURATION,
    });
    return token;
}
