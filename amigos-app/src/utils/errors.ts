// https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/

import { Response } from "express";

export enum HttpErrorCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export type APIErrorPayload = {
    status: HttpErrorCode;
    message: string;
    data: any;
};

export class APIError extends Error {
    code: HttpErrorCode;
    data: any;
    constructor(
        message: string,
        code: HttpErrorCode,
        data: any
    ) {
        super(message);

        this.code = code;
        this.data = data;

        this.name = "APIError";
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

export function handleError(
    error: Error | APIError,
    response?: Response
): void {
    if (error instanceof APIError && response) {
        const payload: APIErrorPayload = {
            status: error.code,
            message: error.message,
            data: error.data,
        };
        response.status(error.code).json(payload);
    } else {
        if (response) {
            response
                .status(HttpErrorCode.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal server error" });
        }
        console.error(error.message);
    }
}

process.on("unhandledRejection", (reason: Error | any) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`);

    throw new Error(reason.message || reason);
});

process.on("uncaughtException", (error: Error) => {
    console.log(`Uncaught Exception: ${error.message}`);

    handleError(error);
});
