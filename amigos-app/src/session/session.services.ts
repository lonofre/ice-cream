import { Session } from "@prisma/client";
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

export type RequiredSessionData = {
    receptionistId: number;
    tableNumber: number;
    location: string;
};

export async function createNewSession(
    sessionData: RequiredSessionData
): Promise<Session> {
    try {
        const savedSession = await db.session.create({
            data: {
                receptionistId: sessionData.receptionistId,
                table: sessionData.tableNumber,
                location: sessionData.location,
                startTime: new Date(),
                endTime: null,
            },
        });
        return savedSession;
    } catch (e) {
        throw new APIError(
            "Unable to create session in database",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
}

export async function closeSession(sessionID: number): Promise<void> {
    try {
        db.session.update({
            where: {
                id: sessionID,
            },
            data: {
                endTime: new Date(),
            },
        });
    } catch (e) {
        throw new APIError(
            "Unable to close session in database",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
}
