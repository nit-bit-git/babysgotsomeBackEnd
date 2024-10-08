import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : "16kb"})) //to handle data from forms

app.use(express.urlencoded({extended: true, limit: "16kb"})) //to handle data from url // extended is used to deal with objects within objects. not used much

app.use(express.static("public")) // to store assets like pdfs or images to be accessed by anyone in the public folder

app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter) // will take us to http://localhost:8000/api/v1/users/register

export { app }