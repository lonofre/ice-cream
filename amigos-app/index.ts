import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";
import "./src/utils/errors";
import { errorHandler } from "./src/middleware/errors";

const port = 8000
const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send("bonjour!")
});

// Middlewares
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())


app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀🚀🚀`)
});

// Error middleware, must be last line in index.ts
app.use(errorHandler);