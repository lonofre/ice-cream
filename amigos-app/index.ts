import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";
import "./src/utils/errors";
import { errorHandler } from "./src/middleware/errors";
import { loginRouter } from "./src/login/login.router";
import { productRouter } from "./src/product/product.router";
require("dotenv").config();

const port = process.env.PORT;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("bonjour!");
});

// Middlewares
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.listen(port, () => {
    console.log(`Listening on port ${port} 🚀🚀🚀`);
});

// Routers
app.use("/login", loginRouter);
app.use("/product", productRouter);

// Error middleware, must be last line in index.ts
app.use(errorHandler);
