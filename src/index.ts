import { Request, Response } from "express"
import app from "./app"
import changeClass from "./endpoints/changeClass"
import changeModule from "./endpoints/changeModule"
import createClass from "./endpoints/createClass"
import createTeacher from "./endpoints/createTeacher"
import getActiveClass from "./endpoints/getActiveClass"
import getAllTeachers from "./endpoints/getAllTeachers"
import getClass from "./endpoints/getClass"

app.get("/", (req: Request, res: Response) => { res.send("Hello World!") })
app.get("/teachers", getAllTeachers)
app.get('/classes', getClass)
app.get('/active/classes', getActiveClass)

app.post('/classes', createClass)
app.post('/teachers', createTeacher)

app.put('/classes/:id', changeModule)
app.put('/teachers/class/:id', changeClass)




