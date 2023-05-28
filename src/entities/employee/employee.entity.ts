// model Employee {
//     id        String @id @default(uuid())
//     firstName String
//     lastName  String
//     age       String
//     address    String
//     user User @relation(fields: [userId], references: [id])
//     userId    String
//   }

//   export interface IEmployeeCreate {
//     firstName: string,
//     lastName: string,
//     age: string,
//     address: string,
// }

import Joi from 'joi';

export const employeeCreateSchema = Joi.object({
    firstName: Joi.string().trim().min(1).required(),
    lastName: Joi.string().trim().min(1).required(),
    age: Joi.string().trim().min(1).required(),
    address: Joi.string().trim().min(1).required(),
})