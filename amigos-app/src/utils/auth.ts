const jwt = require("jsonwebtoken");
import bcrypt, { hashSync } from "bcryptjs";
import { User } from "@prisma/client";

export enum Role {
    "tablet_master",
    "admin",
}

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

export type AuthTokenPayload = {
    userID: number;
    role: string;
};

export function isAuthTokenPayload(obj: any): obj is AuthTokenPayload {
    return obj.userID != null && obj.role!=null;
}

export function extractAuthPayload(
    authString: string | null | undefined
): AuthTokenPayload | null {
    if (authString == null) {
        return null;
    }
    try {
        const token = authString.split(" ")[1]; // Remove 'Bearer' keyword
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (isAuthTokenPayload(decodedToken)) {
            return decodedToken;
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export function getNewAccessToken(payload: AuthTokenPayload): string {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: process.env.SESSION_DURATION,
    });
    return token;
}
