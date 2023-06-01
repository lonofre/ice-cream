import { Session } from "@prisma/client";
import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";


export const validateSessionId = async(
    id: number
): Promise<Session | null> => {
    try{
        return await db.session.findUnique({
            where : {
                id,
            }
        });
    }catch(err){
        throw new APIError(
            "Internal server error",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        );
    }
};