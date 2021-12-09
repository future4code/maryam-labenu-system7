import knex from "knex";
import { ClassFormat } from "../types";
import dotenv from "dotenv"

dotenv.config()


export class ClassDatabase {
    private connection = knex({
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

     async create(classe: ClassFormat) {
         await this.connection('Class')
            .insert({
                id: classe.getId(),
                name: classe.getName()
            })

     }

     async getAll(){
         const results: any = await this.connection('Class').select()
         const classResult: ClassFormat[] = []

         for (let result of results) {
            const classes = new ClassFormat(result.id, result.name)
            classResult.push(classes)
        }

        return (classResult)
     }
}