const jwt = require("jsonwebtoken");
import bcrypt, { hashSync } from "bcryptjs";
import { User } from "@prisma/client";

const SALT_LENGTH = 16;
export async function hashPassword(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, SALT_LENGTH);
}

export async function passwordIsValid(
    user: User,
    rawPassword: string
): Promise<boolean> {
    return bcrypt.compareSync(rawPassword, user.passwordHash);
}

export function generateAccessToken(userID: number): string {
    const token = jwt.sign({ userID: userID }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.SESSION_DURATION,
    });
    return token;
}

export function authIsValid(authString: string | null): boolean {
    if (authString == null) {
        return false;
    }
    try {
        const token = authString.split(" ")[1]; // Remove 'Bearer' keyword
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return true;
    } catch {
        return false;
    }
}
