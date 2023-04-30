import express, { Request, Response } from "express";
import {
    adminLoginAuth,
    loginAuth,
    tabletMasterLoginAuth,
} from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { handleLogin } from "./login.service";

export const loginRouter = express.Router();

async function loginHandler(req: Request, res: Response): Promise<void> {
    const username = req.body.username;
    const password = req.body.password;
    if (username == null) {
        throw new APIError(
            "No username provided",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }
    if (password == null) {
        throw new APIError(
            "No password provided",
            HttpErrorCode.BAD_REQUEST,
            null
        );
    }

    const token = await handleLogin(username, password);
    res.send({ token: token });
}
loginRouter.post("/", loginHandler);

// TODO Used to test login authentication, remove when it's possible to test elsewhere
loginRouter.get("/test/", loginAuth, (req: Request, res: Response) => {
    res.send("Success! :)");
});
loginRouter.get(
    "/test/admin",
    adminLoginAuth,
    (req: Request, res: Response) => {
        res.send("Success! :)");
    }
);
loginRouter.get(
    "/test/tablet_master",
    tabletMasterLoginAuth,
    (req: Request, res: Response) => {
        res.send("Success! :)");
    }
);
