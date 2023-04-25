const jwt = require("jsonwebtoken");
import bcrypt, { hashSync } from "bcryptjs";

export function hashPassword(rawPassword: string): string {
    return bcrypt.hashSync(rawPassword);
}

export function passwordIsValid(userID: number, rawPassword: string): boolean {
    // TODO: Implement password validation with database
    const userHashedPassword = hashPassword("password123"); //FIXME Get real hashed password for the given user ID

    return bcrypt.compareSync(rawPassword, userHashedPassword);
}

export function generateAccessToken(userID: number): string {
    const token = jwt.sign({ userID: userID }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.SESSION_DURATION,
    });
    return token;
}
