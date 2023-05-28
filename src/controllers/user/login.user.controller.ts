import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import createError from '../../utils/createError/createError';
import jwt from 'jsonwebtoken'
import { IUserLogin, IUserReturnWithoutEmployee } from '../../typescript/user/user.type';


/** 
 * @route POST /api/v1/user/login
 * @desc user login
 * @access Public
*/
export const login = async (req: Request, res: Response) => {
    const { password, email }:{ password:string, email:string }  = req.body;

    // if (!email || !password) {
    //     return res.status(400).json({
    //         status: "Error",
    //         code: 400,
    //         message: "Email or password is missed"
    //     })
    //     // throw createError({
    //     //     status: 400,
    //     //     messageDev: "Email or password is missed",
    //     // })
    // }

    const prisma = new PrismaClient();

    let user: IUserReturnWithoutEmployee| null = null;
    try {
        user = await prisma.user.findUnique({
            where: {
                email,
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            code: 500,
            message: "Something went wrong"
        })
        // throw createError({
        //     status: 500,
        //     messageProd: "Something went wrong",
        //     messageDev: "Login user controller. Some problems with the database when try to find User",
        // })
    }
    if (!user) {
        return res.status(400).json({
            status: "Error",
            code: 400,
            message: "Email or password is invalid"
        })
        // throw createError({
        //     status: 400,
        //     messageDev: "Email is not exist in database",
        // })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            status: "Error",
            code: 400,
            message: "Email or password is invalid"
        })

        // throw createError({
        //     status: 400,
        //     messageDev: "Password is invalid",
        // })
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({
            status: "Error",
            code: 500,
            message: "Something went wrong!"
        })
        // throw createError({
        //     status: 500,
        //     messageDev: "JWT_SECRET has not been created",
        // })
    }

    res.status(200).json({
        status: "Success",
        code: 200,
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign(
                {
                    id: user.id,
                },
                secret,
                {
                    expiresIn: "30d",
                }
            )
        }
    })
}
