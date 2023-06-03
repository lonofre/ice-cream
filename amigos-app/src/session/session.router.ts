import express, { Request, Response } from "express";
import { tabletMasterLoginAuth } from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { closeSession, createNewSession } from "./session.services";
import { db } from "../utils/db.server";
import { extractAuthPayload } from "../utils/auth";
import { sessionCheck } from "../middleware/session";

export const sessionRouter = express.Router();

async function sessionPostHandler(req: Request, res: Response): Promise<void> {
    const auth = req.headers.authorization;
    const receptionistId = (await extractAuthPayload(auth))?.userID;
    const user = await db.user.findUnique({
        where: { id: receptionistId },
    });
    if (receptionistId == null || user == null) {
        throw new APIError(
            "No valid receptionist ID provided",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }

    let tableNumber = req.body.tableNumber;
    if (tableNumber == null) {
        throw new APIError(
            "No table number provided",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    } else if (isNaN(tableNumber) || isNaN(parseInt(tableNumber))) {
        throw new APIError(
            "No valid table number provided, must be an integer",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }
    tableNumber = parseInt(tableNumber);

    const location = req.body.location;
    if (location == null) {
        throw new APIError(
            "No location provided",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }

    const session = await createNewSession({
        receptionistId,
        tableNumber,
        location,
    });
    res.send({
        sessionId: session.id,
        tableNumber: session.table,
        location: session.location,
    });
}
sessionRouter.post("/", tabletMasterLoginAuth, sessionPostHandler);

async function sessionClosePostHandler(
    req: Request,
    res: Response
): Promise<void> {
    const sessionid = parseInt(req.headers.session_id as string);
    const closedSession = await closeSession(sessionid);
    res.send({ endTime: closedSession.endTime });
}
sessionRouter.post(
    "/close",
    [tabletMasterLoginAuth, sessionCheck],
    sessionClosePostHandler
);
