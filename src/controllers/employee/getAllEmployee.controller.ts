import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import createError from "../../utils/createError/createError";
import { IUserLogin } from "../../typescript/user/user.type";
import { IEmployeeReturnWithoutUser } from "../../typescript/employee/employee.type";

/**
 * @route GET /api/v1/employee
 * @desc Get all user's employee
 * @access Private
 * */
export const getAllEmployee = async (req: Request, res: Response) => {
    const user: IUserLogin | undefined = res.locals?.user;
    
    if (!user) {
        return res.status(401).json({
            status: "Error",
            code: 401,
            message: 'Unauthorized',
        })
        // throw createError({
        //     status: 401,
        //     messageDev: 'get all employee controller. User is not authorized'
        // })
    }

    const prisma = new PrismaClient();
    
    let employees : IEmployeeReturnWithoutUser[] = [];

    try {
        employees =  await prisma.employee.findMany({
            where: {
                userId: user.id,
            }
        })
        res.status(200).json({
            status: "Success",
            code: 200,
            data: {
                employees,
                userId: user.id
            }
        })
    } catch (error) { 
        return res.status(500).json({
            message: "Something went wrong!"
        });
        // throw createError({
        //     status: 500,
        //     messageProd: "Something went wrong",
        //     messageDev: "get all employee controller. Get Employee request to the database is failure"
        // })
    }
}