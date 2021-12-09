import { Request, Response } from "express"
import app from "./app"
import createClass from "./endpoints/createClass"
import { createStudent } from "./endpoints/createStudent"
import createTeacher from "./endpoints/createTeacher"
import getAllTeachers from "./endpoints/getAllTeachers"
import getClass from "./endpoints/getClass"
import getStudentsById from "./endpoints/getStudentsByName"
import updateStudentClass from "./endpoints/updateStudentClass"

app.get("/", (req: Request, res: Response) => { res.send("Hello World!") })
app.get("/teachers", getAllTeachers)
app.get('/classes', getClass)
app.get('/students/:name', getStudentsById)

app.post('/classes', createClass)
app.post('/teachers', createTeacher)
app.post(`/students`, createStudent)

app.post(`/students/:id`, updateStudentClass)




