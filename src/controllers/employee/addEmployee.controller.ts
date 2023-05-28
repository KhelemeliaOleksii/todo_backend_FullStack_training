import { PrismaClient } from "@prisma/client";
import { Request, Response} from "express";
import createError from "../../utils/createError/createError";
import { IUserLogin } from "../../typescript/user/user.type";
import { IEmployeeCreate } from "../../typescript/employee/employee.type";

// export type TEmployee = {
//     id: string,
//     firstName: string,
//     lastName: string,
//     age: string,
//     address: string,
//     user?: string,
//     userId?: string,
// }

/**
 * @route POST /api/v1/employee
 * @desc add employee
 * @access Private
 * */
export const addEmployee = async (req: Request, res: Response) => {
    const user: IUserLogin | undefined = res.locals?.user;
    
    if (!user) {
        return res.status(401).json({
            status: "Error",
            code: 401,
            message: "Unauthorizated"
        })
        // throw createError ({
        //     status: 401,
        //     messageDev: "Add employee controller. User is not authorizated!"
        // })
    }

    const employee: IEmployeeCreate | undefined = req.body;
    // console.log("employee", req.body);
    
    if (!employee) {
        return res.status(400).json({
            status: "Error",
            code: 400,
            message: "Bad request",
        })
        // throw createError ({
        //     status: 401,
        //     messageDev: "Add employee controller. No data!"
        // })
    }

    const prisma = new PrismaClient();
    try {
        const candidate =  await prisma.employee.create({
            data:{
                ...employee,
                userId: user.id
            }
        })
        
        res.status(201).json({
            status: "Success",
            code: 201,
            data: {
                ...candidate
            }
        })
        // await prisma.user.update({
        //     where: {
        //         id: user.id,
        //     },
        //     data: {
        //         createdEmployee: {
        //             create: {
        //                 ...employee
        //             }
        //         }

        //     }
        // })
        // res.status(201).json({
        //     status: "Success",
        //     code: 201,
        //     data: {
        //         ...employee,
        //         userId: user.id
        //     }
        // }) 
    } catch (error:any) {
        console.log(error);
        
        return res.status(500).json({
            message: "Something went wrong!"
        })
        // throw createError({
        //     status: 500,
        //     messageProd: "Something went wrong!",
        //     messageDev: "add employee controller. Add Employee request to the database is failure"
        // })
    }
}