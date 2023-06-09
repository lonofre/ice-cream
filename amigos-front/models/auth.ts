import { Buffer } from "buffer";
export interface AuthStoredData {
    token: string | null;
}

export interface LoginFormData {
    username: string | null;
    password: string | null;
}

export enum Role {
    tablet_master = "tablet_master",
    admin = "admin",
}

export function getTokenClaims(authToken: string | null) {
    if (authToken == null) {
        return null;
    }
    let tokenClaims = null;
    try {
        tokenClaims = JSON.parse(
            Buffer.from(authToken.split(".")[1], "base64").toString()
        );
    } catch {
        return null;
    }
    return tokenClaims;
}

export function getTokenRole(authToken: string | null): Role | null {
    const claims = getTokenClaims(authToken);
    if (claims?.role == null) {
        return null;
    }
    return claims.role;
}

export function getTokenUserID(authToken: string | null): number | null {
    const claims = getTokenClaims(authToken);
    if (claims?.userID == null) {
        return null;
    }
    return claims.userID;
}
