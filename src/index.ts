import { Request, Response } from "express"
import app from "./app"
import getAllTeachers from "./endpoints/getAllTeachers"

app.get("/", (req: Request, res: Response) => { res.send("Hello World!") })
app.get("/teachers", getAllTeachers)




