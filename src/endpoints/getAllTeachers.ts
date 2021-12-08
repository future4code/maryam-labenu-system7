import { Request, Response } from "express"
import { connection } from "../connection"
import { Teacher } from "../types"
import formatDate from "../services/formatDate"

export const getAllTeachers = async (req: Request, res: Response) => {

    try {

        const results: any = await connection(`Teacher`).select()
        const teachersResult: Teacher[] = []

        for (let result of results) {
            const teachers = new Teacher(result.id, result.name, result.email, formatDate(result.birthdate), result.classId, result.expertise)
            teachersResult.push(teachers)
        }

        res.status(200).send(results)


    } catch (error) {
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)

        else
            res.send(error.sqlMessage || error.message)
    }

}

export default getAllTeachers