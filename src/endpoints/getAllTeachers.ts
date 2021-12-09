import { Request, Response } from "express"
// import { connection } from "../connection"
import { Teacher } from "../types"
import formatDate from "../services/formatDate"
import { TeacherDatabase } from "../data/TeacherDatabase"

export const getAllTeachers = async (req: Request, res: Response) => {

    try {

        const teacherDB = new TeacherDatabase()
        const teachers: Teacher[] = await teacherDB.getAll()

        res.status(200).send(teachers)


    } catch (error) {
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }

}

export default getAllTeachers