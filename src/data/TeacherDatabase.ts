import knex from "knex";
import { Teacher } from "../types";
import formatDate from "../services/formatDate"
import dotenv from "dotenv"

dotenv.config()


export class TeacherDatabase {

    private connection: any = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            multipleStatements: true
        }
    })

    async create(teacher: Teacher) {

        await this.connection(`Teacher`)
            .insert({
                id: teacher.getId(),
                name: teacher.getName(),
                email: teacher.getEmail(),
                birthdate: teacher.getBirthdate(),
                class_id: teacher.getTurmaId()
            })

        const expertises = teacher.getExpertise()

        const expertiseId = (): string => {
            return (Date.now().toString(36) + Math.random().toString(36).substr(2))
        }

        const teacherExpertiseId = (): string => {
            return (Date.now().toString(36) + Math.random().toString(36).substr(2))
        }

        for (let exp of expertises) {
            const expertiseID = expertiseId()

            await this.connection('Expertise')
                .insert({
                    id: expertiseID,
                    name: exp
                })

            await this.connection('Teacher_expertise')
                .insert({
                    id: teacherExpertiseId(),
                    teacher_id: teacher.getId(),
                    expertise_id: expertiseID
                })
        }
    }

    async getAll(): Promise<Teacher[]> {
        const results: any = await this.connection(`Teacher`).select()

        const teachersResult: Teacher[] = []

        for (let result of results) {
            const teachers = new Teacher(result.id, result.name, result.email, formatDate(result.birthdate), result.class_id, result.expertise)
            teachersResult.push(teachers)
        }

        return (teachersResult)
    }

    async changeClass(id: string, classId: string): Promise<void> {
        await this.connection(`Teacher`)
            .where('id', '=', id)
            .update({
                class_id: classId
            })
    }
}