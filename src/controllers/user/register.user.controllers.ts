import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import createError from '../../utils/createError/createError';
import { IUserRegister, IUserReturnWithoutEmployee } from '../../typescript/user/user.type';


/**
 * @router POST /api/v1/user/register
 * @desc user registration
 * @access Public
 */
export const register = async (req: Request, res: Response) => {
    const { email, password, name } : { email:string, password:string, name:string } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            status: "Error",
            code: 400,
            message: "PLease, fill all required fields"
        })
        // throw createError({
        //     status: 400,
        //     messageDev: "Email, name or password is missed",
        // })
    }

    const prisma = new PrismaClient();

    let isUserRegistered: IUserRegister | null = null;
    try {
        isUserRegistered = await prisma.user.findFirst({
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
        //     messageDev: "Register user controller. Some problems with the database when check isUserRegister",
        // })
    }

    if (isUserRegistered) {
        return res.status(400).json({
            status: "Error",
            code: 400,
            message: "User has already registered"
        })
        // throw createError({
        //     status: 400,
        //     messageDev: "User has already registered",
        // })
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    let user: IUserReturnWithoutEmployee | null = null;
    try {
        user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            code: 500,
            message: "Something went wrong!"
        })
        // throw createError({
        //     status: 500,
        //     messageProd: "Something went wrong",
        //     messageDev: "Register user controller. Some problems with the database when create User",
        // })
    }

    if (!user) {
        return res.status(500).json({
            status: "Error",
            code: 500,
            message: "Something went wrong!"
        })
        // throw createError({
        //     status: 500,
        //     messageDev: "User has not been created in the database",
        // })
    }

    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
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

    res.status(201).json({
        status: "Success",
        code: 201,
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign(
                {
                    id: user.id,
                },
                JWT_SECRET,
                {
                    expiresIn: "30d",
                }
            )
        }
    })
}
