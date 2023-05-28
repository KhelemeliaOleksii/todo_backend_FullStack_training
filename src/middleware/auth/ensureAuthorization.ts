import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express';
import createError from '../../utils/createError/createError';
import { IUserLogin, IUserReturnWithoutEmployee } from '../../typescript/user/user.type';

interface IUserIDJWTPayload extends jwt.JwtPayload {
    id: string,
}


export const ensureAuthorization = async (req: Request , res: Response, next: NextFunction) => {
    try {
        const { JWT_SECRET } = process.env;
        if (!JWT_SECRET) {
            throw createError({
                status: 500,
                messageProd: "Something went wrong!",
                messageDev: "Authorization middleware error. JWT_SECRET has not been created",
            })
        }

        const { authorization } = req.headers;
        if (!authorization) {
            throw createError({
                status: 401,
                messageProd: "Invalid authorization signature!",
                messageDev: "Authorization middleware error. Authorization field in reqest headers has been missed",
            })
        }

        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw createError({
                status: 401,
                messageProd: "Invalid authorization signature",
                messageDev: "Authorization middleware error. Bearer field or token in reqest authorization headers has been missed",
            })
        }

        let userId = '';
        try {
            const {id} = <IUserIDJWTPayload>jwt.verify(token, JWT_SECRET);
            userId = id;
        } catch (error) {
            throw createError({
                status: 401,
                messageProd: "Invalid authorization signature",
                messageDev: "Authorization middleware error. Invalid JWT Token signature",
            })
        }
        if (!userId) {
            throw createError({
                status: 401,
                messageProd: "Invalid authorization signature",
                messageDev: "Authorization middleware error. JWT Token is invalid",
            })
        }
        
        const prisma = new PrismaClient();

        const user: IUserReturnWithoutEmployee | null = await prisma.user.findUnique({
            where: {
                id:userId,
            }
        })
        if (!user) {
            throw createError({
                status: 500,
                messageProd: "Something went wrong!",
                messageDev: "Authorization middleware error. User with such id has not been found!",
            })
        }

        res.locals.user = {
            id: user.id,
            email: user.email
        };
        
        next();
    } catch (error) {
        next(error);
    }
}