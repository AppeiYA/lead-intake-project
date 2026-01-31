import { Env } from "./config/config";
import express from "express";
import cors from "cors"
import appRouter from "./router";

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api", appRouter)

app.get("/health", (_req, res) => {
    res.send(`Api is up and healthy on port: ${Env.Port}`)
})

app.use((_req, res)=> {
    res.send("Route not found")
})

export default app;
