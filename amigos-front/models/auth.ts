export interface AuthStoredData {
    token: string | null;
}

export interface LoginFormData {
    username: string | null;
    password: string | null;
}

export enum Role {
    "tablet_master",
    "admin",
}

export function getTokenClaims(authToken: string | null) {
    if (authToken == null) {
        return null;
    }
    let tokenClaims = null;
    try {
        tokenClaims = JSON.parse(window.atob(authToken.split(".")[1]));
    } catch {
        return null;
    }
    return tokenClaims;
}

export function getTokenRole(authToken: string | null) {
    const claims = getTokenClaims(authToken);
    if (claims?.role == null) {
        return null;
    }
    return claims.role;
}

export function getTokenUserID(authToken: string | null) {
    const claims = getTokenClaims(authToken);
    if (claims?.userID == null) {
        return null;
    }
    return claims.userID;
}
