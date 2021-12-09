import { Request, Response } from "express"
import { Students } from "../types"
import { StudentsDatabase } from "../data/StudentsDatabase"
import connection from "../connection"

const getStudentsById = async (req: Request, res: Response) => {

    try {

        const studentsByNameDB = new StudentsDatabase()
        const students: Students[] = await studentsByNameDB.getStudentByID(req.params.name)

        const results = new StudentsDatabase()
        const hobbies = await results.getHobbiesByStudent(req.params.name)

        // const results: any = await connection.raw(`
        //     SELECT Student.id as "Student_ID", 
        //     Student.name, 
        //     Student.email, 
        //     Student.birthdate, 
        //     Student.classId, 
        //     Hobbie.name as Student_hobbie
        //     FROM Student_Hobbie
        //     JOIN Student
        //     ON Student.id = Student_Hobbie.student_id
        //     JOIN Hobbie
        //     ON Hobbie.id = Student_Hobbie.hobbie_id
        //     WHERE Student.name = "${req.params.name}"; 
        // `)

        // const hobbiesResult: any = []

        // for (let result of results[0]) {
        //     const eachHobbie: any = result.Student_hobbie
        //     hobbiesResult.push(eachHobbie)
        // }

        // console.log(hobbiesResult)
        // res.status(200).send({
        //     ...students[0],
        //     Hobbies: hobbiesResult
        // })
        res.status(200).send({
            ...students[0],
            Hobbies: hobbies
        })

    } catch (error) {
        if (res.statusCode === 200)
            // res.status(500).send("Sistema temporariamente indisponível. Tente novamente mais tarde!")
            res.send(error.sqlMessage || error.message)
        else
            res.send(error.sqlMessage || error.message)
    }

}

export default getStudentsById