import express, { Request, Response } from "express";
import { loginHandler } from "./login.service";
import { loginAuth } from "../middleware/auth";

const router = express.Router();

router.post("/", loginHandler);

// TODO Used to test authentication, remove when it's possible to test elsewhere
router.get("/test", loginAuth, (req: Request, res: Response) => {
    res.send("Success! :)");
});

module.exports = router;
