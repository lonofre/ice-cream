import express, { Express, Request, Response } from "express"
import morgan from "morgan"
import cors from 'cors'

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