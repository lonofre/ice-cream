export interface SessionStoredData {
    sessionId: number | null;
}

export interface SessionFormData {
    receptionistId: number | null;
    tableNumber: number | null;
    location: SessionLocation | null;
}

export enum SessionLocation {
    terraza = "Terraza",
    barra = "Barra",
    salonVIP = "Salón VIP",
    jardin = "Jardín",
    comedor = "Comedor",
}

export function isSessionLocation(s: string | null) {
    return (
        s != null &&
        Object.values(SessionLocation).includes(s as SessionLocation)
    );
}
