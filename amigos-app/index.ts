import express, { Express, Request, Response } from "express"
import morgan from "morgan"
import cors from 'cors'
require('dotenv').config()

const port = process.env.PORT
const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send("bonjour!")
});

// Middlewares
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀🚀🚀`)
});

// Routers
const loginRouter = require('./src/login/login.router')
app.use("/login", loginRouter)