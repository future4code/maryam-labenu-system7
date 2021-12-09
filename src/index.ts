import { Request, Response } from "express"
import app from "./app"
import createClass from "./endpoints/createClass"
import createTeacher from "./endpoints/createTeacher"
import getAllTeachers from "./endpoints/getAllTeachers"
import getClass from "./endpoints/getClass"

app.get("/", (req: Request, res: Response) => { res.send("Hello World!") })
app.get("/teachers", getAllTeachers)
app.get('/classes', getClass)

app.post('/classes', createClass)
app.post('/teachers', createTeacher)




